import { useState } from "react";
import data from "./data.json";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Users, Bell, AlertTriangle, Check, X } from "lucide-react";
import "./App.css";

export default function EnergetskaSkupnostApp() {
  const [activeTab, setActiveTab] = useState("pregled");
  const [porabaMultiplier, setPorabaMultiplier] = useState(1.2);
  const [maxDelez, setMaxDelez] = useState(30);
  const [openMsg, setOpenMsg] = useState(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const avgPoraba =
    data.poraba.reduce((sum, p) => sum + p.value, 0) / data.poraba.length;

  const tveganiClani = data.clani.filter((clan) => {
    const poraba = data.poraba.find((p) =>
      p.name.includes(clan.ime.split(" ")[0])
    );
    if (!poraba) return false;
    const deležNum = parseInt(clan.delez.replace("%", ""));
    return poraba.value > avgPoraba * porabaMultiplier && deležNum < maxDelez;
  });

  const maxValue = Math.max(
    ...data.poraba.map((p) => p.value),
    ...data.proizvodnja.map((p) => p.kWh)
  );

  const totalPoraba = data.poraba.reduce((s, p) => s + p.value, 0);
  const totalProizvodnja = data.proizvodnja.reduce((s, p) => s + p.kWh, 0);

  const getRiskColor = (value) => {
    if (value < avgPoraba * 0.9) return "#34d399";
    if (value < avgPoraba * 1.1) return "#facc15";
    if (value < avgPoraba * 1.3) return "#fb923c";
    return "#ef4444";
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const entry = payload[0].payload;
      const clan = data.clani.find((c) =>
        entry.name.includes(c.ime.split(" ")[0])
      );
      return (
        <div className="tooltip-box">
          <p>
            <b>{clan.ime}</b>
          </p>
          <p>Delež: {clan.delez}</p>
          <p>Poraba: {entry.value} kWh</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      {/* Header */}
      <header>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src="/favicon.png" alt="Logo" className="logo" />
          <h1>Energetska skupnost</h1>
        </div>
        <div className="header-actions">
          <Bell />
          <div className="user-menu-wrapper">
            <button
              className="icon-button"
              aria-haspopup="menu"
              aria-expanded={isUserMenuOpen}
              onClick={() => setIsUserMenuOpen((v) => !v)}
            >
              <Users />
            </button>
            {isUserMenuOpen && (
              <div className="user-menu" role="menu">
                <div className="user-menu-header">Mojca</div>
                <button className="user-menu-item" role="menuitem">Nastavitve</button>
                <button className="user-menu-item" role="menuitem">Odjava</button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Navigacija */}
      <nav>
        {["pregled", "clani", "glasovanje", "obvestila"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={activeTab === tab ? "active" : ""}
          >
            {tab === "pregled" && "Pregled"}
            {tab === "clani" && "Člani"}
            {tab === "glasovanje" && "Glasovanje"}
            {tab === "obvestila" && "Obvestila"}
          </button>
        ))}
      </nav>

      <main>
        {/* PREGLED */}
        {activeTab === "pregled" && (
          <div>
            <div className="grid">
              <div className="card">
                <h2>Poraba energije članov</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data.poraba}>
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, maxValue]} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="card">
                <h2>Proizvodnja energije</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data.proizvodnja}>
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, maxValue]} />
                    <Tooltip />
                    <Bar dataKey="kWh" fill="#34d399" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Neto bilanca */}
            <div className="card" style={{ marginTop: "20px" }}>
              <h2>Neto bilanca skupnosti</h2>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart
                  layout="vertical"
                  data={[
                    {
                      name: "Skupaj",
                      Poraba: totalPoraba,
                      Proizvodnja: totalProizvodnja,
                    },
                  ]}
                >
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" />
                  <Tooltip />
                  <Bar dataKey="Poraba" fill="#3b82f6" />
                  <Bar dataKey="Proizvodnja" fill="#34d399" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* ČLANI */}
        {activeTab === "clani" && (
          <div className="card">
            <h2 style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Users size={20} /> Člani skupnosti
            </h2>

            <div className="flex-wrap">
              {/* Tortni graf */}
              <div style={{ flex: 2, minWidth: "300px" }}>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={data.poraba}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={120}
                    >
                      {data.poraba.map((entry, index) => (
                        <Cell key={index} fill={getRiskColor(entry.value)} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Slider + legenda */}
              <div className="slider-panel">
                <h4>Nastavitve praga</h4>
                <label>
                  Prag porabe (x povprečje): {porabaMultiplier.toFixed(1)}
                </label>
                <input
                  type="range"
                  min="1"
                  max="2"
                  step="0.1"
                  value={porabaMultiplier}
                  onChange={(e) => setPorabaMultiplier(parseFloat(e.target.value))}
                />
                <br />
                <label>Maksimalen delež (%): {maxDelez}</label>
                <input
                  type="range"
                  min="5"
                  max="50"
                  step="5"
                  value={maxDelez}
                  onChange={(e) => setMaxDelez(parseInt(e.target.value))}
                />

                {/* Legenda zdaj pod sliderjem */}
                <div style={{ marginTop: "20px" }}>
                  <h4>Legenda tveganja</h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <span style={{ color: "#34d399" }}>● nizka</span>
                    <span style={{ color: "#facc15" }}>● srednja</span>
                    <span style={{ color: "#fb923c" }}>● visoka</span>
                    <span style={{ color: "#ef4444" }}>● zelo visoka</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabela članov */}
            <div className="card" style={{ marginTop: "20px" }}>
              <h3>Seznam članov</h3>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th align="left">Ime</th>
                    <th align="left">Delež</th>
                    <th align="left">Poraba (kWh)</th>
                    <th align="left">Opozorilo</th>
                  </tr>
                </thead>
                <tbody>
                  {data.clani
                    .sort(
                      (a, b) =>
                        parseInt(b.delez.replace("%", "")) -
                        parseInt(a.delez.replace("%", ""))
                    )
                    .map((clan) => {
                      const poraba = data.poraba.find((p) =>
                        p.name.includes(clan.ime.split(" ")[0])
                      );
                      const jeTvegan = tveganiClani.some((t) => t.id === clan.id);
                      return (
                        <tr
                          key={clan.id}
                          style={{
                            background: jeTvegan ? "#fee2e2" : "transparent",
                          }}
                        >
                          <td>{clan.ime}</td>
                          <td>{clan.delez}</td>
                          <td>{poraba ? poraba.value : "-"}</td>
                          <td>
                            {jeTvegan && (
                              <span style={{ color: "#ef4444" }}>
                                <AlertTriangle size={16} /> Tvegan
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        )}
   {/* GLASOVANJE */}
        {activeTab === "glasovanje" && (
          <div className="card">
            <h2>Glasovanje</h2>
            <p>Ali se strinjate z novim pravilnikom o delitvi prihrankov?</p>
            <div style={{ display: "flex", gap: "12px", margin: "12px 0" }}>
              <button className="vote-btn yes">
                <Check /> ZA
              </button>
              <button className="vote-btn no">
                <X /> PROTI
              </button>
              <button className="vote-btn neutral">Vzdržan</button>
            </div>
            <h3>Pretekla glasovanja</h3>
            <ul>
              <li>
                Sončna elektrarna 2024: <b>ZA 78%</b>, PROTI 15%, VZDRŽANI 7%
              </li>
              <li>
                Novi član: <b>ZA 92%</b>, PROTI 5%, VZDRŽANI 3%
              </li>
            </ul>
          </div>
        )}

        {/* OBVESTILA */}
        {activeTab === "obvestila" && (
          <div className="card">
            <h2>Obvestila</h2>
            {data.obvestila.map((msg, i) => (
              <div key={i} className="msg">
                <div
                  className="msg-header"
                  onClick={() => setOpenMsg(openMsg === i ? null : i)}
                >
                  <b>{msg.title}</b> <span>{openMsg === i ? "▲" : "▼"}</span>
                </div>
                {openMsg === i && (
                  <div className="msg-body">{msg.content}</div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}