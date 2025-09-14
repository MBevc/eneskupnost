import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Users, Bell, CheckSquare } from "lucide-react";

export default function EnergetskaSkupnostApp() {
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

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Naslov */}
      <h1 className="text-2xl font-bold mb-6">Energetska skupnost – Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Poraba energije */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-2">Poraba članov</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={porabaData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                <Cell fill="#60a5fa" />
                <Cell fill="#34d399" />
                <Cell fill="#fbbf24" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Proizvodnja energije */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-2">Proizvodnja energije</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={proizvodnjaData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="kWh" fill="#4ade80" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Člani skupnosti */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-2">
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

        {/* Glasovanje */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-2">
            <CheckSquare size={20} /> Glasovanje
          </h2>
          <p className="mb-2">Ali podprete investicijo v novo sončno elektrarno?</p>
          <button className="px-3 py-2 bg-green-500 text-white rounded mr-2">DA</button>
          <button className="px-3 py-2 bg-red-500 text-white rounded">NE</button>
        </div>

        {/* Obvestila */}
        <div className="bg-white p-4 rounded-xl shadow md:col-span-2">
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-2">
            <Bell size={20} /> Obvestila
          </h2>
          <ul className="list-disc pl-6">
            <li>Naslednji sestanek: 15. marec 2025</li>
            <li>Nova sončna elektrarna je začela obratovati</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
