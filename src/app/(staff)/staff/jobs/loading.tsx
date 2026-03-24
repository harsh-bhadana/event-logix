// Next.js shows this while /staff/jobs/page.tsx is loading

export default function JobsLoading() {
  return (
    <div className="max-w-5xl mx-auto px-8 py-8">
      {/* QuickFilterBar skeleton */}
      <div className="mb-10 space-y-4">
        <div className="h-9 w-52 bg-surface-container-high rounded-xl animate-pulse" />
        <div className="h-14 rounded-xl bg-surface-container-low animate-pulse" />
      </div>

      {/* Job card skeletons */}
      <div className="grid gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="bg-surface-container-lowest rounded-2xl p-6 flex gap-5 border border-outline-variant/10 animate-pulse"
          >
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
            <div className="flex flex-col gap-2 items-end justify-between">
              <div className="h-6 w-20 rounded-lg bg-primary/20" />
              <div className="h-10 w-28 rounded-xl bg-surface-container-high" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
