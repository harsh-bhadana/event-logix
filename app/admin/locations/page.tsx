export default function LocationsPage() {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
      <div className="relative flex h-screen w-full flex-col overflow-hidden">
        {/* Top Navigation Bar */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-3 z-20">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3 text-primary">
              <span className="material-symbols-outlined text-3xl">map</span>
              <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-tight">Venue Admin</h2>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a className="text-primary text-sm font-semibold border-b-2 border-primary pb-1" href="#">Map Editor</a>
              <a className="text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors" href="#">Schedules</a>
              <a className="text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors" href="#">Staff</a>
              <a className="text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors" href="#">Reports</a>
            </nav>
          </div>
          <div className="flex flex-1 justify-end gap-4 items-center">
            <label className="hidden sm:flex flex-col min-w-40 h-9 max-w-64">
              <div className="flex w-full flex-1 items-stretch rounded-lg h-full bg-slate-100 dark:bg-slate-800">
                <div className="text-slate-500 flex items-center justify-center pl-3">
                  <span className="material-symbols-outlined text-xl">search</span>
                </div>
                <input className="form-input w-full border-none bg-transparent focus:ring-0 text-sm placeholder:text-slate-500" placeholder="Find zone or staff..." defaultValue=""/>
              </div>
            </label>
            <div className="flex gap-2">
              <button className="flex items-center justify-center rounded-lg h-9 w-9 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-primary/10 hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-xl">notifications</span>
              </button>
              <button className="flex items-center justify-center rounded-lg h-9 w-9 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-primary/10 hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-xl">settings</span>
              </button>
            </div>
            <div className="bg-primary/20 rounded-full size-9 border border-primary/30 flex items-center justify-center overflow-hidden">
               {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="Admin User" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwCr2GFpliUI3UTr6ypYICGHJWdurueqmjRbnBvjWdzUb8fpFUKc3Bxl0KIMtvxEZ-AchylOHg4vh-ugW-R1uTzJJMxB7WnZ-xacO2wF9JrejLNCSaKX1BkFlAYAlMWtkoTo7sGFr2PoQR81TTjxw-tuUyUGhFC4Yh19t6S009qxQskh7u08RyA4YHwFVGqNqBqaQbH-5fTm_ZINVyu5MO1f63a7QZR7n3tDkRAN5i2fFV0kuU8XWrMxEl6TeXqSAKnjiZYv7ALod3"/>
            </div>
          </div>
        </header>
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar Management */}
          <aside className="w-80 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col z-10">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-bold">Venue Management</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold mt-1">Metropolitan Stadium Site Plan</p>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* Layer Toggle */}
              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-400 uppercase px-2">Map Layers</p>
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary">
                  <span className="material-symbols-outlined">layers</span>
                  <p className="text-sm font-semibold">All Active Zones</p>
                  <span className="material-symbols-outlined ml-auto text-sm">check_circle</span>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">
                  <span className="material-symbols-outlined text-slate-500">inventory_2</span>
                  <p className="text-sm font-medium">Equipment Depots</p>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">
                  <span className="material-symbols-outlined text-slate-500">medical_services</span>
                  <p className="text-sm font-medium">Medical Stations</p>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">
                  <span className="material-symbols-outlined text-slate-500">group</span>
                  <p className="text-sm font-medium">Staffing Density</p>
                </div>
              </div>
              {/* Selection Details */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                <div className="flex justify-between items-center mb-4 px-2">
                  <h4 className="font-bold text-sm">Zone: North Gate B</h4>
                  <span className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 rounded text-[10px] font-bold">ACTIVE</span>
                </div>
                <div className="space-y-4">
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                    <p className="text-[10px] text-slate-500 font-bold uppercase mb-2">Assigned Staff (12/15)</p>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img alt="Staff 1" className="size-6 rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCb-HeE8PzwWLZHY15gHsZjGDcxTJTrBE-lfaup7RgR74EwITjQS2Kot0Cy7fMNZMDkETaTy8h4Cpb3siIABaJ6V5bchHCOFy9rg8Pymc4I2mXYY9bHzRMlFpDr0k3RwGP8epmV0mavHjDZtAmMSm76iobwesJIBMwOBfZY14gtb3WW9LYMEoZC_ECzfPu9jV-x52LKz7-wCPxJ33DLMWl8N8OS_vgZzgrE68vvnb4vEPGWdowSIRbamteChiIxsPRHaWjaGfUB7AV5"/>
                        <span className="text-xs font-medium">Marcus Chen (Lead)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img alt="Staff 2" className="size-6 rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUC6Pt7EtrYESxnwmWVF5kumcfwozngNjyVwf7VFhZSb7qLX-SFAGdJTvsWFr0Xm9-96YPd1fPUadUKNUKqi_ZYq72AT9W9xq8vt55U1QJbXyOkwfsQUS-F0JysniinBGnraLKcsC-_PcZJd-FTwS9nctp4yW2srAsH8nPQGMNDKAM16K4TfifBBiqtCBngbdzeP4Vl8hJzDshqsJZFfYuKt8KIQKDhG7IA8uXyWNvyrnnVm7ySv95JVmaOoE4wfdGO8n8RXjPQpsG"/>
                        <span className="text-xs font-medium">Sarah Jenkins</span>
                      </div>
                      <button className="mt-2 text-xs font-bold text-primary flex items-center gap-1 hover:underline">
                        <span className="material-symbols-outlined text-sm">person_add</span> Manage Roster
                      </button>
                    </div>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                    <p className="text-[10px] text-slate-500 font-bold uppercase mb-2">Critical Assets</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-600 dark:text-slate-400">Radios (Digital)</span>
                        <span className="font-bold">18/20</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-primary h-full w-[90%]"></div>
                      </div>
                      <div className="flex items-center justify-between text-xs pt-1">
                        <span className="text-slate-600 dark:text-slate-400">First Aid Kits</span>
                        <span className="font-bold">04/04</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-green-500 h-full w-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/20">
              <button className="w-full bg-primary text-white py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 active:scale-95 transition-transform">
                <span className="material-symbols-outlined text-lg">add_location</span>
                Place New Pin
              </button>
            </div>
          </aside>
          {/* Main Map Area */}
          <main className="flex-1 relative bg-slate-200 dark:bg-slate-950">
            {/* Interactive Map Background */}
            <div 
              className="absolute inset-0 z-0 bg-cover bg-center overflow-hidden flex items-center justify-center" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC2o6yPzwXpQnuHt92gaXBBC550Dk8mvgcNlUmGhzYdRMkKhWmXYuX-_fEM99DAs4Ux6AsCXeAy9T6He7zz8997j1itegh7X-qIGAHlc10ImiQAbfAo0TMI1Lo4byeNoHGnE53cf2Xq0Uh1gwZyf95rOhKyPeA28yu5DBhbKUQx1NvLUOCIFut6zwJjntg5CtJbm-YuMA9ck8kgsE2BiwHAPYmwVs8RcFOxqwg90PLiVTRX2sdn0KzpC2ObZ87DrduNXEBQNSLGBY68')" }}
            >
              {/* Map Overlay Gradient for readability */}
              <div className="absolute inset-0 bg-primary/5"></div>
              {/* Custom Pins (Representational) */}
              {/* Zone A */}
              <div className="absolute top-[25%] left-[40%] group cursor-pointer">
                <div className="bg-primary text-white p-2 rounded-full shadow-xl ring-4 ring-white dark:ring-slate-900 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">stadium</span>
                </div>
                <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-800 px-2 py-1 rounded shadow text-[10px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  Main Stage Area
                </div>
              </div>
              {/* Medical Pin */}
              <div className="absolute top-[45%] left-[65%] group cursor-pointer">
                <div className="bg-red-500 text-white p-1.5 rounded-full shadow-xl ring-4 ring-white dark:ring-slate-900 animate-pulse">
                  <span className="material-symbols-outlined">medical_services</span>
                </div>
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-800 px-2 py-1 rounded shadow text-[10px] font-bold whitespace-nowrap border-l-4 border-red-500">
                  Station 04 - Alert
                </div>
              </div>
              {/* Depot Pin */}
              <div className="absolute bottom-[30%] left-[25%] group cursor-pointer">
                <div className="bg-amber-500 text-white p-2 rounded-lg shadow-xl ring-4 ring-white dark:ring-slate-900 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">inventory_2</span>
                </div>
                <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-800 px-2 py-1 rounded shadow text-[10px] font-bold whitespace-nowrap">
                  East Depot
                </div>
              </div>
              {/* Staff Density Heat Zones (Simplified SVG overlays would go here) */}
              <div className="absolute top-[20%] left-[20%] w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-[20%] right-[30%] w-48 h-48 bg-primary/20 rounded-full blur-3xl border border-primary/20"></div>
            </div>
            {/* Map Controls */}
            <div className="absolute top-6 right-6 flex flex-col gap-3 z-10">
              <div className="flex flex-col rounded-xl overflow-hidden shadow-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <button className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 border-b border-slate-200 dark:border-slate-800 transition-colors">
                  <span className="material-symbols-outlined">add</span>
                </button>
                <button className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  <span className="material-symbols-outlined">remove</span>
                </button>
              </div>
              <button className="flex items-center justify-center p-3 rounded-xl shadow-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-primary hover:bg-primary hover:text-white transition-all">
                <span className="material-symbols-outlined">my_location</span>
              </button>
            </div>
            {/* Floating Search Bar on Map */}
            <div className="absolute top-6 left-6 z-10 w-72">
              <div className="bg-white dark:bg-slate-900 p-1.5 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 flex items-center">
                <div className="p-2 text-slate-400">
                  <span className="material-symbols-outlined">search</span>
                </div>
                <input className="bg-transparent border-none focus:ring-0 text-sm w-full font-medium" placeholder="Jump to zone..." type="text"/>
                <div className="p-2 text-slate-400">
                  <span className="material-symbols-outlined text-sm">keyboard_command_key</span>
                </div>
              </div>
            </div>
            {/* Bottom Map Bar (Summary) */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 w-[90%] max-w-2xl">
              <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Total Active Staff</span>
                    <span className="text-xl font-bold">142</span>
                  </div>
                  <div className="h-8 w-px bg-slate-300 dark:bg-slate-700"></div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Open Incidents</span>
                    <span className="text-xl font-bold text-red-500">03</span>
                  </div>
                  <div className="h-8 w-px bg-slate-300 dark:bg-slate-700"></div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">System Status</span>
                    <span className="text-sm font-bold text-green-500 flex items-center gap-1">
                      <span className="size-2 bg-green-500 rounded-full"></span> Online
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-bold hover:bg-slate-200 transition-colors">
                    Event Log
                  </button>
                  <button className="px-4 py-2 bg-primary text-white rounded-lg text-xs font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity">
                    Emergency Broadcast
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
