import { getNextTournaments, getMyCasinosNextTournaments } from "@/lib/api";
import type { Metadata } from "next";
import RowTournament from "@/components/tournament/RowTournament";
export const metadata: Metadata = {
  title: "Todos los torneos de poker en vivo de España - Torneos Poker Live",
  description: "",
};
import SwitchMyCasinos from "@/components/casino/SwitchMyCasinos";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 3600;

export default async function Torneos({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const supabase = createClient();
  const data = await supabase.auth.getUser();
  const user = data?.data.user;
  var nextTournaments = [];
  if (user && searchParams?.mycasinos) {
    nextTournaments = await getMyCasinosNextTournaments(user.id as string);
  } else {
    nextTournaments = await getNextTournaments();
  }

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold py-4">Próximos Torneos</h2>
        {user && <SwitchMyCasinos />}
      </div>
      <div className="space-y-0.5">
        {nextTournaments?.map((torneo: any) => (
          <RowTournament
            key={"torneo-" + torneo.id}
            torneo={torneo}
            casino="true"
            event="true"
          />
        ))}
      </div>
    </div>
  );
}
