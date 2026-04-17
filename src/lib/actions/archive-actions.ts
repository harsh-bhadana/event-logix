"use server";

import dbConnect from "@/lib/mongodb";
import Event from "@/models/Event";
import Booking from "@/models/Booking";
import { revalidatePath } from "next/cache";

export async function getArchivedEvents() {
  try {
    await dbConnect();

    const archivedEvents = await Event.find({ status: "archived" })
      .sort({ date: -1 })
      .lean();

    // Enrich with performance metrics
    const enrichedEvents = await Promise.all(
      archivedEvents.map(async (event: any) => {
        const bookings = await Booking.find({ event: event._id }).lean();
        
        const completedBookings = bookings.filter(b => b.paymentStatus === "completed");
        const totalRevenue = completedBookings.reduce((acc, curr) => acc + (curr.totalAmount || 0), 0);
        const totalTicketsSold = completedBookings.reduce((acc, curr) => acc + (curr.quantity || 0), 0);
        
        const totalExpectedTickets = event.ticketTypes.reduce((acc: number, curr: any) => acc + curr.quantity, 0);
        const attendanceRate = totalExpectedTickets > 0 ? (totalTicketsSold / totalExpectedTickets) * 100 : 0;

        return {
          ...JSON.parse(JSON.stringify(event)),
          totalRevenue,
          totalTicketsSold,
          attendanceRate,
          totalExpectedTickets
        };
      })
    );

    return { success: true, data: enrichedEvents };
  } catch (error: any) {
    console.error("Error fetching archived events:", error);
    return { success: false, error: error.message };
  }
}

export async function archiveEvent(eventId: string) {
  try {
    await dbConnect();
    const event = await Event.findByIdAndUpdate(
      eventId,
      { status: "archived" },
      { new: true }
    );

    if (!event) throw new Error("Event not found");

    revalidatePath("/admin/events");
    revalidatePath("/admin/archive");
    
    return { success: true, data: JSON.parse(JSON.stringify(event)) };
  } catch (error: any) {
    console.error("Error archiving event:", error);
    return { success: false, error: error.message };
  }
}

export async function restoreEvent(eventId: string) {
  try {
    await dbConnect();
    const event = await Event.findByIdAndUpdate(
      eventId,
      { status: "draft" },
      { new: true }
    );

    if (!event) throw new Error("Event not found");

    revalidatePath("/admin/events");
    revalidatePath("/admin/archive");
    
    return { success: true, data: JSON.parse(JSON.stringify(event)) };
  } catch (error: any) {
    console.error("Error restoring event:", error);
    return { success: false, error: error.message };
  }
}

export async function getArchiveInsights() {
  try {
    await dbConnect();
    
    const archivedEvents = await Event.find({ status: "archived" }).lean();
    
    // Fetch all bookings for these events
    const eventIds = archivedEvents.map(e => e._id);
    const bookings = await Booking.find({ 
      event: { $in: eventIds },
      paymentStatus: "completed"
    }).lean();

    const lifetimeRevenue = bookings.reduce((acc, curr) => acc + (curr.totalAmount || 0), 0);
    const totalHistoricalTickets = bookings.reduce((acc, curr) => acc + (curr.quantity || 0), 0);
    const eventCount = archivedEvents.length;
    
    const averageRevenue = eventCount > 0 ? lifetimeRevenue / eventCount : 0;

    return {
      success: true,
      data: {
        lifetimeRevenue,
        totalHistoricalTickets,
        eventCount,
        averageRevenue
      }
    };
  } catch (error: any) {
    console.error("Error fetching archive insights:", error);
    return { success: false, error: error.message };
  }
}
