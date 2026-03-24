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

function JobFeedSkeleton() {
  return (
    <div className="grid gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="bg-surface-container-lowest rounded-2xl p-6 flex gap-5 border border-outline-variant/10 animate-pulse">
          <div className="w-24 h-24 rounded-xl bg-surface-container-high flex-shrink-0" />
          <div className="flex-1 space-y-3">
            <div className="h-5 w-2/3 bg-surface-container-high rounded" />
            <div className="flex gap-2">
              <div className="h-4 w-20 bg-surface-container-high/70 rounded-full" />
              <div className="h-4 w-28 bg-surface-container-high/70 rounded-full" />
            </div>
            <div className="flex gap-2">
              {Array.from({ length: 3 }).map((_, j) => (
                <div key={j} className="h-6 w-16 rounded-full bg-surface-container-high" />
              ))}
            </div>
          </div>
          <div className="h-10 w-28 rounded-xl bg-surface-container-high self-center" />
        </div>
      ))}
    </div>
  );
}

export default async function JobsPage({ searchParams }: JobsPageProps) {
  const params = await searchParams;
  const result = await getStaffOpportunities(params);
  const opportunities = result.success ? result.data : [];

  return (
    <div className="max-w-5xl mx-auto px-8 py-8 animate-in fade-in duration-500">
      <Suspense fallback={
        <div className="mb-10 space-y-4 animate-pulse">
          <div className="h-9 w-52 bg-surface-container-high rounded-xl" />
          <div className="h-14 rounded-xl bg-surface-container-low" />
        </div>
      }>
        <QuickFilterBar />
      </Suspense>

      <Suspense fallback={<JobFeedSkeleton />}>
        <JobsFeed initialOpportunities={opportunities} />
      </Suspense>
    </div>
  );
}

