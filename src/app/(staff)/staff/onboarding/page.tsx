import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { OnboardingForm } from "@/components/staff/OnboardingForm";

export default async function OnboardingPage() {
  const session = await getSession();
  
  if (!session || session.user.role !== 'staff') {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#fbf9f7] py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-black tracking-tighter text-on-surface font-headline mb-4">Complete Your Profile</h1>
          <p className="text-on-surface-variant font-medium">Help us match you with the best event opportunities in the ledger.</p>
        </div>

        <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-xl shadow-primary/5 border border-outline-variant/10">
          <OnboardingForm user={session.user} />
        </div>
      </div>
    </div>
  );
}
