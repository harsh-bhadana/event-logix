import React from 'react';
import { getAdminAnalytics } from '@/lib/actions/analytics-actions';
import { AnalyticsCharts } from '@/components/admin/AnalyticsCharts';

export default async function AdminOverviewPage() {
  const result = await getAdminAnalytics();
  const data = (result.success && result.data) ? result.data : {
    totalRevenue: 0,
    eventsCount: 0,
    staffCount: 0,
    ticketsSold: 0,
    revenueTrend: []
  };

  const kpis = [
    { label: 'Total Revenue', value: `$${data.totalRevenue.toLocaleString()}`, icon: 'payments', color: 'text-primary', bg: 'bg-primary/5' },
    { label: 'Total Events', value: data.eventsCount, icon: 'event', color: 'text-secondary', bg: 'bg-secondary/5' },
    { label: 'Active Staff', value: data.staffCount, icon: 'badge', color: 'text-tertiary', bg: 'bg-tertiary/5' },
    { label: 'Tickets Sold', value: data.ticketsSold.toLocaleString(), icon: 'confirmation_number', color: 'text-error', bg: 'bg-error/5' },
  ];

  return (
    <div className="px-10 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-black tracking-tighter text-on-surface font-headline">Control Center</h1>
        <p className="mt-2 text-on-surface-variant font-medium font-body italic">"The bird of preminence flies on the wings of data." — Event Logix Admin</p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="p-8 bg-white rounded-[2.5rem] border border-outline-variant/10 shadow-sm group hover:shadow-xl hover:shadow-primary/5 transition-all duration-500">
            <div className={`w-14 h-14 ${kpi.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              <span className={`material-symbols-outlined ${kpi.color} text-3xl fill-1`}>{kpi.icon}</span>
            </div>
            <p className="text-sm font-black text-on-surface-variant uppercase tracking-widest leading-none mb-2">{kpi.label}</p>
            <p className="text-4xl font-black text-on-surface font-headline tracking-tighter">{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <AnalyticsCharts revenueData={data.revenueTrend} />

      {/* Upcoming Alerts / Feed (Placeholder for now) */}
      <div className="mt-12 p-8 bg-surface-container-low rounded-[3rem] border border-outline-variant/5">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black text-on-surface font-headline">Operational Insights</h2>
          <button className="text-sm font-bold text-primary hover:underline">View All Alerts</button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-6 p-4 bg-white rounded-2xl border border-outline-variant/5">
            <div className="w-2 h-2 rounded-full bg-error animate-pulse" />
            <p className="flex-1 text-sm font-medium text-on-surface-variant">
              **Tech Summit 2024** is missing 3 Security personnel for tomorrow's shift.
            </p>
            <button className="px-4 py-2 bg-error/5 text-error text-xs font-black rounded-lg hover:bg-error/10 transition-colors">Resolve</button>
          </div>
          <div className="flex items-center gap-6 p-4 bg-white rounded-2xl border border-outline-variant/5">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <p className="flex-1 text-sm font-medium text-on-surface-variant">
              **Neon Music Fest** just hit 90% ticket capacity. Expanding waitlist.
            </p>
            <button className="px-4 py-2 bg-primary/5 text-primary text-xs font-black rounded-lg hover:bg-primary/10 transition-colors">Details</button>
          </div>
        </div>
      </div>
    </div>
  );
}
