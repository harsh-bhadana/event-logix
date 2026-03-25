"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type WizardData = {
  // Step 1: Basic Info
  title: string;
  category: string;
  date: string;
  description: string;
  bannerImage: string | null;

  // Step 2: Ticketing & Pricing
  accessModel: "paid" | "free";
  ticketPrice: string;
  totalQuantity: string;
  pricingStrategy: "early-bird" | "group-rate" | "standard";
  taxInclusive: boolean;
  showFeeBreakdown: boolean;

  // Step 3: Staffing Needs
  staffRoles: {
    id: string;
    name: string;
    description: string;
    headcount: number;
    icon: string;
  }[];
};

const initialData: WizardData = {
  title: "",
  category: "Corporate Strategy",
  date: "",
  description: "",
  bannerImage: null,
  accessModel: "paid",
  ticketPrice: "149.00",
  totalQuantity: "250",
  pricingStrategy: "early-bird",
  taxInclusive: true,
  showFeeBreakdown: false,
  staffRoles: [
    { id: "1", name: "Security Team", description: "Entrance control & perimeter monitoring", headcount: 12, icon: "security" },
    { id: "2", name: "Greeting & Registration", description: "Guest check-in and information desk", headcount: 4, icon: "support_agent" },
    { id: "3", name: "Tech Support", description: "AV equipment and connectivity management", headcount: 3, icon: "precision_manufacturing" },
  ],
};

type WizardContextType = {
  data: WizardData;
  updateData: (newData: Partial<WizardData>) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  eventId?: string;
};

const WizardContext = createContext<WizardContextType | undefined>(undefined);

export function WizardProvider({ 
  children, 
  initialData: propsInitialData,
  eventId 
}: { 
  children: ReactNode, 
  initialData?: WizardData,
  eventId?: string
}) {
  const [data, setData] = useState<WizardData>(propsInitialData || initialData);
  const [currentStep, setCurrentStep] = useState(1);

  const updateData = (newData: Partial<WizardData>) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <WizardContext.Provider value={{ data, updateData, currentStep, setCurrentStep, eventId }}>
      {children}
    </WizardContext.Provider>
  );
}

export function useWizard() {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error("useWizard must be used within a WizardProvider");
  }
  return context;
}
