"use client";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { set } from "date-fns";
import { UploadCloudIcon } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export default function AccountForm({ user }: { user: any }) {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [wrongUsername, setWrongUsername] = useState(false);
  const { toast } = useToast();

  function handleChange(event: any) {
    setFile(event.target.files[0]);
  }

  function handleUpload() {
    uploadFile();
  }

  async function uploadFile() {
    const formData = new FormData();
    if (!file) return;
    formData.append("image", file);
    const response = await fetch(
      process.env.NEXT_PUBLIC_UPLOAD_URL + "/upload",
      {
        method: "POST",
        body: formData,
        headers: {
          "Access-Token": `${process.env.NEXT_PUBLIC_CDN_ACCESS_TOKEN}`,
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      setAvatar(data.url);
    } else {
      toast({ description: "Error al subir la imagen" });
    }
  }

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      const { data, error, status } = await supabase
        .from("user")
        .select("name, surname, username, avatar")
        .eq("id", user?.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setName(data.name);
        setSurname(data.surname);
        setAvatar(data.avatar);
        setUsername(data.username);
      }
    } catch (error) {
      toast({
        description: "Error cargando info del perfil",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [user, supabase, toast]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  async function updateProfile() {
    try {
      setLoading(true);
      setWrongUsername(false);

      if (!username) {
        toast({ description: "El campo nombre de usuario es obligatorio" });
        setWrongUsername(true);
        return;
      }
      const { data, error } = await supabase.from("user").upsert({
        id: user?.id,
        name: name,
        surname: surname,
        avatar: avatar,
        username: username,
      });
      if (error) throw error;
      toast({ description: "Perfil editado correctamente" });
    } catch (error: any) {
      if (error && error.code === "23505") {
        toast({ description: "El nombre de usuario ya está en uso" });
        setWrongUsername(true);
      } else {
        toast({
          title: "Error al actualizar los datos",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6">
      <div className="grid md:grid-cols-2 gap-3">
        <div>
          <Label htmlFor="name">Email</Label>
          <Input
            id="email"
            type="email"
            disabled
            name="email"
            className="w-full"
            value={user?.email}
          />
        </div>
        <div>
          <Label htmlFor="username">Nombre de usuario</Label>
          <Input
            id="username"
            type="text"
            name="username"
            className={`w-full ${wrongUsername ? "border-red-500" : ""}`}
            value={username}
            onChange={(e: any) => setUsername(e.target.value)}
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        <div>
          <Label htmlFor="name">Nombre</Label>
          <Input
            id="name"
            type="text"
            name="name"
            className="w-full"
            value={name}
            onChange={(e: any) => setName(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="surname">Apellidos</Label>

          <Input
            id="surname"
            type="text"
            name="surname"
            className="w-full"
            value={surname}
            onChange={(e: any) => setSurname(e.target.value)}
          />
        </div>
      </div>
      <div className="grid gap-3">
        <div className="flex w-full max-w-sm items-end gap-2.5">
          <div>
            <Label htmlFor="logo">Avatar</Label>
            <Avatar>
              <AvatarImage
                src={
                  avatar
                    ? avatar
                    : `https://ui-avatars.com/api/?name=${username}&s=100&background=random`
                }
              />
            </Avatar>
          </div>
          <Input id="file" type="file" name="file" onChange={handleChange} />
          <Button
            onClick={handleUpload}
            size="sm"
            variant="outline"
            className="w-10"
          >
            <UploadCloudIcon />
          </Button>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button size="sm" onClick={() => updateProfile()} disabled={loading}>
          {loading ? "Guardando ..." : "Guardar"}
        </Button>
      </div>
    </div>
  );
}
