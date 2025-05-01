import {
  getNextTournaments,
  getMyCasinosNextTournaments,
  getStarredCasinoIds,
} from "@/lib/api";
import type { Metadata } from "next";
import RowTournament from "@/components/tournament/RowTournament";
export const metadata: Metadata = {
  title: "Todos los torneos de poker en vivo de España - Torneos Poker Live",
  description: "",
};
import SwitchMyCasinos from "@/components/casino/SwitchMyCasinos";
import { createClient } from "@/lib/supabase/server";

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
  const showMyCasinos = user && searchParams?.mycasinos === "true"; // Determinar si se muestran mis casinos

  let listTournaments = [];
  let starredCasinoIds: number[] | undefined = undefined; // Variable para IDs

  if (showMyCasinos && user) {
    // Si filtramos por mis casinos, obtenemos los torneos Y los IDs para el calendario
    listTournaments = await getMyCasinosNextTournaments(user.id);
    starredCasinoIds = await getStarredCasinoIds(user.id);
  } else {
    listTournaments = await getNextTournaments();
  }

  return (
    <div>
      {/* Título y Switch se mantienen fuera de las pestañas */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold py-4">Próximos Torneos</h2>
        {user && <SwitchMyCasinos />}
      </div>

      {/* Sistema de Pestañas */}
      <Tabs defaultValue="lista" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="lista">Lista</TabsTrigger>
          <TabsTrigger value="calendario">Calendario</TabsTrigger>
        </TabsList>

        {/* Contenido Pestaña Lista */}
        <TabsContent value="lista">
          <div className="space-y-0.5 mt-4">
            {listTournaments?.length > 0 ? (
              listTournaments.map((torneo: any) => (
                <RowTournament
                  key={"torneo-lista-" + torneo.id}
                  torneo={torneo}
                  casino="true"
                  event="true"
                />
              ))
            ) : (
              <p className="text-muted-foreground py-4">
                {showMyCasinos
                  ? "No hay próximos torneos en tus casinos favoritos."
                  : "No hay próximos torneos disponibles."}
              </p>
            )}
          </div>
        </TabsContent>

        {/* Contenido Pestaña Calendario */}
        <TabsContent value="calendario">
          <div className="mt-4">
            {/* Pasar starredCasinoIds al calendario si el filtro está activo */}
            <EventTournamentCalendar
              starredCasinoIds={starredCasinoIds}
              showCasino={true}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
