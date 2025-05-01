"use client"; // Necesita ser cliente para usar hooks y router

import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationControlsProps {
  currentPage: number;
  totalCount: number;
  perPage: number;
}

export function PaginationControls({
  currentPage,
  totalCount,
  perPage,
}: PaginationControlsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const totalPages = Math.ceil(totalCount / perPage);

  // No mostrar controles si solo hay una página o menos
  if (totalPages <= 1) {
    return null;
  }

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const hasPrevPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  return (
    <div className="flex items-center justify-center space-x-4 mt-8">
      <Button
        variant="outline"
        size="icon"
        disabled={!hasPrevPage}
        aria-disabled={!hasPrevPage}
        asChild
      >
        <Link href={createPageURL(currentPage - 1)} scroll={false}>
          <ChevronLeft className="h-4 w-4" />
        </Link>
      </Button>

      <span className="text-sm text-muted-foreground">
        Página {currentPage} de {totalPages}
      </span>

      <Button
        variant="outline"
        size="icon"
        disabled={!hasNextPage}
        aria-disabled={!hasNextPage}
        asChild
      >
        <Link href={createPageURL(currentPage + 1)} scroll={false}>
          <ChevronRight className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}
