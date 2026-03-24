import mongoose from "mongoose";
import User from "./src/models/User";
import Event from "./src/models/Event";
import Booking from "./src/models/Booking";

async function verifyModels() {
  console.log("Checking User model...");
  console.log("User paths:", Object.keys(User.schema.paths));
  
  console.log("\nChecking Event model...");
  console.log("Event paths:", Object.keys(Event.schema.paths));
  
  console.log("\nChecking Booking model...");
  console.log("Booking paths:", Object.keys(Booking.schema.paths));
  
  console.log("\nVerifying references...");
  const eventRefCreatedBy = Event.schema.path('createdBy');
  console.log("Event.createdBy ref:", (eventRefCreatedBy as any).options.ref);
  
  const bookingRefEvent = Booking.schema.path('event');
  const bookingRefUser = Booking.schema.path('user');
  console.log("Booking.event ref:", (bookingRefEvent as any).options.ref);
  console.log("Booking.user ref:", (bookingRefUser as any).options.ref);
  
  const staffRef = Event.schema.path('staffRolesNeeded').schema.path('assignedStaff');
  console.log("Event.staffRolesNeeded.assignedStaff ref:", (staffRef as any).options.type[0].ref);
}

// Note: This script won't run directly due to imports and lack of DB connection, 
// but it's a way to verify the code statically.
// I'll use ts-node or just check the code content.
verifyModels().catch(console.error);
