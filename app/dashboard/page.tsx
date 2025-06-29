"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, Wrench, Activity } from "lucide-react";

export default function Dashboard() {
  const portals = [
    {
      title: "Employee Management",
      description:
        "Manage employee records, add new employees, and view employee information",
      href: "/dashboard/employees",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Tools Inventory",
      description:
        "Track company tools, manage inventory, and monitor tool usage",
      href: "/dashboard/tools",
      icon: Wrench,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
  ];

  const stats = [
    {
      title: "Total Employees",
      value: "24",
      description: "Active employees",
      icon: Users,
    },
    {
      title: "Total Tools",
      value: "156",
      description: "Available tools",
      icon: Wrench,
    },
    {
      title: "Tools in Use",
      value: "23",
      description: "Currently checked out",
      icon: Activity,
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to the internal portal. Select a portal below to get started.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-6 w-6 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-xs text-muted-foreground">
                {stat.description}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {portals.map((portal) => (
          <Link key={portal.title} href={portal.href}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className={`rounded-full p-3 ${portal.bgColor}`}>
                  <portal.icon className={`h-8 w-8 ${portal.color}`} />
                </div>
                <div>
                  <CardTitle>{portal.title}</CardTitle>
                  <CardDescription>{portal.description}</CardDescription>
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
