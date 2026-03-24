// Next.js shows this while /admin/staff/applications/page.tsx is loading

export default function StaffApplicationsLoading() {
  return (
    <div className="px-10 py-10">
      <div className="mb-10 space-y-2">
        <div className="h-10 w-56 bg-surface-container-high rounded-xl animate-pulse" />
        <div className="h-4 w-80 bg-surface-container-high/60 rounded animate-pulse" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white rounded-[2.5rem] p-8 space-y-6 border border-outline-variant/5 animate-pulse">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-surface-container-high" />
              <div className="space-y-2 flex-1">
                <div className="h-5 w-32 bg-surface-container-high rounded" />
                <div className="h-3 w-24 bg-surface-container-high/60 rounded" />
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex gap-2">
                {Array.from({ length: 3 }).map((_, j) => (
                  <div key={j} className="h-6 w-16 rounded-lg bg-surface-container-high" />
                ))}
              </div>
              <div className="space-y-1">
                <div className="h-3 bg-surface-container-high rounded w-full" />
                <div className="h-3 bg-surface-container-high rounded w-4/5" />
                <div className="h-3 bg-surface-container-high rounded w-3/5" />
              </div>
            </div>
            <div className="flex gap-3 pt-2 border-t border-outline-variant/5">
              <div className="flex-1 h-12 rounded-2xl bg-primary/20" />
              <div className="w-20 h-12 rounded-2xl bg-surface-container-high" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
