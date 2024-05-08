import { ContactTemplate } from "@/components/emails/contact-template";
import { NextRequest } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const body = await req.json();
  const name = body.name;
  const email = body.email;
  const comment = body.comment;
  if (!name || !email || !comment) {
    return Response.json({ error: "Todos los campos son obligatorios" });
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
    return Response.json({ error });
  }
}
