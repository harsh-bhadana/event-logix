"use client";

import React, { useState } from "react";
import { 
  Ticket, 
  Calendar, 
  MapPin, 
  ChevronRight, 
  History, 
  ExternalLink,
  Search,
  CheckCircle2
} from "lucide-react";
import Image from "next/image";
import TicketModal from "./TicketModal";

interface DashboardClientProps {
  bookings: any[];
  user: any;
}

export default function DashboardClient({ bookings, user }: DashboardClientProps) {
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const upcomingBookings = bookings.filter(b => new Date(b.event?.date) >= new Date());
  const pastBookings = bookings.filter(b => new Date(b.event?.date) < new Date());

  const handleViewTicket = (booking: any) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col md:flex-row gap-12 px-6 md:px-20 py-12 max-w-[1440px] mx-auto w-full min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="space-y-1">
          <h3 className="font-headline font-bold text-xs uppercase tracking-widest text-slate-400 mb-4 px-4">Account</h3>
          <nav className="flex flex-col gap-1">
            <a className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-emerald-600 font-semibold shadow-sm" href="#">
              <Ticket className="w-4 h-4" />
              <span>My Tickets</span>
            </a>
            <a className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white dark:hover:bg-slate-900 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-all" href="#">
              <Calendar className="w-4 h-4" />
              <span>Schedule</span>
            </a>
            <a className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white dark:hover:bg-slate-900 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-all" href="#">
              <History className="w-4 h-4" />
              <span>Past Events</span>
            </a>
          </nav>
        </div>

        {/* Member Perk Card */}
        <div className="mt-12 p-6 bg-emerald-600 rounded-3xl text-white shadow-xl shadow-emerald-500/20">
          <span className="text-[10px] font-bold uppercase tracking-tighter bg-white/20 px-2 py-0.5 rounded-full">Member Perk</span>
          <p className="mt-3 font-headline font-bold text-lg leading-tight">Priority access to the Q4 Executive Summit.</p>
          <button className="mt-4 text-xs font-bold flex items-center gap-1 group">
            Learn more 
            <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <section className="flex-grow">
        {/* Welcome Header */}
        <header className="mb-12">
          <h1 className="font-headline font-extrabold text-4xl text-slate-900 dark:text-white tracking-tight">
            Hello, {user?.name?.split(' ')[0]}!
          </h1>
          <p className="text-slate-500 mt-2 text-lg">
            You have <span className="text-emerald-600 font-bold">{upcomingBookings.length}</span> upcoming event(s) secured.
          </p>
        </header>

        {/* Active Tickets Grid */}
        <div className="space-y-6">
          <h2 className="font-headline font-bold text-xl text-slate-900 dark:text-white">Upcoming Experiences</h2>
          
          {upcomingBookings.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Ticket className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="font-bold text-xl dark:text-white">No upcoming events</h3>
              <p className="text-slate-500 mt-2">Ready for your next experience? Browse thousands of events.</p>
              <a href="/events" className="inline-block mt-6 px-8 py-3 bg-slate-900 dark:bg-emerald-600 text-white rounded-xl font-bold hover:opacity-90 transition-all">
                Browse Events
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {upcomingBookings.map((booking) => (
                <div 
                  key={booking._id}
                  className="bg-white dark:bg-slate-900 rounded-3xl flex flex-col md:flex-row overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-none transition-all group border border-slate-100 dark:border-slate-800"
                >
                  <div className="w-full md:w-64 h-48 md:h-auto overflow-hidden relative">
                    {booking.event?.imageUrl ? (
                      <Image 
                        src={booking.event.imageUrl} 
                        alt={booking.event.title} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-200 dark:bg-slate-800" />
                    )}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] font-bold text-slate-900 uppercase">Confirmed</span>
                    </div>
                  </div>
                  
                  <div className="p-8 flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-headline font-bold text-2xl text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                          {booking.event?.title}
                        </h3>
                        <span className="text-[10px] font-bold font-label text-slate-400 bg-slate-50 dark:bg-slate-800 px-3 py-1 rounded-full uppercase tracking-wider">
                          ID: #{booking._id.toString().substring(18)}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-6 mt-4">
                        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                          <Calendar className="w-4 h-4 text-emerald-500" />
                          <span className="text-sm">{new Date(booking.event?.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                          <MapPin className="w-4 h-4 text-emerald-500" />
                          <span className="text-sm truncate max-w-[200px]">{booking.event?.locationName || booking.event?.location?.address}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                          <Ticket className="w-4 h-4 text-emerald-500" />
                          <span className="text-sm">{booking.ticketType} x {booking.quantity}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8 flex items-center justify-between border-t border-slate-50 dark:border-slate-800 pt-6">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-700" />
                        ))}
                        <div className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-emerald-500 text-[10px] flex items-center justify-center text-white font-bold">+12</div>
                      </div>
                      <button 
                        onClick={() => handleViewTicket(booking)}
                        className="bg-slate-900 dark:bg-emerald-600 text-white px-8 py-3 rounded-xl text-sm font-bold shadow-lg shadow-slate-900/10 dark:shadow-none hover:-translate-y-0.5 transition-all active:scale-95"
                      >
                        View Ticket
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Past Bookings Section */}
        {pastBookings.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
              <h2 className="font-headline font-bold text-xl text-slate-400">Historical Records</h2>
              <button className="text-emerald-600 text-sm font-bold flex items-center gap-1 hover:underline">
                View All History
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4 opacity-70 grayscale-[0.5] hover:grayscale-0 hover:opacity-100 transition-all">
              {pastBookings.map((booking) => (
                <div 
                  key={booking._id}
                  className="bg-white dark:bg-slate-900 px-8 py-4 rounded-2xl flex items-center justify-between border border-slate-100 dark:border-slate-800"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-slate-400" />
                    </div>
                    <div>
                      <p className="font-bold text-sm dark:text-white">{booking.event?.title}</p>
                      <p className="text-xs text-slate-500">
                        {new Date(booking.event?.date).toLocaleDateString()} • {booking.event?.locationName}
                      </p>
                    </div>
                  </div>
                  <button className="text-xs font-bold text-slate-400 hover:text-emerald-600 flex items-center gap-1 transition-colors">
                    Receipt 
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Ticket Modal */}
      <TicketModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        booking={selectedBooking} 
      />
    </div>
  );
}
