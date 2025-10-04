"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Filter, X, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";

export interface TournamentFiltersType {
  buyinMin?: number;
  buyinMax?: number;
  type?: string;
  dateFrom?: Date;
  dateTo?: Date;
  guaranteed?: boolean;
}

interface TournamentFiltersProps {
  onFiltersChange: (filters: TournamentFiltersType) => void;
  initialFilters?: TournamentFiltersType;
}

export default function TournamentFilters({
  onFiltersChange,
  initialFilters,
}: TournamentFiltersProps) {
  const [filters, setFilters] = useState<TournamentFiltersType>(
    initialFilters || {}
  );
  const [showFilters, setShowFilters] = useState(false);

  // Calcular cantidad de filtros activos
  const activeFiltersCount = Object.values(filters).filter(
    (value) => value !== undefined && value !== ""
  ).length;

  useEffect(() => {
    // Cargar filtros de localStorage al montar
    const savedFilters = localStorage.getItem("tournamentFilters");
    if (savedFilters) {
      try {
        const parsed = JSON.parse(savedFilters);
        // Convertir fechas de string a Date
        if (parsed.dateFrom) parsed.dateFrom = new Date(parsed.dateFrom);
        if (parsed.dateTo) parsed.dateTo = new Date(parsed.dateTo);
        setFilters(parsed);
        onFiltersChange(parsed);
      } catch (e) {
        console.error("Error loading filters from localStorage:", e);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilterChange = (key: keyof TournamentFiltersType, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);

    // Guardar en localStorage
    localStorage.setItem("tournamentFilters", JSON.stringify(newFilters));
  };

  const clearFilters = () => {
    setFilters({});
    onFiltersChange({});
    localStorage.removeItem("tournamentFilters");
  };

  const removeFilter = (key: keyof TournamentFiltersType) => {
    const newFilters = { ...filters };
    delete newFilters[key];
    setFilters(newFilters);
    onFiltersChange(newFilters);
    localStorage.setItem("tournamentFilters", JSON.stringify(newFilters));
  };

  return (
    <div className="space-y-4">
      {/* Botón principal y badges de filtros activos */}
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant={activeFiltersCount > 0 ? "default" : "outline"}
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="gap-2"
        >
          <Filter className="h-4 w-4" />
          Filtros
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-1 rounded-full px-2">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>

        {/* Badges de filtros activos */}
        {filters.buyinMin !== undefined && (
          <Badge variant="secondary" className="gap-1">
            Buy-in mín: {filters.buyinMin}€
            <X
              className="h-3 w-3 cursor-pointer"
              onClick={() => removeFilter("buyinMin")}
            />
          </Badge>
        )}
        {filters.buyinMax !== undefined && (
          <Badge variant="secondary" className="gap-1">
            Buy-in máx: {filters.buyinMax}€
            <X
              className="h-3 w-3 cursor-pointer"
              onClick={() => removeFilter("buyinMax")}
            />
          </Badge>
        )}
        {filters.type && (
          <Badge variant="secondary" className="gap-1">
            Tipo: {filters.type}
            <X
              className="h-3 w-3 cursor-pointer"
              onClick={() => removeFilter("type")}
            />
          </Badge>
        )}
        {filters.dateFrom && (
          <Badge variant="secondary" className="gap-1">
            Desde: {format(filters.dateFrom, "dd/MM/yyyy", { locale: es })}
            <X
              className="h-3 w-3 cursor-pointer"
              onClick={() => removeFilter("dateFrom")}
            />
          </Badge>
        )}
        {filters.dateTo && (
          <Badge variant="secondary" className="gap-1">
            Hasta: {format(filters.dateTo, "dd/MM/yyyy", { locale: es })}
            <X
              className="h-3 w-3 cursor-pointer"
              onClick={() => removeFilter("dateTo")}
            />
          </Badge>
        )}
        {filters.guaranteed && (
          <Badge variant="secondary" className="gap-1">
            Con garantizado
            <X
              className="h-3 w-3 cursor-pointer"
              onClick={() => removeFilter("guaranteed")}
            />
          </Badge>
        )}

        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-7 text-xs"
          >
            Limpiar todo
          </Button>
        )}
      </div>

      {/* Panel de filtros expandible */}
      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 border rounded-lg bg-muted/50">
          {/* Buy-in mínimo */}
          <div className="space-y-2">
            <Label htmlFor="buyinMin">Buy-in mínimo (€)</Label>
            <Input
              id="buyinMin"
              type="number"
              placeholder="0"
              value={filters.buyinMin || ""}
              onChange={(e) =>
                handleFilterChange(
                  "buyinMin",
                  e.target.value ? parseInt(e.target.value) : undefined
                )
              }
            />
          </div>

          {/* Buy-in máximo */}
          <div className="space-y-2">
            <Label htmlFor="buyinMax">Buy-in máximo (€)</Label>
            <Input
              id="buyinMax"
              type="number"
              placeholder="10000"
              value={filters.buyinMax || ""}
              onChange={(e) =>
                handleFilterChange(
                  "buyinMax",
                  e.target.value ? parseInt(e.target.value) : undefined
                )
              }
            />
          </div>

          {/* Tipo de torneo */}
          <div className="space-y-2">
            <Label htmlFor="type">Tipo de torneo</Label>
            <Select
              value={filters.type || ""}
              onValueChange={(value) =>
                handleFilterChange("type", value || undefined)
              }
            >
              <SelectTrigger id="type">
                <SelectValue placeholder="Todos los tipos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos</SelectItem>
                <SelectItem value="Freezeout">Freezeout</SelectItem>
                <SelectItem value="Rebuy">Rebuy</SelectItem>
                <SelectItem value="Knockout">Knockout</SelectItem>
                <SelectItem value="Bounty">Bounty</SelectItem>
                <SelectItem value="Turbo">Turbo</SelectItem>
                <SelectItem value="Deep Stack">Deep Stack</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Con garantizado */}
          <div className="space-y-2">
            <Label htmlFor="guaranteed">Garantizado</Label>
            <Select
              value={filters.guaranteed ? "yes" : ""}
              onValueChange={(value) =>
                handleFilterChange("guaranteed", value === "yes" || undefined)
              }
            >
              <SelectTrigger id="guaranteed">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos</SelectItem>
                <SelectItem value="yes">Solo con garantizado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Fecha desde */}
          <div className="space-y-2">
            <Label>Desde</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !filters.dateFrom && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {filters.dateFrom ? (
                    format(filters.dateFrom, "dd/MM/yyyy", { locale: es })
                  ) : (
                    <span>Seleccionar fecha</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={filters.dateFrom}
                  onSelect={(date) => handleFilterChange("dateFrom", date)}
                  initialFocus
                  locale={es}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Fecha hasta */}
          <div className="space-y-2">
            <Label>Hasta</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !filters.dateTo && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {filters.dateTo ? (
                    format(filters.dateTo, "dd/MM/yyyy", { locale: es })
                  ) : (
                    <span>Seleccionar fecha</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={filters.dateTo}
                  onSelect={(date) => handleFilterChange("dateTo", date)}
                  initialFocus
                  locale={es}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      )}
    </div>
  );
}
