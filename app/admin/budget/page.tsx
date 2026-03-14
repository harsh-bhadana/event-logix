import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Badge from "@/components/ui/Badge";
import { Select } from "@/components/ui/Input";

export default function BudgetExpenseTrackerPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">Financial Overview</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Track and manage event budgets, expenses, and ledger.</p>
          </div>
          <div className="flex gap-3">
             <Button variant="outline">
              <Icon name="download" className="text-lg" />
              Reports
            </Button>
            <Button>
              <Icon name="add" className="text-lg" />
              New Entry
            </Button>
          </div>
        </div>

        {/* Dashboard Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Budget</p>
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <Icon name="payments" className="text-[20px]" />
              </div>
            </div>
            <p className="text-3xl font-black leading-tight tracking-tighter text-slate-900 dark:text-white">$450,000.00</p>
            <div className="mt-2 flex items-center gap-1 text-xs font-bold text-emerald-600">
              <Icon name="trending_up" className="text-xs" />
              <span>+12.5% from last event</span>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Spent</p>
              <div className="p-2 bg-amber-500/10 rounded-lg text-amber-600">
                <Icon name="shopping_cart" className="text-[20px]" />
              </div>
            </div>
            <p className="text-3xl font-black leading-tight tracking-tighter text-slate-900 dark:text-white">$312,450.00</p>
            <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div className="h-full bg-primary" style={{ width: '69%' }}></div>
            </div>
            <p className="text-[10px] text-slate-400 font-bold mt-2 uppercase">69% of allocated funds</p>
          </Card>

          <Card className="border-primary/20 bg-primary/5">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-bold text-primary uppercase tracking-widest">Remaining Balance</p>
              <div className="p-2 bg-primary text-white rounded-lg">
                <Icon name="savings" className="text-[20px]" />
              </div>
            </div>
            <p className="text-3xl font-black leading-tight tracking-tighter text-primary">$137,550.00</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-2">31% of total budget available</p>
          </Card>
        </div>

        {/* Alert Notification */}
        <div className="relative overflow-hidden rounded-2xl border border-red-200 bg-red-50/50 dark:bg-red-900/10 dark:border-red-900/30 p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-red-500"></div>
          <div className="flex items-center gap-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500 text-white shadow-lg shadow-red-500/20">
              <Icon name="warning" />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-lg font-black text-slate-900 dark:text-slate-100 tracking-tight">Urgent Payment Alert</p>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Catering final installment of <span className="font-bold text-red-600">$45,000</span> is due in 48 hours.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" size="sm">Dismiss</Button>
            <Button variant="danger" size="sm" className="shadow-lg shadow-red-500/20">Review & Pay</Button>
          </div>
        </div>

        {/* Allocation Chart & Detailed Stats */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Budget Allocation Bars */}
          <Card className="lg:col-span-2">
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">Budget Allocation</h2>
              <Select defaultValue="Annual Gala 2024" className="w-full sm:w-auto">
                <option>Annual Gala 2024</option>
                <option>Tech Summit NYC</option>
              </Select>
            </div>
            <div className="flex h-64 items-end justify-between gap-4 px-2 sm:px-6">
              {[
                { label: "Venue", height: "85%", amount: "$180k" },
                { label: "Staff", height: "45%", amount: "$95k", opacity: "opacity-70" },
                { label: "Catering", height: "65%", amount: "$115k", opacity: "opacity-50" },
                { label: "Vendors", height: "35%", amount: "$42k", opacity: "opacity-30" },
                { label: "Other", height: "20%", amount: "$18k", opacity: "opacity-20" },
              ].map((item, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-4 group">
                  <div className={`w-full rounded-t-xl bg-primary shadow-lg group-hover:bg-primary/80 transition-all cursor-pointer relative ${item.opacity || ''}`} style={{ height: item.height }}>
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity font-bold whitespace-nowrap">{item.amount}</div>
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Distribution Legend */}
          <Card>
            <h2 className="mb-8 text-xl font-black tracking-tight text-slate-900 dark:text-white">Quick Breakdown</h2>
            <div className="space-y-6">
              {[
                { label: "Venue & Decor", amount: "$180,000", progress: "w-[40%]", opacity: "" },
                { label: "Staff & Security", amount: "$95,000", progress: "w-[21%]", opacity: "opacity-70" },
                { label: "Catering Services", amount: "$115,000", progress: "w-[25%]", opacity: "opacity-50" },
                { label: "Equipment Rentals", amount: "$42,000", progress: "w-[9%]", opacity: "opacity-30" },
              ].map((item, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`h-4 w-4 rounded-full bg-primary shadow-sm shadow-primary/30 ${item.opacity}`}></div>
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{item.label}</span>
                    </div>
                    <span className="text-sm font-black text-slate-900 dark:text-white">{item.amount}</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full bg-primary ${item.progress} ${item.opacity}`}></div>
                  </div>
                </div>
              ))}
              
              <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                <Button variant="ghost" className="w-full">
                  View Full Report
                  <Icon name="arrow_forward" className="text-sm group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Ledger Table */}
        <Card noPadding>
          <div className="flex flex-col items-start justify-between border-b border-slate-200 dark:border-slate-800 p-8 lg:flex-row lg:items-center gap-6">
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">Expense Ledger</h2>
              <p className="text-sm text-slate-500 font-medium">Detailed tracking of all financial transactions.</p>
            </div>
            <div className="flex flex-wrap gap-3 w-full lg:w-auto">
              <Button variant="outline">
                <Icon name="filter_list" className="text-sm" /> Filter
              </Button>
              <Button variant="outline">
                <Icon name="download" className="text-sm" /> Export
              </Button>
              <Button className="shadow-lg shadow-primary/30">
                <Icon name="add" className="text-sm" /> Add Expense
              </Button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                <tr>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Date</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Category</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Description</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                  <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-widest text-slate-400">Amount</th>
                  <th className="px-8 py-5"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {[
                  { date: "Oct 24, 2023", cat: "Venue", title: "The Grand Plaza Hotel", desc: "Main Ballroom Reservation", status: "Paid", amount: "$125,000.00" },
                  { date: "Oct 26, 2023", cat: "Catering", title: "Artisan Kitchens", desc: "5-Course Tasting Menu Deposit", status: "Pending", amount: "$22,500.00" },
                  { date: "Oct 28, 2023", cat: "Staff", title: "SecureTrust Protection", desc: "Event Security Personnel", status: "Paid", amount: "$14,200.00" },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                    <td className="whitespace-nowrap px-8 py-5 text-sm font-bold text-slate-900 dark:text-slate-100">{row.date}</td>
                    <td className="px-8 py-5">
                      <Badge className="uppercase text-[10px] tracking-tight">{row.cat}</Badge>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-900 dark:text-slate-100">{row.title}</span>
                        <span className="text-xs text-slate-500 font-medium">{row.desc}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <Badge variant={row.status === 'Paid' ? 'success' : 'warning'}>
                        {row.status}
                      </Badge>
                    </td>
                    <td className="whitespace-nowrap px-8 py-5 text-right text-sm font-black text-slate-900 dark:text-slate-100 tracking-tight">{row.amount}</td>
                    <td className="px-8 py-5 text-right">
                      <Button variant="ghost" size="icon" className="text-slate-300">
                        <Icon name="more_horiz" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-t border-slate-100 dark:border-slate-800 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-500 font-bold uppercase tracking-widest text-[10px]">Showing 3 of 28 transactions</span>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="h-9 w-9">
                <Icon name="chevron_left" className="text-sm" />
              </Button>
              <div className="flex items-center px-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-black">1 of 7</div>
              <Button variant="outline" size="icon" className="h-9 w-9">
                <Icon name="chevron_right" className="text-sm" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
