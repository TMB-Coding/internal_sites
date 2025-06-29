import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - TMB Portal",
  description: "Sign in to access the TMB Portal",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
