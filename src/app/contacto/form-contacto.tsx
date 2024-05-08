"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { set } from "date-fns";
import { useState } from "react";

export default function Contacto() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState(false);
  const [fail, setFail] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submitForm() {
    setLoading(true);
    if (!name || !email || !comment) {
      setError(true);
      setLoading(false);
      return;
    }
    const sentEmail = await fetch("/api/contacto", {
      method: "POST",
      body: JSON.stringify({ name, email, comment }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await sentEmail.json();
    if (response.error) {
      setFail(true);
      setLoading(false);
      return;
    }
    setSuccess(true);
    setError(false);
    setName("");
    setEmail("");
    setComment("");
    setLoading(false);
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Nombre</Label>
          <Input
            id="name"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Mensaje</Label>
          </div>
          <Textarea
            id="comment"
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>
        {error && (
          <div className="text-red-500 text-sm">
            Todos los campos son obligarorios
          </div>
        )}
        {fail && (
          <div className="text-red-500 text-sm">Error al enviar el mensaje</div>
        )}
        {success && (
          <div className="text-green-500 text-sm">
            Mensaje enviado correctamente
          </div>
        )}

        <Button
          onClick={submitForm}
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading ? "Enviando..." : "Enviar"}
        </Button>
      </div>
    </div>
  );
}
