import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const path = nextUrl.pathname;
      const isProtectedRoute = ["/admin", "/staff"].some((route) => path.startsWith(route));
      const isPublicRoute = ["/login", "/signup", "/"].includes(path);

      if (isPublicRoute && isLoggedIn) {
        const role = (auth.user as any).role;
        if (role === "admin") {
          return Response.redirect(new URL("/admin/events", nextUrl));
        } else if (role === "staff") {
          return Response.redirect(new URL("/staff/jobs", nextUrl));
        }
        if (path !== "/") {
          return Response.redirect(new URL("/", nextUrl));
        }
      }

      if (isProtectedRoute) {
        if (!isLoggedIn) return false;

        const role = (auth.user as any).role;
        const isAdminRoute = path.startsWith("/admin");
        const isStaffRoute = path.startsWith("/staff");

        if (isAdminRoute && role !== "admin") {
          return Response.redirect(new URL("/staff/jobs", nextUrl));
        }

        if (isStaffRoute && role === "staff") {
          const onboardingStatus = (auth.user as any).onboardingStatus;
          if (onboardingStatus !== "approved" && path !== "/staff/onboarding") {
            return Response.redirect(new URL("/staff/onboarding", nextUrl));
          }
        }
      }

      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.onboardingStatus = (user as any).onboardingStatus;
        token.isVerified = (user as any).isVerified;
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        (session.user as any).role = token.role;
        (session.user as any).onboardingStatus = token.onboardingStatus;
        (session.user as any).isVerified = token.isVerified;
      }
      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
