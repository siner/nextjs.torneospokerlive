/* eslint-disable @next/next/no-img-element */
"use client";

import { DataTableColumnHeader } from "@/components/datatables/column-header";
import { ColumnDef } from "@tanstack/react-table";
import { SquareArrowOutUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export type Tournament = {
  id: number;
  name: string;
  slug: string;
  date: string;
  time: string | null;
  buyin: number;
  casino: {
    id: number;
    name: string;
    logo: string;
    color: string;
  };
};

export const columns: ColumnDef<Tournament>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha" />
    ),
    cell: ({ row }) => {
      const tournament = row.original;
      const date = new Date(tournament.date);
      return (
        <div className="flex flex-col">
          <span className="font-medium">
            {date.toLocaleDateString("es-ES", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </span>
          {tournament.time && (
            <span className="text-sm text-muted-foreground">
              {tournament.time.substring(0, 5)}
            </span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "casino",
    header: "",
    cell: ({ row }) => {
      const tournament = row.original;
      return (
        <div
          className="hidden md:flex flex-col items-center justify-center rounded-md h-10 w-20"
          style={{
            backgroundColor: tournament.casino.color,
          }}
        >
          <img
            src={tournament.casino.logo}
            alt={tournament.casino.name}
            className="h-8 w-18 object-contain p-1"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Torneo" />
    ),
    cell: ({ row }) => {
      const tournament = row.original;
      return (
        <div className="flex flex-col">
          <span className="font-semibold">{tournament.name}</span>
          <span className="text-sm text-muted-foreground md:hidden">
            {tournament.casino.name}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "casino.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Casino" />
    ),
    cell: ({ row }) => {
      return (
        <span className="hidden md:inline">{row.original.casino.name}</span>
      );
    },
  },
  {
    accessorKey: "buyin",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Buy-in" />
    ),
    cell: ({ row }) => {
      const tournament = row.original;
      return tournament.buyin > 0 ? (
        <span className="font-medium">{tournament.buyin}€</span>
      ) : (
        <span className="text-sm text-muted-foreground">-</span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const tournament = row.original;

      return (
        <div className="flex items-center justify-end gap-2">
          <Button variant="outline" className="h-6 w-6 p-0">
            <Link href={"/torneos/" + tournament.slug} target="_blank">
              <SquareArrowOutUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      );
    },
  },
];
