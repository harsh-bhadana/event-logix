"use client";

import { useWizard } from "@/hooks/useEventWizard";
import { cn } from "@/lib/cn";

const steps = [
  { id: 1, title: "Basic Info", icon: "info" },
  { id: 2, title: "Ticketing & Pricing", icon: "payments" },
  { id: 3, title: "Staffing Needs", icon: "group" },
  { id: 4, title: "Review & Publish", icon: "publish" },
];

export function WizardSidebar() {
  const { currentStep, setCurrentStep } = useWizard();
  const completionPercentage = (currentStep / 4) * 100;

  return (
    <aside className="bg-surface-container-low dark:bg-neutral-900 border-r border-outline-variant/10 h-[calc(100vh-4rem)] w-64 fixed left-0 top-16 flex flex-col py-8 px-6 gap-8 z-40">
      <div className="mb-2">
        <h2 className="font-headline font-bold text-primary text-lg tracking-tight">Event Setup</h2>
        <p className="font-body text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">
          Wizard Progress
        </p>
      </div>
      <nav className="flex flex-col gap-4">
        {steps.map((step) => {
          const isActive = currentStep === step.id;
          const isPast = currentStep > step.id;

          return (
            <button
              key={step.id}
              onClick={() => setCurrentStep(step.id)}
              className={cn(
                "relative flex items-center gap-3 py-2 transition-all duration-300 ease-in-out font-body text-sm font-medium w-full text-left",
                isActive
                  ? "text-primary dark:text-primary-fixed font-bold before:absolute before:left-[-24px] before:w-1 before:h-8 before:bg-primary"
                  : isPast
                  ? "text-primary/70 font-semibold"
                  : "text-on-surface-variant hover:text-primary"
              )}
            >
              <span className={cn("material-symbols-outlined", isActive && "fill-1")}>
                {step.icon}
              </span>
              <span>{step.title}</span>
            </button>
          );
        })}
      </nav>
      <div className="mt-auto p-4 bg-surface-container-lowest/50 rounded-xl border border-outline-variant/10">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-tight">
            Step {currentStep} of 4
          </span>
          <span className="text-[10px] font-bold text-primary">
            {Math.round(completionPercentage)}%
          </span>
        </div>
        <div className="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
          <div 
            className="bg-primary h-full transition-all duration-500 ease-out" 
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>
    </aside>
  );
}
