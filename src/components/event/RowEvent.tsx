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
  var { event } = props;

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
        <div className="flex-shrink-0 w-20 text-xs text-muted-foreground text-center">
          <div>{datestringfrom}</div>
          <div>{datestringto}</div>
        </div>
        <div className="hidden sm:flex flex-row items-center justify-center flex-shrink-0 w-auto gap-2">
          {event.casino && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Avatar
                    className="h-12 w-12 border"
                    style={{ backgroundColor }}
                  >
                    <AvatarImage
                      src={event.casino.logo}
                      alt={`Logo ${event.casino.name}`}
                      className="object-contain p-0.5"
                    />
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{event.casino.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          {event.tour?.logo && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <img
                    src={event.tour.logo}
                    width={24}
                    height={24}
                    alt={"Icono " + event.tour.name}
                    className="h-12 w-12 rounded-full object-contain border"
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
            {event.casino && (
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Avatar
                        className="sm:hidden h-4 w-4 border"
                        style={{ backgroundColor }}
                      >
                        <AvatarImage
                          src={event.casino.logo}
                          alt={`Logo ${event.casino.name}`}
                          className="object-contain p-0.5"
                        />
                      </Avatar>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{event.casino.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                {event.casino.name}
              </span>
            )}
            {event.tour && (
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <img
                        src={event.tour.logo}
                        width={16}
                        height={16}
                        alt={"Icono " + event.tour.name}
                        className="sm:hidden h-4 w-4 rounded-full object-contain border"
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{event.tour.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                {event.tour.name}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
