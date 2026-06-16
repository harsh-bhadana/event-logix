import "../../../../scripts/load-env";
import { seedDatabase } from "../../../../scripts/seed-db";
import { describe, it, expect, vi, beforeAll, afterAll } from "vitest";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import Event from "@/models/Event";
import Booking from "@/models/Booking";
import Notification from "@/models/Notification";
import {
  getAdminInsights,
  bookTicket,
  completeBookingPayment,
  getUserBookings,
  applyForStaffRole,
  updateEventStatus,
} from "../booking-actions";
import { publishEvent, getStaffOpportunities } from "../event-actions";
import { updateStaffStatus, getMasterRoster, getStaffApplications } from "../staff-actions";

// Mock Next.js next/cache and next/navigation since they can't be run in Node environment
vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

// Mock the getSession helper from auth.ts
let currentSessionUser: any = null;

vi.mock("@/lib/auth", () => ({
  getSession: vi.fn(async () => {
    if (!currentSessionUser) return null;
    return { user: currentSessionUser };
  }),
  login_session: vi.fn(),
  logout_session: vi.fn(),
}));

describe("Event Logix Three-Way Flow Integration Tests", () => {
  let adminUser: any;
  let verifiedStaffUser: any;
  let unverifiedStaffUser: any;
  let guestUser: any;
  let paidEvent: any;
  let freeEvent: any;

  beforeAll(async () => {
    await dbConnect();
    await seedDatabase();

    // Retrieve seeded users
    adminUser = await User.findOne({ email: "admin@eventlogix.com" });
    verifiedStaffUser = await User.findOne({ email: "staff@eventlogix.com" });
    unverifiedStaffUser = await User.findOne({ email: "unverified-staff@eventlogix.com" });
    guestUser = await User.findOne({ email: "guest@eventlogix.com" });

    // Retrieve seeded events
    paidEvent = await Event.findOne({ title: "[TEST] Tech Summit 2026" });
    freeEvent = await Event.findOne({ title: "[TEST] Community Hackathon 2026" });

    if (
      !adminUser ||
      !verifiedStaffUser ||
      !unverifiedStaffUser ||
      !guestUser ||
      !paidEvent ||
      !freeEvent
    ) {
      throw new Error(
        "Seeded database entities not found. Please run the seeding script first: npx tsx scripts/seed-db.ts"
      );
    }
  });

  afterAll(async () => {
    // No-op, keep connections open for Mongoose or close if needed
  });

  // ==========================================
  // FLOW 1: ADMIN OPERATIONS
  // ==========================================
  describe("Flow 1: Admin Portal Actions", () => {
    it("should allow Admin to retrieve system insights", async () => {
      // Act as Admin
      currentSessionUser = {
        id: adminUser._id.toString(),
        email: adminUser.email,
        role: adminUser.role,
      };

      const result = await getAdminInsights();
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data?.totalEvents).toBeGreaterThanOrEqual(2);
    });

    it("should list pending staff applications and allow Admin to approve them", async () => {
      // Act as Admin
      currentSessionUser = {
        id: adminUser._id.toString(),
        email: adminUser.email,
        role: adminUser.role,
      };

      // 1. Get staff applications list
      const appsResult = await getStaffApplications();
      expect(appsResult.success).toBe(true);
      const pendingApp = appsResult.data.find(
        (app: any) => app.email === "unverified-staff@eventlogix.com"
      );
      expect(pendingApp).toBeDefined();

      // 2. Approve the onboarding staff
      const approvalResult = await updateStaffStatus(pendingApp._id, "approved");
      expect(approvalResult.success).toBe(true);

      // Verify that user state is updated in the database
      const updatedUser = await User.findById(pendingApp._id);
      expect(updatedUser?.staffProfile?.onboardingStatus).toBe("approved");
      expect(updatedUser?.staffProfile?.isVerified).toBe(true);
    });

    it("should allow Admin to update an event status (e.g. publish, cancel, archive)", async () => {
      // Act as Admin
      currentSessionUser = {
        id: adminUser._id.toString(),
        email: adminUser.email,
        role: adminUser.role,
      };

      // Change status to draft and then back to published
      const draftResult = await updateEventStatus(paidEvent._id.toString(), "draft");
      expect(draftResult.success).toBe(true);

      let updatedEvent = await Event.findById(paidEvent._id);
      expect(updatedEvent?.status).toBe("draft");

      const publishResult = await updateEventStatus(paidEvent._id.toString(), "published");
      expect(publishResult.success).toBe(true);

      updatedEvent = await Event.findById(paidEvent._id);
      expect(updatedEvent?.status).toBe("published");
    });
  });

  // ==========================================
  // FLOW 2: STAFF OPERATIONS
  // ==========================================
  describe("Flow 2: Staff Portal Actions", () => {
    it("should allow approved staff to see opportunities and apply for roles", async () => {
      // Act as the verified staff
      currentSessionUser = {
        id: verifiedStaffUser._id.toString(),
        email: verifiedStaffUser.email,
        role: verifiedStaffUser.role,
        onboardingStatus: verifiedStaffUser.staffProfile.onboardingStatus,
        isVerified: verifiedStaffUser.staffProfile.isVerified,
      };

      // 1. View staff opportunities
      const oppsResult = await getStaffOpportunities();
      expect(oppsResult.success).toBe(true);
      expect(oppsResult.data.length).toBeGreaterThanOrEqual(1);

      // Find the paid event in opportunities
      const eventOpp = oppsResult.data.find((e: any) => e._id === paidEvent._id.toString());
      expect(eventOpp).toBeDefined();

      // Find an open staff role (e.g., Host or AV Tech)
      const roleToApply = eventOpp.staffRolesNeeded[0].roleName;

      // 2. Apply for that role
      const applyResult = await applyForStaffRole({
        eventId: paidEvent._id.toString(),
        roleName: roleToApply,
      });
      expect(applyResult.success).toBe(true);

      // Verify that staff is assigned to the event role in the database
      const updatedEvent = await Event.findById(paidEvent._id);
      const roleDetails = updatedEvent?.staffRolesNeeded.find(
        (r: any) => r.roleName === roleToApply
      );
      expect(roleDetails?.assignedStaff.map((id: any) => id.toString())).toContain(
        verifiedStaffUser._id.toString()
      );
    });
  });

  // ==========================================
  // FLOW 3: GUEST / PUBLIC OPERATIONS
  // ==========================================
  describe("Flow 3: Guest Portal Actions", () => {
    it("should allow guest to book a ticket and make payment", async () => {
      // Act as the public guest
      currentSessionUser = {
        id: guestUser._id.toString(),
        email: guestUser.email,
        role: guestUser.role,
      };

      // 1. Book a ticket for the paid event
      const bookingResult = await bookTicket({
        eventId: paidEvent._id.toString(),
        ticketType: "Standard",
        quantity: 2,
        attendeeInfo: {
          name: "Regular Guest",
          email: "guest@eventlogix.com",
          phone: "1234567890",
        },
      });

      expect(bookingResult.success).toBe(true);
      expect(bookingResult.bookingId).toBeDefined();
      expect(bookingResult.totalAmount).toBe(100); // 2 * $50
      expect(bookingResult.isFree).toBe(false);

      // Verify booking status is pending in DB
      let bookingInDb = await Booking.findById(bookingResult.bookingId);
      expect(bookingInDb?.paymentStatus).toBe("pending");

      // 2. Complete payment
      const paymentResult = await completeBookingPayment(bookingResult.bookingId!);
      expect(paymentResult.success).toBe(true);

      // Verify booking status is completed in DB
      bookingInDb = await Booking.findById(bookingResult.bookingId);
      expect(bookingInDb?.paymentStatus).toBe("completed");
      expect(bookingInDb?.paymentId).toBeDefined();

      // 3. Retrieve guest bookings
      const myBookingsResult = await getUserBookings();
      expect(myBookingsResult.success).toBe(true);
      expect(myBookingsResult.bookings.length).toBeGreaterThanOrEqual(1);
      const myBooking = myBookingsResult.bookings.find(
        (b: any) => b._id === bookingResult.bookingId
      );
      expect(myBooking).toBeDefined();
    });
  });
});
