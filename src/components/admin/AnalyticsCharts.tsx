'use client';

import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';

interface AnalyticsChartsProps {
  revenueData: Array<{ name: string; value: number }>;
  categoryData: Array<{ name: string; value: number }>;
}

export function AnalyticsCharts({ revenueData, categoryData }: AnalyticsChartsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Revenue Trend Chart */}
      <div className="p-8 bg-white rounded-[2.5rem] border border-outline-variant/10 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xl font-black tracking-tight text-on-surface">Revenue Growth</h3>
            <p className="text-sm text-on-surface-variant font-medium">Monthly performance overview</p>
          </div>
          <div className="px-4 py-2 bg-primary/5 rounded-full text-primary text-xs font-black">
            +12.5% this month
          </div>
        </div>
        
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6750A4" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#6750A4" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E6E1E5" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#49454F', fontSize: 12, fontWeight: 500 }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#49454F', fontSize: 12, fontWeight: 500 }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '16px', 
                  border: 'none', 
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  fontWeight: 600
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#6750A4" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorRevenue)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Ticket Sales Bar Chart (Simulated categories) */}
      <div className="p-8 bg-white rounded-[2.5rem] border border-outline-variant/10 shadow-sm">
        <h3 className="text-xl font-black tracking-tight text-on-surface mb-8">Sales by Category</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E6E1E5" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#49454F', fontSize: 10, fontWeight: 500 }}
                dy={10}
              />
              <YAxis hide />
              <Tooltip 
                cursor={{ fill: '#F4EFF4', radius: 8 }}
                contentStyle={{ 
                  borderRadius: '16px', 
                  border: 'none', 
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  fontWeight: 600
                }}
              />
              <Bar dataKey="value" radius={[8, 8, 8, 8]} barSize={40}>
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 0 ? '#6750A4' : '#E8DEF8'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
