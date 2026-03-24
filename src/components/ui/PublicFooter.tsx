"use client";

import React from "react";

export function PublicFooter() {
  return (
    <footer className="bg-[#f5f3f2] dark:bg-neutral-950 w-full py-12 px-10 border-t border-outline-variant/10 mt-auto">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="space-y-2 text-center md:text-left">
          <span className="font-headline font-bold text-primary text-xl">The Guest Gallery</span>
          <p className="font-body text-xs text-on-surface-variant dark:text-neutral-400 max-w-xs">
            Connecting curious minds with unforgettable local experiences and professional gatherings.
          </p>
        </div>
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2">
          <a className="font-body text-xs text-on-surface-variant hover:text-primary hover:underline underline-offset-4 transition-all" href="#">Privacy</a>
          <a className="font-body text-xs text-on-surface-variant hover:text-primary hover:underline underline-offset-4 transition-all" href="#">Terms</a>
          <a className="font-body text-xs text-on-surface-variant hover:text-primary hover:underline underline-offset-4 transition-all" href="#">Sitemap</a>
          <a className="font-body text-xs text-on-surface-variant hover:text-primary hover:underline underline-offset-4 transition-all" href="#">Company</a>
        </nav>
        <div className="text-center md:text-right">
          <p className="font-body text-xs text-on-surface-variant dark:text-neutral-400">
            © 2026 The Guest Gallery. An Event Logix Production.
          </p>
        </div>
      </div>
    </footer>
  );
}
