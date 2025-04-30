/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { CircleUser, Menu, User, Star, LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

import { createClient } from "@/lib/supabase/server";
import Navigation from "./navigation";
import SearchBar from "./search";
import { Avatar, AvatarImage } from "../ui/avatar";

export default function Header({ user }: { user: any }) {
  const logged = user.logged;
  const avatar = user.avatar;
  const avatarName = user.avatarName;

  return (
    <header className="sticky top-0 h-16 border-b bg-background z-50">
      <div className="container mx-auto flex h-full items-center justify-between gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 lg:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col">
            <nav className="grid gap-4 text-lg font-medium pt-8">
              <Navigation isMobile={true} />
            </nav>
          </SheetContent>
        </Sheet>
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <img
            src="/logo-torneospokerlive.png"
            alt="Torneos Poker Live Logo"
            width={160}
            className="h-10 w-auto"
          />
        </Link>
        <nav className="hidden flex-col gap-6 text-lg font-medium lg:flex lg:flex-row lg:items-center lg:gap-5 lg:text-sm">
          <Navigation />
        </nav>
        <div className="flex items-center gap-4">
          <SearchBar />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                {logged && (
                  <Avatar>
                    <AvatarImage
                      src={
                        avatar ??
                        `https://ui-avatars.com/api/?name=${avatarName}&s=100&background=random`
                      }
                    />
                  </Avatar>
                )}
                {!logged && <CircleUser className="h-5 w-5" />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {logged && (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/ajustes" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>Mi perfil</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/ajustes/mis-casinos"
                      className="flex items-center gap-2"
                    >
                      <Star className="h-4 w-4" />
                      <span>Mis casinos</span>
                    </Link>
                  </DropdownMenuItem>
                </>
              )}
              {!logged && (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/login" className="flex items-center gap-2">
                      <LogIn className="h-4 w-4" />
                      <span>Login</span>
                    </Link>
                  </DropdownMenuItem>
                </>
              )}
              {logged && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <form action="/auth/signout" method="post">
                      <button
                        className="flex items-center gap-2 w-full text-sm"
                        type="submit"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Salir</span>
                      </button>
                    </form>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
