"use server";
import dbConnect from "@/lib/mongodb";
import Event from "@/models/Event";
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
