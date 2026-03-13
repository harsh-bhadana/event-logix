export default function VendorManagementPage() {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
      <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          {/* Top Navigation Bar */}
          <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 lg:px-10 py-3 sticky top-0 z-50">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3 text-primary">
                <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
                  <span className="material-symbols-outlined">event_available</span>
                </div>
                <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight">EventVendor Pro</h2>
              </div>
              <nav className="hidden md:flex items-center gap-6">
                <a className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-sm font-medium transition-colors" href="#">Dashboard</a>
                <a className="text-primary text-sm font-bold border-b-2 border-primary pb-1" href="#">Vendors</a>
                <a className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-sm font-medium transition-colors" href="#">Contracts</a>
                <a className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-sm font-medium transition-colors" href="#">Payments</a>
              </nav>
            </div>
            <div className="flex flex-1 justify-end gap-4 items-center">
              <label className="hidden sm:flex flex-col min-w-40 h-10 max-w-64">
                <div className="flex w-full flex-1 items-stretch rounded-lg h-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <div className="text-slate-500 dark:text-slate-400 flex items-center justify-center pl-3">
                    <span className="material-symbols-outlined text-[20px]">search</span>
                  </div>
                  <input className="form-input w-full border-none bg-transparent focus:ring-0 text-sm placeholder:text-slate-500" placeholder="Search vendors..." />
                </div>
              </label>
              <button className="text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 p-2 rounded-full transition-colors">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <div 
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-slate-200 dark:border-slate-700" 
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB1WUT_8P7Lif9lv6iqOdHRSbjjqhSnO2XVSvePgVuGJbfhkNOi9hAy7ml7l8kUPpTrIqKD_t4BFUpei00Xobur4yZ2bhviVWZbmVUy5w1WcDrMdo-n6inCD_EG60KBfwAZLbpN0lURJFX6x11sCVBOgvTCclZrK1G_VUP2MarXxuj-yhtIzyVCZj8mMS4Rh1AENkoCVYq8MAiOqsZuxZ04fxzbgkWb3NqxY43kMNeqKYsrA66sJhI2HXHCjMvZrvKxT8-zAJ5iDQjE")' }}
              ></div>
            </div>
          </header>
          <div className="flex flex-1 flex-col lg:flex-row">
            {/* Sidebar Sidebar */}
            <aside className="w-full lg:w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-4 shrink-0">
              <div className="flex flex-col gap-6">
                <div className="px-3">
                  <h1 className="text-slate-900 dark:text-white text-base font-bold">Alex Thompson</h1>
                  <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">Senior Event Director</p>
                </div>
                <div className="flex flex-col gap-1">
                  <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" href="#">
                    <span className="material-symbols-outlined">dashboard</span>
                    <span className="text-sm font-semibold">Overview</span>
                  </a>
                  <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary transition-colors" href="#">
                    <span className="material-symbols-outlined">groups</span>
                    <span className="text-sm font-semibold">Vendors</span>
                  </a>
                  <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" href="#">
                    <span className="material-symbols-outlined">calendar_month</span>
                    <span className="text-sm font-semibold">Schedules</span>
                  </a>
                  <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" href="#">
                    <span className="material-symbols-outlined">account_balance_wallet</span>
                    <span className="text-sm font-semibold">Financials</span>
                  </a>
                  <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" href="#">
                    <span className="material-symbols-outlined">description</span>
                    <span className="text-sm font-semibold">Documents</span>
                  </a>
                </div>
                <hr className="border-slate-200 dark:border-slate-800 mx-3" />
                <div className="flex flex-col gap-1">
                  <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em] mb-2">Recent Projects</p>
                  <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-primary text-sm font-medium" href="#">
                    <span className="size-2 rounded-full bg-emerald-500"></span>
                    Tech Summit 2024
                  </a>
                  <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-primary text-sm font-medium" href="#">
                    <span className="size-2 rounded-full bg-blue-500"></span>
                    Gala Charity Night
                  </a>
                </div>
              </div>
            </aside>
            {/* Main Content */}
            <main className="flex-1 bg-background-light dark:bg-background-dark p-6 lg:p-8 overflow-y-auto">
              <div className="max-w-6xl mx-auto flex flex-col gap-8">
                {/* Page Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <h2 className="text-slate-900 dark:text-white text-3xl font-black leading-tight tracking-tight">Vendor Management</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Manage partners, contracts, and payment milestones across all active events.</p>
                  </div>
                  <button className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-primary/20">
                    <span className="material-symbols-outlined text-[20px]">add</span>
                    Add New Vendor
                  </button>
                </div>
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase">Total Vendors</span>
                      <span className="text-primary material-symbols-outlined">hub</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-slate-900 dark:text-white">42</span>
                      <span className="text-emerald-500 text-xs font-bold">+4 this month</span>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase">Active Contracts</span>
                      <span className="text-amber-500 material-symbols-outlined">contract_edit</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-slate-900 dark:text-white">18</span>
                      <span className="text-slate-500 text-xs font-medium">6 Pending Review</span>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase">Upcoming Payments</span>
                      <span className="text-emerald-500 material-symbols-outlined">payments</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-slate-900 dark:text-white">$12,450</span>
                      <span className="text-slate-500 text-xs font-medium">Due in 7 days</span>
                    </div>
                  </div>
                </div>
                {/* Tabs & Content */}
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                  <div className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 px-6 overflow-x-auto">
                    <div className="flex gap-8">
                      <button className="border-b-2 border-primary text-primary py-4 text-sm font-bold flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">restaurant</span> Catering
                      </button>
                      <button className="border-b-2 border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 py-4 text-sm font-bold flex items-center gap-2 transition-colors">
                        <span className="material-symbols-outlined text-[18px]">party_mode</span> Decor
                      </button>
                      <button className="border-b-2 border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 py-4 text-sm font-bold flex items-center gap-2 transition-colors">
                        <span className="material-symbols-outlined text-[18px]">theater_comedy</span> Entertainment
                      </button>
                      <button className="border-b-2 border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 py-4 text-sm font-bold flex items-center gap-2 transition-colors">
                        <span className="material-symbols-outlined text-[18px]">photo_camera</span> Photography
                      </button>
                    </div>
                  </div>
                  <div className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="bg-slate-50/30 dark:bg-slate-800/30">
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Vendor & Contact</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 hidden sm:table-cell">Contact Person</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Status</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Next Payment</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-right">Amount</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                          {/* Vendor Row 1 */}
                          <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                            <td className="px-6 py-5">
                              <div className="flex items-center gap-3">
                                <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">GD</div>
                                <div className="flex flex-col">
                                  <span className="text-sm font-bold text-slate-900 dark:text-white">Gourmet Delights</span>
                                  <span className="text-xs text-slate-500">orders@gourmet.co</span>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-5 hidden sm:table-cell">
                              <div className="text-sm font-medium text-slate-700 dark:text-slate-300">Sarah Jenkins</div>
                              <div className="text-[11px] text-slate-500">Lead Coordinator</div>
                            </td>
                            <td className="px-6 py-5">
                              <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                                <span className="size-1.5 rounded-full bg-emerald-500"></span>
                                Active
                              </span>
                            </td>
                            <td className="px-6 py-5">
                              <div className="text-sm text-slate-700 dark:text-slate-300">Oct 15, 2024</div>
                              <div className="text-[11px] font-bold text-primary">Deposit Due</div>
                            </td>
                            <td className="px-6 py-5 text-right font-bold text-slate-900 dark:text-white text-sm">
                              $2,500.00
                            </td>
                            <td className="px-6 py-5 text-right">
                              <button className="text-slate-400 hover:text-primary transition-colors">
                                <span className="material-symbols-outlined">more_vert</span>
                              </button>
                            </td>
                          </tr>
                          {/* Vendor Row 2 */}
                          <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                            <td className="px-6 py-5">
                              <div className="flex items-center gap-3">
                                <div className="size-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-600 font-bold">ES</div>
                                <div className="flex flex-col">
                                  <span className="text-sm font-bold text-slate-900 dark:text-white">Elite Sound & Light</span>
                                  <span className="text-xs text-slate-500">hello@elitesound.com</span>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-5 hidden sm:table-cell">
                              <div className="text-sm font-medium text-slate-700 dark:text-slate-300">Mark Thompson</div>
                              <div className="text-[11px] text-slate-500">Technical Director</div>
                            </td>
                            <td className="px-6 py-5">
                              <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-xs font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                                <span className="size-1.5 rounded-full bg-amber-500"></span>
                                Pending
                              </span>
                            </td>
                            <td className="px-6 py-5">
                              <div className="text-sm text-slate-700 dark:text-slate-300">Oct 20, 2024</div>
                              <div className="text-[11px] font-bold text-slate-400">Review Required</div>
                            </td>
                            <td className="px-6 py-5 text-right font-bold text-slate-900 dark:text-white text-sm">
                              $1,200.00
                            </td>
                            <td className="px-6 py-5 text-right">
                              <button className="text-slate-400 hover:text-primary transition-colors">
                                <span className="material-symbols-outlined">more_vert</span>
                              </button>
                            </td>
                          </tr>
                          {/* Vendor Row 3 */}
                          <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                            <td className="px-6 py-5">
                              <div className="flex items-center gap-3">
                                <div className="size-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-600 font-bold">FF</div>
                                <div className="flex flex-col">
                                  <span className="text-sm font-bold text-slate-900 dark:text-white">Floral Fantasy</span>
                                  <span className="text-xs text-slate-500">info@floralfantasy.biz</span>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-5 hidden sm:table-cell">
                              <div className="text-sm font-medium text-slate-700 dark:text-slate-300">Elena Rodriguez</div>
                              <div className="text-[11px] text-slate-500">Owner</div>
                            </td>
                            <td className="px-6 py-5">
                              <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                                <span className="size-1.5 rounded-full bg-blue-500"></span>
                                Completed
                              </span>
                            </td>
                            <td className="px-6 py-5">
                              <div className="text-sm text-slate-700 dark:text-slate-300">N/A</div>
                              <div className="text-[11px] font-bold text-emerald-500">Fully Paid</div>
                            </td>
                            <td className="px-6 py-5 text-right font-bold text-slate-900 dark:text-white text-sm">
                              $3,000.00
                            </td>
                            <td className="px-6 py-5 text-right">
                              <button className="text-slate-400 hover:text-primary transition-colors">
                                <span className="material-symbols-outlined">more_vert</span>
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="px-6 py-4 bg-slate-50/50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <p className="text-xs text-slate-500 font-medium">Showing 3 of 42 vendors</p>
                      <div className="flex gap-2">
                        <button className="px-3 py-1 text-xs font-bold border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800">Previous</button>
                        <button className="px-3 py-1 text-xs font-bold border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800">Next</button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Secondary Grid: Notifications & Calendar */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Recent Activity */}
                  <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
                    <h3 className="text-slate-900 dark:text-white text-lg font-bold mb-6 flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary">history</span> Recent Activity
                    </h3>
                    <div className="flex flex-col gap-6">
                      <div className="flex gap-4">
                        <div className="size-8 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-emerald-600 text-[18px]">verified</span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <p className="text-sm text-slate-700 dark:text-slate-300">Contract signed with <span className="font-bold text-slate-900 dark:text-white">Gourmet Delights</span></p>
                          <span className="text-xs text-slate-500">2 hours ago</span>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="size-8 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-amber-600 text-[18px]">priority_high</span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <p className="text-sm text-slate-700 dark:text-slate-300">Payment reminder sent to <span className="font-bold text-slate-900 dark:text-white">Elite Sound</span></p>
                          <span className="text-xs text-slate-500">5 hours ago</span>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="size-8 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-blue-600 text-[18px]">person_add</span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <p className="text-sm text-slate-700 dark:text-slate-300">New vendor added: <span className="font-bold text-slate-900 dark:text-white">Starlight Visuals</span></p>
                          <span className="text-xs text-slate-500">Yesterday</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Calendar Peek */}
                  <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
                    <h3 className="text-slate-900 dark:text-white text-lg font-bold mb-6 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">event</span> October 2024
                      </div>
                      <a className="text-xs text-primary font-bold" href="#">View Full Calendar</a>
                    </h3>
                    <div className="grid grid-cols-7 gap-2 mb-4">
                      <div className="text-center text-[10px] font-bold text-slate-400">M</div>
                      <div className="text-center text-[10px] font-bold text-slate-400">T</div>
                      <div className="text-center text-[10px] font-bold text-slate-400">W</div>
                      <div className="text-center text-[10px] font-bold text-slate-400">T</div>
                      <div className="text-center text-[10px] font-bold text-slate-400">F</div>
                      <div className="text-center text-[10px] font-bold text-slate-400">S</div>
                      <div className="text-center text-[10px] font-bold text-slate-400">S</div>
                      <div className="h-8 flex items-center justify-center text-xs text-slate-400">28</div>
                      <div className="h-8 flex items-center justify-center text-xs text-slate-400">29</div>
                      <div className="h-8 flex items-center justify-center text-xs text-slate-400">30</div>
                      <div className="h-8 flex items-center justify-center text-xs text-slate-900 dark:text-white font-bold bg-primary/10 rounded-lg">1</div>
                      <div className="h-8 flex items-center justify-center text-xs text-slate-900 dark:text-white font-bold">2</div>
                      <div className="h-8 flex items-center justify-center text-xs text-slate-900 dark:text-white font-bold">3</div>
                      <div className="h-8 flex items-center justify-center text-xs text-slate-900 dark:text-white font-bold">4</div>
                      <div className="h-8 flex items-center justify-center text-xs text-slate-900 dark:text-white font-bold">5</div>
                      <div className="h-8 flex items-center justify-center text-xs text-slate-900 dark:text-white font-bold">6</div>
                      <div className="h-8 flex items-center justify-center text-xs text-slate-900 dark:text-white font-bold bg-amber-500/20 text-amber-700 dark:text-amber-400 rounded-lg">7</div>
                      <div className="h-8 flex items-center justify-center text-xs text-slate-900 dark:text-white font-bold">8</div>
                      <div className="h-8 flex items-center justify-center text-xs text-slate-900 dark:text-white font-bold">9</div>
                      <div className="h-8 flex items-center justify-center text-xs text-slate-900 dark:text-white font-bold">10</div>
                      <div className="h-8 flex items-center justify-center text-xs text-slate-900 dark:text-white font-bold">11</div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg border-l-4 border-amber-500">
                      <p className="text-xs font-bold text-slate-900 dark:text-white">Upcoming Milestone</p>
                      <p className="text-[11px] text-slate-500">Catering Final Tasting - Tech Summit 2024</p>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
