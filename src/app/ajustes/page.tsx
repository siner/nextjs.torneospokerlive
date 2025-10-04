import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import { getStarredCasinos, getStarredTournaments } from "@/lib/api";
import { Star, Trophy, Calendar, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (!data.user) {
    return null;
  }

  // Obtener estadísticas
  const [casinos, tournaments] = await Promise.all([
    getStarredCasinos(data.user.id),
    getStarredTournaments(data.user.id),
  ]);

  const stats = [
    {
      title: "Casinos Favoritos",
      value: casinos.length,
      icon: Star,
      description: "Casinos que sigues",
      href: "/ajustes/mis-casinos",
      color: "text-yellow-500",
    },
    {
      title: "Torneos Favoritos",
      value: tournaments.length,
      icon: Trophy,
      description: "Torneos guardados",
      href: "/ajustes/mis-torneos",
      color: "text-blue-500",
    },
    {
      title: "Próximos Torneos",
      value: tournaments.filter((t: any) => new Date(t.date) >= new Date())
        .length,
      icon: Calendar,
      description: "Torneos pendientes",
      href: "/torneos?mytournaments=true",
      color: "text-green-500",
    },
  ];

  return (
    <div className="grid gap-6">
      {/* Bienvenida */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">¡Bienvenido de nuevo! 👋</CardTitle>
          <CardDescription>
            Aquí tienes un resumen de tu actividad
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Estadísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.title}
              className="hover:shadow-md transition-shadow"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
                <Link href={stat.href}>
                  <Button variant="link" className="px-0 mt-2" size="sm">
                    Ver más →
                  </Button>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Accesos rápidos */}
      <Card>
        <CardHeader>
          <CardTitle>Acciones Rápidas</CardTitle>
          <CardDescription>Gestiona tu cuenta y tus favoritos</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <Link href="/ajustes/perfil">
            <Button
              variant="outline"
              className="w-full justify-start"
              size="lg"
            >
              <Star className="mr-2 h-4 w-4" />
              Editar mi perfil
            </Button>
          </Link>
          <Link href="/torneos">
            <Button
              variant="outline"
              className="w-full justify-start"
              size="lg"
            >
              <Trophy className="mr-2 h-4 w-4" />
              Explorar torneos
            </Button>
          </Link>
          <Link href="/casinos">
            <Button
              variant="outline"
              className="w-full justify-start"
              size="lg"
            >
              <Star className="mr-2 h-4 w-4" />
              Explorar casinos
            </Button>
          </Link>
          <Link href="/eventos">
            <Button
              variant="outline"
              className="w-full justify-start"
              size="lg"
            >
              <Calendar className="mr-2 h-4 w-4" />
              Ver eventos
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
