"use client";

import React from "react";
import { useStaffOnboarding } from "@/hooks/useStaffOnboarding";
import Step1Account from "./Step1Account";
import Step2Professional from "./Step2Professional";
import Step3SkillsRoles from "./Step3SkillsRoles";
import Step4VerificationAvailability from "./Step4VerificationAvailability";

const STEPS = [
  { id: 1, name: "Account Details", icon: "account_circle" },
  { id: 2, name: "Professional Details", icon: "person" },
  { id: 3, name: "Skills & Roles", icon: "psychology" },
  { id: 4, name: "Verification", icon: "verified_user" },
];

export default function StaffOnboardingWizard() {
  const { currentStep, setCurrentStep } = useStaffOnboarding();

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <Step1Account />;
      case 2: return <Step2Professional />;
      case 3: return <Step3SkillsRoles />;
      case 4: return <Step4VerificationAvailability />;
      default: return <Step1Account />;
    }
  };

  return (
    <div className="flex min-h-screen bg-surface">
      {/* SideNavBar Component */}
      <aside className="bg-[#f5f3f2] dark:bg-neutral-900 h-screen w-80 fixed left-0 top-0 flex flex-col py-20 z-40 border-r border-outline-variant/10">
        <div className="px-8 mb-10">
          <h2 className="font-headline font-bold text-lg text-primary uppercase">Staff Onboarding</h2>
          <p className="text-xs text-on-surface-variant font-medium">Executive Profile Setup</p>
        </div>
        
        <nav className="flex-grow space-y-1">
          {STEPS.map((step) => (
            <div
              key={step.id}
              onClick={() => step.id < currentStep && setCurrentStep(step.id)}
              className={`relative flex items-center gap-3 py-3 px-8 transition-all cursor-pointer ${
                currentStep === step.id
                  ? "text-primary dark:text-[#afefdd] font-bold after:content-[''] after:absolute after:left-0 after:w-[2px] after:h-6 after:bg-primary"
                  : "text-on-surface-variant dark:text-neutral-400 font-medium hover:text-primary"
              }`}
            >
              <span className="material-symbols-outlined">{step.icon}</span>
              <span className="text-[0.875rem]">{step.name}</span>
            </div>
          ))}
        </nav>

        <div className="px-6 mt-auto pb-8 space-y-4">
          <div className="flex items-center gap-3 py-3 px-2 text-on-surface-variant font-medium hover:text-primary cursor-pointer transition-all">
            <span className="material-symbols-outlined">help_outline</span>
            <span className="text-sm">Help Center</span>
          </div>
          <button className="w-full bg-primary hover:bg-primary-dim text-on-primary py-3 rounded-lg font-semibold transition-all shadow-lg shadow-primary/10 active:scale-[0.98]">
            Save Progress
          </button>
        </div>
      </aside>

      {/* Main Content Canvas */}
      <main className="flex-grow ml-80 bg-surface p-12 lg:p-20 relative">
        <div className="max-w-4xl mx-auto">
          {/* Progress Tracker */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-headline font-extrabold tracking-tight text-on-surface capitalize">
                {STEPS.find(s => s.id === currentStep)?.name}
              </h1>
              <span className="bg-tertiary-container text-on-tertiary-container px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-wider">
                Step {currentStep} of 4
              </span>
            </div>
            
            {/* Stepper UI */}
            <div className="flex gap-2 h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`flex-1 transition-all duration-500 ${
                    step <= currentStep ? "bg-primary" : "bg-surface-container-highest"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Render Active Step */}
          {renderStep()}
        </div>
      </main>

      {/* Background Decorative Element */}
      <div className="fixed bottom-0 right-0 -z-10 w-1/3 h-1/2 opacity-[0.03] pointer-events-none">
        <img 
          className="w-full h-full object-cover" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuD14QG_1ki3564ne_evsbxubnccBLF4IzMSm6W1zFMHYij9hG9q9K3rR2aTj8DHSLfK27y1EcNf860DKTLwHJMtztkQgzwuZ25k2i5AqPNfvkenv-IfEfXX7p0_P-Qd9A3Hin09PEI6Qg-fXOL-hT6jScuN0iCgi5XZ2DekPC3v5s5b3g4BtJHkgwDgFRXlaXZUHiP8bmzvvZcIZqzWS5DlUBvdV7Y7GibjvfB_UzXeBTOjeIa9dZEFRbcI9Mq1NbMb8S5ECK5UNTZ6"
        />
      </div>
    </div>
  );
}
