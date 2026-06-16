import { describe, it, expect, vi, beforeEach } from "vitest";
import User from "@/models/User";
import Event from "@/models/Event";
import Booking from "@/models/Booking";
import { bookTicket, completeBookingPayment, getAdminInsights } from "../booking-actions";
import { publishEvent } from "../event-actions";
import { updateStaffStatus, getStaffApplications } from "../staff-actions";

// Mock the models
vi.mock("@/models/User");
vi.mock("@/models/Event");
vi.mock("@/models/Booking");
vi.mock("@/models/Notification");
vi.mock("@/models/AuditLog");
vi.mock("@/lib/mongodb", () => ({
  default: vi.fn().mockResolvedValue(true),
}));

// Mock action side-effects to isolate unit tests
vi.mock("@/lib/actions/notification-actions", () => ({
  createNotification: vi.fn().mockResolvedValue({ success: true }),
  getNotifications: vi.fn().mockResolvedValue([]),
  markAsRead: vi.fn().mockResolvedValue({ success: true }),
  markAllAsRead: vi.fn().mockResolvedValue({ success: true }),
}));

vi.mock("@/lib/actions/audit-actions", () => ({
  logAdminAction: vi.fn().mockResolvedValue({ success: true }),
}));

// Mock Next.js cache and navigation
vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));
vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

// Mock Auth session
let mockSessionUser: any = null;
vi.mock("@/lib/auth", () => ({
  getSession: vi.fn(async () => {
    if (!mockSessionUser) return null;
    return { user: mockSessionUser };
  }),
  login_session: vi.fn(),
  logout_session: vi.fn(),
}));

describe("Unit Tests: Event Logix Server Actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSessionUser = null;
  });

  describe("Admin Portal Actions", () => {
    it("should retrieve admin insights successfully", async () => {
      // Mock db returns
      (Event.countDocuments as any).mockResolvedValue(5);
      (Booking.aggregate as any).mockResolvedValue([{ total: 500, count: 10 }]);
      (User.countDocuments as any).mockResolvedValue(8);

      const result = await getAdminInsights();
      expect(result.success).toBe(true);
      expect(result.data).toEqual({
        totalEvents: 5,
        publishedEvents: 5,
        revenue: 500,
        ticketsSold: 10,
        staffCount: 8,
      });
    });

    it("should fetch pending staff applications", async () => {
      const mockApplications = [
        { _id: "staff1", name: "John Doe", email: "john@example.com", role: "staff" },
      ];
      (User.find as any).mockReturnValue({
        sort: vi.fn().mockReturnValue({
          lean: vi.fn().mockResolvedValue(mockApplications),
        }),
      });

      const result = await getStaffApplications();
      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockApplications);
    });

    it("should approve staff application and update onboarding status", async () => {
      const mockStaffUser = {
        _id: "staff1",
        name: "John Doe",
        email: "john@example.com",
        role: "staff",
        staffProfile: { onboardingStatus: "approved", isVerified: true },
      };

      (User.findByIdAndUpdate as any).mockResolvedValue(mockStaffUser);

      const result = await updateStaffStatus("staff1", "approved");
      expect(result.success).toBe(true);
      expect(result.message).toBe("Staff application approved successfully");
      expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
        "staff1",
        {
          "staffProfile.onboardingStatus": "approved",
          "staffProfile.rejectionReason": undefined,
          "staffProfile.isVerified": true,
        },
        { new: true }
      );
    });
  });

  describe("Guest / Public Actions", () => {
    it("should require login to book a ticket", async () => {
      mockSessionUser = null; // guest is logged out

      const result = await bookTicket({
        eventId: "event123",
        ticketType: "Standard",
        quantity: 1,
      });

      expect(result.success).toBe(false);
      expect(result.message).toBe("You must be logged in to book tickets.");
    });

    it("should book free tickets successfully", async () => {
      mockSessionUser = { id: "guest123", email: "guest@example.com", role: "public" };

      const mockEvent = {
        _id: "event123",
        title: "Free Workshop",
        status: "published",
        ticketTypes: [{ name: "General Admission", price: 0, quantity: 100 }],
        save: vi.fn(),
      };

      (Event.findById as any).mockResolvedValue(mockEvent);
      (Booking.countDocuments as any).mockResolvedValue(10); // 10 sold

      const mockBookingSave = vi.fn().mockResolvedValue(true);
      vi.mocked(Booking).mockImplementation(function () {
        return {
          _id: "booking123",
          save: mockBookingSave,
        } as any;
      });

      const result = await bookTicket({
        eventId: "event123",
        ticketType: "General Admission",
        quantity: 2,
      });

      expect(result.success).toBe(true);
      expect(result.isFree).toBe(true);
      expect(result.totalAmount).toBe(0);
      expect(mockBookingSave).toHaveBeenCalled();
    });

    it("should complete booking payment successfully", async () => {
      mockSessionUser = { id: "guest123", email: "guest@example.com", role: "public" };

      const mockBooking = {
        _id: "booking123",
        paymentStatus: "pending",
        save: vi.fn().mockResolvedValue(true),
      };

      (Booking.findById as any).mockResolvedValue(mockBooking);

      const result = await completeBookingPayment("booking123");
      expect(result.success).toBe(true);
      expect(mockBooking.paymentStatus).toBe("completed");
      expect(mockBooking.save).toHaveBeenCalled();
    });
  });
});
