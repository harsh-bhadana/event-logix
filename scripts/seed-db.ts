import "./load-env";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dbConnect from "../src/lib/mongodb";
import User from "../src/models/User";
import Event from "../src/models/Event";
import Booking from "../src/models/Booking";

export async function seedDatabase() {
  console.log("Connecting to database...");
  await dbConnect();
  console.log("Connected to MongoDB.");

  const testEmails = [
    "admin@eventlogix.com",
    "staff@eventlogix.com",
    "unverified-staff@eventlogix.com",
    "guest@eventlogix.com",
  ];

  console.log("Cleaning up existing test data...");

  // 1. Delete test users
  const deleteUsersResult = await User.deleteMany({ email: { $in: testEmails } });
  console.log(`Deleted ${deleteUsersResult.deletedCount} existing test users.`);

  // 2. Delete test events (titles starting with [TEST])
  const testEvents = await Event.find({ title: /^\[TEST\]/ });
  const testEventIds = testEvents.map((e) => e._id);
  const deleteEventsResult = await Event.deleteMany({ _id: { $in: testEventIds } });
  console.log(`Deleted ${deleteEventsResult.deletedCount} existing test events.`);

  // 3. Delete related bookings
  if (testEventIds.length > 0) {
    const deleteBookingsResult = await Booking.deleteMany({ event: { $in: testEventIds } });
    console.log(`Deleted ${deleteBookingsResult.deletedCount} bookings related to test events.`);
  }

  // Create Users
  const passwordHash = await bcrypt.hash("password123", 10);

  console.log("Seeding test users...");

  // Admin
  const admin = await User.create({
    name: "System Admin",
    email: "admin@eventlogix.com",
    password: passwordHash,
    role: "admin",
  });
  console.log(`Created Admin user: ${admin.email} (${admin._id})`);

  // Verified Staff
  const staff = await User.create({
    name: "Verified Staff",
    email: "staff@eventlogix.com",
    password: passwordHash,
    role: "staff",
    staffProfile: {
      skills: ["Customer Service", "AV Setup", "Crowd Control"],
      isVerified: true,
      onboardingStatus: "approved",
      availability: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: true,
      },
    },
  });
  console.log(`Created Verified Staff user: ${staff.email} (${staff._id})`);

  // Unverified Staff
  const unverifiedStaff = await User.create({
    name: "Onboarding Staff",
    email: "unverified-staff@eventlogix.com",
    password: passwordHash,
    role: "staff",
    staffProfile: {
      skills: ["Security"],
      isVerified: false,
      onboardingStatus: "pending",
      availability: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: false,
        sunday: false,
      },
    },
  });
  console.log(`Created Unverified Staff user: ${unverifiedStaff.email} (${unverifiedStaff._id})`);

  // Guest / Attendee
  const guest = await User.create({
    name: "Regular Guest",
    email: "guest@eventlogix.com",
    password: passwordHash,
    role: "public",
  });
  console.log(`Created Guest user: ${guest.email} (${guest._id})`);

  console.log("Seeding test events...");

  // Event 1: Paid Event
  const paidEvent = await Event.create({
    title: "[TEST] Tech Summit 2026",
    description:
      "Annual tech summit for developers and designers, featuring keynote speeches and workshops.",
    category: "Technology",
    date: new Date("2026-10-15T09:00:00Z"),
    locationName: "San Francisco Convention Center",
    location: {
      type: "Point",
      address: "800 Howard St, San Francisco, CA 94103",
      coordinates: [-122.4014, 37.7841],
    },
    accessModel: "paid",
    ticketTypes: [
      { name: "Standard", price: 50, quantity: 100 },
      { name: "VIP", price: 150, quantity: 20 },
    ],
    pricingStrategy: "standard",
    taxInclusive: true,
    showFeeBreakdown: true,
    staffRolesNeeded: [
      { roleName: "AV Tech", count: 1, assignedStaff: [] },
      { roleName: "Host", count: 2, assignedStaff: [] },
    ],
    status: "published",
    isFeatured: true,
    createdBy: admin._id,
  });
  console.log(`Created Paid Event: ${paidEvent.title} (${paidEvent._id})`);

  // Event 2: Free Event
  const freeEvent = await Event.create({
    title: "[TEST] Community Hackathon 2026",
    description:
      "A collaborative 24-hour programming challenge aimed at building open source civic software.",
    category: "Technology",
    date: new Date("2026-11-20T10:00:00Z"),
    locationName: "Community Library Hall",
    location: {
      type: "Point",
      address: "100 Library Way, San Francisco, CA 94102",
      coordinates: [-122.4167, 37.7794],
    },
    accessModel: "free",
    ticketTypes: [{ name: "General Admission", price: 0, quantity: 200 }],
    pricingStrategy: "standard",
    taxInclusive: true,
    showFeeBreakdown: false,
    staffRolesNeeded: [{ roleName: "Security", count: 1, assignedStaff: [] }],
    status: "published",
    isFeatured: false,
    createdBy: admin._id,
  });
  console.log(`Created Free Event: ${freeEvent.title} (${freeEvent._id})`);

  console.log("Seeding complete!");
}

if (
  typeof process !== "undefined" &&
  process.argv[1] &&
  (process.argv[1].endsWith("seed-db.ts") ||
    process.argv[1].endsWith("seed-db.js") ||
    process.argv[1].endsWith("seed-db"))
) {
  seedDatabase()
    .then(() => {
      mongoose.connection.close();
      process.exit(0);
    })
    .catch((err) => {
      console.error("Error seeding database:", err);
      mongoose.connection.close();
      process.exit(1);
    });
}
