import { useState } from "react";

const MONTHLY_CONSUMPTION_KWH = 700;

const EnergySurvey = () => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    struggles: [],
    efficiencyMeasures: [],
    subsidyAware: null,
    comfortIssues: [],
    billingIssues: [],
  });

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  const handleChange = (field, value, multiple = false) => {
    if (multiple) {
      setAnswers((prev) => ({
        ...prev,
        [field]: prev[field].includes(value)
          ? prev[field].filter((v) => v !== value)
          : [...prev[field], value],
      }));
    } else {
      setAnswers((prev) => ({ ...prev, [field]: value }));
    }
  };

  const generateAdvice = () => {
    const advice = [];

    // Poraba (vemo, da je 700 kWh)
    if (MONTHLY_CONSUMPTION_KWH >= 500) {
      advice.push(
        `Vaša mesečna poraba je približno ${MONTHLY_CONSUMPTION_KWH} kWh — razmislite o ukrepih za zmanjšanje.`
      );
    }

    // Stroški
    if (answers.struggles.includes("highCosts")) {
      advice.push(
        "Razmislite o optimizaciji porabe (varčne žarnice, električni aparati zunaj konic, pametni števec)."
      );
    }

    // Učinkovitost
    if (answers.efficiencyMeasures.includes("appliances")) {
      advice.push(
        "Zamenjava starih naprav z energetsko varčnimi lahko zmanjša mesečne stroške."
      );
    }
    if (answers.efficiencyMeasures.includes("lighting")) {
      advice.push("LED razsvetljava je cenovno ugoden ukrep z opaznimi prihranki.");
    }
    if (answers.efficiencyMeasures.includes("insulation")) {
      advice.push("Izboljšana izolacija zmanjša izgube toplote in stroške ogrevanja.");
    }

    // Subvencije
    if (!answers.subsidyAware) {
      advice.push(
        "Preverite možnosti lokalnih subvencij za energetsko učinkovite naprave in izolacijo."
      );
    }

    // Udobje
    if (answers.comfortIssues.includes("heating")) {
      advice.push(
        "Prilagodite ogrevanje ali uporabite pametne termostate za boljše udobje in prihranek."
      );
    }
    if (answers.comfortIssues.includes("lighting")) {
      advice.push("Optimizirajte naravno svetlobo in uporabite boljše urnike razsvetljave.");
    }

    // Računi
    if (answers.billingIssues.includes("billingConfusion")) {
      advice.push(
        "Preverite ali vaš dobavitelj omogoča preglednejše račune ali predplačniške opcije."
      );
    }

    return advice.length > 0
      ? advice
      : [
          "Vaša situacija je stabilna, še vedno pa lahko razmislite o prihrankih.",
        ];
  };

  return (
    <div className="survey">
      <div style={{ marginBottom: "8px", color: "#374151" }}>
        Znana mesečna poraba: <b>{MONTHLY_CONSUMPTION_KWH} kWh</b>
      </div>

      {step === 1 && (
        <div>
          <h2 className="survey-title">1. S katerimi težavami se soočate?</h2>
          <label className="survey-check">
            <input
              type="checkbox"
              checked={answers.struggles.includes("highCosts")}
              onChange={() => handleChange("struggles", "highCosts", true)}
            />
            Visoki stroški
          </label>
          <label className="survey-check">
            <input
              type="checkbox"
              checked={answers.struggles.includes("comfort")}
              onChange={() => handleChange("struggles", "comfort", true)}
            />
            Udobje doma
          </label>
          <button onClick={handleNext} className="survey-btn primary" style={{ marginTop: "8px" }}>
            Naprej
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="survey-title">2. Katere ukrepe za izboljšanje učinkovitosti že izvajate ali razmišljate o njih?</h2>
          <label className="survey-check">
            <input
              type="checkbox"
              checked={answers.efficiencyMeasures.includes("appliances")}
              onChange={() => handleChange("efficiencyMeasures", "appliances", true)}
            />
            Zamenjava starih aparatov z varčnimi
          </label>
          <label className="survey-check">
            <input
              type="checkbox"
              checked={answers.efficiencyMeasures.includes("lighting")}
              onChange={() => handleChange("efficiencyMeasures", "lighting", true)}
            />
            LED/varčne žarnice
          </label>
          <label className="survey-check">
            <input
              type="checkbox"
              checked={answers.efficiencyMeasures.includes("insulation")}
              onChange={() => handleChange("efficiencyMeasures", "insulation", true)}
            />
            Izolacija prostora/streh
          </label>
          <div className="survey-actions">
            <button onClick={handlePrev} className="survey-btn">Nazaj</button>
            <button onClick={handleNext} className="survey-btn primary">Naprej</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="survey-title">3. Ali poznate možnosti subvencij?</h2>
          <label className="survey-check">
            <input
              type="radio"
              name="subsidy"
              value="yes"
              checked={answers.subsidyAware === true}
              onChange={() => handleChange("subsidyAware", true)}
            />
            Da
          </label>
          <label className="survey-check">
            <input
              type="radio"
              name="subsidy"
              value="no"
              checked={answers.subsidyAware === false}
              onChange={() => handleChange("subsidyAware", false)}
            />
            Ne
          </label>
          <div className="survey-actions">
            <button onClick={handlePrev} className="survey-btn">Nazaj</button>
            <button onClick={handleNext} className="survey-btn primary">Naprej</button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div>
          <h2 className="survey-title">4. Katera vprašanja glede udobja vas najbolj motijo?</h2>
          <label className="survey-check">
            <input
              type="checkbox"
              checked={answers.comfortIssues.includes("heating")}
              onChange={() => handleChange("comfortIssues", "heating", true)}
            />
            Ogrevanje
          </label>
          <label className="survey-check">
            <input
              type="checkbox"
              checked={answers.comfortIssues.includes("lighting")}
              onChange={() => handleChange("comfortIssues", "lighting", true)}
            />
            Razsvetljava
          </label>
          <div className="survey-actions">
            <button onClick={handlePrev} className="survey-btn">Nazaj</button>
            <button onClick={handleNext} className="survey-btn primary">Naprej</button>
          </div>
        </div>
      )}

      {step === 5 && (
        <div>
          <h2 className="survey-title">5. Ali imate težave z razumevanjem računov?</h2>
          <label className="survey-check">
            <input
              type="checkbox"
              checked={answers.billingIssues.includes("billingConfusion")}
              onChange={() => handleChange("billingIssues", "billingConfusion", true)}
            />
            Računi so nerazumljivi ali nepričakovani
          </label>
          <div className="survey-actions">
            <button onClick={handlePrev} className="survey-btn">Nazaj</button>
            <button onClick={() => setStep(6)} className="survey-btn primary">Prikaži nasvete</button>
          </div>
        </div>
      )}

      {step === 6 && (
        <div>
          <h2 className="survey-title">Vaši nasveti</h2>
          <ul style={{ paddingLeft: "18px" }}>
            {generateAdvice().map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
          <button onClick={() => setStep(1)} className="survey-btn success" style={{ marginTop: "12px" }}>
            Začni znova
          </button>
        </div>
      )}
    </div>
  );
};

export default EnergySurvey;


