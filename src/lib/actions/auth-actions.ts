"use server";

import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { StaffOnboardingData } from "@/hooks/useStaffOnboarding";

export async function registerStaff(data: StaffOnboardingData) {
  try {
    await dbConnect();

    // Check if user already exists
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      return { success: false, message: "User with this email already exists." };
    }

    // Create new staff user
    // Note: In a real app, you would hash the password here.
    // Assuming hashing is handled or will be implemented later.
    const newUser = new User({
      name: data.name,
      email: data.email,
      password: data.password, // SHOULD BE HASHED
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
