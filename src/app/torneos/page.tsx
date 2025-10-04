import {
  getNextTournaments,
  getMyCasinosNextTournaments,
  getStarredCasinoIds,
  getMyStarredNextTournaments,
  getStarredTournamentIds,
} from "@/lib/api";
import type { Metadata } from "next";
import RowTournament from "@/components/tournament/RowTournament";
export const metadata: Metadata = {
  title: "Todos los torneos de poker en vivo de España - Torneos Poker Live",
  description: "",
};
import SwitchMyCasinos from "@/components/casino/SwitchMyCasinos";
import SwitchMyTournaments from "@/components/tournament/SwitchMyTournaments";
import { createClient } from "@/lib/supabase/server";
import TorneosClient from "./client";

// Importar componentes de Tabs y el Calendario
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EventTournamentCalendar from "@/components/calendar/EventTournamentCalendar";

export const revalidate = 3600;

export default async function Torneos({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  const user = userData?.user;
  const showMyCasinos = user && searchParams?.mycasinos === "true";
  const showMyTournaments = user && searchParams?.mytournaments === "true";

  let listTournaments = [];
  let starredCasinoIds: number[] | undefined = undefined;
  let starredTournamentIds: number[] | undefined = undefined;

  if (showMyTournaments && user) {
    // Filtrar por torneos favoritos
    listTournaments = await getMyStarredNextTournaments(user.id);
    starredTournamentIds = await getStarredTournamentIds(user.id);
  } else if (showMyCasinos && user) {
    // Filtrar por casinos favoritos
    listTournaments = await getMyCasinosNextTournaments(user.id);
    starredCasinoIds = await getStarredCasinoIds(user.id);
  } else {
    // Mostrar todos los torneos
    listTournaments = await getNextTournaments();
  }

  return (
    <div>
      {/* Título y Switches se mantienen fuera de las pestañas */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <h2 className="text-2xl font-bold py-4">Próximos Torneos</h2>
        {user && (
          <div className="flex flex-col sm:flex-row gap-4">
            <SwitchMyCasinos />
            <SwitchMyTournaments />
          </div>
        )}
      </div>

      {/* Sistema de Pestañas */}
      <Tabs defaultValue="lista" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="lista">Lista</TabsTrigger>
          <TabsTrigger value="calendario">Calendario</TabsTrigger>
        </TabsList>

        {/* Contenido Pestaña Lista con Filtros */}
        <TabsContent value="lista">
          <div className="mt-4">
            {listTournaments?.length > 0 ? (
              <TorneosClient tournaments={listTournaments} />
            ) : (
              <p className="text-muted-foreground py-4 text-center">
                {showMyCasinos
                  ? "No hay próximos torneos en tus casinos favoritos."
                  : showMyTournaments
                  ? "No hay próximos torneos en tus favoritos."
                  : "No hay próximos torneos disponibles."}
              </p>
            )}
          </div>
        </TabsContent>

        {/* Contenido Pestaña Calendario */}
        <TabsContent value="calendario">
          <div className="mt-4">
            {/* Pasar filtros al calendario si están activos */}
            <EventTournamentCalendar
              starredCasinoIds={starredCasinoIds}
              starredTournamentIds={starredTournamentIds}
              showCasino={true}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
