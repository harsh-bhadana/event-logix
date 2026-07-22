import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { env } from "@/lib/env";

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  secret: env.JWT_SECRET,
  providers: [
    Google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        await dbConnect();

        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          throw new Error("Invalid email or password");
        }

        const isMatch = await bcrypt.compare(credentials.password as string, user.password);
        if (!isMatch) {
          throw new Error("Invalid email or password");
        }

        return {
          id: user._id.toString(),
          email: user.email,
          role: user.role,
          name: user.name,
          onboardingStatus: user.staffProfile?.onboardingStatus,
          isVerified: user.staffProfile?.isVerified,
        } as any;
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        await dbConnect();
        const email = user.email!.toLowerCase();
        let dbUser = await User.findOne({ email });

        if (!dbUser) {
          const randomPassword = crypto.randomUUID();
          const hashedPassword = await bcrypt.hash(randomPassword, 10);

          dbUser = new User({
            name: user.name || profile?.name || "Google User",
            email: email,
            password: hashedPassword,
            role: "public",
            staffProfile: {
              profileImage: user.image || profile?.picture || null,
              skills: [],
              verificationDocs: [],
            },
          });
          await dbUser.save();
        }

        // Attach DB info to user object so jwt callback receives it
        user.id = dbUser._id.toString();
        (user as any).role = dbUser.role;
        (user as any).onboardingStatus = dbUser.staffProfile?.onboardingStatus;
        (user as any).isVerified = dbUser.staffProfile?.isVerified;
      }
      return true;
    },
  },
});
