"use client";

import { motion } from "framer-motion";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

interface PeakHoursChartProps {
  data: any[];
}

export function PeakHoursChart({ data }: PeakHoursChartProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-surface-container-lowest p-8 rounded-[3rem] border border-outline-variant/10 shadow-[0_8px_40px_rgba(0,0,0,0.03)] h-[500px] flex flex-col"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tertiary/10 text-tertiary text-[10px] font-black uppercase tracking-widest mb-3">
            <span className="material-symbols-outlined text-xs">schedule</span>
            Operational Intelligence
          </div>
          <h3 className="text-2xl font-black text-on-surface tracking-tighter font-headline">Peak Check-In Windows</h3>
          <p className="text-xs text-on-surface-variant font-medium opacity-60">Entry volume distribution by hour (24h cycle)</p>
        </div>
      </div>

      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-outline-variant)" opacity={0.1} />
            <XAxis 
              dataKey="hour" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 9, fontWeight: 700, fill: 'var(--color-on-surface-variant)', opacity: 0.5 }}
              dy={15}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fontWeight: 700, fill: 'var(--color-on-surface-variant)', opacity: 0.5 }}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip 
              contentStyle={{ 
                borderRadius: '24px', 
                border: 'none', 
                boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
                backgroundColor: 'var(--color-surface-container-lowest)',
                fontSize: '12px',
                padding: '16px'
              }}
              cursor={{ fill: 'var(--color-primary)', opacity: 0.05 }}
            />
            <Bar 
              dataKey="checkIns" 
              radius={[12, 12, 0, 0]}
              animationDuration={1500}
            >
              {data.map((entry, index) => (
                <Cell 
                   key={`cell-${index}`} 
                   fill={entry.checkIns > 0 ? "var(--color-tertiary)" : "var(--color-surface-container-highest)"} 
                   opacity={entry.checkIns > 0 ? 0.8 : 0.2}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
