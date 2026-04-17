"use client";

import React from "react";
import { downloadCSV, printReport } from "@/lib/utils/export-utils";

interface AnalyticsExportProps {
  data: {
    totalRevenue: number;
    eventsCount: number;
    staffCount: number;
    ticketsSold: number;
    revenueTrend: any[];
  };
}

export function AnalyticsExport({ data }: AnalyticsExportProps) {
  const exportKPIs = () => {
    const headers = ["Metric", "Value"];
    const kpiData = [
      { Metric: "Total Revenue", Value: data.totalRevenue },
      { Metric: "Total Events", Value: data.eventsCount },
      { Metric: "Active Staff", Value: data.staffCount },
      { Metric: "Tickets Sold", Value: data.ticketsSold },
    ];
    downloadCSV("analytics-kpis.csv", headers, kpiData);
  };

  const exportTrend = () => {
    const headers = ["name", "value"];
    downloadCSV("revenue-trend.csv", headers, data.revenueTrend);
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex bg-surface-container-high rounded-xl p-1">
        <button 
          onClick={exportKPIs}
          className="px-4 py-2 hover:bg-surface-container-highest rounded-lg transition-colors text-[10px] font-black uppercase tracking-widest text-on-surface-variant flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">finance_mode</span>
          KPIs
        </button>
        <div className="w-px h-4 bg-outline-variant/20 self-center mx-1"></div>
        <button 
          onClick={exportTrend}
          className="px-4 py-2 hover:bg-surface-container-highest rounded-lg transition-colors text-[10px] font-black uppercase tracking-widest text-on-surface-variant flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">trending_up</span>
          Trend
        </button>
      </div>
      <button 
        onClick={printReport}
        className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-primary text-on-primary font-bold text-xs shadow-lg shadow-primary/10 active:scale-95 transition-all"
      >
        <span className="material-symbols-outlined text-base">print</span>
        Print Report
      </button>
    </div>
  );
}
