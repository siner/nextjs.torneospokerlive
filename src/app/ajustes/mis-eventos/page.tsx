import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getStarredEvents } from "@/lib/api";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import MisEventosClient from "./client";
import { Badge } from "@/components/ui/badge";

export const revalidate = 1;

export default async function MisEventos() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    redirect("/login");
  }
  const events = await getStarredEvents(data.user.id);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcomingEvents = events.filter((e: any) => {
    const eventDateTo = new Date(e.to);
    eventDateTo.setHours(0, 0, 0, 0);
    return eventDateTo >= today;
  });

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between flex-wrap gap-2">
            <span>Mis Eventos Favoritos</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-normal text-muted-foreground">
                {events.length} {events.length === 1 ? "evento" : "eventos"}
              </span>
              {upcomingEvents.length > 0 && (
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800 hover:bg-green-100"
                >
                  {upcomingEvents.length} próximo
                  {upcomingEvents.length !== 1 ? "s" : ""}
                </Badge>
              )}
            </div>
          </CardTitle>
          <CardDescription>
            Gestiona tus eventos favoritos y mantente informado de sus fechas
          </CardDescription>
        </CardHeader>
        <CardContent>
          {events.length === 0 ? (
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
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">
                No tienes eventos favoritos
              </h3>
              <p className="text-sm text-muted-foreground mb-4 max-w-sm">
                Marca eventos como favoritos para recibir recordatorios y acceso
                rápido
              </p>
              <a href="/eventos">
                <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                  Explorar eventos
                </button>
              </a>
            </div>
          ) : (
            <MisEventosClient events={events} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
