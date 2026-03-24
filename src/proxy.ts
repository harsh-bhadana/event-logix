import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/jwt";

// 1. Specify protected and public routes
const protectedRoutes = ["/admin", "/staff"];
const publicRoutes = ["/login", "/signup", "/"];

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));
  const isPublicRoute = publicRoutes.includes(path);

  // 3. Decrypt the session from the cookie
  const cookie = req.cookies.get("session")?.value;
  const session = cookie ? await decrypt(cookie).catch(() => null) : null;

  // 4. Handle Redirection for authenticated users visiting public routes (Login/Signup)
  if (isPublicRoute && session) {
    const role = session.user.role;
    if (role === 'admin') {
      return NextResponse.redirect(new URL("/admin/manage-events", req.nextUrl));
    } else if (role === 'staff') {
      return NextResponse.redirect(new URL("/staff/jobs", req.nextUrl));
    }
    // For 'public' role, we can redirect to a profile or discover page if implemented, 
    // but for now, we'll let them stay on public routes if it's the home page.
    if (path !== "/") return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  // 5. Handle Protected Routes and RBAC
  if (isProtectedRoute) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    const role = session.user.role;
    const isAdminRoute = path.startsWith("/admin");
    const isStaffRoute = path.startsWith("/staff");

    if (isAdminRoute && role !== 'admin') {
      return NextResponse.redirect(new URL("/staff/jobs", req.nextUrl)); // Or another safe route
    }

    if (isStaffRoute && role === 'staff') {
      const isVerified = session.user.isVerified;
      const onboardingStatus = session.user.onboardingStatus;
      
      // If not approved and not already on onboarding page, redirect
      if (onboardingStatus !== 'approved' && path !== "/staff/onboarding") {
        return NextResponse.redirect(new URL("/staff/onboarding", req.nextUrl));
      }
    }
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
