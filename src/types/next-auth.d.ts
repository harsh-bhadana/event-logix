import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      role: string;
      onboardingStatus?: string;
      isVerified?: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    name: string;
    role: string;
    onboardingStatus?: string;
    isVerified?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    onboardingStatus?: string;
    isVerified?: boolean;
  }
}
