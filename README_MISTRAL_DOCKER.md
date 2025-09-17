Mistral 7B Instruct (Q4_K_M) - Local Docker Setup (Windows-friendly)

Requirements
- Docker Desktop for Windows
- PowerShell

Steps
1) Download the model (one-time):
   - Open PowerShell in this folder and run:
     powershell -ExecutionPolicy Bypass -File .\scripts\download-model.ps1

   This saves the file to `models/mistral-7b-instruct-v0.2.Q4_K_M.gguf`.

2) Start the model server:
   - docker compose up -d

   This launches llama.cpp server on port 8080.

3) Test the API:
   - curl http://localhost:8080/health
   - curl -s -X POST http://localhost:8080/v1/chat/completions ^
       -H "Content-Type: application/json" ^
       -d '{
         "model": "mistral-7b-instruct-v0.2.Q4_K_M.gguf",
         "messages": [
           {"role":"system","content":"You are a helpful assistant."},
           {"role":"user","content":"Hello!"}
         ]
       }'

Integrating with the React app
- The server is OpenAI-compatible. You can call http://localhost:8080/v1/chat/completions.
- Example fetch in the browser:

```js
const reply = await fetch('http://localhost:8080/v1/chat/completions', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'mistral-7b-instruct-v0.2.Q4_K_M.gguf',
    messages: [
      { role: 'system', content: 'Ti si svetovalec za energetske skupnosti...' },
      { role: 'user', content: 'Kako zmanjšam račun?' }
    ],
    temperature: 0.3,
    max_tokens: 220,
  })
});
const data = await reply.json();
console.log(data.choices[0].message.content);
```

Notes
- Adjust CPU/memory in docker-compose.yml under `deploy.resources` if needed.
- For GPU, replace the image with a CUDA-enabled llama.cpp build and add the NVIDIA runtime.

