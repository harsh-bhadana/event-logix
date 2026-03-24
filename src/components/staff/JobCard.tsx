'use client';

import { IEvent } from "@/models/Event";
import { format } from "date-fns";

interface JobCardProps {
  event: IEvent;
  onViewDetails: (event: IEvent) => void;
  userSkill?: string; // Optional: to highlight matching role
}

export function JobCard({ event, onViewDetails, userSkill }: JobCardProps) {
  // Find the role that matches user skill or just the first open role
  const openRoles = event.staffRolesNeeded.filter(role => role.assignedStaff.length < role.count);
  const matchingRole = openRoles.find(role => 
    userSkill && role.roleName.toLowerCase().includes(userSkill.toLowerCase())
  ) || openRoles[0];

  const spotsLeft = matchingRole ? matchingRole.count - matchingRole.assignedStaff.length : 0;
  const isLastSpot = spotsLeft === 1;

  return (
    <div className="group bg-surface-container-lowest rounded-xl p-6 transition-all duration-300 hover:bg-surface-container-low border border-transparent hover:border-surface-container-high shadow-sm hover:shadow-md">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className={`px-2.5 py-1 rounded-sm text-[10px] font-bold uppercase tracking-widest ${
              matchingRole?.roleName.toLowerCase().includes('security') 
                ? 'bg-primary-container text-on-primary-container' 
                : matchingRole?.roleName.toLowerCase().includes('tech')
                ? 'bg-tertiary-container text-on-tertiary-container'
                : 'bg-secondary-container text-on-secondary-container'
            }`}>
              {matchingRole?.roleName || 'Staff Role'}
            </span>
            <span className="flex items-center gap-1 text-xs font-medium text-on-surface-variant">
              <span className="material-symbols-outlined text-sm">schedule</span> 
              {format(new Date(event.date), "MMM d, yyyy")}
            </span>
          </div>
          <h3 className="text-xl font-bold text-on-surface mb-2 font-headline">{event.title}</h3>
          <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-sm text-on-surface-variant font-body">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[18px]">location_on</span> 
              {event.locationName || event.location?.address || 'TBD'}
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[18px]">payments</span> 
              $45.00/hr {/* TODO: Add pay to Event model if needed, using mock for now */}
            </span>
            <span className={`flex items-center gap-1 font-medium ${isLastSpot ? 'text-error' : 'text-on-tertiary-container'}`}>
              <span className="material-symbols-outlined text-[18px]">group</span> 
              {spotsLeft} of {matchingRole?.count || 0} spots left
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3 self-end md:self-center">
          <button 
            onClick={() => onViewDetails(event)}
            className="px-6 py-2.5 bg-primary text-on-primary rounded-lg font-bold text-sm hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center gap-2"
          >
            View Details & Apply
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
}
