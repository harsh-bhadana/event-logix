import React from 'react';
import { getStaffSchedule } from '@/lib/actions/staff-actions';
import { getSession } from '@/lib/auth';
import Link from 'next/link';

export default async function StaffSchedulePage() {
  const session = await getSession();
  if (!session?.user) return <div>Unauthorized</div>;

  const result = await getStaffSchedule(session.user.id);
  const shifts = result.success ? result.data : [];

  return (
    <div className="px-10 py-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-on-surface font-headline">My Schedule</h1>
          <p className="mt-2 text-on-surface-variant font-medium">You have {shifts.length} upcoming assignments</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-6 py-2.5 bg-surface-container-high text-on-surface rounded-xl text-sm font-bold hover:bg-outline-variant/10 transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">calendar_add_on</span>
            Export to Google
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-12">
        {/* Simplified Calendar Sidebar/View */}
        <div className="xl:col-span-3">
          <div className="bg-white rounded-[3rem] border border-outline-variant/10 shadow-sm overflow-hidden">
            <div className="grid grid-cols-7 border-b border-outline-variant/5 bg-surface-container-low">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                <div key={day} className="py-4 text-center text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Simple Grid Placeholder (In a real app, this would be a dynamic month grid) */}
            <div className="grid grid-cols-7 auto-rows-[120px]">
              {Array.from({ length: 31 }).map((_, i) => {
                const day = i + 1;
                const dailyShifts = shifts.filter((s: any) => new Date(s.date).getDate() === day);
                
                return (
                  <div key={i} className={`p-4 border-r border-b border-outline-variant/5 hover:bg-surface-container-lowest transition-colors relative ${day > 28 ? 'opacity-30' : ''}`}>
                    <span className="text-xs font-bold text-on-surface-variant/60">{day}</span>
                    <div className="mt-2 space-y-1">
                      {dailyShifts.map((s: any) => (
                        <Link 
                          key={s._id} 
                          href={s.eventId ? `/staff/jobs/${s.eventId._id}` : "#"}
                          className="block px-2 py-1 bg-primary/10 rounded-md text-[9px] font-black text-primary truncate hover:scale-105 transition-transform"
                        >
                          {s.role}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Shift List Sidebar */}
        <div className="space-y-8">
          <h2 className="text-xl font-black text-on-surface font-headline tracking-tighter">Upcoming Shifts</h2>
          <div className="space-y-4">
            {shifts.length > 0 ? (
              shifts.map((shift: any) => (
                <Link 
                  key={shift._id} 
                  href={shift.eventId ? `/staff/jobs/${shift.eventId._id}` : "#"}
                  className="block p-6 bg-white rounded-3xl border border-outline-variant/10 shadow-sm hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-3 py-1 bg-surface-container-high text-on-surface-variant text-[10px] font-black uppercase rounded-lg">
                      {new Date(shift.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                    <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors">arrow_forward_ios</span>
                  </div>
                  <h3 className="font-bold text-on-surface leading-tight mb-1">{shift.eventId?.title || "Deleted Event"}</h3>
                  <p className="text-xs font-medium text-primary uppercase tracking-wider">{shift.role}</p>
                </Link>
              ))
            ) : (
              <div className="p-10 text-center bg-surface-container-low rounded-3xl border border-dashed border-outline-variant/20 italic text-on-surface-variant/40 text-sm">
                No upcoming calls. Check the job board!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
