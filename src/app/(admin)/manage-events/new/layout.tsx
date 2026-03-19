import { WizardSidebar } from "@/components/ui/WizardSidebar";
import { WizardFooter } from "@/components/ui/WizardFooter";
import { WizardProvider } from "@/hooks/useEventWizard";

export default function WizardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WizardProvider>
      <div className="flex flex-1 w-full relative">
        <WizardSidebar />
        <main className="ml-64 flex-1 pb-32 min-h-screen">
          {children}
        </main>
        <WizardFooter />
      </div>
    </WizardProvider>
  );
}
