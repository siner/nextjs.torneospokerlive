"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Switch } from "@/components/ui/switch";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function SwitchMyTournaments() {
  const mytournaments = useSearchParams().get("mytournaments");
  const [switched, setSwitched] = useState(mytournaments === "true");
  const supabase = createClient();
  const user = supabase.auth.getUser();
  const router = useRouter();
  const pathname = usePathname();

  if (!user) {
    return null;
  }

  const toggleSwitch = async () => {
    setSwitched(!switched);
    if (switched) {
      router.push(pathname.replace("?mytournaments=true", ""));
      router.refresh();
    } else {
      router.push(pathname + "?mytournaments=true");
      router.refresh();
    }
  };

  return (
    <div className="flex items-center justify-center gap-4">
      <div className="text-sm">Mis torneos favoritos</div>
      <Switch checked={switched} onCheckedChange={toggleSwitch} />
    </div>
  );
}
