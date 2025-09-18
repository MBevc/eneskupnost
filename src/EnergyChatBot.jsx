import React, { useState, useRef, useEffect } from "react";
import "./EnergyChatBot.css";

// Preprost stemmer za robustno zaznavanje ključnih besed
const stem = (text) => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/(anje|anjev|ati|iti|enje|ov|ev|i|a|o|e|u|y)$/g, "");
};

const mockBotResponse = (message, step, prevGuidedIndex) => {

  let msg = message.trim().toLowerCase();
  console.log(msg);

  if (["ja", "da", "seveda", "ok", "prav"].includes(msg)) {
    const guidedResponses = [
      "Super! Za začetek, ali želite nasvete glede zmanjšanja stroškov? Če ja, me vprašajte.",
      "Odlično! Ali vas zanimajo tudi subvencije, ki so na voljo? Če ja, me vprašajte.",
      "Razumem. Ali bi radi izvedeli več o največjih porabnikih elektrike v gospodinjstvu? Če ja, me vprašajte.",
      "V redu! Ali vas zanima tudi, kako premik porabe na nočno tarifo pomaga prihranku? Če ja, me vprašajte.",
    ];
    const nextIndex = (prevGuidedIndex + 1);
    return { reply: guidedResponses[nextIndex], guidedIndex: nextIndex };
  }
  msg = stem(msg);
  

  if (msg.includes("račun") || msg.includes("strosk")) {
    return { reply: "Poskusi izklapljati neuporabljene naprave, uporabljaj LED žarnice in premakni uporabo pralnega stroja ali pomivalnega stroja na nočno tarifo. Preveri tudi lokalne subvencije za varčne aparate. Ali želiš več podrobnosti o subvencijah?", guidedIndex: prevGuidedIndex };
  }
  if (msg.includes("porab") || msg.includes("naprav")) {
    return { reply: "Najprej preveri, kateri aparati porabijo največ (hladilnik, bojler, grelnik vode). Uporabi pametne vtičnice ali merilnike porabe, da jih prepoznaš. Ali želiš več podrobnosti o subvencijah?", guidedIndex: prevGuidedIndex };
  }
  if (msg.includes("solar") || msg.includes("panel")) {
    return { reply: "To je lahko drago. Zaenkrat poskusi cenejše rešitve: LED žarnice, pametne vtičnice, boljši nadzor porabe in preveri, katere subvencije so na voljo za manjše izboljšave. Ali želiš več podrobnosti o subvencijah?", guidedIndex: prevGuidedIndex };
  }
  if (msg.includes("subvenc")) {
    return { reply: "Preveri lokalne ali državne subvencije za varčne naprave, izolacijo ali pametne merilnike porabe.", guidedIndex: prevGuidedIndex };
  }
  return { reply: "Lahko poskusiš izklopiti neuporabljene naprave, uporabljati LED žarnice ali premakniti uporabo največjih porabnikov na nočne tarife. Ali želiš več podrobnosti o subvencijah?", guidedIndex: prevGuidedIndex };
};

const quickReplies = ["Da", "Ne"];

export default function EnergyChatBot() {
  const [messages, setMessages] = useState([
    { role: "bot", content: "Pozdravljeni! Sem vaš svetovalec za energetske prihranke. Kako vam lahko pomagam?" }
  ]);
  const [input, setInput] = useState("");
  const [step, setStep] = useState(0);
  const [guidedIndex, setGuidedIndex] = useState(-1);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  const sendMessage = (customMessage = null) => {
    const text = (customMessage ?? input).trim();
    if (!text) return;

    const currentStep = step;
    setMessages(prev => [...prev, { role: "user", content: text }]);
    setInput("");

    setTimeout(() => {
      const { reply, guidedIndex: newGuidedIndex } = mockBotResponse(text, currentStep, guidedIndex);
      setMessages(prev => [...prev, { role: "bot", content: reply }]);
      setStep(s => s + 1);
      setGuidedIndex(newGuidedIndex);
    }, 350);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="ecb-container" role="application" aria-label="Energy chat bot">
      <div className="ecb-wrapper" >
        <div className="ecb-header">Svetovalec za energetske prihranke</div>

        <div className="ecb-window">
          <div className="ecb-messages">
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
