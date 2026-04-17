"use client";

import { useState } from "react";
import { SupportSearch } from "@/components/admin/support/SupportSearch";
import { SupportCategories } from "@/components/admin/support/SupportCategories";
import { ArticleViewer } from "@/components/admin/support/ArticleViewer";
import { LiveChatWidget } from "@/components/admin/support/LiveChatWidget";
import { SupportArticle } from "@/lib/support-content";
import { motion, AnimatePresence } from "framer-motion";

export default function SupportPortal() {
  const [selectedArticle, setSelectedArticle] = useState<SupportArticle | null>(null);

  return (
    <div className="min-h-screen pb-20">
      <AnimatePresence mode="wait">
        {!selectedArticle ? (
          <motion.div
            key="hub-main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-6 md:px-10 py-16 space-y-20 max-w-7xl mx-auto"
          >
            {/* Hero Section */}
            <div className="text-center space-y-6 max-w-3xl mx-auto">
              <motion.div 
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-[11px] font-black uppercase tracking-widest"
              >
                <span className="material-symbols-outlined text-sm">help_center</span>
                Support Intelligence Hub
              </motion.div>
              <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-on-surface font-headline leading-tight">
                How can we <span className="text-primary italic">empower</span> your operation?
              </h1>
              <p className="text-on-surface-variant font-medium text-lg leading-relaxed opacity-70">
                Access refined protocols, strategic documentation, and verified procedures for every aspect of the Event Logix ecosystem.
              </p>
            </div>

            {/* Smart Search */}
            <SupportSearch onSelectArticle={setSelectedArticle} />

            {/* Content Explorer */}
            <SupportCategories onSelectArticle={setSelectedArticle} />

            {/* Contact Suggestion */}
            <div className="bg-surface-container-low/40 border border-outline-variant/10 rounded-[3rem] p-12 flex flex-col md:flex-row items-center justify-between gap-8">
               <div className="flex gap-6 items-center">
                  <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant">
                    <span className="material-symbols-outlined text-3xl">mail</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-on-surface font-headline tracking-tight">Need specific guidance?</h3>
                    <p className="text-sm font-medium text-on-surface-variant opacity-70">Submit a detailed inquiry and our strategist team will respond within 4 hours.</p>
                  </div>
               </div>
               <button className="whitespace-nowrap px-8 py-4 rounded-2xl bg-on-surface text-surface-container-lowest font-black text-sm hover:scale-105 transition-all shadow-xl shadow-on-surface/5">
                 Submit Strategy Ticket
               </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="hub-article"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-6 md:px-10 py-10 max-w-5xl mx-auto"
          >
            <ArticleViewer 
              article={selectedArticle} 
              onBack={() => setSelectedArticle(null)} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      <LiveChatWidget />
    </div>
  );
}
