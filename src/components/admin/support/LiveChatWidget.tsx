"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-20 right-0 w-[350px] bg-surface-container-lowest rounded-[2rem] border border-outline-variant/10 shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="bg-primary p-6 text-on-primary">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-black tracking-tight font-headline">Intelligence Support</h4>
                <button onClick={() => setIsOpen(false)} className="material-symbols-outlined text-xl hover:rotate-90 transition-transform">close</button>
              </div>
              <p className="text-xs font-medium opacity-80 leading-relaxed">
                Connect with an Event Logix strategist in real-time. Average response time: 2m.
              </p>
            </div>
            
            <div className="flex-1 p-6 space-y-4 min-h-[300px]">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-sm font-black">smart_toy</span>
                </div>
                <div className="bg-surface-container-low p-3 rounded-2xl rounded-tl-none">
                  <p className="text-xs font-medium text-on-surface leading-relaxed">
                    Hello! I'm the Event Logix AI Assistant. How can I help you optimize your events today?
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-outline-variant/5">
               <div className="relative">
                 <input 
                   disabled
                   type="text" 
                   placeholder="Interface locked (Simulation)" 
                   className="w-full bg-surface-container-high rounded-xl px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/40 border-none"
                 />
                 <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-primary opacity-50">send</span>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-primary text-on-primary shadow-2xl shadow-primary/40 flex items-center justify-center group"
      >
        <span className="material-symbols-outlined text-2xl group-hover:rotate-12 transition-transform">
          {isOpen ? "close" : "forum"}
        </span>
      </motion.button>
    </div>
  );
}
