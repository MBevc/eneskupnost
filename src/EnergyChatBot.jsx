import React, { useState, useRef, useEffect } from "react";
import "./EnergyChatBot.css"; // <-- ime datoteke mora biti točno tako in v isti mapi

// Mock logic (lahko nadomestiš z realnim backend klicem)
const mockBotResponse = (message, step) => {
  const msg = message.toLowerCase().trim();

  if (["ja", "da", "seveda", "ok", "prav", "povej"].includes(msg)) {
    const guidedResponses = [
      "Super! Za začetek, ali želite nasvete glede zmanjšanja stroškov?",
      "Odlično! Ali vas zanimajo tudi subvencije, ki so na voljo?",
      "Razumem. Ali bi radi izvedeli več o največjih porabnikih elektrike v gospodinjstvu?",
      "V redu! Ali vas zanima tudi, kako premik porabe na nočno tarifo pomaga prihranku?",
    ];
    return guidedResponses[step % guidedResponses.length];
  }

  if (msg.includes("račun") || msg.includes("stroški")) {
    return "Poskusi izklapljati neuporabljene naprave, uporabljaj LED žarnice in premakni uporabo pralnega stroja ali pomivalnega stroja na nočno tarifo. Preveri tudi lokalne subvencije za varčne aparate.";
  }
  if (msg.includes("poraba") || msg.includes("naprave")) {
    return "Najprej preveri, kateri aparati porabijo največ (hladilnik, bojler, grelnik vode). Uporabi pametne vtičnice ali merilnike porabe, da jih prepoznaš.";
  }
  if (msg.includes("solar") || msg.includes("panel")) {
    return "To je lahko drago. Zaenkrat poskusi cenejše rešitve: LED žarnice, pametne vtičnice, boljši nadzor porabe in preveri, katere subvencije so na voljo za manjše izboljšave.";
  }
  if (msg.includes("subvencija") || msg.includes("subvencije") || msg.includes("subvencijah") ) {
    return "Preveri lokalne ali državne subvencije za varčne naprave, izolacijo ali pametne merilnike porabe.";
  }
  return "Lahko poskusiš izklopiti neuporabljene naprave, uporabljati LED žarnice ali premakniti uporabo največjih porabnikov na nočne tarife. Ali želiš več podrobnosti o subvencijah?";
};

const quickReplies = ["Da", "Ne", "Povej več"];

export default function EnergyChatBot() {
  const [messages, setMessages] = useState([
    { role: "bot", content: "Pozdravljeni! Sem vaš svetovalec za energetske prihranke. Kako vam lahko pomagam?" }
  ]);
  const [input, setInput] = useState("");
  const [step, setStep] = useState(0);
  const messagesEndRef = useRef(null);

  // Avtomatski scroll na dno
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  const sendMessage = (customMessage = null) => {
    const text = (customMessage ?? input).trim();
    if (!text) return;

    const currentStep = step;
    setMessages(prev => [...prev, { role: "user", content: text }]);
    setInput("");

    // Simulacija odgovora
    setTimeout(() => {
      const botReply = mockBotResponse(text, currentStep);
      setMessages(prev => [...prev, { role: "bot", content: botReply }]);
      setStep(s => s + 1);
    }, 350);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="ecb-container" role="application" aria-label="Energy chat bot">
      <div className="ecb-wrapper" >
        <div className="ecb-header">Svetovalec za energetske prihranke</div>

        <div className="ecb-window" >
          <div className="ecb-messages" >
            {messages.map((m, i) => (
              <div key={i} className={`ecb-message ${m.role === "bot" ? "ecb-bot" : "ecb-user"}`}>
                <div className="ecb-bubble">{m.content}</div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="ecb-controls">
          <div className="ecb-input-row">
            <input
              className="ecb-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Vprašajte bota..."
              aria-label="Vnos sporočila"
            />
            <button className="ecb-send-button" onClick={() => sendMessage()}>Pošlji</button>
          </div>

          <div className="ecb-quick-replies" role="list">
            {quickReplies.map((qr, idx) => (
              <button key={idx} className="ecb-quick-button" onClick={() => sendMessage(qr)} role="listitem">
                {qr}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
