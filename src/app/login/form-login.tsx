"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { TwitterLogoIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Login() {
  const searchParams = useSearchParams();
  const urlSuccess = searchParams.get("success");
  const urlFail = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fail, setFail] = useState(urlFail ? true : false);
  const [success, setSuccess] = useState(urlSuccess ? true : false);
  const [redirect, setRedirect] = useState("");
  const [logged, setLogged] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (logged) {
      if (redirect) {
        router.push(redirect);
        return;
      }
      router.push("/admin");
      return;
    }
  }, [logged, router, redirect]);

  async function emailLogin() {
    const supabase = createClient();

    if (!email || !password) {
      setFail(true);
      return;
    }

    const user = {
      email: email as string,
      password: password as string,
    };

    const { data, error } = await supabase.auth.signInWithPassword(user);

    console.log(data);

    if (!data?.user) {
      setFail(true);
    }

    setLogged(true);
  }

  async function twitterLogin() {
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "twitter",
      options: {
        redirectTo: process.env.BASE_URL + "/auth/callback",
      },
    });
    if (error) {
      setFail(true);
    } else {
      setLogged(true);
      setRedirect(data.url);
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="m@example.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
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
            required
          />
        </div>
        {fail && (
          <div className="text-red-500 text-sm">Credenciales incorrectas</div>
        )}
        {success && (
          <div className="text-green-600 text-sm">
            <p>Usuario registrado con éxito.</p>
            <p>
              Recibirás un email de confirmación. Por favor, revisa tu bandeja
              de entrada o spam.
            </p>
          </div>
        )}
        <Button onClick={emailLogin} type="submit" className="w-full">
          Login
        </Button>
      </div>
      <div>
        <Button
          onClick={twitterLogin}
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-blue-400 text-white"
        >
          <TwitterLogoIcon className="w-6 h-6" /> Login con Twitter
        </Button>
      </div>
    </div>
  );
}
