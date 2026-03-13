import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import { Checkbox } from "@/components/ui/Input";

export default function StaffWelcomePage() {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased min-h-screen">
      <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark group/design-root overflow-x-hidden">
        {/* Top Bar */}
        <div className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between sticky top-0 z-50">
          <Button variant="ghost" size="icon" className="transition-colors hover:text-primary">
            <Icon name="close" />
          </Button>
          <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-12">Welcome</h2>
        </div>
        
        {/* Celebration Hero Section */}
        <div className="px-0 sm:px-4 py-3 max-w-2xl mx-auto w-full">
          <div 
            className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-center items-center overflow-hidden bg-primary/10 rounded-none sm:rounded-2xl min-h-[320px] relative shadow-lg" 
            style={{ 
                backgroundImage: 'linear-gradient(rgba(15, 73, 189, 0.4), rgba(15, 73, 189, 0.6)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBrtcsIdBc3qcKbtr7S10cT9Z2EPn2_3VXbF_AurayoCWfwdQ9yG1-lxKKUIGTxdOcuwQbN_ecrZc4-7FxHDUMEZ6bVhDFosIzDiWmlS_FPKx3sxBV51Ym2kg6m0h714hjDdbbk1g5d6Q7arErFRTRdk6d2o-mt6-QikPb3Yh0aP7VXlgOrqRzetAMZRBXKwNXvX10EAjrZ8DB8p-IUfHGsiWEaG1wWGltDOyYlr6dK_JiPLWLcRkTcNqg6SyWmo4yCw_y90RvCRYzI")',
                backgroundBlendMode: 'overlay'
            }}
          >
            {/* Celebration Icon/Overlay */}
            <div className="bg-primary text-white rounded-full p-6 shadow-2xl shadow-primary/50 flex items-center justify-center animate-bounce">
              <Icon name="celebration" className="text-5xl" fill />
            </div>
            {/* Floating Decorative Elements */}
            <div className="absolute top-10 left-10 text-white/40 animate-pulse">
              <Icon name="star" className="text-3xl" />
            </div>
            <div className="absolute bottom-10 right-10 text-white/40 animate-pulse delay-700">
              <Icon name="favorite" className="text-3xl" />
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
          <Card className="divide-y divide-slate-100 dark:divide-slate-700 shadow-sm" noPadding>
            <Checkbox 
              label="Complete your profile" 
              description="Stand out to event managers" 
              className="p-5 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            />
            <Checkbox 
              label="Claim your first shift" 
              description="Browse the upcoming schedule" 
              className="p-5 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            />
            <Checkbox 
              label="Review briefing library" 
              description="Read the latest event guidelines" 
              className="p-5 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            />
          </Card>
        </div>

        {/* Actions Footer */}
        <div className="mt-auto p-6 space-y-3 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md sticky bottom-0 border-t border-slate-200 dark:border-slate-800 z-40">
          <Button className="w-full h-14 text-lg rounded-xl shadow-lg shadow-primary/30 group">
            Get Started
            <Icon name="arrow_forward" className="transition-transform group-hover:translate-x-1" />
          </Button>
          <Button variant="secondary" className="w-full h-14 text-lg rounded-xl">
            View My Profile
          </Button>
        </div>
        <div className="h-4 bg-background-light dark:bg-background-dark"></div>
      </div>
    </div>
  );
}
