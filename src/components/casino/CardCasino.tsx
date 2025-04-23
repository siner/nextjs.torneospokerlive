import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

/* eslint-disable @next/next/no-img-element */
interface CardCasinoProps {
  casino: any;
}

export default function CardCasino({ casino }: CardCasinoProps) {
  const backgroundColor = casino.color || "#f8f8f8";

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div
          className="aspect-video overflow-hidden relative"
          style={{ backgroundColor: backgroundColor }}
        >
          <Link
            href={"/casinos/" + casino.slug}
            className="block w-full h-full"
          >
            <img
              src={`${casino.logo}`}
              alt={`Logo ${casino.name}`}
              className="mx-auto p-4 object-contain h-full w-full"
            />
          </Link>
        </div>
        <div className="p-4 flex justify-start items-center">
          <Link
            href={"/casinos/" + casino.slug}
            className="block font-semibold hover:underline truncate"
          >
            {casino.name}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
