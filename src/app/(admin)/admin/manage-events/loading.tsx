// Next.js shows this while /admin/manage-events/page.tsx is loading
import { TableRowSkeleton } from "@/components/ui/Loader";

export default function ManageEventsLoading() {
  return (
    <div className="px-10 py-10">
      {/* Page header skeleton */}
      <div className="flex justify-between items-end mb-12">
        <div className="space-y-2">
          <div className="h-10 w-64 bg-surface-container-high rounded-xl animate-pulse" />
          <div className="h-4 w-40 bg-surface-container-high/60 rounded animate-pulse" />
        </div>
        <div className="flex gap-3">
          <div className="h-12 w-64 bg-surface-container-high rounded-xl animate-pulse" />
          <div className="h-12 w-44 bg-primary/20 rounded-xl animate-pulse" />
        </div>
      </div>
      {/* Tab bar skeleton */}
      <div className="h-14 rounded-2xl bg-surface-container-low animate-pulse mb-8" />
      {/* Table rows */}
      <div className="bg-surface-container-lowest rounded-3xl overflow-hidden p-2">
        <TableRowSkeleton rows={8} />
      </div>
      {/* Insights */}
      <div className="grid grid-cols-3 gap-6 mt-12">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-32 rounded-3xl bg-surface-container-low animate-pulse" />
        ))}
      </div>
    </div>
  );
}
