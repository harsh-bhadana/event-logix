import Link from "next/link";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";
import { Input, Checkbox } from "@/components/ui/Input";

export default function OnboardingPage() {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased min-h-screen">
      {/* Main Container */}
      <div className="relative flex min-h-screen w-full flex-col max-w-md mx-auto bg-background-light dark:bg-background-dark shadow-xl border-x border-slate-200 dark:border-slate-800">
        {/* TopAppBar */}
        <header className="sticky top-0 z-10 bg-background-light dark:bg-background-dark border-b border-primary/10">
          <div className="flex items-center p-4 justify-between">
            <Link 
              href="/"
              className="text-primary flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-primary/10 cursor-pointer transition-colors"
            >
              <Icon name="arrow_back" />
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
              <div className="flex flex-col gap-2">
                <label className="text-slate-900 dark:text-slate-100 text-sm font-semibold">Full Name</label>
                <Input icon="person" placeholder="Enter your full name" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-slate-900 dark:text-slate-100 text-sm font-semibold">Email Address</label>
                <Input type="email" icon="mail" placeholder="email@example.com" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-slate-900 dark:text-slate-100 text-sm font-semibold">Phone Number</label>
                <Input type="tel" icon="phone" placeholder="+1 (555) 000-0000" />
              </div>
            </div>

            {/* Step 2: Role Selection Preview */}
            <div className="pt-4">
              <label className="text-slate-900 dark:text-slate-100 text-sm font-semibold mb-3 block">Quick Select Role Preference</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: "security", label: "Security", active: true },
                  { icon: "medical_services", label: "Medical", active: false },
                  { icon: "inventory_2", label: "Logistics", active: false },
                ].map((role, i) => (
                  <button 
                    key={i} 
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${
                      role.active 
                        ? 'border-primary bg-primary/5 text-primary shadow-sm' 
                        : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800 hover:border-primary/40 text-slate-500'
                    }`}
                  >
                    <Icon name={role.icon} className={`mb-1 ${!role.active ? 'text-slate-400' : ''}`} />
                    <span className="text-[10px] font-bold uppercase">{role.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Document Upload Section (Preview) */}
            <div className="rounded-xl border-2 border-dashed border-primary/20 p-6 flex flex-col items-center justify-center bg-primary/5 group cursor-pointer hover:border-primary/40 transition-colors">
              <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Icon name="cloud_upload" className="text-2xl text-primary" />
              </div>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Upload Government ID</p>
              <p className="text-xs text-slate-500 text-center mt-1">PDF, JPG or PNG (Max 5MB)</p>
              <Button variant="outline" size="sm" className="mt-4 h-9 bg-white dark:bg-slate-700">Browse Files</Button>
            </div>
          </section>
        </main>

        {/* Footer Navigation */}
        <footer className="p-6 bg-background-light dark:bg-background-dark border-t border-primary/10 space-y-4">
          <div className="flex items-center gap-3">
             <Checkbox id="terms" label={<span className="text-xs text-slate-500 dark:text-slate-400">I agree to the <a className="text-primary font-semibold underline" href="#">Terms & Conditions</a> for event staffing.</span>} />
          </div>
          <Button className="w-full h-14 rounded-xl text-lg shadow-lg shadow-primary/20">
            Continue to Next Step
            <Icon name="arrow_forward" />
          </Button>
          <Button variant="ghost" className="w-full text-slate-500 hover:text-primary h-10">
            Save for Later
          </Button>
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
