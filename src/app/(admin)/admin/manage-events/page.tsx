import { getAdminEvents } from "@/lib/actions/event-actions";
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
    page: params.page ? parseInt(params.page, 10) : 1
  };

  const result = (await getAdminEvents(filters)) as any;
  
  const initialData = {
    events: result.success ? result.data : [],
    total: result.success ? result.total : 0,
    page: result.success ? result.page : 1,
    pages: result.success ? result.pages : 1,
  };

  return (
    <Suspense fallback={<div className="p-10 animate-pulse">Loading events...</div>}>
      <AdminEventsClient initialData={initialData} />
    </Suspense>
  );
}
