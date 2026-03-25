'use client';

import React from 'react';

interface ProfileFormProps {
  user: any;
}

export function AdaptiveProfileForm({ user }: ProfileFormProps) {
  const role = user.role;
  
  return (
    <form className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Shared Core Section */}
      <section className="p-10 bg-white rounded-[3rem] border border-outline-variant/10 shadow-sm">
        <div className="flex items-center gap-4 mb-8">
          <h3 className="text-xl font-black text-on-surface font-headline tracking-tighter uppercase">Identity Hub</h3>
          <span className="h-px flex-1 bg-outline-variant/10" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant ml-2">Display Name</label>
            <input 
              type="text" 
              defaultValue={user.name}
              className="w-full px-6 py-4 bg-surface-container-low rounded-2xl border border-outline-variant/5 focus:border-primary/50 focus:ring-4 focus:ring-primary/5 outline-none transition-all font-medium"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant ml-2">Email Address</label>
            <input 
              type="email" 
              defaultValue={user.email}
              disabled
              className="w-full px-6 py-4 bg-surface-container-highest cursor-not-allowed opacity-60 rounded-2xl border border-outline-variant/5 font-medium"
            />
          </div>
        </div>
      </section>

      {/* Staff Specific Section */}
      {role === 'staff' && (
        <section className="p-10 bg-primary/5 rounded-[3rem] border border-primary/10 shadow-sm">
          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-xl font-black text-primary font-headline tracking-tighter uppercase">Professional Portfolio</h3>
            <span className="h-px flex-1 bg-primary/10" />
          </div>
          <div className="space-y-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-2">Professional Bio</label>
              <textarea 
                rows={4}
                defaultValue={user.staffProfile?.bio}
                placeholder="Tell us about your experience in event management..."
                className="w-full px-6 py-6 bg-white rounded-2xl border border-primary/5 focus:border-primary/50 focus:ring-4 focus:ring-primary/5 outline-none transition-all font-medium text-on-surface resize-none"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-2">Skills & Expertise</label>
                <div className="flex flex-wrap gap-2 p-4 bg-white rounded-2xl border border-primary/5 min-h-[60px]">
                  {user.staffProfile?.skills?.map((skill: string) => (
                    <span key={skill} className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase rounded-lg">
                      {skill}
                    </span>
                  ))}
                  <button type="button" className="px-3 py-1 border border-dashed border-primary/30 text-primary text-[10px] font-black uppercase rounded-lg hover:bg-primary/5 transition-colors">+ Add Skill</button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-2">Years of Experience</label>
                <select className="w-full px-6 py-4 bg-white rounded-2xl border border-primary/5 focus:border-primary/50 outline-none transition-all font-medium">
                  <option>1-3 Years</option>
                  <option>3-5 Years</option>
                  <option>5+ Years</option>
                </select>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Admin Specific Section */}
      {role === 'admin' && (
        <section className="p-10 bg-on-surface rounded-[3rem] border border-outline-variant/10 shadow-2xl">
          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-xl font-black text-on-primary font-headline tracking-tighter uppercase">Administrative Access</h3>
            <span className="h-px flex-1 bg-on-primary/10" />
          </div>
          <div className="space-y-6">
            <div className="p-6 bg-surface-container-high/10 rounded-2xl border border-on-primary/10 flex items-center justify-between">
              <div>
                <p className="font-bold text-on-primary text-sm">System Permission Level</p>
                <p className="text-[10px] text-on-primary/60 font-medium uppercase tracking-widest">Full Command & Access</p>
              </div>
              <span className="material-symbols-outlined text-primary text-4xl fill-1">verified_user</span>
            </div>
            <div className="p-6 bg-surface-container-high/10 rounded-2xl border border-on-primary/10">
              <p className="font-bold text-on-primary text-sm mb-4">Security Logs</p>
              <div className="space-y-3">
                <div className="flex justify-between text-[10px] text-on-primary/40 font-black uppercase tracking-widest">
                  <span>Last Login</span>
                  <span>{new Date().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[10px] text-on-primary/40 font-black uppercase tracking-widest">
                  <span>Authorized IP</span>
                  <span>192.168.1.1 (Current)</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Submission */}
      <div className="flex justify-end gap-6 pt-10 border-t border-outline-variant/10">
        <button type="button" className="px-8 py-4 text-on-surface-variant text-sm font-black uppercase tracking-widest hover:text-on-surface transition-colors">Discard</button>
        <button type="submit" className="px-12 py-4 bg-primary text-on-primary rounded-3xl font-black text-sm uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
          Save Settings
        </button>
      </div>
    </form>
  );
}
