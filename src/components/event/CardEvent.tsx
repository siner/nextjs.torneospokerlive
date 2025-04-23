/* eslint-disable @next/next/no-img-element */
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { getSimpleDate } from "@/lib/utils";

export default function CardEvent(props: { event: any; showCasino: boolean }) {
  const evento = props.event;
  const showCasino = props.showCasino;
  const datestringfrom = getSimpleDate(evento.from);
  const datestringto = getSimpleDate(evento.to);
  const bg = evento.casino.color || "#f8f8f8";

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        {/* Contenedor de logos con fondo de color */}
        <div
          className="aspect-video overflow-hidden relative flex justify-center items-center gap-4"
          style={{ backgroundColor: bg }}
        >
          <Link href={"/eventos/" + evento.slug}>
            {/* Logo del tour */}
            <img
              src={evento.tour.logo}
              alt={`Logo ${evento.tour.name}`}
              className="mx-auto p-4 object-contain h-44 w-44 rounded-full shadow"
            />
          </Link>
          {/* Logo del casino si corresponde */}
          {showCasino && (
            <Link href={"/casinos/" + evento.casino.slug} className="block">
              <img
                src={evento.casino.logo}
                alt={`Logo ${evento.casino.name}`}
                className="mx-auto p-4 object-contain h-44 w-44 rounded-full shadow"
              />
            </Link>
          )}
        </div>
        {/* Fechas y nombre del evento */}
        <div className="p-4 flex flex-col items-center text-center">
          <div className="flex justify-between mb-2 w-full text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                />
              </svg>
              <span>{datestringfrom}</span>
            </div>
            <div className="flex items-center gap-1">
              <span>{datestringto}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                />
              </svg>
            </div>
          </div>
          <h2 className="card-title text-lg font-bold mb-1 truncate w-full">
            {evento.name}
          </h2>
          <p className="text-sm text-muted-foreground truncate w-full">
            {evento.casino.name}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
