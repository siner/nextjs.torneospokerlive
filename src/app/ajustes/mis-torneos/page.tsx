import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getStarredTournaments } from "@/lib/api";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import MisTorneosClient from "./client";
import { Badge } from "@/components/ui/badge";

export const revalidate = 1;

export default async function MisTorneos() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    redirect("/login");
  }
  const tournaments = await getStarredTournaments(data.user.id);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcomingTournaments = tournaments.filter((t: any) => {
    const tournamentDate = new Date(t.date);
    tournamentDate.setHours(0, 0, 0, 0);
    return tournamentDate >= today;
  });

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between flex-wrap gap-2">
            <span>Mis Torneos Favoritos</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-normal text-muted-foreground">
                {tournaments.length}{" "}
                {tournaments.length === 1 ? "torneo" : "torneos"}
              </span>
              {upcomingTournaments.length > 0 && (
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800 hover:bg-green-100"
                >
                  {upcomingTournaments.length} próximo
                  {upcomingTournaments.length !== 1 ? "s" : ""}
                </Badge>
              )}
            </div>
          </CardTitle>
          <CardDescription>
            Gestiona tus torneos favoritos y mantente informado de sus fechas
          </CardDescription>
        </CardHeader>
        <CardContent>
          {tournaments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-3 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-muted-foreground"
                >
                  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                  <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                  <path d="M4 22h16" />
                  <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                  <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                  <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">
                No tienes torneos favoritos
              </h3>
              <p className="text-sm text-muted-foreground mb-4 max-w-sm">
                Marca torneos como favoritos para recibir recordatorios y acceso
                rápido
              </p>
              <a href="/torneos">
                <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                  Explorar torneos
                </button>
              </a>
            </div>
          ) : (
            <MisTorneosClient tournaments={tournaments} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
