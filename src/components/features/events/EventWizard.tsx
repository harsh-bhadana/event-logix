'use client';

import React, { useState } from 'react';
import { useWizard } from "@/hooks/useEventWizard";
import { Step1BasicInfo } from "./Step1BasicInfo";
import { Step2Ticketing } from "./Step2Ticketing";
import { Step3Staffing } from "./Step3Staffing";
import { Step4Review } from "./Step4Review";
import { publishEvent } from "@/lib/actions/event-actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  { id: 1, title: 'Foundational Details', icon: 'settings_suggest' },
  { id: 2, title: 'Ticketing & Pricing', icon: 'confirmation_number' },
  { id: 3, title: 'Staffing Needs', icon: 'badge' },
  { id: 4, title: 'Final Review', icon: 'verified' },
];

export default function EventWizard() {
  const { data, currentStep, setCurrentStep } = useWizard();
  const [isPublishing, setIsPublishing] = useState(false);
  const router = useRouter();

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      const res = await publishEvent(data);
      if (res.success) {
        toast.success("Event Published Successfully!");
        router.push('/admin/events');
      } else {
        toast.error(res.message || "Failed to publish event");
      }
    } catch (error) {
      toast.error("Internal Server Error");
    } finally {
      setIsPublishing(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <Step1BasicInfo />;
      case 2: return <Step2Ticketing />;
      case 3: return <Step3Staffing />;
      case 4: return <Step4Review />;
      default: return <Step1BasicInfo />;
    }
  };

  return (
    <div className="flex h-screen bg-surface overflow-hidden">
      {/* Sidebar Progress */}
      <aside className="w-80 bg-surface-container-low border-r border-outline-variant/10 flex flex-col p-10">
        <div className="mb-12">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-label font-bold text-xs uppercase tracking-widest"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Back to Dashboard
          </button>
        </div>

        <div className="flex-1 space-y-10">
          {steps.map((step) => {
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;

            return (
              <div key={step.id} className="relative flex items-center gap-4 group">
                <div className={`
                  w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500
                  ${isActive ? 'bg-primary text-on-primary shadow-lg shadow-primary/20 scale-110' : 
                    isCompleted ? 'bg-tertiary text-on-tertiary' : 'bg-surface-container-highest text-on-surface-variant/40'}
                `}>
                  <span className="material-symbols-outlined text-xl">
                    {isCompleted ? 'check' : step.icon}
                  </span>
                </div>
                <div>
                  <p className={`text-[10px] font-black uppercase tracking-widest mb-1 transition-colors ${isActive ? 'text-primary' : 'text-on-surface-variant/40'}`}>
                    Step 0{step.id}
                  </p>
                  <p className={`font-headline font-bold text-sm tracking-tight transition-colors ${isActive ? 'text-on-surface' : 'text-on-surface-variant/40'}`}>
                    {step.title}
                  </p>
                </div>
                {/* Connector line */}
                {step.id !== 4 && (
                  <div className={`absolute left-5 top-10 w-[1px] h-10 bg-outline-variant/10`} />
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-auto pt-10 border-t border-outline-variant/10">
          <div className="p-5 bg-surface-container-highest/30 rounded-2xl">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-bold text-on-surface-variant uppercase">Completion</span>
              <span className="text-xs font-black text-primary">{(currentStep / 4) * 100}%</span>
            </div>
            <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(currentStep / 4) * 100}%` }}
                className="h-full bg-primary"
              />
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative bg-surface-container-lowest overflow-hidden">
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="h-full"
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Footer */}
        <footer className="h-24 px-12 border-t border-outline-variant/10 flex items-center justify-between bg-surface-container-lowest/80 backdrop-blur-md z-10">
          <button
            onClick={handleBack}
            disabled={currentStep === 1 || isPublishing}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all
              ${currentStep === 1 ? 'opacity-20 pointer-events-none' : 'text-on-surface-variant hover:bg-surface-container-high'}
            `}
          >
            <span className="material-symbols-outlined text-sm">west</span>
            Previous Step
          </button>

          <div className="flex items-center gap-4">
            {currentStep < 4 ? (
              <button
                onClick={handleNext}
                className="group flex items-center gap-2 bg-primary text-on-primary px-8 py-3 rounded-xl font-bold text-sm shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
              >
                Continue
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">east</span>
              </button>
            ) : (
              <button
                onClick={handlePublish}
                disabled={isPublishing}
                className={`
                  flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dim text-on-primary px-10 py-3 rounded-xl font-bold text-sm shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all
                  ${isPublishing ? 'opacity-70 pointer-events-none' : ''}
                `}
              >
                {isPublishing ? (
                  <span className="animate-spin material-symbols-outlined text-sm">progress_activity</span>
                ) : (
                  <span className="material-symbols-outlined text-sm">rocket_launch</span>
                )}
                {isPublishing ? 'Publishing...' : 'Launch Event'}
              </button>
            )}
          </div>
        </footer>
      </main>
    </div>
  );
}
