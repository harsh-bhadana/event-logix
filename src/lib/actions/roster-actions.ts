'use server';

import dbConnect from "@/lib/mongodb";
import Event from "@/models/Event";
import Booking from "@/models/Booking";
import User from "@/models/User";

export async function getEventRoster(eventId: string) {
  try {
    await dbConnect();

    // 1. Fetch Event with populated staff
    const event = await Event.findById(eventId)
      .populate('staffRolesNeeded.assignedStaff')
      .lean();

    if (!event) return { success: false, error: "Event not found" };

    // 2. Fetch Attendees (Bookings)
    const bookings = await Booking.find({ 
      event: eventId, 
      paymentStatus: 'completed' 
    }).lean();

    return {
      success: true,
      data: {
        event: JSON.parse(JSON.stringify(event)),
        attendees: JSON.parse(JSON.stringify(bookings))
      }
    };
  } catch (error: any) {
    console.error("Error fetching event roster:", error);
    return { success: false, error: error.message || "Failed to fetch roster" };
  }
}
