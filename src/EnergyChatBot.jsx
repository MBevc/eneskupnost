import { useState } from "react";

// Preprost lokalni “mock” chat bot za demo z avtomatskim vodenjem
const mockBotResponse = (message, step) => {
  const msg = message.toLowerCase().trim();

  // Če uporabnik odgovori samo pritrdilno
  if (["ja", "da", "seveda", "ok", "prav"].includes(msg)) {
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
  if (msg.includes("subvencije")) {
    return "Preveri lokalne ali državne subvencije za varčne naprave, izolacijo ali pametne merilnike porabe.";
  }
  return "Lahko poskusiš izklopiti neuporabljene naprave, uporabljati LED žarnice ali premakniti uporabo največjih porabnikov na nočne tarife. Ali želiš več podrobnosti o subvencijah?";
};

const quickReplies = ["Da", "Ne", "Povej več"];

const EnergyChatBot = () => {
  const [messages, setMessages] = useState([
    { role: "bot", content: "Pozdravljeni! Sem vaš svetovalec za energetske prihranke. Kako vam lahko pomagam?" }
  ]);
  const [input, setInput] = useState("");
  const [step, setStep] = useState(0);

  const sendMessage = (customMessage = null) => {
    const text = customMessage || input;
    if (!text.trim()) return;

    const userMsg = { role: "user", content: text };
    setMessages([...messages, userMsg]);

    // Generiranje odgovora bota
    const botReply = mockBotResponse(text, step);
    setTimeout(() => {
      setMessages(prev => [...prev, { role: "bot", content: botReply }]);
      setStep(step + 1);
    }, 500);

    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-4 bg-white shadow-lg rounded-2xl border-2 border-green-400 flex flex-col h-[600px]">
        <div className="flex-1 overflow-y-auto mb-3 p-3 rounded-lg bg-gray-50">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`mb-3 flex ${m.role === "bot" ? "justify-start" : "justify-end"}`}
            >
              <span
                className={`inline-block px-3 py-2 rounded-2xl shadow-sm max-w-[80%] whitespace-pre-wrap break-words ${
                  m.role === "bot"
                    ? "bg-green-100 text-gray-800"
                    : "bg-green-500 text-white"
                }`}
              >
                {m.content}
              </span>
            </div>
          ))}
        </div>
        <div className="flex flex-col space-y-2">
          <div className="flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Vprašajte bota..."
              className="flex-1 border border-green-400 p-2 rounded-l-xl focus:outline-none"
            />
            <button
              onClick={() => sendMessage()}
              className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-r-xl"
            >
              Pošlji
            </button>
          </div>
          <div className="flex space-x-2 justify-center">
            {quickReplies.map((qr, idx) => (
              <button
                key={idx}
                onClick={() => sendMessage(qr)}
                className="bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1 rounded-full text-sm shadow-sm"
              >
                {qr}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnergyChatBot;
