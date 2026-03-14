import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Badge from "@/components/ui/Badge";

export default function CommsHubPage() {
  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-120px)] overflow-hidden -m-8">
        {/* Sidebar */}
        <aside className="w-72 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col">
          <div className="p-6">
            <Button className="w-full shadow-lg shadow-primary/20">
              <Icon name="add_comment" />
              New Broadcast
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-8 text-slate-900 dark:text-slate-100">
            {/* Quick Filters */}
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-3">Folders</p>
              <div className="space-y-1">
                <a className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary font-bold transition-colors" href="#">
                  <Icon name="send" className="text-[20px]" />
                  <span className="text-sm">Sent Broadcasts</span>
                </a>
                <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" href="#">
                  <Icon name="drafts" className="text-[20px]" />
                  <span className="text-sm">Drafts</span>
                </a>
                <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" href="#">
                  <Icon name="schedule_send" className="text-[20px]" />
                  <span className="text-sm">Scheduled</span>
                </a>
              </div>
            </div>
            {/* Template Bank */}
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-3">Templates</p>
              <div className="space-y-2">
                {[
                  { title: "Shift Reminder", desc: "Hi (name), don't forget your shift...", color: "text-slate-900 dark:text-slate-100" },
                  { title: "Emergency Alert", desc: "URGENT: All staff must report...", color: "text-red-500" },
                  { title: "Welcome Onboard", desc: "Welcome to the EventLogix team!", color: "text-blue-500" },
                ].map((tmpl, i) => (
                  <div key={i} className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-800 cursor-pointer hover:border-primary/50 transition-colors">
                    <p className={`text-xs font-bold ${tmpl.color}`}>{tmpl.title}</p>
                    <p className="text-[10px] text-slate-500 mt-1 line-clamp-1">{tmpl.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Area */}
        <main className="flex-1 flex flex-col md:flex-row overflow-hidden bg-background-light dark:bg-background-dark">
          <div className="flex-1 flex flex-col overflow-y-auto p-6 lg:p-10 space-y-8">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">Communications Hub</h1>
              <p className="text-slate-500 dark:text-slate-400">Broadcast messages to your entire team or specific groups instantly.</p>
            </div>
            {/* Broadcast Form */}
            <Card className="space-y-6">
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[240px] space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Target Audience</label>
                  <div className="flex h-11 items-center px-4 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-900 dark:text-slate-100">
                    <Icon name="group" className="text-slate-400 mr-2 text-lg" />
                    All Active Volunteers (142 members)
                    <Icon name="expand_more" className="ml-auto text-slate-400 text-lg" />
                  </div>
                </div>
                <div className="flex flex-col space-y-2 w-full md:w-auto">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Channels</label>
                  <div className="flex gap-2">
                    <Badge variant="primary" className="cursor-pointer hover:bg-primary/20">
                      <Icon name="sms" className="text-sm" /> SMS
                    </Badge>
                    <Badge variant="primary" className="cursor-pointer hover:bg-primary/20">
                      <Icon name="notifications_active" className="text-sm" /> Push
                    </Badge>
                    <Badge className="cursor-pointer">
                      <Icon name="mail" className="text-sm" /> Email
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Message Content</label>
                <div className="relative">
                  <textarea 
                    className="w-full min-h-[140px] p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary text-sm resize-none text-slate-900 dark:text-slate-100" 
                    placeholder="Type your broadcast message here..."
                  ></textarea>
                  <div className="absolute bottom-3 right-3 flex items-center gap-4">
                    <span className="text-[10px] font-bold text-slate-400">142/160 chars</span>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" className="text-slate-400">
                        <Icon name="emoji_emotions" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-slate-400">
                        <Icon name="attach_file" />
                      </Button>
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
                  <Button variant="ghost">Save Draft</Button>
                  <Button className="shadow-lg shadow-primary/30">
                    <Icon name="send" /> Send Now
                  </Button>
                </div>
              </div>
            </Card>

            {/* Recent Broadcasts */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Recent Broadcasts</h3>
                <Button variant="ghost" size="sm" className="text-primary">View History</Button>
              </div>
              <Card noPadding>
                <table className="w-full text-left">
                  <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                    <tr className="text-slate-400">
                      <th className="px-6 py-4 text-xs font-bold uppercase">Target</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase">Message Preview</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase">Stats</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase text-right">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-900 dark:text-slate-100">
                    {[
                      { target: "All Staff", msg: "Reminder: Mandatory safety briefing tomorrow at 08:00 AM...", deliv: "98.4%", read: "42%", time: "2 hours ago", urgent: false },
                      { target: "North Gate B", msg: "Incident reported: Minor medical assistance needed at Gate B5...", deliv: "100%", read: "89%", time: "4 hours ago", urgent: true },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="px-6 py-4">
                          <span className="text-sm font-bold">{row.target}</span>
                          <div className="flex items-center gap-1 mt-1">
                            {row.urgent && <Badge variant="danger" className="text-[8px] px-1 py-0 px-1.5 h-auto">URGENT</Badge>}
                            <Badge className="text-[8px] px-1.5 py-0 h-auto">SMS</Badge>
                            <Badge variant="primary" className="text-[8px] px-1.5 py-0 h-auto">PUSH</Badge>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-medium truncate max-w-[300px] text-slate-600 dark:text-slate-400">{row.msg}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="flex flex-col">
                              <span className="text-xs font-black text-emerald-500">{row.deliv}</span>
                              <span className="text-[9px] text-slate-400 uppercase">Deliv.</span>
                            </div>
                            <div className="flex flex-col">
                              <span className={`text-xs font-black ${row.urgent ? 'text-amber-500' : 'text-primary'}`}>{row.read}</span>
                              <span className="text-[9px] text-slate-400 uppercase">Read</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="text-xs text-slate-500 font-medium whitespace-nowrap">{row.time}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            </div>
          </div>

          {/* Right Sidebar */}
          <aside className="w-full md:w-80 lg:w-96 border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-8 flex flex-col text-slate-900 dark:text-slate-100">
            <div>
              <h4 className="text-sm font-bold mb-4 px-2 tracking-tight">Broadcast Performance</h4>
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Avg. Delivery Rate</p>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-black tracking-tighter">99.2%</span>
                    <span className="text-xs text-emerald-500 font-bold mb-1">+0.4%</span>
                  </div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Link Click-Through</p>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-black tracking-tighter">24.8%</span>
                    <span className="text-xs text-slate-400 font-bold mb-1">-1.2%</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/20">
              <div className="size-16 flex items-center justify-center bg-primary/10 text-primary rounded-full mb-4">
                <Icon name="contact_support" className="text-4xl" />
              </div>
              <h5 className="font-bold text-sm mb-2">Need Help?</h5>
              <p className="text-xs text-slate-500 leading-relaxed mb-6">Learn how to segment your audience and optimize engagement.</p>
              <Button variant="outline" size="sm" className="w-full bg-white dark:bg-slate-800">
                View Comms Guide
              </Button>
            </div>
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Chat Rooms</h4>
                <Badge variant="success" className="animate-pulse text-[8px] px-1.5 py-0">Live</Badge>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="size-2 rounded-full bg-primary"></div>
                  <span className="text-xs font-bold">Logistics Hub</span>
                  <span className="ml-auto text-[10px] text-slate-400">12 new</span>
                </div>
                <div className="flex items-center gap-3 opacity-60">
                  <div className="size-2 rounded-full bg-red-500"></div>
                  <span className="text-xs font-bold">Emergency Response</span>
                  <span className="ml-auto text-[10px] text-slate-400">3 new</span>
                </div>
              </div>
            </div>
          </aside>
        </main>
      </div>
    </DashboardLayout>
  );
}
