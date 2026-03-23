"use server";
import dbConnect from "@/lib/mongodb";
import Event from "@/models/Event";
import { WizardData } from "@/hooks/useEventWizard";
import { revalidatePath } from "next/cache";

export async function publishEvent(data: WizardData) {
  try {
    console.log("Publishing event to MongoDB:", data.title);
    await dbConnect();
    
    const newEvent = new Event(data);
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
