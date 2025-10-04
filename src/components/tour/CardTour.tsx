/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

interface CardTourProps {
  tour: any;
}

export default function CardTour({ tour }: CardTourProps) {
  const backgroundColor = tour.color || "#f8f8f8";

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div
          className="aspect-video overflow-hidden relative"
          style={{ backgroundColor: backgroundColor }}
        >
          <Link
            href={"/circuitos/" + tour.slug}
            className="block w-full h-full"
          >
            <img
              src={`${tour.logo}`}
              alt={`Logo ${tour.name}`}
              className="mx-auto p-4 object-contain h-full w-full"
            />
          </Link>
        </div>
        <div className="p-4 flex justify-start items-center">
          <Link
            href={"/circuitos/" + tour.slug}
            className="block font-semibold hover:underline truncate"
          >
            {tour.name}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
