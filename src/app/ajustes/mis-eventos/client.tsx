"use client";

import { useState } from "react";
import RowEvent from "@/components/event/RowEvent";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MisEventosClient({ events }: { events: any[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const filteredEvents = events.filter(
    (event) =>
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.casino?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.tour?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const upcomingEvents = filteredEvents.filter((e) => {
    const eventDateTo = new Date(e.to);
    eventDateTo.setHours(0, 0, 0, 0);
    return eventDateTo >= today;
  });

  const pastEvents = filteredEvents.filter((e) => {
    const eventDateTo = new Date(e.to);
    eventDateTo.setHours(0, 0, 0, 0);
    return eventDateTo < today;
  });

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder="Buscar evento, casino o circuito..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <Tabs defaultValue="proximos" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="proximos">
            Próximos ({upcomingEvents.length})
          </TabsTrigger>
          <TabsTrigger value="pasados">
            Pasados ({pastEvents.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="proximos" className="mt-4">
          {upcomingEvents.length > 0 ? (
            <div className="border rounded-md">
              {upcomingEvents.map((event) => (
                <RowEvent key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              {searchTerm
                ? `No se encontraron próximos eventos con "${searchTerm}"`
                : "No tienes próximos eventos favoritos"}
            </div>
          )}
        </TabsContent>

        <TabsContent value="pasados" className="mt-4">
          {pastEvents.length > 0 ? (
            <div className="border rounded-md opacity-60">
              {pastEvents.map((event) => (
                <RowEvent key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              {searchTerm
                ? `No se encontraron eventos pasados con "${searchTerm}"`
                : "No tienes eventos pasados en favoritos"}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
