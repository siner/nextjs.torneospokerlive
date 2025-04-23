/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

// Definimos las props, ya sin userId
interface CardTourProps {
  tour: any;
}

// Quitamos userId de los parámetros
export default function CardTour({ tour }: CardTourProps) {
  const backgroundColor = tour.color || "#f8f8f8"; // O un color base adecuado

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        {/* Contenedor de la imagen con posición relativa y color de fondo */}
        <div
          className="aspect-video overflow-hidden relative"
          style={{ backgroundColor: backgroundColor }}
        >
          <Link
            href={"/circuitos/" + tour.slug}
            className="block w-full h-full"
          >
            {/* Usamos next/image */}
            <img
              src={`${tour.logo}`}
              alt={`Logo ${tour.name}`}
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="mx-auto p-4 object-contain h-full w-full"
            />
          </Link>
        </div>
        {/* Dejamos solo el nombre del tour */}
        <div className="p-4 flex justify-start items-center">
          {" "}
          {/* Cambiado a justify-start */}
          <Link
            href={"/circuitos/" + tour.slug}
            className="block font-semibold hover:underline truncate"
          >
            {tour.name}
          </Link>
          {/* Sección de TourStar eliminada */}
        </div>
      </CardContent>
    </Card>
  );
}
