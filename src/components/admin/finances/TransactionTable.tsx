"use client";

import { motion } from "framer-motion";
import { format } from "date-fns";
import { downloadCSV } from "@/lib/utils/export-utils";

interface TransactionTableProps {
  transactions: any[];
  total: number;
}

export function TransactionTable({ transactions, total }: TransactionTableProps) {
  const handleExport = () => {
    const headers = ["ID", "Attendee", "Email", "Event", "TicketType", "Amount", "Status", "Date"];
    const data = transactions.map(tx => ({
      ID: tx._id,
      Attendee: tx.attendeeInfo?.name || 'Anonymous',
      Email: tx.attendeeInfo?.email || 'N/A',
      Event: tx.event?.title || 'Unknown',
      TicketType: tx.ticketType,
      Amount: tx.totalAmount,
      Status: tx.paymentStatus,
      Date: format(new Date(tx.createdAt), 'yyyy-MM-dd HH:mm')
    }));
    downloadCSV("transactions.csv", headers, data);
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/10';
      case 'refunded':
        return 'bg-rose-500/10 text-rose-600 border-rose-500/10';
      case 'pending':
        return 'bg-amber-500/10 text-amber-600 border-amber-500/10';
      default:
        return 'bg-surface-container-high text-on-surface-variant border-outline-variant/10';
    }
  };

  return (
    <div className="bg-surface-container-lowest rounded-[2.5rem] border border-outline-variant/10 shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden">
      <div className="p-8 border-b border-outline-variant/5 flex items-center justify-between bg-surface-container-low/20">
        <div>
          <h3 className="text-xl font-black text-on-surface tracking-tight font-headline">Transaction Ledger</h3>
          <p className="text-xs text-on-surface-variant font-medium">Chronological record of all platform activities</p>
        </div>
        <button 
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-container-high hover:bg-surface-container-highest transition-colors text-[10px] font-bold uppercase tracking-widest text-on-surface-variant"
        >
          <span className="material-symbols-outlined text-sm">download</span>
          Export CSV
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low/30">
              <th className="px-8 py-5 text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Transaction ID</th>
              <th className="px-6 py-5 text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Client Identity</th>
              <th className="px-6 py-5 text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Context / Event</th>
              <th className="px-6 py-5 text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Amount</th>
              <th className="px-6 py-5 text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Status</th>
              <th className="px-8 py-5 text-[10px] font-black text-on-surface-variant uppercase tracking-widest text-right">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/5">
            {transactions.map((tx, idx) => (
              <motion.tr 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                key={tx._id} 
                className="hover:bg-primary/[0.02] transition-colors group"
              >
                <td className="px-8 py-6">
                  <span className="font-mono text-[10px] text-on-surface-variant group-hover:text-primary transition-colors">
                    TXN-{tx._id.substring(tx._id.length - 8).toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-black text-primary uppercase">
                      {tx.attendeeInfo?.name ? tx.attendeeInfo.name[0] : 'U'}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-on-surface">{tx.attendeeInfo?.name || 'Anonymous'}</p>
                      <p className="text-[10px] text-on-surface-variant font-medium">{tx.attendeeInfo?.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-6">
                  <p className="text-sm font-bold text-on-surface max-w-[200px] truncate">{tx.event?.title || 'Unknown Event'}</p>
                  <p className="text-[10px] text-primary font-bold uppercase tracking-wider">{tx.ticketType}</p>
                </td>
                <td className="px-6 py-6 font-black text-on-surface">
                  ${tx.totalAmount.toLocaleString()}
                </td>
                <td className="px-6 py-6">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusStyles(tx.paymentStatus)}`}>
                    {tx.paymentStatus}
                  </span>
                </td>
                <td className="px-8 py-6 text-right text-xs font-semibold text-on-surface-variant">
                  {format(new Date(tx.createdAt), 'MMM d, HH:mm')}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="p-8 bg-surface-container-low/20 flex items-center justify-between border-t border-outline-variant/10">
        <p className="text-xs font-medium text-on-surface-variant">
          Showing <span className="text-on-surface font-bold">{transactions.length}</span> of <span className="text-on-surface font-bold">{total}</span> records
        </p>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-xl bg-surface-container-high text-[10px] font-bold uppercase tracking-widest text-on-surface-variant hover:bg-surface-container-highest transition-all opacity-50 cursor-not-allowed">Previous</button>
          <button className="px-4 py-2 rounded-xl bg-surface-container-high text-[10px] font-bold uppercase tracking-widest text-on-surface-variant hover:bg-surface-container-highest transition-all">Next Page</button>
        </div>
      </div>
    </div>
  );
}
