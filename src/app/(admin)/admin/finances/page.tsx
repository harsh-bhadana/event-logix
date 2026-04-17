import { getFinancialSummary, getRevenueTrends, getRecentTransactions } from "@/lib/actions/finance-actions";
import { FinanceStats } from "@/components/admin/finances/FinanceStats";
import { RevenueChart } from "@/components/admin/finances/RevenueChart";
import { TransactionTable } from "@/components/admin/finances/TransactionTable";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";

export const metadata = {
  title: "Financial Ledger | Event Logix Admin",
  description: "Comprehensive financial oversight and revenue analytics.",
};

export default async function FinancePage() {
  const session = await getSession();

  if (!session?.user || session.user.role !== 'admin') {
    redirect('/login?callbackUrl=/admin/finances');
  }

  const [summaryRes, trendsRes, txRes] = await Promise.all([
    getFinancialSummary(),
    getRevenueTrends(),
    getRecentTransactions(10)
  ]);

  if (!summaryRes.success || !trendsRes.success || !txRes.success) {
    return (
      <div className="p-10 flex items-center justify-center min-h-[60vh]">
        <div className="text-center p-12 bg-surface-container-low rounded-3xl border border-outline-variant/10 max-w-md">
           <span className="material-symbols-outlined text-4xl text-error mb-4">error</span>
           <h2 className="text-xl font-bold text-on-surface mb-2">Financial Nexus Offline</h2>
           <p className="text-sm text-on-surface-variant font-medium">
             We encountered an error while synthesizing your financial data. Please verify your connection to the intelligence cluster.
           </p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-10 py-10 space-y-10 animate-in fade-in duration-1000">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            Real-time Finance Ledger
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-on-surface font-headline leading-tight">
            Financial Oversight
          </h1>
          <p className="mt-2 text-on-surface-variant font-medium font-body max-w-xl opacity-80">
            Monitor revenue streams, unit sales, and transaction integrity across your entire event portfolio from a single command interface.
          </p>
        </div>
        <div className="flex gap-3">
           <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-surface-container-lowest text-on-surface border border-outline-variant/10 text-sm font-bold shadow-sm hover:shadow-md transition-all active:scale-95">
             <span className="material-symbols-outlined text-sm">event</span>
             Last 30 Days
           </button>
           <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-primary to-primary-dim text-on-primary text-sm font-bold shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all active:scale-95">
             <span className="material-symbols-outlined text-sm">add_card</span>
             New Payout
           </button>
        </div>
      </div>

      {/* Primary Metrics Layer */}
      <FinanceStats summary={summaryRes.data} />

      {/* Analytics & History Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
          <RevenueChart data={trendsRes.data} />
        </div>
        <div className="bg-surface-container-low/40 rounded-[2.5rem] p-8 border border-outline-variant/10 flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-tertiary/10 flex items-center justify-center text-tertiary mb-2">
            <span className="material-symbols-outlined text-4xl">savings</span>
          </div>
          <h3 className="text-xl font-black text-on-surface tracking-tight font-headline">Pending Settlement</h3>
          <p className="text-xs text-on-surface-variant font-medium leading-relaxed max-w-[200px]">
            Funds queued for direct deposit into your verified account. Next batch in 48 hours.
          </p>
          <div className="text-3xl font-black text-on-surface font-headline tracking-tighter">
            $4,280.00
          </div>
          <button className="w-full py-4 rounded-2xl bg-tertiary text-on-tertiary font-bold text-sm shadow-xl shadow-tertiary/10 hover:opacity-90 transition-all">
            Expedite Payout
          </button>
        </div>
      </div>

      {/* Detailed Ledger Section */}
      <TransactionTable transactions={txRes.data} />
    </div>
  );
}
