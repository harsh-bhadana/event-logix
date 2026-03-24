'use client';

import React from 'react';
import { motion } from 'framer-motion';

const categories = [
  { name: "Technology", icon: "terminal", color: "from-blue-500/20 to-indigo-500/20", textColor: "text-blue-600" },
  { name: "Business", icon: "business_center", color: "from-emerald-500/20 to-teal-500/20", textColor: "text-emerald-600" },
  { name: "Wellness", icon: "spa", color: "from-rose-500/20 to-pink-500/20", textColor: "text-rose-600" },
  { name: "Finance", icon: "payments", color: "from-amber-500/20 to-orange-500/20", textColor: "text-amber-600" },
  { name: "Music", icon: "music_note", color: "from-violet-500/20 to-purple-500/20", textColor: "text-violet-600" },
  { name: "Food", icon: "restaurant", color: "from-orange-500/20 to-red-500/20", textColor: "text-orange-600" }
];

export function Categories() {
  return (
    <section className="max-w-[1440px] mx-auto px-10">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-3xl font-black text-on-surface tracking-tight font-headline">Trending Categories</h2>
          <p className="text-on-surface-variant font-medium mt-1">Explore what's happening right now</p>
        </div>
        <button className="text-sm font-bold text-primary flex items-center gap-1 hover:gap-2 transition-all">
          View all categories
          <span className="material-symbols-outlined text-lg">arrow_forward</span>
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
        {categories.map((cat, i) => (
          <motion.button
            key={cat.name}
            whileHover={{ y: -8 }}
            className={`p-8 rounded-[2.5rem] bg-gradient-to-br ${cat.color} flex flex-col items-center text-center group transition-all`}
          >
            <div className={`w-14 h-14 rounded-2xl bg-white flex items-center justify-center ${cat.textColor} shadow-sm group-hover:scale-110 transition-transform`}>
              <span className="material-symbols-outlined text-3xl">{cat.icon}</span>
            </div>
            <span className="mt-5 text-sm font-black text-on-surface uppercase tracking-widest">{cat.name}</span>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
