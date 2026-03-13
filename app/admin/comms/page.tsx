export default function CommsHubPage() {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
      <div className="relative flex h-screen w-full flex-col overflow-hidden">
        {/* Top Navigation Bar */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-3 z-20">
          <div className="flex items-center gap-4 text-primary">
            <div className="size-8 flex items-center justify-center bg-primary rounded-lg text-white">
              <span className="material-symbols-outlined">send_time_extension</span>
            </div>
            <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-tight">Staff Comms</h2>
          </div>
          <div className="flex flex-1 justify-end gap-6 items-center">
            <nav className="hidden md:flex items-center gap-8">
              <a className="text-slate-600 dark:text-slate-400 hover:text-primary text-sm font-medium transition-colors" href="#">Inbound</a>
              <a className="text-primary text-sm font-bold border-b-2 border-primary py-1" href="#">Broadcasts</a>
              <a className="text-slate-600 dark:text-slate-400 hover:text-primary text-sm font-medium transition-colors" href="#">Automations</a>
            </nav>
            <div className="flex items-center gap-4">
              <button className="flex size-10 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <div 
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-primary/20" 
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCHr9MIsxXgE0xunY30iExzY6T_oP6Bq8uV5wI0EIDyY7U_0P5Q8M5Q5M5Q5M5Q5M5Q5M5Q5M5Q5M5Q5M5Q5M5Q5M5Q5M5Q5M5Q5M5Q5M5Q5M5")' }}
              ></div>
            </div>
          </div>
        </header>
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <aside className="w-72 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col z-10">
            <div className="p-6">
              <button className="w-full bg-primary text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:opacity-90 active:scale-95 transition-all">
                <span className="material-symbols-outlined">add_comment</span>
                New Broadcast
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-8">
              {/* Quick Filters */}
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-3">Folders</p>
                <div className="space-y-1">
                  <a className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary font-bold transition-colors" href="#">
                    <span className="material-symbols-outlined text-[20px]">send</span>
                    <span className="text-sm">Sent Broadcasts</span>
                  </a>
                  <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" href="#">
                    <span className="material-symbols-outlined text-[20px]">drafts</span>
                    <span className="text-sm">Drafts</span>
                  </a>
                  <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" href="#">
                    <span className="material-symbols-outlined text-[20px]">schedule_send</span>
                    <span className="text-sm">Scheduled</span>
                  </a>
                </div>
              </div>
              {/* Template Bank */}
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-3">Templates</p>
                <div className="space-y-2">
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-800 cursor-pointer hover:border-primary/50 transition-colors">
                    <p className="text-xs font-bold text-slate-900 dark:text-slate-100">Shift Reminder</p>
                    <p className="text-[10px] text-slate-500 mt-1 line-clamp-1">Hi (name), don&apos;t forget your shift at (time)...</p>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-800 cursor-pointer hover:border-primary/50 transition-colors">
                    <p className="text-xs font-bold text-slate-900 dark:text-slate-100 text-red-500">Emergency Alert</p>
                    <p className="text-[10px] text-slate-500 mt-1 line-clamp-1">URGENT: All staff must report to (location) immediately...</p>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-800 cursor-pointer hover:border-primary/50 transition-colors">
                    <p className="text-xs font-bold text-slate-900 dark:text-slate-100 text-blue-500">Welcome Onboard</p>
                    <p className="text-[10px] text-slate-500 mt-1 line-clamp-1">Welcome to the EventLogix team! Please complete...</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
          {/* Main Area */}
          <main className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Message Composer & Feed */}
            <div className="flex-1 flex flex-col bg-background-light dark:bg-background-dark overflow-y-auto p-6 lg:p-10 space-y-8">
              <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-black tracking-tight">Communications Hub</h1>
                <p className="text-slate-500 dark:text-slate-400">Broadcast messages to your entire team or specific groups instantly.</p>
              </div>
              {/* Broadcast Form */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-6">
                <div className="flex flex-wrap gap-4">
                  <div className="flex-1 min-w-[240px] space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Target Audience</label>
                    <div className="flex h-11 items-center px-4 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium">
                      <span className="material-symbols-outlined text-slate-400 mr-2 text-lg">group</span>
                      All Active Volunteers (142 members)
                      <span className="material-symbols-outlined ml-auto text-slate-400 text-lg">expand_more</span>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2 w-full md:w-auto">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Channels</label>
                    <div className="flex gap-2">
                      <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 text-blue-600 border border-blue-200 text-xs font-bold">
                        <span className="material-symbols-outlined text-sm">sms</span> SMS
                      </button>
                      <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/5 text-primary border border-primary/20 text-xs font-bold">
                        <span className="material-symbols-outlined text-sm">notifications_active</span> Push
                      </button>
                      <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-50 text-slate-400 border border-slate-200 text-xs font-bold">
                        <span className="material-symbols-outlined text-sm">mail</span> Email
                      </button>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Message Content</label>
                  <div className="relative">
                    <textarea 
                      className="w-full min-h-[140px] p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary text-sm resize-none" 
                      placeholder="Type your broadcast message here..."
                    ></textarea>
                    <div className="absolute bottom-3 right-3 flex items-center gap-4">
                      <span className="text-[10px] font-bold text-slate-400">142/160 chars</span>
                      <div className="flex gap-2">
                        <button className="text-slate-400 hover:text-primary"><span className="material-symbols-outlined text-lg">emoji_emotions</span></button>
                        <button className="text-slate-400 hover:text-primary"><span className="material-symbols-outlined text-lg">attach_file</span></button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <span className="size-2 bg-emerald-500 rounded-full animate-pulse"></span>
                    <span className="text-xs text-slate-500 font-medium">Estimated delivery time: &lt; 2 mins</span>
                  </div>
                  <div className="flex gap-3">
                    <button className="px-6 py-2 rounded-lg text-sm font-bold text-slate-500 hover:bg-slate-100 transition-colors">Save as Draft</button>
                    <button className="px-8 py-2.5 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/30 hover:shadow-xl active:scale-95 transition-all flex items-center gap-2">
                      <span className="material-symbols-outlined">send</span> Send Now
                    </button>
                  </div>
                </div>
              </div>
              {/* Recent Broadcasts */}
              <div className="space-y-4 pt-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold">Recent Broadcasts</h3>
                  <button className="text-primary text-sm font-bold hover:underline">View History</button>
                </div>
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                      <tr>
                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Target</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Message Preview</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Stats</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase text-right">Time</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="px-6 py-4">
                          <span className="text-sm font-bold">All Staff</span>
                          <div className="flex items-center gap-1 mt-1">
                            <span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 text-[8px] font-black uppercase tracking-tighter">SMS</span>
                            <span className="px-1.5 py-0.5 rounded bg-primary/5 text-primary text-[8px] font-black uppercase tracking-tighter">PUSH</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-slate-800 dark:text-slate-200 font-medium truncate max-w-[300px]">Reminder: Mandatory safety briefing tomorrow at 08:00 AM...</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="flex flex-col">
                              <span className="text-xs font-black text-emerald-500 tracking-tighter">98.4%</span>
                              <span className="text-[9px] text-slate-400 uppercase">Deliv.</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-xs font-black text-primary tracking-tighter">42%</span>
                              <span className="text-[9px] text-slate-400 uppercase">Read</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="text-xs text-slate-500 font-medium whitespace-nowrap">2 hours ago</span>
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="px-6 py-4">
                          <span className="text-sm font-bold">North Gate B</span>
                          <div className="flex items-center gap-1 mt-1">
                            <span className="px-1.5 py-0.5 rounded bg-red-50 text-red-600 text-[8px] font-black uppercase tracking-tighter">URGENT</span>
                             <span className="px-1.5 py-0.5 rounded bg-primary/5 text-primary text-[8px] font-black uppercase tracking-tighter">PUSH</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-slate-800 dark:text-slate-200 font-medium truncate max-w-[300px]">Incident reported: Minor medical assistance needed at Gate B5...</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="flex flex-col">
                              <span className="text-xs font-black text-emerald-500 tracking-tighter">100%</span>
                              <span className="text-[9px] text-slate-400 uppercase">Deliv.</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-xs font-black text-amber-500 tracking-tighter">89%</span>
                              <span className="text-[9px] text-slate-400 uppercase">Read</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="text-xs text-slate-500 font-medium whitespace-nowrap">4 hours ago</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {/* Sidebar Stats & Info */}
            <aside className="w-full md:w-80 lg:w-96 border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-8 flex flex-col">
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-4 px-2 tracking-tight">Broadcast Performance</h4>
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Avg. Delivery Rate</p>
                    <div className="flex items-end gap-2">
                       <span className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tighter">99.2%</span>
                       <span className="text-xs text-emerald-500 font-bold mb-1">+0.4%</span>
                    </div>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Link Click-Through</p>
                    <div className="flex items-end gap-2">
                       <span className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tighter">24.8%</span>
                       <span className="text-xs text-slate-400 font-bold mb-1">-1.2%</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/20">
                <div className="size-16 flex items-center justify-center bg-primary/10 text-primary rounded-full mb-4">
                  <span className="material-symbols-outlined text-4xl">contact_support</span>
                </div>
                <h5 className="font-bold text-sm mb-2">Need messaging help?</h5>
                <p className="text-xs text-slate-500 leading-relaxed mb-6">Learn how to segment your audience and optimize engagement for your events.</p>
                <button className="w-full py-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 transition-colors">
                  View Comms Guide
                </button>
              </div>
              <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Chat Rooms</h4>
                  <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[8px] font-black uppercase animate-pulse">Live</span>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="size-2 rounded-full bg-primary"></div>
                    <span className="text-xs font-bold">Logistics Hub (General)</span>
                    <span className="ml-auto text-[10px] text-slate-400">12 new</span>
                  </div>
                  <div className="flex items-center gap-3 opacity-60">
                    <div className="size-2 rounded-full bg-red-500"></div>
                    <span className="text-xs font-bold">Emergency Response Alpha</span>
                    <span className="ml-auto text-[10px] text-slate-400">3 new</span>
                  </div>
                </div>
              </div>
            </aside>
          </main>
        </div>
      </div>
    </div>
  );
}
