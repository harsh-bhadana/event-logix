"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ADMIN_NAV_ITEMS, ADMIN_BOTTOM_ITEMS } from "@/lib/nav-constants";
import { logout } from "@/lib/actions/auth-actions";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const isActive = (href: string, exact: boolean) => {
    if (href === "#") return false;
    return exact ? pathname === href : pathname.startsWith(href);
  };

  return (
    <div className="md:hidden">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 -ml-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors active:scale-95"
        aria-label="Open Menu"
      >
        <span className="material-symbols-outlined text-2xl">menu</span>
      </button>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            />

            {/* Content */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-[280px] bg-surface-container-low z-[70] flex flex-col shadow-2xl"
            >
              {/* Header */}
              <div className="p-6 border-b border-outline-variant/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-on-primary font-bold text-sm">
                    EL
                  </div>
                  <div>
                    <h2 className="text-sm font-black text-primary leading-none font-headline">Event Suite</h2>
                    <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mt-1">Admin Portal</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-surface-container-high rounded-full transition-colors"
                >
                  <span className="material-symbols-outlined text-xl">close</span>
                </button>
              </div>

              {/* Links */}
              <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                {ADMIN_NAV_ITEMS.map((item) => {
                  const active = isActive(item.href, !!item.exact);
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-200 ${
                        active
                          ? "bg-primary/10 text-primary font-bold shadow-sm"
                          : "text-on-surface-variant hover:bg-surface-container-high"
                      }`}
                    >
                      <span
                        className="material-symbols-outlined text-xl"
                        style={active ? { fontVariationSettings: "'FILL' 1" } : {}}
                      >
                        {item.icon}
                      </span>
                      <span className="text-sm">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              {/* Footer */}
              <div className="p-4 border-t border-outline-variant/10 bg-surface-container-lowest/50">
                {ADMIN_BOTTOM_ITEMS.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-4 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-xl transition-colors"
                  >
                    <span className="material-symbols-outlined text-xl">{item.icon}</span>
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                ))}
                <form action={logout}>
                  <button
                    type="submit"
                    className="w-full flex items-center gap-4 px-4 py-3 text-error hover:bg-error/5 rounded-xl transition-all font-bold mt-2"
                  >
                    <span className="material-symbols-outlined text-xl">logout</span>
                    <span className="text-sm">Logout</span>
                  </button>
                </form>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
