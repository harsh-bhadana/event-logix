'use client';

import React from 'react';

export function SearchBar() {
  return (
    <div className="bg-white p-2 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-outline-variant/5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-outline-variant/20">
        {/* WHAT */}
        <div className="px-8 py-5">
          <label className="block text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] mb-1">What</label>
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-xl">search</span>
            <input 
              type="text" 
              placeholder="Search adventures..." 
              className="bg-transparent border-none p-0 w-full text-base font-bold text-on-surface placeholder:text-on-surface-variant/40 focus:ring-0"
            />
          </div>
        </div>

        {/* WHERE */}
        <div className="px-8 py-5">
          <label className="block text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] mb-1">Where</label>
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-xl">location_on</span>
            <input 
              type="text" 
              placeholder="Zurich, CH" 
              className="bg-transparent border-none p-0 w-full text-base font-bold text-on-surface placeholder:text-on-surface-variant/40 focus:ring-0"
            />
          </div>
        </div>

        {/* WHEN */}
        <div className="px-8 py-5 flex items-center justify-between group">
          <div className="flex-1">
            <label className="block text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] mb-1">When</label>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-xl">calendar_today</span>
              <span className="text-base font-bold text-on-surface-variant/60">Any dates</span>
            </div>
          </div>
          
          <button className="h-14 w-14 bg-primary text-on-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-105 transition-all active:scale-95 ml-4">
            <span className="material-symbols-outlined">tune</span>
          </button>
        </div>
      </div>
    </div>
  );
}
