'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { submitOnboarding } from "@/lib/actions/staff-actions";

interface OnboardingFormProps {
  user: any;
}

export function OnboardingForm({ user }: OnboardingFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    formData.append('userId', user.id);
    
    const result = await submitOnboarding(formData);

    if (result.success) {
      router.push("/staff/jobs");
    } else {
      setError(result.error || "Failed to submit onboarding");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <div className="space-y-6">
        <h3 className="text-xl font-black text-on-surface font-headline border-l-4 border-primary pl-4">Professional Bio</h3>
        <p className="text-sm text-on-surface-variant font-medium leading-relaxed">
          Briefly describe your experience and what makes you a great service provider.
        </p>
        <textarea 
          name="bio"
          required
          rows={4}
          className="w-full bg-surface-container-low border-none rounded-2xl p-6 text-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-on-surface-variant/40 font-body"
          placeholder="e.g. 5+ years experience in corporate event security and crowd management..."
        />
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-black text-on-surface font-headline border-l-4 border-primary pl-4">Expertise & Skills</h3>
        <p className="text-sm text-on-surface-variant font-medium leading-relaxed">
          List your primary skills separated by commas (e.g. Security, VIP Hosting, Audio Tech).
        </p>
        <input 
          name="skills"
          type="text"
          required
          className="w-full bg-surface-container-low border-none rounded-2xl p-6 text-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-on-surface-variant/40 font-body"
          placeholder="Security, Hosting, Technical Support"
        />
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-black text-on-surface font-headline border-l-4 border-primary pl-4">Experience Level</h3>
        <select 
          name="experience"
          required
          className="w-full bg-surface-container-low border-none rounded-2xl p-6 text-sm focus:ring-2 focus:ring-primary/20 transition-all font-body appearance-none cursor-pointer"
        >
          <option value="">Select your experience...</option>
          <option value="0-1">Less than 1 year</option>
          <option value="1-3">1 to 3 years</option>
          <option value="3-5">3 to 5 years</option>
          <option value="5+">5+ years</option>
        </select>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-error-container/20 border border-error/10 text-error text-xs font-bold flex items-center gap-2">
          <span className="material-symbols-outlined text-base">error</span>
          {error}
        </div>
      )}

      <button
        disabled={loading}
        type="submit"
        className="w-full bg-primary text-on-primary py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-98 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin"></div>
        ) : (
          <>
            Complete Onboarding
            <span className="material-symbols-outlined">rocket_launch</span>
          </>
        )}
      </button>
    </form>
  );
}
