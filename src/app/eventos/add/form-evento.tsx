"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format, set } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useState } from "react";
import { RefreshCcw } from "lucide-react";

export default function FormEvento({
  casinos,
  circuitos,
}: {
  casinos: any[];
  circuitos: any[];
}) {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [casinoId, setCasinoId] = useState("");
  const [tourId, setTourId] = useState("");
  const [from, setFrom] = useState(new Date());
  const [to, setTo] = useState(new Date());
  const [error, setError] = useState(false);
  const { toast } = useToast();

  function generateSlug() {
    if (name) {
      setSlug(name.toLowerCase().replace(/ /g, "-"));
    }
  }

  function updateEvento() {
    if (!name || !slug || !casinoId || !tourId || !from || !to) {
      toast({ description: "Todos los campos son requeridos" });
      setError(true);
      return;
    }
    setLoading(true);
    var date = new Date(to);
    const date_to = format(date, "yyyy-MM-dd");
    date = new Date(from);
    const date_from = format(date, "yyyy-MM-dd");

    supabase
      .from("Event")
      .insert({
        name,
        slug,
        casinoId,
        tourId,
        from: date_from,
        to: date_to,
        draft: true,
      })
      .then((e) => {
        setLoading(false);
        if (e.error) {
          toast({ description: "Error al enviar el evento" });
          return;
        }
        toast({ description: "Evento enviado correctamente" });
        setName("");
        setSlug("");
        setCasinoId("");
        setTourId("");
        setFrom(new Date());
        setTo(new Date());
      });
  }

  return (
    <>
      <div className="grid gap-6">
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <Label htmlFor="name">Nombre</Label>
            <Input
              id="name"
              type="text"
              name="name"
              className={"w-full " + (error && !name ? "border-red-500" : "")}
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="slug">Url</Label>
            <div className="relative">
              <RefreshCcw
                onClick={() => generateSlug()}
                className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground"
              />
              <Input
                id="slug"
                type="text"
                name="slug"
                className="w-full"
                defaultValue={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <Label htmlFor="logo">Casino</Label>
            <Select value={casinoId} onValueChange={(e) => setCasinoId(e)}>
              <SelectTrigger>
                <SelectValue placeholder="Casino" />
              </SelectTrigger>
              <SelectContent>
                {casinos.map((casino) => (
                  <SelectItem key={casino.id} value={casino.id}>
                    {casino.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="logo">Circuito</Label>
            <Select value={tourId} onValueChange={(e) => setTourId(e)}>
              <SelectTrigger>
                <SelectValue placeholder="Circuito" />
              </SelectTrigger>
              <SelectContent>
                {circuitos.map((circuito) => (
                  <SelectItem key={circuito.id} value={circuito.id}>
                    {circuito.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <Label htmlFor="logo">Desde</Label>
            <br />
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !from && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {from ? format(from, "dd/MM/yyyy") : <span>Desde</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={from}
                  onSelect={(e) => setFrom(e as Date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <Label htmlFor="logo">Hasta</Label>
            <br />
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !to && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {to ? format(to, "dd/MM/yyyy") : <span>Hasta</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={to}
                  onSelect={(e) => setTo(e as Date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <Button size="sm" onClick={() => updateEvento()} disabled={loading}>
            {loading ? "Guardando ..." : "Guardar"}
          </Button>
        </div>
      </div>
    </>
  );
}
