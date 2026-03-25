'use server';

import dbConnect from "@/lib/mongodb";
import Event from "@/models/Event";
import Booking from "@/models/Booking";
import User from "@/models/User";

export async function getAdminAnalytics() {
  try {
    await dbConnect();

    // 1. Calculate Revenue (Completed bookings)
    const bookings = await Booking.find({ paymentStatus: 'completed' }).lean();
    const totalRevenue = (bookings || []).reduce((sum: number, b: any) => sum + (b.totalPrice || 0), 0);
    const ticketsSold = bookings.length;

    // 2. Count Events
    const eventsCount = await Event.countDocuments();

    // 3. Count Staff (Active/Verified)
    const staffCount = await User.countDocuments({ role: 'staff', 'staffProfile.onboardingStatus': 'approved' });

    return {
      success: true,
      data: {
        totalRevenue,
        eventsCount,
        staffCount,
        ticketsSold,
        // Mock data for trends for now
        revenueTrend: [
          { name: 'Jan', value: 4000 },
          { name: 'Feb', value: 3000 },
          { name: 'Mar', value: 2000 },
          { name: 'Apr', value: 2780 },
          { name: 'May', value: 1890 },
          { name: 'Jun', value: 2390 },
          { name: 'Jul', value: 3490 },
        ]
      }
    };
  } catch (error: any) {
    console.error("Error fetching admin analytics:", error);
    return { success: false, error: error.message || "Failed to fetch analytics" };
  }
}
