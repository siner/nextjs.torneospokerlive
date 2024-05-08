import { Button } from "@/components/ui/button";
import { TwitterLogoIcon } from "@radix-ui/react-icons";
import Contacto from "./form-contacto";

export default function Page() {
  return (
    <div className="text-center md:max-w-1/2 md:mx-auto mt-10">
      <h1 className="text-3xl font-bold">Contacto</h1>
      <p className="mt-4">
        Si tienes alguna duda, sugerencia o simplemente quieres saludar, puedes
        contactar con nosotros a través de este formulario.
      </p>
      <div className="text-left my-4 md:max-w-96 md:mx-auto">
        <Contacto />
      </div>
      <p className="mt-4">
        O si lo prefieres, puedes contactar con nosotros a través de nuestras
        redes sociales:
      </p>
      <div className="mt-4">
        <Button variant="outline">
          <a
            href="https://www.twitter.com/livetorneos"
            target="_blank"
            className="underline"
          >
            <TwitterLogoIcon className="w-6 h-6" />
          </a>
        </Button>
      </div>
    </div>
  );
}
