/* eslint-disable @next/next/no-img-element */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import FormTorneo from "./form-torneo";
import { getAllCasinos, getAllEvents } from "@/lib/api";

export default async function NuevoEvento() {
  const casinos = await getAllCasinos();
  const eventos = await getAllEvents();
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="mx-auto grid w-full md:w-1/2 flex-1 auto-rows-max gap-4">
        <div className="flex items-center gap-4">
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0 mt-5">
            Publicar Torneo
          </h1>
        </div>
        <div className="grid">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
            <Card x-chunk="dashboard-07-chunk-0">
              <CardHeader>
                <CardTitle>
                  El torneo será revisado antes de aparecer publicado en la web
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FormTorneo eventos={eventos} casinos={casinos} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
