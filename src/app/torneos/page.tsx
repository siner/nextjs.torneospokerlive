import { getNextTournaments } from "@/lib/api";
import type { Metadata } from "next";
import RowTournament from "@/components/tournament/RowTournament";
export const metadata: Metadata = {
  title: "Todos los torneos de poker en vivo de España - Torneos Poker Live",
  description: "",
};

export default async function Home() {
  const nextTournaments = await getNextTournaments();

  return (
    <div>
      <h2 className="text-2xl font-bold py-4">Próximos Torneos</h2>
      <div className="space-y-0.5">
        {nextTournaments?.map((torneo: any) => (
          <RowTournament
            key={torneo.id}
            torneo={torneo}
            casino="true"
            event="true"
          />
        ))}
      </div>
    </div>
  );
}
