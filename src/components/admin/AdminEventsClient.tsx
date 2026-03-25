'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce"; // I'll check if this exists or create it
import { EventsTable } from "./EventsTable";
import Link from "next/link";

interface Insights {
  totalEvents: number;
  publishedEvents: number;
  revenue: number;
  ticketsSold: number;
  staffCount: number;
}

interface AdminEventsClientProps {
  initialData: {
    events: any[];
    total: number;
    page: number;
    pages: number;
  };
  insights?: Insights | null;
}

export function AdminEventsClient({ initialData, insights }: AdminEventsClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [status, setStatus] = useState(searchParams.get('status') || 'All Events');

  const updateFilters = (newParams: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    // Reset to page 1 on filter change
    if (!newParams.page) params.set('page', '1');
    router.push(`?${params.toString()}`);
  };

  // Handle search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (search !== (searchParams.get('search') || '')) {
        updateFilters({ search });
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const tabs = ['All Events', 'Draft', 'Published', 'Completed', 'Cancelled'];

  return (
    <div className="px-10 py-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tighter text-on-surface font-headline">Event Management</h1>
          <p className="mt-2 text-on-surface-variant font-medium font-body">{initialData.total} Total Events in your active ledger</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative w-full sm:w-80 group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-surface-container-highest border-none rounded-xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-on-surface-variant/60 font-body" 
              placeholder="Search events, venues, or staff..." 
            />
          </div>
          <Link 
            href="/admin/events/new"
            className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dim text-on-primary px-6 py-3 rounded-xl font-bold text-sm shadow-[0_10px_20px_rgba(41,105,91,0.15)] active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-lg">add_circle</span>
            Create New Event
          </Link>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-surface-container-low/50 p-1.5 rounded-2xl backdrop-blur-sm">
        <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setStatus(tab);
                updateFilters({ status: tab });
              }}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                status === tab 
                  ? "bg-surface-container-lowest text-primary shadow-sm" 
                  : "text-on-surface-variant hover:bg-surface-container-lowest/50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="h-8 w-[1px] bg-outline-variant opacity-20 hidden sm:block"></div>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container-lowest border-none text-sm font-medium text-on-surface shadow-sm hover:bg-surface-bright transition-all w-full sm:w-auto justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-lg text-on-surface-variant">calendar_month</span>
              <span>Date Range</span>
            </div>
            <span className="material-symbols-outlined text-lg text-on-surface-variant">expand_more</span>
          </button>
        </div>
      </div>

      {/* Table Section */}
      <EventsTable 
        events={initialData.events} 
        total={initialData.total} 
        page={initialData.page} 
        pages={initialData.pages} 
      />

      {/* Quick Insights Footer Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <div className="p-6 rounded-3xl bg-surface-container-low/40">
          <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-4">Total Revenue</p>
          <h3 className="text-3xl font-black text-on-surface tracking-tighter font-headline">
            {insights ? `$${insights.revenue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "—"}
          </h3>
          <div className="mt-4 inline-flex items-center gap-1.5 px-2 py-1 rounded bg-tertiary-container text-on-tertiary-container text-[10px] font-bold">
            <span className="material-symbols-outlined text-xs">payments</span>
            {insights ? `${insights.ticketsSold} tickets sold` : "No data yet"}
          </div>
        </div>
        <div className="p-6 rounded-3xl bg-surface-container-low/40">
          <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-4">Published Events</p>
          <h3 className="text-3xl font-black text-on-surface tracking-tighter font-headline">
            {insights ? `${insights.publishedEvents} / ${insights.totalEvents}` : "—"}
          </h3>
          <div className="mt-4 inline-flex items-center gap-1.5 px-2 py-1 rounded bg-primary-container text-on-primary-container text-[10px] font-bold">
            <span className="material-symbols-outlined text-xs">event</span>
            Live on platform
          </div>
        </div>
        <div className="p-6 rounded-3xl bg-surface-container-low/40">
          <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-4">Verified Staff</p>
          <h3 className="text-3xl font-black text-on-surface tracking-tighter font-headline">
            {insights ? insights.staffCount : "—"}
          </h3>
          <div className="mt-4 inline-flex items-center gap-1.5 px-2 py-1 rounded bg-surface-container-highest text-on-surface-variant text-[10px] font-bold">
            <span className="material-symbols-outlined text-xs">badge</span>
            Approved providers
          </div>
        </div>
      </div>
    </div>
  );
}
