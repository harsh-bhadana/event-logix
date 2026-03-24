"use client";

import React from "react";
import { useStaffOnboarding } from "@/hooks/useStaffOnboarding";

export default function Step1PersonalInfo() {
  const { data, updateData, setCurrentStep } = useStaffOnboarding();

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(2);
  };

  return (
    <form onSubmit={handleNext} className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-headline font-bold text-on-surface">Build your Staff Profile</h2>
        <p className="text-on-surface-variant font-body mb-8">Let&apos;s start with your basic information.</p>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-on-surface-variant ml-1">Full Name</label>
          <input
            type="text"
            required
            className="w-full bg-surface-variant/50 dark:bg-neutral-800 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-primary/50 transition-all font-body text-on-surface"
            placeholder="e.g. John Doe"
            value={data.name}
            onChange={(e) => updateData({ name: e.target.value })}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-on-surface-variant ml-1">Work Email</label>
          <input
            type="email"
            required
            className="w-full bg-surface-variant/50 dark:bg-neutral-800 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-primary/50 transition-all font-body text-on-surface"
            placeholder="john@example.com"
            value={data.email}
            onChange={(e) => updateData({ email: e.target.value })}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-on-surface-variant ml-1">Password</label>
          <input
            type="password"
            required
            className="w-full bg-surface-variant/50 dark:bg-neutral-800 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-primary/50 transition-all font-body text-on-surface"
            placeholder="••••••••"
            value={data.password}
            onChange={(e) => updateData({ password: e.target.value })}
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-primary hover:bg-primary/90 text-on-primary font-bold py-4 rounded-2xl transition-all shadow-lg shadow-primary/20 mt-8"
      >
        Continue to Skills
      </button>
    </form>
  );
}
