"use server";

import User from "@/models/User";
import { StaffOnboardingData } from "@/hooks/useStaffOnboarding";
import bcrypt from "bcryptjs";
import { login_session, logout_session } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/mongodb";

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
      role: 'staff',
      staffProfile: {
        skills: data.skills,
        isVerified: false,
        profileImage: data.profileImage,
        bio: data.bio,
        yearsOfExperience: data.yearsOfExperience,
        noticePeriod: data.noticePeriod,
        customTags: data.customTags,
        availability: data.availability,
        verificationDocs: data.verificationDocs
      }
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
    await dbConnect();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const user = await User.findOne({ email });
    if (!user) {
      return { success: false, message: "Invalid email or password" };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { success: false, message: "Invalid email or password" };
    }

    // Set session
    await login_session({ 
      id: user._id.toString(), 
      email: user.email, 
      role: user.role,
      onboardingStatus: user.staffProfile?.onboardingStatus,
      isVerified: user.staffProfile?.isVerified
    });

    return { success: true, role: user.role };
  } catch (error: any) {
    console.error("Login failed:", error);
    return { success: false, message: "An error occurred during login" };
  }
}

export async function logout() {
  await logout_session();
  revalidatePath("/");
  redirect("/login");
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
      role: 'public'
    });

    await newUser.save();
    return { success: true, message: "Account created! Please login." };
  } catch (error: any) {
    console.error("Registration failed:", error);
    return { success: false, message: "Failed to create account" };
  }
}
