'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  RefreshCw, 
  Send, 
  Undo2, 
  Edit3, 
  User, 
  Mail, 
  Phone, 
  Calendar,
  X,
  FileText,
  DollarSign
} from 'lucide-react';
import { 
  searchBookings, 
  refundBooking, 
  resendDigitalTicket, 
  updateAttendeeInfo 
} from '@/lib/actions/support-actions';
import { toast } from 'sonner';

export default function BookingManagementClient() {
  const [query, setQuery] = useState('');
  const [bookings, setBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingBooking, setEditingBooking] = useState<any | null>(null);

  // Edit Modal form state
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const res = await searchBookings(query);
      if (res.success) {
        setBookings(res.data || []);
      } else {
        toast.error(res.error || "Search failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to query bookings");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  const handleResendTicket = async (id: string) => {
    try {
      const res = await resendDigitalTicket(id);
      if (res.success) {
        toast.success(res.message || "Ticket resent");
      } else {
        toast.error(res.error || "Failed to resend ticket");
      }
    } catch (err) {
      toast.error("Resend error");
    }
  };

  const handleRefund = async (id: string) => {
    if (!confirm("Are you sure you want to refund this booking? This will cancel the ticket and free up event capacity.")) return;
    try {
      const res = await refundBooking(id);
      if (res.success) {
        toast.success(res.message || "Refund successful");
        handleSearch();
      } else {
        toast.error(res.error || "Refund failed");
      }
    } catch (err) {
      toast.error("Refund error");
    }
  };

  const openEditModal = (booking: any) => {
    setEditingBooking(booking);
    setEditName(booking.attendeeInfo?.name || '');
    setEditEmail(booking.attendeeInfo?.email || '');
    setEditPhone(booking.attendeeInfo?.phone || '');
  };

  const closeEditModal = () => {
    setEditingBooking(null);
  };

  const handleUpdateInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBooking) return;
    setIsUpdating(true);

    try {
      const res = await updateAttendeeInfo(editingBooking._id, {
        name: editName,
        email: editEmail,
        phone: editPhone
      });

      if (res.success) {
        toast.success("Attendee details updated");
        closeEditModal();
        handleSearch();
      } else {
        toast.error(res.error || "Failed to update details");
      }
    } catch (err) {
      toast.error("Update error");
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
      case 'refunded':
        return 'bg-red-500/10 text-red-400 border border-red-500/20';
      default:
        return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
    }
  };

  return (
    <div className="space-y-8 font-body">
      {/* Search Input Bar */}
      <div className="bg-white p-6 rounded-[2rem] border border-outline-variant/10 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search by Booking ID, guest name, email, or phone..." 
            className="w-full bg-surface border border-outline-variant/10 rounded-2xl py-4 pl-12 pr-4 text-xs text-on-surface outline-none focus:ring-1 focus:ring-primary font-medium"
            type="text"
          />
        </div>
        <button 
          onClick={handleSearch}
          disabled={isLoading}
          className="w-full md:w-auto px-8 py-4 rounded-2xl bg-primary text-on-primary font-black text-xs uppercase tracking-widest shadow-lg hover:scale-105 active:scale-98 transition-all flex items-center justify-center gap-2"
        >
          {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : "Query Ledger"}
        </button>
      </div>

      {/* Bookings Result Table */}
      <div className="bg-white rounded-[2rem] border border-outline-variant/10 overflow-hidden shadow-sm">
        <div className="px-8 py-5 border-b border-outline-variant/10 flex justify-between items-center bg-surface-container-low">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-primary" />
            <h3 className="font-headline font-black text-sm uppercase tracking-wider text-on-surface-variant">Active Reservations</h3>
          </div>
          <span className="text-[10px] font-bold px-3 py-1 bg-white border border-outline-variant/10 rounded-full text-on-surface-variant font-mono">
            {bookings.length} match(es)
          </span>
        </div>

        <div className="divide-y divide-outline-variant/5">
          {isLoading ? (
            <div className="p-16 text-center text-slate-500 text-xs flex justify-center items-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin text-primary" /> Searching reservations...
            </div>
          ) : bookings.length === 0 ? (
            <div className="p-16 text-center text-slate-500 text-xs italic">
              No reservation records found. Try typing a query.
            </div>
          ) : (
            bookings.map((booking) => (
              <div key={booking._id} className="p-6 md:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:bg-surface-container-lowest/40 transition-colors">
                {/* Attendee Info & Ticket */}
                <div className="space-y-4 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-[10px] text-slate-400 font-bold bg-surface px-2.5 py-1 rounded-md border border-outline-variant/10">
                      ID: #{booking._id.toString().substring(18)}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${getStatusStyle(booking.paymentStatus)}`}>
                      {booking.paymentStatus}
                    </span>
                    <span className="text-[9px] text-slate-500 font-bold bg-primary/5 text-primary border border-primary/10 px-2 py-0.5 rounded">
                      {booking.ticketType} (Qty: {booking.quantity})
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-slate-400 text-[9px] uppercase font-bold tracking-wider">Event Details</p>
                      <h4 className="font-headline font-black text-sm text-on-surface leading-tight truncate max-w-[320px]">
                        {booking.event?.title}
                      </h4>
                      <p className="text-[10px] text-slate-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        {new Date(booking.event?.date).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-slate-400 text-[9px] uppercase font-bold tracking-wider">Attendee Info</p>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-on-surface">
                        <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        {booking.attendeeInfo?.name || "Anonymous Guest"}
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-[10px] text-slate-500 font-medium font-mono">
                        <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-slate-400" /> {booking.attendeeInfo?.email || 'N/A'}</span>
                        {booking.attendeeInfo?.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-slate-400" /> {booking.attendeeInfo?.phone}</span>}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Operations & Pricing */}
                <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between gap-4 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-outline-variant/5">
                  <div className="text-left lg:text-right">
                    <p className="text-slate-400 text-[9px] uppercase font-bold tracking-wider">Total Value</p>
                    <p className="text-xl font-headline font-black text-on-surface flex items-center gap-0.5 justify-start lg:justify-end mt-0.5">
                      <DollarSign className="w-4 h-4 text-primary shrink-0" />
                      {booking.totalAmount.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button 
                      onClick={() => openEditModal(booking)}
                      className="p-3 bg-surface border border-outline-variant/10 text-on-surface-variant hover:text-primary rounded-xl transition-all hover:scale-105 active:scale-95 shadow-sm"
                      title="Edit Attendee Info"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleResendTicket(booking._id)}
                      className="p-3 bg-surface border border-outline-variant/10 text-on-surface-variant hover:text-emerald-400 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-sm"
                      title="Resend Digital Ticket Notification"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleRefund(booking._id)}
                      disabled={booking.paymentStatus === 'refunded'}
                      className={`p-3 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-sm ${
                        booking.paymentStatus === 'refunded'
                          ? 'bg-slate-100 border border-slate-200 text-slate-300 cursor-not-allowed'
                          : 'bg-red-50/50 border border-red-100 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500'
                      }`}
                      title="Refund Booking"
                    >
                      <Undo2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Edit Attendee Modal */}
      <AnimatePresence>
        {editingBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md bg-white rounded-[2.5rem] border border-outline-variant/10 shadow-2xl overflow-hidden"
            >
              <div className="px-8 py-6 border-b border-outline-variant/10 flex justify-between items-center bg-surface-container-low">
                <h3 className="font-headline font-black text-lg text-on-surface italic">Modify Attendee Data</h3>
                <button onClick={closeEditModal} className="text-slate-400 hover:text-on-surface p-1 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleUpdateInfo} className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-400">Full Name</label>
                  <input 
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    required
                    className="w-full bg-surface border border-outline-variant/10 rounded-2xl py-3.5 px-4 text-xs text-on-surface outline-none focus:ring-1 focus:ring-primary font-bold"
                    type="text"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-400">Email Address</label>
                  <input 
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    required
                    className="w-full bg-surface border border-outline-variant/10 rounded-2xl py-3.5 px-4 text-xs text-on-surface outline-none focus:ring-1 focus:ring-primary font-mono font-medium"
                    type="email"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-400">Contact Number</label>
                  <input 
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    className="w-full bg-surface border border-outline-variant/10 rounded-2xl py-3.5 px-4 text-xs text-on-surface outline-none focus:ring-1 focus:ring-primary font-mono font-medium"
                    type="text"
                  />
                </div>

                <div className="flex gap-4 pt-4 border-t border-outline-variant/10">
                  <button 
                    type="button"
                    onClick={closeEditModal}
                    className="flex-1 py-4 border border-outline-variant/10 rounded-2xl font-bold text-xs text-on-surface-variant hover:bg-surface transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={isUpdating}
                    className="flex-1 py-4 bg-primary text-on-primary rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2"
                  >
                    {isUpdating ? <RefreshCw className="w-4 h-4 animate-spin" /> : "Save Changes"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
