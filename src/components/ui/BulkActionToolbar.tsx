"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Action {
  label: string;
  icon: string;
  onClick: () => void;
  variant?: "primary" | "error" | "surface";
  loading?: boolean;
}

interface BulkActionToolbarProps {
  selectedCount: number;
  onClear: () => void;
  actions: Action[];
}

export function BulkActionToolbar({
  selectedCount,
  onClear,
  actions,
}: BulkActionToolbarProps) {
  return (
    <AnimatePresence>
      {selectedCount > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] w-auto max-w-[90vw]"
        >
          <div className="bg-surface-container-highest dark:bg-neutral-800 border border-outline-variant/10 shadow-2xl rounded-[2rem] px-8 py-4 flex items-center gap-8 backdrop-blur-xl bg-opacity-95">
            <div className="flex items-center gap-4 border-r border-outline-variant/20 pr-8">
              <button
                onClick={onClear}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container transition-colors"
                title="Clear selection"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
              <div>
                <span className="text-sm font-black text-on-surface font-headline leading-none block">
                  {selectedCount} Selected
                </span>
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest opacity-60">
                  Bulk Operations
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {actions.map((action, index) => (
                <button
                  key={index}
                  disabled={action.loading}
                  onClick={action.onClick}
                  className={`
                    flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all active:scale-95 disabled:opacity-50
                    ${
                      action.variant === "primary"
                        ? "bg-primary text-on-primary shadow-lg shadow-primary/10"
                        : action.variant === "error"
                        ? "bg-error/10 text-error hover:bg-error/20"
                        : "bg-surface-container text-on-surface hover:bg-surface-container-high"
                    }
                  `}
                >
                  {action.loading ? (
                    <div className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
                  ) : (
                    <span className="material-symbols-outlined text-base">
                      {action.icon}
                    </span>
                  )}
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
