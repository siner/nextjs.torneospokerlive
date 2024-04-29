"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Register() {
  const searchParams = useSearchParams();
  const urlFail = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [fail, setFail] = useState(urlFail ? true : false);
  const [registered, setRegistered] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (registered) {
      router.push("/login?success=true");
      return;
    }
  }, [registered, router]);

  async function emailRegister() {
    const supabase = createClient();
    console.log("emailRegister");

    if (!email || !password || !repeatPassword || !username) {
      setFail(true);
      setMessage("Rellena todos los campos obligatorios");
      return;
    }

    if (password !== repeatPassword) {
      setFail(true);
      setMessage("Las contraseñas no coinciden");
      return;
    }

    if (username) {
      const { data, error } = await supabase
        .from("user")
        .select("username")
        .eq("username", username);

      if (data && data?.length > 0) {
        setFail(true);
        setMessage("El nombre de usuario ya existe");
        return;
      }
    }

    const user = {
      email: email as string,
      password: password as string,
    };

    const { data, error } = await supabase.auth.signUp(user);

    if (!data?.user) {
      setFail(true);
      setMessage("Error al registrar el usuario");
    }

    await supabase.from("user").upsert([
      {
        id: data?.user?.id,
        email,
        name,
        surname: lastName,
        username,
      },
    ]);

    setRegistered(true);
  }

  return (
    <div className="grid gap-4">
      <div className="grid gap-2 grid-cols-2">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="m@example.com"
            onChange={(e) => setEmail(e.target.value)}
            className={fail && !email ? "border-red-500" : ""}
            required
          />
        </div>
        <div>
          <Label htmlFor="username">Nombre de usuario</Label>
          <Input
            id="username"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            className={fail && !username ? "border-red-500" : ""}
            required
          />
        </div>
      </div>
      <div className="grid gap-2 grid-cols-2">
        <div>
          <Label htmlFor="name">Nombre</Label>
          <Input
            id="name"
            name="name"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="last-name">Apellidos</Label>
          <Input
            id="last-name"
            name="last-name"
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="grid gap-2">
        <div className="flex items-center">
          <Label htmlFor="password">Contraseña</Label>
        </div>
        <Input
          id="password"
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className={
            fail && (!password || password != repeatPassword)
              ? "border-red-500"
              : ""
          }
          required
        />
      </div>
      <div className="grid gap-2">
        <div className="flex items-center">
          <Label htmlFor="repeat-password">Repetir contraseña</Label>
        </div>
        <Input
          id="repeat-password"
          name="repeat-password"
          type="password"
          className={
            fail && (!repeatPassword || password != repeatPassword)
              ? "border-red-500"
              : ""
          }
          onChange={(e) => setRepeatPassword(e.target.value)}
          required
        />
      </div>

      {fail && <div className="text-red-500 text-sm">{message}</div>}

      <Button onClick={emailRegister} type="submit" className="w-full">
        Registrarse
      </Button>
    </div>
  );
}
