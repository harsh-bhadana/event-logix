import React from 'react';
import Link from 'next/link';
import { getSession } from '@/lib/auth';

export default async function UnauthorizedPage() {
  const session = await getSession();
  const role = session?.user?.role || 'public';
  
  const redirectPath = role === 'admin' ? '/admin' : role === 'staff' ? '/staff/schedule' : '/';

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-10">
      <div className="max-w-xl w-full text-center space-y-10 animate-in fade-in zoom-in duration-700">
        <div className="relative inline-block">
          <span className="material-symbols-outlined text-[160px] text-error opacity-10 select-none">lock</span>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-8xl font-black text-on-surface font-headline tracking-tighter">403</span>
          </div>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl font-black text-on-surface font-headline tracking-tighter italic">Area Restricted</h1>
          <p className="max-w-md mx-auto text-on-surface-variant font-medium leading-relaxed font-body">
            Slow down, explorer! Your clearing doesn't grant access to this sector. This area is reserved for **{role === 'admin' ? 'Super Admins' : role === 'staff' ? 'Verified Staff' : 'Authorized Personnel'}**.
          </p>
        </div>

        <div className="pt-6">
          <Link 
            href={redirectPath}
            className="inline-flex items-center gap-3 px-10 py-5 bg-on-surface text-on-primary rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-2xl hover:bg-primary transition-all group"
          >
            Take Me Home
            <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_right_alt</span>
          </Link>
        </div>

        <p className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-[0.2em]">
          Event Logix Security Core // Restricted Access Protocol 0x403
        </p>
      </div>
    </div>
  );
}
