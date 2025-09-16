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
import { Users, Bell, CheckSquare, AlertTriangle } from "lucide-react";
import "./App.css";

export default function EnergetskaSkupnostApp() {
  const [activeTab, setActiveTab] = useState("pregled");
  const COLORS = ["#60a5fa", "#34d399", "#fbbf24"];

  // --- DETEKCIJA ENERGETSKE REVŠČINE ---
  // Povprečna poraba
  const avgPoraba =
    data.poraba.reduce((sum, p) => sum + p.value, 0) / data.poraba.length;

  // Izračun tvegani člani (poraba > povprečje && delež < 30%)
  const tveganiClani = data.clani.filter((clan) => {
    const poraba = data.poraba.find((p) => p.name.includes(clan.ime.split(" ")[0]));
    if (!poraba) return false;
    const deležNum = parseInt(clan.delez.replace("%", ""));
    return poraba.value > avgPoraba && deležNum < 30;
  });

  return (
    <div>
      {/* Header z logotipom */}
      <header>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src="/favicon.png" alt="Logo" className="logo" />
          <h1>Energetska skupnost</h1>
        </div>
        <div>
          <Bell />
          <Users />
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

      {/* Vsebina */}
      <main>
        {/* Pregled */}
        {activeTab === "pregled" && (
          <div className="grid">
            <div className="card">
              <h2>Poraba energije</h2>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={data.poraba}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label
                  >
                    {data.poraba.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="card">
              <h2>Proizvodnja energije</h2>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data.proizvodnja}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="kWh" fill="#34d399" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

{/* Člani */}
{activeTab === "clani" && (
  <div className="card">
    <h2 style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <Users size={20} /> Člani skupnosti
    </h2>
    <ul>
      {data.clani.map((clan) => (
        <li key={clan.id}>
          {clan.ime} – delež: {clan.delez}
        </li>
      ))}
    </ul>
    <button className="primary">Dodaj člana</button>

    {/* Prikaz ogroženih članov */}
    {tveganiClani.length > 0 && (
      <div
        className="card"
        style={{ marginTop: "20px", border: "1px solid #f59e0b" }}
      >
        <h3
          style={{
            color: "#b45309",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <AlertTriangle size={18} /> Člani v tveganju energetske revščine
        </h3>
        <ul>
          {tveganiClani.map((c) => (
            <li key={c.id}>
              ⚠️ {c.ime} – delež: {c.delez}
            </li>
          ))}
        </ul>

        {/* --- NOV GRAF --- */}
        <div style={{ marginTop: "20px" }}>
          <h4>Primerjava porabe med člani</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data.poraba}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="value"
                label={{ position: "top" }}
                // Rdeča za tvegane, zelena za ostale
                fill="#34d399"
              >
                {data.poraba.map((entry, index) => {
                  const clan = data.clani.find((c) =>
                    entry.name.includes(c.ime.split(" ")[0])
                  );
                  const jeTvegan = tveganiClani.some((t) => t.id === clan?.id);
                  return (
                    <Cell
                      key={`cell-${index}`}
                      fill={jeTvegan ? "#ef4444" : "#34d399"}
                    />
                  );
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    )}
  </div>
)}

        {/* Glasovanje in obvestila ostaneta enaka */}
      </main>
    </div>
  );
}
