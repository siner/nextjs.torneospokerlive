/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { getSimpleDate, getTextColor } from "../../lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export default function RowEvent(props: any) {
  var { event, showCasino = true, showTour = true } = props;

  const backgroundColor = event.casino?.color || "#ffffff";
  const textColor = getTextColor(backgroundColor);

  let datestringfrom = getSimpleDate(event.from);
  let datestringto = getSimpleDate(event.to);
  let dateevento = new Date(event.to);
  let today = new Date();
  today.setHours(0, 0, 0, 0);
  const isPast = dateevento < today;

  return (
    <div className={`border-b hover:bg-accent ${isPast ? "opacity-60" : ""}`}>
      <div className="flex items-center gap-4 px-4 py-3">
        <div className="flex-shrink-0 w-20 text-xs text-muted-foreground text-left">
          <div>{datestringfrom}</div>
          <div>{datestringto}</div>
        </div>
        <div className="hidden sm:flex flex-row items-center justify-center flex-shrink-0 w-auto gap-2">
          {showCasino && event.casino && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <img
                    src={event.casino.logo}
                    alt={`Logo ${event.casino.name}`}
                    width={48}
                    height={48}
                    className="object-contain rounded-md w-32 h-12 p-1"
                    style={{ backgroundColor }}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{event.casino.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          {showTour && event.tour?.logo && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <img
                    src={event.tour.logo}
                    width={24}
                    height={24}
                    alt={"Icono " + event.tour.name}
                    className="h-12 w-24 rounded-md object-contain p-1"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{event.tour.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <div className="flex-grow text-left">
          <Link
            href={"/eventos/" + event.slug}
            className="block font-semibold text-sm sm:text-base hover:underline mb-1"
          >
            {event.name}
          </Link>
          <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
            {showCasino && event.casino && (
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                <img
                  src={event.casino.logo}
                  alt={`Logo ${event.casino.name}`}
                  width={16}
                  height={16}
                  className="md:hidden object-contain rounded-full w-4 h-4"
                  style={{ backgroundColor }}
                />
                {event.casino.name}
              </span>
            )}
            {showTour && event.tour && (
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                <img
                  src={event.tour.logo}
                  width={16}
                  height={16}
                  alt={"Icono " + event.tour.name}
                  className="md:hidden object-contain rounded-full w-4 h-4"
                  style={{ backgroundColor }}
                />
                {event.tour.name}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
