"use client";

import React, { useState } from "react";
import { 
  Plus, 
  Minus, 
  Calendar, 
  MapPin, 
  Lock, 
  ShieldCheck, 
  CreditCard,
  User,
  Mail,
  Phone,
  Briefcase
} from "lucide-react";
import { bookTicket, completeBookingPayment } from "@/lib/actions/booking-actions";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface CheckoutFormProps {
  event: any;
  currentUser: any;
}

export default function CheckoutForm({ event, currentUser }: CheckoutFormProps) {
  const router = useRouter();
  const [selectedTicket, setSelectedTicket] = useState(event.ticketTypes[0]?.name || "");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    phone: "",
    jobTitle: ""
  });

  const ticket = event.ticketTypes.find((t: any) => t.name === selectedTicket);
  const totalPrice = (ticket?.price || 0) * quantity;

  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await bookTicket({
        eventId: event._id,
        ticketType: selectedTicket,
        quantity: quantity,
        attendeeInfo: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone
        }
      });

      if (res.success && res.bookingId) {
        if (res.isFree) {
          router.push(`/events/success?bookingId=${res.bookingId}`);
        } else {
          // Simulate payment completion
          const paymentRes = await completeBookingPayment(res.bookingId);
          if (paymentRes.success) {
            router.push(`/events/success?bookingId=${res.bookingId}`);
          } else {
            alert(paymentRes.message);
          }
        }
      } else {
        alert(res.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 w-full">
      {/* Left Side: Order Summary */}
      <section className="lg:col-span-5 flex flex-col space-y-8">
        <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800">
          <div className="h-64 relative">
            {event.imageUrl ? (
              <Image 
                src={event.imageUrl} 
                alt={event.title} 
                fill 
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-slate-200 dark:bg-slate-800" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-2 inline-block">
                {event.category}
              </span>
              <h1 className="text-2xl font-extrabold font-headline leading-tight">{event.title}</h1>
            </div>
          </div>
          
          <div className="p-8 space-y-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                <Calendar className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Date & Time</p>
                <p className="text-sm font-semibold dark:text-white">
                  {new Date(event.date).toLocaleDateString()} • {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                <MapPin className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Venue</p>
                <p className="text-sm font-semibold dark:text-white">{event.locationName || event.location.address}</p>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
              <h3 className="text-xs font-bold font-headline mb-4 uppercase tracking-widest text-emerald-600">Select Ticket Type</h3>
              <div className="space-y-3">
                {event.ticketTypes.map((t: any) => (
                  <div 
                    key={t.name}
                    onClick={() => setSelectedTicket(t.name)}
                    className={`p-4 rounded-2xl flex items-center justify-between cursor-pointer transition-all border-2 ${
                      selectedTicket === t.name 
                      ? "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-900/10" 
                      : "border-transparent bg-slate-50 dark:bg-slate-800/50 hover:border-slate-200 dark:hover:border-slate-700"
                    }`}
                  >
                    <div>
                      <p className="font-bold dark:text-white">{t.name}</p>
                      <p className="text-xs text-slate-500">${t.price.toFixed(2)} per ticket</p>
                    </div>
                    {selectedTicket === t.name && (
                      <div className="flex items-center space-x-4 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-full shadow-sm">
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleDecrement(); }}
                          className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-all"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-bold font-headline w-4 text-center dark:text-white">{quantity}</span>
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleIncrement(); }}
                          className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-all"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 flex justify-between items-end">
              <div>
                <p className="text-[10px] text-slate-400 font-bold tracking-widest">ESTIMATED TOTAL</p>
                <p className="text-4xl font-extrabold font-headline text-emerald-600">${totalPrice.toFixed(2)}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-400 italic">Taxes and fees included</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Right Side: Registration Form */}
      <section className="lg:col-span-7">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 lg:p-12 shadow-sm border border-slate-100 dark:border-slate-800">
          <div className="mb-10">
            <h2 className="text-3xl font-extrabold font-headline text-slate-900 dark:text-white mb-2">Registration Details</h2>
            <p className="text-slate-500">Complete your profile to secure your seat.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col space-y-2">
                <label className="text-xs font-bold text-slate-400 font-label uppercase tracking-widest">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-emerald-500 transition-all dark:text-white" 
                    placeholder="e.g. Alexander Sterling" 
                    type="text" 
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-xs font-bold text-slate-400 font-label uppercase tracking-widest">Professional Title</label>
                <div className="relative">
                  <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    value={formData.jobTitle}
                    onChange={(e) => setFormData({...formData, jobTitle: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-emerald-500 transition-all dark:text-white" 
                    placeholder="e.g. Senior Associate" 
                    type="text" 
                  />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col space-y-2">
                <label className="text-xs font-bold text-slate-400 font-label uppercase tracking-widest">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-emerald-500 transition-all dark:text-white" 
                    placeholder="alexander@ledger.com" 
                    type="email" 
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-xs font-bold text-slate-400 font-label uppercase tracking-widest">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-emerald-500 transition-all dark:text-white" 
                    placeholder="+1 (555) 000-0000" 
                    type="tel" 
                  />
                </div>
              </div>
            </div>

            {/* Payment Section */}
            <div className="pt-8 mt-8 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold font-headline dark:text-white">Secure Payment</h3>
                <div className="flex space-x-2">
                  <div className="p-1 px-2 bg-slate-100 dark:bg-slate-800 rounded text-[10px] font-bold text-slate-400 uppercase">Visa</div>
                  <div className="p-1 px-2 bg-slate-100 dark:bg-slate-800 rounded text-[10px] font-bold text-slate-400 uppercase">Mastercard</div>
                  <div className="p-1 px-2 bg-slate-100 dark:bg-slate-800 rounded text-[10px] font-bold text-slate-400 uppercase">Amex</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <label className="text-xs font-bold text-slate-400 font-label uppercase tracking-widest">Card Information</label>
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-xl px-4 py-4 flex items-center justify-between border-2 border-transparent focus-within:border-emerald-500 transition-all">
                    <div className="flex items-center space-x-3 w-full">
                      <CreditCard className="w-4 h-4 text-slate-400" />
                      <input 
                        className="bg-transparent border-none p-0 focus:ring-0 w-full dark:text-white" 
                        placeholder="Card number" 
                        type="text" 
                        disabled
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input 
                        className="bg-transparent border-none p-0 focus:ring-0 w-12 text-center dark:text-white" 
                        placeholder="MM/YY" 
                        type="text" 
                        disabled
                      />
                      <input 
                        className="bg-transparent border-none p-0 focus:ring-0 w-10 text-center dark:text-white" 
                        placeholder="CVC" 
                        type="text" 
                        disabled
                      />
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-400 italic mt-1">Simulated payment: Credit card dummy values accepted.</p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <div className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-emerald-600" />
                  256-bit SSL Secure
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Trusted Provider
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-6">
              <button 
                type="submit"
                disabled={loading}
                className={`w-full bg-slate-900 dark:bg-emerald-600 text-white py-5 rounded-2xl font-bold font-headline text-lg shadow-xl hover:opacity-90 transition-all flex items-center justify-center space-x-3 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Pay Now & Secure Ticket</span>
                  </>
                )}
              </button>
              <p className="text-center text-[10px] text-slate-400 mt-4 leading-relaxed">
                By completing this purchase, you agree to our <a className="text-emerald-600 underline" href="#">Terms of Participation</a> and <a className="text-emerald-600 underline" href="#">Privacy Protocol</a>.
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
