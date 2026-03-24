"use client";

import { useState } from "react";
import { IEvent } from "@/models/Event";
import { format } from "date-fns";
import { applyForStaffRole } from "@/lib/actions/booking-actions";

interface JobDetailDrawerProps {
  event: IEvent | null;
  onClose: () => void;
}

export function JobDetailDrawer({ event, onClose }: JobDetailDrawerProps) {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  if (!event) return null;

  const openRoles = event.staffRolesNeeded.filter(
    (role) => role.assignedStaff.length < role.count
  );
  const primaryRole = openRoles[0];
  const activeRole = openRoles.find((r) => r.roleName === selectedRole) || primaryRole;
  const spotsLeft = activeRole ? activeRole.count - activeRole.assignedStaff.length : 0;

  async function handleApply() {
    if (!activeRole) return;
    setLoading(true);
    setResult(null);
    const res = await applyForStaffRole({
      eventId: event!._id.toString(),
      roleName: activeRole.roleName,
    });
    setResult({ success: res.success, message: res.message });
    setLoading(false);
  }

  return (
    <div className="fixed inset-0 z-[60] overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-on-background/20 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="absolute right-0 top-0 h-full w-full max-w-lg bg-surface-container-lowest shadow-2xl flex flex-col font-body animate-in slide-in-from-right duration-300">
        {/* Header Image */}
        <div className="relative h-64 overflow-hidden flex-shrink-0">
          <img
            alt={event.title}
            className="w-full h-full object-cover"
            src={
              event.imageUrl ||
              "https://images.unsplash.com/photo-1540575861501-7ad058bf37ad?auto=format&fit=crop&q=80&w=2070"
            }
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <span className="px-2 py-1 bg-primary text-on-primary text-[10px] font-bold uppercase tracking-widest rounded-sm mb-2 inline-block">
              {activeRole?.roleName || "Staff Role"}
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
              <span className="text-[10px] uppercase tracking-wider font-bold text-on-surface-variant mb-1">Date</span>
              <span className="text-sm font-semibold">
                {format(new Date(event.date), "MMM d, yyyy")}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider font-bold text-on-surface-variant mb-1">Pay Rate</span>
              <span className="text-sm font-semibold">$45.00/hr</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider font-bold text-on-surface-variant mb-1">Spots Left</span>
              <span className={`text-sm font-semibold ${spotsLeft <= 1 ? "text-error" : "text-primary"}`}>
                {spotsLeft} remaining
              </span>
            </div>
          </div>

          {/* Role selector (if multiple open roles) */}
          {openRoles.length > 1 && (
            <div className="mb-6">
              <h4 className="text-sm font-bold uppercase tracking-widest text-primary mb-3">Select Role</h4>
              <div className="space-y-2">
                {openRoles.map((role) => (
                  <button
                    key={role.roleName}
                    type="button"
                    onClick={() => { setSelectedRole(role.roleName); setResult(null); }}
                    className={`w-full flex justify-between items-center px-4 py-3 rounded-xl border text-sm font-semibold transition-all ${
                      activeRole?.roleName === role.roleName
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-outline-variant/20 text-on-surface hover:border-primary/30"
                    }`}
                  >
                    <span>{role.roleName}</span>
                    <span className="text-xs text-on-surface-variant">
                      {role.count - role.assignedStaff.length} of {role.count} spots left
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Description & Requirements */}
          <div className="space-y-6">
            <section>
              <h4 className="text-sm font-bold uppercase tracking-widest text-primary mb-3">Role Description</h4>
              <p className="text-sm text-on-surface-variant leading-relaxed">{event.description}</p>
            </section>

            <section>
              <h4 className="text-sm font-bold uppercase tracking-widest text-primary mb-3">Requirements</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-primary text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  Previous experience in {activeRole?.roleName || "similar roles"}
                </li>
                <li className="flex items-start gap-3 text-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-primary text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  Professional attire required
                </li>
              </ul>
            </section>

            <section>
              <h4 className="text-sm font-bold uppercase tracking-widest text-primary mb-3">Location</h4>
              <p className="text-xs text-on-surface-variant flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">map</span>
                {event.locationName || event.location?.address || "Details shared upon confirmation."}
              </p>
            </section>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-surface-container bg-surface-container-lowest flex-shrink-0">
          {result && (
            <div
              className={`mb-4 px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-2 ${
                result.success
                  ? "bg-primary-container/30 text-on-primary-container"
                  : "bg-error-container/20 text-error"
              }`}
            >
              <span className="material-symbols-outlined text-base">
                {result.success ? "check_circle" : "error"}
              </span>
              {result.message}
            </div>
          )}
          <p className="text-[11px] text-on-surface-variant mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-sm text-on-surface-variant">info</span>
            Confirm your availability for this shift before applying.
          </p>
          <button
            type="button"
            onClick={handleApply}
            disabled={loading || result?.success === true}
            className="w-full bg-primary text-on-primary py-4 rounded-xl font-bold tracking-tight hover:opacity-90 transition-all flex justify-center items-center gap-2 disabled:opacity-60"
          >
            {loading ? (
              <>
                <span className="w-5 h-5 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin" />
                Submitting...
              </>
            ) : result?.success ? (
              <>
                <span className="material-symbols-outlined">check_circle</span>
                Applied!
              </>
            ) : (
              <>
                Confirm Application
                <span className="material-symbols-outlined">send</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
