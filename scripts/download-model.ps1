param(
  [string]$ModelUrl = "https://huggingface.co/TheBloke/Mistral-7B-Instruct-v0.2-GGUF/resolve/main/mistral-7b-instruct-v0.2.Q4_K_M.gguf?download=true",
  [string]$OutDir = "../models"
)

$ErrorActionPreference = "Stop"

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
$modelsDir = Join-Path $scriptDir $OutDir
if (!(Test-Path $modelsDir)) { New-Item -ItemType Directory -Path $modelsDir | Out-Null }

$outFile = Join-Path $modelsDir "mistral-7b-instruct-v0.2.Q4_K_M.gguf"
Write-Host "Downloading model to $outFile ..."

# Use curl.exe (not PowerShell alias) for speed; resume and retries enabled
$curlExe = "curl.exe"
if (-not (Get-Command $curlExe -ErrorAction SilentlyContinue)) {
  throw "curl.exe not found. Please install curl or run from a system with curl available."
}

# Build args: follow redirects, fail on errors, retry a few times, resume partial, show progress bar
$curlArgs = @(
  "-L", "--fail", "--retry", "3", "--retry-delay", "3",
  "-C", "-",
  "--progress-bar",
  "-o", $outFile,
  $ModelUrl
)

& $curlExe @curlArgs
if ($LASTEXITCODE -ne 0) {
  throw "curl download failed with exit code $LASTEXITCODE"
}

Write-Host "Download complete. File saved at: $outFile"

