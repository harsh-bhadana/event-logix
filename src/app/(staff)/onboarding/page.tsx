"use client";

import React from "react";
import { StaffOnboardingProvider } from "@/hooks/useStaffOnboarding";
import StaffOnboardingWizard from "@/components/features/onboarding/StaffOnboardingWizard";

export default function StaffOnboardingPage() {
  return (
    <StaffOnboardingProvider>
      <StaffOnboardingWizard />
    </StaffOnboardingProvider>
  );
}
