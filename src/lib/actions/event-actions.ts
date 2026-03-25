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

    // Build the ticketTypes array from wizard data
    const ticketTypes =
      data.accessModel === "free"
        ? [{ name: "General Admission", price: 0, quantity: parseInt(data.totalQuantity, 10) || 0 }]
        : [{ name: "Standard", price: parseFloat(data.ticketPrice) || 0, quantity: parseInt(data.totalQuantity, 10) || 0 }];

    const eventData = {
      title: data.title,
      description: data.description,
      imageUrl: data.bannerImage ?? null,
      category: data.category,
      date: new Date(data.date),
      locationName: "TBD",
      location: {
        type: "Point" as const,
        address: "TBD",
        coordinates: [0, 0],
      },
      accessModel: data.accessModel,
      ticketTypes,
      pricingStrategy: data.pricingStrategy,
      taxInclusive: data.taxInclusive,
      showFeeBreakdown: data.showFeeBreakdown,
      staffRolesNeeded: data.staffRoles.map((role) => ({
        roleName: role.name,
        count: role.headcount,
        assignedStaff: [],
      })),
      status: "published" as const,
      isFeatured: false,
    };

    const newEvent = new Event(eventData);
    const savedEvent = await newEvent.save();

    revalidatePath("/admin/events");
    revalidatePath("/");

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

export async function updateEvent(id: string, data: WizardData) {
  try {
    await dbConnect();

    const ticketTypes =
      data.accessModel === "free"
        ? [{ name: "General Admission", price: 0, quantity: parseInt(data.totalQuantity, 10) || 0 }]
        : [{ name: "Standard", price: parseFloat(data.ticketPrice) || 0, quantity: parseInt(data.totalQuantity, 10) || 0 }];

    const updateData = {
      title: data.title,
      description: data.description,
      imageUrl: data.bannerImage ?? null,
      category: data.category,
      date: new Date(data.date),
      accessModel: data.accessModel,
      ticketTypes,
      pricingStrategy: data.pricingStrategy,
      taxInclusive: data.taxInclusive,
      showFeeBreakdown: data.showFeeBreakdown,
      staffRolesNeeded: data.staffRoles.map((role) => ({
        roleName: role.name,
        count: role.headcount,
      })),
    };

    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );

    if (!updatedEvent) {
      return { success: false, message: "Event not found" };
    }

    revalidatePath("/admin/events");
    revalidatePath(`/admin/events/${id}`);
    revalidatePath("/");

    return {
      success: true,
      message: "Event updated successfully!",
    };
  } catch (error: any) {
    console.error("Failed to update event:", error);
    return {
      success: false,
      message: error.message || "Failed to update event.",
    };
  }
}

export async function getStaffOpportunities(filters?: { dateRange?: string; expertise?: string }) {
  try {
    await dbConnect();
    
    const query: any = { status: 'published' };
    
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
      const openRoles = (event.staffRolesNeeded || []).filter((role: any) => 
        (role.assignedStaff?.length || 0) < role.count
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
    
    const query: any = {};
    
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
      
      const totalTickets = (event.ticketTypes || []).reduce((acc: number, type: any) => acc + (type.quantity || 0), 0);
      
      const staffFilled = (event.staffRolesNeeded || []).reduce((acc: number, role: any) => acc + (role.assignedStaff?.length || 0), 0);
      const totalStaff = (event.staffRolesNeeded || []).reduce((acc: number, role: any) => acc + (role.count || 0), 0);

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
      const totalTickets = (event.ticketTypes || []).reduce((acc: number, type: any) => acc + (type.quantity || 0), 0);
      
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

export async function getEventById(id: string) {
  try {
    await dbConnect();
    const event = await Event.findById(id).lean();
    if (!event) return { success: false, error: "Event not found" };

    return {
      success: true,
      data: JSON.parse(JSON.stringify(event))
    };
  } catch (error: any) {
    console.error("Error fetching event by ID:", error);
    return { success: false, error: error.message || "Failed to fetch event" };
  }
}
