export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background-light dark:bg-background-dark p-24 text-slate-900 dark:text-white font-display">
      <div className="flex flex-col items-center gap-6 text-center">
        <span className="material-symbols-outlined text-6xl text-primary">dashboard</span>
        <h1 className="text-4xl font-black tracking-tight">Staff Dashboard</h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg max-w-md">
          Welcome to your EventLogix command center. Here you can manage your shifts, view upcoming events, and track your rewards.
        </p>
        <div className="flex gap-4">
          <button className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary/90 transition-all">
            Find Shifts
          </button>
          <button className="border-2 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white px-8 py-3 rounded-lg font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
            My Rewards
          </button>
        </div>
      </div>
    </div>
  );
}
