'use client';

import { useState } from 'react';
import { IEvent } from "@/models/Event";
import { JobCard } from "./JobCard";
import { JobDetailDrawer } from "./JobDetailDrawer";

interface JobsFeedProps {
  initialOpportunities: IEvent[];
}

export function JobsFeed({ initialOpportunities }: JobsFeedProps) {
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);
  
  const handleApply = (event: IEvent) => {
    alert(`Applying for ${event.title}! This feature will be fully implemented soon.`);
    setSelectedEvent(null);
  };

  if (initialOpportunities.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-20 h-20 bg-surface-container-low rounded-full flex items-center justify-center mb-4">
          <span className="material-symbols-outlined text-4xl text-on-surface-variant">search_off</span>
        </div>
        <h3 className="text-xl font-bold text-on-surface mb-2 font-headline">No opportunities found</h3>
        <p className="text-on-surface-variant max-w-xs font-body">
          Try adjusting your filters or check back later for new event listings.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {initialOpportunities.map((event) => (
        <JobCard 
          key={event._id.toString()} 
          event={event} 
          onViewDetails={setSelectedEvent}
        />
      ))}
      
      <JobDetailDrawer 
        event={selectedEvent} 
        onClose={() => setSelectedEvent(null)} 
        onApply={handleApply}
      />
    </div>
  );
}
