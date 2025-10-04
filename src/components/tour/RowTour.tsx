/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function RowTour({ tour }: { tour: any }) {
  const backgroundColor = tour.color || "#ffffff";

  return (
    <div className="border-b hover:bg-accent">
      <div className="flex items-center gap-4 px-4 py-3">
        <div className="hidden sm:flex items-center justify-start flex-shrink-0">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <img
                  src={tour.logo}
                  alt={`Logo ${tour.name}`}
                  width={48}
                  height={48}
                  className="object-contain rounded-md w-32 h-12 p-1"
                  style={{ backgroundColor }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{tour.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex-grow text-left">
          <Link
            href={"/circuitos/" + tour.slug}
            className="block font-semibold text-sm sm:text-base hover:underline"
          >
            {tour.name}
          </Link>
        </div>
      </div>
    </div>
  );
}
