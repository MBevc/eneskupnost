import { useState } from "react";
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

export default function EnergetskaSkupnostApp() {
  const [activeTab, setActiveTab] = useState("pregled");

  // Mock podatki
  const porabaData = [
    { name: "Janez", value: 30 },
    { name: "Maja", value: 45 },
    { name: "Tina", value: 25 },
  ];

  const proizvodnjaData = [
    { name: "Sončna elektrarna", kWh: 120 },
    { name: "Vetrnica", kWh: 80 },
    { name: "Shramba", kWh: 40 },
  ];

  // Barve za PieChart
  const COLORS = ["#60a5fa", "#34d399", "#fbbf24"];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="p-6 border-b bg-white flex justify-between items-center">
        <h1 className="text-2xl font-bold">Energetska skupnost</h1>
        <div className="flex gap-4">
          <Bell />
          <Users />
        </div>
      </header>

      {/* Navigacija zavihkov */}
      <nav className="flex gap-6 px-6 py-3 border-b bg-white">
        {["pregled", "clani", "glasovanje", "obvestila"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 border-b-2 ${
              activeTab === tab
                ? "border-black font-semibold"
                : "border-transparent text-gray-500"
            }`}
          >
            {tab === "pregled" && "Pregled"}
            {tab === "clani" && "Člani"}
            {tab === "glasovanje" && "Glasovanje"}
            {tab === "obvestila" && "Obvestila"}
          </button>
        ))}
      </nav>

      {/* Vsebina zavihkov */}
      <main className="p-6">
        {/* Pregled */}
        {activeTab === "pregled" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-semibold mb-2">Poraba energije</h2>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={porabaData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label
                  >
                    {porabaData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-semibold mb-2">Proizvodnja energije</h2>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={proizvodnjaData}>
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
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
              <Users size={20} /> Člani skupnosti
            </h2>
            <ul className="list-disc pl-6">
              <li>Janez Novak</li>
              <li>Maja Kovač</li>
              <li>Tina Zupan</li>
            </ul>
            <button className="mt-4 px-3 py-2 bg-blue-500 text-white rounded">
              Dodaj člana
            </button>
          </div>
        )}

        {/* Glasovanje */}
        {activeTab === "glasovanje" && (
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
              <CheckSquare size={20} /> Glasovanje
            </h2>
            <p className="mb-2">Ali podprete investicijo v novo sončno elektrarno?</p>
            <button className="px-3 py-2 bg-green-500 text-white rounded mr-2">DA</button>
            <button className="px-3 py-2 bg-red-500 text-white rounded">NE</button>
          </div>
        )}

        {/* Obvestila */}
        {activeTab === "obvestila" && (
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
              <Bell size={20} /> Obvestila
            </h2>
            <ul className="list-disc pl-6">
              <li>Naslednji sestanek: 15. marec 2025</li>
              <li>Nova sončna elektrarna je začela obratovati</li>
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}
