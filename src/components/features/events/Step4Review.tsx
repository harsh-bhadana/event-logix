"use client";

import { useWizard } from "@/hooks/useEventWizard";

export function Step4Review() {
  const { data } = useWizard();

  return (
    <div className="flex-1 overflow-y-auto p-12 bg-surface animate-fade-in">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10">
          <h1 className="font-headline text-3xl font-extrabold text-on-surface tracking-tight mb-2">Final Review</h1>
          <p className="text-on-surface-variant max-w-2xl leading-relaxed">
            Confirm all details before taking your event live.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4 flex flex-col gap-6">
            <section className="bg-surface-container-low p-6 rounded-xl border-l-2 border-primary border border-outline-variant/10 shadow-sm">
              <h3 className="text-sm font-bold text-primary mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">assignment</span>
                Audit Trail
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-on-surface-variant">Created By</span>
                  <span className="font-semibold text-on-surface">M. Sterling</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-on-surface-variant">Budget Status</span>
                  <span className="bg-tertiary-container text-on-tertiary-container px-2 py-0.5 rounded text-[10px] font-bold border border-tertiary/10">APPROVED</span>
                </div>
              </div>
            </section>
          </div>

          <div className="lg:col-span-8">
            <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-xl ring-1 ring-black/5">
              <div className="relative h-64 w-full bg-surface-container-low">
                {data.bannerImage ? (
                  <img src={data.bannerImage} className="w-full h-full object-cover" alt="Banner" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-on-surface-variant/30 font-bold text-xl">Event Live Preview</div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-6 left-8">
                  <span className="bg-primary text-on-primary text-[10px] font-bold px-3 py-1 rounded-full uppercase mb-2 inline-block">{data.category}</span>
                  <h2 className="text-white font-headline text-3xl font-extrabold tracking-tight">{data.title || "Untitled Event"}</h2>
                </div>
              </div>
              <div className="p-8">
                <div className="flex flex-wrap gap-8 mb-8 border-b border-surface-container pb-6">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">calendar_today</span>
                    <span className="text-sm font-semibold text-on-surface">{data.date || "TBD"}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">confirmation_number</span>
                    <span className="text-sm font-semibold text-on-surface">{data.accessModel === "paid" ? `$${data.ticketPrice}` : "Free RSVP"}</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold mb-3 uppercase tracking-wider text-on-surface-variant">Description</h4>
                  <p className="text-on-surface text-sm leading-relaxed whitespace-pre-wrap">{data.description || "No description provided."}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
