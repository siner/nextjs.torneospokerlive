import { ContactTemplate } from "@/components/emails/contact-template";
import { NextRequest } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const body = await req.json();

  // Trim whitespace from inputs
  const name = body.name ? String(body.name).trim() : "";
  const email = body.email ? String(body.email).trim() : "";
  const comment = body.comment ? String(body.comment).trim() : "";

  // Basic validation for presence
  if (!name || !email || !comment) {
    return Response.json(
      { error: "Nombre, email y comentario son obligatorios." },
      { status: 400 }
    );
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return Response.json(
      { error: "Por favor, introduce un email válido." },
      { status: 400 }
    );
  }

  // Length checks
  if (name.length > 100) {
    return Response.json(
      { error: "El nombre no puede exceder los 100 caracteres." },
      { status: 400 }
    );
  }
  if (email.length > 255) {
    return Response.json(
      { error: "El email no puede exceder los 255 caracteres." },
      { status: 400 }
    );
  }
  if (comment.length > 5000) {
    return Response.json(
      { error: "El comentario no puede exceder los 5000 caracteres." },
      { status: 400 }
    );
  }

  try {
    const data = await resend.emails.send({
      from: "Torneos Poker Live <noreply@torneospokerlive.com>",
      to: ["torneospokerlive@gmail.com"],
      subject: "Contacto desde la web",
      react: ContactTemplate({
        name: name,
        email: email,
        comment: comment,
      }),
      text: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${comment}`,
    });

    return Response.json(data);
  } catch (error) {
    console.error("Error sending email:", error);
    return Response.json(
      { error: "Ocurrió un error al enviar el mensaje." },
      { status: 500 }
    );
  }
}
