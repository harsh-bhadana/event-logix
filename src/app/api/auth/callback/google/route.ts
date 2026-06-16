import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { env } from "@/lib/env";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { login_session } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function GET(request: Request) {
  const origin = new URL(request.url).origin;
  const cookieStore = await cookies();

  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    const state = searchParams.get("state");

    // 1. Verify CSRF State
    const savedState = cookieStore.get("google_auth_state")?.value;
    cookieStore.delete("google_auth_state");

    if (!state || !savedState || state !== savedState) {
      console.warn("Google OAuth callback: State mismatch or missing.");
      return NextResponse.redirect(`${origin}/login?error=Invalid+auth+state`);
    }

    if (!code) {
      console.warn("Google OAuth callback: No authorization code received.");
      return NextResponse.redirect(`${origin}/login?error=No+authorization+code`);
    }

    const clientId = env.GOOGLE_CLIENT_ID;
    const clientSecret = env.GOOGLE_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      console.error("Google Client ID or Client Secret is missing in environment.");
      return NextResponse.redirect(`${origin}/login?error=OAuth+configuration+missing`);
    }

    // 2. Exchange Code for Access Token
    const redirectUri = `${origin}/api/auth/callback/google`;
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      console.error("Google Token Exchange failed:", tokenData);
      return NextResponse.redirect(`${origin}/login?error=Token+exchange+failed`);
    }

    const { access_token } = tokenData;

    // 3. Retrieve User Info from Google
    const profileResponse = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const profile = await profileResponse.json();

    if (!profileResponse.ok) {
      console.error("Google UserInfo retrieval failed:", profile);
      return NextResponse.redirect(`${origin}/login?error=Failed+to+fetch+user+profile`);
    }

    if (!profile.email) {
      console.error("Google Profile does not contain email:", profile);
      return NextResponse.redirect(`${origin}/login?error=Email+address+not+provided`);
    }

    // 4. Database Lookup / Register User
    await dbConnect();
    let user = await User.findOne({ email: profile.email.toLowerCase() });

    if (!user) {
      console.log(`OAuth Auto-Registering user: ${profile.email}`);
      // Generate a strong random password since they use Google Sign-In
      const randomPassword = crypto.randomUUID();
      const hashedPassword = await bcrypt.hash(randomPassword, 10);

      user = new User({
        name: profile.name || profile.given_name || "Google User",
        email: profile.email.toLowerCase(),
        password: hashedPassword,
        role: "public",
        staffProfile: {
          profileImage: profile.picture || null,
          skills: [],
          verificationDocs: [],
        },
      });

      await user.save();
    }

    // 5. Establish HTTP-Only Session
    await login_session({
      id: user._id.toString(),
      email: user.email,
      role: user.role,
      onboardingStatus: user.staffProfile?.onboardingStatus,
      isVerified: user.staffProfile?.isVerified,
    });

    // 6. Redirect to portal depending on role
    switch (user.role) {
      case "admin":
        return NextResponse.redirect(`${origin}/admin`);
      case "staff":
        return NextResponse.redirect(`${origin}/staff/jobs`);
      default:
        return NextResponse.redirect(`${origin}/`);
    }
  } catch (error: any) {
    console.error("Google OAuth Callback Error:", error);
    return NextResponse.redirect(`${origin}/login?error=Authentication+failed`);
  }
}
