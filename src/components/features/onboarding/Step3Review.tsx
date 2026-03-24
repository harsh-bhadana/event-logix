"use client";

import React, { useState } from "react";
import { useStaffOnboarding } from "@/hooks/useStaffOnboarding";
import { registerStaff } from "@/lib/actions/auth-actions";
import { useRouter } from "next/navigation";

export default function Step3Review() {
  const { data, setCurrentStep } = useStaffOnboarding();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const result = await registerStaff(data);
      if (result.success) {
        alert(result.message);
        router.push("/");
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-headline font-bold text-on-surface">Final Review</h2>
        <p className="text-on-surface-variant font-body mb-8">Review your information before joining the team.</p>
      </div>

      <div className="bg-surface-variant/30 dark:bg-neutral-800 rounded-3xl p-6 space-y-4">
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-outline-variant">Information</label>
          <div className="mt-1 flex flex-col">
            <span className="text-lg font-headline font-bold text-on-surface">{data.name}</span>
            <span className="text-on-surface-variant font-body">{data.email}</span>
          </div>
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-outline-variant">Skills</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {data.skills.map((skill) => (
              <span key={skill} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold font-body">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {data.bio && (
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-outline-variant">Bio</label>
            <p className="mt-1 text-sm text-on-surface-variant font-body leading-relaxed">{data.bio}</p>
          </div>
        )}
      </div>

      <div className="flex gap-4 mt-8">
        <button
          onClick={() => setCurrentStep(2)}
          disabled={isSubmitting}
          className="flex-1 bg-outline-variant/10 hover:bg-outline-variant/20 text-on-surface font-bold py-4 rounded-2xl transition-all disabled:opacity-50"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex-[2] bg-primary hover:bg-primary/90 text-on-primary font-bold py-4 rounded-2xl transition-all shadow-lg shadow-primary/20 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <span className="animate-pulse">Joining Team...</span>
          ) : (
            "Complete Onboarding"
          )}
        </button>
      </div>
    </div>
  );
}
