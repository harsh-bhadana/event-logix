"use client";

import React from "react";
import Link from "next/link";

export function PublicHeader() {
  return (
    <header className="bg-[#fbf9f7] dark:bg-neutral-900 sticky top-0 z-50 border-b border-outline-variant/10">
      <div className="flex justify-between items-center w-full px-10 py-4 max-w-[1440px] mx-auto">
        <div className="flex items-center gap-8">
          <Link href="/discover" className="text-xl font-extrabold tracking-tight text-primary dark:text-[#afefdd] hover:opacity-80 transition-opacity">
            The Guest Gallery
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/discover" className="text-primary dark:text-[#afefdd] font-bold border-b-2 border-primary pb-1">
              Discover
            </Link>
            <a href="#" className="text-on-surface-variant dark:text-neutral-400 font-medium hover:text-primary transition-colors duration-200">
              Galleries
            </a>
            <a href="#" className="text-on-surface-variant dark:text-neutral-400 font-medium hover:text-primary transition-colors duration-200">
              Hosting
            </a>
            <a href="#" className="text-on-surface-variant dark:text-neutral-400 font-medium hover:text-primary transition-colors duration-200">
              Help
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 text-on-surface-variant font-medium hover:text-primary transition-colors duration-200">
            Log In
          </button>
          <button className="px-5 py-2 bg-primary text-on-primary font-bold rounded-lg shadow-sm hover:opacity-90 transition-all active:scale-95">
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
}
