"use client";

import React from "react";
import { useStaffOnboarding } from "@/hooks/useStaffOnboarding";

export default function Step1Account() {
  const { data, updateData, setCurrentStep } = useStaffOnboarding();

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(2);
  };

  return (
    <form onSubmit={handleNext} className="space-y-12">
      <div className="space-y-4">
        <h3 className="text-xl font-headline font-bold text-on-surface">Identity Credentials</h3>
        <p className="text-on-surface-variant text-sm">Secure your account with executive-level credentials.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="block text-sm font-bold text-on-surface-variant uppercase tracking-wider">Full Name</label>
          <input
            type="text"
            required
            className="w-full bg-surface-container-lowest border-none focus:ring-2 focus:ring-primary/20 rounded-xl p-5 text-on-surface text-base"
            placeholder="e.g. Johnathan Doe"
            value={data.name}
            onChange={(e) => updateData({ name: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-bold text-on-surface-variant uppercase tracking-wider">Working Email</label>
          <input
            type="email"
            required
            className="w-full bg-surface-container-lowest border-none focus:ring-2 focus:ring-primary/20 rounded-xl p-5 text-on-surface text-base"
            placeholder="john@eventlogix.io"
            value={data.email}
            onChange={(e) => updateData({ email: e.target.value })}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="block text-sm font-bold text-on-surface-variant uppercase tracking-wider">Access Password</label>
          <input
            type="password"
            required
            className="w-full bg-surface-container-lowest border-none focus:ring-2 focus:ring-primary/20 rounded-xl p-5 text-on-surface text-base"
            placeholder="••••••••••••"
            value={data.password}
            onChange={(e) => updateData({ password: e.target.value })}
          />
        </div>
      </div>

      <footer className="mt-20 pt-10 border-t border-surface-container-highest flex items-center justify-end">
        <button
          type="submit"
          className="px-12 py-3 bg-gradient-to-r from-primary to-primary-dim text-on-primary font-bold rounded-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
        >
          Begin Onboarding
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </footer>
    </form>
  );
}
