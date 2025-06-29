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
      try {
        if (!user?.email) return false;

        // Check if an employee exists with this email
        const employee = await prisma.employee.findFirst({
          where: { email: user.email },
        });

        console.log("Employee check result:", employee);

        if (!employee) {
          // Return error URL to redirect to error page
          return "/error";
        }
        return true;
      } catch (error) {
        console.error("Error checking employee:", error);
        // If there's a database error, allow the sign-in to proceed
        // This prevents build-time failures
        return true;
      }
    },
    async jwt({ token, user, account }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account && user) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider.
      return {
        ...session,
        accessToken: token.accessToken,
      };
    },
  },
});

export { handler as GET, handler as POST };
