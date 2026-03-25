import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { StaffOnboardingProvider } from "@/hooks/useStaffOnboarding";
import StaffOnboardingWizard from "@/components/features/onboarding/StaffOnboardingWizard";

export default async function OnboardingPage() {
  const session = await getSession();
  
  if (!session || session.user.role !== 'staff') {
    redirect("/login");
  }

  return (
    <StaffOnboardingProvider 
      initialStep={2} 
      isExistingUser={true}
      initialData={{ 
        name: session.user.name || "", 
        email: session.user.email || "" 
      }}
    >
      <StaffOnboardingWizard user={session.user} />
    </StaffOnboardingProvider>
  );
}
