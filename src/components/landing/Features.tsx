'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, CreditCard, Ticket, Sparkles } from 'lucide-react';

const benefits = [
  {
    title: "Verified Staff",
    description: "Every service provider is background-checked and rated by the community.",
    icon: ShieldCheck,
    color: "bg-blue-50 text-blue-600"
  },
  {
    title: "Secure Payments",
    description: "Multi-layered encryption ensures your financial transactions are safe.",
    icon: CreditCard,
    color: "bg-emerald-50 text-emerald-600"
  },
  {
    title: "Instant E-Tickets",
    description: "Digital confirmation sent to your wallet immediately after checkout.",
    icon: Ticket,
    color: "bg-purple-50 text-purple-600"
  }
];

export function Features() {
  return (
    <section className="max-w-[1440px] mx-auto px-10">
      <div className="bg-surface-container-low rounded-[3rem] p-16 md:p-24 overflow-hidden relative border border-outline-variant/10">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl -z-10" />
        
        <div className="max-w-2xl mb-20">
          <h2 className="text-4xl font-black text-on-surface tracking-tight mb-6 font-headline">Why Join the Ledger?</h2>
          <p className="text-lg text-on-surface-variant font-medium leading-relaxed">
            We've built the most reliable platform for discovering world-class experiences, with a focus on security, speed, and quality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-white p-10 rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-outline-variant/5 group hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] transition-all"
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 ${benefit.color} group-hover:scale-110 transition-transform`}>
                <benefit.icon size={32} />
              </div>
              <h3 className="text-xl font-black text-on-surface mb-4 font-headline">{benefit.title}</h3>
              <p className="text-on-surface-variant text-sm font-medium leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
