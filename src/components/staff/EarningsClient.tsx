'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Wallet, 
  TrendingUp, 
  Download, 
  ChevronRight, 
  Clock, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { requestPayout } from '@/lib/actions/staff-actions';
import { toast } from 'sonner';

interface Shift {
  eventId: string;
  eventTitle: string;
  date: string;
  role: string;
  amount: number;
  status: 'pending' | 'processing' | 'paid';
}

interface EarningsProps {
  userId: string;
  earnings: {
    balance: number;
    lifetime: number;
  };
  shifts: Shift[];
}

export default function EarningsClient({ userId, earnings, shifts }: EarningsProps) {
  const [isRequesting, setIsRequesting] = useState(false);

  const handleWithdraw = async () => {
    if (earnings.balance <= 0) {
      toast.error("No funds available for withdrawal");
      return;
    }

    setIsRequesting(true);
    try {
      const res = await requestPayout(userId, earnings.balance, { method: 'default' });
      if (res.success) {
        toast.success(res.message);
        // Refresh page or update state
        window.location.reload();
      } else {
        toast.error(res.error || "Failed to request payout");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsRequesting(false);
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl w-full mx-auto space-y-10">
      {/* Header Section */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#29695b] mb-2 font-headline">Staff Overview</p>
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white font-headline">Earnings Dashboard</h2>
        </div>
        <div className="flex items-center gap-3">
          <button 
            className="px-5 py-2.5 rounded-xl text-sm font-bold text-[#29695b] dark:text-[#afefdd] hover:bg-[#29695b]/10 transition-colors flex items-center gap-2"
            onClick={() => window.print()}
          >
            <Download className="w-4 h-4" />
            Export Statement
          </button>
          <button 
            onClick={handleWithdraw}
            disabled={isRequesting || earnings.balance <= 0}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#29695b] to-[#1a5c4f] text-on-primary text-sm font-bold shadow-lg shadow-[#29695b]/20 transition-transform active:scale-95 disabled:opacity-50"
          >
            {isRequesting ? 'Processing...' : 'Withdraw Funds'}
          </button>
        </div>
      </section>

      {/* Bento Earnings Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Primary Balance Card */}
        <div className="md:col-span-2 relative overflow-hidden bg-[#1a5c4f] rounded-3xl p-8 text-white flex flex-col justify-between min-h-[280px] shadow-xl">
          <div className="relative z-10">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium opacity-80 mb-1 font-body">Current Balance</p>
                <h3 className="text-5xl font-extrabold tracking-tight font-headline">
                  ${earnings.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </h3>
              </div>
              <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md">
                <Wallet className="w-8 h-8" />
              </div>
            </div>
          </div>
          <div className="relative z-10 flex flex-wrap gap-10 items-end justify-between mt-8">
            <div className="flex gap-12">
              <div>
                <p className="text-[10px] uppercase font-bold tracking-widest opacity-60 mb-2 font-headline">Next Payout</p>
                <p className="text-xl font-bold font-headline">Oct 24, 2026</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-widest opacity-60 mb-2 font-headline">Status</p>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#afefdd] animate-pulse"></div>
                  <p className="text-xl font-bold font-headline">Active</p>
                </div>
              </div>
            </div>
            <div className="h-16 w-32 opacity-40">
              <svg className="w-full h-full stroke-white fill-none stroke-2" viewBox="0 0 100 40">
                <path d="M0 35 Q 25 35 30 20 T 60 25 T 100 5" strokeLinecap="round"></path>
              </svg>
            </div>
          </div>
          {/* Decorative Background Element */}
          <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        </div>

        {/* Lifetime Earnings Card */}
        <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-3xl p-8 flex flex-col justify-between min-h-[280px] shadow-sm">
          <div>
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-2 font-headline uppercase tracking-wider">Total Lifetime Earnings</p>
            <h3 className="text-4xl font-bold text-[#29695b] dark:text-[#afefdd] tracking-tight font-headline">
              ${earnings.lifetime.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </h3>
            <div className="inline-flex items-center gap-1.5 mt-4 px-3 py-1.5 bg-[#ddf2ce]/40 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 rounded-lg text-xs font-bold">
              <TrendingUp className="w-3.5 h-3.5" />
              +12.4% vs last year
            </div>
          </div>
          <div className="mt-8 space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500 dark:text-slate-400 font-medium">Progress to Bonus</span>
              <span className="font-bold text-slate-900 dark:text-white">$850 / $1000</span>
            </div>
            <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-[#29695b] w-[85%] rounded-full"></div>
            </div>
            <p className="text-[10px] text-slate-400 font-medium">85% towards Senior Associate track bonus</p>
          </div>
        </div>
      </section>

      {/* Transactions Section */}
      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-headline">Completed Shifts</h3>
          <button className="text-sm font-bold text-[#29695b] dark:text-[#afefdd] hover:underline">View All</button>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-700">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900/50">
                  <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 font-headline">Event Name</th>
                  <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 font-headline">Date</th>
                  <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 font-headline">Role</th>
                  <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 font-headline">Amount</th>
                  <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 font-headline">Status</th>
                  <th className="px-8 py-5"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-700/50">
                {shifts.map((shift, i) => (
                  <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-[#29695b]/10 dark:bg-[#afefdd]/10 flex items-center justify-center text-[#29695b] dark:text-[#afefdd] font-bold text-xs">
                          {getInitials(shift.eventTitle)}
                        </div>
                        <p className="font-bold text-slate-900 dark:text-white text-sm">{shift.eventTitle}</p>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm font-medium text-slate-500 dark:text-slate-400 font-body">
                      {new Date(shift.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="px-8 py-6">
                      <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-[10px] font-bold rounded-full font-headline border border-slate-200 dark:border-slate-600">
                        {shift.role}
                      </span>
                    </td>
                    <td className="px-8 py-6 font-bold text-[#29695b] dark:text-[#afefdd] text-sm">
                      ${shift.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-8 py-6">
                      <StatusBadge status={shift.status} />
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-[#29695b] transition-all">
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {shifts.length === 0 && (
            <div className="p-20 text-center flex flex-col items-center gap-4">
              <Clock className="w-12 h-12 text-slate-300 dark:text-slate-600" />
              <p className="text-slate-500 dark:text-slate-400 font-medium">No completed shifts found yet.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function StatusBadge({ status }: { status: Shift['status'] }) {
  switch (status) {
    case 'paid':
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 rounded-full text-[10px] font-bold uppercase tracking-wider font-headline border border-emerald-100 dark:border-emerald-500/20">
          <CheckCircle2 className="w-3 h-3" /> Paid
        </span>
      );
    case 'processing':
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 rounded-full text-[10px] font-bold uppercase tracking-wider font-headline border border-blue-100 dark:border-blue-500/20">
          <Clock className="w-3 h-3 animate-spin-slow" /> Processing
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 rounded-full text-[10px] font-bold uppercase tracking-wider font-headline border border-amber-100 dark:border-amber-500/20">
          <AlertCircle className="w-3 h-3" /> Pending
        </span>
      );
  }
}

function getInitials(title: string) {
  return title
    .split(' ')
    .filter(w => w.length > 0)
    .map(w => w[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();
}
