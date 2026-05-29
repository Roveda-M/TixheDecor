# Nis backend-in Tixhe Decor (nderprit instancen e vjeter ne port 8080)
$ErrorActionPreference = "Stop"
$backend = Join-Path $PSScriptRoot "backend"

$conn = Get-NetTCPConnection -LocalPort 8080 -ErrorAction SilentlyContinue | Select-Object -First 1
if ($conn) {
    $pid = $conn.OwningProcess
    Write-Host "Po mbyll procesin e vjeter ne port 8080 (PID $pid)..."
    Stop-Process -Id $pid -Force
    Start-Sleep -Seconds 2
}

Set-Location $backend
Write-Host "Po kompiloj dhe nis backend-in..."
& .\mvnw.cmd clean spring-boot:run
