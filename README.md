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
    curl.exe -i https://mrca-final-project-output-4.onrender.com/
    curl.exe -i https://mrca-final-project-output-4.onrender.com/api/health
    curl.exe -i https://mrca-final-project-output-4.onrender.com/api/materials

  - Or use PowerShell native:
    Invoke-RestMethod -Uri 'https://mrca-final-project-output-4.onrender.com/api/health' -TimeoutSec 5
    Invoke-WebRequest -Uri 'https://mrca-final-project-output-4.onrender.com/' -UseBasicParsing

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
   curl.exe -i https://mrca-final-project-output-4.onrender.com/api/health
   curl.exe -i https://mrca-final-project-output-4.onrender.com/api/materials
   curl.exe -i https://mrca-final-project-output-4.onrender.com/api/admin/pending

Smoke tests
- Get materials:
  curl https://mrca-final-project-output-4.onrender.com/api/materials
- Admin pending:
  curl https://mrca-final-project-output-4.onrender.com/api/admin/pending
- Upload test (replace path):
  curl -v -X POST "https://mrca-final-project-output-4.onrender.com/api/uploads" \
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

Render deployment checklist (fix for "backend /Dockerfile" error)
- In Render Console when creating the Web Service:
  - Repository: connect your GitHub repo
  - Branch: main
  - Environment: Docker
  - Service Root Directory: set to exactly "backend" (no leading/trailing spaces)
  - Dockerfile Path: set to "Dockerfile" (case-sensitive; do NOT prefix with a slash)
- If you use render.yaml, ensure the file has:
  root: backend
  dockerfilePath: Dockerfile
  (the root + dockerfilePath avoid Render constructing "backend /Dockerfile" with a space)

Environment variables (set these in Render → Service → Environment):
- SPRING_DATASOURCE_URL = jdbc:mysql://<MYSQL_HOST>:3306/student_resources?useSSL=false&serverTimezone=UTC
- SPRING_DATASOURCE_USERNAME = mohan
- SPRING_DATASOURCE_PASSWORD = <your_db_password>
- SPRING_JPA_HBM2DDL = update
- FILE_UPLOAD_DIR = /data/uploads
- JAVA_OPTS = -Xmx512m

If Render build still fails:
- Check the "Service Root Directory" field for accidental spaces.
- Confirm the Dockerfile exists at repo path backend/Dockerfile.
- If you prefer, create the service pointing root to repo root and set dockerfilePath to backend/Dockerfile (but avoid trailing spaces).

Render UI — exact values to paste (copy/paste into Render when creating a new Web Service)

1) Create a new Service → “Web Service”
- Connect GitHub repo: select the repository for this project
- Branch: main

2) Basic settings
- Name: student-resources-backend
- Environment: Docker
- Root Directory: .          <-- IMPORTANT: set exactly a single dot (repo root)
- Dockerfile Path: backend/Dockerfile
- Region: (your preferred region, e.g. oregon)
- Plan: Free (or as needed)

3) Build & Start (Docker builds image from Dockerfile automatically)
- No build command required (Dockerfile handles build)
- Port: 8080

4) Health check (optional)
- Health check path: /api/health
- Protocol: HTTP

5) Environment variables (set these in the Render UI — do NOT commit secrets into repo)
- SPRING_DATASOURCE_URL = jdbc:mysql://<MYSQL_HOST>:3306/student_resources?useSSL=false&serverTimezone=UTC
- SPRING_DATASOURCE_USERNAME = mohan
- SPRING_DATASOURCE_PASSWORD = <your_db_password_here>
- SPRING_DATASOURCE_DRIVER = com.mysql.cj.jdbc.Driver
- SPRING_JPA_HBM2DDL = update
- FILE_UPLOAD_DIR = /data/uploads
- JAVA_OPTS = -Xmx512m

6) Persistent storage (if you want uploads to persist)
- If Render offers a persistent disk, set FILE_UPLOAD_DIR to the mounted path (e.g. /data/uploads) and make sure your Dockerfile or container writes there.
- Alternatively configure S3 and update UploadController to use S3.

7) After creating the service
- Start deploy and watch logs in Render dashboard
- Wait for logs to show:
  - "Started StudentResourcesApplication" and "Tomcat started on port 8080"
- Verify:
  - curl.exe -i https://<your-backend-host>/api/health
  - curl.exe -i https://<your-backend-host>/api/materials

Troubleshooting tips
- If you see an error about missing Dockerfile:
  - Confirm the Dockerfile exists at repo relative path backend/Dockerfile (case-sensitive).
  - In Render UI confirm "Root Directory" and "Dockerfile Path" fields (no trailing spaces).
  - If using render.yaml, ensure it contains:
    root: .
    dockerfilePath: backend/Dockerfile
- If build fails due to DB access, set DB env vars correctly and ensure the DB is reachable from Render (open the DB to Render IPs or use managed DB in the same provider).
