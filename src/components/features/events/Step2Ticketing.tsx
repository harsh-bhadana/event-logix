"use client";

import { useWizard } from "@/hooks/useEventWizard";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Step2Ticketing() {
  const { data, updateData } = useWizard();

  const grossPotential = parseFloat(data.ticketPrice) * parseInt(data.totalQuantity || "0");
  const platformFees = grossPotential * 0.025;

  return (
    <div className="p-12 max-w-5xl mx-auto w-full animate-fade-in">
      <header className="mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-primary mb-2 block">Step 2 of 4</span>
        <h2 className="text-4xl font-headline font-extrabold text-on-surface tracking-tight mb-4">Ticketing &amp; Pricing</h2>
        <p className="text-on-surface-variant max-w-2xl leading-relaxed">
          Define your event&apos;s economic model. Choose between a paid ticketing structure or a free RSVP-based attendance model.
        </p>
      </header>

      <div className="grid grid-cols-12 gap-8">
        <section className="col-span-12 lg:col-span-8 bg-surface-container-lowest rounded-xl p-8 border border-outline-variant/10 shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="font-headline font-bold text-xl text-on-surface">Access Model</h3>
              <p className="text-sm text-on-surface-variant">How will attendees enter your event?</p>
            </div>
            <div className="inline-flex p-1 bg-surface-container-low rounded-lg">
              <button
                onClick={() => updateData({ accessModel: "paid" })}
                className={cn(
                  "px-6 py-2 rounded-md transition-all duration-200 text-sm font-bold",
                  data.accessModel === "paid" ? "bg-white shadow-sm text-primary" : "text-on-surface-variant hover:bg-white/50"
                )}
              >
                Paid Event
              </button>
              <button
                onClick={() => updateData({ accessModel: "free" })}
                className={cn(
                  "px-6 py-2 rounded-md transition-all duration-200 text-sm font-bold",
                  data.accessModel === "free" ? "bg-white shadow-sm text-primary" : "text-on-surface-variant hover:bg-white/50"
                )}
              >
                Free Access
              </button>
            </div>
          </div>

          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={cn("space-y-2", data.accessModel === "free" && "opacity-50 pointer-events-none")}>
                <label className="block text-sm font-bold text-on-surface-variant ml-1">Ticket Price (USD)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-medium">$</span>
                  <input
                    type="text"
                    value={data.ticketPrice}
                    onChange={(e) => updateData({ ticketPrice: e.target.value })}
                    className={`w-full pl-8 pr-4 py-4 bg-surface-container-highest border-0 rounded-lg focus:ring-2 focus:ring-primary transition-all text-on-surface font-semibold text-lg ${!data.ticketPrice && data.accessModel === 'paid' ? 'ring-1 ring-error/20' : ''}`}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-bold text-on-surface-variant ml-1">Total Quantity</label>
                <input
                  type="number"
                  value={data.totalQuantity}
                  onChange={(e) => updateData({ totalQuantity: e.target.value })}
                  className={`w-full px-4 py-4 bg-surface-container-highest border-0 rounded-lg focus:ring-2 focus:ring-primary transition-all text-on-surface font-semibold text-lg ${!data.totalQuantity ? 'ring-1 ring-error/20' : ''}`}
                />
              </div>
            </div>

            <div className="pt-6 border-t border-surface-container-low">
              <h4 className="font-headline font-bold text-base mb-4">Pricing Strategy</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { id: "early-bird", title: "Early Bird", icon: "bolt", desc: "20% discount for first 50 tickets." },
                  { id: "group-rate", title: "Group Rate", icon: "groups", desc: "Buy 5 or more for a 15% reduction." },
                  { id: "standard", title: "Standard", icon: "confirmation_number", desc: "Flat rate pricing for all tiers." },
                ].map((strat) => (
                  <div
                    key={strat.id}
                    onClick={() => updateData({ pricingStrategy: strat.id as any })}
                    className={cn(
                      "p-4 rounded-lg border flex flex-col gap-2 cursor-pointer transition-all",
                      data.pricingStrategy === strat.id
                        ? "bg-surface border-primary/20 ring-1 ring-primary/20"
                        : "bg-surface-container-low border-transparent hover:bg-primary-container/20"
                    )}
                  >
                    <div className="flex justify-between items-center">
                      <span className={cn("material-symbols-outlined", data.pricingStrategy === strat.id ? "text-primary" : "text-on-surface-variant")}>
                        {strat.icon}
                      </span>
                      <input
                        type="radio"
                        checked={data.pricingStrategy === strat.id}
                        readOnly
                        className="text-primary focus:ring-primary"
                      />
                    </div>
                    <span className="text-sm font-bold text-on-surface">{strat.title}</span>
                    <span className="text-xs text-on-surface-variant leading-tight">{strat.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-primary-container/30 rounded-xl p-6 border border-primary/10">
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-primary">analytics</span>
              <h3 className="font-headline font-bold text-lg text-primary">Revenue Forecast</h3>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-on-surface-variant uppercase font-bold tracking-wider">Gross Potential</p>
                <p className="text-3xl font-headline font-extrabold text-primary">${grossPotential.toLocaleString()}</p>
              </div>
              <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[65%] rounded-full"></div>
              </div>
              <div className="flex justify-between items-center text-xs font-medium text-on-surface-variant">
                <span>Platform Fees (2.5%)</span>
                <span>-${platformFees.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>
          <div className="bg-tertiary-container/30 rounded-xl p-6 border border-tertiary/10">
            <div className="flex items-center gap-3 mb-3">
              <span className="material-symbols-outlined text-tertiary">lightbulb</span>
              <h3 className="font-headline font-bold text-sm text-tertiary">Associate Tip</h3>
            </div>
            <p className="text-xs leading-relaxed text-on-tertiary-container">
              Events with an 'Early Bird' strategy typically see 40% higher initial momentum compared to flat-rate pricing models in this category.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
