"use client";

import { motion } from "framer-motion";

interface InsightMetricCardsProps {
  metrics: {
    label: string;
    value: string;
    trend: string;
    color: string;
  }[];
}

export function InsightMetricCards({ metrics }: InsightMetricCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, idx) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: idx * 0.1 }}
          className="bg-surface-container-lowest p-6 rounded-[2.5rem] border border-outline-variant/10 shadow-[0_8px_30px_rgba(0,0,0,0.02)] group hover:shadow-xl transition-all"
        >
          <div className="flex flex-col h-full">
            <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] mb-4 opacity-40">{metric.label}</p>
            <div className="flex items-end justify-between mt-auto">
              <h4 className={`text-3xl font-black ${metric.color} tracking-tighter font-headline`}>{metric.value}</h4>
              <div className="flex flex-col items-end">
                 <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${metric.trend.startsWith('+') ? 'bg-primary/10 text-primary' : 'bg-surface-container-high text-on-surface-variant'}`}>
                   {metric.trend}
                 </span>
                 <p className="text-[8px] uppercase font-black opacity-30 mt-1">Velocity</p>
              </div>
            </div>
            
            <div className="mt-6 h-1 w-full bg-surface-container-high rounded-full overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: "60%" }}
                 transition={{ duration: 1, delay: 0.5 + (idx * 0.1) }}
                 className={`h-full ${metric.color.replace('text-', 'bg-')} opacity-40`}
               />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
