import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getNumberCasinos,
  getNumberEvents,
  getNumberTournaments,
  getNumberTours,
} from "@/lib/api";
import { Building, CalendarClock, CalendarDays, Trophy } from "lucide-react";

export default async function PrivatePage() {
  const numCasinos = getNumberCasinos();
  const numEvents = getNumberEvents();
  const numTournaments = getNumberTournaments();
  const numTours = getNumberTours();

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
      </div>
      <div
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm p-10 gap-4 justify-between"
        x-chunk="dashboard-02-chunk-1"
      >
        <Card className="min-w-44">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Casinos</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{numCasinos}</div>
          </CardContent>
        </Card>
        <Card className="min-w-44">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Circuitos</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{numTours}</div>
          </CardContent>
        </Card>
        <Card className="min-w-44">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Eventos</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{numCasinos}</div>
          </CardContent>
        </Card>
        <Card className="min-w-44">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Torneos</CardTitle>
            <CalendarClock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{numCasinos}</div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
