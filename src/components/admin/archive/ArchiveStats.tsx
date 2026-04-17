"use client";

import { motion } from "framer-motion";

interface ArchiveStatsProps {
  insights: {
    lifetimeRevenue: number;
    totalHistoricalTickets: number;
    eventCount: number;
    averageRevenue: number;
  };
}

export function ArchiveStats({ insights }: ArchiveStatsProps) {
  const stats = [
    {
      label: "Lifetime Yield",
      value: `$${insights.lifetimeRevenue.toLocaleString()}`,
      description: "Aggregated historical revenue",
      icon: "account_balance",
      color: "text-primary",
      bg: "bg-primary/10"
    },
    {
      label: "Historical Volume",
      value: insights.totalHistoricalTickets.toLocaleString(),
      description: "Total tickets processed",
      icon: "history_edu",
      color: "text-tertiary",
      bg: "bg-tertiary/10"
    },
    {
      label: "Closed Assets",
      value: insights.eventCount.toString(),
      description: "Events moved to archive",
      icon: "inventory_2",
      color: "text-on-surface-variant",
      bg: "bg-surface-container-highest/20"
    },
    {
      label: "Avg. Performance",
      value: `$${insights.averageRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
      description: "Revenue per archived event",
      icon: "analytics",
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="bg-surface-container-lowest p-6 rounded-[2rem] border border-outline-variant/10 shadow-sm relative overflow-hidden group"
        >
          <div className="relative z-10">
            <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500`}>
              <span className="material-symbols-outlined text-2xl">{stat.icon}</span>
            </div>
            <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-1 opacity-60">{stat.label}</p>
            <h3 className="text-2xl font-black text-on-surface tracking-tighter mb-1 font-headline">{stat.value}</h3>
            <p className="text-xs text-on-surface-variant/60 font-medium">{stat.description}</p>
          </div>
          
          {/* Subtle noise/texture overlay for "Archived" feel */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        </motion.div>
      ))}
    </div>
  );
}
