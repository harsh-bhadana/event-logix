// Next.js automatically shows this while /events/page.tsx is loading
import { CardSkeletonGrid } from "@/components/ui/Loader";

export default function EventsLoading() {
  return (
    <div className="max-w-[1440px] mx-auto px-6 md:px-10 pt-12 pb-24">
      {/* Search bar placeholder */}
      <div className="max-w-4xl mx-auto mb-16 space-y-6">
        <div className="space-y-3">
          <div className="h-10 w-64 bg-surface-container-high rounded-full animate-pulse mx-auto" />
          <div className="h-5 w-48 bg-surface-container-high/60 rounded-full animate-pulse mx-auto" />
        </div>
        <div className="h-16 rounded-full bg-surface-container-high animate-pulse" />
        <div className="flex gap-3 justify-center flex-wrap">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-9 w-28 rounded-full bg-surface-container-high animate-pulse" />
          ))}
        </div>
      </div>
      <CardSkeletonGrid count={6} />
    </div>
  );
}
