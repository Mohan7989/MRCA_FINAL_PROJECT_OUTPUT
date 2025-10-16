# Script: detect JDK, set JAVA_HOME (session + user), then run mvnw (or mvn)
param(
  [switch]$NoDownload # if set, don't allow wrapper to download Maven (optional)
)

Write-Host "Detecting java/javac on PATH..." -ForegroundColor Cyan

$javac = Get-Command javac -ErrorAction SilentlyContinue
$java = Get-Command java -ErrorAction SilentlyContinue

function Persist-JavaHome($path) {
  Write-Host "Persisting JAVA_HOME -> $path" -ForegroundColor Yellow
  setx JAVA_HOME "$path" | Out-Null
  # Update current session too
  $env:JAVA_HOME = $path
  $env:PATH = "$path\bin;$env:PATH"
  Write-Host "JAVA_HOME set in this session and persisted for the current user." -ForegroundColor Green
}

function Find-JdkCandidates {
  $candidates = @()
  $common = @(
    "$env:ProgramFiles\Java\*",
    "$env:ProgramFiles(x86)\Java\*",
    "C:\Program Files\Common Files\Oracle\Java\*",
    "C:\Java\*"
  )

  foreach ($pattern in $common) {
    $dirs = Get-ChildItem -Path $pattern -Directory -ErrorAction SilentlyContinue
    foreach ($d in $dirs) {
      $javacPath = Join-Path $d.FullName 'bin\javac.exe'
      $javaPath  = Join-Path $d.FullName 'bin\java.exe'

      if ((Test-Path $javacPath -PathType Leaf -ErrorAction SilentlyContinue) -and
          (Test-Path $javaPath  -PathType Leaf -ErrorAction SilentlyContinue)) {
        $candidates += $d.FullName
      }
    }
  }

  return $candidates
}

# NEW helper: choose best candidate from list
function Choose-BestJdk {
  param([string[]]$list)
  if (-not $list -or $list.Count -eq 0) { return $null }

  Write-Host "JDK candidates found:" -ForegroundColor Cyan
  foreach ($item in $list) { Write-Host "  - $item" }

  # Prefer folders that include 'jdk' and validate presence of java.exe & javac.exe
  foreach ($p in $list) {
    if ($p -match '(?i)jdk') {
      $javaExe = Join-Path $p 'bin\java.exe'
      $javacExe = Join-Path $p 'bin\javac.exe'
      if ((Test-Path $javaExe -PathType Leaf -ErrorAction SilentlyContinue) -and
          (Test-Path $javacExe -PathType Leaf -ErrorAction SilentlyContinue)) {
        return $p
      }
    }
  }

  # Otherwise pick the first candidate that actually validates
  foreach ($p in $list) {
    $javaExe = Join-Path $p 'bin\java.exe'
    $javacExe = Join-Path $p 'bin\javac.exe'
    if ((Test-Path $javaExe -PathType Leaf -ErrorAction SilentlyContinue) -and
        (Test-Path $javacExe -PathType Leaf -ErrorAction SilentlyContinue)) {
      return $p
    }
  }

  return $null
}

$jdkRoot = $null

