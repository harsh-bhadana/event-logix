"use server";

import { WizardData } from "@/hooks/useEventWizard";

export async function publishEvent(data: WizardData) {
  console.log("Publishing event:", data);
  
  // Simulate database delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return {
    success: true,
    message: "Event published successfully!",
    eventId: "evt_" + Math.random().toString(36).substr(2, 9),
  };
}
