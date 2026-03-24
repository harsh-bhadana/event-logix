import React from "react";
import { notFound, redirect } from "next/navigation";
import Event from "@/models/Event";
import dbConnect from "@/lib/mongodb";
import { getSession } from "@/lib/auth";
import CheckoutForm from "@/components/features/CheckoutForm";

interface CheckoutPageProps {
  params: Promise<{ id: string }>;
}

export default async function CheckoutPage({ params }: CheckoutPageProps) {
  const { id } = await params;
  await dbConnect();

  const session = await getSession();
  if (!session?.user) {
    redirect(`/login?callbackUrl=/events/${id}/checkout`);
  }

  const event = await Event.findById(id);

  if (!event || event.status !== "published") {
    notFound();
  }

  // Convert Mongoose doc to plain object for client component
  const eventData = JSON.parse(JSON.stringify(event));

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-12 md:py-20">
      <div className="max-w-[1440px] mx-auto px-6 md:px-20 flex flex-col items-center">
        {/* Progress Stepper */}
        <div className="w-full max-w-4xl mb-12">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-slate-200 dark:bg-slate-800 -translate-y-1/2 z-0" />
            <div className="absolute top-1/2 left-0 w-1/2 h-[2px] bg-emerald-500 -translate-y-1/2 z-0" />
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold shadow-lg">1</div>
              <span className="mt-2 text-xs font-bold text-emerald-600 tracking-wide uppercase">Select</span>
            </div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold ring-4 ring-slate-50 dark:ring-slate-950">2</div>
              <span className="mt-2 text-xs font-bold text-slate-900 dark:text-white tracking-wide uppercase">Checkout</span>
            </div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-400 flex items-center justify-center font-bold">3</div>
              <span className="mt-2 text-xs font-bold text-slate-400 tracking-wide uppercase opacity-50">Success</span>
            </div>
          </div>
        </div>

        <CheckoutForm event={eventData} currentUser={session.user} />
      </div>
    </div>
  );
}
