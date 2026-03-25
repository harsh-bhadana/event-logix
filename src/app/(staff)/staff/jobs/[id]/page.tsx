import React from 'react';
import { getShiftDetails } from '@/lib/actions/staff-actions';
import { getSession } from '@/lib/auth';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ShiftDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const session = await getSession();
  if (!session?.user) return <div>Unauthorized</div>;

  const result = await getShiftDetails(session.user.id, id);
  if (!result.success || !result.data) {
    return (
      <div className="p-20 text-center">
        <h2 className="text-2xl font-bold text-error">Shift Not Found</h2>
        <p className="text-on-surface-variant">We couldn't find your assignment for this event.</p>
        <Link href="/staff/schedule" className="mt-8 inline-block text-primary font-bold underline">Return to Schedule</Link>
      </div>
    );
  }

  const { event, shift } = result.data;

  return (
    <div className="px-10 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <Link href="/staff/schedule" className="text-sm font-black text-primary uppercase tracking-widest flex items-center gap-2 mb-4 hover:gap-3 transition-all">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Back to Schedule
          </Link>
          <h1 className="text-5xl font-black tracking-tighter text-on-surface font-headline italic">{event.title}</h1>
          <div className="mt-2 flex flex-wrap gap-4 items-center text-on-surface-variant font-medium">
            <span className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">calendar_today</span> {new Date(event.date).toLocaleDateString()}</span>
            <span className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">location_on</span> {event.locationName || event.location.address}</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="px-6 py-3 bg-primary/10 rounded-2xl border border-primary/20">
            <p className="text-[10px] font-black uppercase tracking-widest text-primary leading-none mb-1">Your Role</p>
            <p className="text-2xl font-black text-primary font-headline tracking-tight">{shift?.role || "Assigned Provider"}</p>
          </div>
          <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Rate: $25.00/hr (Estimated)</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-12">
          {/* Venue & Logistics */}
          <section>
            <h2 className="text-2xl font-black text-on-surface font-headline tracking-tighter mb-8 bg-surface-container-low px-6 py-3 rounded-2xl inline-block">Venue & Entry</h2>
            <div className="bg-white rounded-[3rem] border border-outline-variant/10 shadow-sm overflow-hidden h-[400px] relative">
              {/* This would be a real map in production */}
              <div className="absolute inset-0 bg-surface-container-lowest flex items-center justify-center">
                <div className="text-center group">
                  <span className="material-symbols-outlined text-6xl text-primary animate-bounce">location_on</span>
                  <p className="mt-4 font-bold text-on-surface">{event.location?.address || "Venure Address Details"}</p>
                  <p className="text-xs text-on-surface-variant max-w-[200px] mx-auto mt-2">Staff Entry is located at the **North Gate** behind the main lobby.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Role Checklist */}
          <section>
            <h2 className="text-2xl font-black text-on-surface font-headline tracking-tighter mb-8 bg-surface-container-low px-6 py-3 rounded-2xl inline-block">Required Prep</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: 'checkroom', title: 'Uniform', desc: 'All black attire, professional shoes.' },
                { icon: 'badge', title: 'Identification', desc: 'Valid Govt ID and Event Logix App QR.' },
                { icon: 'schedule', title: 'Briefing', desc: 'Arrive 15 mins early for safety walkthrough.' },
                { icon: 'inventory_2', title: 'Materials', desc: 'Equipment provided on-site.' }
              ].map((item) => (
                <div key={item.title} className="p-8 bg-white rounded-3xl border border-outline-variant/10 flex items-start gap-6 hover:shadow-xl hover:shadow-primary/5 transition-all">
                  <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-primary">{item.icon}</span>
                  </div>
                  <div>
                    <h4 className="font-black text-on-surface text-lg leading-none mb-2">{item.title}</h4>
                    <p className="text-sm text-on-surface-variant font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Action Sidebar */}
        <div className="space-y-8">
          <div className="p-10 bg-on-surface rounded-[3rem] text-on-primary shadow-2xl">
            <h3 className="text-2xl font-black font-headline tracking-tighter mb-6">Staff Control</h3>
            <div className="space-y-4">
              <button className="w-full py-4 bg-primary text-on-primary rounded-2xl font-black text-sm uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all">
                Mark as Arrived
              </button>
              <button className="w-full py-4 border-2 border-primary/20 text-primary-container rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-primary/5 transition-all">
                Contact Lead
              </button>
            </div>
            <p className="mt-8 text-[9px] font-bold text-on-surface-variant uppercase tracking-widest opacity-60 leading-relaxed">
              By marking arrival, you agree to follow the standard operating procedures and safety guidelines of Event Logix and the Venue.
            </p>
          </div>

          <div className="p-8 bg-white rounded-[2.5rem] border border-outline-variant/10">
            <h4 className="font-black text-on-surface-variant text-xs uppercase tracking-widest mb-4">Event Description</h4>
            <p className="text-sm text-on-surface leading-relaxed font-body">
              {event.description?.slice(0, 200)}...
            </p>
            <Link href={`/events/${event._id}`} className="mt-4 inline-block text-xs font-black text-primary hover:underline uppercase tracking-tighter">View Public Page</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
