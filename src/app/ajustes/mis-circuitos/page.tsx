import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getStarredTours } from "@/lib/api";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import MisCircuitosClient from "./client";

export const revalidate = 1;

export default async function MisCircuitos() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    redirect("/login");
  }
  const tours = await getStarredTours(data.user.id);

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between flex-wrap gap-2">
            <span>Mis Circuitos Favoritos</span>
            <span className="text-sm font-normal text-muted-foreground">
              {tours.length} {tours.length === 1 ? "circuito" : "circuitos"}
            </span>
          </CardTitle>
          <CardDescription>
            Gestiona tus circuitos favoritos y accede rápidamente a sus eventos
          </CardDescription>
        </CardHeader>
        <CardContent>
          {tours.length === 0 ? (
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
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">
                No tienes circuitos favoritos
              </h3>
              <p className="text-sm text-muted-foreground mb-4 max-w-sm">
                Marca circuitos como favoritos para seguir todos sus eventos
              </p>
              <a href="/circuitos">
                <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                  Explorar circuitos
                </button>
              </a>
            </div>
          ) : (
            <MisCircuitosClient tours={tours} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
