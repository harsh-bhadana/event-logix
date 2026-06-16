import { NextResponse } from "next/server";
import { env } from "@/lib/env";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  try {
    const clientId = env.GOOGLE_CLIENT_ID;
    
    if (!clientId) {
      console.warn("Google Sign-In attempted but GOOGLE_CLIENT_ID is not configured.");
      const origin = new URL(request.url).origin;
      return NextResponse.redirect(
        `${origin}/login?error=Google+Sign-In+is+not+configured`
      );
    }

    const origin = new URL(request.url).origin;
    const redirectUri = `${origin}/api/auth/callback/google`;
    
    // Generate a random state parameter for CSRF validation
    const state = crypto.randomUUID();
    
    // Store the state in a secure, HTTP-only cookie
    const cookieStore = await cookies();
    cookieStore.set("google_auth_state", state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 10 * 60, // 10 minutes
      sameSite: "lax",
    });

    // Construct the Google OAuth 2.0 authorization URL
    const googleAuthUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    googleAuthUrl.searchParams.append("client_id", clientId);
    googleAuthUrl.searchParams.append("redirect_uri", redirectUri);
    googleAuthUrl.searchParams.append("response_type", "code");
    googleAuthUrl.searchParams.append("scope", "openid email profile");
    googleAuthUrl.searchParams.append("state", state);
    googleAuthUrl.searchParams.append("access_type", "offline");
    googleAuthUrl.searchParams.append("prompt", "select_account");

    return NextResponse.redirect(googleAuthUrl.toString());
  } catch (error: any) {
    console.error("Google OAuth initiation error:", error);
    const origin = new URL(request.url).origin;
    return NextResponse.redirect(`${origin}/login?error=Failed+to+initiate+Google+Sign-In`);
  }
}
