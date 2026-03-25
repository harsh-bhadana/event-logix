"use client";

import React from "react";
import { WizardProvider, useWizard } from "@/hooks/useEventWizard";
import { WizardSidebar } from "@/components/ui/WizardSidebar";
import { WizardFooter } from "@/components/ui/WizardFooter";
import { Step1BasicInfo } from "@/components/features/events/Step1BasicInfo";
import { Step2Ticketing } from "@/components/features/events/Step2Ticketing";
import { Step3Staffing } from "@/components/features/events/Step3Staffing";
import { Step4Review } from "@/components/features/events/Step4Review";

function WizardContent() {
  const { currentStep } = useWizard();

  return (
    <div className="flex-1 mb-24 min-h-[calc(100vh-10rem)] bg-surface pt-6 px-4 md:px-0">
      {currentStep === 1 && <Step1BasicInfo />}
      {currentStep === 2 && <Step2Ticketing />}
      {currentStep === 3 && <Step3Staffing />}
      {currentStep === 4 && <Step4Review />}
    </div>
  );
}

export default function CreateEventPage() {
  return (
    <WizardProvider>
      <div className="flex min-h-[calc(100vh-4rem)] bg-surface relative">
        <WizardSidebar />
        <WizardContent />
        <WizardFooter />
      </div>
    </WizardProvider>
  );
}
