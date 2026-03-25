"use server";

import dbConnect from "@/lib/mongodb";
import Event from "@/models/Event";
import Booking from "@/models/Booking";
import User from "@/models/User";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createNotification } from "./notification-actions";

// ── BOOKING ──────────────────────────────────────────────────────────────────

export interface BookTicketInput {
  eventId: string;
  ticketType: string;
  quantity: number;
  attendeeInfo?: {
    name: string;
    email: string;
    phone: string;
  };
}

export async function bookTicket(input: BookTicketInput) {
  try {
    await dbConnect();
    const session = await getSession();
    if (!session?.user) {
      return { success: false, message: "You must be logged in to book tickets." };
    }

    const event = await Event.findById(input.eventId);
    if (!event) return { success: false, message: "Event not found." };
    if (event.status !== "published") {
      return { success: false, message: "This event is not available for booking." };
    }

    // Find the requested ticket type
    const ticket = event.ticketTypes.find((t: any) => t.name === input.ticketType);
    if (!ticket) return { success: false, message: "Ticket type not found." };

    // Check remaining capacity
    const sold = await Booking.countDocuments({
      event: event._id,
      ticketType: input.ticketType,
      paymentStatus: { $in: ["pending", "completed"] },
    });
    const remaining = (ticket.quantity || 0) - sold;
    if (remaining < input.quantity) {
      return { success: false, message: `Only ${remaining} ticket(s) remaining for this type.` };
    }

    const totalAmount = ticket.price * input.quantity;

    const booking = new Booking({
      event: event._id,
      user: session.user.id,
      ticketType: input.ticketType,
      quantity: input.quantity,
      totalAmount,
      paymentStatus: ticket.price === 0 ? "completed" : "pending",
      attendeeInfo: input.attendeeInfo,
      qrCode: ticket.price === 0 ? "" : undefined, // Placeholder
    });
    await booking.save();

    // Notify Attendee
    await createNotification(session.user.id, {
      title: ticket.price === 0 ? "Booking Confirmed!" : "Booking Created",
      message: ticket.price === 0 
        ? `Your ticket for ${event.title} is confirmed.` 
        : `Your booking for ${event.title} is ready. Please complete payment.`,
      type: ticket.price === 0 ? "success" : "info",
      link: "/dashboard"
    });

    revalidatePath(`/events/${input.eventId}`);
    revalidatePath("/admin/events");

    return {
      success: true,
      bookingId: booking._id.toString(),
      totalAmount,
      isFree: ticket.price === 0,
      message: ticket.price === 0
        ? "Your free ticket has been confirmed!"
        : "Booking created! Proceed to payment.",
    };
  } catch (error: any) {
    console.error("bookTicket error:", error);
    return { success: false, message: error.message || "Failed to book ticket." };
  }
}

export async function completeBookingPayment(bookingId: string) {
  try {
    await dbConnect();
    const session = await getSession();
    if (!session?.user) {
      return { success: false, message: "You must be logged in to complete payment." };
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) return { success: false, message: "Booking not found." };

    // Simulating payment success
    booking.paymentStatus = "completed";
    booking.paymentId = `PAY-${Math.random().toString(36).toUpperCase().substring(2, 10)}`;
    booking.qrCode = booking._id.toString();

    await booking.save();

    // Notify Attendee
    await createNotification(session.user.id, {
      title: "Payment Successful!",
      message: "Your payment has been received. Your ticket is now available in your dashboard.",
      type: "success",
      link: "/dashboard"
    });

    revalidatePath("/dashboard");
    revalidatePath("/events/success");

    return { success: true, message: "Payment completed successfully!" };
  } catch (error: any) {
    console.error("completeBookingPayment error:", error);
    return { success: false, message: error.message || "Payment failed." };
  }
}

export async function getUserBookings() {
  try {
    await dbConnect();
    const session = await getSession();
    if (!session?.user) return { success: false, bookings: [] };

    const bookings = await Booking.find({ user: session.user.id })
      .populate("event")
      .sort({ createdAt: -1 });

    return { success: true, bookings: JSON.parse(JSON.stringify(bookings)) };
  } catch (error: any) {
    console.error("getUserBookings error:", error);
    return { success: false, bookings: [] };
  }
}

