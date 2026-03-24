// Next.js shows this while /admin/staff/roster/page.tsx is loading
import { TableRowSkeleton } from "@/components/ui/Loader";

export default function RosterLoading() {
  return (
    <div className="px-10 py-10">
      <div className="flex justify-between items-end mb-12">
        <div className="space-y-2">
          <div className="h-10 w-48 bg-surface-container-high rounded-xl animate-pulse" />
          <div className="h-4 w-40 bg-surface-container-high/60 rounded animate-pulse" />
        </div>
        <div className="h-12 w-72 bg-surface-container-high rounded-xl animate-pulse" />
      </div>
      <div className="bg-white rounded-[3rem] overflow-hidden border border-outline-variant/10 p-2">
        <TableRowSkeleton rows={7} />
      </div>
    </div>
  );
}
