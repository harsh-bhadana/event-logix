import React from "react";
import { CheckCircle, Download, Calendar, ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";
import dbConnect from "@/lib/mongodb";
import Booking from "@/models/Booking";
import { notFound } from "next/navigation";
import Image from "next/image";

interface SuccessPageProps {
  searchParams: Promise<{ bookingId?: string }>;
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const { bookingId } = await searchParams;

  if (!bookingId) {
    notFound();
  }

  await dbConnect();
  const booking = await Booking.findById(bookingId).populate("event");

  if (!booking) {
    notFound();
  }

  return (
    <main className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center px-4 py-20 bg-slate-50 dark:bg-slate-950">
      {/* Decorative Elements */}
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-2xl w-full z-10 flex flex-col items-center">
        {/* Success Hero Section */}
        <div className="mb-12 text-center">
          <div className="relative inline-block mb-8">
            <div className="w-24 h-24 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-[0_20px_40px_rgba(16,185,129,0.2)] relative z-10">
              <CheckCircle className="w-12 h-12" />
            </div>
            {/* Confetti Visuals (Simplified with dots) */}
            <div className="absolute -top-4 -left-4 w-4 h-4 bg-emerald-300 rounded-full opacity-40 animate-bounce" />
            <div className="absolute top-8 -right-6 w-3 h-3 bg-emerald-600 rounded-full opacity-30 animate-pulse" />
            <div className="absolute -bottom-2 -right-2 w-5 h-5 bg-emerald-100 rounded-full opacity-50" />
          </div>
          
          <h1 className="font-headline font-extrabold text-4xl md:text-5xl tracking-tight text-emerald-600 mb-4">
            You&apos;re Going!
          </h1>
          <p className="text-slate-500 text-lg md:text-xl max-w-lg mx-auto font-medium">
            Your spot is secured for <span className="text-slate-900 dark:text-white font-bold">{booking.event?.title}</span>.
          </p>
        </div>

        {/* Ticket Snapshot Card */}
        <div className="w-full bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden border border-slate-100 dark:border-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-12">
            {/* Left Section: Visual */}
            <div className="md:col-span-4 relative min-h-[200px]">
              {booking.event?.imageUrl ? (
                <Image 
                  src={booking.event.imageUrl} 
                  alt={booking.event.title} 
                  fill 
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-slate-200 dark:bg-slate-800" />
              )}
              <div className="absolute inset-0 bg-emerald-900/40 mix-blend-multiply" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <span className="font-headline font-bold text-white text-xs tracking-widest uppercase mb-1">Confirmation</span>
                <div className="h-1 w-12 bg-emerald-400 rounded-full" />
              </div>
            </div>

            {/* Right Section: Data */}
            <div className="md:col-span-8 p-8 md:p-10 flex flex-col">
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Booking ID</label>
                  <p className="font-headline font-bold text-lg text-slate-900 dark:text-white uppercase truncate">
                    #{booking._id.toString().substring(18)}
                  </p>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Date</label>
                  <p className="font-headline font-bold text-lg text-slate-900 dark:text-white">
                    {new Date(booking.event?.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="mb-8">
                <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Location</label>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
                  <p className="font-headline font-bold text-lg text-slate-900 dark:text-white">
                    {booking.event?.locationName || booking.event?.location?.address}
                  </p>
                </div>
              </div>

              <div className="mt-auto pt-8 border-t border-slate-100 dark:border-slate-800">
                <button className="w-full bg-slate-900 dark:bg-emerald-600 text-white py-4 px-6 rounded-2xl font-headline font-bold text-sm tracking-tight flex items-center justify-center gap-3 hover:opacity-90 transition-all active:scale-[0.98]">
                  <Download className="w-5 h-5" />
                  Download PDF Ticket
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="mt-12 flex flex-col md:flex-row items-center gap-6 w-full max-w-lg">
          <button className="flex-1 w-full bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white py-4 px-6 rounded-2xl font-headline font-bold text-sm flex items-center justify-center gap-3 transition-colors border border-slate-200 dark:border-slate-700">
            <Calendar className="w-5 h-5 text-emerald-500" />
            Add to Calendar
          </button>
          <Link 
            href="/dashboard"
            className="flex-1 w-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 py-4 px-6 rounded-2xl font-headline font-bold text-sm flex items-center justify-center gap-3 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-all"
          >
            Go to Dashboard
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <p className="mt-16 text-slate-400 text-xs font-medium tracking-wide">
          Need assistance? Contact our <Link href="/support" className="text-emerald-600 hover:underline">Support Team</Link> anytime.
        </p>
      </div>
    </main>
  );
}
