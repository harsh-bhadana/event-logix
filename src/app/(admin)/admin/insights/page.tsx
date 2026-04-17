import { getDemandForecast, getPeakCheckInTimes, getAdvancedInsights } from "@/lib/actions/analytics-actions";
import { DemandForecastChart } from "@/components/admin/analytics/DemandForecastChart";
import { PeakHoursChart } from "@/components/admin/analytics/PeakHoursChart";
import { InsightMetricCards } from "@/components/admin/analytics/InsightMetricCards";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";

export const metadata = {
  title: "Advanced Intelligence | Event Logix Admin",
  description: "High-resolution operational analytics and demand forecasting.",
};

export default async function InsightsPortal() {
  const session = await getSession();

  if (!session?.user || session.user.role !== 'admin') {
    redirect('/login?callbackUrl=/admin/insights');
  }

  const [demandRes, peakRes, insightsRes] = await Promise.all([
    getDemandForecast(),
    getPeakCheckInTimes(),
    getAdvancedInsights()
  ]);

  if (!demandRes.success || !peakRes.success || !insightsRes.success) {
    return (
      <div className="p-10 flex items-center justify-center min-h-[60vh]">
        <div className="text-center p-12 bg-surface-container-low rounded-[3rem] border border-outline-variant/10 max-w-md shadow-2xl">
           <span className="material-symbols-outlined text-4xl text-error mb-4">analytics</span>
           <h2 className="text-xl font-bold text-on-surface mb-2">Neural Link Failure</h2>
           <p className="text-sm text-on-surface-variant font-medium">
             Could not aggregate real-time operational datasets. Please retry calibration.
           </p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-10 py-10 space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-1000">
      {/* Strategic Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-on-surface-variant/10 text-on-surface-variant text-[10px] font-black uppercase tracking-widest mb-4">
            <span className="material-symbols-outlined text-xs">monitoring</span>
            Intelligence Layer v3.4
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-on-surface font-headline leading-tight">
            Operational Insights
          </h1>
          <p className="mt-2 text-on-surface-variant font-medium font-body max-w-xl opacity-80">
            Real-time analytics engine providing predictive demand models and operational check-in intelligence.
          </p>
        </div>
        <div className="flex gap-3">
           <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-surface-container-high text-on-surface border border-outline-variant/10 text-sm font-bold shadow-sm hover:bg-surface-container-highest transition-all group active:scale-95">
             <span className="material-symbols-outlined text-sm group-hover:rotate-12 transition-transform">refresh</span>
             Recalibrate
           </button>
        </div>
      </div>

      {/* Strategic KPIs */}
      <InsightMetricCards metrics={insightsRes.data!} />

      {/* Primary Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <DemandForecastChart data={demandRes.data!} />
        <PeakHoursChart data={peakRes.data!} />
      </div>

      {/* System Status Footer */}
      <div className="p-8 bg-surface-container-low/20 rounded-[3rem] border border-outline-variant/5 text-center flex items-center justify-center gap-4">
         <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
         <p className="text-[10px] font-black text-on-surface-variant opacity-50 uppercase tracking-[0.3em]">
           Live Data Synchronization Active • Sub-second Latency
         </p>
      </div>
    </div>
  );
}
