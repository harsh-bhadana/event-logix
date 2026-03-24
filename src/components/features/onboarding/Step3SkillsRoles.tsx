"use client";

import React, { useState } from "react";
import { useStaffOnboarding } from "@/hooks/useStaffOnboarding";

const CORE_EXPERTISE = [
  "Event Security", "AV & Technical", "Hospitality", "Guest Check-in", "Stage Management", "VIP Coordination"
];

export default function Step3SkillsRoles() {
  const { data, updateData, setCurrentStep } = useStaffOnboarding();
  const [tagInput, setTagInput] = useState("");

  const toggleExpertise = (skill: string) => {
    const current = data.skills;
    if (current.includes(skill)) {
      updateData({ skills: current.filter(s => s !== skill) });
    } else {
      updateData({ skills: [...current, skill] });
    }
  };

  const addTag = () => {
    if (tagInput && !data.customTags.includes(tagInput)) {
      updateData({ customTags: [...data.customTags, tagInput] });
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    updateData({ customTags: data.customTags.filter(t => t !== tag) });
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="space-y-4">
        <h3 className="text-xl font-headline font-bold text-on-surface">Skills &amp; Roles</h3>
        <p className="text-on-surface-variant text-sm">Define your expertise within high-end event management.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Core Expertise Section */}
        <section className="md:col-span-12 lg:col-span-8 bg-surface-container-lowest rounded-xl p-8 shadow-sm border border-outline-variant/10">
          <div className="flex items-center gap-3 mb-6">
            <span className="material-symbols-outlined text-primary">bolt</span>
            <h3 className="text-lg font-bold tracking-tight">Core Expertise</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {CORE_EXPERTISE.map((skill) => {
              const active = data.skills.includes(skill);
              return (
                <button
                  key={skill}
                  onClick={() => toggleExpertise(skill)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all active:scale-95 flex items-center gap-2 ${
                    active
                      ? "bg-primary text-on-primary"
                      : "bg-surface-container-high text-on-surface-variant hover:bg-surface-variant"
                  }`}
                >
                  {skill}
                  {active && <span className="material-symbols-outlined text-[16px]">check_circle</span>}
                </button>
              );
            })}
          </div>
          <div className="mt-8 flex items-start gap-4 p-4 bg-tertiary-container/30 rounded-lg">
            <span className="material-symbols-outlined text-tertiary mt-0.5">info</span>
            <p className="text-xs text-on-tertiary-container leading-relaxed">
              Selecting core areas of expertise helps prioritize placements that align with your highest verified competencies.
            </p>
          </div>
        </section>

        {/* Top Skills & Tags */}
        <section className="md:col-span-12 lg:col-span-4 flex flex-col gap-6">
          <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm flex-1 border border-outline-variant/10">
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-primary">label</span>
              <h3 className="text-md font-bold tracking-tight">Top Skills</h3>
            </div>
            <p className="text-xs text-on-surface-variant mb-4">Add specific certifications or specialized tools.</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {data.customTags.map((tag) => (
                <div key={tag} className="bg-secondary-container text-on-secondary-container text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm flex items-center gap-1">
                  {tag}
                  <span className="material-symbols-outlined text-[12px] cursor-pointer" onClick={() => removeTag(tag)}>close</span>
                </div>
              ))}
            </div>
            <div className="relative group">
              <input
                className="w-full bg-surface-container-highest border-none rounded-md py-3 pl-4 pr-10 text-sm focus:ring-2 focus:ring-primary focus:bg-white transition-all"
                placeholder="Add custom tag..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addTag()}
              />
              <span className="material-symbols-outlined absolute right-3 top-3 text-outline hover:text-primary cursor-pointer transition-colors" onClick={addTag}>add</span>
            </div>
          </div>
          <div className="bg-primary-container/20 rounded-xl p-6 border-l-4 border-primary">
            <h4 className="text-xs font-bold text-primary uppercase tracking-tighter mb-2">Demand Insight</h4>
            <p className="text-xs text-on-surface-variant italic leading-relaxed">
              "Candidates with <strong>Crowd Control</strong> and <strong>VIP Coordination</strong> are seeing 40% higher placement rates."
            </p>
          </div>
        </section>

        {/* Role Details Matrix */}
        <section className="md:col-span-12 bg-surface-container-low/50 rounded-xl p-8 overflow-hidden relative border border-outline-variant/10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary opacity-[0.03] rounded-full -mr-20 -mt-20"></div>
          <h3 className="text-lg font-bold tracking-tight mb-6">Verification Level Required</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-surface-container-lowest rounded-lg border border-outline-variant/10">
              <div className="flex justify-between items-start mb-4">
                <span className="material-symbols-outlined text-outline">shield_person</span>
                <span className="text-[10px] font-bold bg-error-container text-on-error-container px-2 py-0.5 rounded-sm">LEVEL 4</span>
              </div>
              <h4 className="font-bold text-sm mb-1 text-on-surface">Security Lead</h4>
              <p className="text-[11px] text-on-surface-variant leading-normal">Requires valid SIA license and situational awareness training.</p>
            </div>
            <div className="p-5 bg-surface-container-lowest rounded-lg border border-outline-variant/10">
              <div className="flex justify-between items-start mb-4">
                <span className="material-symbols-outlined text-outline">support_agent</span>
                <span className="text-[10px] font-bold bg-tertiary-container text-on-tertiary-container px-2 py-0.5 rounded-sm">LEVEL 2</span>
              </div>
              <h4 className="font-bold text-sm mb-1 text-on-surface">Guest Relations</h4>
              <p className="text-[11px] text-on-surface-variant leading-normal">Requires high-end hospitality background.</p>
            </div>
            <div className="p-5 bg-surface-container-lowest rounded-lg border border-outline-variant/10 opacity-60">
              <div className="flex justify-between items-start mb-4">
                <span className="material-symbols-outlined text-outline">settings_input_component</span>
                <span className="text-[10px] font-bold bg-outline-variant text-on-surface px-2 py-0.5 rounded-sm">LEVEL 3</span>
              </div>
              <h4 className="font-bold text-sm mb-1 text-on-surface">AV Specialist</h4>
              <p className="text-[11px] text-on-surface-variant leading-normal">Requires certification in DMX lighting and sound engineering.</p>
            </div>
          </div>
        </section>
      </div>

      <footer className="mt-20 pt-10 border-t border-surface-container-highest flex items-center justify-between">
        <button
          onClick={() => setCurrentStep(2)}
          className="flex items-center gap-2 px-6 py-3 text-on-surface-variant font-semibold hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          Previous Step
        </button>
        <button
          onClick={() => setCurrentStep(4)}
          className="px-10 py-3 bg-gradient-to-r from-primary to-primary-dim text-on-primary font-bold rounded-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
        >
          Next: Verification
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </footer>
    </div>
  );
}
