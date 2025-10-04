"use client";

import { useState } from "react";
import CardCasino from "@/components/casino/CardCasino";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function MisCasinosClient({ casinos }: { casinos: any[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCasinos = casinos.filter((casino) =>
    casino.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder="Buscar casino..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredCasinos.length > 0 ? (
          filteredCasinos.map((casino) => (
            <CardCasino key={casino.id} casino={casino} />
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-muted-foreground">
            No se encontraron casinos con &quot;{searchTerm}&quot;
          </div>
        )}
      </div>
    </div>
  );
}
