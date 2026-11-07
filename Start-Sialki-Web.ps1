[CmdletBinding()]
param()

$root = Split-Path -Parent $PSCommandPath
if (-not $root) { $root = (Get-Location).Path }
$bun = (Get-Command bun -ErrorAction SilentlyContinue)?.Source
if (-not $bun) {
    $fallbackBun = "C:\Users\Getko\.gemini\antigravity\brain\971b7441-5368-445d-9e17-214f16666fd0\scratch\bun\node_modules\bun\bin\bun.exe"
    if (Test-Path $fallbackBun) { $bun = $fallbackBun } else { $bun = "bun" }
}

$state = Join-Path ([System.IO.Path]::GetTempPath()) "sialki-web-state"
foreach ($sub in @("config","data","cache","state","home","tmp","local","roaming")) {
    New-Item -ItemType Directory -Force -Path (Join-Path $state $sub) | Out-Null
}

$env:HOME = Join-Path $state "home"
$env:USERPROFILE = Join-Path $state "home"
$env:TEMP = Join-Path $state "tmp"
$env:TMP = Join-Path $state "tmp"
$env:LOCALAPPDATA = Join-Path $state "local"
$env:APPDATA = Join-Path $state "roaming"
$env:XDG_CONFIG_HOME = Join-Path $state "config"
$env:XDG_DATA_HOME = Join-Path $state "data"
$env:XDG_CACHE_HOME = Join-Path $state "cache"
$env:XDG_STATE_HOME = Join-Path $state "state"
$env:OPENCODE_CONFIG_DIR = Join-Path $state "config"
$env:OPENCODE_SERVER_PASSWORD = "sialki-preview-token"
$env:OPENCODE_DISABLE_MODELS_FETCH = "1"
$env:VITE_OPENCODE_SERVER_HOST = "127.0.0.1"
$env:VITE_OPENCODE_SERVER_PORT = "4096"

Write-Host "Starting Sialki Beta CLI Server on port 4096..." -ForegroundColor Cyan
Start-Process -FilePath $bun -ArgumentList @("run", "src/index.ts", "serve", "--hostname", "127.0.0.1", "--port", "4096", "--cors", "http://localhost:3000", "--cors", "http://127.0.0.1:3000") -WorkingDirectory (Join-Path $root "packages\cli") -WindowStyle Minimized

Start-Sleep -Seconds 3

Write-Host "Starting Sialki Beta Web UI on port 3000..." -ForegroundColor Green
Start-Process -FilePath $bun -ArgumentList @("run", "dev", "--", "--port", "3000", "--host", "127.0.0.1") -WorkingDirectory (Join-Path $root "packages\app") -WindowStyle Minimized

Start-Sleep -Seconds 3

$auth = [Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes("opencode:sialki-preview-token"))
$url = "http://127.0.0.1:3000/?auth_token=$auth"
Write-Host "Opening Sialki Beta UI in browser: $url" -ForegroundColor Yellow
Start-Process $url

