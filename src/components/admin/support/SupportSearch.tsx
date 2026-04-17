"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SUPPORT_ARTICLES, SupportArticle } from "@/lib/support-content";

interface SupportSearchProps {
  onSelectArticle: (article: SupportArticle) => void;
}

export function SupportSearch({ onSelectArticle }: SupportSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SupportArticle[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.trim().length > 1) {
      const filtered = SUPPORT_ARTICLES.filter(article => 
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.keywords.some(k => k.toLowerCase().includes(query.toLowerCase()))
      );
      setResults(filtered);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto" ref={containerRef}>
      <div className="relative z-50">
        <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-on-surface-variant opacity-50">
          search
        </span>
        <input 
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length > 1 && setIsOpen(true)}
          placeholder="Search for answers, protocols, or payout cycles..."
          className="w-full bg-surface-container-lowest border border-outline-variant/10 rounded-[2rem] pl-14 pr-6 py-5 text-sm font-medium shadow-xl shadow-primary/5 focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-on-surface-variant/40"
        />
        
        {/* Shortcut Hint */}
        <div className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 opacity-30">
          <span className="px-1.5 py-0.5 rounded border border-on-surface-variant text-[10px] font-bold">⌘</span>
          <span className="px-1.5 py-0.5 rounded border border-on-surface-variant text-[10px] font-bold">K</span>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full mt-4 w-full bg-surface-container-lowest rounded-[2.5rem] border border-outline-variant/10 shadow-2xl z-[60] py-4 overflow-hidden"
          >
            <div className="px-6 py-2 border-b border-outline-variant/5 mb-2">
              <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest opacity-40">Documentation Matches</p>
            </div>
            <div className="max-h-[300px] overflow-y-auto no-scrollbar">
              {results.map((article) => (
                <button
                  key={article.id}
                  onClick={() => {
                    onSelectArticle(article);
                    setIsOpen(false);
                    setQuery("");
                  }}
                  className="w-full flex items-center gap-4 px-6 py-4 hover:bg-primary/[0.03] transition-colors text-left group"
                >
                  <div className="p-2 rounded-xl bg-surface-container-high text-on-surface-variant group-hover:text-primary group-hover:bg-primary/10 transition-all">
                    <span className="material-symbols-outlined text-xl">description</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-on-surface">{article.title}</h4>
                    <p className="text-[10px] text-on-surface-variant uppercase font-black opacity-40">{article.category}</p>
                  </div>
                  <span className="material-symbols-outlined ml-auto text-sm opacity-0 group-hover:opacity-100 transition-opacity">arrow_forward</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
