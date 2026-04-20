param(
  [switch]$Headless = $true
)

$ErrorActionPreference = "Stop"

function Write-Step {
  param([string]$Message)

  Write-Host "==> $Message"
}

function Ensure-WslInstalled {
  & cmd.exe /d /c "wsl.exe --status 1>nul 2>nul" | Out-Null

  if ($LASTEXITCODE -eq 0) {
    return
  }

  throw @"
WSL is required for the current Turso CLI install flow on Windows.

Run this once in an elevated PowerShell session:
  wsl.exe --install

Then restart Windows and run this command again.
"@
}

$loginFlag = if ($Headless) { "--headless" } else { "" }

$wslScript = @'
set -e

export PATH="$HOME/.turso:$PATH"

if ! command -v curl >/dev/null 2>&1; then
  if command -v apt-get >/dev/null 2>&1; then
    sudo apt-get update
    sudo apt-get install -y curl
  else
    echo "curl is required inside WSL to install the Turso CLI." >&2
    exit 1
  fi
fi

if ! command -v turso >/dev/null 2>&1; then
  curl -sSfL https://get.tur.so/install.sh | bash
  export PATH="$HOME/.turso:$PATH"
fi

turso --version
turso auth login __LOGIN_FLAG__
'@

$wslScript = $wslScript.Replace("__LOGIN_FLAG__", $loginFlag)

$encodedWslScript = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes($wslScript))

try {
  Write-Step "Checking Windows prerequisites"
  Ensure-WslInstalled

  Write-Step "Installing Turso CLI in WSL if needed"
  Write-Step "Starting Turso login"
  & wsl.exe bash -lc "printf '%s' '$encodedWslScript' | base64 -d | bash"

  if ($LASTEXITCODE -ne 0) {
    throw "Turso login failed inside WSL."
  }

  Write-Host ""
  Write-Host "Login finished. Next commands inside frontend:"
  Write-Host "  turso db create mindguardd"
  Write-Host "  turso db show --url mindguardd"
  Write-Host "  turso db tokens create mindguardd"
  Write-Host "  Copy the values into .env.local"
} catch {
  Write-Error $_
  exit 1
}
