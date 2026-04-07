import React from 'react';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { getAdminEvents } from '@/lib/actions/event-actions';
import GateControlClient from '@/components/admin/GateControlClient';

export default async function GateControlPage() {
  const session = await getSession();

  if (!session?.user || session.user.role !== 'admin') {
    redirect('/login?callbackUrl=/admin/gate');
  }

  // Fetch published events for the selector
  const { data: events } = await getAdminEvents({ status: 'published' });

  return (
    <div className="min-h-screen bg-[#121414]">
      <GateControlClient initialEvents={events || []} />
    </div>
  );
}
