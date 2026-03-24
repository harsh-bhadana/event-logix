'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Bell, 
  Settings, 
  Maximize, 
  Search, 
  ListFilter, 
  History, 
  CheckCircle2, 
  AlertTriangle,
  QrCode,
  ScanLine
} from 'lucide-react';
import { verifyTicket } from '@/lib/actions/staff-actions';
import { toast } from 'sonner';

interface CheckinClientProps {
  eventId: string;
  eventTitle: string;
}

export default function CheckinClient({ eventId, eventTitle }: CheckinClientProps) {
  const [manualId, setManualId] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{
    success: boolean;
    data?: {
      attendeeName: string;
      ticketType: string;
      eventName: string;
      quantity: number;
    };
    error?: string;
  } | null>(null);

  const handleVerify = async (id: string) => {
    if (!id) return;
    setIsVerifying(true);
    setVerificationResult(null);

    try {
      const res = await verifyTicket(id);
      setVerificationResult(res);
      if (res.success) {
        toast.success("Ticket Verified!");
      } else {
        toast.error(res.error || "Invalid Ticket");
      }
    } catch (error) {
      toast.error("Verification error");
    } finally {
      setIsVerifying(false);
    }
  };

  const resetScanner = () => {
    setVerificationResult(null);
    setManualId('');
  };

  return (
    <div className="bg-[#121414] text-white font-body min-h-screen flex flex-col items-center max-w-lg mx-auto w-full relative overflow-hidden">
      {/* TopAppBar */}
      <header className="bg-[#121414]/90 backdrop-blur-md fixed top-0 z-50 flex justify-between items-center w-full px-6 h-20 max-w-lg mx-auto border-b border-white/5">
        <div className="flex items-center gap-4">
          <button onClick={() => window.history.back()} className="text-[#afefdd] p-2 hover:bg-white/5 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex flex-col">
            <h1 className="text-lg font-black tracking-tighter text-[#afefdd] font-headline uppercase">Event Logix</h1>
            <p className="text-[10px] uppercase tracking-widest text-[#909190] font-label font-bold">Gate Control</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-[#909190] hover:text-[#afefdd] transition-colors p-2">
            <Bell className="w-5 h-5" />
          </button>
          <div className="w-9 h-9 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center font-bold text-[#afefdd] text-xs">
            JD
          </div>
        </div>
      </header>

      <main className="flex-grow pt-28 pb-32 px-6 flex flex-col items-center w-full">
        {/* Event Context */}
        <div className="w-full mb-8 text-center space-y-2">
          <h2 className="text-2xl font-black tracking-tight font-headline text-[#afefdd] leading-tight uppercase">
            {eventTitle}
          </h2>
          <div className="flex justify-center gap-3">
            <span className="bg-[#29695b]/20 text-[#afefdd] px-2.5 py-1 rounded text-[10px] font-bold font-label uppercase tracking-widest border border-[#29695b]/30">
              Station 01
            </span>
            <span className="bg-[#ddf2ce]/10 text-[#ddf2ce] px-2.5 py-1 rounded text-[10px] font-bold font-label uppercase tracking-widest border border-[#ddf2ce]/20">
              Live Entry
            </span>
          </div>
        </div>

        {/* Camera Scanner Placeholder */}
        <div className="relative w-full aspect-square bg-slate-900/50 rounded-[2.5rem] overflow-hidden shadow-2xl flex items-center justify-center border-2 border-white/5">
          {/* Simulated Camera View */}
          <div className="absolute inset-0 opacity-40">
            <img 
              src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=800" 
              className="w-full h-full object-cover grayscale opacity-20" 
              alt="Scanning View" 
            />
          </div>

          {/* Scanning Guides */}
          <div className="relative z-10 w-64 h-64 flex flex-col items-center justify-center">
            {/* Corners */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-[#afefdd] rounded-tl-2xl"></div>
            <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-[#afefdd] rounded-tr-2xl"></div>
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-[#afefdd] rounded-bl-2xl"></div>
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-[#afefdd] rounded-br-2xl"></div>
            
            <div className="w-full h-[2px] bg-[#afefdd]/40 absolute top-1/2 -translate-y-1/2 animate-pulse shadow-[0_0_15px_rgba(175,239,221,0.5)]"></div>
            <QrCode className="w-20 h-20 text-[#afefdd] opacity-20" />
            <motion.div 
              animate={{ y: [-100, 100] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="absolute inset-x-0 top-1/2 h-1 bg-gradient-to-r from-transparent via-[#afefdd]/50 to-transparent"
            />
          </div>

          {/* Scanning Prompt */}
          <div className="absolute bottom-10 left-0 w-full text-center px-6">
            <p className="text-[#afefdd] text-xs font-bold font-headline bg-slate-900/80 backdrop-blur-xl py-3 px-6 rounded-full inline-flex items-center gap-2 border border-[#afefdd]/10 uppercase tracking-widest">
              <ScanLine className="w-4 h-4 animate-pulse" /> Position QR Code in frame
            </p>
          </div>

          {/* Success Overlay */}
          <AnimatePresence>
            {verificationResult?.success && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-[#29695b] flex flex-col items-center justify-center z-20 text-center p-8"
              >
                <CheckCircle2 className="w-24 h-24 text-white mb-6" />
                <h3 className="text-white text-3xl font-black font-headline uppercase tracking-tighter">Verified</h3>
                <p className="text-[#defff4] font-bold text-lg mt-2 font-headline">{verificationResult.data?.attendeeName}</p>
                <p className="text-[#defff4]/70 text-[10px] uppercase font-bold tracking-[0.2em] mt-4 font-label">
                  {verificationResult.data?.ticketType} • QUANTITY: {verificationResult.data?.quantity}
                </p>
                <button 
                  onClick={resetScanner}
                  className="mt-10 px-10 py-4 bg-white text-[#29695b] rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl active:scale-95 transition-transform"
                >
                  Next Scan
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error Overlay */}
          <AnimatePresence>
            {verificationResult && !verificationResult.success && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-red-600 flex flex-col items-center justify-center z-20 text-center p-8"
              >
                <AlertTriangle className="w-24 h-24 text-white mb-6" />
                <h3 className="text-white text-3xl font-black font-headline uppercase tracking-tighter">Access Denied</h3>
                <p className="text-red-100 font-bold text-lg mt-2 font-headline">{verificationResult.error || "Invalid Ticket"}</p>
                <button 
                  onClick={resetScanner}
                  className="mt-10 px-10 py-4 bg-white/20 text-white border border-white/20 rounded-2xl font-black uppercase tracking-widest text-xs active:scale-95 transition-transform"
                >
                  Retry Scan
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Manual Entry Section */}
        <div className="w-full mt-10 space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-[1px] flex-grow bg-white/10"></div>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#909190] font-label">Manual Entry</span>
            <div className="h-[1px] flex-grow bg-white/10"></div>
          </div>
          
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#afefdd] transition-colors w-5 h-5" />
            <input 
              value={manualId}
              onChange={(e) => setManualId(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleVerify(manualId)}
              className="w-full bg-slate-900 border-none text-white rounded-2xl py-5 pl-12 pr-4 focus:ring-2 focus:ring-[#29695b] placeholder-slate-600 transition-all font-body text-sm" 
              placeholder="Search attendee name or ID..." 
              type="text"
            />
            {manualId && (
              <button 
                onClick={() => handleVerify(manualId)}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#29695b] text-[#afefdd] px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest"
              >
                Verify
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="bg-slate-900 hover:bg-slate-800 text-[#afefdd] py-4 px-6 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 border border-white/5">
              <ListFilter className="w-4 h-4" />
              <span className="text-[10px] font-bold font-label uppercase tracking-widest">Guest List</span>
            </button>
            <button className="bg-slate-900 hover:bg-slate-800 text-[#afefdd] py-4 px-6 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 border border-white/5">
              <History className="w-4 h-4" />
              <span className="text-[10px] font-bold font-label uppercase tracking-widest">Recent</span>
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="w-full mt-10 bg-slate-900/40 border border-white/5 rounded-3xl p-6 flex justify-between items-center">
          <div className="text-center flex-1 border-r border-white/5">
            <p className="text-[#909190] text-[10px] uppercase font-bold tracking-[0.2em] mb-2">Checked In</p>
            <p className="text-2xl font-black font-headline text-[#afefdd]">412 <span className="text-slate-600 text-sm font-medium">/ 500</span></p>
          </div>
          <div className="text-center flex-1">
            <p className="text-[#909190] text-[10px] uppercase font-bold tracking-[0.2em] mb-2">In Queue</p>
            <p className="text-2xl font-black font-headline text-[#afefdd]">Low</p>
          </div>
        </div>
      </main>

      {/* Bottom Interface Bar (Simulated Mobile Indicators) */}
      <div className="fixed bottom-4 h-1.5 w-32 bg-white/10 rounded-full z-50"></div>
    </div>
  );
}
