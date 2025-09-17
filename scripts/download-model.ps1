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

Invoke-WebRequest -Uri $ModelUrl -OutFile $outFile

Write-Host "Download complete. File saved at: $outFile"

