"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createClient } from "@/lib/supabase/client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Loader2, Eye, EyeOff } from "lucide-react";

// Definir el esquema de validación con Zod
const registerSchema = z
  .object({
    email: z.string().email({ message: "Introduce un email válido." }),
    username: z.string().min(3, {
      message: "El nombre de usuario debe tener al menos 3 caracteres.",
    }),
    name: z.string().optional(),
    lastName: z.string().optional(),
    password: z
      .string()
      .min(6, { message: "La contraseña debe tener al menos 6 caracteres." }),
    repeatPassword: z.string(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Las contraseñas no coinciden.",
    path: ["repeatPassword"], // Indicar en qué campo mostrar el error
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null); // Para mensaje post-registro
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      username: "",
      name: "",
      lastName: "",
      password: "",
      repeatPassword: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: RegisterFormValues) {
    setError(null);
    setSuccess(null);
    const supabase = createClient();

    // 1. Verificar si el username ya existe
    try {
      const { data: existingUser, error: usernameError } = await supabase
        .from("user")
        .select("username")
        .eq("username", values.username)
        .maybeSingle(); // Usar maybeSingle para manejar 0 o 1 resultado

      if (usernameError && usernameError.code !== "PGRST116") {
        // Ignorar error "No rows found"
        throw new Error(
          "Error al verificar el nombre de usuario: " + usernameError.message
        );
      }
      if (existingUser) {
        form.setError("username", {
          type: "manual",
          message: "Este nombre de usuario ya existe.",
        });
        return;
      }

      // 2. Registrar usuario en Supabase Auth
      const { data: signUpData, error: signUpError } =
        await supabase.auth.signUp({
          email: values.email,
          password: values.password,
          // No se puede pasar options.data directamente en signUp básico
        });

      if (signUpError) {
        throw new Error(
          "Error al registrar usuario en Auth: " + signUpError.message
        );
      }
      if (!signUpData.user) {
        throw new Error(
          "No se recibió información del usuario tras el registro."
        );
      }

      // 3. Insertar/Actualizar perfil en tabla 'user'
      const { error: profileError } = await supabase.from("user").upsert({
        id: signUpData.user.id,
        email: values.email,
        username: values.username,
        name: values.name || null, // Usar null si está vacío
        surname: values.lastName || null,
      });

      if (profileError) {
        // Intentar deshacer el signUp si falla el perfil? Podría ser complejo.
        // Por ahora solo mostramos el error.
        console.error("Error guardando perfil:", profileError);
        setError(
          "Error al guardar los datos del perfil. Por favor, contacta soporte."
        );
        return;
      }

      // Éxito
      setSuccess(
        "¡Registro completado! Revisa tu email para confirmar tu cuenta. Redirigiendo..."
      );
      form.reset(); // Limpiar formulario

      // Redirigir a login tras 2 segundos
      setTimeout(() => {
        router.push("/login?success=true");
      }, 2000);
    } catch (err: any) {
      console.error("Registration process error:", err);
      setError(
        err.message || "Ocurrió un error inesperado durante el registro."
      );
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        {/* Mensajes Generales */}
        {error && (
          <Alert variant="destructive">
            <AlertTitle>Error de Registro</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {success && (
          <Alert>
            <AlertTitle>Registro Exitoso</AlertTitle>
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        {/* Campos del Formulario */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="tu@email.com"
                    {...field}
                    disabled={isSubmitting}
                    autoComplete="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre de usuario *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="tu_usuario"
                    {...field}
                    disabled={isSubmitting}
                    autoComplete="username"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Tu nombre"
                    {...field}
                    disabled={isSubmitting}
                    autoComplete="given-name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Apellidos</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Tus apellidos"
                    {...field}
                    disabled={isSubmitting}
                    autoComplete="family-name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña *</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="******"
                    {...field}
                    disabled={isSubmitting}
                    autoComplete="new-password"
                  />
                </FormControl>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  tabIndex={-1}
                  className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={
                    showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="repeatPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Repetir Contraseña *</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input
                    type={showRepeatPassword ? "text" : "password"}
                    placeholder="******"
                    {...field}
                    disabled={isSubmitting}
                    autoComplete="new-password"
                  />
                </FormControl>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  tabIndex={-1}
                  className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowRepeatPassword((v) => !v)}
                  aria-label={
                    showRepeatPassword
                      ? "Ocultar contraseña"
                      : "Mostrar contraseña"
                  }
                >
                  {showRepeatPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Registrarse
        </Button>
      </form>
    </Form>
  );
}
