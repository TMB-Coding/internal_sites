"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Users, Wrench, Home } from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Employee Management", href: "/dashboard/employees", icon: Users },
  { name: "Tools Inventory", href: "/dashboard/tools", icon: Wrench },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center space-x-1 md:space-x-2 lg:space-x-4">
      {navigation.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-150",
              isActive
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <Icon className="h-5 w-5" />
            <span className="hidden md:inline-block">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
