import DashboardLayout from "@/components/layout/DashboardLayout";
import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import { Input } from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";

export default function VendorManagementPage() {
  const sidebarItems = [
    { icon: "dashboard", label: "Dashboard", href: "#" },
    { icon: "groups", label: "Vendors", href: "#", active: true },
    { icon: "calendar_month", label: "Schedules", href: "#" },
    { icon: "account_balance_wallet", label: "Financials", href: "#" },
    { icon: "description", label: "Documents", href: "#" },
  ];

  return (
    <DashboardLayout title="EventVendor Pro" sidebarItems={sidebarItems}>
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-slate-900 dark:text-white text-3xl font-black leading-tight tracking-tight">Vendor Management</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Manage partners, contracts, and payment milestones across all active events.</p>
          </div>
          <Button className="shadow-lg shadow-primary/20">
            <Icon name="add" className="text-[20px]" />
            Add New Vendor
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase">Total Vendors</span>
              <Icon name="hub" className="text-primary" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900 dark:text-white">42</span>
              <span className="text-emerald-500 text-xs font-bold">+4 this month</span>
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase">Active Contracts</span>
              <Icon name="contract_edit" className="text-amber-500" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900 dark:text-white">18</span>
              <span className="text-slate-500 text-xs font-medium">6 Pending Review</span>
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase">Upcoming Payments</span>
              <Icon name="payments" className="text-emerald-500" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900 dark:text-white">$12,450</span>
              <span className="text-slate-500 text-xs font-medium">Due in 7 days</span>
            </div>
          </Card>
        </div>

        {/* Tabs & Content */}
        <Card noPadding>
          <div className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 px-6 overflow-x-auto">
            <div className="flex gap-8">
              <button className="border-b-2 border-primary text-primary py-4 text-sm font-bold flex items-center gap-2">
                <Icon name="restaurant" className="text-[18px]" /> Catering
              </button>
              <button className="border-b-2 border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 py-4 text-sm font-bold flex items-center gap-2 transition-colors">
                <Icon name="party_mode" className="text-[18px]" /> Decor
              </button>
              <button className="border-b-2 border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 py-4 text-sm font-bold flex items-center gap-2 transition-colors">
                <Icon name="theater_comedy" className="text-[18px]" /> Entertainment
              </button>
              <button className="border-b-2 border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 py-4 text-sm font-bold flex items-center gap-2 transition-colors">
                <Icon name="photo_camera" className="text-[18px]" /> Photography
              </button>
            </div>
          </div>
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
                    <Badge variant="success">
                      <span className="size-1.5 rounded-full bg-emerald-500"></span>
                      Active
                    </Badge>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm text-slate-700 dark:text-slate-300">Oct 15, 2024</div>
                    <div className="text-[11px] font-bold text-primary">Deposit Due</div>
                  </td>
                  <td className="px-6 py-5 text-right font-bold text-slate-900 dark:text-white text-sm">$2,500.00</td>
                  <td className="px-6 py-5 text-right">
                    <Button variant="ghost" size="icon" className="text-slate-400">
                      <Icon name="more_vert" />
                    </Button>
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
                    <Badge variant="warning">
                      <span className="size-1.5 rounded-full bg-amber-500"></span>
                      Pending
                    </Badge>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm text-slate-700 dark:text-slate-300">Oct 20, 2024</div>
                    <div className="text-[11px] font-bold text-slate-400">Review Required</div>
                  </td>
                  <td className="px-6 py-5 text-right font-bold text-slate-900 dark:text-white text-sm">$1,200.00</td>
                  <td className="px-6 py-5 text-right">
                    <Button variant="ghost" size="icon" className="text-slate-400">
                      <Icon name="more_vert" />
                    </Button>
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
                    <Badge variant="primary">
                      <span className="size-1.5 rounded-full bg-blue-500"></span>
                      Completed
                    </Badge>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm text-slate-700 dark:text-slate-300">N/A</div>
                    <div className="text-[11px] font-bold text-emerald-500">Fully Paid</div>
                  </td>
                  <td className="px-6 py-5 text-right font-bold text-slate-900 dark:text-white text-sm">$3,000.00</td>
                  <td className="px-6 py-5 text-right">
                    <Button variant="ghost" size="icon" className="text-slate-400">
                      <Icon name="more_vert" />
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 bg-slate-50/50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <p className="text-xs text-slate-500 font-medium">Showing 3 of 42 vendors</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="bg-white dark:bg-slate-900">Previous</Button>
              <Button variant="outline" size="sm" className="bg-white dark:bg-slate-900">Next</Button>
            </div>
          </div>
        </Card>

        {/* Secondary Grid: Notifications & Calendar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <h3 className="text-slate-900 dark:text-white text-lg font-bold mb-6 flex items-center gap-2">
              <Icon name="history" className="text-primary" /> Recent Activity
            </h3>
            <div className="flex flex-col gap-6">
              {[
                { icon: "verified", color: "emerald", text: "Contract signed with Gourmet Delights", time: "2 hours ago" },
                { icon: "priority_high", color: "amber", text: "Payment reminder sent to Elite Sound", time: "5 hours ago" },
                { icon: "person_add", color: "blue", text: "New vendor added: Starlight Visuals", time: "Yesterday" },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className={`size-8 rounded-full bg-${item.color}-500/10 flex items-center justify-center shrink-0`}>
                    <Icon name={item.icon} className={`text-${item.color}-600 text-[18px]`} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm text-slate-700 dark:text-slate-300" dangerouslySetInnerHTML={{ __html: item.text.replace(/(Gourmet Delights|Gourmet Delights|Elite Sound|Starlight Visuals)/g, '<span class="font-bold text-slate-900 dark:text-white">$1</span>') }} />
                    <span className="text-xs text-slate-500">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <h3 className="text-slate-900 dark:text-white text-lg font-bold mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="event" className="text-primary" /> October 2024
              </div>
              <a className="text-xs text-primary font-bold" href="#">View Full Calendar</a>
            </h3>
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map(d => <div key={d} className="text-center text-[10px] font-bold text-slate-400">{d}</div>)}
              {[28, 29, 30].map(d => <div key={d} className="h-8 flex items-center justify-center text-xs text-slate-400">{d}</div>)}
              {[1].map(d => <div key={d} className="h-8 flex items-center justify-center text-xs text-slate-900 dark:text-white font-bold bg-primary/10 rounded-lg">{d}</div>)}
              {[2, 3, 4, 5, 6].map(d => <div key={d} className="h-8 flex items-center justify-center text-xs text-slate-900 dark:text-white font-bold">{d}</div>)}
              {[7].map(d => <div key={d} className="h-8 flex items-center justify-center text-xs text-slate-900 dark:text-white font-bold bg-amber-500/20 text-amber-700 dark:text-amber-400 rounded-lg">{d}</div>)}
              {[8, 9, 10, 11].map(d => <div key={d} className="h-8 flex items-center justify-center text-xs text-slate-900 dark:text-white font-bold">{d}</div>)}
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg border-l-4 border-amber-500">
              <p className="text-xs font-bold text-slate-900 dark:text-white">Upcoming Milestone</p>
              <p className="text-[11px] text-slate-500">Catering Final Tasting - Tech Summit 2024</p>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
