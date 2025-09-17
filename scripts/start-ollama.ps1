# Start Ollama server for local development
Write-Host "Starting Ollama server..."
Write-Host "Make sure Ollama is installed: https://ollama.ai/download"
Write-Host ""

# Check if Ollama is installed
if (-not (Get-Command ollama -ErrorAction SilentlyContinue)) {
    Write-Error "Ollama not found. Please install from https://ollama.ai/download"
    exit 1
}

# Check if mistral:instruct model is available
Write-Host "Checking for mistral:instruct model..."
$models = ollama list 2>$null
if ($models -notmatch "mistral:instruct") {
    Write-Host "Pulling mistral:instruct model (this may take a few minutes)..."
    ollama pull mistral:instruct
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Failed to pull mistral:instruct model"
        exit 1
    }
}

Write-Host "Starting Ollama server on http://localhost:11434"
Write-Host "Press Ctrl+C to stop"
Write-Host ""

ollama serve
