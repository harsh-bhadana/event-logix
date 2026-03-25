import React from 'react';
import { getEventRoster } from '@/lib/actions/roster-actions';
import Image from 'next/image';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EventRosterPage({ params }: PageProps) {
  const { id } = await params;
  const result = await getEventRoster(id);

  if (!result.success || !result.data) {
    return (
      <div className="p-20 text-center">
        <h2 className="text-2xl font-bold text-error">Error loading roster</h2>
        <p className="text-on-surface-variant">{result.error || "Please try again later."}</p>
      </div>
    );
  }

  const { event, attendees } = result.data;

  return (
    <div className="px-10 py-12 animate-in fade-in duration-700">
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <span className="material-symbols-outlined text-primary text-sm font-black uppercase tracking-widest">group_work</span>
          <span className="h-px flex-1 bg-outline-variant/10" />
        </div>
        <h1 className="text-4xl font-black tracking-tighter text-on-surface font-headline italic">
          Roster: {event.title}
        </h1>
        <p className="mt-2 text-on-surface-variant font-medium flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">calendar_today</span>
          {new Date(event.date).toLocaleDateString(undefined, { dateStyle: 'full' })}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Staff Section */}
        <div className="lg:col-span-2 space-y-10">
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black text-on-surface font-headline tracking-tight">Active Duty Staff</h2>
              <div className="px-4 py-2 bg-primary/5 rounded-full text-primary text-xs font-black">
                {event.staffRolesNeeded.reduce((acc: number, role: any) => acc + (role.assignedStaff?.filter((s: any) => !!s).length || 0), 0)} Assigned
              </div>
            </div>

            <div className="space-y-6">
              {event.staffRolesNeeded.map((role: any) => (
                <div key={role.roleName} className="bg-white rounded-3xl border border-outline-variant/10 overflow-hidden shadow-sm">
                  <div className="px-8 py-4 bg-surface-container-low border-b border-outline-variant/5 flex justify-between items-center">
                    <h3 className="font-black text-sm uppercase tracking-widest text-on-surface-variant">{role.roleName}</h3>
                    <span className="text-[10px] font-bold px-2 py-1 bg-white rounded-md border border-outline-variant/10 text-on-surface-variant">
                      {role.assignedStaff?.length || 0} / {role.count} Filled
                    </span>
                  </div>
                  <div className="divide-y divide-outline-variant/5">
                    {role.assignedStaff?.filter((s: any) => !!s).length > 0 ? (
                      role.assignedStaff.filter((s: any) => !!s).map((staff: any) => (
                        <div key={staff._id} className="px-8 py-5 flex items-center justify-between group hover:bg-surface-container-lowest transition-colors">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center overflow-hidden">
                              {staff.staffProfile?.profileImage ? (
                                <Image src={staff.staffProfile.profileImage} width={40} height={40} alt={staff.name || "Staff Member"} />
                              ) : (
                                <span className="material-symbols-outlined text-secondary">person</span>
                              )}
                            </div>
                            <div>
                              <p className="font-bold text-on-surface text-sm">{staff.name || "Unnamed Staff"}</p>
                              <p className="text-[10px] text-on-surface-variant font-medium uppercase tracking-tighter">Verified Provider</p>
                            </div>
                          </div>
                          <button className="material-symbols-outlined text-outline-variant hover:text-primary transition-colors cursor-pointer">chat</button>
                        </div>
                      ))
                    ) : (
                      <div className="px-8 py-10 text-center italic text-on-surface-variant/40 text-sm">No staff assigned to this role yet.</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Attendee Sidebar */}
        <div>
          <h2 className="text-2xl font-black text-on-surface font-headline tracking-tight mb-8">Ticket Holders</h2>
          <div className="bg-white p-6 rounded-[2.5rem] border border-outline-variant/10 shadow-sm">
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {attendees.length > 0 ? (
                attendees.map((booking: any) => (
                  <div key={booking._id} className="p-4 bg-surface-container-lowest rounded-2xl border border-outline-variant/5">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-bold text-on-surface text-sm">{booking.attendeeInfo?.name || "Anonymous Guest"}</p>
                      <span className="px-2 py-0.5 bg-primary/5 text-primary text-[9px] font-black uppercase rounded">
                        {booking.ticketType || "Standard"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-on-surface-variant font-medium">
                      <span className="material-symbols-outlined text-[14px]">confirmation_number</span>
                      Qty: {booking.quantity || 1}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 opacity-40 italic text-sm">No confirmed attendees yet.</div>
              )}
            </div>
            
            <div className="mt-8 pt-6 border-t border-outline-variant/10">
              <div className="flex justify-between text-xs font-black uppercase tracking-widest text-on-surface-variant">
                <span>Total Expected</span>
                <span className="text-primary">{attendees.reduce((acc: number, b: any) => acc + (b.quantity || 0), 0)} Guests</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
