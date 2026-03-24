import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary-dim/5 rounded-full blur-[120px]"></div>
      
      <div className="w-full max-w-md relative z-10">
        <div className="mb-8 flex flex-col items-center">
          <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-on-primary font-bold shadow-xl mb-4">
            EL
          </div>
          <h2 className="text-2xl font-black text-on-surface tracking-tight font-headline">Event Logix</h2>
          <p className="text-on-surface-variant text-sm font-medium">Enterprise Event Management</p>
        </div>
        
        <div className="bg-surface-container-lowest rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-outline-variant/10">
          {children}
        </div>
        
        <div className="mt-8 text-center text-xs text-on-surface-variant/60 font-medium">
          &copy; 2026 Event Logix Suite. All rights reserved.
        </div>
      </div>
    </div>
  );
}
