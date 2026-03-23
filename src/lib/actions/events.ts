"use server";

import dbConnect from "@/lib/mongodb";
import Event, { IEvent } from "@/models/Event";

export async function createEvent(data: Partial<IEvent>) {
  try {
    await dbConnect();

    const newEvent = new Event(data);
    const savedEvent = await newEvent.save();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(savedEvent)),
    };
  } catch (error: any) {
    console.error("Error creating event:", error);
    return {
      success: false,
      error: error.message || "Failed to create event",
    };
  }
}
