"use client";

import React from "react";
import { useStaffOnboarding } from "@/hooks/useStaffOnboarding";

export default function Step2Professional() {
  const { data, updateData, setCurrentStep } = useStaffOnboarding();

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="space-y-4">
        <h3 className="text-xl font-headline font-bold text-on-surface">Professional Details</h3>
        <p className="text-on-surface-variant text-sm">Define your professional trajectory and seniority level.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Profile Identity Section */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-surface-container-lowest p-8 rounded-xl flex flex-col items-center text-center border border-outline-variant/10">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full bg-surface-container-highest flex items-center justify-center border-2 border-dashed border-outline-variant hover:border-primary transition-colors cursor-pointer overflow-hidden">
                <span className="material-symbols-outlined text-4xl text-outline-variant group-hover:text-primary">add_a_photo</span>
              </div>
              <div className="absolute bottom-0 right-0 p-2 bg-primary text-on-primary rounded-full shadow-lg">
                <span className="material-symbols-outlined text-sm">edit</span>
              </div>
            </div>
            <h3 className="mt-6 font-headline font-semibold text-on-surface">Profile Identity</h3>
            <p className="text-on-surface-variant text-xs mt-2 leading-relaxed">
              Please upload a high-resolution professional headshot for your executive profile.
            </p>
          </div>
          <div className="p-6 border-l-2 border-primary bg-primary-container/20 rounded-r-lg">
            <p className="text-primary font-medium text-xs italic">
              "Senior candidates with professional photography receive 40% more engagement."
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className="lg:col-span-8 space-y-10">
          <div className="space-y-2">
            <label className="block text-sm font-bold text-on-surface-variant uppercase tracking-wider">Professional Summary</label>
            <textarea
              className="w-full min-h-[160px] bg-surface-container-lowest border-none focus:ring-2 focus:ring-primary/20 rounded-xl p-5 text-on-surface placeholder-outline-variant/50 text-base leading-relaxed"
              placeholder="Describe your executive trajectory and core value proposition..."
              value={data.bio}
              onChange={(e) => updateData({ bio: e.target.value })}
            />
            <p className="text-xs text-outline-variant text-right">Max 500 characters</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-on-surface-variant uppercase tracking-wider">Years of Experience</label>
              <div className="relative">
                <select
                  className="w-full bg-surface-container-lowest border-none focus:ring-2 focus:ring-primary/20 rounded-xl p-4 appearance-none text-on-surface cursor-pointer"
                  value={data.yearsOfExperience}
                  onChange={(e) => updateData({ yearsOfExperience: e.target.value })}
                >
                  <option disabled value="">Select seniority level</option>
                  <option>5-8 Years (Managerial)</option>
                  <option>8-12 Years (Senior Manager)</option>
                  <option>12-15 Years (Director)</option>
                  <option>15-20 Years (Executive)</option>
                  <option>20+ Years (C-Suite)</option>
                </select>
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-outline-variant">expand_more</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-on-surface-variant uppercase tracking-wider">Notice Period</label>
              <div className="relative">
                <select
                  className="w-full bg-surface-container-lowest border-none focus:ring-2 focus:ring-primary/20 rounded-xl p-4 appearance-none text-on-surface cursor-pointer"
                  value={data.noticePeriod}
                  onChange={(e) => updateData({ noticePeriod: e.target.value })}
                >
                  <option disabled value="">Availability status</option>
                  <option>Immediate / Serving Notice</option>
                  <option>15 Days</option>
                  <option>30 Days (Standard)</option>
                  <option>60 Days (Senior Executive)</option>
                  <option>90 Days (C-Suite/Partner)</option>
                </select>
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-outline-variant">expand_more</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-20 pt-10 border-t border-surface-container-highest flex items-center justify-between">
        <button
          onClick={() => setCurrentStep(1)}
          className="flex items-center gap-2 px-6 py-3 text-on-surface-variant font-semibold hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          Previous Step
        </button>
        <button
          onClick={() => setCurrentStep(3)}
          className="px-10 py-3 bg-gradient-to-r from-primary to-primary-dim text-on-primary font-bold rounded-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
        >
          Next: Skills & Roles
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </footer>
    </div>
  );
}
