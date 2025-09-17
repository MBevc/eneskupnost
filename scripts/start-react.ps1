# Start React development server
Write-Host "Starting React development server..."
Write-Host "Make sure Node.js is installed and dependencies are installed with 'npm install'"
Write-Host ""

# Check if Node.js is installed
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Error "Node.js not found. Please install from https://nodejs.org/"
    exit 1
}

# Check if package.json exists
if (-not (Test-Path "package.json")) {
    Write-Error "package.json not found. Are you in the correct directory?"
    exit 1
}

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..."
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Failed to install dependencies"
        exit 1
    }
}

Write-Host "Starting React app on http://localhost:3000"
Write-Host "Make sure Ollama is running in another terminal"
Write-Host ""

npm start
