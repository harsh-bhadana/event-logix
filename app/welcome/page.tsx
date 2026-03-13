export default function StaffWelcomePage() {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased min-h-screen">
      <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark group/design-root overflow-x-hidden">
        {/* Top Bar */}
        <div className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between sticky top-0 z-50">
          <div className="text-slate-900 dark:text-slate-100 flex size-12 shrink-0 items-center justify-start cursor-pointer transition-colors hover:text-primary">
            <span className="material-symbols-outlined text-2xl">close</span>
          </div>
          <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-12">Welcome</h2>
        </div>
        {/* Celebration Hero Section */}
        <div className="px-0 sm:px-4 py-3 max-w-2xl mx-auto w-full">
          <div 
            className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-center items-center overflow-hidden bg-primary/10 rounded-none sm:rounded-2xl min-h-[320px] relative shadow-lg" 
            style={{ 
                backgroundImage: 'linear-gradient(rgba(15, 73, 189, 0.4), rgba(15, 73, 189, 0.6)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBrtcsIdBc3qcKbtr7S10cT9Z2EPn2_3VXbF_AurayoCWfwdQ9yG1-lxKKUIGTxdOcuwQbN_ecrZc4-7FxHDUMEZ6bVhDFosIzDiWmlS_FPKx3sxBV51Ym2kg6m0h714hjDdbbk1g5d6Q7arErFRTRdk6d2o-mt6-QikPb3Yh0aP7VxLgOrqRzetAMZRBXKwNXvX10EAjrZ8DB8p-IUfHGsiWEaG1wWGltDOyYlr6dK_JiPLWLcRkTcNqg6SyWmo4yCw_y90RvCRYzI")',
                backgroundBlendMode: 'overlay'
            }}
          >
            {/* Celebration Icon/Overlay */}
            <div className="bg-primary text-white rounded-full p-6 shadow-2xl shadow-primary/50 flex items-center justify-center animate-bounce">
              <span className="material-symbols-outlined text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>celebration</span>
            </div>
            {/* Floating Decorative Elements */}
            <div className="absolute top-10 left-10 text-white/40 animate-pulse">
              <span className="material-symbols-outlined text-3xl">star</span>
            </div>
            <div className="absolute bottom-10 right-10 text-white/40 animate-pulse delay-700">
              <span className="material-symbols-outlined text-3xl">favorite</span>
            </div>
          </div>
        </div>
        {/* Success Message */}
        <div className="px-6">
          <h1 className="text-slate-900 dark:text-slate-100 tracking-tight text-[32px] sm:text-[40px] font-black leading-tight text-center pb-3 pt-8">
            You&apos;re In! <br /><span className="text-primary">Welcome to the Event Team</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg font-medium leading-relaxed pb-6 text-center max-w-md mx-auto">
            We&apos;re thrilled to have you on board. Your application has been approved. Here&apos;s how you can hit the ground running:
          </p>
        </div>
        {/* Checklist / Summary */}
        <div className="px-6 max-w-lg mx-auto w-full pb-10">
          <div className="bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-700 shadow-sm">
            <label className="flex items-center gap-x-4 p-5 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors rounded-t-2xl group">
              <div className="relative flex items-center">
                <input className="peer h-6 w-6 rounded-full border-slate-300 dark:border-slate-600 border-2 bg-transparent text-primary checked:bg-primary/10 checked:border-primary focus:ring-0 focus:ring-offset-0 focus:outline-none appearance-none transition-all" type="checkbox" />
                <span className="material-symbols-outlined absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-primary text-sm opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity">check</span>
              </div>
              <div className="flex flex-col">
                <span className="text-slate-900 dark:text-slate-100 text-base font-bold group-hover:text-primary transition-colors">Complete your profile</span>
                <span className="text-slate-500 dark:text-slate-400 text-sm">Stand out to event managers</span>
              </div>
            </label>
            <label className="flex items-center gap-x-4 p-5 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group">
              <div className="relative flex items-center">
                <input className="peer h-6 w-6 rounded-full border-slate-300 dark:border-slate-600 border-2 bg-transparent text-primary checked:bg-primary/10 checked:border-primary focus:ring-0 focus:ring-offset-0 focus:outline-none appearance-none transition-all" type="checkbox" />
                <span className="material-symbols-outlined absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-primary text-sm opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity">check</span>
              </div>
              <div className="flex flex-col">
                <span className="text-slate-900 dark:text-slate-100 text-base font-bold group-hover:text-primary transition-colors">Claim your first shift</span>
                <span className="text-slate-500 dark:text-slate-400 text-sm">Browse the upcoming schedule</span>
              </div>
            </label>
            <label className="flex items-center gap-x-4 p-5 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors rounded-b-2xl group">
              <div className="relative flex items-center">
                <input className="peer h-6 w-6 rounded-full border-slate-300 dark:border-slate-600 border-2 bg-transparent text-primary checked:bg-primary/10 checked:border-primary focus:ring-0 focus:ring-offset-0 focus:outline-none appearance-none transition-all" type="checkbox" />
                <span className="material-symbols-outlined absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-primary text-sm opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity">check</span>
              </div>
              <div className="flex flex-col">
                <span className="text-slate-900 dark:text-slate-100 text-base font-bold group-hover:text-primary transition-colors">Review briefing library</span>
                <span className="text-slate-500 dark:text-slate-400 text-sm">Read the latest event guidelines</span>
              </div>
            </label>
          </div>
        </div>
        {/* Actions Footer */}
        <div className="mt-auto p-6 space-y-3 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md sticky bottom-0 border-t border-slate-200 dark:border-slate-800 z-40">
          <button className="w-full bg-primary hover:opacity-90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/30 transition-all flex items-center justify-center gap-2 active:scale-95 group">
            Get Started
            <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
          </button>
          <button className="w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 font-bold py-4 rounded-xl transition-all active:scale-95">
            View My Profile
          </button>
        </div>
        <div className="h-4 bg-background-light dark:bg-background-dark"></div>
      </div>
    </div>
  );
}
