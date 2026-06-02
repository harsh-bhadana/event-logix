'use server';

import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import Event from "@/models/Event";
import Booking from "@/models/Booking";
import { getSession } from "@/lib/auth";
import ScanLog from "@/models/ScanLog";
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

export async function bulkUpdateStaffStatus(userIds: string[], status: 'approved' | 'rejected', reason?: string) {
  try {
    await dbConnect();
    
    const results = await Promise.all(
      userIds.map(id => updateStaffStatus(id, status, reason))
    );

    const failures = results.filter(r => !r.success);
    
    if (failures.length > 0) {
      return { 
        success: false, 
        message: `Updated with ${failures.length} failures`, 
        error: failures[0].error 
      };
    }

    return { success: true, message: `Successfully ${status} ${userIds.length} staff applications` };
  } catch (error: any) {
    console.error("Error in bulk update staff:", error);
    return { success: false, error: error.message || "Bulk update failed" };
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

export async function verifyTicket(bookingIdOrQr: string, expectedEventId?: string) {
  try {
    await dbConnect();
    const session = await getSession();
    const scannedBy = session?.user?.id || null;
    
    // Check if it's a booking ID or a QR code ID
    // Our QR codes are usually strings like "qr_..." or the booking ID itself
    const booking = await Booking.findOne({
      $or: [
        { _id: isValidObjectId(bookingIdOrQr) ? bookingIdOrQr : null },
        { qrCode: bookingIdOrQr }
      ]
    }).populate('event');

    if (!booking) {
      if (expectedEventId) {
        await ScanLog.create({
          event: expectedEventId,
          ticketCode: bookingIdOrQr,
          scannedBy,
          status: "failure",
          errorReason: "Invalid Ticket: No booking found"
        });
      }
      return { success: false, error: "Invalid Ticket: No booking found" };
    }

    const eventId = booking.event._id.toString();

    // Check event mismatch if expectedEventId is provided
    if (expectedEventId && expectedEventId !== eventId) {
      await ScanLog.create({
        event: expectedEventId,
        booking: booking._id,
        ticketCode: bookingIdOrQr,
        scannedBy,
        status: "failure",
        errorReason: `Ticket belongs to a different event: ${(booking.event as any).title}`
      });
      return { 
        success: false, 
        error: `Ticket belongs to a different event: ${(booking.event as any).title}` 
      };
    }

    if (booking.paymentStatus !== 'completed') {
      await ScanLog.create({
        event: eventId,
        booking: booking._id,
        ticketCode: bookingIdOrQr,
        scannedBy,
        status: "failure",
        errorReason: "Invalid Ticket: Payment not completed"
      });
      return { success: false, error: "Invalid Ticket: Payment not completed" };
    }

    if (booking.checkedInAt) {
      const formattedTime = new Date(booking.checkedInAt).toLocaleTimeString();
      await ScanLog.create({
        event: eventId,
        booking: booking._id,
        ticketCode: bookingIdOrQr,
        scannedBy,
        status: "failure",
        errorReason: `Already checked in at ${formattedTime}`
      });
      return { 
        success: false, 
        error: `Already checked in at ${formattedTime}`
      };
    }

    // Set check-in time
    booking.checkedInAt = new Date();
    await booking.save();

    // Log success
    await ScanLog.create({
      event: eventId,
      booking: booking._id,
      ticketCode: bookingIdOrQr,
      scannedBy,
      status: "success"
    });

    revalidatePath(`/admin/events/${eventId}/checkin`);
    revalidatePath(`/admin/events/${eventId}/roster`);
    revalidatePath(`/admin/events/${eventId}`);
    revalidatePath(`/admin/gate`);
    
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

export async function getRecentScans(eventId?: string) {
  try {
    await dbConnect();
    const query: any = {};
    if (eventId) {
      query.event = eventId;
    }
    
    const scans = await ScanLog.find(query)
      .populate('booking')
      .populate('scannedBy', 'name email')
      .sort({ scannedAt: -1 })
      .limit(50)
      .lean();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(scans))
    };
  } catch (error: any) {
    console.error("Error getting recent scans:", error);
    return { success: false, error: error.message || "Failed to fetch scans", data: [] };
  }
}

export async function getInGateRoster(eventId: string) {
  try {
    await dbConnect();
    const bookings = await Booking.find({ 
      event: eventId,
      paymentStatus: 'completed'
    }).lean();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(bookings))
    };
  } catch (error: any) {
    console.error("Error getting in-gate roster:", error);
    return { success: false, error: error.message || "Failed to fetch roster", data: [] };
  }
}

export async function manuallyCheckInAttendee(bookingId: string) {
  try {
    await dbConnect();
    const session = await getSession();
    if (!session?.user || session.user.role !== 'admin') {
      return { success: false, error: "Unauthorized" };
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return { success: false, error: "Booking not found" };
    }

    if (booking.checkedInAt) {
      // Toggle check-in off (check-out)
      booking.checkedInAt = undefined;
      await booking.save();

      // Log manual check-out
      await ScanLog.create({
        event: booking.event,
        booking: booking._id,
        ticketCode: booking._id.toString(),
        scannedBy: session.user.id,
        status: "success",
        errorReason: "Manual checkout by admin"
      });

      revalidatePath(`/admin/events/${booking.event.toString()}/checkin`);
      revalidatePath(`/admin/events/${booking.event.toString()}/roster`);
      revalidatePath(`/admin/events/${booking.event.toString()}`);
      revalidatePath(`/admin/gate`);
      
      return { success: true, message: "Attendee checked out manually." };
    } else {
      // Check-in
      booking.checkedInAt = new Date();
      await booking.save();

      // Log manual check-in
      await ScanLog.create({
        event: booking.event,
        booking: booking._id,
        ticketCode: booking._id.toString(),
        scannedBy: session.user.id,
        status: "success",
        errorReason: "Manual checkin by admin"
      });

      revalidatePath(`/admin/events/${booking.event.toString()}/checkin`);
      revalidatePath(`/admin/events/${booking.event.toString()}/roster`);
      revalidatePath(`/admin/events/${booking.event.toString()}`);
      revalidatePath(`/admin/gate`);

      return { success: true, message: "Attendee checked in manually." };
    }
  } catch (error: any) {
    console.error("Error manually checking in attendee:", error);
    return { success: false, error: error.message || "Manual check-in failed" };
  }
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
