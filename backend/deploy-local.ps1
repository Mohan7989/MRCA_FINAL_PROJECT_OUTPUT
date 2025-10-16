param(
  [string]$FrontendPath = "D:\Backend-project\frontend",
  [string]$BackendPath = "D:\Backend-project\backend",
  [string]$JarNamePattern = "*.jar"
)

Write-Host "Building frontend..."
Push-Location $FrontendPath
# install and build
npm install
npm run build
if ($LASTEXITCODE -ne 0) { Write-Error "Frontend build failed"; Pop-Location; exit 1 }
Pop-Location

Write-Host "Copying frontend build into backend static folder..."
$buildDir = Join-Path $FrontendPath "build"
$targetStatic = Join-Path $BackendPath "src\main\resources\static"

# Ensure target exists
if (-not (Test-Path $targetStatic)) { New-Item -ItemType Directory -Path $targetStatic | Out-Null }

# Mirror build -> static (use robocopy for Windows)
robocopy $buildDir $targetStatic /MIR /NFL /NDL /NJH /NJS > $null

Write-Host "Packaging backend (maven)..."

# --- FIXED: robust function to get PID listening on port 8080 ---
function Get-ListeningPid {
  param([int]$Port)

  # Prefer modern cmdlet if available
  if (Get-Command -Name Get-NetTCPConnection -ErrorAction SilentlyContinue) {
    try {
      $conn = Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue
      if ($conn) {
        return $conn.OwningProcess
      }
      return $null
    } catch {
      return $null
    }
  }

  # Fallback to parsing netstat output
  try {
    $lines = netstat -ano | Select-String -Pattern "LISTENING" -SimpleMatch
    foreach ($line in $lines) {
      $text = $line.ToString().Trim()
      if ($text -match ":\b$Port\b") {
        # split by whitespace and take last token as PID
        $parts = -split $text
        $pidStr = $parts[-1]
        if ($pidStr -match '^\d+$') {
          return [int]$pidStr
        }
      }
    }
  } catch {
    return $null
  }
  return $null
}

$listeningPid = Get-ListeningPid -Port 8080
if ($listeningPid) {
  try {
    $proc = Get-Process -Id $listeningPid -ErrorAction SilentlyContinue
    if ($proc) {
      Write-Host "Port 8080 is in use by PID $listeningPid ($($proc.ProcessName))."
      $ans = Read-Host "Stop that process now? (y/N)"
      if ($ans -match '^(?i)y(es)?$') {
        Write-Host "Stopping process PID $listeningPid..."
        try {
          Stop-Process -Id $listeningPid -Force -ErrorAction Stop
          Start-Sleep -Seconds 2
          Write-Host "Process $listeningPid stopped."
        } catch {
          Write-Host ("Could not stop process PID {0}: {1}" -f $listeningPid, $_.Exception.Message) -ForegroundColor Yellow
        }
      } else {
        Write-Host "User chose not to stop process. Build may fail due to locked files."
      }
    }
  } catch {
    Write-Host ("Could not inspect or stop process PID {0}: {1}" -f $listeningPid, $_.Exception.Message) -ForegroundColor Yellow
  }
}

# ensure target dir is not locked / remove readonly attributes so maven clean can delete
$targetDir = Join-Path $BackendPath "target"
if (Test-Path $targetDir) {
  Write-Host "Clearing read-only attributes under $targetDir ..."
  Get-ChildItem -Path $targetDir -Recurse -Force -ErrorAction SilentlyContinue | ForEach-Object {
    try { $_.Attributes = 'Normal' } catch {}
  }
  # attempt to remove the target folder before running maven (pre-clean)
  try {
    Remove-Item -Path $targetDir -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "Removed existing target directory to avoid clean/delete locks."
  } catch {
    Write-Host "Could not pre-remove target dir (maybe files still locked). Maven clean may still fail." -ForegroundColor Yellow
  }
}

Push-Location $BackendPath
# Use mvnw if present, otherwise mvn
if (Test-Path ".\mvnw.cmd") {
  .\mvnw.cmd clean package -DskipTests
} else {
  mvn clean package -DskipTests
}
if ($LASTEXITCODE -ne 0) { Write-Error "Backend package failed"; Pop-Location; exit 1 }
Pop-Location

# Run produced jar (stop any existing process first)
Write-Host "Running backend jar..."
$targetDir = Join-Path $BackendPath "target"
$jar = Get-ChildItem -Path $targetDir -Filter $JarNamePattern | Sort-Object LastWriteTime -Descending | Select-Object -First 1
if (-not $jar) { Write-Error "Jar not found in $targetDir"; exit 1 }

# Prepare log files
$logFile = Join-Path $targetDir "server.log"
$errFile = Join-Path $targetDir "server.err"
if (Test-Path $logFile) { Remove-Item $logFile -Force -ErrorAction SilentlyContinue }
if (Test-Path $errFile) { Remove-Item $errFile -Force -ErrorAction SilentlyContinue }

# Run jar in background and capture output to files so we can inspect logs
$startArgs = @("-jar", "`"$($jar.FullName)`"")
$proc = Start-Process -FilePath "java" -ArgumentList $startArgs -WorkingDirectory $targetDir -RedirectStandardOutput $logFile -RedirectStandardError $errFile -PassThru

Write-Host "Started backend process (PID $($proc.Id)). Waiting for application to become healthy..."

# Wait for health endpoint with retries
$healthUrl = "https://mrca-final-project-output-4.onrender.com/api/health"
$maxAttempts = 60
$attempt = 0
$healthy = $false

while ($attempt -lt $maxAttempts -and -not $healthy) {
  try {
    $attempt++
    # small timeout for each attempt
    $resp = Invoke-WebRequest -Uri $healthUrl -UseBasicParsing -TimeoutSec 5 -ErrorAction Stop
    if ($resp.StatusCode -eq 200) {
      Write-Host "Health check succeeded on attempt $attempt."
      $healthy = $true
      break
    }
  } catch {
    Write-Host ("Attempt {0}/{1}: service not ready ({2})" -f $attempt, $maxAttempts, $_.Exception.Message)
    Start-Sleep -Seconds 1
  }
}

if ($healthy) {
  Write-Host "Application is healthy. Showing last 40 lines of server log:"
  if (Test-Path $logFile) {
    Get-Content $logFile -Tail 40 | ForEach-Object { Write-Host $_ }
  } else {
    Write-Host "Log file not found at $logFile"
  }
} else {
  Write-Host "Application did not become healthy within the timeout ($maxAttempts seconds)." -ForegroundColor Yellow
  Write-Host "Diagnostics:"
  Write-Host "1) Process list for java:"
  Get-Process -Name java -ErrorAction SilentlyContinue | Select-Object Id, ProcessName, StartTime, CPU | ForEach-Object { Write-Host $_ }
  Write-Host "`n2) Netstat for port 8080:"
  netstat -ano | Select-String ":8080"
  Write-Host "`n3) Tail of server.log (last 200 lines if available):"
  if (Test-Path $logFile) {
    Get-Content $logFile -Tail 200 | ForEach-Object { Write-Host $_ }
  } else {
    Write-Host "No server.log found at $logFile"
  }
  Write-Host "`n4) Tail of server.err (last 200 lines if available):"
  if (Test-Path $errFile) {
    Get-Content $errFile -Tail 200 | ForEach-Object { Write-Host $_ }
  } else {
    Write-Host "No server.err found at $errFile"
  }
  Write-Host "`nIf logs show errors (DB, port binding, permission), paste the last error block here and I'll provide the exact fix."
}

Write-Host "Deploy script finished."
# ...existing code...
