import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getAdminAnalytics } from '../analytics-actions';
import Event from '@/models/Event';
import Booking from '@/models/Booking';
import User from '@/models/User';

// Mock the models
vi.mock('@/models/Event');
vi.mock('@/models/Booking');
vi.mock('@/models/User');
vi.mock('@/lib/mongodb', () => ({
  default: vi.fn().mockResolvedValue(true)
}));

describe('getAdminAnalytics', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return aggregated metrics for the admin dashboard', async () => {
    // Mock Booking.find() to return revenue data
    (Booking.find as any).mockReturnValue({
      lean: vi.fn().mockResolvedValue([
        { totalPrice: 100, paymentStatus: 'completed' },
        { totalPrice: 50, paymentStatus: 'completed' }
      ])
    });

    // Mock Event.countDocuments()
    (Event.countDocuments as any).mockResolvedValue(10);
    
    // Mock User.countDocuments() for staff
    (User.countDocuments as any).mockResolvedValue(25);

    const result = await getAdminAnalytics();

    expect(result.success).toBe(true);
    expect(result.data.totalRevenue).toBe(150);
    expect(result.data.eventsCount).toBe(10);
    expect(result.data.staffCount).toBe(25);
    expect(result.data.ticketsSold).toBe(2);
  });
});
