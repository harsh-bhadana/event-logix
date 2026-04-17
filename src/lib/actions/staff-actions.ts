'use server';

import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import Event from "@/models/Event";
import { revalidatePath } from "next/cache";
import { createNotification } from "./notification-actions";

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

export async function updateStaffStatus(userId: string, status: 'approved' | 'rejected', reason?: string) {
  try {
    await dbConnect();
    
    const update: any = {
      'staffProfile.onboardingStatus': status,
      'staffProfile.rejectionReason': reason,
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

    // Notify Staff
    await createNotification(userId, {
      title: status === 'approved' ? 'Application Approved!' : 'Application Update',
      message: status === 'approved' 
        ? 'Welcome to the team! You can now apply for open roles.' 
        : `Your application status: ${status}. ${reason ? 'Reason: ' + reason : ''}`,
      type: status === 'approved' ? 'success' : 'warning',
      link: '/staff/jobs'
    });

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

    // Notify Admin
    const adminId = '69c29ad5886e033a0dbe4d1f'; 
    await createNotification(adminId, {
      title: 'New Staff Application',
      message: `${user.name} has submitted their onboarding for review.`,
      type: 'info',
      link: '/admin/staff'
    });

    revalidatePath('/admin/staff/applications');
    return { success: true, message: "Onboarding submitted successfully. Awaiting admin approval." };
  } catch (error: any) {
    console.error("Error submitting onboarding:", error);
    return { success: false, error: error.message || "Failed to submit onboarding" };
  }
}

export async function getStaffEarnings(userId: string) {
  try {
    await dbConnect();
    const user = await User.findById(userId).select('staffProfile.earnings staffProfile.shifts').lean();
    if (!user) return { success: false, error: "User not found" };

    return {
      success: true,
      data: JSON.parse(JSON.stringify(user.staffProfile))
    };
  } catch (error: any) {
    console.error("Error fetching staff earnings:", error);
    return { success: false, error: error.message || "Failed to fetch earnings" };
  }
}

export async function requestPayout(userId: string, amount: number, details: any) {
  try {
    await dbConnect();
    const user = await User.findById(userId);
    if (!user) return { success: false, error: "User not found" };

    const balance = user.staffProfile?.earnings?.balance || 0;
    if (amount > balance) {
      return { success: false, error: "Insufficient balance" };
    }

    // In a real app, this would trigger a payment gateway or mark a payout record
    // For now, we simulate success and deduct from balance
    user.staffProfile.earnings.balance -= amount;
    await user.save();

    revalidatePath('/staff/earnings');

    // Notify Staff
    await createNotification(userId, {
      title: 'Payout Requested',
      message: `Your request for $${amount} has been received and is being processed.`,
      type: 'success',
      link: '/staff/earnings'
    });
    return { success: true, message: "Payout requested successfully" };
  } catch (error: any) {
    console.error("Error requesting payout:", error);
    return { success: false, error: error.message || "Failed to request payout" };
  }
}

import Booking from "@/models/Booking";

export async function verifyTicket(bookingIdOrQr: string) {
  try {
    await dbConnect();
    
    // Check if it's a booking ID or a QR code ID
    // Our QR codes are usually strings like "qr_..." or the booking ID itself
    const booking = await Booking.findOne({
      $or: [
        { _id: isValidObjectId(bookingIdOrQr) ? bookingIdOrQr : null },
        { qrCode: bookingIdOrQr }
      ]
    }).populate('event');

    if (!booking) {
      return { success: false, error: "Invalid Ticket: No booking found" };
    }

    if (booking.paymentStatus !== 'completed') {
      return { success: false, error: "Invalid Ticket: Payment not completed" };
    }

    if (booking.checkedInAt) {
      return { 
        success: false, 
        error: `Already checked in at ${new Date(booking.checkedInAt).toLocaleTimeString()}`
      };
    }

    // Set check-in time
    booking.checkedInAt = new Date();
    await booking.save();
    
    return {
      success: true,
      data: {
        attendeeName: booking.attendeeInfo.name,
        ticketType: booking.ticketType,
        eventName: (booking.event as any).title,
        quantity: booking.quantity
      }
    };
  } catch (error: any) {
    console.error("Error verifying ticket:", error);
    return { success: false, error: "Verification failed" };
  }
}

function isValidObjectId(id: string) {
  return /^[0-9a-fA-F]{24}$/.test(id);
}

export async function getStaffSchedule(userId: string) {
  try {
    await dbConnect();
    const user = await User.findById(userId).select('staffProfile.shifts').populate('staffProfile.shifts.eventId').lean();
    if (!user) return { success: false, error: "User not found" };

    return {
      success: true,
      data: JSON.parse(JSON.stringify(user.staffProfile.shifts))
    };
  } catch (error: any) {
    console.error("Error fetching staff schedule:", error);
    return { success: false, error: error.message || "Failed to fetch schedule" };
  }
}

export async function getShiftDetails(userId: string, eventId: string) {
  try {
    await dbConnect();
    const event = await Event.findById(eventId).lean();
    if (!event) return { success: false, error: "Event not found" };

    const user = await User.findById(userId).select('staffProfile.shifts').lean();
    const shift = user.staffProfile?.shifts?.find((s: any) => s.eventId.toString() === eventId);

    return {
      success: true,
      data: {
        event: JSON.parse(JSON.stringify(event)),
        shift: JSON.parse(JSON.stringify(shift))
      }
    };
  } catch (error: any) {
    console.error("Error fetching shift details:", error);
    return { success: false, error: error.message || "Failed to fetch shift details" };
  }
}
