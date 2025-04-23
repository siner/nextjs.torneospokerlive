import Link from "next/link";
import { CasinoStar } from "./CasinoStar";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

/* eslint-disable @next/next/no-img-element */
export default async function CardCasino({ casino }: { casino: any }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  var isStarred = false;

  if (user && casino.casino_stars) {
    isStarred = casino.casino_stars.some(
      (star: any) => star.user_id === user.id
    );
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div
          className="aspect-video overflow-hidden relative"
          style={{ backgroundColor: casino.color }}
        >
          <Link
            href={"/casinos/" + casino.slug}
            className="block w-full h-full"
          >
            <img
              src={`${casino.logo}`}
              alt={`Logo ${casino.name}`}
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="mx-auto p-4 object-contain h-full w-full"
            />
          </Link>
        </div>
        <div className="p-4 flex justify-between items-center">
          <Link
            href={"/casinos/" + casino.slug}
            className="block font-semibold hover:underline truncate"
          >
            {casino.name}
          </Link>
          {user && (
            <CasinoStar
              casinoId={casino.id}
              userId={user.id}
              isStarred={isStarred}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
