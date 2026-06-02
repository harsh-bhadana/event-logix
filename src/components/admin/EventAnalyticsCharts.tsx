'use client';

import React, { useMemo } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

interface EventAnalyticsChartsProps {
  attendees: any[];
}

export default function EventAnalyticsCharts({ attendees }: EventAnalyticsChartsProps) {
  
  // 1. Process Ticket Distribution Data
  const ticketData = useMemo(() => {
    const counts: Record<string, number> = {};
    attendees.forEach(b => {
      const type = b.ticketType || 'Standard';
      const qty = b.quantity || 1;
      counts[type] = (counts[type] || 0) + qty;
    });

    return Object.keys(counts).map(name => ({
      name,
      value: counts[name]
    }));
  }, [attendees]);

  // 2. Process Registration Velocity (Cumulative over time)
  const velocityData = useMemo(() => {
    if (attendees.length === 0) return [];

    // Sort by createdAt ascending
    const sorted = [...attendees].sort((a, b) => 
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    // Group quantities by date
    const dateMap: Record<string, number> = {};

    sorted.forEach(b => {
      const date = new Date(b.createdAt);
      const dateStr = `${date.getMonth() + 1}/${date.getDate()}`;
      const qty = b.quantity || 1;
      dateMap[dateStr] = (dateMap[dateStr] || 0) + qty;
    });

    // Compute cumulative sum
    let cumulative = 0;
    const dataPoints = Object.keys(dateMap).map(dateStr => {
      cumulative += dateMap[dateStr];
      return {
        name: dateStr,
        value: cumulative
      };
    });

    return dataPoints;
  }, [attendees]);

  const COLORS = ['#29695b', '#afefdd', '#3a8a7a', '#78b5a9', '#153f36'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 font-body">
      {/* Registration Velocity Chart */}
      <div className="p-8 bg-white rounded-[2.5rem] border border-outline-variant/10 shadow-sm">
        <div className="mb-6">
          <h3 className="text-lg font-black tracking-tight text-on-surface font-headline italic">Registration Velocity</h3>
          <p className="text-xs text-on-surface-variant font-medium opacity-75">Cumulative tickets reserved over time</p>
        </div>
        
        <div className="h-[260px] w-full">
          {velocityData.length === 0 ? (
            <div className="w-full h-full flex items-center justify-center text-xs text-slate-400 italic">
              No registrations to plot
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={velocityData}>
                <defs>
                  <linearGradient id="colorVelocity" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#29695b" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#29695b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E6E1E5" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#49454F', fontSize: 10, fontWeight: 500 }}
                  dy={8}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#49454F', fontSize: 10, fontWeight: 500 }}
                  tickFormatter={(val) => Math.round(val).toString()}
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    fontWeight: 600,
                    fontSize: '11px'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#29695b" 
                  strokeWidth={2.5}
                  fillOpacity={1} 
                  fill="url(#colorVelocity)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Ticket Distribution Pie Chart */}
      <div className="p-8 bg-white rounded-[2.5rem] border border-outline-variant/10 shadow-sm flex flex-col justify-between">
        <div className="mb-4">
          <h3 className="text-lg font-black tracking-tight text-on-surface font-headline italic">Ticket Type Distribution</h3>
          <p className="text-xs text-on-surface-variant font-medium opacity-75">Distribution of ticket reservations</p>
        </div>
        
        <div className="h-[220px] w-full flex items-center justify-center">
          {ticketData.length === 0 ? (
            <div className="text-xs text-slate-400 italic">No tickets distributed yet</div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ticketData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {ticketData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    fontWeight: 600,
                    fontSize: '11px'
                  }} 
                />
                <Legend 
                  verticalAlign="bottom" 
                  iconSize={8}
                  iconType="circle"
                  wrapperStyle={{ fontSize: '10px', fontWeight: 600 }}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}
