"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signIn } from "next-auth/react";

const PROVIDERS = [
  {
    id: "google",
    label: "Sign in with Google",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24">
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="#FBBC05"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        />
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
      </svg>
    ),
  },
];

export default function LoginPage() {
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!selectedProvider) {
      setError("Please select a login method.");
      return;
    }
    setIsLoading(true);
    try {
      await signIn(selectedProvider, { callbackUrl: "/dashboard" });
    } catch {
      setError("Failed to sign in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <img src="/globe.svg" alt="Logo" className="h-12 w-12" />
            </div>
            <CardTitle className="text-2xl font-bold">
              Welcome to TMB Portal
            </CardTitle>
            <CardDescription>
              Choose a login method to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleContinue} className="space-y-6">
              <div className="space-y-3">
                {PROVIDERS.map((provider) => (
                  <label
                    key={provider.id}
                    className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedProvider === provider.id
                        ? "border-primary bg-accent/50"
                        : "border-muted"
                    }`}
                  >
                    <input
                      type="radio"
                      name="provider"
                      value={provider.id}
                      checked={selectedProvider === provider.id}
                      onChange={() => setSelectedProvider(provider.id)}
                      className="form-radio accent-primary"
                    />
                    {provider.icon}
                    <span className="font-medium">{provider.label}</span>
                  </label>
                ))}
              </div>
              {error && (
                <div className="text-red-600 text-sm text-center">{error}</div>
              )}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Continuing..." : "Continue"}
              </Button>
            </form>
            <div className="mt-4 text-center text-sm text-muted-foreground">
              <Link
                href="/"
                className="hover:text-primary underline-offset-4 hover:underline"
              >
                Back to portal
              </Link>
            </div>
          </CardContent>
          {/* Security marker */}
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground text-center pb-4">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-muted/60 border border-muted-foreground/10 shadow-sm">
              <svg
                className="h-3 w-3 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <rect x="3" y="11" width="18" height="10" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Authenticating against:{" "}
              <span className="font-mono">prod.1.sql.totalminibmw.com</span>
            </span>
          </div>
        </Card>
      </div>
    </div>
  );
}
