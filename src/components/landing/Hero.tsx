'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const heroImages = [
  {
    src: "https://images.unsplash.com/photo-1540575861501-7ad058bf37ad?auto=format&fit=crop&q=80&w=2070",
    date: "OCT 24",
    aspect: "aspect-[4/5]"
  },
  {
    src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=2069",
    date: "NOV 15",
    aspect: "aspect-square"
  },
  {
    src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=2070",
    date: "DEC 05",
    aspect: "aspect-[4/3]"
  },
  {
    src: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=2070",
    date: "JAN 12",
    aspect: "aspect-[3/4]"
  }
];

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 pb-32 overflow-hidden bg-white">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-[1440px] mx-auto px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Next-Gen Event Marketplace
          </div>
          
          <h1 className="text-6xl sm:text-7xl font-black text-on-surface tracking-tight leading-[0.95] mb-8 font-headline">
            Unforgettable <span className="text-primary italic font-serif font-light">Experiences</span>, Effortlessly Organized.
          </h1>
          
          <p className="text-lg text-on-surface-variant font-medium leading-relaxed mb-10 max-w-lg">
            Join the world&apos;s most energetic community of event creators and thrill-seekers. From underground tech summits to exclusive gala dinners.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <Link 
              href="/events" 
              className="w-full sm:w-auto px-10 py-5 bg-primary text-on-primary rounded-2xl font-bold text-base shadow-2xl shadow-primary/20 hover:scale-105 transition-all active:scale-95 text-center group"
            >
              Explore Events
              <span className="material-symbols-outlined ml-2 text-lg align-middle group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
            <Link
              href="/signup"
              className="w-full sm:w-auto px-10 py-5 bg-surface-container-highest text-on-surface rounded-2xl font-bold text-base hover:bg-surface-bright transition-all active:scale-95 text-center"
            >
              Host an Event
            </Link>
          </div>

          <div className="mt-16 flex items-center gap-8">
            <div className="flex -space-x-4">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-12 h-12 rounded-full border-4 border-white overflow-hidden bg-surface-container-high">
                  <Image 
                    src={`https://i.pravatar.cc/100?u=${i}`} 
                    width={48} 
                    height={48} 
                    alt="User" 
                  />
                </div>
              ))}
              <div className="w-12 h-12 rounded-full border-4 border-white bg-primary text-on-primary flex items-center justify-center text-xs font-bold">
                +2k
              </div>
            </div>
            <div className="h-10 w-[1px] bg-outline-variant opacity-20" />
            <div className="text-sm font-bold text-on-surface-variant">
              Trusted by <span className="text-on-surface">5,000+</span> organizers <br/>
              and service providers worldwide
            </div>
          </div>
        </motion.div>

        {/* Right Masonry Grid */}
        <div className="relative grid grid-cols-2 gap-4 h-[600px]">
          <div className="space-y-4 pt-12">
            {heroImages.slice(0, 2).map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 + (i * 0.1), ease: "easeOut" }}
                className={`relative group overflow-hidden rounded-[2rem] shadow-2xl ${img.aspect}`}
              >
                <Image 
                  src={img.src} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-700" 
                  alt="Event"
                  priority={i === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-xl text-[10px] font-black text-on-surface shadow-sm">
                  {img.date}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="space-y-4">
            {heroImages.slice(2, 4).map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 + (i * 0.1), ease: "easeOut" }}
                className={`relative group overflow-hidden rounded-[2rem] shadow-2xl ${img.aspect}`}
              >
                <Image 
                  src={img.src} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-700" 
                  alt="Event"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-xl text-[10px] font-black text-on-surface shadow-sm">
                  {img.date}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Floating decorative cards */}
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-2xl shadow-2xl flex items-center gap-3 z-20 border border-outline-variant/10"
          >
            <div className="w-10 h-10 rounded-xl bg-tertiary/10 flex items-center justify-center text-tertiary">
              <span className="material-symbols-outlined">verified</span>
            </div>
            <div>
              <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Verified</p>
              <p className="text-xs font-bold text-on-surface">Premium Access</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
