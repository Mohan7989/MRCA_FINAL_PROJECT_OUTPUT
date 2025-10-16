# Run from: D:\Backend-project\backend
# Usage: ./check-backend.ps1
$ErrorActionPreference = 'SilentlyContinue'

Write-Host "1) Quick curl examples (copy/paste) for direct checks:"
Write-Host "   curl -i http://localhost:8080/"
Write-Host "   curl -i http://localhost:8080/api/health"
Write-Host "   curl -i http://localhost:8080/api/materials"
Write-Host ""

Write-Host "2) Is java running? (shows command line to identify the jar)"
$javaProcs = Get-CimInstance Win32_Process -Filter "Name='java.exe'" | Select-Object ProcessId, CommandLine
if (-not $javaProcs) {
  Write-Host "No java.exe processes found." -ForegroundColor Yellow
} else {
  $javaProcs | ForEach-Object {
    Write-Host "PID: $($_.ProcessId)  CommandLine: $($_.CommandLine)"
  }
}
Write-Host ""

Write-Host "3) Is something listening on TCP port 8080?"
if (Get-Command -Name Get-NetTCPConnection -ErrorAction SilentlyContinue) {
  $conn = Get-NetTCPConnection -LocalPort 8080 -State Listen -ErrorAction SilentlyContinue
  if ($conn) {
    $conn | Select-Object LocalAddress,LocalPort,State,OwningProcess | Format-Table -AutoSize
  } else {
    Write-Host "No listener on port 8080." -ForegroundColor Yellow
  }
} else {
  netstat -ano | Select-String ":8080"
}
Write-Host ""

Write-Host "4) Try /api/health (attempt HTTP request)"
try {
  $resp = Invoke-RestMethod -Uri "http://localhost:8080/api/health" -TimeoutSec 5 -ErrorAction Stop
  Write-Host "Health response:" -ForegroundColor Green
  $resp | Format-List
} catch {
  Write-Host "Health request failed: $($_.Exception.Message)" -ForegroundColor Yellow
}
Write-Host ""

$targetDir = Join-Path (Get-Location) "target"
$logFile = Join-Path $targetDir "server.log"
$errFile = Join-Path $targetDir "server.err"

Write-Host "5) Tail server.log (if present, last 100 lines):"
if (Test-Path $logFile) {
  Get-Content $logFile -Tail 100 | ForEach-Object { Write-Host $_ }
} else {
  Write-Host "No $logFile found." -ForegroundColor Yellow
}
Write-Host ""

Write-Host "6) Tail server.err (if present, last 100 lines):"
if (Test-Path $errFile) {
  Get-Content $errFile -Tail 100 | ForEach-Object { Write-Host $_ }
} else {
  Write-Host "No $errFile found." -ForegroundColor Yellow
}
Write-Host ""

Write-Host "7) If jar is not running, start it with:"
Write-Host "   Start-Process -FilePath 'java' -ArgumentList '-jar','`\"D:\\Backend-project\\backend\\target\\student-resources-0.0.1-SNAPSHOT.jar`\"' -WorkingDirectory 'D:\\Backend-project\\backend\\target' -NoNewWindow"
Write-Host "   Or use the deploy script: cd D:\\Backend-project\\backend ; ./deploy-local.ps1"
Write-Host ""
Write-Host "Script finished."
