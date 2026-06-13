import type { NextAuthConfig } from "next-auth";

// Edge-safe auth config (no Prisma / bcrypt imports) — used by middleware.
export const authConfig = {
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
  trustHost: true,
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = nextUrl.pathname.startsWith("/admin");
      if (isOnAdmin) return isLoggedIn; // redirects to /login when false
      return true;
    },
  },
  providers: [], // real providers added in auth.ts (Node runtime)
} satisfies NextAuthConfig;
