import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Badge from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";

export default function StaffDirectoryPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        {/* Page Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-slate-900 dark:text-slate-100 text-3xl font-black leading-tight tracking-tight">Staff Directory</h1>
            <p className="text-slate-500 dark:text-slate-400 text-base font-normal">Manage permissions, roles, and status for all organization members.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Icon name="file_download" />
              Export CSV
            </Button>
            <Button className="shadow-md shadow-primary/20">
              <Icon name="add" />
              Add New Staff
            </Button>
          </div>
        </div>

        {/* Filters and Search */}
        <Card className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input icon="search" placeholder="Search by name, role, or email..." />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" className="h-11 justify-between gap-2 px-4 font-medium text-slate-700 dark:text-slate-300">
                Department: All
                <Icon name="keyboard_arrow_down" />
              </Button>
              <Button variant="outline" className="h-11 justify-between gap-2 px-4 font-medium text-slate-700 dark:text-slate-300">
                Role: Any
                <Icon name="keyboard_arrow_down" />
              </Button>
              <Button variant="outline" className="h-11 justify-center gap-2 px-4 text-slate-700 dark:text-slate-300">
                Status: Active
                <Icon name="filter_list" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Staff Table */}
        <Card noPadding className="overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="px-6 py-4 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Member</th>
                  <th className="px-6 py-4 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Role</th>
                  <th className="px-6 py-4 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-4 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {[
                  { name: "Alice Johnson", initials: "AJ", role: "Lead Developer", dept: "Engineering", status: "Active" },
                  { name: "Bob Smith", initials: "BS", role: "Volunteer Coordinator", dept: "Operations", status: "Active" },
                  { name: "Charlie Davis", initials: "CD", role: "HR Manager", dept: "Human Resources", status: "Inactive" },
                  { name: "Diana Prince", initials: "DP", role: "Event Volunteer", dept: "Events", status: "Active" },
                  { name: "Edward Norton", initials: "EN", role: "Security Specialist", dept: "Safety", status: "Active" },
                ].map((member, i) => (
                  <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">{member.initials}</div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-900 dark:text-slate-100">{member.name}</span>
                          <span className="text-xs text-slate-500">Joined Oct 2021</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">{member.role}</span>
                        <span className="text-xs text-slate-400">{member.dept}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={member.status === 'Active' ? 'success' : 'neutral'} className="gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold">
                        <span className={`size-1.5 rounded-full ${member.status === 'Active' ? 'bg-green-500' : 'bg-slate-400'}`}></span>
                        {member.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                      {member.name.toLowerCase().replace(' ', '.')}@org.com
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" className="text-primary font-bold">View Profile</Button>
                        <Button variant="ghost" size="icon" className="text-slate-400">
                          <Icon name="more_vert" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800">
            <span className="text-sm text-slate-500 dark:text-slate-400">Showing 1 to 5 of 42 entries</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button size="sm" className="px-3">1</Button>
              <Button variant="outline" size="sm" className="px-3">2</Button>
              <Button variant="outline" size="sm" className="px-3">3</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </Card>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Total Staff", val: "128", icon: "groups", color: "text-primary", bg: "bg-primary/10" },
            { label: "Active Volunteers", val: "42", icon: "volunteer_activism", color: "text-green-600", bg: "bg-green-500/10" },
            { label: "Onboarding", val: "8", icon: "pending_actions", color: "text-blue-600", bg: "bg-blue-500/10" },
          ].map((stat, i) => (
            <Card key={i}>
              <div className="flex items-center gap-4">
                <div className={`p-3 ${stat.bg} rounded-lg ${stat.color}`}>
                  <Icon name={stat.icon} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                  <p className="text-2xl font-black text-slate-900 dark:text-slate-100">{stat.val}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
