export default function StaffPortalPage() {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased min-h-screen">
      <div className="relative flex min-h-screen w-full max-w-md mx-auto flex-col bg-background-light dark:bg-background-dark shadow-xl overflow-x-hidden">
        {/* Header */}
        <header className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between sticky top-0 z-10 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <span className="material-symbols-outlined">account_circle</span>
            </div>
            <div>
              <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight">Staff Portal</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Welcome back, Alex</p>
            </div>
          </div>
          <div className="flex items-center">
            <button className="relative flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 flex h-2 w-2 rounded-full bg-red-500"></span>
            </button>
          </div>
        </header>
        {/* Current Shift Section */}
        <main className="flex-1 overflow-y-auto pb-24">
          <div className="px-4 pt-6 pb-2">
            <h2 className="text-slate-900 dark:text-slate-100 text-xl font-bold tracking-tight">Current Shift</h2>
          </div>
          <div className="p-4">
            <div className="flex flex-col overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <div 
                className="w-full h-48 bg-center bg-no-repeat bg-cover relative" 
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDZlblKwGXONI8Or5cogjeDWEZLYGar_3jm4dhzx3jnBd1GSYvdpdFQeK7BIuIT1QR3JuBtOZAwQ8_WZzXE9cJbb2mnSoI3_n5z9ibR3tuJ5ccPWwTlPlk-zzdQrZQC4I1F4jWApBI5W4bxmsLN4mqLWr48Lf80v83xoi-YIDifwZ7rGVguX1k-V4ogrTy-PLg7QvCxX57yVZTuUG1k1tLig4V4QnchT_hHp88xcVGvRUHDk4bljuULCk0juc_EWC9-oBJS6-GMVoBv')" }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <span className="px-2 py-1 rounded-md bg-primary text-white text-[10px] font-bold uppercase tracking-wider">Active Today</span>
                </div>
              </div>
              <div className="flex flex-col p-5">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-slate-900 dark:text-slate-100 text-xl font-bold leading-tight">Morning Volunteer Shift</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">location_on</span> Community Center
                    </p>
                    <p className="text-slate-500 dark:text-slate-400 text-sm flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">schedule</span> 08:00 AM - 12:00 PM
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <button className="w-full flex items-center justify-center gap-2 rounded-xl h-14 bg-primary text-white text-lg font-bold shadow-lg shadow-primary/20 active:scale-[0.98] transition-transform">
                    <span className="material-symbols-outlined">login</span>
                    Check-In Now
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 rounded-xl h-12 bg-primary/10 text-primary text-sm font-semibold">
                    <span className="material-symbols-outlined text-[20px]">description</span>
                    View Briefing
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Next Shifts */}
          <div className="px-4 pt-4 pb-2">
            <div className="flex items-center justify-between">
              <h3 className="text-slate-900 dark:text-slate-100 text-lg font-bold tracking-tight">Next Shifts</h3>
              <button className="text-primary text-sm font-semibold">See all</button>
            </div>
          </div>
          <div className="space-y-3 px-4">
            {/* Shift Item 1 */}
            <div className="flex items-center gap-4 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="flex flex-col items-center justify-center w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                <span className="text-[10px] font-bold uppercase">Oct</span>
                <span className="text-lg font-bold leading-none">14</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-slate-900 dark:text-white font-semibold truncate">Evening Distribution</h4>
                <p className="text-slate-500 dark:text-slate-400 text-xs truncate">Food Bank • 05:00 PM - 09:00 PM</p>
              </div>
              <button className="p-2 text-slate-400 dark:text-slate-500">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
            {/* Shift Item 2 */}
            <div className="flex items-center gap-4 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="flex flex-col items-center justify-center w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                <span className="text-[10px] font-bold uppercase">Oct</span>
                <span className="text-lg font-bold leading-none">16</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-slate-900 dark:text-white font-semibold truncate">Workshop Support</h4>
                <p className="text-slate-500 dark:text-slate-400 text-xs truncate">Main Hall • 09:00 AM - 01:00 PM</p>
              </div>
              <button className="p-2 text-slate-400 dark:text-slate-500">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
          {/* Announcements / Support */}
          <div className="p-4 mt-4">
            <div className="rounded-xl bg-primary/5 border border-primary/10 p-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="material-symbols-outlined text-primary">info</span>
                <h4 className="text-primary font-bold">Today&apos;s Update</h4>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                The North Gate will be closed for maintenance. Please use the main entrance for check-in.
              </p>
            </div>
          </div>
        </main>
        {/* Bottom Navigation Bar */}
        <nav className="fixed bottom-0 left-0 right-0 mx-auto max-w-md bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 px-6 pb-6 pt-3 flex justify-between items-center z-20">
          <a className="flex flex-col items-center gap-1 group" href="#">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <span className="material-symbols-outlined">calendar_today</span>
            </div>
            <span className="text-[10px] font-bold text-primary uppercase tracking-tighter">Schedule</span>
          </a>
          <a className="flex flex-col items-center gap-1 group opacity-60" href="#">
            <div className="flex h-10 w-10 items-center justify-center rounded-full text-slate-500 dark:text-slate-400">
              <span className="material-symbols-outlined">menu_book</span>
            </div>
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tighter">Briefings</span>
          </a>
          <a className="flex flex-col items-center gap-1 group opacity-60" href="#">
            <div className="flex h-10 w-10 items-center justify-center rounded-full text-slate-500 dark:text-slate-400">
              <span className="material-symbols-outlined">person</span>
            </div>
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tighter">Profile</span>
          </a>
        </nav>
      </div>
    </div>
  );
}
