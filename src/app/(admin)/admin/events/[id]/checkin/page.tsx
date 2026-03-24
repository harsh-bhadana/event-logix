import React from 'react';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { getEventById } from '@/lib/actions/event-actions';
import CheckinClient from '@/components/admin/CheckinClient';

export default async function CheckinPage({ params }: { params: { id: string } }) {
  const session = await getSession();
  const { id } = params;

  if (!session?.user || session.user.role !== 'admin') {
    redirect(`/login?callbackUrl=/admin/events/${id}/checkin`);
  }

  const { data: event, success } = await getEventById(id);

  if (!success || !event) {
    return (
      <div className="p-10 text-center bg-[#121414] min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold text-red-500 font-headline">Event not found.</h2>
        <p className="text-slate-500 mt-2">The record for this event could not be retrieved.</p>
        <button 
          onClick={() => window.history.back()}
          className="mt-6 px-6 py-2 bg-white/10 text-white rounded-full text-sm font-bold"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <CheckinClient 
      eventId={id} 
      eventTitle={event.title} 
    />
  );
}
