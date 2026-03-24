import { TopAppBar } from "@/components/ui/TopAppBar";
import Link from "next/link";

export default function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-surface">
      {/* TopAppBar */}
      <header className="bg-[#fbf9f7] dark:bg-slate-900 border-b border-surface-container fixed w-full top-0 z-50 h-16">
        <div className="flex justify-between items-center px-8 h-full w-full max-w-7xl mx-auto">
          <div className="text-primary dark:text-[#afefdd] font-extrabold tracking-tighter text-xl">
            Executive Event Ledger
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/staff/jobs" className="text-primary dark:text-[#afefdd] border-b-2 border-primary pb-1 font-headline font-bold text-lg tracking-tight">
              Opportunities
            </Link>
            <Link href="#" className="text-on-surface-variant dark:text-slate-400 font-medium hover:text-primary font-headline font-bold text-lg tracking-tight">
              Schedule
            </Link>
            <Link href="#" className="text-on-surface-variant dark:text-slate-400 font-medium hover:text-primary font-headline font-bold text-lg tracking-tight">
              Earnings
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-surface-container-low dark:hover:bg-slate-800 transition-colors duration-200">
              <span className="material-symbols-outlined text-primary dark:text-[#afefdd]">notifications</span>
            </button>
            <button className="p-2 rounded-full hover:bg-surface-container-low dark:hover:bg-slate-800 transition-colors duration-200">
              <span className="material-symbols-outlined text-primary dark:text-[#afefdd]">account_circle</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex pt-16">
        {/* SideNavBar (Hidden on small screens) */}
        <aside className="hidden lg:flex flex-col gap-2 p-6 border-r border-transparent bg-surface-container-low dark:bg-slate-800 w-64 fixed left-0 top-16 bottom-0 z-40">
          <div className="mb-8 px-2">
            <h2 className="font-headline font-bold text-primary">Staff Portal</h2>
            <p className="text-xs text-on-surface-variant font-medium">Senior Associate</p>
          </div>
          <nav className="flex flex-col gap-1 flex-1">
            <Link href="#" className="flex items-center gap-3 px-4 py-3 text-on-surface-variant dark:text-slate-400 hover:bg-surface-container-high dark:hover:bg-slate-700/50 hover:translate-x-1 transition-transform duration-200 font-body text-sm font-medium">
              <span className="material-symbols-outlined">dashboard</span> Dashboard
            </Link>
            <Link href="/staff/jobs" className="flex items-center gap-3 px-4 py-3 bg-surface-container-lowest dark:bg-slate-700 text-primary dark:text-[#afefdd] font-bold rounded-lg shadow-sm font-body text-sm">
              <span className="material-symbols-outlined">work</span> Open Roles
            </Link>
            <Link href="#" className="flex items-center gap-3 px-4 py-3 text-on-surface-variant dark:text-slate-400 hover:bg-surface-container-high dark:hover:bg-slate-700/50 hover:translate-x-1 transition-transform duration-200 font-body text-sm font-medium">
              <span className="material-symbols-outlined">event_available</span> My Shifts
            </Link>
            <Link href="#" className="flex items-center gap-3 px-4 py-3 text-on-surface-variant dark:text-slate-400 hover:bg-surface-container-high dark:hover:bg-slate-700/50 hover:translate-x-1 transition-transform duration-200 font-body text-sm font-medium">
              <span className="material-symbols-outlined">description</span> Documents
            </Link>
            <Link href="#" className="flex items-center gap-3 px-4 py-3 text-on-surface-variant dark:text-slate-400 hover:bg-surface-container-high dark:hover:bg-slate-700/50 hover:translate-x-1 transition-transform duration-200 font-body text-sm font-medium">
              <span className="material-symbols-outlined">settings</span> Settings
            </Link>
          </nav>
          <button className="mt-auto bg-primary text-on-primary py-3 px-4 rounded-xl font-bold text-sm shadow-sm hover:opacity-90 transition-opacity">
            View Payroll
          </button>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 lg:ml-64 min-h-[calc(100vh-64px)] bg-surface">
          {children}
        </main>
      </div>
    </div>
  );
}
