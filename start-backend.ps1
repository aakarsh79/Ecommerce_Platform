# Backend Server Startup Script
Write-Host "Starting Backend Server..." -ForegroundColor Green
cd "$PSScriptRoot\server"
node app.js

