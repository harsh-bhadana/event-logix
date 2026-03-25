"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { WizardProvider, useWizard, WizardData } from "@/hooks/useEventWizard";
import { WizardSidebar } from "@/components/ui/WizardSidebar";
import { WizardFooter } from "@/components/ui/WizardFooter";
import { Step1BasicInfo } from "@/components/features/events/Step1BasicInfo";
import { Step2Ticketing } from "@/components/features/events/Step2Ticketing";
import { Step3Staffing } from "@/components/features/events/Step3Staffing";
import { Step4Review } from "@/components/features/events/Step4Review";
import { getEventById } from "@/lib/actions/event-actions";

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

function EditWizardInner() {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] bg-surface relative">
        <WizardSidebar />
        <WizardContent />
        <WizardFooter />
      </div>
    );
}

export default function EditEventPage() {
  const params = useParams();
  const id = params.id as string;
  const [initialData, setInitialData] = useState<WizardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvent() {
      if (!id) return;
      
      const result = await getEventById(id);
      if (result.success && result.data) {
        const event = result.data;
        
        // Map event model data to WizardData structure
        const mappedData: WizardData = {
          title: event.title || "",
          category: event.category || "Corporate Strategy",
          date: event.date ? new Date(event.date).toISOString().split('T')[0] : "",
          description: event.description || "",
          bannerImage: event.imageUrl || null,
          accessModel: event.accessModel || "paid",
          ticketPrice: event.ticketTypes?.[0]?.price?.toString() || "0",
          totalQuantity: event.ticketTypes?.[0]?.quantity?.toString() || "0",
          pricingStrategy: event.pricingStrategy || "standard",
          taxInclusive: event.taxInclusive ?? true,
          showFeeBreakdown: event.showFeeBreakdown ?? false,
          staffRoles: event.staffRolesNeeded?.map((role: any, index: number) => ({
             id: (index + 1).toString(),
             name: role.roleName,
             description: "", // Description not in model, fill if needed
             headcount: role.count,
             icon: "person"
          })) || []
        };
        
        setInitialData(mappedData);
      }
      setLoading(false);
    }
    
    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-surface">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          <p className="text-on-surface-variant font-medium animate-pulse">Retrieving event data...</p>
        </div>
      </div>
    );
  }

  if (!initialData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-surface text-on-surface">
        <div className="text-center p-12 bg-surface-container-low rounded-[2rem] border border-outline-variant/10 max-w-md">
          <span className="material-symbols-outlined text-error text-6xl mb-4">event_busy</span>
          <h2 className="text-2xl font-black mb-2">Event Not Found</h2>
          <p className="text-on-surface-variant mb-8">We couldn't find the event you're trying to edit. It may have been deleted.</p>
          <a href="/admin/events" className="inline-block px-8 py-3 bg-primary text-on-primary font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
            Return to Ledger
          </a>
        </div>
      </div>
    );
  }

  return (
    <WizardProvider initialData={initialData} eventId={id}>
      <EditWizardInner />
    </WizardProvider>
  );
}
