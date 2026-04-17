"use client";

import { motion } from "framer-motion";
import { SupportArticle } from "@/lib/support-content";

interface ArticleViewerProps {
  article: SupportArticle;
  onBack: () => void;
}

export function ArticleViewer({ article, onBack }: ArticleViewerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      className="bg-surface-container-lowest rounded-[3rem] border border-outline-variant/10 shadow-2xl overflow-hidden min-h-[600px] flex flex-col"
    >
      <div className="p-8 md:p-12 border-b border-outline-variant/10 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-surface-container-low/20">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-widest hover:-translate-x-1 transition-transform"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Back to Hub
        </button>
        <div className="flex items-center gap-2">
           <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">
             {article.category}
           </span>
           <span className="px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant text-[10px] font-black uppercase tracking-widest">
             {article.role} access
           </span>
        </div>
      </div>

      <div className="flex-1 p-8 md:p-16 max-w-4xl mx-auto w-full prose prose-zinc prose-primary">
         <div className="content-rendered">
            {/* 
                We'll split the simulated markdown for clean rendering. 
                In a real app, you'd use react-markdown here.
            */}
            {article.content.split('\n').map((line, i) => {
              if (line.startsWith('# ')) return <h1 key={i} className="text-4xl font-black tracking-tighter text-on-surface mb-8 font-headline">{line.replace('# ', '')}</h1>;
              if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-black tracking-tight text-on-surface mt-10 mb-4 font-headline">{line.replace('## ', '')}</h2>;
              if (line.startsWith('> [!')) {
                 const type = line.split('[!')[1].split(']')[0];
                 const typeClass = type === 'IMPORTANT' ? 'border-error bg-error/5 text-error' : 'border-primary bg-primary/5 text-primary';
                 return (
                   <div key={i} className={`my-8 p-6 rounded-2xl border-l-4 ${typeClass}`}>
                      <p className="text-xs font-black uppercase tracking-widest mb-2">{type}</p>
                      <p className="text-sm font-medium leading-relaxed italic">{article.content.split('\n')[i+1]?.replace('> ', '') || ''}</p>
                   </div>
                 );
              }
              if (line.startsWith('> ')) return null; // Handled in the block above
              if (line.trim().length === 0) return <br key={i} />;
              if (line.match(/^\d+\. /)) return <li key={i} className="text-base text-on-surface-variant mb-2 ml-6 list-decimal font-medium">{line.replace(/^\d+\. /, '')}</li>;
              
              return <p key={i} className="text-base text-on-surface-variant leading-relaxed mb-4 font-body">{line}</p>;
            })}
         </div>

         <div className="mt-20 pt-10 border-t border-outline-variant/10 flex flex-col items-center text-center space-y-4">
            <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Was this information helpful?</p>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 px-6 py-2 rounded-xl bg-surface-container-high hover:bg-primary/10 hover:text-primary transition-all text-sm font-bold">
                <span className="material-symbols-outlined text-lg">thumb_up</span>
                Affirmative
              </button>
              <button className="flex items-center gap-2 px-6 py-2 rounded-xl bg-surface-container-high hover:bg-error/10 hover:text-error transition-all text-sm font-bold">
                <span className="material-symbols-outlined text-lg">thumb_down</span>
                Negative
              </button>
            </div>
         </div>
      </div>
    </motion.div>
  );
}
