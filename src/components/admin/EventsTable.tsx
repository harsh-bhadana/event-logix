"use client";

import { format } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { updateEventStatus, toggleEventFeatured } from "@/lib/actions/booking-actions";

interface EventRow {
  _id: string;
  title: string;
  date: Date;
  category: string;
  status: string;
  isFeatured?: boolean;
  bookingsCount: number;
  totalTickets: number;
  staffFilled: number;
  totalStaff: number;
  imageUrl?: string;
}

interface EventsTableProps {
  events: EventRow[];
  total: number;
  page: number;
  pages: number;
}

function ActionMenu({ event }: { event: EventRow }) {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function changeStatus(status: "published" | "draft" | "cancelled") {
    setPending(true);
    setOpen(false);
    await updateEventStatus(event._id, status);
    setPending(false);
    router.refresh();
  }

  async function toggleFeatured() {
    setPending(true);
    setOpen(false);
    await toggleEventFeatured(event._id, !event.isFeatured);
    setPending(false);
    router.refresh();
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        disabled={pending}
        onClick={() => setOpen((o) => !o)}
        className="p-2 rounded-lg hover:bg-surface-container text-on-surface-variant transition-colors disabled:opacity-50"
      >
        {pending ? (
          <span className="w-5 h-5 border-2 border-on-surface-variant/30 border-t-primary rounded-full animate-spin block" />
        ) : (
          <span className="material-symbols-outlined">more_vert</span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 bg-surface-container-lowest border border-outline-variant/10 rounded-xl shadow-xl z-50 min-w-48 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
          {event.status !== "published" && (
            <button
              type="button"
              onClick={() => changeStatus("published")}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-on-surface hover:bg-surface-container-low transition-colors"
            >
              <span className="material-symbols-outlined text-primary text-base">publish</span>
              Publish
            </button>
          )}
          {event.status !== "draft" && (
            <button
              type="button"
              onClick={() => changeStatus("draft")}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-on-surface hover:bg-surface-container-low transition-colors"
            >
              <span className="material-symbols-outlined text-on-surface-variant text-base">draft</span>
              Set to Draft
            </button>
          )}
          <button
            type="button"
            onClick={toggleFeatured}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-on-surface hover:bg-surface-container-low transition-colors"
          >
            <span className={`material-symbols-outlined text-base ${event.isFeatured ? "text-amber-500" : "text-on-surface-variant"}`}>
              star
            </span>
            {event.isFeatured ? "Remove from Featured" : "Mark as Featured"}
          </button>
          <Link
            href={`/admin/events/${event._id}/roster`}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-on-surface hover:bg-surface-container-low transition-colors"
          >
            <span className="material-symbols-outlined text-emerald-500 text-base">group</span>
            View Roster
          </Link>
          <Link
            href={`/admin/events/${event._id}/edit`}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-on-surface hover:bg-surface-container-low transition-colors"
          >
            <span className="material-symbols-outlined text-on-surface-variant text-base">edit</span>
            Edit Details
          </Link>
          <div className="border-t border-outline-variant/10" />
          {event.status !== "cancelled" && (
            <button
              type="button"
              onClick={() => changeStatus("cancelled")}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-error hover:bg-error/5 transition-colors"
            >
              <span className="material-symbols-outlined text-base">cancel</span>
              Cancel Event
            </button>
          )}
          {event.status !== "archived" && (
            <button
              type="button"
              onClick={() => changeStatus("archived")}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-on-surface-variant hover:bg-surface-container-low transition-colors"
            >
              <span className="material-symbols-outlined text-base">inventory_2</span>
              Archive Event
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export function EventsTable({ events, total, page, pages }: EventsTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  const statusColor = (status: string) => {
    if (status === "published") return "bg-primary-container text-on-primary-container";
    if (status === "cancelled") return "bg-error-container/30 text-error";
    return "bg-surface-container-highest text-on-surface-variant";
  };

  return (
    <div className="bg-surface-container-lowest rounded-3xl overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.02)]">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low/30">
              <th className="px-8 py-5 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">Event Info</th>
              <th className="px-6 py-5 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">Category</th>
              <th className="px-6 py-5 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">Tickets Sold</th>
              <th className="px-6 py-5 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">Staffing</th>
              <th className="px-6 py-5 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">Status</th>
              <th className="px-8 py-5 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container-low">
            {events.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-8 py-20 text-center text-on-surface-variant font-medium">
                  No events found. Create your first event!
                </td>
              </tr>
            ) : (
              events.map((event) => {
                const ticketPercent =
                  event.totalTickets > 0
                    ? Math.round((event.bookingsCount / event.totalTickets) * 100)
                    : 0;
                const isFullyStaffed = event.staffFilled >= event.totalStaff;

                return (
                  <tr key={event._id} className="hover:bg-surface-container-low/30 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl overflow-hidden bg-surface-container flex-shrink-0">
                          <img
                            alt={event.title}
                            className="w-full h-full object-cover"
                            src={
                              event.imageUrl ||
                              "https://images.unsplash.com/photo-1540575861501-7ad058bf37ad?auto=format&fit=crop&q=80&w=200"
                            }
                          />
                        </div>
                        <div>
                      <Link href={`/admin/events/${event._id}/roster`} className="block">
                        <p className="font-bold text-on-surface text-base group-hover:text-primary transition-colors">
                          {event.title}
                        </p>
                      </Link>
                          <p className="text-sm text-on-surface-variant">
                            {format(new Date(event.date), "MMM d, yyyy")}
                          </p>
                          {event.isFeatured && (
                            <span className="text-[10px] font-bold text-amber-500 flex items-center gap-0.5 mt-0.5">
                              <span className="material-symbols-outlined text-xs">star</span> Featured
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold bg-surface-container-high text-on-secondary-container tracking-wider uppercase">
                        {event.category}
                      </span>
                    </td>
                    <td className="px-6 py-6">
                      <div className="w-32">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold text-on-surface">{ticketPercent}%</span>
                          <span className="text-[10px] font-medium text-on-surface-variant">
                            {event.bookingsCount}/{event.totalTickets}
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full transition-all duration-500"
                            style={{ width: `${ticketPercent}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${isFullyStaffed ? "bg-primary" : "bg-error"}`} />
                        <span className={`text-sm font-semibold ${isFullyStaffed ? "text-primary" : "text-error"}`}>
                          {event.staffFilled}/{event.totalStaff} Staffed
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <span className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 w-fit ${statusColor(event.status)}`}>
                        <span className="w-1 h-1 rounded-full bg-current" />
                        {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <ActionMenu event={event} />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {total > 0 && (
        <div className="px-8 py-5 flex items-center justify-between bg-surface-container-low/10">
          <p className="text-xs font-medium text-on-surface-variant">
            Showing{" "}
            <span className="text-on-surface">
              {(page - 1) * 10 + 1}–{Math.min(page * 10, total)}
            </span>{" "}
            of <span className="text-on-surface">{total}</span> events
          </p>
          <div className="flex items-center gap-2">
            <button
              disabled={page === 1}
              onClick={() => handlePageChange(page - 1)}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-outline-variant/20 text-on-surface-variant hover:bg-surface-container transition-all disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-base">chevron_left</span>
            </button>
            {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => handlePageChange(p)}
                className={`w-8 h-8 flex items-center justify-center rounded-lg font-bold text-xs ${
                  page === p
                    ? "bg-primary text-on-primary"
                    : "text-on-surface-variant hover:bg-surface-container font-medium"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              disabled={page === pages}
              onClick={() => handlePageChange(page + 1)}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-outline-variant/20 text-on-surface-variant hover:bg-surface-container transition-all disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-base">chevron_right</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
