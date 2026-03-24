import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Event from "@/models/Event";
import Booking from "@/models/Booking";
import { createNotification } from "@/lib/actions/notification-actions";

export async function GET() {
  try {
    await dbConnect();

    // Calculate "tomorrow" range
    const tomorrowStart = new Date();
    tomorrowStart.setDate(tomorrowStart.getDate() + 1);
    tomorrowStart.setHours(0, 0, 0, 0);

    const tomorrowEnd = new Date(tomorrowStart);
    tomorrowEnd.setDate(tomorrowEnd.getDate() + 1);

    // 1. Find events happening tomorrow
    const eventsTomorrow = await Event.find({
      date: { $gte: tomorrowStart, $lt: tomorrowEnd },
      status: "published"
    });

    let notificationsSent = 0;

    for (const event of eventsTomorrow) {
      // 2. Notify Attendees (Bookings)
      const attendeeBookings = await Booking.find({
        event: event._id,
        paymentStatus: "completed"
      });

      for (const booking of attendeeBookings) {
        await createNotification(booking.user.toString(), {
          title: "Event Reminder!",
          message: `Get ready! "${event.title}" is happening tomorrow at ${event.locationName || 'the venue'}.`,
          type: "info",
          link: `/events/${event._id}`
        });
        notificationsSent++;
      }

      // 3. Notify Staff
      for (const role of event.staffRolesNeeded) {
        for (const staffId of role.assignedStaff) {
          await createNotification(staffId.toString(), {
            title: "Upcoming Shift Reminder",
            message: `You have an assigned shift for "${event.title}" tomorrow. Please check the schedule.`,
            type: "warning",
            link: "/staff/jobs"
          });
          notificationsSent++;
        }
      }
    }

    return NextResponse.json({ 
      ok: true, 
      eventsChecked: eventsTomorrow.length, 
      notificationsSent 
    });
  } catch (error: any) {
    console.error("Cron Error:", error);
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
