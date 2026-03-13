export default function SchedulerPage() {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
      <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          {/* Top Navigation */}
          <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 px-4 lg:px-10 py-3 bg-white dark:bg-slate-900 sticky top-0 z-50">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-4 text-primary">
                <div className="size-6 bg-primary rounded-lg flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-[20px]">calendar_view_day</span>
                </div>
                <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-[-0.015em]">ShiftSync</h2>
              </div>
              <nav className="hidden md:flex items-center gap-9">
                <a className="text-slate-900 dark:text-slate-100 text-sm font-medium leading-normal hover:text-primary transition-colors" href="#">Schedules</a>
                <a className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-normal hover:text-primary transition-colors" href="#">Staff</a>
                <a className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-normal hover:text-primary transition-colors" href="#">Locations</a>
                <a className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-normal hover:text-primary transition-colors" href="#">Reports</a>
              </nav>
            </div>
            <div className="flex flex-1 justify-end gap-4 lg:gap-8">
              <label className="hidden sm:flex flex-col min-w-40 !h-10 max-w-64">
                <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                  <div className="text-slate-400 flex border-none bg-slate-100 dark:bg-slate-800 items-center justify-center pl-4 rounded-l-lg" data-icon="search">
                    <span className="material-symbols-outlined text-[20px]">search</span>
                  </div>
                  <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-slate-100 focus:outline-0 focus:ring-0 border-none bg-slate-100 dark:bg-slate-800 focus:border-none h-full placeholder:text-slate-400 px-4 rounded-l-none pl-2 text-base font-normal" placeholder="Search staff or shifts..." defaultValue=""/>
                </div>
              </label>
              <div className="flex gap-2">
                <button className="flex items-center justify-center rounded-lg size-10 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-200 transition-colors">
                  <span className="material-symbols-outlined">notifications</span>
                </button>
                <button className="flex items-center justify-center rounded-lg size-10 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-200 transition-colors">
                  <span className="material-symbols-outlined">settings</span>
                </button>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <div 
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-primary/20" 
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDh4v0YqQk8hk_0GrLUSfoutBdXwue1gVDYBdHrEjx3A6uDkHBqD_oXU5YgNcg3C10xRn1y7DT4DDRKyo2bMz6PAABg4SdFezKni179TYpk0Qgi6EeaTiNrCe31FWh8_teUL7lPO6UPCl529h5YTb-xD8mJmICELEiktCKgiQR2vSIP6HwhMc-iuhnExMUYrZcYyV1KjYB-UhKZz35PNMRnKeFHvcM4cCwVkz9avLaIbJqCnNQ_oAuYRFmwGgiyZNz3WxQKb91Pgivo")' }}
              ></div>
            </div>
          </header>
          <div className="flex flex-1 flex-col lg:flex-row">
            {/* Sidebar */}
            <aside className="w-full lg:w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shrink-0">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                  <h1 className="text-primary text-base font-bold uppercase tracking-wider">Summer Fest 2024</h1>
                  <p className="text-slate-500 text-xs">Event Management v2.1</p>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                    <span className="material-symbols-outlined">dashboard</span>
                    <p className="text-sm font-medium">Dashboard</p>
                  </div>
                  <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary transition-colors cursor-pointer">
                    <span className="material-symbols-outlined">calendar_today</span>
                    <p className="text-sm font-bold">Shift Scheduler</p>
                  </div>
                  <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                    <span className="material-symbols-outlined">group</span>
                    <p className="text-sm font-medium">Staff Directory</p>
                  </div>
                  <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                    <span className="material-symbols-outlined">map</span>
                    <p className="text-sm font-medium">Location Map</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                  <p className="text-xs font-bold text-slate-400 uppercase px-3 mb-2">Active Roles</p>
                  <div className="space-y-1">
                    <label className="flex items-center gap-3 px-3 py-1 cursor-pointer">
                      <input readOnly checked className="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4" type="checkbox"/>
                      <span className="text-sm">Security</span>
                    </label>
                    <label className="flex items-center gap-3 px-3 py-1 cursor-pointer">
                      <input readOnly checked className="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4" type="checkbox"/>
                      <span className="text-sm">Medical</span>
                    </label>
                    <label className="flex items-center gap-3 px-3 py-1 cursor-pointer">
                      <input readOnly checked className="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4" type="checkbox"/>
                      <span className="text-sm">General</span>
                    </label>
                  </div>
                </div>
              </div>
            </aside>
            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0">
              {/* Header Actions */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                <div className="flex flex-col">
                  <h1 className="text-2xl font-bold tracking-tight">Main Event Timeline</h1>
                  <p className="text-slate-500 text-sm">Saturday, July 20th, 2024</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
                    <button className="px-3 py-1.5 text-xs font-bold rounded bg-white dark:bg-slate-700 shadow-sm">Day</button>
                    <button className="px-3 py-1.5 text-xs font-medium text-slate-500">Week</button>
                    <button className="px-3 py-1.5 text-xs font-medium text-slate-500">Month</button>
                  </div>
                  <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-primary/90 transition-colors">
                    <span className="material-symbols-outlined text-[18px]">publish</span>
                    Publish Schedule
                  </button>
                </div>
              </div>
              {/* Scheduler Controls */}
              <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800 overflow-x-auto">
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium">
                  <span className="material-symbols-outlined text-[18px]">filter_list</span>
                  Filters
                </button>
                <div className="h-6 w-px bg-slate-300 dark:bg-slate-700"></div>
                <div className="flex gap-2">
                  <span className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <span className="size-2 rounded-full bg-blue-500"></span> Security
                  </span>
                  <span className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <span className="size-2 rounded-full bg-red-500"></span> Medical
                  </span>
                  <span className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <span className="size-2 rounded-full bg-emerald-500"></span> General
                  </span>
                </div>
              </div>
              {/* Gantt Chart Container */}
              <div className="flex-1 overflow-auto bg-white dark:bg-slate-900">
                <div className="min-w-[1200px]">
                  {/* Time Header */}
                  <div className="flex border-b border-slate-200 dark:border-slate-800 sticky top-0 bg-white dark:bg-slate-900 z-10">
                    <div className="w-48 p-4 font-bold text-sm text-slate-400 border-r border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800">Locations</div>
                    <div className="flex flex-1">
                      <div className="flex-1 p-4 text-center border-r border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-400">08:00 AM</div>
                      <div className="flex-1 p-4 text-center border-r border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-400">10:00 AM</div>
                      <div className="flex-1 p-4 text-center border-r border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-400">12:00 PM</div>
                      <div className="flex-1 p-4 text-center border-r border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-400">02:00 PM</div>
                      <div className="flex-1 p-4 text-center border-r border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-400">04:00 PM</div>
                      <div className="flex-1 p-4 text-center border-r border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-400">06:00 PM</div>
                      <div className="flex-1 p-4 text-center border-r border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-400">08:00 PM</div>
                      <div className="flex-1 p-4 text-center text-xs font-bold text-slate-400">10:00 PM</div>
                    </div>
                  </div>
                  {/* Rows */}
                  <div className="relative">
                    {/* Grid Overlay Lines */}
                    <div className="absolute inset-0 flex pointer-events-none">
                      <div className="w-48 border-r border-slate-100 dark:border-slate-800"></div>
                      <div className="flex-1 grid grid-cols-8 divide-x divide-slate-100 dark:divide-slate-800 h-full">
                        <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                      </div>
                    </div>
                    {/* Row: Main Stage */}
                    <div className="flex border-b border-slate-100 dark:border-slate-800 group h-32">
                      <div className="w-48 p-4 font-bold border-r border-slate-200 dark:border-slate-800 flex flex-col justify-center bg-slate-50 dark:bg-slate-800/50">
                        <span className="text-slate-900 dark:text-slate-100">Main Stage</span>
                        <span className="text-xs font-normal text-slate-400">6 Staff Active</span>
                      </div>
                      <div className="flex-1 relative p-4 flex items-center">
                        {/* Shifts */}
                        <div className="absolute left-[10%] w-[35%] h-20 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded-lg p-3 cursor-move shadow-sm group/shift hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start">
                            <p className="text-xs font-bold text-blue-900 dark:text-blue-200 uppercase">Security Shift A</p>
                            <span className="material-symbols-outlined text-blue-400 text-[16px] group-hover/shift:visible invisible">drag_indicator</span>
                          </div>
                          <p className="text-[10px] text-blue-700 dark:text-blue-300 mt-1">4 Staff: Sarah, Tom +2</p>
                          <div className="mt-2 flex -space-x-2">
                             {/* eslint-disable-next-line @next/next/no-img-element */}
                            <div className="size-5 rounded-full border-2 border-white dark:border-slate-800 bg-slate-200 bg-cover" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBqt_JaErQkEd2dXP9GVVNIjcEl7PiROS5QginwXq1D8BAvxPPtK2ErLUX8v6wsaaoJvhbCqSkFdcTy7g2OOwRsnySjzbFRU7ZhjpKswQJWlJIRooEr59IYZj-ZwuM4CAaLqwRrdKe7Z3QXmN2RvlC1-ayvjZEq9PbC7XW_Cj-wnkFk_7nK-3Dnkm7WsETtrCP2M9rlYUxw42qH3GuvZDJxUQHmrFuj9aTHwvp06tmF6UxIO5A7XZtep8YsMT4dlK48fJqL-6lcBMPx')" }}></div>
                             {/* eslint-disable-next-line @next/next/no-img-element */}
                            <div className="size-5 rounded-full border-2 border-white dark:border-slate-800 bg-slate-200 bg-cover" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA-ERWDBKBHJfO-jCqZOVsBqcvZiKAALoGafQ5DQ9Fm6fdneqtVMDD5U7cg6NPcxAgce6Bx_Q1NuDOhDiG_BGxolm1vMYxUMcc1y4qrkoQ1QW1YhsE-jcop_rECKEg3HbvldFG0aC05jm90K13WYFT8PGqSDQQbWFh94qzHQZNHDqQWLpjQ98ihetzBadFU03887XGNBpNJdTUnR63LWX6YqvgBr91M2CGVQreESC-rauZuUvX7HOfkifmcMiVsYJTGjNDMDD-bkx1O')" }}></div>
                          </div>
                        </div>
                        <div className="absolute left-[50%] w-[25%] h-20 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-500 rounded-lg p-3 cursor-move shadow-sm group/shift hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start">
                            <p className="text-xs font-bold text-emerald-900 dark:text-emerald-200 uppercase">Stage Hands</p>
                            <span className="material-symbols-outlined text-emerald-400 text-[16px] group-hover/shift:visible invisible">drag_indicator</span>
                          </div>
                          <p className="text-[10px] text-emerald-700 dark:text-emerald-300 mt-1">2 Staff: Mike, Anna</p>
                        </div>
                      </div>
                    </div>
                    {/* Row: Entrance */}
                    <div className="flex border-b border-slate-100 dark:border-slate-800 group h-32">
                      <div className="w-48 p-4 font-bold border-r border-slate-200 dark:border-slate-800 flex flex-col justify-center bg-slate-50 dark:bg-slate-800/50">
                        <span className="text-slate-900 dark:text-slate-100">Entrance</span>
                        <span className="text-xs font-normal text-slate-400">12 Staff Active</span>
                      </div>
                      <div className="flex-1 relative p-4 flex items-center">
                        <div className="absolute left-[0%] w-[100%] h-20 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded-lg p-3 cursor-move shadow-sm group/shift hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start">
                            <p className="text-xs font-bold text-blue-900 dark:text-blue-200 uppercase">Ticketing & Security Full Day</p>
                            <span className="material-symbols-outlined text-blue-400 text-[16px] group-hover/shift:visible invisible">drag_indicator</span>
                          </div>
                          <p className="text-[10px] text-blue-700 dark:text-blue-300 mt-1">12 Staff Active</p>
                        </div>
                      </div>
                    </div>
                    {/* Row: VIP Lounge */}
                    <div className="flex border-b border-slate-100 dark:border-slate-800 group h-32">
                      <div className="w-48 p-4 font-bold border-r border-slate-200 dark:border-slate-800 flex flex-col justify-center bg-slate-50 dark:bg-slate-800/50">
                        <span className="text-slate-900 dark:text-slate-100">VIP Lounge</span>
                        <span className="text-xs font-normal text-slate-400">4 Staff Active</span>
                      </div>
                      <div className="flex-1 relative p-4 flex items-center">
                        <div className="absolute left-[30%] w-[40%] h-20 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-lg p-3 cursor-move shadow-sm group/shift hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start">
                            <p className="text-xs font-bold text-red-900 dark:text-red-200 uppercase">Medical Standby</p>
                            <span className="material-symbols-outlined text-red-400 text-[16px] group-hover/shift:visible invisible">drag_indicator</span>
                          </div>
                          <p className="text-[10px] text-red-700 dark:text-red-300 mt-1">2 Staff: Dr. Lee, Jane R.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Footer Summary */}
              <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-4 flex flex-wrap items-center justify-between gap-4">
                <div className="flex gap-8">
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Total Staff On Duty</p>
                    <p className="text-lg font-bold">42</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Open Positions</p>
                    <p className="text-lg font-bold text-red-500">3</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Budget Used</p>
                    <p className="text-lg font-bold text-emerald-500">74%</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-4 py-2 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">Export CSV</button>
                  <button className="px-4 py-2 text-sm font-bold bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">Save Draft</button>
                </div>
              </footer>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
