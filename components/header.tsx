"use client";

import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export function Header() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const isSignedIn = !!session;

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className=" flex h-14 w-full px-12">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link href="/" className="flex items-center space-x-2">
            <img src="/globe.svg" alt="Logo" className="h-7 w-7" />
            <span className="hidden font-bold sm:inline-block">TMB Portal</span>
          </Link>
        </div>
        {/* Navigation */}
        <div className="flex-1 flex justify-center px-4">
          <Navigation />
        </div>
        {/* User menu */}
        <div className="flex items-center space-x-2">
          {isLoading ? null : isSignedIn ? (
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => router.push("/login")}
            >
              <LogIn className="h-4 w-4" />
              <span className="hidden sm:inline">Login</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
