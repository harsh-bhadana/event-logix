"use client";

import { motion } from "framer-motion";
import { SUPPORT_CATEGORIES, SUPPORT_ARTICLES, SupportArticle } from "@/lib/support-content";

interface SupportCategoriesProps {
  onSelectArticle: (article: SupportArticle) => void;
}

export function SupportCategories({ onSelectArticle }: SupportCategoriesProps) {
  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {SUPPORT_CATEGORIES.map((cat, idx) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="group cursor-pointer bg-surface-container-low/40 p-6 rounded-[2rem] border border-outline-variant/10 hover:bg-primary/[0.03] hover:border-primary/20 transition-all text-center"
          >
            <div className="w-14 h-14 rounded-2xl bg-surface-container-highest flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-primary/10 group-hover:text-primary transition-all text-on-surface-variant">
              <span className="material-symbols-outlined text-2xl">{cat.icon}</span>
            </div>
            <h4 className="text-xs font-black uppercase tracking-widest text-on-surface group-hover:text-primary transition-colors">{cat.label}</h4>
          </motion.div>
        ))}
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-black tracking-tight text-on-surface font-headline">Frequently Consulted</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SUPPORT_ARTICLES.slice(0, 4).map((article, idx) => (
            <motion.button
              key={article.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + (idx * 0.1) }}
              onClick={() => onSelectArticle(article)}
              className="flex items-center gap-4 p-5 bg-surface-container-lowest rounded-3xl border border-outline-variant/10 text-left hover:shadow-lg transition-all group"
            >
              <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant group-hover:text-primary group-hover:bg-primary/10 transition-all flex-shrink-0">
                <span className="material-symbols-outlined text-xl italic">help</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-on-surface">{article.title}</p>
                <p className="text-[10px] text-on-surface-variant font-medium opacity-60 uppercase">{article.category}</p>
              </div>
              <span className="material-symbols-outlined text-sm opacity-20 group-hover:opacity-100 transition-opacity">chevron_right</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
