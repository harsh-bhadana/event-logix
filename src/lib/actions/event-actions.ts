"use server";
import dbConnect from "@/lib/mongodb";
import Event, { IEvent } from "@/models/Event";
import Booking from "@/models/Booking";
import { WizardData } from "@/hooks/useEventWizard";
import { revalidatePath } from "next/cache";

export async function publishEvent(data: WizardData) {
  try {
    console.log("Publishing event to MongoDB:", data.title);
    await dbConnect();
    
    // Transform data to match new Event schema
    const eventData = {
      ...data,
      date: new Date(data.date),
      ticketPrice: parseFloat(data.ticketPrice),
      totalQuantity: parseInt(data.totalQuantity, 10),
      staffRolesNeeded: data.staffRoles.map(role => ({
        roleName: role.name,
        count: role.headcount,
        assignedStaff: [] // Initialize empty assigned staff
      })),
      location: {
        type: 'Point',
        address: 'Offline', // Default for now
        coordinates: [0, 0] // Default for now
      },
      status: 'published' // Default to published when from wizard
    };

    // Remove old field name
    delete (eventData as any).staffRoles;

    const newEvent = new Event(eventData);
    const savedEvent = await newEvent.save();

    revalidatePath("/(admin)/manage-events");

    return {
      success: true,
      message: "Event published successfully!",
      eventId: savedEvent._id.toString(),
    };
  } catch (error: any) {
    console.error("Failed to publish event:", error);
    return {
      success: false,
      message: error.message || "Failed to publish event. Please try again.",
    };
  }
}

export async function getStaffOpportunities(filters?: { dateRange?: string; expertise?: string }) {
  try {
    await dbConnect();
    
    let query: any = { status: 'published' };
    
    const now = new Date();
    
    if (filters?.dateRange === 'This Week') {
      const endOfWeek = new Date();
      endOfWeek.setDate(now.getDate() + 7);
      query.date = { $gte: now, $lte: endOfWeek };
    } else if (filters?.dateRange === 'Next Month') {
       const startOfMonth = new Date();
       startOfMonth.setMonth(now.getMonth() + 1);
       startOfMonth.setDate(1);
       const endOfMonth = new Date(startOfMonth);
       endOfMonth.setMonth(endOfMonth.getMonth() + 1);
       endOfMonth.setDate(0);
       query.date = { $gte: startOfMonth, $lte: endOfMonth };
    }

    const events = await Event.find(query).sort({ date: 1 }).lean();
    
    // Filter events that have at least one open slot
    const opportunities = events.filter((event: any) => {
      const openRoles = event.staffRolesNeeded.filter((role: any) => 
        role.assignedStaff.length < role.count
      );
      
      if (openRoles.length === 0) return false;
      
      // Filter by expertise if provided
      if (filters?.expertise && filters.expertise !== 'All Roles') {
        const matchesExpertise = openRoles.some((role: any) => 
          role.roleName.toLowerCase().includes(filters.expertise!.toLowerCase())
        );
        if (!matchesExpertise) return false;
      }
      
      return true;
    });

    return {
      success: true,
      data: JSON.parse(JSON.stringify(opportunities)),
    };
  } catch (error: any) {
    console.error("Error fetching staff opportunities:", error);
    return { 
      success: false, 
      error: error.message || "Failed to fetch opportunities",
      data: [] 
    };
  }
}

export async function getAdminEvents(filters?: { search?: string; status?: string; page?: number }) {
  try {
    await dbConnect();
    
    let query: any = {};
    
    if (filters?.status && filters.status !== 'All Events') {
      const statusLower = filters.status.toLowerCase();
      if (['draft', 'published', 'completed', 'cancelled'].includes(statusLower)) {
        query.status = statusLower;
      }
    }
    
    if (filters?.search) {
      query.$or = [
        { title: { $regex: filters.search, $options: 'i' } },
        { locationName: { $regex: filters.search, $options: 'i' } }
      ];
    }

    const page = filters?.page || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const total = await Event.countDocuments(query);
    const events = await Event.find(query)
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Enhance events with booking data manually since we used lean()
    const enhancedEvents = await Promise.all(events.map(async (event: any) => {
      const bookingsCount = await Booking.countDocuments({ 
        event: event._id,
        paymentStatus: 'completed'
      });
      
      const totalTickets = event.ticketTypes.reduce((acc: number, type: any) => acc + (type.quantity || 0), 0);
      
      const staffFilled = event.staffRolesNeeded.reduce((acc: number, role: any) => acc + (role.assignedStaff?.length || 0), 0);
      const totalStaff = event.staffRolesNeeded.reduce((acc: number, role: any) => acc + (role.count || 0), 0);

      return {
        ...event,
        bookingsCount,
        totalTickets,
        staffFilled,
        totalStaff
      };
    }));

    return {
      success: true,
      data: JSON.parse(JSON.stringify(enhancedEvents)),
      total,
      page,
      pages: Math.ceil(total / limit)
    };
  } catch (error: any) {
    console.error("Error fetching admin events:", error);
    return { 
      success: false, 
      error: error.message || "Failed to fetch events",
      data: [],
      total: 0,
      page: 1,
      pages: 1
    };
  }
}

export async function getFeaturedEvents() {
  try {
    await dbConnect();
    const events = await Event.find({ isFeatured: true, status: 'published' })
      .sort({ date: 1 })
      .limit(6)
      .lean();
    
    // Enhance with booking and ticket info
    const enhancedEvents = await Promise.all(events.map(async (event: any) => {
      const bookingsCount = await Booking.countDocuments({ 
        event: event._id,
        paymentStatus: 'completed'
      });
      const totalTickets = event.ticketTypes.reduce((acc: number, type: any) => acc + (type.quantity || 0), 0);
      
      return {
        ...event,
        bookingsCount,
        totalTickets
      };
    }));

    return {
      success: true,
      data: JSON.parse(JSON.stringify(enhancedEvents))
    };
  } catch (error: any) {
    console.error("Error fetching featured events:", error);
    return { success: false, data: [] };
  }
}
