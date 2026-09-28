@echo off
echo ===================================================
echo   INTHUGIL.IN - Development Mode with Hot Reload
echo ===================================================
echo.
echo 1. Launching Backend API on http://localhost:5000...
start cmd /k "cd server && node index.js"

echo 2. Launching Frontend Dev Server on http://localhost:3000...
start cmd /k "cd client && npm run dev"

timeout /t 3 >nul
start "" http://localhost:3000
echo.
echo Both servers are running!
echo Storefront:  http://localhost:3000
echo Admin CMS:   http://localhost:3000/admin
echo Backend API: http://localhost:5000
