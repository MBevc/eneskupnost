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
import { Users, Bell, CheckSquare } from "lucide-react";
import "./App.css";

export default function EnergetskaSkupnostApp() {
  const [activeTab, setActiveTab] = useState("pregled");
  const COLORS = ["#60a5fa", "#34d399", "#fbbf24"];

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

        {activeTab === "clani" && (
          <div className="card">
            <h2>Člani skupnosti</h2>
            <ul>
              {data.clani.map((clan) => (
                <li key={clan.id}>
                  {clan.ime} – delež: {clan.delez}
                </li>
              ))}
            </ul>
            <button className="primary">Dodaj člana</button>
          </div>
        )}

        {activeTab === "glasovanje" && (
          <div className="card">
            <h2>Glasovanje</h2>
            {data.glasovanja.map((glas) => (
              <div key={glas.id} className="card">
                <p>{glas.predlog}</p>
                {glas.status === "odprto" ? (
                  <div>
                    <button className="success">DA</button>
                    <button className="danger">NE</button>
                  </div>
                ) : (
                  <p style={{ color: "#6b7280", fontSize: "0.9rem" }}>
                    Glasovanje zaključeno
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === "obvestila" && (
          <div className="card">
            <h2>Obvestila</h2>
            <ul>
              {data.obvestila.map((o, index) => (
                <li key={index}>{o}</li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}
