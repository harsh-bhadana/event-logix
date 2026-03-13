import Link from "next/link";

export default function OnboardingPage() {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased min-h-screen">
      {/* Main Container */}
      <div className="relative flex min-h-screen w-full flex-col max-w-md mx-auto bg-background-light dark:bg-background-dark shadow-xl">
        {/* TopAppBar */}
        <header className="sticky top-0 z-10 bg-background-light dark:bg-background-dark border-b border-primary/10">
          <div className="flex items-center p-4 justify-between">
            <Link 
              href="/"
              className="text-primary flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-primary/10 cursor-pointer"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </Link>
            <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10">Staff Onboarding</h2>
          </div>
          {/* Progress Bar Section */}
          <div className="flex flex-col gap-2 px-6 pb-4">
            <div className="flex justify-between items-center">
              <p className="text-primary text-sm font-semibold uppercase tracking-wider">Step 1: Personal Info</p>
              <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">1 of 4</p>
            </div>
            <div className="h-2 w-full rounded-full bg-primary/20 overflow-hidden">
              <div className="h-full rounded-full bg-primary transition-all duration-300" style={{ width: "25%" }}></div>
            </div>
          </div>
        </header>

        {/* Form Content Area */}
        <main className="flex-1 overflow-y-auto px-6 py-6">
          {/* Step 1: Personal Information */}
          <section className="space-y-6">
            <div>
              <h3 className="text-slate-900 dark:text-slate-100 text-2xl font-bold leading-tight">Welcome to the team</h3>
              <p className="text-slate-500 dark:text-slate-400 mt-1">Please provide your legal details to get started with event assignments.</p>
            </div>
            <div className="space-y-4">
              {/* Name Input */}
              <div className="flex flex-col gap-2">
                <label className="text-slate-900 dark:text-slate-100 text-sm font-semibold">Full Name</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">person</span>
                  <input 
                    className="w-full pl-10 pr-4 h-12 rounded-lg border border-primary/20 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" 
                    placeholder="Enter your full name" 
                    type="text"
                  />
                </div>
              </div>
              {/* Email Input */}
              <div className="flex flex-col gap-2">
                <label className="text-slate-900 dark:text-slate-100 text-sm font-semibold">Email Address</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">mail</span>
                  <input 
                    className="w-full pl-10 pr-4 h-12 rounded-lg border border-primary/20 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" 
                    placeholder="email@example.com" 
                    type="email"
                  />
                </div>
              </div>
              {/* Phone Input */}
              <div className="flex flex-col gap-2">
                <label className="text-slate-900 dark:text-slate-100 text-sm font-semibold">Phone Number</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">phone</span>
                  <input 
                    className="w-full pl-10 pr-4 h-12 rounded-lg border border-primary/20 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" 
                    placeholder="+1 (555) 000-0000" 
                    type="tel"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Role Selection Preview */}
            <div className="pt-4">
              <label className="text-slate-900 dark:text-slate-100 text-sm font-semibold mb-3 block">Quick Select Role Preference</label>
              <div className="grid grid-cols-3 gap-3">
                <button className="flex flex-col items-center justify-center p-3 rounded-xl border-2 border-primary bg-primary/5 text-primary transition-all">
                  <span className="material-symbols-outlined mb-1">security</span>
                  <span className="text-[10px] font-bold uppercase">Security</span>
                </button>
                <button className="flex flex-col items-center justify-center p-3 rounded-xl border-2 border-primary/10 bg-white dark:bg-slate-800 hover:border-primary/40 transition-all">
                  <span className="material-symbols-outlined mb-1 text-slate-400">medical_services</span>
                  <span className="text-[10px] font-bold uppercase text-slate-500">Medical</span>
                </button>
                <button className="flex flex-col items-center justify-center p-3 rounded-xl border-2 border-primary/10 bg-white dark:bg-slate-800 hover:border-primary/40 transition-all">
                  <span className="material-symbols-outlined mb-1 text-slate-400">inventory_2</span>
                  <span className="text-[10px] font-bold uppercase text-slate-500">Logistics</span>
                </button>
              </div>
            </div>

            {/* Step 3: Document Upload Section (Preview) */}
            <div className="rounded-xl border-2 border-dashed border-primary/20 p-6 flex flex-col items-center justify-center bg-primary/5">
              <span className="material-symbols-outlined text-4xl text-primary mb-2">cloud_upload</span>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Upload Government ID</p>
              <p className="text-xs text-slate-500 text-center mt-1">PDF, JPG or PNG (Max 5MB)</p>
              <button className="mt-4 px-4 py-2 bg-white dark:bg-slate-700 text-primary text-xs font-bold rounded-lg shadow-sm border border-primary/10">Browse Files</button>
            </div>
          </section>
        </main>

        {/* Footer Navigation */}
        <footer className="p-6 bg-background-light dark:bg-background-dark border-t border-primary/10">
          <div className="flex flex-col gap-4">
            {/* Terms Link */}
            <div className="flex items-center gap-2">
              <input className="rounded border-primary/30 text-primary focus:ring-primary bg-white dark:bg-slate-800" id="terms" type="checkbox" />
              <label className="text-xs text-slate-500 dark:text-slate-400" htmlFor="terms">
                I agree to the <a className="text-primary font-semibold underline" href="#">Terms & Conditions</a> for event staffing.
              </label>
            </div>
            <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-14 rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-all">
              <span>Continue to Next Step</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
            <button className="w-full text-slate-500 font-semibold text-sm h-10 hover:text-primary transition-colors">
              Save for Later
            </button>
          </div>
        </footer>

        {/* Step Indicator Dots */}
        <div className="flex justify-center gap-2 pb-6">
          <div className="size-2 rounded-full bg-primary"></div>
          <div className="size-2 rounded-full bg-primary/20"></div>
          <div className="size-2 rounded-full bg-primary/20"></div>
          <div className="size-2 rounded-full bg-primary/20"></div>
        </div>
      </div>
    </div>
  );
}
