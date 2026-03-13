export default function StaffDirectoryPage() {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display min-h-screen">
      <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          {/* Top Navigation Bar */}
          <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark px-6 md:px-10 py-3 sticky top-0 z-50">
            <div className="flex items-center gap-4">
              <div className="size-8 flex items-center justify-center bg-primary rounded-lg text-white">
                <span className="material-symbols-outlined">shield_person</span>
              </div>
              <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-tight">Admin Console</h2>
            </div>
            <div className="flex flex-1 justify-end gap-6 items-center">
              <nav className="hidden md:flex items-center gap-8">
                <a className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-sm font-medium transition-colors" href="#">Dashboard</a>
                <a className="text-primary text-sm font-semibold border-b-2 border-primary py-1" href="#">Staff</a>
                <a className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-sm font-medium transition-colors" href="#">Schedules</a>
                <a className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-sm font-medium transition-colors" href="#">Settings</a>
              </nav>
              <div className="flex items-center gap-4">
                <button className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                  <span className="material-symbols-outlined">notifications</span>
                </button>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <div 
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-primary" 
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBSXFnZ4oprHgFuyNtDTjqZY69VbY9FT-Nyidvj_oYa8K5lJtD_RPd5U1fP-y4MsIm2M0J-cwXrlMFQ3PslXDCDw3J4-yMoGt0w1i4EOgEpby2RqVQbyHCXjS-LPHz5NNK5wl7zomORzUVhYhsuJbWp4W_LEzd_sJOVTn3BCgD8nEZVg1MdBvcEbRRsmcPaWyj4Re1h_3mxHgNHfYeG1lRZoo_RyEzVOhX2OxVtTPfjAHDiZNhhQUgyw0FJpHxHkYqDDMgRT8O3p_6x")' }}
                ></div>
              </div>
            </div>
          </header>
          <main className="flex flex-1 justify-center py-8 px-4 md:px-10">
            <div className="layout-content-container flex flex-col max-w-[1200px] flex-1 gap-6">
              {/* Page Header */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <h1 className="text-slate-900 dark:text-slate-100 text-3xl font-black leading-tight tracking-tight">Staff Directory</h1>
                  <p className="text-slate-500 dark:text-slate-400 text-base font-normal">Manage permissions, roles, and status for all organization members.</p>
                </div>
                <div className="flex gap-3">
                  <button className="flex items-center justify-center gap-2 rounded-lg h-10 px-4 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-bold transition-all hover:bg-slate-200 dark:hover:bg-slate-700">
                    <span className="material-symbols-outlined text-lg">file_download</span>
                    <span>Export CSV</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold transition-all hover:opacity-90 shadow-md shadow-primary/20">
                    <span className="material-symbols-outlined text-lg">add</span>
                    <span>Add New Staff</span>
                  </button>
                </div>
              </div>
              {/* Filters and Search */}
              <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-4 text-slate-400">search</span>
                      <input className="w-full h-11 pl-12 pr-4 rounded-lg bg-slate-50 dark:bg-slate-800 border-none text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary placeholder:text-slate-400" placeholder="Search by name, role, or email..." type="text"/>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button className="flex h-11 items-center justify-center gap-2 rounded-lg bg-slate-50 dark:bg-slate-800 px-4 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100">
                      <span className="text-sm font-medium">Department: All</span>
                      <span className="material-symbols-outlined text-lg">keyboard_arrow_down</span>
                    </button>
                    <button className="flex h-11 items-center justify-center gap-2 rounded-lg bg-slate-50 dark:bg-slate-800 px-4 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100">
                      <span className="text-sm font-medium">Role: Any</span>
                      <span className="material-symbols-outlined text-lg">keyboard_arrow_down</span>
                    </button>
                    <button className="flex h-11 items-center justify-center gap-2 rounded-lg bg-slate-50 dark:bg-slate-800 px-4 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100">
                      <span className="text-sm font-medium">Status: Active</span>
                      <span className="material-symbols-outlined text-lg">filter_list</span>
                    </button>
                  </div>
                </div>
              </div>
              {/* Staff Table */}
              <div className="bg-white dark:bg-slate-900 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm @container">
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
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${member.status === 'Active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}`}>
                              <span className={`size-1.5 rounded-full ${member.status === 'Active' ? 'bg-green-500' : 'bg-slate-400'}`}></span>
                              {member.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                            {member.name.toLowerCase().replace(' ', '.')}@org.com
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex justify-end gap-2">
                              <button className="text-primary hover:bg-primary/10 p-2 rounded-lg transition-colors font-bold text-sm">View Profile</button>
                              <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-2"><span className="material-symbols-outlined text-lg">more_vert</span></button>
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
                    <button className="px-3 py-1 rounded border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-sm hover:bg-white dark:hover:bg-slate-700 disabled:opacity-50" disabled>Previous</button>
                    <button className="px-3 py-1 rounded bg-primary text-white text-sm font-medium">1</button>
                    <button className="px-3 py-1 rounded border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-sm hover:bg-white dark:hover:bg-slate-700">2</button>
                    <button className="px-3 py-1 rounded border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-sm hover:bg-white dark:hover:bg-slate-700">3</button>
                    <button className="px-3 py-1 rounded border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-sm hover:bg-white dark:hover:bg-slate-700">Next</button>
                  </div>
                </div>
              </div>
              {/* Stats Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: "Total Staff", val: "128", icon: "groups", color: "text-primary", bg: "bg-primary/10" },
                  { label: "Active Volunteers", val: "42", icon: "volunteer_activism", color: "text-green-600", bg: "bg-green-500/10" },
                  { label: "Onboarding", val: "8", icon: "pending_actions", color: "text-blue-600", bg: "bg-blue-500/10" },
                ].map((stat, i) => (
                  <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 ${stat.bg} rounded-lg ${stat.color}`}>
                        <span className="material-symbols-outlined">{stat.icon}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                        <p className="text-2xl font-black text-slate-900 dark:text-slate-100">{stat.val}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
          <footer className="mt-auto py-8 border-t border-slate-200 dark:border-slate-800 px-10 text-center">
            <p className="text-slate-500 dark:text-slate-400 text-sm">© 2024 Staff Directory Admin Console. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </div>
  );
}