if ($javac) {
  $javacPath = $javac.Path
  Write-Host "Found javac at: $javacPath" -ForegroundColor Green

  # If javac is the system 'javapath' shim, ignore the shim and search for real JDKs
  if ($javacPath -match "\\javapath\\") {
    Write-Host "javac points to 'javapath' shim. Scanning common JDK locations..." -ForegroundColor Yellow
    $candidates = Find-JdkCandidates
    if ($candidates.Count -gt 0) {
      # choose best candidate (robust)
      $chosen = Choose-BestJdk -list $candidates
      if ($chosen) {
        $jdkRoot = $chosen
        Write-Host "Selected JDK: $jdkRoot" -ForegroundColor Green
        if ((Test-Path (Join-Path $jdkRoot 'bin\java.exe')) -and (Test-Path (Join-Path $jdkRoot 'bin\javac.exe'))) {
          Persist-JavaHome $jdkRoot
        } else {
          Write-Host "Selected path did not validate; continuing to other checks." -ForegroundColor Yellow
        }
      }
    } else {
      Write-Host "No JDK found in common locations. Will attempt to infer from java.exe if available." -ForegroundColor Yellow
    }
  } else {
    # usual case: infer JDK root from javac path
    $jdkBin = Split-Path -Parent $javacPath
    $inferred = Split-Path -Parent $jdkBin
    if (Test-Path (Join-Path $inferred "bin\java.exe")) {
      $jdkRoot = $inferred
      Persist-JavaHome $jdkRoot
    } else {
      Write-Host "Inferred JAVA_HOME ($inferred) does not contain bin\java.exe. Scanning common locations..." -ForegroundColor Yellow
      $candidates = Find-JdkCandidates
      if ($candidates.Count -gt 0) {
        $chosen = Choose-BestJdk -list $candidates
        if ($chosen) {
          $jdkRoot = $chosen
          Write-Host "Selected JDK: $jdkRoot" -ForegroundColor Green
          if ((Test-Path (Join-Path $jdkRoot 'bin\java.exe')) -and (Test-Path (Join-Path $jdkRoot 'bin\javac.exe'))) {
            Persist-JavaHome $jdkRoot
          } else {
            Write-Host "Selected path did not validate; continuing to other checks." -ForegroundColor Yellow
          }
        }
      }
    }
  }
}

# If javac not found or we still don't have jdkRoot, try using java and then scan locations
if (-not $jdkRoot -and $java) {
  Write-Host "Attempting to infer JDK from java on PATH..." -ForegroundColor Cyan
  # Try candidates first
  $candidates = Find-JdkCandidates
  if ($candidates.Count -gt 0) {
    $jdkRoot = ($candidates | Sort-Object)[-1]
    Write-Host "Selected JDK: $jdkRoot" -ForegroundColor Green
    Persist-JavaHome $jdkRoot
  } else {
    # fallback: try to infer from java.exe path (may be JRE)
    $javaPath = $java.Path
    $javaBin = Split-Path -Parent $javaPath
    $possibleRoot = Split-Path -Parent $javaBin
    if (Test-Path (Join-Path $possibleRoot "bin\javac.exe")) {
      $jdkRoot = $possibleRoot
      Write-Host "Inferred JDK from java.exe: $jdkRoot" -ForegroundColor Green
      Persist-JavaHome $jdkRoot
    } else {
      Write-Host "Could not infer a valid JDK root automatically." -ForegroundColor Yellow
    }
  }
}

# Final verification: ensure JAVA_HOME is valid
if (-not (Test-Path (Join-Path $env:JAVA_HOME "bin\java.exe") -PathType Leaf -ErrorAction SilentlyContinue)) {
  Write-Error "JAVA_HOME appears invalid: $env:JAVA_HOME`nPlease correct JAVA_HOME (point to a JDK that contains bin\java.exe and bin\javac.exe) and re-run."
  Write-Host 'Examples:' -ForegroundColor Yellow
  Write-Host '  setx JAVA_HOME "C:\Program Files\Java\jdk-21.0.7"' -ForegroundColor Yellow
  Write-Host '  $env:JAVA_HOME="C:\Program Files\Java\jdk-21.0.7"; $env:PATH = "$env:JAVA_HOME\bin;$env:PATH"' -ForegroundColor Yellow
  exit 1
}

# Run wrapper or mvn
Push-Location (Split-Path -Path $MyInvocation.MyCommand.Definition -Parent)
# ensure we are in backend folder when invoked via path; otherwise cd to script location
if (Test-Path ".\mvnw.cmd") {
  Write-Host "Running Maven wrapper (mvnw.cmd) ..." -ForegroundColor Cyan
  try {
    & .\mvnw.cmd spring-boot:run
  } catch {
    Write-Host "Wrapper failed: $($_.Exception.Message)" -ForegroundColor Red
    if (-not $NoDownload) {
      Write-Host "You can try 'mvn spring-boot:run' if you have system Maven installed." -ForegroundColor Yellow
    }
  }
} elseif (Get-Command mvn -ErrorAction SilentlyContinue) {
  Write-Host "Running system mvn ..." -ForegroundColor Cyan
  & mvn spring-boot:run
} else {
  Write-Error "No mvnw.cmd and no system 'mvn' found. Install Maven or use the wrapper included in the repo."
}
Pop-Location
