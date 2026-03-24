'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

interface EventSummary {
  _id: string;
  title: string;
  date: string | Date;
  locationName?: string;
  imageUrl?: string | null;
  category: string;
  totalTickets: number;
  bookingsCount: number;
  ticketTypes: Array<{ name: string; price: number; quantity: number }>;
}

interface FeaturedEventsProps {
  events: EventSummary[];
}

export function FeaturedEvents({ events }: FeaturedEventsProps) {
  return (
    <section className="max-w-[1440px] mx-auto px-10">
      <div className="flex items-end justify-between mb-12">
        <div>
          <h2 className="text-4xl font-black text-on-surface tracking-tight font-headline">Editor's Picks</h2>
          <p className="text-on-surface-variant font-medium mt-2">Hand-picked experiences you can't miss</p>
        </div>
        <Link href="/discover" className="px-6 py-3 bg-surface-container-high rounded-xl text-sm font-bold text-on-surface hover:bg-surface-bright transition-all">
          Explore All
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event, i) => {
          const soldOutPercent = event.totalTickets > 0 
            ? Math.round((event.bookingsCount / event.totalTickets) * 100)
            : 0;

          return (
            <motion.div
              key={event._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <Link href={`/events/${event._id}`}>
                <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden mb-6 shadow-xl group-hover:shadow-2xl transition-all duration-500">
                  <Image 
                    src={event.imageUrl || "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=2070"} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-700" 
                    alt={event.title}
                  />
                  
                  {/* Urgency Badge */}
                  {soldOutPercent > 70 && (
                    <div className="absolute top-6 left-6 bg-error text-on-error px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg animate-pulse">
                      Likely to Sell Out
                    </div>
                  )}

                  <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black text-on-surface shadow-sm">
                    {event.category.toUpperCase()}
                  </div>

                  <div className="absolute bottom-6 left-6 bg-primary text-on-primary px-4 py-2 rounded-2xl text-xs font-black shadow-lg">
                    FROM ${event.ticketTypes[0]?.price || '0'}
                  </div>
                </div>

                <div className="px-4">
                  <div className="flex items-center gap-2 mb-2 text-[10px] font-black text-primary uppercase tracking-[0.2em]">
                    <span className="material-symbols-outlined text-sm">calendar_today</span>
                    {format(new Date(event.date), 'MMMM d, yyyy')}
                  </div>
                  <h3 className="text-xl font-black text-on-surface group-hover:text-primary transition-colors leading-tight mb-2 font-headline">{event.title}</h3>
                  <div className="flex items-center gap-2 text-on-surface-variant text-sm font-medium">
                    <span className="material-symbols-outlined text-base">location_on</span>
                    {event.locationName}
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
