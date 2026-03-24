'use client';

import { IEvent } from "@/models/Event";
import { format } from "date-fns";

interface JobDetailDrawerProps {
  event: IEvent | null;
  onClose: () => void;
  onApply: (event: IEvent) => void;
}

export function JobDetailDrawer({ event, onClose, onApply }: JobDetailDrawerProps) {
  if (!event) return null;

  const openRoles = event.staffRolesNeeded.filter(role => role.assignedStaff.length < role.count);
  const primaryRole = openRoles[0]; // TODO: Logic for matching user skill
  const spotsLeft = primaryRole ? primaryRole.count - primaryRole.assignedStaff.length : 0;

  return (
    <div className="fixed inset-0 z-[60] overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-on-background/20 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>
      
      {/* Drawer Panel */}
      <div className="absolute right-0 top-0 h-full w-full max-w-lg bg-surface-container-lowest shadow-2xl flex flex-col font-body animate-in slide-in-from-right duration-300">
        {/* Header Image */}
        <div className="relative h-64 overflow-hidden">
          <img 
            alt={event.title} 
            className="w-full h-full object-cover" 
            src={event.imageUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuCcCq7F7PVDnM4pNY1wsvHgUBI-P0nSX_Vrx0ho8eU8FYZYqZHSJuHBlPy_Iro4WRJddaNNG0zrDJj4Y1zlRZRwN4N-7JfiQzkBTYng-nOV5nmVa_f1RcXOchv7elxNZKODcfu_7NLpCiu1w9MmI-iTCbV-Lb7H9M0zTDC7Of8-9EBgU8fjakT121mOa6XnJpqS5fyKfy_gcRKWzCm-ZXID3RSNEB5mm3s7sunPsCHB-MKBWfEsS4RLJfgcNXpkpDs07L4zWl-wrPoh"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-6 left-6 right-6">
            <span className="px-2 py-1 bg-primary text-on-primary text-[10px] font-bold uppercase tracking-widest rounded-sm mb-2 inline-block">
              {primaryRole?.roleName || 'Staff Role'}
            </span>
            <h2 className="text-2xl font-extrabold text-white font-headline">{event.title}</h2>
          </div>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-2 rounded-full transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {/* Recap Box */}
          <div className="flex flex-wrap gap-6 mb-8 p-4 bg-surface-container-low rounded-xl">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider font-bold text-on-surface-variant mb-1">Date & Time</span>
              <span className="text-sm font-semibold">{format(new Date(event.date), "MMM d, yyyy")}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider font-bold text-on-surface-variant mb-1">Pay Rate</span>
              <span className="text-sm font-semibold">$45.00/hr</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider font-bold text-on-surface-variant mb-1">Status</span>
              <span className={`text-sm font-semibold ${spotsLeft === 1 ? 'text-error' : 'text-primary'}`}>
                {spotsLeft} spots remaining
              </span>
            </div>
          </div>

          {/* Job Description */}
          <div className="space-y-6">
            <section>
              <h4 className="text-sm font-bold uppercase tracking-widest text-primary mb-3">Role Description</h4>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {event.description}
              </p>
            </section>
            
            <section>
              <h4 className="text-sm font-bold uppercase tracking-widest text-primary mb-3">Requirements</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-primary text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  Previous experience in {primaryRole?.roleName || 'similar roles'}
                </li>
                <li className="flex items-start gap-3 text-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-primary text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  Professional attire required
                </li>
              </ul>
            </section>
            
            <section>
              <h4 className="text-sm font-bold uppercase tracking-widest text-primary mb-3">Location Details</h4>
              <div className="rounded-xl overflow-hidden h-32 bg-surface-container-high mb-2">
                <img 
                  alt="Location Map" 
                  className="w-full h-full object-cover opacity-60 grayscale" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1v65Krchb7AOg2WEAV16TVDasOii5nUG_GAYm87zsYC_pNzdH2W7q6rEMwwEIXQ40NsNCaMGnCpNotRcqOpbcLeGSEJXSI6En8APRtfCxcEe4g4GvwAq-iKEkQ0aglhxfqHJKvrQXNwVt86du6clRDR3vYAdOgyWrkLMpMIhp8EIqN5yMPoZxg_5DRmnsENJiTBRAKNMN6Mc8OnQVBmhcelCEk3snOgz07mC2OWzGrtKKmx7EKYX97oE1HRNCbtkUw__KvKEtjWub"
                />
              </div>
              <p className="text-xs text-on-surface-variant flex items-center gap-1 font-body">
                <span className="material-symbols-outlined text-[14px]">map</span>
                {event.locationName || event.location?.address || 'Location details will be shared upon application confirmation.'}
              </p>
            </section>
          </div>
        </div>

        {/* Footer Action */}
        <div className="p-6 border-t border-surface-container bg-surface-container-lowest">
          <div className="flex items-center gap-3 mb-4">
            <span className="material-symbols-outlined text-error">info</span>
            <p className="text-[11px] text-on-surface-variant">Please confirm your availability for this shift before applying.</p>
          </div>
          <button 
            onClick={() => onApply(event)}
            className="w-full bg-primary text-on-primary py-4 rounded-xl font-bold tracking-tight hover:opacity-90 transition-all flex justify-center items-center gap-2"
          >
            Confirm Application
            <span className="material-symbols-outlined">send</span>
          </button>
        </div>
      </div>
    </div>
  );
}
