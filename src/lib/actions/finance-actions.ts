"use server";

import dbConnect from "@/lib/mongodb";
import Booking from "@/models/Booking";
import Event from "@/models/Event";
import { startOfDay, endOfDay, subDays, format, startOfMonth, endOfMonth } from "date-fns";

export async function getFinancialSummary() {
  try {
    await dbConnect();

    const allBookings = await Booking.find({ paymentStatus: "completed" }).lean();
    
    const totalRevenue = allBookings.reduce((acc: number, curr: any) => acc + (curr.totalAmount || 0), 0);
    const totalSales = allBookings.length;
    
    const averageOrderValue = totalSales > 0 ? totalRevenue / totalSales : 0;
    
    // Calculate refunds
    const refundedBookings = await Booking.find({ paymentStatus: "refunded" }).lean();
    const refundCount = refundedBookings.length;
    const refundAmount = refundedBookings.reduce((acc: number, curr: any) => acc + (curr.totalAmount || 0), 0);

    return {
      success: true,
      data: {
        totalRevenue,
        totalSales,
        averageOrderValue,
        refundCount,
        refundAmount,
      }
    };
  } catch (error: any) {
    console.error("Error fetching financial summary:", error);
    return { success: false, error: error.message };
  }
}

export async function getRevenueTrends(days = 30) {
  try {
    await dbConnect();
    const startDate = subDays(new Date(), days);

    const bookings = await Booking.find({
      paymentStatus: "completed",
      createdAt: { $gte: startDate }
    }).sort({ createdAt: 1 }).lean();

    // Group by day
    const dayMap = new Map();
    
    // Initialize map with all days in range
    for (let i = 0; i <= days; i++) {
      const d = subDays(new Date(), i);
      const dateKey = format(d, "yyyy-MM-dd");
      dayMap.set(dateKey, 0);
    }

    bookings.forEach((booking: any) => {
      const dateKey = format(new Date(booking.createdAt), "yyyy-MM-dd");
      if (dayMap.has(dateKey)) {
        dayMap.set(dateKey, dayMap.get(dateKey) + (booking.totalAmount || 0));
      }
    });

    const trendData = Array.from(dayMap.entries())
      .map(([date, amount]) => ({
        date: format(new Date(date), "MMM d"),
        revenue: amount
      }))
      .reverse();

    return { success: true, data: trendData };
  } catch (error: any) {
    console.error("Error fetching revenue trends:", error);
    return { success: false, error: error.message };
  }
}

export async function getRecentTransactions(limit = 10) {
  try {
    await dbConnect();

    const transactions = await Booking.find({})
      .populate("event", "title")
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(transactions))
    };
  } catch (error: any) {
    console.error("Error fetching recent transactions:", error);
    return { success: false, error: error.message };
  }
}
