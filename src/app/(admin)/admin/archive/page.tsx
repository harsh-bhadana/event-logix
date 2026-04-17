import { getArchivedEvents, getArchiveInsights } from "@/lib/actions/archive-actions";
import { ArchiveStats } from "@/components/admin/archive/ArchiveStats";
import { ArchiveTable } from "@/components/admin/archive/ArchiveTable";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";

export const metadata = {
  title: "Historical Archive | Event Logix Admin",
  description: "Organizational memory and performance retrospectives.",
};

export default async function ArchivePortal() {
  const session = await getSession();

  if (!session?.user || session.user.role !== 'admin') {
    redirect('/login?callbackUrl=/admin/archive');
  }

  const [eventsRes, insightsRes] = await Promise.all([
    getArchivedEvents(),
    getArchiveInsights()
  ]);

  if (!eventsRes.success || !insightsRes.success) {
    return (
      <div className="p-10 flex items-center justify-center min-h-[60vh]">
        <div className="text-center p-12 bg-surface-container-low rounded-3xl border border-outline-variant/10 max-w-md">
           <span className="material-symbols-outlined text-4xl text-error mb-4">history</span>
           <h2 className="text-xl font-bold text-on-surface mb-2">Archive Retrieval Failure</h2>
           <p className="text-sm text-on-surface-variant font-medium">
             Could not synchronize with the historical data cluster. Please verify availability.
           </p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-10 py-10 space-y-10 animate-in fade-in duration-700">
      {/* Narrative Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-on-surface-variant/10 text-on-surface-variant text-[10px] font-black uppercase tracking-widest mb-4">
            <span className="material-symbols-outlined text-xs">database</span>
            Organizational Memory
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-on-surface font-headline leading-tight">
            Event Archive
          </h1>
          <p className="mt-2 text-on-surface-variant font-medium font-body max-w-xl opacity-80">
            A permanent record of past excellence. Review historical metrics, export performance deep-dives, and manage legacy assets.
          </p>
        </div>
        <div className="flex gap-3">
           <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-surface-container-high text-on-surface border border-outline-variant/10 text-sm font-bold shadow-sm hover:bg-surface-container-highest transition-all group">
             <span className="material-symbols-outlined text-sm group-hover:rotate-12 transition-transform">download</span>
             Master Export (.CSV)
           </button>
        </div>
      </div>

      {/* Numerical Retrospective */}
      <ArchiveStats insights={insightsRes.data!} />

      {/* Historical Ledger */}
      <ArchiveTable events={eventsRes.data!} />

      {/* Descriptive Footer */}
      <div className="p-8 bg-surface-container-low/20 rounded-[2.5rem] border border-outline-variant/5 text-center">
         <p className="text-xs font-semibold text-on-surface-variant opacity-50 uppercase tracking-[0.2em]">
           Historical data retention compliant with platform standard protocols.
         </p>
      </div>
    </div>
  );
}
