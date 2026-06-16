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
    // Mock Booking.aggregate using a pipeline inspector
    (Booking.aggregate as any).mockImplementation((pipeline: any[]) => {
      // 1. Total Revenue Query
      if (pipeline.some(stage => stage.$group && stage.$group.total && stage.$group.total.$sum === "$totalAmount")) {
        return Promise.resolve([{ total: 150 }]);
      }
      // 2. Tickets Sold Query
      if (pipeline.some(stage => stage.$group && stage.$group.total && stage.$group.total.$sum === "$quantity")) {
        return Promise.resolve([{ total: 2 }]);
      }
      // 3. Daily Revenue Trend Query
      if (pipeline.some(stage => stage.$group && stage.$group._id && stage.$group._id.$dateToString)) {
        return Promise.resolve([
          { _id: '2026-06-16', revenue: 150 }
        ]);
      }
      // 4. Category Sales Query
      if (pipeline.some(stage => stage.$lookup)) {
        return Promise.resolve([
          { name: 'Corporate Strategy', value: 2 }
        ]);
      }
      return Promise.resolve([]);
    });

    // Mock Event.countDocuments()
    (Event.countDocuments as any).mockResolvedValue(10);
    
    // Mock User.countDocuments() for staff
    (User.countDocuments as any).mockResolvedValue(25);

    const result = await getAdminAnalytics();

    expect(result.success).toBe(true);
    expect(result.data?.totalRevenue).toBe(150);
    expect(result.data?.eventsCount).toBe(10);
    expect(result.data?.staffCount).toBe(25);
    expect(result.data?.ticketsSold).toBe(2);
    expect(result.data?.revenueTrend).toHaveLength(1);
    expect(result.data?.categorySales).toHaveLength(1);
  });
});
