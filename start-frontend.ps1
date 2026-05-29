# Nis frontend-in React
$ErrorActionPreference = "Stop"
Set-Location (Join-Path $PSScriptRoot "Frontend")
if (-not (Test-Path "node_modules")) {
    Write-Host "Po instaloj varësitë (npm install)..."
    npm install
}
Write-Host "Po nis frontend-in në http://localhost:3000 ..."
npm start
