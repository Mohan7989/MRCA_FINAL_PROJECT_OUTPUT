# Student Resources — Local run & deploy guide

Quick checklist (dev)
1. Backend (dev):
   - Open PowerShell in backend folder:
     cd D:\Backend-project\backend
     .\run-backend.ps1
   - Wait for: "Started StudentResourcesApplication"
   - Health check (PowerShell notes below)

PowerShell note about curl:
- In PowerShell `curl` is an alias for `Invoke-WebRequest` and may prompt for parameters.
- Use these safe commands in PowerShell:

  - Use `curl.exe` (the real curl shipped on Windows) to behave like Unix curl:
    curl.exe -i http://localhost:8080/
    curl.exe -i http://localhost:8080/api/health
    curl.exe -i http://localhost:8080/api/materials

  - Or use PowerShell native:
    Invoke-RestMethod -Uri 'http://localhost:8080/api/health' -TimeoutSec 5
    Invoke-WebRequest -Uri 'http://localhost:8080/' -UseBasicParsing

If curl shows "Failed to connect"
1. Confirm backend process & jar:
   - From PowerShell run:
     Get-CimInstance Win32_Process -Filter "Name='java.exe'" | Select-Object ProcessId, CommandLine
   - Confirm you have a java process that runs your jar (path contains student-resources-0.0.1-SNAPSHOT.jar).

2. Confirm port listening:
   - netstat -ano | findstr :8080
   - Or (PowerShell):
     Get-NetTCPConnection -LocalPort 8080 -State Listen

3. If no listener:
   - Start backend (jar) (from backend folder):
     # recommended (captures logs) - run deploy script:
     ./deploy-local.ps1
     # or run directly:
     Start-Process -FilePath "java" -ArgumentList "-jar","`"D:\Backend-project\backend\target\student-resources-0.0.1-SNAPSHOT.jar`"" -WorkingDirectory "D:\Backend-project\backend\target" -NoNewWindow

4. Watch logs (tail):
   - Get-Content D:\Backend-project\backend\target\server.log -Tail 200 -Wait
   - If the server fails shortly after start, paste the last 50 log lines here.

5. Quick health test (after server running):
   curl.exe -i http://localhost:8080/api/health
   curl.exe -i http://localhost:8080/api/materials
   curl.exe -i http://localhost:8080/api/admin/pending

Smoke tests
- Get materials:
  curl http://localhost:8080/api/materials
- Admin pending:
  curl http://localhost:8080/api/admin/pending
- Upload test (replace path):
  curl -v -X POST "http://localhost:8080/api/uploads" \
    -F "file=@C:/path/to/sample.pdf" \
    -F "title=Test" -F "subject=Physics" -F "type=pdf" -F "semester=Sem-1" -F "year=2025" -F "uploaderName=Me"

Local production deploy (one-off)
- Build frontend:
  cd D:\Backend-project\frontend
  npm run build
- Copy build into backend static and build backend jar (script below automates this).

Production checklist (short)
- Externalize DB credentials (use env vars or Spring profiles).
- Choose durable file storage (S3 or mounted directory).
- Add authentication for admin endpoints.
- Configure reverse proxy (nginx) and enable HTTPS.
- Configure logging, monitoring, and backups.

If anything fails: paste the backend start log (first 50 lines) and browser console network error for failed requests.

Plan — short steps to get links/API reachable from your machine
1. Confirm backend process is actually running and listening on port 8080.
2. Test the endpoints with commands that work in PowerShell (PowerShell's curl is an alias).
3. If backend not running, start it (deploy-local.ps1 or run-backend.ps1) and watch logs for "Started StudentResourcesApplication".
4. If backend starts but not reachable, collect server.log tail + netstat + java process info and paste here.

Files changed
- d:\Backend-project\README.md — add correct PowerShell curl examples and quick diagnostics/start steps.

### [README.md](file:///d%3A/Backend-project/README.md)

Update README to show correct PowerShell-friendly commands and quick diagnostics.
