export default function EventSetupPage() {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
      <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          {/* Header */}
          <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 md:px-10 py-3 sticky top-0 z-50">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-4 text-primary">
                <div className="size-8 flex items-center justify-center bg-primary/10 rounded-lg">
                  <span className="material-symbols-outlined text-primary">event_available</span>
                </div>
                <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-[-0.015em]">EventPro Dashboard</h2>
              </div>
              <label className="hidden md:flex flex-col min-w-40 h-10 max-w-64">
                <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                  <div className="text-slate-500 flex border-none bg-slate-100 dark:bg-slate-800 items-center justify-center pl-4 rounded-l-lg">
                    <span className="material-symbols-outlined text-xl">search</span>
                  </div>
                  <input className="form-input flex w-full min-w-0 flex-1 border-none bg-slate-100 dark:bg-slate-800 focus:ring-0 h-full placeholder:text-slate-500 px-4 rounded-r-lg text-base font-normal" placeholder="Search events..." />
                </div>
              </label>
            </div>
            <div className="flex flex-1 justify-end gap-4 items-center">
              <div className="flex gap-2">
                <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-primary/10 hover:text-primary transition-colors">
                  <span className="material-symbols-outlined">notifications</span>
                </button>
                <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-primary/10 hover:text-primary transition-colors">
                  <span className="material-symbols-outlined">settings</span>
                </button>
              </div>
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden border border-primary/30">
                <span className="material-symbols-outlined text-primary">person</span>
              </div>
            </div>
          </header>
          <div className="flex flex-1">
            {/* Sidebar */}
            <aside className="hidden lg:flex flex-col w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 gap-6">
              <div className="flex flex-col gap-2">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3">Main Menu</p>
                <nav className="flex flex-col gap-1">
                  <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all" href="#">
                    <span className="material-symbols-outlined">dashboard</span>
                    <span className="text-sm font-medium">Dashboard</span>
                  </a>
                  <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary transition-all" href="#">
                    <span className="material-symbols-outlined">calendar_today</span>
                    <span className="text-sm font-semibold">Events</span>
                  </a>
                  <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all" href="#">
                    <span className="material-symbols-outlined">location_on</span>
                    <span className="text-sm font-medium">Venues</span>
                  </a>
                  <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all" href="#">
                    <span className="material-symbols-outlined">group</span>
                    <span className="text-sm font-medium">Vendors</span>
                  </a>
                  <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all" href="#">
                    <span className="material-symbols-outlined">analytics</span>
                    <span className="text-sm font-medium">Reports</span>
                  </a>
                </nav>
              </div>
              <div className="mt-auto p-4 bg-primary/5 rounded-xl border border-primary/10">
                <p className="text-xs font-bold text-primary uppercase mb-1">Current Focus</p>
                <p className="text-sm font-bold text-slate-900 dark:text-slate-100">Grand Victorian Wedding</p>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-3 overflow-hidden">
                  <div className="bg-primary h-full w-[65%]"></div>
                </div>
                <p className="text-[10px] text-slate-500 mt-2">65% Tasks Completed</p>
              </div>
            </aside>
            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark p-6 md:p-10">
              <div className="max-w-[1000px] mx-auto">
                {/* Breadcrumbs */}
                <nav aria-label="Breadcrumb" class="flex mb-4 text-sm text-slate-500">
                  <ol className="flex items-center space-x-2">
                    <li><a className="hover:text-primary" href="#">Events</a></li>
                    <li><span className="material-symbols-outlined text-sm">chevron_right</span></li>
                    <li className="text-slate-900 dark:text-slate-100 font-medium">Create New Event</li>
                  </ol>
                </nav>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                  <div className="flex flex-col gap-1">
                    <h1 className="text-slate-900 dark:text-slate-100 text-3xl font-black leading-tight tracking-tight">Setup New Event</h1>
                    <p className="text-slate-500 text-base">Configure the core details and initial checklist for your upcoming production.</p>
                  </div>
                  <div className="flex gap-3">
                    <button className="px-5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-800">Save Draft</button>
                    <button className="px-5 py-2.5 rounded-lg bg-primary text-white font-semibold text-sm hover:opacity-90 shadow-lg shadow-primary/20">Publish Event</button>
                  </div>
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                  {/* Form Section */}
                  <div className="xl:col-span-2 flex flex-col gap-6">
                    <section className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                      <div className="flex items-center gap-2 mb-6 text-primary">
                        <span className="material-symbols-outlined">info</span>
                        <h2 className="text-slate-900 dark:text-slate-100 text-xl font-bold">Basic Information</h2>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2 md:col-span-2">
                          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Event Name</label>
                          <input className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-slate-900 dark:text-slate-100" placeholder="e.g., Grand Victorian Wedding" type="text" defaultValue="Grand Victorian Wedding" />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Event Date</label>
                          <div className="relative">
                            <input className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-slate-900 dark:text-slate-100" type="date" />
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Expected Guests</label>
                          <input className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-slate-900 dark:text-slate-100" placeholder="0" type="number" />
                        </div>
                        <div className="flex flex-col gap-2 md:col-span-2">
                          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Venue Selection</label>
                          <select className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-slate-900 dark:text-slate-100" defaultValue="The Crystal Palace Ballroom">
                            <option>Select a venue...</option>
                            <option>The Crystal Palace Ballroom</option>
                            <option>Grand Heritage Gardens</option>
                            <option>Riverside Manor</option>
                            <option>Skyline Rooftop</option>
                          </select>
                        </div>
                      </div>
                    </section>
                    <section className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                      <div className="flex items-center gap-2 mb-6 text-primary">
                        <span className="material-symbols-outlined">map</span>
                        <h2 className="text-slate-900 dark:text-slate-100 text-xl font-bold">Venue Map Preview</h2>
                      </div>
                      <div className="aspect-video w-full rounded-lg bg-slate-100 dark:bg-slate-800 relative overflow-hidden flex items-center justify-center border border-slate-200 dark:border-slate-700">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-slate-200/50 dark:to-slate-800/50 z-0"></div>
                        <div className="z-10 text-center">
                          <span className="material-symbols-outlined text-5xl text-primary mb-2">location_on</span>
                          <p className="font-bold text-slate-900 dark:text-slate-100">The Crystal Palace Ballroom</p>
                          <p className="text-sm text-slate-500">123 Victorian Lane, London, UK</p>
                        </div>
                      </div>
                    </section>
                  </div>
                  {/* Sidebar Tools / Checklist */}
                  <div className="flex flex-col gap-6">
                    <section className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm h-full">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2 text-primary">
                          <span className="material-symbols-outlined">checklist</span>
                          <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold">Setup Tasks</h2>
                        </div>
                        <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded">High Level</span>
                      </div>
                      <div className="flex flex-col gap-4">
                        <label className="flex items-start gap-3 p-3 rounded-lg border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors group">
                          <input defaultChecked className="mt-1 rounded border-slate-300 text-primary focus:ring-primary" type="checkbox" />
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">Venue Booking Confirmed</span>
                            <span className="text-xs text-slate-500">Deposit paid and contract signed</span>
                          </div>
                        </label>
                        <label className="flex items-start gap-3 p-3 rounded-lg border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors group">
                          <input defaultChecked className="mt-1 rounded border-slate-300 text-primary focus:ring-primary" type="checkbox" />
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">Catering Menu Finalized</span>
                            <span className="text-xs text-slate-500">Tasting complete, dietary needs noted</span>
                          </div>
                        </label>
                        <label className="flex items-start gap-3 p-3 rounded-lg border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors group">
                          <input className="mt-1 rounded border-slate-300 text-primary focus:ring-primary" type="checkbox" />
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">Invitation Design & Print</span>
                            <span className="text-xs text-slate-500">Awaiting final proof from designer</span>
                          </div>
                        </label>
                        <label className="flex items-start gap-3 p-3 rounded-lg border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors group">
                          <input className="mt-1 rounded border-slate-300 text-primary focus:ring-primary" type="checkbox" />
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">Floral Arrangements</span>
                            <span className="text-xs text-slate-500">Selection of Victorian-style roses</span>
                          </div>
                        </label>
                        <label className="flex items-start gap-3 p-3 rounded-lg border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors group">
                          <input className="mt-1 rounded border-slate-300 text-primary focus:ring-primary" type="checkbox" />
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">Audio/Visual Setup</span>
                            <span className="text-xs text-slate-500">Microphones and ambient soundscape</span>
                          </div>
                        </label>
                        <button className="mt-2 w-full flex items-center justify-center gap-2 py-2 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg text-slate-400 hover:border-primary hover:text-primary transition-all text-sm font-medium">
                          <span className="material-symbols-outlined text-sm">add</span> Add Custom Task
                        </button>
                      </div>
                      <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-4">Quick Stats</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                            <p className="text-[10px] text-slate-500 uppercase font-bold">Days Left</p>
                            <p className="text-xl font-black text-primary">124</p>
                          </div>
                          <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                            <p className="text-[10px] text-slate-500 uppercase font-bold">Vendors</p>
                            <p className="text-xl font-black text-primary">8</p>
                          </div>
                        </div>
                      </div>
                    </section>
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
