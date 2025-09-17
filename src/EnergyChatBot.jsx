import { useState } from "react";

// OpenAI integration (WARNING: exposing keys in frontend is insecure; use only for demo)
// Use backend API; do not expose keys in frontend

const SYSTEM_PROMPT = `Ti si svetovalec za energetske skupnosti, specializiran za električno energijo.
Tvoj cilj je pomoč uporabnikom z nizkocenovnimi rešitvami in izboljšanjem energetske učinkovitosti.
Ne priporočaj dragih investicij (npr. dragi sončni paneli, velika prenova hiše).
Pomagaj uporabnikom prepoznati:

Subvencije in podporo – kje lahko dobijo lokalne ali državno subvencije za varčne naprave in izolacijo.

Optimizacijo porabe skozi dan – uporaba različnih tarif (dnevna/nočna, nizka/pika).

Največje porabnike – kako prepoznati aparate, ki porabijo največ, in zmanjšati porabo.

Ozaveščanje in navade – preprosti ukrepi za zmanjšanje porabe (izklop, varčne žarnice, pametne vtičnice).

Omejitve in ton:

Odgovori naj bodo kratki, jasni in praktični (2–4 stavki).
Spodbujaj uporabnika, naj sprejme majhne spremembe, ki vodijo k prihrankom.
Če uporabnik sprašuje o investicijah, ki so drage, jih preusmeri na cenejše alternative ali subvencije.
Če uporabnik sprašuje o specifičnih napravah, svetuj na osnovi porabe in časovnega optimiziranja.`;

const EnergyChatBot = () => {
  const [messages, setMessages] = useState([
    { role: "bot", content: "Pozdravljeni! Sem vaš svetovalec za energetske prihranke. Vidim, da ste v preteklem mesecu porabili 700 kWh. Kako vam lahko pomagam?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);

    // Call local Ollama
    try {
      setIsLoading(true);
      const apiBase = process.env.REACT_APP_OLLAMA_API || "http://localhost:11434";
      const response = await fetch(`${apiBase}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "mistral:instruct",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages.map((m) => ({ role: m.role === "bot" ? "assistant" : "user", content: m.content })),
            { role: "user", content: input },
          ]
        }),
      });

      const data = await response.json();
      const content = data?.message?.content?.trim() || "Oprostite, trenutno ne morem odgovoriti.";
      setMessages((prev) => [...prev, { role: "bot", content }]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: "bot", content: "Prišlo je do napake pri povezavi. Poskusite znova." }]);
    } finally {
      setIsLoading(false);
    }

    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((m, i) => (
          <div key={i} className={m.role === "bot" ? "chat-row bot" : "chat-row user"}>
            <span className={m.role === "bot" ? "chat-bubble bot" : "chat-bubble user"}>
              {m.content}
            </span>
          </div>
        ))}
        {isLoading && (
          <div className="chat-row bot">
            <span className="chat-bubble bot">Tipkam odgovor…</span>
          </div>
        )}
      </div>
      <div className="chat-input-row">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Vnesite svoje vprašanje..."
          className="chat-input"
        />
        <button onClick={sendMessage} className="chat-send" disabled={isLoading}>
          {isLoading ? "…" : "Pošlji"}
        </button>
      </div>
    </div>
  );
};

export default EnergyChatBot;


