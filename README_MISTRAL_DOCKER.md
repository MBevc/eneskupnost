Mistral 7B Instruct - Local Docker Setup with Ollama (Windows-friendly)

Requirements
- Docker Desktop for Windows
- PowerShell

Steps
1) Start Ollama (with GPU if available):
   - docker compose up -d

   This launches Ollama on port 11434 and pulls `mistral:instruct`.

2) Test the API:
   - curl http://localhost:11434/api/tags
   - curl -s -X POST http://localhost:11434/api/chat -H "Content-Type: application/json" -d '{
       "model": "mistral:instruct",
       "messages": [
         {"role":"system","content":"You are a helpful assistant."},
         {"role":"user","content":"Hello!"}
       ]
     }'

Integrating with the React app
- The server exposes an Ollama API. Call http://localhost:11434/api/chat.
- Example fetch in the browser:

```js
const reply = await fetch('http://localhost:11434/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'mistral:instruct',
    messages: [
      { role: 'system', content: 'Ti si svetovalec za energetske skupnosti...' },
      { role: 'user', content: 'Kako zmanjšam račun?' }
    ]
  })
});
const data = await reply.json();
console.log(data.message.content);
```

Notes
- Adjust CPU/memory in docker-compose.yml under `deploy.resources` if needed.
- For GPU, replace the image with a CUDA-enabled llama.cpp build and add the NVIDIA runtime.

