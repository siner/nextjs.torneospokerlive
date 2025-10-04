import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getStarredCasinos } from "@/lib/api";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import MisCasinosClient from "./client";

export const revalidate = 1;

export default async function MisCasinos() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    redirect("/login");
  }
  const casinos = await getStarredCasinos(data.user.id);

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Mis Casinos Favoritos</span>
            <span className="text-sm font-normal text-muted-foreground">
              {casinos.length} {casinos.length === 1 ? "casino" : "casinos"}
            </span>
          </CardTitle>
          <CardDescription>
            Gestiona tus casinos favoritos y accede rápidamente a ellos
          </CardDescription>
        </CardHeader>
        <CardContent>
          {casinos.length === 0 ? (
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
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">
                No tienes casinos favoritos
              </h3>
              <p className="text-sm text-muted-foreground mb-4 max-w-sm">
                Explora nuestra lista de casinos y marca tus favoritos para
                acceder rápidamente a ellos
              </p>
              <a href="/casinos">
                <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                  Explorar casinos
                </button>
              </a>
            </div>
          ) : (
            <MisCasinosClient casinos={casinos} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
