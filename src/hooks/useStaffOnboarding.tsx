"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type StaffOnboardingData = {
  // Step 1: Personal Info
  name: string;
  email: string;
  password: string;

  // Step 2: Professional Details
  profileImage: string | null;
  bio: string;
  yearsOfExperience: string;
  noticePeriod: string;

  // Step 3: Skills & Roles
  skills: string[];
  customTags: string[];

  // Step 4: Verification & Availability
  availability: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
  };
  verificationDocs: string[];
};

const initialData: StaffOnboardingData = {
  name: "",
  email: "",
  password: "",
  profileImage: null,
  bio: "",
  yearsOfExperience: "",
  noticePeriod: "",
  skills: [],
  customTags: [],
  availability: {
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: false,
    sunday: false,
  },
  verificationDocs: [],
};

type OnboardingContextType = {
  data: StaffOnboardingData;
  updateData: (newData: Partial<StaffOnboardingData>) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function StaffOnboardingProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<StaffOnboardingData>(initialData);
  const [currentStep, setCurrentStep] = useState(1);

  const updateData = (newData: Partial<StaffOnboardingData>) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <OnboardingContext.Provider value={{ data, updateData, currentStep, setCurrentStep }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useStaffOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useStaffOnboarding must be used within a StaffOnboardingProvider");
  }
  return context;
}
