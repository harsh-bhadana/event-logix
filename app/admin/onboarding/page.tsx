import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Badge from "@/components/ui/Badge";
import { Checkbox } from "@/components/ui/Input";

export default function OnboardingReviewPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Summary */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">Onboarding Applications</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Manage and review pending staff intake requests.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Icon name="download" className="text-lg" />
              Export CSV
            </Button>
            <Button>
              <Icon name="add" className="text-lg" />
              New Request
            </Button>
          </div>
        </div>

        {/* Stats & Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Pending Review", count: "08", total: "12 Total", color: "blue", progress: "w-2/3" },
            { label: "In Progress", count: "04", total: "4 Total", color: "amber", progress: "w-1/3" },
            { label: "Approval Rate", count: "87", total: "92%", color: "emerald", progress: "w-11/12" },
          ].map((stat, i) => (
            <Card key={i}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</span>
                <Badge variant={stat.color === 'blue' ? 'primary' : stat.color === 'amber' ? 'warning' : 'success'}>{stat.total}</Badge>
              </div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.count}</p>
              <div className="mt-2 h-1 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className={`h-full ${stat.progress} ${
                  stat.color === 'blue' ? 'bg-blue-500' : 
                  stat.color === 'amber' ? 'bg-amber-500' : 'bg-emerald-500'
                }`}></div>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Applications List */}
          <div className="flex-1 space-y-4">
            <div className="flex items-center border-b border-slate-200 dark:border-slate-800 mb-2">
              <button className="px-6 py-3 border-b-2 border-primary text-primary text-sm font-bold">Pending (12)</button>
              <button className="px-6 py-3 border-b-2 border-transparent text-slate-500 text-sm font-semibold hover:text-slate-700">Approved</button>
              <button className="px-6 py-3 border-b-2 border-transparent text-slate-500 text-sm font-semibold hover:text-slate-700">Rejected</button>
            </div>
            <Card noPadding>
              <table className="w-full text-left">
                <thead className="bg-slate-50 dark:bg-slate-800/50">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Applicant</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Role</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Submitted</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {[
                    { name: "John Doe", role: "Software Engineer", status: "Pending", date: "Oct 24, 2023", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-c0HsRmbS8QmnSv_zIBgE2-DKj7IqMWBFg0kS5IpyGY_jlQC9F9HgxGdovcPc9IUp_ZnyRso2MOhNjVzD0qpPmQuXPoKzQilrJfkHvLvqLBJxxQvMXePJqFC48ODX05_qC4vwCwhR6csG3Wj4PoeUvyBJf3GoGbt-sM7AXoospjTVR7yQuDbHkq2I-NHqLIbcVT55a1b4nYiqDyToHFL1bTqqHzKYaVBKjxptBxJa5Gwv1-lZ-lo1MNBc7T9so5yjCd4dAjR29cZf" },
                    { name: "Jane Smith", role: "UX Designer", status: "Reviewing", date: "Oct 23, 2023", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBFox8akhhAy3wK4gTq7aQyUfEZ3aM6XUOesElBF_1TAWDDKouOeF93mY-p0F4WQqyP9EjUPNhY_NAMOxD7ve67GtE5xYzhTt0JfgRdWxxSA5VKdIffqQHondFimpzWuK4bm6Y5a97GlZc3v-7FMom3KyWLC5wanLF-IqRgYpWn6B93ZLJNkhvjIRcDNczWLWKhq0Yt5ZpxJd84S-Y5jpNUCpueNUPKBxBwILEd4cXeJ8cT1jGrwKKsCaemU4r3ZcUBemsBZhm2KnAi", active: true },
                  ].map((row, i) => (
                    <tr key={i} className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer group ${row.active ? 'bg-primary/5' : ''}`}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="size-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img className="size-full object-cover" alt={row.name} src={row.img}/>
                          </div>
                          <span className={`font-semibold ${row.active ? 'text-primary' : 'text-slate-900 dark:text-white'}`}>{row.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{row.role}</td>
                      <td className="px-6 py-4">
                        <Badge variant={row.status === 'Pending' ? 'warning' : 'primary'}>{row.status}</Badge>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">{row.date}</td>
                      <td className="px-6 py-4 text-right">
                        <Button variant="ghost" className="font-bold text-sm">Review</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>

          {/* Detailed View Sidebar (Active View) */}
          <div className="w-full lg:w-[450px] space-y-6">
            <Card className="shadow-lg sticky top-8" noPadding>
              <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="size-16 rounded-xl object-cover ring-2 ring-white dark:ring-slate-700 shadow-md" alt="Jane Smith" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBF8rSvaX0uuQz0rWmKfRUm3YvXDZhwtemSwvB8nSaqQj9ocsqOhUdxhH6fRyjBVNOYVnSKimmKXZkLQAnhcMxKIzo1GR4JrDrkl5QOZLfi_vA4BKMYIK9qGJR-NIe0_PH_jz3DsKlI6RvfjUk33T7JivR2y8LYk9RWLiuZdq7mj-hdqEaOOB03eMyYXNK114lF3TxBBRvrnyzJ_6Wiq9jXR4UxedIEv_uo7ECW5rAWs4ryt2Dns25xRUL8xgWwSobUDQEBWN27PbzB"/>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">Jane Smith</h3>
                      <p className="text-sm text-slate-500 font-medium">UX Designer Application</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="text-slate-400">
                    <Icon name="close" />
                  </Button>
                </div>
                <div className="mt-4 flex gap-2">
                  <Badge variant="primary" className="text-[10px]">Design Team</Badge>
                  <Badge variant="primary" className="text-[10px]">Mid-Level</Badge>
                </div>
              </div>
              <div className="p-6 space-y-6">
                {/* Documents */}
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
                    <Icon name="folder" className="text-lg" />
                    Uploaded Documents
                  </h4>
                  <div className="space-y-2">
                    {[
                      { icon: "picture_as_pdf", name: "Resume_JaneSmith.pdf", info: "1.2 MB • Oct 23", color: "text-red-500" },
                      { icon: "link", name: "Portfolio_Behance.link", info: "Web Link", color: "text-blue-500" },
                    ].map((doc, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer group">
                        <div className="flex items-center gap-3">
                          <Icon name={doc.icon} className={doc.color} />
                          <div>
                            <p className="text-xs font-semibold text-slate-900 dark:text-white">{doc.name}</p>
                            <p className="text-[10px] text-slate-500">{doc.info}</p>
                          </div>
                        </div>
                        <Icon name="visibility" className="text-slate-400 group-hover:text-primary" />
                      </div>
                    ))}
                  </div>
                </div>
                {/* Review Checklist */}
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
                    <Icon name="checklist" className="text-lg" />
                    Review Checklist
                  </h4>
                  <div className="space-y-3">
                    <Checkbox label="Identity verification documents confirmed" defaultChecked />
                    <Checkbox label="Previous employment check complete" defaultChecked />
                    <Checkbox label="Background and credit check passed" />
                    <Checkbox label="Initial interview notes reviewed" />
                  </div>
                </div>
                {/* Actions */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex gap-3">
                  <Button variant="outline" className="flex-1 bg-red-50 dark:bg-red-900/10 text-red-600 border-red-200 dark:border-red-900/30 hover:bg-red-100">
                    Reject
                  </Button>
                  <Button className="flex-1 shadow-md shadow-primary/20">
                    Approve
                  </Button>
                </div>
              </div>
            </Card>
            <div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <Icon name="info" className="text-primary" />
                <h5 className="text-xs font-bold text-primary uppercase">Quick Note</h5>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Jane was referred by our Senior Design Lead. She has significant experience in fintech interfaces.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
