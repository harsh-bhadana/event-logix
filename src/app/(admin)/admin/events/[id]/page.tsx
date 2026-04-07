import React from 'react';
import { getEventRoster } from '@/lib/actions/roster-actions';
import Link from 'next/link';
import Image from 'next/image';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminEventDetailPage({ params }: PageProps) {
  const { id } = await params;
  const result = await getEventRoster(id);

  if (!result.success || !result.data) {
    return (
      <div className="p-20 text-center bg-surface min-h-screen">
        <h2 className="text-2xl font-bold text-error font-headline tracking-tight italic uppercase">Event Details Obfuscated</h2>
        <p className="text-on-surface-variant mt-2 font-medium">{result.error || "The event record could not be retrieved from the ledger."}</p>
        <Link 
          href="/admin/events"
          className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-surface-container-high rounded-xl text-primary font-bold text-sm hover:bg-surface-bright transition-all"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Return to Events
        </Link>
      </div>
    );
  }

  const { event, attendees } = result.data;
  
  // Calculate stats
  const totalRevenue = attendees.reduce((acc: number, b: any) => acc + ((b.ticketPrice || 0) * (b.quantity || 1)), 0);
  const totalGuests = attendees.reduce((acc: number, b: any) => acc + (b.quantity || 0), 0);
  const totalCapacity = (event.ticketTypes || []).reduce((acc: number, t: any) => acc + (t.quantity || 0), 0);
  const occupancyRate = totalCapacity > 0 ? (totalGuests / totalCapacity) * 100 : 0;
  
  const staffFilled = (event.staffRolesNeeded || []).reduce((acc: number, role: any) => acc + (role.assignedStaff?.filter((s:any) => !!s).length || 0), 0);
  const staffTotal = (event.staffRolesNeeded || []).reduce((acc: number, role: any) => acc + (role.count || 0), 0);
  const staffingRate = staffTotal > 0 ? (staffFilled / staffTotal) * 100 : 0;

  return (
    <div className="bg-surface min-h-screen animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Event Header Banner */}
      <div className="relative h-[300px] w-full overflow-hidden">
        {event.imageUrl ? (
          <Image 
            src={event.imageUrl} 
            alt={event.title} 
            fill 
            className="object-cover brightness-[0.4] grayscale-[0.2]" 
          />
        ) : (
          <div className="w-full h-full bg-surface-container-low" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />
        <div className="absolute bottom-10 left-10 right-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="bg-primary-container text-on-primary-container text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-primary/20">
                {event.status}
              </span>
              <span className="text-on-surface-variant/60 font-label text-[10px] font-bold uppercase tracking-widest">
                {event.category}
              </span>
            </div>
            <h1 className="text-5xl font-black tracking-tighter text-on-surface font-headline italic leading-none max-w-2xl">
              {event.title}
            </h1>
            <p className="text-on-surface-variant font-medium flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">calendar_today</span>
              {new Date(event.date).toLocaleDateString(undefined, { dateStyle: 'full' })}
            </p>
          </div>
          <div className="flex gap-4">
             <Link 
              href={`/admin/events/${id}/roster`}
              className="px-8 py-4 bg-primary text-on-primary rounded-2xl font-black text-sm shadow-xl shadow-primary/20 hover:scale-105 transition-all flex items-center gap-2 uppercase tracking-widest"
            >
              <span className="material-symbols-outlined text-sm">group</span>
              Manage Roster
            </Link>
             <Link 
              href={`/admin/events/${id}/checkin`}
              className="px-8 py-4 bg-surface-container-highest/80 backdrop-blur-md text-on-surface rounded-2xl font-black text-sm border border-outline-variant/10 hover:bg-surface-bright transition-all flex items-center gap-2 uppercase tracking-widest"
            >
              <span className="material-symbols-outlined text-sm">qr_code_scanner</span>
              Gate Control
            </Link>
          </div>
        </div>
      </div>

      <div className="p-10 -mt-2 space-y-10">
        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
           <div className="p-8 rounded-[2.5rem] bg-surface-container-low border border-outline-variant/10 shadow-sm space-y-4 group hover:border-primary/20 transition-all">
             <div className="flex items-center justify-between">
                <span className="p-2.5 rounded-2xl bg-tertiary-container text-on-tertiary-container material-symbols-outlined">payments</span>
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Gross Revenue</span>
             </div>
             <h3 className="text-3xl font-black text-on-surface font-headline tracking-tighter italic">
               ${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
             </h3>
             <p className="text-[10px] text-tertiary font-bold uppercase tracking-widest">Target: 80% ROI Threshold</p>
           </div>

           <div className="p-8 rounded-[2.5rem] bg-surface-container-low border border-outline-variant/10 shadow-sm space-y-4 group hover:border-primary/20 transition-all">
             <div className="flex items-center justify-between">
                <span className="p-2.5 rounded-2xl bg-primary-container text-on-primary-container material-symbols-outlined">confirmation_number</span>
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Registrations</span>
             </div>
             <h3 className="text-3xl font-black text-on-surface font-headline tracking-tighter italic">
               {totalGuests} / {totalCapacity}
             </h3>
             <div className="w-full bg-outline-variant/10 h-1.5 rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: `${occupancyRate}%` }} />
             </div>
           </div>

           <div className="p-8 rounded-[2.5rem] bg-surface-container-low border border-outline-variant/10 shadow-sm space-y-4 group hover:border-primary/20 transition-all">
             <div className="flex items-center justify-between">
                <span className="p-2.5 rounded-2xl bg-secondary-container text-on-secondary-container material-symbols-outlined">badge</span>
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Ops Readiness</span>
             </div>
             <h3 className="text-3xl font-black text-on-surface font-headline tracking-tighter italic">
               {staffingRate.toFixed(0)}% Filled
             </h3>
             <div className="w-full bg-outline-variant/10 h-1.5 rounded-full overflow-hidden">
                <div className="h-full bg-secondary" style={{ width: `${staffingRate}%` }} />
             </div>
           </div>

           <div className="p-8 rounded-[2.5rem] bg-surface-container-low border border-outline-variant/10 shadow-sm space-y-4 group hover:border-primary/20 transition-all">
             <div className="flex items-center justify-between">
                <span className="p-2.5 rounded-2xl bg-surface-container-highest text-on-surface-variant material-symbols-outlined">bolt</span>
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Check-ins</span>
             </div>
             <h3 className="text-3xl font-black text-on-surface font-headline tracking-tighter italic">
               {attendees.filter((b:any) => b.checkedIn).length} <span className="text-on-surface-variant/40 text-sm font-medium">Synced</span>
             </h3>
             <p className="text-[10px] text-on-surface-variant/40 font-bold uppercase tracking-widest">Real-time gate feed</p>
           </div>
        </div>

        {/* Content Tabs / Description */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-8">
                <section className="bg-surface-container-lowest p-10 rounded-[3rem] border border-outline-variant/10">
                    <h2 className="text-2xl font-black text-on-surface font-headline mb-6 italic">Event Objective</h2>
                    <p className="text-on-surface-variant font-medium leading-relaxed font-body whitespace-pre-wrap italic">
                        {event.description || "The strategic directives for this event have not been documented in the summary field."}
                    </p>
                </section>
            </div>

            <div className="lg:col-span-4 space-y-8">
                <section className="bg-surface-container-low p-8 rounded-[2.5rem] border border-outline-variant/10">
                    <h2 className="text-sm font-black text-on-surface font-headline mb-6 uppercase tracking-widest italic flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm text-primary">analytics</span>
                        Executive Summary
                    </h2>
                    <div className="space-y-6">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-on-surface-variant font-medium">Creation Date</span>
                            <span className="font-bold text-on-surface italic">{new Date(event.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-on-surface-variant font-medium">Last Modified</span>
                            <span className="font-bold text-on-surface italic">{new Date(event.updatedAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-on-surface-variant font-medium">Pricing Model</span>
                            <span className="font-bold text-on-surface italic capitalize">{event.accessModel} RSVP</span>
                        </div>
                    </div>
                </section>
            </div>
        </div>
      </div>
    </div>
  );
}
