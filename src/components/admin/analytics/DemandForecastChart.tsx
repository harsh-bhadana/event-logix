"use client";

import { motion } from "framer-motion";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Line,
  LineChart,
  Legend,
  ComposedChart
} from 'recharts';

interface DemandChartProps {
  data: any[];
}

export function DemandForecastChart({ data }: DemandChartProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-surface-container-lowest p-8 rounded-[3rem] border border-outline-variant/10 shadow-[0_8px_40px_rgba(0,0,0,0.03)] h-[500px] flex flex-col"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest mb-3">
            <span className="material-symbols-outlined text-xs">trending_up</span>
            Predictive Model v1.0
          </div>
          <h3 className="text-2xl font-black text-on-surface tracking-tighter font-headline">Ticket Demand Velocity</h3>
          <p className="text-xs text-on-surface-variant font-medium opacity-60">Actual bookings vs. Weighted growth forecast (30d window)</p>
        </div>
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-2">
             <div className="w-3 h-3 rounded-full bg-primary" />
             <span className="text-[10px] font-bold text-on-surface-variant uppercase">Actual</span>
           </div>
           <div className="flex items-center gap-2">
             <div className="w-3 h-3 rounded-full bg-primary/20 border-2 border-primary border-dashed" />
             <span className="text-[10px] font-bold text-on-surface-variant uppercase opacity-60">Forecast</span>
           </div>
        </div>
      </div>

      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-outline-variant)" opacity={0.1} />
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fontWeight: 700, fill: 'var(--color-on-surface-variant)', opacity: 0.5 }}
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
              cursor={{ stroke: 'var(--color-primary)', strokeWidth: 1, strokeDasharray: '8 8' }}
            />
            <Area 
              type="monotone" 
              dataKey="actual" 
              stroke="var(--color-primary)" 
              strokeWidth={4}
              fillOpacity={1} 
              fill="url(#colorActual)" 
            />
            <Line 
              type="monotone" 
              dataKey="forecast" 
              stroke="var(--color-primary)" 
              strokeWidth={2}
              strokeDasharray="8 8" 
              dot={false}
              opacity={0.4}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
