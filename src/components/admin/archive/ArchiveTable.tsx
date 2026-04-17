"use client";

import { motion } from "framer-motion";
import { format } from "date-fns";
import { restoreEvent } from "@/lib/actions/archive-actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { downloadCSV } from "@/lib/utils/export-utils";

interface ArchiveTableProps {
  events: any[];
}

export function ArchiveTable({ events }: ArchiveTableProps) {
  const router = useRouter();
  const [pendingId, setPendingId] = useState<string | null>(null);

  const handleRestore = async (id: string) => {
    setPendingId(id);
    await restoreEvent(id);
    setPendingId(null);
    router.refresh();
  };

  const handleExport = (event: any) => {
    const headers = ["Title", "Category", "Revenue", "Attendance", "ArchivedAt"];
    const data = [{
      Title: event.title,
      Category: event.category,
      Revenue: event.totalRevenue,
      Attendance: `${event.attendanceRate}%`,
      ArchivedAt: format(new Date(event.updatedAt), 'yyyy-MM-dd')
    }];
    downloadCSV(`archive-${event.title.toLowerCase().replace(/\s+/g, '-')}.csv`, headers, data);
  };

  return (
    <div className="bg-surface-container-lowest rounded-[2.5rem] border border-outline-variant/10 shadow-sm overflow-hidden">
      <div className="p-8 border-b border-outline-variant/5 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-black text-on-surface tracking-tight font-headline">Historical Ledger</h3>
          <p className="text-xs text-on-surface-variant font-medium text-opacity-70">Complete record of archived organizational memory</p>
        </div>
        <div className="flex gap-2">
           <div className="relative group">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant opacity-60 text-sm">filter_list</span>
              <select className="appearance-none bg-surface-container-high pl-9 pr-8 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest text-on-surface-variant border-none focus:ring-1 focus:ring-primary/20">
                <option>Filter by Year</option>
                <option>2026</option>
                <option>2025</option>
              </select>
           </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low/30">
              <th className="px-8 py-5 text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Historical Asset</th>
              <th className="px-6 py-5 text-[10px] font-black text-on-surface-variant uppercase tracking-widest text-center">Final Revenue</th>
              <th className="px-6 py-5 text-[10px] font-black text-on-surface-variant uppercase tracking-widest text-center">Attendance</th>
              <th className="px-6 py-5 text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Archived Date</th>
              <th className="px-8 py-5 text-[10px] font-black text-on-surface-variant uppercase tracking-widest text-right">Utility</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/5">
            {events.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-8 py-20 text-center">
                  <div className="flex flex-col items-center gap-2 opacity-30">
                    <span className="material-symbols-outlined text-4xl">folder_off</span>
                    <p className="text-sm font-bold uppercase tracking-widest">Archive Empty</p>
                  </div>
                </td>
              </tr>
            ) : (
              events.map((event, idx) => (
                <motion.tr 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={event._id} 
                  className="hover:bg-surface-container-low/20 transition-colors group border-l-4 border-l-transparent hover:border-l-primary"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-surface-container grayscale group-hover:grayscale-0 transition-all duration-700">
                        <img 
                          src={event.imageUrl || "https://images.unsplash.com/photo-1540575861501-7ad058bf37ad?auto=format&fit=crop&q=80&w=200"} 
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-on-surface">{event.title}</p>
                        <p className="text-[10px] text-on-surface-variant/60 font-medium uppercase tracking-wider">{event.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <p className="text-sm font-black text-primary">${event.totalRevenue.toLocaleString()}</p>
                    <p className="text-[9px] font-bold text-on-surface-variant uppercase opacity-40">Total Yield</p>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <div className="inline-flex flex-col items-center gap-1">
                      <p className="text-sm font-bold text-on-surface">{Math.round(event.attendanceRate)}%</p>
                      <div className="w-16 h-1 bg-surface-container rounded-full overflow-hidden">
                        <div className="h-full bg-tertiary" style={{ width: `${event.attendanceRate}%` }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <p className="text-xs font-semibold text-on-surface">{format(new Date(event.updatedAt), 'MMM d, yyyy')}</p>
                    <p className="text-[9px] text-on-surface-variant opacity-40 uppercase font-black">Record Stamped</p>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button 
                         onClick={() => handleExport(event)}
                         className="p-2 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant transition-all hover:scale-105"
                         title="Export Performance Report"
                       >
                         <span className="material-symbols-outlined text-sm">download</span>
                       </button>
                       <button 
                         onClick={() => handleRestore(event._id)}
                         disabled={pendingId === event._id}
                         className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest hover:bg-primary/20 transition-all disabled:opacity-50"
                       >
                         {pendingId === event._id ? (
                           <span className="w-3 h-3 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></span>
                         ) : (
                           <>
                             <span className="material-symbols-outlined text-xs">restore</span>
                             Restore
                           </>
                         )}
                       </button>
                    </div>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
