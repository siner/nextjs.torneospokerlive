"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";

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
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  useEffect(() => {
    if (registered) {
      router.push("/login?success=true");
      return;
    }
  }, [registered, router]);

  async function emailRegister() {
    setLoading(true);
    setFail(false);
    setMessage("");
    const supabase = createClient();
    console.log("emailRegister");

    if (!email || !password || !repeatPassword || !username) {
      setFail(true);
      setMessage("Rellena todos los campos obligatorios");
      setLoading(false);
      return;
    }

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setFail(true);
      setMessage("Introduce un email válido");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setFail(true);
      setMessage("La contraseña debe tener al menos 6 caracteres");
      setLoading(false);
      return;
    }

    if (password !== repeatPassword) {
      setFail(true);
      setMessage("Las contraseñas no coinciden");
      setLoading(false);
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
        setLoading(false);
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
      setLoading(false);
      return;
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
    setLoading(false);
  }

  return (
    <div className="grid gap-4">
      {fail && (
        <Alert variant="destructive" className="mb-2">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}
      {registered && (
        <Alert className="mb-2">
          <AlertTitle>Registro exitoso</AlertTitle>
          <AlertDescription>
            ¡Te has registrado correctamente! Redirigiendo al login...
          </AlertDescription>
        </Alert>
      )}
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
            autoComplete="email"
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
            autoComplete="username"
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
            autoComplete="given-name"
          />
        </div>
        <div>
          <Label htmlFor="last-name">Apellidos</Label>
          <Input
            id="last-name"
            name="last-name"
            onChange={(e) => setLastName(e.target.value)}
            required
            autoComplete="family-name"
          />
        </div>
      </div>
      <div className="grid gap-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Contraseña</Label>
          <button
            type="button"
            tabIndex={-1}
            className="ml-2 text-xs text-muted-foreground hover:text-foreground focus:outline-none"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={
              showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
            }
          >
            {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
          </button>
        </div>
        <Input
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          onChange={(e) => setPassword(e.target.value)}
          className={
            fail && (!password || password != repeatPassword)
              ? "border-red-500"
              : ""
          }
          required
          autoComplete="new-password"
        />
      </div>
      <div className="grid gap-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="repeat-password">Repetir contraseña</Label>
          <button
            type="button"
            tabIndex={-1}
            className="ml-2 text-xs text-muted-foreground hover:text-foreground focus:outline-none"
            onClick={() => setShowRepeatPassword((v) => !v)}
            aria-label={
              showRepeatPassword ? "Ocultar contraseña" : "Mostrar contraseña"
            }
          >
            {showRepeatPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
          </button>
        </div>
        <Input
          id="repeat-password"
          name="repeat-password"
          type={showRepeatPassword ? "text" : "password"}
          className={
            fail && (!repeatPassword || password != repeatPassword)
              ? "border-red-500"
              : ""
          }
          onChange={(e) => setRepeatPassword(e.target.value)}
          required
          autoComplete="new-password"
        />
      </div>
      <Button
        onClick={emailRegister}
        type="submit"
        className="w-full"
        disabled={loading}
      >
        {loading ? "Registrando..." : "Registrarse"}
      </Button>
    </div>
  );
}
