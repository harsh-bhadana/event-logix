import { getStaffOpportunities } from "@/lib/actions/event-actions";
import { QuickFilterBar } from "@/components/staff/QuickFilterBar";
import { JobsFeed } from "@/components/staff/JobsFeed";
import { Suspense } from "react";

interface JobsPageProps {
  searchParams: Promise<{
    dateRange?: string;
    expertise?: string;
  }>;
}

export default async function JobsPage({ searchParams }: JobsPageProps) {
  const params = await searchParams;
  const result = await getStaffOpportunities(params);
  
  const opportunities = result.success ? result.data : [];

  return (
    <div className="max-w-5xl mx-auto px-8 py-8 animate-in fade-in duration-500">
      <Suspense fallback={<div className="animate-pulse">Loading filters...</div>}>
        <QuickFilterBar />
      </Suspense>
      
      <Suspense fallback={<div className="animate-pulse">Loading opportunities...</div>}>
        <JobsFeed initialOpportunities={opportunities} />
      </Suspense>
    </div>
  );
}
