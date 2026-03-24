'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function Newsletter() {
  return (
    <section className="max-w-[1440px] mx-auto px-10">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-primary rounded-[4rem] p-16 md:p-24 text-center relative overflow-hidden shadow-2xl shadow-primary/20"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        </div>

        <div className="max-w-2xl mx-auto relative z-10">
          <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-10 text-white backdrop-blur-md">
            <span className="material-symbols-outlined text-4xl">celebration</span>
          </div>
          <h2 className="text-5xl font-black text-white tracking-tight leading-tight mb-6 font-headline">Join the Elite Community</h2>
          <p className="text-on-primary/70 text-lg font-medium mb-12">
            Be the first to know about secret events, early-bird drops, and premium opportunities in your city.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="your@email.com" 
              className="flex-1 bg-white/10 border-2 border-white/20 rounded-2xl px-6 py-5 text-white placeholder:text-white/40 font-bold focus:ring-4 focus:ring-white/20 focus:border-white outline-none transition-all backdrop-blur-sm" 
            />
            <button type="button" className="bg-white text-primary px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl">
              Subscribe
            </button>
          </form>
          
          <p className="mt-8 text-[10px] uppercase font-black tracking-widest text-on-primary/40">
            Trusted by influencers and creators worldwide
          </p>
        </div>
      </motion.div>
    </section>
  );
}