// ── STAFF APPLY ───────────────────────────────────────────────────────────────

export interface ApplyForRoleInput {
  eventId: string;
  roleName: string;
}

export async function applyForStaffRole(input: ApplyForRoleInput) {
  try {
    await dbConnect();
    const session = await getSession();
    if (!session?.user) {
      return { success: false, message: "You must be logged in to apply." };
    }

    const user = await User.findById(session.user.id);
    if (!user || user.role !== "staff") {
      return { success: false, message: "Only verified staff members can apply." };
    }
    if (user.staffProfile?.onboardingStatus !== "approved") {
      return { success: false, message: "Your account is pending approval. Please wait for admin review." };
    }

    const event = await Event.findById(input.eventId);
    if (!event) return { success: false, message: "Event not found." };

    const role = event.staffRolesNeeded.find(
      (r: any) => r.roleName === input.roleName
    );
    if (!role) return { success: false, message: "Role not found on this event." };

    const userId = user._id;
    const alreadyAssigned = role.assignedStaff.some(
      (id: any) => id.toString() === userId.toString()
    );
    if (alreadyAssigned) {
      return { success: false, message: "You have already applied for this role." };
    }

    if (role.assignedStaff.length >= role.count) {
      return { success: false, message: "This role is fully staffed." };
    }

    // Add the user to the assigned staff array for that role
    await Event.updateOne(
      { _id: event._id, "staffRolesNeeded.roleName": input.roleName },
      { $push: { "staffRolesNeeded.$.assignedStaff": userId } }
    );

    revalidatePath("/staff/jobs");
    revalidatePath("/admin/events");

    return {
      success: true,
      message: `Application submitted for "${input.roleName}" on ${event.title}!`,
    };
  } catch (error: any) {
    console.error("applyForStaffRole error:", error);
    return { success: false, message: error.message || "Failed to apply." };
  }
}

// ── EVENT STATUS CHANGE (ADMIN) ───────────────────────────────────────────────

export async function updateEventStatus(
  eventId: string,
  status: "published" | "draft" | "cancelled"
) {
  try {
    await dbConnect();
    const session = await getSession();
    if (!session?.user || session.user.role !== "admin") {
      return { success: false, message: "Unauthorized." };
    }

    await Event.findByIdAndUpdate(eventId, { status });

    revalidatePath("/admin/events");
    revalidatePath("/");
    revalidatePath(`/events/${eventId}`);

    return { success: true, message: `Event status updated to ${status}.` };
  } catch (error: any) {
    console.error("updateEventStatus error:", error);
    return { success: false, message: error.message || "Failed to update status." };
  }
}

// ── TOGGLE FEATURED (ADMIN) ───────────────────────────────────────────────────

export async function toggleEventFeatured(eventId: string, isFeatured: boolean) {
  try {
    await dbConnect();
    const session = await getSession();
    if (!session?.user || session.user.role !== "admin") {
      return { success: false, message: "Unauthorized." };
    }

    await Event.findByIdAndUpdate(eventId, { isFeatured });

    revalidatePath("/admin/events");
    revalidatePath("/");

    return { success: true, message: `Event ${isFeatured ? "featured" : "unfeatured"}.` };
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to update." };
  }
}

// ── ADMIN INSIGHTS ────────────────────────────────────────────────────────────

export async function getAdminInsights() {
  try {
    await dbConnect();

    const [totalEvents, publishedEvents, bookingsResult, staffCount] =
      await Promise.all([
        Event.countDocuments(),
        Event.countDocuments({ status: "published" }),
        Booking.aggregate([
          { $match: { paymentStatus: "completed" } },
          {
            $group: {
              _id: null,
              total: { $sum: "$totalAmount" },
              count: { $sum: "$quantity" },
            },
          },
        ]),
        User.countDocuments({
          role: "staff",
          "staffProfile.onboardingStatus": "approved",
        }),
      ]);

    const revenue = bookingsResult[0]?.total || 0;
    const ticketsSold = bookingsResult[0]?.count || 0;

    return {
      success: true,
      data: {
        totalEvents,
        publishedEvents,
        revenue,
        ticketsSold,
        staffCount,
      },
    };
  } catch (error: any) {
    console.error("getAdminInsights error:", error);
    return { success: false, data: null };
  }
}
