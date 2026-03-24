// Next.js shows this while /events/[id]/page.tsx is loading
import { Spinner } from "@/components/ui/Loader";

export default function EventDetailsLoading() {
  return (
    <div className="bg-surface font-body text-on-surface">
      {/* Hero skeleton */}
      <div className="relative h-[614px] w-full bg-surface-container-high animate-pulse" />

      <div className="max-w-[1440px] mx-auto px-10 py-20 flex flex-col lg:flex-row gap-16">
        {/* Left column */}
        <div className="flex-1 space-y-16">
          {/* About */}
          <div className="space-y-4">
            <div className="h-8 w-48 bg-surface-container-high rounded-xl animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 bg-surface-container-high rounded animate-pulse" />
              <div className="h-4 bg-surface-container-high rounded animate-pulse w-5/6" />
              <div className="h-4 bg-surface-container-high rounded animate-pulse w-4/6" />
            </div>
          </div>
          {/* Who attends */}
          <div className="space-y-4">
            <div className="h-7 w-44 bg-surface-container-high rounded-xl animate-pulse" />
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-24 rounded-xl bg-surface-container-high animate-pulse" />
              ))}
            </div>
          </div>
          {/* Lineup */}
          <div className="space-y-4">
            <div className="h-7 w-36 bg-surface-container-high rounded-xl animate-pulse" />
            <div className="grid grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="aspect-square rounded-xl bg-surface-container-high animate-pulse" />
                  <div className="h-4 w-24 bg-surface-container-high rounded animate-pulse" />
                  <div className="h-3 w-16 bg-surface-container-high/60 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column: booking card */}
        <div className="lg:w-[420px]">
          <div className="sticky top-28 space-y-6">
            <div className="rounded-2xl bg-surface-container-low animate-pulse h-96" />
            <div className="rounded-xl bg-error-container/10 animate-pulse h-20" />
          </div>
        </div>
      </div>
    </div>
  );
}
