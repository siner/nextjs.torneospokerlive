/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { formatDate, getTextColor, cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export default function RowTournament(props: any) {
  var { torneo, casino, event, hideDate = false } = props;

  const backgroundColor = torneo.casino?.color || "#ffffff";
  const textColor = getTextColor(backgroundColor);

  let datetorneo = new Date(torneo.date);
  let { datestring, hour } = formatDate(datetorneo);
  let today = new Date();
  today.setHours(0, 0, 0, 0);
  const isPast = datetorneo < today;
  const buyin = parseInt(torneo.buyin) || 0;
  const fee = parseInt(torneo.fee) || 0;
  const bounty = parseInt(torneo.bounty) || 0;
  const baseBuyin = buyin - fee - bounty;

  return (
    <div className={`border-b hover:bg-accent ${isPast ? "opacity-60" : ""}`}>
      <div className="flex items-center gap-4 px-2 sm:px-4 py-3">
        <div className="flex-shrink-0 text-sm text-left min-w-12">
          {!hideDate && <div>{datestring}</div>}
          {torneo.time && (
            <div className={cn(hideDate ? "text-base font-medium" : "")}>
              {torneo.time.substring(0, 5)}
            </div>
          )}
        </div>
        <div className="hidden md:flex items-center justify-start flex-shrink-0 gap-2">
          {casino && torneo.casino && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <img
                    src={torneo.casino.logo}
                    alt={`Logo ${torneo.casino.name}`}
                    width={40}
                    height={40}
                    className="object-contain rounded-md w-32 h-12 p-1"
                    style={{ backgroundColor }}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{torneo.casino.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          {event && torneo.event?.tour?.logo && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <img
                    src={torneo.event.tour.logo}
                    width={40}
                    height={40}
                    alt={"Icono " + torneo.event.name}
                    className="h-12 w-24 rounded-md object-contain"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {torneo.event.tour.name} - {torneo.event.name}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <div className="flex-grow text-left">
          <Link
            href={"/torneos/" + torneo.slug}
            className="block font-semibold text-sm sm:text-base hover:underline mb-1"
          >
            {torneo.name}
          </Link>
          <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
            {casino && torneo.casino && (
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                <Avatar
                  className="sm:hidden h-4 w-4 border"
                  style={{ backgroundColor }}
                >
                  <AvatarImage
                    src={torneo.casino.logo}
                    alt={`Logo ${torneo.casino.name}`}
                    className="object-contain p-0.5"
                  />
                </Avatar>
                {torneo.casino.name}
              </span>
            )}
            {event && torneo.event?.tour?.logo && (
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                <img
                  src={torneo.event.tour.logo}
                  width={16}
                  height={16}
                  alt={"Icono " + torneo.event.name}
                  className="sm:hidden h-4 w-4 rounded-full object-contain"
                />
                {torneo.event.tour.name}
              </span>
            )}
          </div>
        </div>
        <div className="flex-shrink-0 w-auto text-right font-medium">
          {buyin > 0 ? (
            <>
              <div className="text-base">{`${buyin}€`}</div>
              {(fee > 0 || bounty > 0) && (
                <div className="text-xs text-muted-foreground font-normal hidden sm:block">
                  ({baseBuyin > 0 ? `${baseBuyin}€ + ` : ""}
                  {fee > 0 ? `${fee}€` : ""}
                  {bounty > 0 ? `${fee > 0 ? " + " : ""}${bounty}€ KO` : ""})
                </div>
              )}
            </>
          ) : (
            <span className="text-sm text-muted-foreground hidden sm:block">
              Registro Cerrado
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
