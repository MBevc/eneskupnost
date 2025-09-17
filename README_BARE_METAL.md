# Bare Metal Setup - Ollama + React (Windows)

## Prerequisites
- Windows 10/11
- PowerShell
- Node.js (for React app)

## Step 1: Install Ollama
1. Download from https://ollama.ai/download
2. Install the Windows installer
3. Open PowerShell and verify: `ollama --version`

## Step 2: Pull Mistral Model
```powershell
ollama pull mistral:instruct
```

## Step 3: Start Ollama Server
```powershell
ollama serve
```
Keep this terminal open. Ollama runs on http://localhost:11434

## Step 4: Start React App
In a new terminal:
```powershell
cd /path/to/eneskupnost
npm install
npm start
```

## Step 5: Test the Chat
1. Open http://localhost:3000
2. Go to "Priporočila" → "Prilagojen vmesnik"
3. The chatbot should connect to your local Ollama

## Troubleshooting
- If Ollama won't start: Check Windows Defender/firewall
- If model download fails: Try `ollama pull mistral:instruct` again
- If chat fails: Check that Ollama is running on port 11434

## Optional: GPU Support
- Install NVIDIA drivers
- Ollama will automatically use GPU if available
- Check with: `ollama ps` (should show GPU usage)
