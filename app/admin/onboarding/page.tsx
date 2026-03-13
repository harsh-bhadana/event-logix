export default function OnboardingReviewPage() {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hidden lg:flex flex-col">
          <div className="p-6 flex items-center gap-3">
            <div className="bg-primary p-1.5 rounded-lg text-white">
              <span className="material-symbols-outlined block text-2xl">verified_user</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight">OnboardAdmin</h1>
          </div>
          <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
            <a className="flex items-center gap-3 px-3 py-2 text-primary bg-primary/10 rounded-lg font-semibold" href="#">
              <span className="material-symbols-outlined">dashboard</span>
              <span>Dashboard</span>
            </a>
            <a className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors" href="#">
              <span className="material-symbols-outlined">description</span>
              <span>Applications</span>
            </a>
            <a className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors" href="#">
              <span className="material-symbols-outlined">group</span>
              <span>Staff Directory</span>
            </a>
            <a className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors" href="#">
              <span className="material-symbols-outlined">folder_shared</span>
              <span>Documents</span>
            </a>
            <div className="pt-4 pb-2 px-3">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Settings</p>
            </div>
            <a className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors" href="#">
              <span className="material-symbols-outlined">settings</span>
              <span>Configuration</span>
            </a>
          </nav>
          <div className="p-4 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50">
              <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">person</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate">Alex Chen</p>
                <p className="text-xs text-slate-500 truncate">HR Manager</p>
              </div>
              <button className="text-slate-400 hover:text-slate-600">
                <span className="material-symbols-outlined text-lg">logout</span>
              </button>
            </div>
          </div>
        </aside>
        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-8 flex items-center justify-between z-10">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative w-full max-w-md">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">search</span>
                <input className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/20" placeholder="Search applications..." type="text"/>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="size-10 flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg relative">
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="size-10 flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                <span className="material-symbols-outlined">help_outline</span>
              </button>
            </div>
          </header>
          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-8 space-y-8">
            {/* Summary */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-4">
              <div>
                <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">Onboarding Applications</h2>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Manage and review pending staff intake requests.</p>
              </div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800">
                  <span className="material-symbols-outlined text-lg">download</span>
                  Export CSV
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary/90">
                  <span className="material-symbols-outlined text-lg">add</span>
                  New Request
                </button>
              </div>
            </div>
            {/* Stats & Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Pending Review</span>
                  <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-bold">12 Total</span>
                </div>
                <p className="text-2xl font-bold">08</p>
                <div className="mt-2 h-1 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full w-2/3"></div>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">In Progress</span>
                  <span className="bg-amber-100 text-amber-700 text-xs px-2 py-1 rounded-full font-bold">4 Total</span>
                </div>
                <p className="text-2xl font-bold">04</p>
                <div className="mt-2 h-1 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full w-1/3"></div>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Approval Rate</span>
                  <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded-full font-bold">92%</span>
                </div>
                <p className="text-2xl font-bold">87</p>
                <div className="mt-2 h-1 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-11/12"></div>
                </div>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Applications List */}
              <div className="flex-1 space-y-4">
                <div className="flex items-center border-b border-slate-200 dark:border-slate-800 mb-2">
                  <button className="px-6 py-3 border-b-2 border-primary text-primary text-sm font-bold">Pending (12)</button>
                  <button className="px-6 py-3 border-b-2 border-transparent text-slate-500 text-sm font-semibold hover:text-slate-700">Approved</button>
                  <button className="px-6 py-3 border-b-2 border-transparent text-slate-500 text-sm font-semibold hover:text-slate-700">Rejected</button>
                </div>
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
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
                      <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="size-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img className="size-full object-cover" alt="Portrait of male job applicant John Doe" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-c0HsRmbS8QmnSv_zIBgE2-DKj7IqMWBFg0kS5IpyGY_jlQC9F9HgxGdovcPc9IUp_ZnyRso2MOhNjVzD0qpPmQuXPoKzQilrJfkHvLvqLBJxxQvMXePJqFC48ODX05_qC4vwCwhR6csG3Wj4PoeUvyBJf3GoGbt-sM7AXoospjTVR7yQuDbHkq2I-NHqLIbcVT55a1b4nYiqDyToHFL1bTqqHzKYaVBKjxptBxJa5Gwv1-lZ-lo1MNBc7T9so5yjCd4dAjR29cZf"/>
                            </div>
                            <span className="font-semibold">John Doe</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Software Engineer</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs font-bold">Pending</span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500">Oct 24, 2023</td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-primary font-bold text-sm group-hover:underline">Review</button>
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer group bg-primary/5">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="size-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img className="size-full object-cover" alt="Portrait of female job applicant Jane Smith" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFox8akhhAy3wK4gTq7aQyUfEZ3aM6XUOesElBF_1TAWDDKouOeF93mY-p0F4WQqyP9EjUPNhY_NAMOxD7ve67GtE5xYzhTt0JfgRdWxxSA5VKdIffqQHondFimpzWuK4bm6Y5a97GlZc3v-7FMom3KyWLC5wanLF-IqRgYpWn6B93ZLJNkhvjIRcDNczWLWKhq0Yt5ZpxJd84S-Y5jpNUCpueNUPKBxBwILEd4cXeJ8cT1jGrwKKsCaemU4r3ZcUBemsBZhm2KnAi"/>
                            </div>
                            <span className="font-semibold text-primary">Jane Smith</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">UX Designer</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs font-bold">Pending</span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500">Oct 23, 2023</td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-primary font-bold text-sm underline">Reviewing</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              {/* Detailed View Sidebar (Active View) */}
              <div className="w-full lg:w-[450px] space-y-6">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-lg sticky top-8">
                  <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img className="size-16 rounded-xl object-cover ring-2 ring-white dark:ring-slate-700 shadow-md" alt="Close up portrait of Jane Smith" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBF8rSvaX0uuQz0rWmKfRUm3YvXDZhwtemSwvB8nSaqQj9ocsqOhUdxhH6fRyjBVNOYVnSKimmKXZkLQAnhcMxKIzo1GR4JrDrkl5QOZLfi_vA4BKMYIK9qGJR-NIe0_PH_jz3DsKlI6RvfjUk33T7JivR2y8LYk9RWLiuZdq7mj-hdqEaOOB03eMyYXNK114lF3TxBBRvrnyzJ_6Wiq9jXR4UxedIEv_uo7ECW5rAWs4ryt2Dns25xRUL8xgWwSobUDQEBWN27PbzB"/>
                        <div>
                          <h3 className="text-xl font-bold">Jane Smith</h3>
                          <p className="text-sm text-slate-500 font-medium">UX Designer Application</p>
                        </div>
                      </div>
                      <button className="text-slate-400 hover:text-slate-600">
                        <span className="material-symbols-outlined">close</span>
                      </button>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <span className="bg-primary/10 text-primary text-[10px] px-2 py-0.5 rounded uppercase font-bold tracking-wider">Design Team</span>
                      <span className="bg-primary/10 text-primary text-[10px] px-2 py-0.5 rounded uppercase font-bold tracking-wider">Mid-Level</span>
                    </div>
                  </div>
                  <div className="p-6 space-y-6">
                    {/* Documents */}
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
                        <span className="material-symbols-outlined text-lg">folder</span>
                        Uploaded Documents
                      </h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30 hover:bg-slate-100 transition-colors cursor-pointer group">
                          <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-red-500">picture_as_pdf</span>
                            <div>
                              <p className="text-xs font-semibold">Resume_JaneSmith.pdf</p>
                              <p className="text-[10px] text-slate-500">1.2 MB • Oct 23</p>
                            </div>
                          </div>
                          <span className="material-symbols-outlined text-slate-400 group-hover:text-primary">visibility</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30 hover:bg-slate-100 transition-colors cursor-pointer group">
                          <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-blue-500">link</span>
                            <div>
                              <p className="text-xs font-semibold">Portfolio_Behance.link</p>
                              <p className="text-[10px] text-slate-500">Web Link</p>
                            </div>
                          </div>
                          <span className="material-symbols-outlined text-slate-400 group-hover:text-primary">open_in_new</span>
                        </div>
                      </div>
                    </div>
                    {/* Review Checklist */}
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
                        <span className="material-symbols-outlined text-lg">checklist</span>
                        Review Checklist
                      </h4>
                      <div className="space-y-3">
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input readOnly checked className="mt-0.5 rounded text-primary focus:ring-primary" type="checkbox"/>
                          <span className="text-xs text-slate-600 dark:text-slate-400">Identity verification documents confirmed</span>
                        </label>
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input readOnly checked className="mt-0.5 rounded text-primary focus:ring-primary" type="checkbox"/>
                          <span className="text-xs text-slate-600 dark:text-slate-400">Previous employment check complete</span>
                        </label>
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input className="mt-0.5 rounded text-primary focus:ring-primary" type="checkbox"/>
                          <span className="text-xs text-slate-600 dark:text-slate-400">Background and credit check passed</span>
                        </label>
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input className="mt-0.5 rounded text-primary focus:ring-primary" type="checkbox"/>
                          <span className="text-xs text-slate-600 dark:text-slate-400">Initial interview notes reviewed</span>
                        </label>
                      </div>
                    </div>
                    {/* Actions */}
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex gap-3">
                      <button className="flex-1 px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg text-sm font-bold hover:bg-red-100 transition-colors">
                        Reject
                      </button>
                      <button className="flex-1 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-all shadow-md shadow-primary/20">
                        Approve
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="material-symbols-outlined text-primary">info</span>
                    <h5 className="text-xs font-bold text-primary uppercase">Quick Note</h5>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Jane was referred by our Senior Design Lead. She has significant experience in fintech interfaces.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
