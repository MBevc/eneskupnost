import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Users, Bell, FilePlus, Vote } from "lucide-react";

const data = [
  { name: "Jan", poraba: 240, proizvodnja: 300 },
  { name: "Feb", poraba: 220, proizvodnja: 280 },
  { name: "Mar", poraba: 260, proizvodnja: 310 },
];

export default function EnergetskaSkupnostApp() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Skupnost Energije</h1>
        <Button variant="outline" className="flex gap-2"><Bell size={18}/> Obvestila</Button>
      </header>

      <Tabs defaultValue="dashboard">
        <TabsList className="grid grid-cols-5 w-full mb-6">
          <TabsTrigger value="dashboard">Pregled</TabsTrigger>
          <TabsTrigger value="clani">Člani</TabsTrigger>
          <TabsTrigger value="delezi">Deleži in prihranki</TabsTrigger>
          <TabsTrigger value="glasovanje">Glasovanje</TabsTrigger>
          <TabsTrigger value="pridruzitev">Pridružitev</TabsTrigger>
        </TabsList>

        {/* Dashboard */}
        <TabsContent value="dashboard">
          <Card className="mb-6">
            <CardHeader className="font-semibold">Poraba in proizvodnja energije</CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="poraba" fill="#f87171" name="Poraba" />
                  <Bar dataKey="proizvodnja" fill="#34d399" name="Proizvodnja" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Člani */}
        <TabsContent value="clani">
          <Card>
            <CardHeader className="font-semibold flex items-center gap-2"><Users size={18}/> Člani skupnosti</CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>📍 Ana Novak – 15 % delež</li>
                <li>📍 Marko Kovač – 10 % delež</li>
                <li>📍 Petra Horvat – 8 % delež</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Deleži */}
        <TabsContent value="delezi">
          <Card>
            <CardHeader className="font-semibold">Deleži in prihranki</CardHeader>
            <CardContent>
              <p>Ana Novak</p>
              <Progress value={15} className="mb-2" />
              <p>Marko Kovač</p>
              <Progress value={10} className="mb-2" />
              <p>Petra Horvat</p>
              <Progress value={8} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Glasovanje */}
        <TabsContent value="glasovanje">
          <Card>
            <CardHeader className="font-semibold flex gap-2 items-center"><Vote size={18}/> Glasovanje</CardHeader>
            <CardContent>
              <p className="mb-4">Predlog: Namestitev dodatnih sončnih panelov</p>
              <div className="flex gap-4">
                <Button variant="default">ZA</Button>
                <Button variant="destructive">PROTI</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pridružitev */}
        <TabsContent value="pridruzitev">
          <Card>
            <CardHeader className="font-semibold flex gap-2 items-center"><FilePlus size={18}/> Pridružitev skupnosti</CardHeader>
            <CardContent className="space-y-4">
              <input type="text" placeholder="Ime in priimek" className="w-full border p-2 rounded" />
              <input type="email" placeholder="Email" className="w-full border p-2 rounded" />
              <input type="number" placeholder="Predlagani delež (%)" className="w-full border p-2 rounded" />
              <Button variant="default">Pošlji prijavo</Button>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
}
