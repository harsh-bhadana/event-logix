"use client";

import { useWizard } from "@/hooks/useEventWizard";
import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";
import { publishEvent, updateEvent } from "@/lib/actions/event-actions";
import { useState } from "react";
import { useRouter } from "next/navigation";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function WizardFooter() {
  const router = useRouter();
  const { data, currentStep, setCurrentStep, eventId } = useWizard();
  const [isPublishing, setIsPublishing] = useState(false);

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return !!(data.title && data.date && data.description && data.category);
      case 2:
        return !!(data.totalQuantity && (data.accessModel === 'free' || data.ticketPrice));
      case 3:
        return data.staffRoles.length > 0;
      default:
        return true;
    }
  };

  const handleNext = async () => {
    if (!validateStep(currentStep)) {
      alert("Please fill in all required fields before proceeding.");
      return;
    }

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else {
      setIsPublishing(true);
      try {
        const result = eventId 
          ? await updateEvent(eventId, data)
          : await publishEvent(data);
          
        if (result.success) {
          router.push("/admin/events");
          router.refresh();
        } else {
          alert("Error: " + result.message);
        }
      } catch (error) {
        console.error("Failed to process event:", error);
        alert("An unexpected error occurred.");
      } finally {
        setIsPublishing(false);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <footer className="bg-background dark:bg-neutral-900 border-t border-outline-variant/10 fixed bottom-0 right-0 w-[calc(100%-16rem)] flex justify-between items-center px-12 py-6 ml-64 shadow-lg z-50">
      <div className="flex items-center gap-4">
        <span className="font-body font-semibold text-sm text-on-surface-variant dark:text-neutral-400">
          © 2024 Event Logix
        </span>
      </div>
      <div className="flex items-center gap-4">
        {currentStep > 1 && (
          <button
            onClick={handlePrevious}
            className="text-primary dark:text-primary-fixed px-6 py-2 border border-primary/10 font-body font-semibold text-sm hover:bg-surface-container-low transition-all active:scale-95 duration-150 rounded-md"
          >
            Previous
          </button>
        )}
        <button
          onClick={handleNext}
          disabled={isPublishing}
          className={cn(
            "bg-gradient-to-r from-primary to-primary-dim text-on-primary px-8 py-2 rounded-md font-body font-semibold text-sm hover:brightness-110 transition-all active:scale-95 duration-150 flex items-center gap-2",
            isPublishing && "opacity-70 cursor-not-allowed"
          )}
        >
          {isPublishing ? "Processing..." : currentStep === 4 ? (eventId ? "Update Event" : "Publish Event") : "Next Step"}
          {!isPublishing && (
            <span className="material-symbols-outlined text-sm">
              {currentStep === 4 ? (eventId ? "save" : "rocket_launch") : "arrow_forward"}
            </span>
          )}
        </button>
      </div>
    </footer>
  );
}
