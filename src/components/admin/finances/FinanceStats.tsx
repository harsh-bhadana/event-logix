"use client";

import { motion } from "framer-motion";
import { FinancialSummary } from "@/lib/actions/finance-actions";

interface FinanceStatsProps {
  summary: FinancialSummary;
}

export function FinanceStats({ summary }: FinanceStatsProps) {
  const stats = [
    {
      label: "Gross Revenue",
      value: `$${summary.totalRevenue.toLocaleString()}`,
      description: "Total sales before deductions",
      icon: "payments",
      color: "text-primary",
      bg: "bg-primary/10",
      trend: "+12.5%",
      isPositive: true
    },
    {
      label: "Total Tickets",
      value: summary.totalSales.toLocaleString(),
      description: "Individual units sold",
      icon: "confirmation_number",
      color: "text-tertiary",
      bg: "bg-tertiary/10",
      trend: "+8.2%",
      isPositive: true
    },
    {
      label: "Average Order",
      value: `$${summary.averageOrderValue.toFixed(2)}`,
      description: "Revenue per transaction",
      icon: "trending_up",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      trend: "+2.4%",
      isPositive: true
    },
    {
      label: "Refunds Issued",
      value: summary.refundCount.toString(),
      description: "Cancelled or returned orders",
      icon: "undo",
      color: "text-error",
      bg: "bg-error/10",
      trend: "-1.5%",
      isPositive: false
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {stats.map((stat, idx) => (
        <motion.div
          key={idx}
          variants={item}
          className="bg-surface-container-lowest p-6 rounded-[2rem] border border-outline-variant/10 shadow-[0_8px_30px_rgb(0,0,0,0.02)] relative overflow-hidden group hover:shadow-xl transition-shadow duration-500"
        >
          {/* Decorative background element */}
          <div className={`absolute -right-4 -top-4 w-24 h-24 ${stat.bg} rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700 opacity-60`}></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                <span className="material-symbols-outlined text-2xl">{stat.icon}</span>
              </div>
              <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-tighter px-2 py-1 rounded-full ${stat.isPositive ? 'bg-emerald-500/10 text-emerald-600' : 'bg-rose-500/10 text-rose-600'}`}>
                <span className="material-symbols-outlined text-xs">{stat.isPositive ? 'trending_up' : 'trending_down'}</span>
                {stat.trend}
              </div>
            </div>
            
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">{stat.label}</p>
            <h3 className="text-2xl font-black text-on-surface tracking-tighter mb-1 font-headline">{stat.value}</h3>
            <p className="text-xs text-on-surface-variant/60 font-medium">{stat.description}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
