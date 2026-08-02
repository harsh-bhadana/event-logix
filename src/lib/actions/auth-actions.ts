"use server";

import User from "@/models/User";
import { StaffOnboardingData } from "@/hooks/useStaffOnboarding";
import bcrypt from "bcryptjs";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import { logAdminAction } from "./audit-actions";

export async function registerStaff(data: StaffOnboardingData) {
  try {
    await dbConnect();

    // Check if user already exists
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      return { success: false, message: "User with this email already exists." };
    }

    // Create new staff user
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = new User({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: "staff",
      staffProfile: {
        skills: data.skills,
        isVerified: false,
        profileImage: data.profileImage,
        bio: data.bio,
        yearsOfExperience: data.yearsOfExperience,
        noticePeriod: data.noticePeriod,
        customTags: data.customTags,
        availability: data.availability,
        verificationDocs: data.verificationDocs,
      },
    });

    await newUser.save();

    return {
      success: true,
      message: "Staff onboarding successful! Please wait for admin verification.",
    };
  } catch (error: any) {
    console.error("Staff registration failed:", error);
    return {
      success: false,
      message: error.message || "Failed to register. Please try again.",
    };
  }
}

export async function login(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    await signIn("credentials", { email, password, redirectTo: "/" });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { success: false, message: "Invalid email or password" };
        default:
          return { success: false, message: "Something went wrong." };
      }
    }
    throw error;
  }
}

export async function logout() {
  await signOut();
}

export async function registerPublic(formData: FormData) {
  try {
    await dbConnect();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { success: false, message: "Email already registered" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: "public",
    });

    await newUser.save();
    return { success: true, message: "Account created! Please login." };
  } catch (error: any) {
    console.error("Registration failed:", error);
    return { success: false, message: "Failed to create account" };
  }
}
