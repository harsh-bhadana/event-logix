'use client';

import { format } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";

interface Event {
  _id: string;
  title: string;
  date: Date;
  category: string;
  status: string;
  bookingsCount: number;
  totalTickets: number;
  staffFilled: number;
  totalStaff: number;
  imageUrl?: string;
}

interface EventsTableProps {
  events: Event[];
  total: number;
  page: number;
  pages: number;
}

export function EventsTable({ events, total, page, pages }: EventsTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="bg-surface-container-lowest rounded-3xl overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.02)]">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low/30">
              <th className="px-8 py-5 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest border-none">Event Info</th>
              <th className="px-6 py-5 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest border-none">Category</th>
              <th className="px-6 py-5 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest border-none">Tickets Sold</th>
              <th className="px-6 py-5 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest border-none">Staffing</th>
              <th className="px-6 py-5 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest border-none">Status</th>
              <th className="px-8 py-5 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest border-none text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container-low">
            {events.map((event) => {
              const ticketPercent = event.totalTickets > 0 
                ? Math.round((event.bookingsCount / event.totalTickets) * 100) 
                : 0;
              
              const isFullyStaffed = event.staffFilled >= event.totalStaff;

              return (
                <tr key={event._id} className="hover:bg-surface-container-low/30 transition-colors group cursor-pointer">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-surface-container flex-shrink-0">
                        <img 
                          alt={event.title} 
                          className="w-full h-full object-cover" 
                          src={event.imageUrl || "https://images.unsplash.com/photo-1540575861501-7ad058bf37ad?auto=format&fit=crop&q=80&w=2070"} 
                        />
                      </div>
                      <div>
                        <p className="font-bold text-on-surface text-base group-hover:text-primary transition-colors">{event.title}</p>
                        <p className="text-sm text-on-surface-variant">{format(new Date(event.date), "MMM d, yyyy")}</p>
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
                        <span className="text-[10px] font-medium text-on-surface-variant">{event.bookingsCount}/{event.totalTickets}</span>
                      </div>
                      <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full transition-all duration-500" 
                          style={{ width: `${ticketPercent}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${isFullyStaffed ? "bg-primary" : "bg-error"}`}></div>
                      <span className={`text-sm font-semibold ${isFullyStaffed ? "text-primary" : "text-error"}`}>
                        {event.staffFilled}/{event.totalStaff} Staffed
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 w-fit ${
                      event.status === 'published' 
                        ? 'bg-primary-container text-on-primary-container' 
                        : 'bg-surface-container-highest text-on-surface-variant'
                    }`}>
                      <span className={`w-1 h-1 rounded-full ${event.status === 'published' ? 'bg-on-primary-container' : 'bg-on-surface-variant'}`}></span>
                      {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 rounded-lg hover:bg-surface-container text-on-surface-variant transition-colors">
                      <span className="material-symbols-outlined">more_vert</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <div className="px-8 py-5 flex items-center justify-between bg-surface-container-low/10">
        <p className="text-xs font-medium text-on-surface-variant">
          Showing <span className="text-on-surface">{(page - 1) * 10 + 1}-{Math.min(page * 10, total)}</span> of <span className="text-on-surface">{total}</span> events
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
    </div>
  );
}
