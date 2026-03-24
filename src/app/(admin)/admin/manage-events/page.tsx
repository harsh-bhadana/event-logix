import { getAdminEvents } from "@/lib/actions/event-actions";
import { getAdminInsights } from "@/lib/actions/booking-actions";
import { AdminEventsClient } from "@/components/admin/AdminEventsClient";
import { Suspense } from "react";

interface ManageEventsPageProps {
  searchParams: Promise<{
    search?: string;
    status?: string;
    page?: string;
  }>;
}

export default async function ManageEventsPage({ searchParams }: ManageEventsPageProps) {
  const params = await searchParams;

  const filters = {
    search: params.search,
    status: params.status,
    page: params.page ? parseInt(params.page, 10) : 1,
  };

  const [result, insightsResult] = await Promise.all([
    getAdminEvents(filters) as any,
    getAdminInsights(),
  ]);

  const initialData = {
    events: result.success ? result.data : [],
    total: result.success ? result.total : 0,
    page: result.success ? result.page : 1,
    pages: result.success ? result.pages : 1,
  };

  const insights = insightsResult.success ? insightsResult.data : null;

  return (
    <Suspense fallback={<div className="p-10 animate-pulse">Loading events...</div>}>
      <AdminEventsClient initialData={initialData} insights={insights} />
    </Suspense>
  );
}
