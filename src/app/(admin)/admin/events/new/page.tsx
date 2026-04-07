import React from 'react';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { WizardProvider } from "@/hooks/useEventWizard";
import EventWizard from "@/components/features/events/EventWizard";

export default async function CreateEventPage() {
  const session = await getSession();

  if (!session?.user || session.user.role !== 'admin') {
    redirect('/login?callbackUrl=/admin/events/new');
  }

  return (
    <WizardProvider>
      <EventWizard />
    </WizardProvider>
  );
}
