"use client";

import { useWizard } from "@/hooks/useEventWizard";
import { Step1BasicInfo } from "@/components/features/events/Step1BasicInfo";
import { Step2Ticketing } from "@/components/features/events/Step2Ticketing";
import { Step3Staffing } from "@/components/features/events/Step3Staffing";
import { Step4Review } from "@/components/features/events/Step4Review";

export default function NewEventPage() {
  const { currentStep } = useWizard();

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1BasicInfo />;
      case 2:
        return <Step2Ticketing />;
      case 3:
        return <Step3Staffing />;
      case 4:
        return <Step4Review />;
      default:
        return <Step1BasicInfo />;
    }
  };

  return (
    <div className="w-full min-h-screen bg-surface">
      {renderStep()}
    </div>
  );
}
