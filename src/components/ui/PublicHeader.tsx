"use client";

import React, { useState } from "react";
import Link from "next/link";
import { logout } from "@/lib/actions/auth-actions";

interface PublicHeaderProps {
  user?: {
    name: string;
    role: string;
  } | null;
}

const navLinks = [
  { label: "Discover", href: "/discover" },
  { label: "Galleries", href: "#" },
  { label: "Hosting", href: "#" },
  { label: "Help", href: "#" },
];

export function PublicHeader({ user }: PublicHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const dashboardLink =
    user?.role === "admin"
      ? "/admin/manage-events"
      : user?.role === "staff"
      ? "/staff/jobs"
      : "/";

  return (
    <header className="bg-[#fbf9f7] dark:bg-neutral-900 sticky top-0 z-50 border-b border-outline-variant/10">
      <div className="flex justify-between items-center w-full px-6 md:px-10 py-4 max-w-[1440px] mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <Link
            href="/discover"
            className="text-xl font-extrabold tracking-tight text-primary dark:text-[#afefdd] hover:opacity-80 transition-opacity font-headline"
          >
            The Guest Gallery
          </Link>
          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-on-surface-variant dark:text-neutral-400 font-medium hover:text-primary transition-colors duration-200 first:text-primary first:font-bold first:border-b-2 first:border-primary first:pb-1"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <Link
                href={dashboardLink}
                className="px-4 py-2 text-primary font-bold hover:bg-primary/5 rounded-lg transition-all"
              >
                Dashboard
              </Link>
              <form action={logout}>
                <button
                  type="submit"
                  className="px-5 py-2 bg-primary text-on-primary font-bold rounded-lg shadow-sm hover:opacity-90 transition-all active:scale-95"
                >
                  Logout
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-2 text-on-surface-variant font-medium hover:text-primary transition-colors duration-200"
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="px-5 py-2 bg-primary text-on-primary font-bold rounded-lg shadow-sm hover:opacity-90 transition-all active:scale-95"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-surface-container-low transition-colors"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined text-on-surface">
            {menuOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-outline-variant/10 bg-[#fbf9f7] dark:bg-neutral-900 px-6 py-4 flex flex-col gap-2 animate-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="py-3 px-2 font-semibold text-on-surface hover:text-primary transition-colors border-b border-outline-variant/10 last:border-0"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 flex flex-col gap-3">
            {user ? (
              <>
                <Link
                  href={dashboardLink}
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-center py-3 text-primary font-bold hover:bg-primary/5 rounded-lg transition-all"
                >
                  Dashboard
                </Link>
                <form action={logout}>
                  <button
                    type="submit"
                    className="w-full py-3 bg-primary text-on-primary font-bold rounded-lg shadow-sm hover:opacity-90 transition-all"
                  >
                    Logout
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-center py-3 text-on-surface-variant font-medium hover:text-primary transition-colors"
                >
                  Log In
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-center py-3 bg-primary text-on-primary font-bold rounded-lg shadow-sm hover:opacity-90 transition-all"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
