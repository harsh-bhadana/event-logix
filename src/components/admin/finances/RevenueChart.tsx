"use client";

import { motion } from "framer-motion";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

interface RevenueChartProps {
  data: {
    date: string;
    revenue: number;
  }[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-surface-container-lowest p-8 rounded-[2.5rem] border border-outline-variant/10 shadow-[0_8px_30px_rgb(0,0,0,0.02)] h-[450px] flex flex-col"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-black text-on-surface tracking-tight font-headline">Revenue Trajectory</h3>
          <p className="text-xs text-on-surface-variant font-medium">Daily intake over the last 30 days</p>
        </div>
        <div className="flex items-center gap-2">
           <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container-high text-on-surface-variant text-[10px] font-bold uppercase tracking-wider">
             <span className="w-2 h-2 rounded-full bg-primary"></span>
             Direct Sales
           </div>
        </div>
      </div>

      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-outline-variant)" opacity={0.1} />
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fontWeight: 600, fill: 'var(--color-on-surface-variant)', opacity: 0.5 }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fontWeight: 600, fill: 'var(--color-on-surface-variant)', opacity: 0.5 }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip 
              contentStyle={{ 
                borderRadius: '16px', 
                border: 'none', 
                boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                backgroundColor: 'var(--color-surface-container-lowest)',
                fontSize: '12px',
                fontWeight: 'bold'
              }}
              cursor={{ stroke: 'var(--color-primary)', strokeWidth: 2, strokeDasharray: '4 4' }}
            />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="var(--color-primary)" 
              strokeWidth={4}
              fillOpacity={1} 
              fill="url(#colorRevenue)" 
              animationDuration={2000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
