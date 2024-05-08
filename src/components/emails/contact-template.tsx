import * as React from "react";

interface ContactTemplateProps {
  name: string;
  email: string;
  comment: string;
}

export const ContactTemplate: React.FC<Readonly<ContactTemplateProps>> = ({
  name,
  email,
  comment,
}) => (
  <div>
    <h1>Nuevo contacto en Torneos Poker Live</h1>
    <p>Nombre: {name}</p>
    <p>Email: {email}</p>
    <p>Mensaje:</p>
    <p>{comment}</p>
  </div>
);
