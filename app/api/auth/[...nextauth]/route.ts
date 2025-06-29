import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/database";

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/error",
  },
  callbacks: {
    async signIn({ user }) {
      if (!user?.email) return false;
      // Check if an employee exists with this email
      const employee = await prisma.employee.findFirst({
        where: { email: user.email },
      });
      console.log(employee);
      if (!employee) {
        return false;
      }
      return true;
    },
  },
});

export { handler as GET, handler as POST };
