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
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn, getSlugDate } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import Link from "next/link";
import { useState } from "react";
import { RefreshCcw, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";

export default function FormTorneo({
  casinos,
  eventos,
}: {
  casinos: any[];
  eventos: any[];
}) {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [casinoId, setCasinoId] = useState("");
  const [eventId, setEventId] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [buyin, setBuyin] = useState("");
  const [fee, setFee] = useState("");
  const [points, setPoints] = useState("");
  const [leveltime, setLeveltime] = useState("");
  const [punctuality, setPunctuality] = useState("");
  const [bounty, setBounty] = useState("");
  const [registerlevels, setRegisterlevels] = useState("");
  const [content, setContent] = useState("");

  const [error, setError] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  function generateSlug() {
    if (date && casinoId && name) {
      const casino = casinos.find((c) => c.id === casinoId);
      setSlug(
        getSlugDate(date) +
          "-" +
          casino.slug +
          "-" +
          name.toLowerCase().replace(/ /g, "-")
      );
    }
  }

  function updateTorneo() {
    if (!name || !slug || !casinoId || !date || !time || !buyin) {
      toast({ description: "Todos los campos son requeridos" });
      setError(true);
      return;
    }
    setLoading(true);
    const real_date = new Date(date);
    const fixed_date = format(real_date, "yyyy-MM-dd");

    supabase
      .from("Tournament")
      .insert({
        name,
        slug,
        casinoId,
        eventId: eventId || null,
        date: fixed_date,
        time,
        buyin,
        fee: fee || null,
        points: points || null,
        leveltime: leveltime || null,
        registerlevels: registerlevels || null,
        punctuality: punctuality || "",
        bounty: bounty || null,
        content: content || "",
        draft: true,
      })
      .then((e) => {
        setLoading(false);
        if (e.error) {
          toast({ description: "Error al enviar el torneo" });
          return;
        }

        toast({ description: "Torneo enviado" });
      });
  }

  return (
    <>
      <div className="grid gap-6">
        <div className="grid grid-cols-1 gap-3">
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
            <Label htmlFor="logo">Evento</Label>
            <Select value={eventId} onValueChange={(e) => setEventId(e)}>
              <SelectTrigger>
                <SelectValue placeholder="Evento" />
              </SelectTrigger>
              <SelectContent>
                {eventos.map((evento: any) => (
                  <SelectItem key={evento.id} value={evento.id}>
                    {evento.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="date">Fecha</Label>
            <br />
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "dd/MM/yyyy") : <span>Fecha</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(e) => setDate(e as Date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <Label htmlFor="time">Hora</Label>
            <Input
              id="time"
              type="text"
              name="time"
              className={"w-full " + (error && !time ? "border-red-500" : "")}
              defaultValue={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
        </div>
        <div className="grid md:grid-cols-4 gap-3">
          <div>
            <Label htmlFor="buyin">BuyIn</Label>
            <Input
              id="buyin"
              type="text"
              name="buyin"
              className={"w-full " + (error && !buyin ? "border-red-500" : "")}
              defaultValue={buyin}
              onChange={(e) => setBuyin(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="fee">Fee</Label>
            <Input
              id="fee"
              type="text"
              name="fee"
              className="w-full"
              defaultValue={fee}
              onChange={(e) => setFee(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="points">Puntos</Label>
            <Input
              id="points"
              type="text"
              name="points"
              className="w-full"
              defaultValue={points}
              onChange={(e) => setPoints(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="leveltime">Tiempo por nivel</Label>
            <Input
              id="leveltime"
              type="text"
              name="leveltime"
              className="w-full"
              defaultValue={leveltime}
              onChange={(e) => setLeveltime(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="registerlevels">Niveles de registro</Label>
            <Input
              id="registerlevels"
              type="text"
              name="registerlevels"
              className="w-full"
              defaultValue={registerlevels}
              onChange={(e) => setRegisterlevels(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="punctuality">Puntualidad</Label>
            <Input
              id="punctuality"
              type="text"
              name="punctuality"
              className="w-full"
              defaultValue={punctuality}
              onChange={(e) => setPunctuality(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="bounty">Bounty</Label>
            <Input
              id="bounty"
              type="text"
              name="bounty"
              className="w-full"
              defaultValue={bounty}
              onChange={(e) => setBounty(e.target.value)}
            />
          </div>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="content">Descripción</Label>

          <Textarea
            id="content"
            name="content"
            className="w-full h-32"
            defaultValue={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button size="sm" onClick={() => updateTorneo()} disabled={loading}>
            {loading ? "Enviando ..." : "Enviar"}
          </Button>
        </div>
      </div>
    </>
  );
}
