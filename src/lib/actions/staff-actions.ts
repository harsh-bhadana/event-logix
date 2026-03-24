'use server';

import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { revalidatePath } from "next/cache";

export async function getStaffApplications() {
  try {
    await dbConnect();
    const applications = await User.find({
      role: 'staff',
      'staffProfile.onboardingStatus': 'pending'
    }).sort({ createdAt: -1 }).lean();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(applications))
    };
  } catch (error: any) {
    console.error("Error fetching staff applications:", error);
    return { success: false, error: error.message || "Failed to fetch applications", data: [] };
  }
}

export async function updateStaffStatus(userId: string, status: 'approved' | 'rejected') {
  try {
    await dbConnect();
    
    const update: any = {
      'staffProfile.onboardingStatus': status,
    };

    if (status === 'approved') {
      update['staffProfile.isVerified'] = true;
    } else {
      update['staffProfile.isVerified'] = false;
    }

    const user = await User.findByIdAndUpdate(userId, update, { new: true });

    if (!user) {
      return { success: false, error: "User not found" };
    }

    revalidatePath('/admin/staff/applications');
    revalidatePath('/admin/staff/roster');
    
    return { 
      success: true, 
      message: `Staff application ${status} successfully` 
    };
  } catch (error: any) {
    console.error("Error updating staff status:", error);
    return { success: false, error: error.message || "Failed to update status" };
  }
}

export async function getMasterRoster() {
  try {
    await dbConnect();
    const roster = await User.find({
      role: 'staff',
      'staffProfile.onboardingStatus': 'approved'
    }).sort({ name: 1 }).lean();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(roster))
    };
  } catch (error: any) {
    console.error("Error fetching master roster:", error);
    return { success: false, error: error.message || "Failed to fetch roster", data: [] };
  }
}

export async function submitOnboarding(formData: FormData) {
  // This will be used by the staff themselves
  try {
    const userId = formData.get('userId') as string;
    const bio = formData.get('bio') as string;
    const skills = formData.get('skills')?.toString().split(',').map(s => s.trim()) || [];
    const experience = formData.get('experience') as string;

    await dbConnect();
    
    const user = await User.findByIdAndUpdate(userId, {
      $set: {
        'staffProfile.bio': bio,
        'staffProfile.skills': skills,
        'staffProfile.yearsOfExperience': experience,
        'staffProfile.onboardingStatus': 'pending' // Reset to pending after update if they were rejected? 
        // Actually, let's keep it simple for now.
      }
    }, { new: true });

    if (!user) return { success: false, error: "User not found" };

    revalidatePath('/admin/staff/applications');
    return { success: true, message: "Onboarding submitted successfully. Awaiting admin approval." };
  } catch (error: any) {
    console.error("Error submitting onboarding:", error);
    return { success: false, error: error.message || "Failed to submit onboarding" };
  }
}
