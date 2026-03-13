export default function BudgetExpenseTrackerPage() {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
        {/* Navigation */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-4 lg:px-20 sticky top-0 z-50">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center rounded-lg bg-primary p-2 text-white shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined">account_balance_wallet</span>
            </div>
            <h1 className="text-xl font-black tracking-tight">Luxury Events <span className="text-primary">Finance</span></h1>
          </div>
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-8">
                <a className="text-sm font-bold text-primary border-b-2 border-primary pb-1" href="#">Overview</a>
                <a className="text-sm font-medium text-slate-500 hover:text-primary transition-colors" href="#">Ledger</a>
                <a className="text-sm font-medium text-slate-500 hover:text-primary transition-colors" href="#">Reports</a>
            </nav>
            <div className="flex items-center gap-4">
                <button className="flex items-center justify-center rounded-full p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors">
                    <span className="material-symbols-outlined">search</span>
                </button>
                <button className="relative flex items-center justify-center rounded-full p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors">
                    <span className="material-symbols-outlined">notifications</span>
                    <span className="absolute top-2 right-2 flex h-2 w-2 rounded-full bg-red-500"></span>
                </button>
                <div className="h-9 w-9 overflow-hidden rounded-full border-2 border-primary/20">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWrkx6QxbrKrs83pKcVhOY04aAa2LlnpP174Y4rzfEv_K-gS4i8ncRo-XBWvYGGRemAvzive1s3ZbiTxhJnAIpLV_iP3G0c1Otb4D3AceXXOqM0XCL47fnf-hyW9SyNLdgicoQF7XyfB6EE24vc7FfTgrc74J4yGbZ_MnOCnBGUBbV2_HZ9P4wxMkEjBcEAgW66n2OCwYZfl6qtuIqcVmk8kK3vsWU1XRo5CEmf7uvHLHFHo3IXM7e_LMAYzaAiVyUqs_yd2-wry6I" alt="Avatar" />
                </div>
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-7xl px-4 py-8 lg:px-10 space-y-8">
          {/* Dashboard Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Budget</p>
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <span className="material-symbols-outlined text-[20px]">payments</span>
                </div>
              </div>
              <p className="text-3xl font-black leading-tight tracking-tighter">$450,000.00</p>
              <div className="mt-2 flex items-center gap-1 text-xs font-bold text-emerald-600">
                <span className="material-symbols-outlined text-xs">trending_up</span>
                <span>+12.5% from last event</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Spent</p>
                <div className="p-2 bg-amber-500/10 rounded-lg text-amber-600">
                    <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
                </div>
              </div>
              <p className="text-3xl font-black leading-tight tracking-tighter">$312,450.00</p>
              <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                <div className="h-full bg-primary" style={{ width: '69%' }}></div>
              </div>
              <p className="text-[10px] text-slate-400 font-bold mt-2">69% OF ALLOCATED FUNDS</p>
            </div>

            <div className="flex flex-col gap-2 rounded-2xl border border-primary/20 bg-primary/5 p-6 shadow-sm hover:shadow-md transition-shadow lg:col-span-1">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-bold text-primary uppercase tracking-widest">Remaining Balance</p>
                <div className="p-2 bg-primary text-white rounded-lg">
                    <span className="material-symbols-outlined text-[20px]">savings</span>
                </div>
              </div>
              <p className="text-3xl font-black leading-tight tracking-tighter text-primary">$137,550.00</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-2">31% of total budget available</p>
            </div>
          </div>

          {/* Alert Notification */}
          <div className="group relative">
            <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-red-200 bg-red-50/50 dark:bg-red-900/10 dark:border-red-900/30 p-6 lg:flex-row lg:items-center overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-red-500"></div>
              <div className="flex items-center gap-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500 text-white shadow-lg shadow-red-500/20">
                  <span className="material-symbols-outlined">warning</span>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-lg font-black text-slate-900 dark:text-slate-100 tracking-tight">Urgent Payment Alert</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Catering final installment of <span className="font-bold text-red-600">$45,000</span> is due in 48 hours for the Gala Premiere.</p>
                </div>
              </div>
              <div className="flex gap-3 w-full lg:w-auto">
                <button className="flex-1 lg:flex-none rounded-xl px-6 py-3 text-sm font-bold text-slate-500 hover:bg-slate-100 transition-colors">Dismiss</button>
                <button className="flex-1 lg:flex-none rounded-xl bg-red-500 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-red-500/20 hover:bg-red-600 active:scale-95 transition-all">Review & Pay</button>
              </div>
            </div>
          </div>

          {/* Allocation Chart & Detailed Stats */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Budget Allocation Bars */}
            <div className="col-span-1 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-sm lg:col-span-2">
              <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-xl font-black tracking-tight">Budget Allocation</h2>
                <select className="rounded-xl border-slate-200 bg-slate-50 px-4 py-2 text-sm font-bold dark:border-slate-700 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-primary/20">
                  <option>Annual Gala 2024</option>
                  <option>Tech Summit NYC</option>
                </select>
              </div>
              <div className="flex h-64 items-end justify-between gap-4 px-2 sm:px-6">
                <div className="flex flex-1 flex-col items-center gap-4 group">
                  <div className="w-full rounded-t-xl bg-primary shadow-lg group-hover:bg-primary/80 transition-all cursor-pointer relative" style={{ height: '85%' }}>
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity font-bold">$180k</div>
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Venue</span>
                </div>
                <div className="flex flex-1 flex-col items-center gap-4 group">
                  <div className="w-full rounded-t-xl bg-primary/70 shadow-lg group-hover:bg-primary/60 transition-all cursor-pointer relative" style={{ height: '45%' }}>
                     <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity font-bold">$95k</div>
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Staff</span>
                </div>
                <div className="flex flex-1 flex-col items-center gap-4 group">
                  <div className="w-full rounded-t-xl bg-primary/50 shadow-lg group-hover:bg-primary/40 transition-all cursor-pointer relative" style={{ height: '65%' }}>
                     <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity font-bold">$115k</div>
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Catering</span>
                </div>
                <div className="flex flex-1 flex-col items-center gap-4 group">
                  <div className="w-full rounded-t-xl bg-primary/30 shadow-lg group-hover:bg-primary/20 transition-all cursor-pointer relative" style={{ height: '35%' }}>
                     <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity font-bold">$42k</div>
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Vendors</span>
                </div>
                <div className="flex flex-1 flex-col items-center gap-4 group">
                  <div className="w-full rounded-t-xl bg-primary/20 shadow-lg group-hover:bg-primary/10 transition-all cursor-pointer relative" style={{ height: '20%' }}>
                     <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity font-bold">$18k</div>
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Other</span>
                </div>
              </div>
            </div>

            {/* Distribution Legend */}
            <div className="col-span-1 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-sm">
              <h2 className="mb-8 text-xl font-black tracking-tight">Quick Breakdown</h2>
              <div className="space-y-6">
                <div className="group cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                            <div className="h-4 w-4 rounded-full bg-primary shadow-sm shadow-primary/30"></div>
                            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Venue & Decor</span>
                        </div>
                        <span className="text-sm font-black">$180,000</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-[40%]"></div>
                    </div>
                </div>
                <div className="group cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                            <div className="h-4 w-4 rounded-full bg-primary/70"></div>
                            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Staff & Security</span>
                        </div>
                        <span className="text-sm font-black">$95,000</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-primary/70 w-[21%]"></div>
                    </div>
                </div>
                <div className="group cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                            <div className="h-4 w-4 rounded-full bg-primary/50"></div>
                            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Catering Services</span>
                        </div>
                        <span className="text-sm font-black">$115,000</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-primary/50 w-[25%]"></div>
                    </div>
                </div>
                <div className="group cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                            <div className="h-4 w-4 rounded-full bg-primary/30"></div>
                            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Equipment Rentals</span>
                        </div>
                        <span className="text-sm font-black">$42,000</span>
                    </div>
                     <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-primary/30 w-[9%]"></div>
                    </div>
                </div>
                
                <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                  <button className="flex w-full items-center justify-center gap-2 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-sm font-bold text-primary hover:bg-primary/10 transition-all group">
                    <span>View Full Report</span>
                    <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Ledger Table */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
            <div className="flex flex-col items-start justify-between border-b border-slate-200 dark:border-slate-800 p-8 lg:flex-row lg:items-center gap-6">
              <div className="flex flex-col gap-1">
                <h2 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">Expense Ledger</h2>
                <p className="text-sm text-slate-500 font-medium">Detailed tracking of all financial transactions.</p>
              </div>
              <div className="flex flex-wrap gap-3 w-full lg:w-auto">
                <button className="flex flex-1 lg:flex-none items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800 transition-colors">
                  <span className="material-symbols-outlined text-sm">filter_list</span> Filter
                </button>
                <button className="flex flex-1 lg:flex-none items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800 transition-colors">
                  <span className="material-symbols-outlined text-sm">download</span> Export
                </button>
                <button className="flex flex-[2] lg:flex-none items-center justify-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/30 transition-all hover:opacity-90 active:scale-95">
                  <span className="material-symbols-outlined text-sm">add</span> Add Expense
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                  <tr>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Transaction Date</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Category</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Vendor / Description</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                    <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-widest text-slate-400">Amount</th>
                    <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-widest text-slate-400">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                    <td className="whitespace-nowrap px-8 py-5 text-sm font-bold text-slate-900 dark:text-slate-100">Oct 24, 2023</td>
                    <td className="px-8 py-5">
                        <span className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase">Venue</span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-900 dark:text-slate-100">The Grand Plaza Hotel</span>
                        <span className="text-xs text-slate-500 font-medium">Main Ballroom Reservation</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                          <span className="size-1.5 rounded-full bg-emerald-500"></span>
                          Paid
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-8 py-5 text-right text-sm font-black text-slate-900 dark:text-slate-100 tracking-tight">$125,000.00</td>
                    <td className="px-8 py-5 text-right">
                      <button className="text-slate-300 hover:text-primary transition-colors cursor-pointer group-hover:text-slate-400"><span className="material-symbols-outlined">more_horiz</span></button>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                    <td className="whitespace-nowrap px-8 py-5 text-sm font-bold text-slate-900 dark:text-slate-100">Oct 26, 2023</td>
                    <td className="px-8 py-5">
                        <span className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase">Catering</span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-900 dark:text-slate-100">Artisan Kitchens</span>
                        <span className="text-xs text-slate-500 font-medium">5-Course Tasting Menu Deposit</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 dark:bg-amber-900/20 px-3 py-1 text-xs font-bold text-amber-600 dark:text-amber-400">
                        <span className="size-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                        Pending
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-8 py-5 text-right text-sm font-black text-slate-900 dark:text-slate-100 tracking-tight">$22,500.00</td>
                    <td className="px-8 py-5 text-right">
                      <button className="text-slate-300 hover:text-primary transition-colors cursor-pointer group-hover:text-slate-400"><span className="material-symbols-outlined">more_horiz</span></button>
                    </td>
                  </tr>
                   <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                    <td className="whitespace-nowrap px-8 py-5 text-sm font-bold text-slate-900 dark:text-slate-100">Oct 28, 2023</td>
                    <td className="px-8 py-5">
                        <span className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase">Staff</span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-900 dark:text-slate-100">SecureTrust Protection</span>
                        <span className="text-xs text-slate-500 font-medium">Event Security Personnel</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                          <span className="size-1.5 rounded-full bg-emerald-500"></span>
                          Paid
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-8 py-5 text-right text-sm font-black text-slate-900 dark:text-slate-100 tracking-tight">$14,200.00</td>
                    <td className="px-8 py-5 text-right">
                      <button className="text-slate-300 hover:text-primary transition-colors cursor-pointer group-hover:text-slate-400"><span className="material-symbols-outlined">more_horiz</span></button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="border-t border-slate-100 dark:border-slate-800 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">Showing 3 of 28 transactions</span>
              <div className="flex gap-2">
                <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-500 hover:text-primary hover:border-primary transition-all shadow-sm">
                  <span className="material-symbols-outlined text-sm">chevron_left</span>
                </button>
                <div className="flex items-center px-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-black">1 of 7</div>
                <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-500 hover:text-primary hover:border-primary transition-all shadow-sm">
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </main>
        
        {/* Footer */}
        <footer className="mt-12 py-12 px-6 text-center border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-4">EventPro Financial Systems</p>
          <p className="text-xs text-slate-500 font-medium">© 2024 Luxury Events Finance Management System. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
