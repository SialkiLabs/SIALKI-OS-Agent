# Sialki Beta - Full Suite Installation Script for Windows
# Installs Native Desktop App + System CLI (sialki)

[CmdletBinding()]
param(
    [switch]$Force
)

$ErrorActionPreference = "Stop"

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "       SIALKI BETA - INSTALLATION & SYSTEM REGISTRATION   " -ForegroundColor Yellow
Write-Host "==========================================================" -ForegroundColor Cyan

$repoRoot = if ($PSScriptRoot) { $PSScriptRoot } else { Split-Path -Parent $PSCommandPath }
if (-not $repoRoot) { $repoRoot = (Get-Location).Path }
$desktopSource = Join-Path $repoRoot "packages\desktop\dist\win-unpacked"
$cliSource = Join-Path $repoRoot "packages\cli\dist\cli-windows-x64\bin\opencode.exe"
$iconSource = Join-Path $repoRoot "packages\desktop\icons\beta\icon.ico"

# 1. Targets & Base Paths
$userProfile = if ($env:USERPROFILE) { $env:USERPROFILE } else { "C:\Users\Getko" }
$localAppData = if ($env:LOCALAPPDATA) { $env:LOCALAPPDATA } else { Join-Path $userProfile "AppData\Local" }
$appData = if ($env:APPDATA) { $env:APPDATA } else { Join-Path $userProfile "AppData\Roaming" }
$desktopDir = Join-Path $userProfile "Desktop"
$startMenuPrograms = Join-Path $appData "Microsoft\Windows\Start Menu\Programs"

$desktopInstallDir = Join-Path $localAppData "Programs\Sialki Beta"
$cliInstallDir = Join-Path $userProfile ".sialki\bin"
$desktopShortcutPath = Join-Path $desktopDir "Sialki Beta.lnk"
$startMenuShortcutPath = Join-Path $startMenuPrograms "Sialki Beta.lnk"

# Ensure directories exist
if (-not (Test-Path $desktopInstallDir)) {
    New-Item -ItemType Directory -Path $desktopInstallDir -Force | Out-Null
}
if (-not (Test-Path $cliInstallDir)) {
    New-Item -ItemType Directory -Path $cliInstallDir -Force | Out-Null
}

# 2. Install Desktop Application
Write-Host "`n[1/3] Installing Native Desktop Application..." -ForegroundColor Green
if (Test-Path $desktopSource) {
    Write-Host "Copying packaged binaries to: $desktopInstallDir" -ForegroundColor Gray
    Copy-Item -Path "$desktopSource\*" -Destination $desktopInstallDir -Recurse -Force
    Write-Host "Desktop binaries deployed successfully." -ForegroundColor Green
} else {
    Write-Warning "Source directory '$desktopSource' not found. Make sure pack.ts has completed."
}

# Copy icon explicitly for shortcut reliability
if (Test-Path $iconSource) {
    Copy-Item -Path $iconSource -Destination (Join-Path $desktopInstallDir "sialki.ico") -Force
}

# Create Windows Shell Shortcuts
$wscript = New-Object -ComObject WScript.Shell

# Desktop Shortcut
$desktopExe = Join-Path $desktopInstallDir "Sialki Beta.exe"
if (-not (Test-Path $desktopExe)) {
    $altExe = Join-Path $desktopInstallDir "opencode.exe"
    if (Test-Path $altExe) {
        Copy-Item -Path $altExe -Destination $desktopExe -Force
    }
}

$iconTarget = if (Test-Path (Join-Path $desktopInstallDir "sialki.ico")) { Join-Path $desktopInstallDir "sialki.ico" } else { $desktopExe }

Write-Host "Creating Desktop shortcut: $desktopShortcutPath" -ForegroundColor Gray
$shortcut = $wscript.CreateShortcut($desktopShortcutPath)
$shortcut.TargetPath = $desktopExe
$shortcut.WorkingDirectory = $desktopInstallDir
$shortcut.IconLocation = "$iconTarget,0"
$shortcut.Description = "Sialki Beta - Autonomous Agent Architecture"
$shortcut.Save()

Write-Host "Creating Start Menu shortcut: $startMenuShortcutPath" -ForegroundColor Gray
$startShortcut = $wscript.CreateShortcut($startMenuShortcutPath)
$startShortcut.TargetPath = $desktopExe
$startShortcut.WorkingDirectory = $desktopInstallDir
$startShortcut.IconLocation = "$iconTarget,0"
$startShortcut.Description = "Sialki Beta - Autonomous Agent Architecture"
$startShortcut.Save()

# 3. Install CLI Executable
Write-Host "`n[2/3] Installing Sialki CLI..." -ForegroundColor Green
if (Test-Path $cliSource) {
    $cliDest = Join-Path $cliInstallDir "sialki.exe"
    $opencodeDest = Join-Path $cliInstallDir "opencode.exe"
    Write-Host "Deploying CLI binary to: $cliDest" -ForegroundColor Gray
    Copy-Item -Path $cliSource -Destination $cliDest -Force
    Copy-Item -Path $cliSource -Destination $opencodeDest -Force
    
    # Create batch wrapper helper
    $batPath = Join-Path $cliInstallDir "sialki.cmd"
    "@echo off`r`n`"%~dp0sialki.exe`" %*" | Set-Content -Path $batPath -Encoding ASCII
    
    Write-Host "CLI binary deployed successfully." -ForegroundColor Green
} else {
    Write-Warning "CLI binary '$cliSource' not found."
}

# 4. PATH Registration
Write-Host "`n[3/3] Registering Sialki CLI in User PATH..." -ForegroundColor Green
$currentUserPath = [Environment]::GetEnvironmentVariable("Path", [EnvironmentVariableTarget]::User)
if ($currentUserPath -notlike "*$cliInstallDir*") {
    $newPath = if ($currentUserPath) { "$currentUserPath;$cliInstallDir" } else { $cliInstallDir }
    [Environment]::SetEnvironmentVariable("Path", $newPath, [EnvironmentVariableTarget]::User)
    Write-Host "Added '$cliInstallDir' to User PATH." -ForegroundColor Green
} else {
    Write-Host "User PATH already contains '$cliInstallDir'." -ForegroundColor Yellow
}

Write-Host "`n==========================================================" -ForegroundColor Cyan
Write-Host "                 SIALKI BETA INSTALLED!                   " -ForegroundColor Yellow
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "Desktop App : $desktopExe" -ForegroundColor White
Write-Host "Desktop Icon: $desktopShortcutPath" -ForegroundColor White
Write-Host "Start Menu  : $startMenuShortcutPath" -ForegroundColor White
Write-Host "CLI Binary  : $cliInstallDir\sialki.exe" -ForegroundColor White
Write-Host "==========================================================" -ForegroundColor Cyan
