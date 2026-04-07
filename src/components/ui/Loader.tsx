"use client";

import { cn } from "@/lib/cn";

// ─── Spinner ──────────────────────────────────────────────────────────────────

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Spinner({ size = "md", className }: SpinnerProps) {
  const sizeMap = { sm: "w-4 h-4 border-2", md: "w-8 h-8 border-2", lg: "w-14 h-14 border-[3px]" };
  return (
    <span
      className={cn(
        "inline-block rounded-full border-primary/20 border-t-primary animate-spin",
        sizeMap[size],
        className
      )}
      role="status"
      aria-label="Loading"
    />
  );
}

// ─── Full-page loader ─────────────────────────────────────────────────────────

interface PageLoaderProps {
  message?: string;
}

export function PageLoader({ message = "Loading…" }: PageLoaderProps) {
  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm gap-6 animate-in fade-in duration-300">
      {/* Animated logo mark */}
      <div className="relative flex items-center justify-center w-20 h-20">
        <span
          className="absolute inline-block w-20 h-20 rounded-full border-[3px] border-primary/10 border-t-primary animate-spin"
          style={{ animationDuration: "1s" }}
        />
        <span
          className="absolute inline-block w-12 h-12 rounded-full border-[3px] border-primary/15 border-b-primary animate-spin"
          style={{ animationDuration: "0.7s", animationDirection: "reverse" }}
        />
        <span className="text-primary font-black font-headline text-lg select-none">EL</span>
      </div>

      <div className="text-center space-y-1">
        <p className="text-on-surface font-bold font-headline text-base tracking-tight">{message}</p>
        <p className="text-on-surface-variant text-xs font-body">Please wait a moment</p>
      </div>
    </div>
  );
}

// ─── Card skeleton ────────────────────────────────────────────────────────────

interface SkeletonProps {
  className?: string;
}

export function Bone({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "bg-surface-container-high rounded-xl animate-pulse",
        className
      )}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-surface-container-lowest rounded-2xl overflow-hidden border border-outline-variant/10 shadow-sm">
      <Bone className="w-full h-52 rounded-none" />
      <div className="p-5 space-y-3">
        <Bone className="h-5 w-3/4" />
        <Bone className="h-4 w-1/2" />
        <div className="flex gap-2 pt-2">
          <Bone className="h-8 flex-1" />
          <Bone className="h-8 w-20" />
        </div>
      </div>
    </div>
  );
}

export function CardSkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

// ─── Event Details skeleton ──────────────────────────────────────────────────

export function EventDetailsSkeleton() {
  return (
    <div className="bg-surface animate-in fade-in duration-500">
      {/* Hero Banner Skeleton */}
      <section className="relative h-[614px] min-h-[450px] w-full bg-surface-container overflow-hidden">
        <div className="relative h-full max-w-[1440px] mx-auto px-10 flex flex-col justify-end pb-16">
          <div className="max-w-3xl space-y-6">
            <Bone className="h-6 w-32" />
            <Bone className="h-20 w-full md:w-3/4" />
            <div className="flex gap-6">
              <Bone className="h-6 w-48" />
              <Bone className="h-6 w-48" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Skeleton */}
      <div className="max-w-[1440px] mx-auto px-10 py-20 flex flex-col lg:flex-row gap-16">
        <div className="flex-1 space-y-16">
          <section className="space-y-6">
            <Bone className="h-10 w-48" />
            <div className="space-y-3">
              <Bone className="h-4 w-full" />
              <Bone className="h-4 w-full" />
              <Bone className="h-4 w-3/4" />
            </div>
          </section>
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Bone className="h-40 rounded-2xl" />
            <Bone className="h-40 rounded-2xl" />
          </section>
          <section className="space-y-8">
            <Bone className="h-10 w-48" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Bone className="aspect-square rounded-xl" />
                  <Bone className="h-6 w-32" />
                  <Bone className="h-4 w-24" />
                </div>
              ))}
            </div>
          </section>
        </div>
        <div className="lg:w-[420px]">
          <Bone className="h-[500px] rounded-2xl sticky top-28" />
        </div>
      </div>
    </div>
  );
}

// ─── Table row skeleton ───────────────────────────────────────────────────────

export function TableRowSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-1">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-6 px-8 py-5 bg-surface-container-lowest rounded-xl animate-pulse">
          <Bone className="w-14 h-14 rounded-xl flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <Bone className="h-4 w-56" />
            <Bone className="h-3 w-32" />
          </div>
          <Bone className="h-6 w-20 rounded-full" />
          <Bone className="h-6 w-28" />
          <Bone className="h-6 w-20 rounded-lg" />
          <Bone className="w-8 h-8 rounded-lg ml-auto" />
        </div>
      ))}
    </div>
  );
}

// ─── Inline loading bar (top progress bar) ────────────────────────────────────

export function LoadingBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[300] h-[3px] bg-primary/10">
      <div
        className="h-full bg-gradient-to-r from-primary via-primary-dim to-primary rounded-full"
        style={{
          animation: "loading-bar 1.4s ease-in-out infinite",
        }}
      />
      <style>{`
        @keyframes loading-bar {
          0%   { width: 0%;   margin-left: 0%; }
          50%  { width: 60%;  margin-left: 20%; }
          100% { width: 0%;   margin-left: 100%; }
        }
      `}</style>
    </div>
  );
}
