"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";
import {
  TwitterLogoIcon,
  EyeOpenIcon,
  EyeClosedIcon,
} from "@radix-ui/react-icons";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const loginSchema = z.object({
  email: z.string().email({ message: "Por favor, introduce un email válido." }),
  password: z
    .string()
    .min(1, { message: "La contraseña no puede estar vacía." }),
});

export default function Login() {
  const searchParams = useSearchParams();
  const urlSuccess = searchParams.get("success");
  const urlFail = searchParams.get("error");

  const [error, setError] = useState<string | null>(
    urlFail ? "Credenciales incorrectas" : null
  );
  const [success, setSuccess] = useState<string | null>(
    urlSuccess ? "Usuario registrado con éxito. Revisa tu email." : null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isTwitterLoading, setIsTwitterLoading] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (redirectUrl) {
      router.push(redirectUrl);
    }
  }, [redirectUrl, router]);

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    const supabase = createClient();
    const { data, error: signInError } = await supabase.auth.signInWithPassword(
      {
        email: values.email,
        password: values.password,
      }
    );

    if (signInError) {
      console.error("Sign in error:", signInError);
      if (signInError.message.includes("Invalid login credentials")) {
        setError("Email o contraseña incorrectos.");
      } else {
        setError("Ocurrió un error al iniciar sesión. Inténtalo de nuevo.");
      }
    } else if (data.user) {
      router.refresh();
    } else {
      setError("Ocurrió un error inesperado.");
    }
    setIsLoading(false);
  }

  async function twitterLogin() {
    setIsTwitterLoading(true);
    setError(null);
    setSuccess(null);
    const supabase = createClient();

    const { data, error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "twitter",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (oauthError) {
      console.error("Twitter OAuth error:", oauthError);
      setError("Error al iniciar sesión con Twitter.");
      setIsTwitterLoading(false);
    } else if (data.url) {
      setRedirectUrl(data.url);
    } else {
      setIsTwitterLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="tu@email.com"
                    {...field}
                    disabled={isLoading || isTwitterLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      type={showPassword ? "text" : "password"}
                      {...field}
                      disabled={isLoading || isTwitterLoading}
                    />
                  </FormControl>
                  <button
                    type="button"
                    tabIndex={-1}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={
                      showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                    }
                  >
                    {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                  </button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert variant="default">
              <AlertTitle>Éxito</AlertTitle>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || isTwitterLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Login
          </Button>
        </form>
      </Form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            O continuar con
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        onClick={twitterLogin}
        type="button"
        className="w-full flex items-center justify-center gap-2"
        disabled={isLoading || isTwitterLoading}
      >
        {isTwitterLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <TwitterLogoIcon className="h-5 w-5" />
        )}
        Login con Twitter
      </Button>

      <div className="text-center text-sm text-muted-foreground">
        <Link
          href="/forgot-password"
          className="underline underline-offset-4 hover:text-primary"
        >
          ¿Olvidaste tu contraseña?
        </Link>
        <span className="mx-2">|</span>
        <Link
          href="/registro"
          className="underline underline-offset-4 hover:text-primary"
        >
          ¿No tienes cuenta? Regístrate
        </Link>
      </div>
    </div>
  );
}
