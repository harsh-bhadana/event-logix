export default function ProfilePage() {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display min-h-screen">
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          {/* Top Navigation Bar */}
          <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 md:px-10 py-3 sticky top-0 z-50">
            <div className="flex items-center gap-4 text-primary">
              <div className="size-8 flex items-center justify-center bg-primary rounded-lg text-white">
                <span className="material-symbols-outlined">diversity_3</span>
              </div>
              <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight">Volunteer Hub</h2>
            </div>
            <div className="flex flex-1 justify-end gap-4 items-center">
              <div className="hidden md:flex gap-2">
                <button className="flex items-center justify-center rounded-lg h-10 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-3 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                  <span className="material-symbols-outlined">settings</span>
                </button>
                <button className="flex items-center justify-center rounded-lg h-10 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-3 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                  <span className="material-symbols-outlined">logout</span>
                </button>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <div 
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-primary/20" 
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAYAoFNZmhw6LmS8SAuGU__51WTp75mhH0kHFbuqFGMvnwef6YFnRBIz_WfU7VZ2FzCARTpU4bLZzwaTw9PBErcbvVvRKsMrVv0G-j7sDiNsjdxjKIDQ5gq5UMXv6Y1_H0SJvWLyw3vBqOM2dAcR1PJqqSH8dSzN-nGL71BoI1zzACzV6c0DS9vbNcC_zG-gBUYkVmgMgdzUaKJ5Q35liOk3wiD6s_fuWE1PsE9VwwKzF9XYECGBbgASz2UU4aI_1cVCZCPynLZNjjy")' }}
              ></div>
            </div>
          </header>
          <main className="flex-1 flex flex-col md:flex-row max-w-7xl mx-auto w-full p-4 md:p-8 gap-8">
            {/* Sidebar Navigation */}
            <aside className="w-full md:w-64 flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" href="#">
                  <span className="material-symbols-outlined">dashboard</span>
                  <span className="text-sm font-medium">Dashboard</span>
                </a>
                <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" href="#">
                  <span className="material-symbols-outlined">calendar_month</span>
                  <span className="text-sm font-medium">Events</span>
                </a>
                <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary transition-colors" href="#">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
                  <span className="text-sm font-bold">Profile</span>
                </a>
                <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" href="#">
                  <span className="material-symbols-outlined">mail</span>
                  <span className="text-sm font-medium">Messages</span>
                </a>
              </div>
              <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-3 mb-2">My Stats</p>
                <div className="space-y-4 px-3">
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-primary">128.5</span>
                    <span className="text-xs text-slate-500">Total Hours</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-primary">12</span>
                    <span className="text-xs text-slate-500">Events Completed</span>
                  </div>
                </div>
              </div>
            </aside>
            {/* Profile Content Area */}
            <div className="flex-1 flex flex-col gap-6">
              {/* Header Profile Card */}
              <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="relative">
                  <div 
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-32 border-4 border-slate-50 dark:border-slate-800 shadow-sm" 
                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBnR19T7hXk9SLuuN9kqqzg1GsPqSJTBUunxFPjzM2vlkR5cCSlYMygMYXS5GPJoxdYWSNgJVJL9C9AtkSw4RH4ovfi0I4A_1JjEU_YL-2KhuyTVs6ZwDQfvTPtx5ctB0BT3-zYezhNh_WJexZytmzKfFByLHoQYcQ6_HfJ_huim5lhShGeKOeZNJbheR1Zrsx6LZNOiT5W4RPHZjr1k9HBVdSAKErQlOuIZFPZ3cf3FaX7hHEqsKnZ-Pa6O4PCbBe6XeHtVzBEbVaO")' }}
                  ></div>
                  <button className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-lg hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-sm">photo_camera</span>
                  </button>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Alex Johnson</h1>
                  <p className="text-primary font-medium">Senior Event Volunteer</p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-3 text-slate-500 dark:text-slate-400 text-sm">
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-base">location_on</span> Seattle, WA</span>
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-base">calendar_today</span> Joined Jan 2023</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center justify-center rounded-lg h-10 px-5 bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors shadow-sm">
                    Edit Profile
                  </button>
                </div>
              </div>
              {/* Tabs Navigation */}
              <div className="border-b border-slate-200 dark:border-slate-800 overflow-x-auto">
                <nav className="flex gap-8 px-2">
                  <a className="border-b-2 border-primary text-primary pb-4 px-1 text-sm font-bold" href="#">Personal Info</a>
                  <a className="border-b-2 border-transparent text-slate-500 dark:text-slate-400 hover:text-primary pb-4 px-1 text-sm font-medium" href="#">Certifications</a>
                  <a className="border-b-2 border-transparent text-slate-500 dark:text-slate-400 hover:text-primary pb-4 px-1 text-sm font-medium" href="#">Schedule</a>
                  <a className="border-b-2 border-transparent text-slate-500 dark:text-slate-400 hover:text-primary pb-4 px-1 text-sm font-medium" href="#">History</a>
                </nav>
              </div>
              {/* Main Dashboard Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Upcoming Schedule */}
                <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-lg">Upcoming Schedule</h3>
                    <a className="text-primary text-sm font-medium hover:underline" href="#">View Calendar</a>
                  </div>
                  <div className="space-y-4">
                    <div className="flex gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                      <div className="flex flex-col items-center justify-center bg-white dark:bg-slate-800 rounded-lg min-w-[60px] h-[60px] border border-slate-200 dark:border-slate-700 shadow-sm">
                        <span className="text-xs font-bold text-slate-400 uppercase">Oct</span>
                        <span className="text-xl font-bold text-primary leading-tight">12</span>
                      </div>
                      <div className="flex flex-col">
                        <h4 className="font-bold text-slate-900 dark:text-white">Annual Tech Summit</h4>
                        <p className="text-sm text-slate-500">Lead Coordinator • 08:00 AM - 04:00 PM</p>
                        <p className="text-xs text-slate-400 mt-1 flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">map</span> Seattle Convention Center</p>
                      </div>
                    </div>
                    <div className="flex gap-4 p-4 rounded-lg border border-slate-100 dark:border-slate-800">
                      <div className="flex flex-col items-center justify-center bg-white dark:bg-slate-900 rounded-lg min-w-[60px] h-[60px] border border-slate-200 dark:border-slate-700">
                        <span className="text-xs font-bold text-slate-400 uppercase">Oct</span>
                        <span className="text-xl font-bold text-slate-400 dark:text-slate-500 leading-tight">24</span>
                      </div>
                      <div className="flex flex-col">
                        <h4 className="font-bold text-slate-900 dark:text-white">Charity Gala Run</h4>
                        <p className="text-sm text-slate-500">Registration Desk • 07:00 AM - 12:00 PM</p>
                        <p className="text-xs text-slate-400 mt-1 flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">map</span> Waterfront Park</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Certifications */}
                <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-lg">Certifications</h3>
                    <button className="text-primary bg-primary/10 px-3 py-1 rounded-full text-xs font-bold hover:bg-primary/20 transition-colors">+ Add New</button>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="size-12 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center">
                        <span className="material-symbols-outlined text-2xl">verified_user</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-sm">First Aid & CPR Certified</p>
                        <p className="text-xs text-slate-500">Issued by Red Cross • Valid until Dec 2025</p>
                      </div>
                      <span className="material-symbols-outlined text-slate-400 cursor-pointer">more_vert</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="size-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                        <span className="material-symbols-outlined text-2xl">event_seat</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-sm">Crowd Management Professional</p>
                        <p className="text-xs text-slate-500">Issued by FEMA • Lifetime Validity</p>
                      </div>
                      <span className="material-symbols-outlined text-slate-400 cursor-pointer">more_vert</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="size-12 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                        <span className="material-symbols-outlined text-2xl">warning</span>
                      </div>
                      <div className="flex-1 text-slate-400">
                        <p className="font-bold text-sm">Food Safety Handler (Level 1)</p>
                        <p className="text-xs">Expired Mar 2024 • Needs Renewal</p>
                      </div>
                      <button className="text-[10px] font-bold uppercase tracking-wider text-primary border border-primary px-2 py-0.5 rounded">Renew</button>
                    </div>
                  </div>
                </div>
                {/* Personal Information */}
                <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 lg:col-span-2">
                  <h3 className="font-bold text-lg mb-6">Personal Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
                        <p className="text-slate-900 dark:text-white font-medium border-b border-slate-100 dark:border-slate-800 pb-2">Alex Johnson</p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
                        <p className="text-slate-900 dark:text-white font-medium border-b border-slate-100 dark:border-slate-800 pb-2">alex.j@volunteerhub.org</p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Phone Number</label>
                        <p className="text-slate-900 dark:text-white font-medium border-b border-slate-100 dark:border-slate-800 pb-2">+1 (555) 123-4567</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Preferred Roles</label>
                        <div className="flex flex-wrap gap-2 pt-1">
                          <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-xs font-medium">Lead Coordinator</span>
                          <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-xs font-medium">Tech Support</span>
                          <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-xs font-medium">Logistics</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Emergency Contact</label>
                        <p className="text-slate-900 dark:text-white font-medium">Sarah Johnson (Spouse)</p>
                        <p className="text-sm text-slate-500">+1 (555) 987-6543</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
          {/* Footer Section */}
          <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-10 py-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-slate-500 text-sm">© 2024 Volunteer Hub. Empowering community leaders.</p>
              <div className="flex gap-6 text-sm font-medium text-slate-600 dark:text-slate-400">
                <a className="hover:text-primary" href="#">Support</a>
                <a className="hover:text-primary" href="#">Privacy Policy</a>
                <a className="hover:text-primary" href="#">Terms of Service</a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
