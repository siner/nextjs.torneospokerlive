"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/components/ui/use-toast";

import Link from "next/link";
import { useState } from "react";
import { RefreshCcw, Search } from "lucide-react";
import { useRouter } from "next/navigation";

export default function FormCircuito({ circuito }: { circuito: any }) {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(circuito ? circuito.name : "");
  const [slug, setSlug] = useState(circuito ? circuito.slug : "");
  const [logo, setLogo] = useState(circuito ? circuito.logo : "");
  const [error, setError] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  function generateSlug() {
    if (name) {
      setSlug(name.toLowerCase().replace(/ /g, "-"));
    }
  }

  function updateCircuito() {
    if (!name || !slug || !logo) {
      toast({ description: "Todos los campos son requeridos" });
      setError(true);
      return;
    }
    setLoading(true);
    if (!circuito) {
      supabase
        .from("Tour")
        .insert({
          name,
          slug,
          logo,
        })
        .then(() => {
          setLoading(false);
          toast({ description: "Circuito creado" });
          router.push("/admin/circuitos");
        });
    } else {
      supabase
        .from("Tour")
        .update({
          name,
          slug,
          logo,
        })
        .eq("id", circuito.id)
        .then(() => {
          setLoading(false);
          toast({ description: "Circuito actualizado" });
        });
    }
  }

  return (
    <>
      <div className="grid gap-6">
        <div className="grid gap-3">
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
        <div className="grid gap-3">
          <Label htmlFor="slug">Slug</Label>

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
        <div className="grid gap-3">
          <Label htmlFor="logo">Logo</Label>
          <Input
            id="logo"
            type="text"
            name="logo"
            className="w-full"
            defaultValue={logo}
            onChange={(e) => setLogo(e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-4">
          <Button size="sm" onClick={() => updateCircuito()} disabled={loading}>
            {loading ? "Guardando ..." : "Guardar"}
          </Button>
          <Link href="/admin/circuitos">
            <Button size="sm" variant="outline">
              Cancelar
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
