"use server";

import dbConnect from "@/lib/mongodb";
import Booking from "@/models/Booking";
import { getSession } from "@/lib/auth";
import { logAdminAction } from "./audit-actions";
import { createNotification } from "./notification-actions";
import { revalidatePath } from "next/cache";

export async function searchBookings(query: string, eventId?: string) {
  try {
    await dbConnect();
    const session = await getSession();
    if (!session?.user || session.user.role !== 'admin') {
      return { success: false, error: "Unauthorized" };
    }

    const searchQuery: any = {};
    
    if (eventId) {
      searchQuery.event = eventId;
    }

    if (query) {
      const term = { $regex: query, $options: 'i' };
      
      const filterConditions: any[] = [
        { "attendeeInfo.name": term },
        { "attendeeInfo.email": term },
        { "attendeeInfo.phone": term },
        { ticketType: term }
      ];

      // Check if query is a valid 24-character hexadecimal ObjectId
      if (/^[0-9a-fA-F]{24}$/.test(query)) {
        filterConditions.push({ _id: query as any });
      }

      searchQuery.$or = filterConditions;
    }

    const bookings = await Booking.find(searchQuery)
      .populate('event')
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .limit(100)
      .lean();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(bookings))
    };
  } catch (error: any) {
    console.error("Error searching bookings:", error);
    return { success: false, error: error.message || "Failed to query bookings", data: [] };
  }
}

export async function refundBooking(bookingId: string) {
  try {
    await dbConnect();
    const session = await getSession();
    if (!session?.user || session.user.role !== 'admin') {
      return { success: false, error: "Unauthorized" };
    }

    const booking = await Booking.findById(bookingId).populate('event');
    if (!booking) return { success: false, error: "Booking not found" };

    if (booking.paymentStatus === 'refunded') {
      return { success: false, error: "Booking is already refunded" };
    }

    const prevStatus = booking.paymentStatus;
    booking.paymentStatus = 'refunded';
    await booking.save();

    // Log Audit
    await logAdminAction({
      action: "refund_booking",
      targetType: "Booking",
      targetId: bookingId,
      details: { 
        eventId: booking.event._id.toString(), 
        eventTitle: (booking.event as any).title,
        attendeeName: booking.attendeeInfo?.name,
        totalAmount: booking.totalAmount,
        quantity: booking.quantity,
        ticketType: booking.ticketType,
        prevStatus
      }
    });

    // Notify Attendee
    await createNotification(booking.user.toString(), {
      title: "Booking Refunded",
      message: `Your booking for ${(booking.event as any).title} has been refunded by administration.`,
      type: "warning",
      link: "/dashboard"
    });

    const eventId = booking.event._id.toString();
    revalidatePath(`/admin/events/${eventId}`);
    revalidatePath(`/admin/bookings`);
    
    return { success: true, message: "Booking refunded successfully." };
  } catch (error: any) {
    console.error("Error refunding booking:", error);
    return { success: false, error: error.message || "Refund failed" };
  }
}

export async function resendDigitalTicket(bookingId: string) {
  try {
    await dbConnect();
    const session = await getSession();
    if (!session?.user || session.user.role !== 'admin') {
      return { success: false, error: "Unauthorized" };
    }

    const booking = await Booking.findById(bookingId).populate('event');
    if (!booking) return { success: false, error: "Booking not found" };

    // Notify Attendee (Resend Ticket Link notification)
    await createNotification(booking.user.toString(), {
      title: "Digital Ticket Resent",
      message: `Your digital ticket for ${(booking.event as any).title} is ready. Access it inside your dashboard.`,
      type: "success",
      link: "/dashboard"
    });

    // Log Audit
    await logAdminAction({
      action: "resend_ticket",
      targetType: "Booking",
      targetId: bookingId,
      details: { 
        attendeeName: booking.attendeeInfo?.name,
        attendeeEmail: booking.attendeeInfo?.email,
        eventTitle: (booking.event as any).title
      }
    });

    return { success: true, message: "Digital ticket notification resent." };
  } catch (error: any) {
    console.error("Error resending ticket:", error);
    return { success: false, error: error.message || "Resend failed" };
  }
}

export async function updateAttendeeInfo(
  bookingId: string, 
  info: { name: string; email: string; phone: string }
) {
  try {
    await dbConnect();
    const session = await getSession();
    if (!session?.user || session.user.role !== 'admin') {
      return { success: false, error: "Unauthorized" };
    }

    const booking = await Booking.findById(bookingId).populate('event');
    if (!booking) return { success: false, error: "Booking not found" };

    const prevInfo = { ...booking.attendeeInfo };
    booking.attendeeInfo = {
      name: info.name,
      email: info.email,
      phone: info.phone
    };

    await booking.save();

    // Log Audit
    await logAdminAction({
      action: "edit_attendee_info",
      targetType: "Booking",
      targetId: bookingId,
      details: { 
        prevInfo,
        newInfo: info,
        eventTitle: (booking.event as any).title
      }
    });

    const eventId = booking.event._id.toString();
    revalidatePath(`/admin/events/${eventId}`);
    revalidatePath(`/admin/bookings`);

    return { success: true, message: "Attendee details updated." };
  } catch (error: any) {
    console.error("Error updating attendee info:", error);
    return { success: false, error: error.message || "Update failed" };
  }
}
