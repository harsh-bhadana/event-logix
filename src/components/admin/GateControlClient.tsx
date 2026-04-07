'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Bell, 
  Search, 
  QrCode, 
  ScanLine, 
  CheckCircle2, 
  AlertTriangle,
  ChevronDown,
  LayoutGrid,
  History,
  Settings
} from 'lucide-react';
import { verifyTicket } from '@/lib/actions/staff-actions';
import { toast } from 'sonner';

interface GateControlClientProps {
  initialEvents: any[];
}

export default function GateControlClient({ initialEvents }: GateControlClientProps) {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
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
  const [showEventPicker, setShowEventPicker] = useState(false);

  const handleVerify = async (id: string) => {
    if (!id) return;
    setIsVerifying(true);
    setVerificationResult(null);

    try {
      const res = await verifyTicket(id);
      
      // If we've selected a specific event, verify if this ticket belongs to it
      if (res.success && selectedEvent && res.data?.eventName !== selectedEvent.title) {
         setVerificationResult({
           success: false,
           error: "Ticket belongs to a different event: " + res.data?.eventName
         });
         toast.error("Event Mismatch");
         return;
      }

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
            <h1 className="text-lg font-black tracking-tighter text-[#afefdd] font-headline uppercase leading-none">Gate Control</h1>
            <p className="text-[10px] uppercase tracking-widest text-[#909190] font-label font-bold mt-1">Universal Entry</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="text-[#909190] hover:text-[#afefdd] p-2 transition-colors">
            <Settings className="w-5 h-5" />
          </button>
          <div className="w-9 h-9 rounded-full bg-[#afefdd]/10 border border-[#afefdd]/20 flex items-center justify-center font-bold text-[#afefdd] text-xs">
            AD
          </div>
        </div>
      </header>

      <main className="flex-grow pt-28 pb-32 px-6 flex flex-col items-center w-full">
        {/* Event Context & Switcher */}
        <div className="w-full mb-8">
          <button 
            onClick={() => setShowEventPicker(!showEventPicker)}
            className="w-full bg-slate-900/50 border border-white/5 p-5 rounded-3xl flex items-center justify-between group hover:border-[#afefdd]/20 transition-all active:scale-[0.98]"
          >
            <div className="flex flex-col items-start text-left">
              <span className="text-[10px] uppercase tracking-widest text-[#909190] font-bold mb-1">Checking into</span>
              <p className="text-lg font-black font-headline text-[#afefdd] truncate max-w-[200px]">
                {selectedEvent ? selectedEvent.title.toUpperCase() : "MASTER SCANNER"}
              </p>
            </div>
            <div className="bg-[#afefdd]/10 p-2 rounded-xl text-[#afefdd] group-hover:bg-[#afefdd]/20 transition-colors">
              <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${showEventPicker ? 'rotate-180' : ''}`} />
            </div>
          </button>

          {/* Event Picker Dropdown (Simplified for this UI) */}
          <AnimatePresence>
            {showEventPicker && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-2 bg-[#1a1c1c] border border-white/5 rounded-3xl overflow-hidden shadow-2xl absolute left-6 right-6 z-40 max-h-[300px] overflow-y-auto scrollbar-hide"
              >
                <div 
                  onClick={() => { setSelectedEvent(null); setShowEventPicker(false); }}
                  className="p-4 border-b border-white/5 hover:bg-white/5 cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <p className="font-bold text-sm text-[#afefdd]">Universal Mode</p>
                    <p className="text-[10px] text-slate-500">Scan any ticket regardless of event</p>
                  </div>
                  {!selectedEvent && <div className="w-2 h-2 rounded-full bg-[#afefdd]" />}
                </div>
                {initialEvents.map((event) => (
                  <div 
                    key={event._id}
                    onClick={() => { setSelectedEvent(event); setShowEventPicker(false); }}
                    className="p-4 border-b border-white/5 hover:bg-white/5 cursor-pointer flex items-center justify-between"
                  >
                    <div>
                      <p className="font-bold text-sm truncate max-w-[200px]">{event.title}</p>
                      <p className="text-[10px] text-slate-500">{new Date(event.date).toLocaleDateString()}</p>
                    </div>
                    {selectedEvent?._id === event._id && <div className="w-2 h-2 rounded-full bg-[#afefdd]" />}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Camera Scanner Container */}
        <div className="relative w-full aspect-square bg-[#0a0c0c] rounded-[3rem] overflow-hidden shadow-2xl flex items-center justify-center border border-white/5 mb-10">
          {/* Simulated Camera View */}
          <div className="absolute inset-0 opacity-20">
            <img 
               src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=800" 
               className="w-full h-full object-cover grayscale" 
               alt="Scanning View" 
            />
          </div>

          <div className="relative z-10 w-64 h-64 flex flex-col items-center justify-center">
            {/* Corner Markers */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-[3px] border-l-[3px] border-[#afefdd] rounded-tl-3xl opacity-60"></div>
            <div className="absolute top-0 right-0 w-16 h-16 border-t-[3px] border-r-[3px] border-[#afefdd] rounded-tr-3xl opacity-60"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-[3px] border-l-[3px] border-[#afefdd] rounded-bl-3xl opacity-60"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-[3px] border-r-[3px] border-[#afefdd] rounded-br-3xl opacity-60"></div>
            
            <QrCode className="w-24 h-24 text-[#afefdd] opacity-10" />
            
            {/* Animated Laser Line */}
            <motion.div 
               animate={{ y: [-110, 110] }}
               transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
               className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#afefdd]/80 to-transparent shadow-[0_0_20px_#afefdd]"
            />
          </div>

          {/* Verification Result Overlays */}
          <AnimatePresence>
            {verificationResult?.success && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-[#29695b] flex flex-col items-center justify-center z-20 text-center p-8"
              >
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-white text-3xl font-black font-headline uppercase tracking-tighter">Verified</h3>
                <div className="mt-4 space-y-1">
                  <p className="text-[#defff4] font-bold text-xl font-headline tracking-tight">{verificationResult.data?.attendeeName}</p>
                  <p className="text-[#defff4]/60 text-[10px] uppercase font-black tracking-widest">{verificationResult.data?.eventName}</p>
                </div>
                
                <div className="mt-8 bg-black/10 rounded-2xl p-4 w-full border border-white/5">
                  <div className="flex justify-between items-center px-4">
                    <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Type</span>
                    <span className="font-bold text-sm">{verificationResult.data?.ticketType}</span>
                  </div>
                  <div className="h-[1px] bg-white/5 my-3 mx-4" />
                  <div className="flex justify-between items-center px-4">
                    <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Qty</span>
                    <span className="font-bold text-sm">x{verificationResult.data?.quantity}</span>
                  </div>
                </div>

                <button 
                  onClick={resetScanner}
                  className="mt-10 w-full py-5 bg-white text-[#29695b] rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl active:scale-95 transition-transform"
                >
                  Scan Next Ticket
                </button>
              </motion.div>
            )}

            {verificationResult && !verificationResult.success && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-[#3d1313] flex flex-col items-center justify-center z-20 text-center p-8"
              >
                <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mb-6">
                  <AlertTriangle className="w-12 h-12 text-red-500" />
                </div>
                <h3 className="text-white text-3xl font-black font-headline uppercase tracking-tighter">Invalid Ticket</h3>
                <p className="text-red-300 font-bold text-sm mt-3 px-4 leading-relaxed">{verificationResult.error || "The provided identification could not be verified."}</p>
                
                <button 
                  onClick={resetScanner}
                  className="mt-10 w-full py-5 bg-red-500 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl active:scale-95 transition-transform"
                >
                  Retry Scan
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Manual Lookup Control */}
        <div className="w-full space-y-6">
          <div className="relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#afefdd] transition-colors w-5 h-5" />
            <input 
              value={manualId}
              onChange={(e) => setManualId(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleVerify(manualId)}
              className="w-full bg-slate-900/50 border border-white/5 text-white rounded-3xl py-6 pl-14 pr-32 focus:ring-2 focus:ring-[#afefdd]/30 placeholder-slate-600 outline-none transition-all font-body text-sm" 
              placeholder="Attendee ID or Booking ID..." 
              type="text"
            />
            {manualId && (
              <button 
                onClick={() => handleVerify(manualId)}
                disabled={isVerifying}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#afefdd] text-[#121414] px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg active:scale-95"
              >
                {isVerifying ? "..." : "Verify"}
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
             <button className="bg-slate-900 hover:bg-slate-800 text-[#909190] hover:text-[#afefdd] py-5 px-6 rounded-3xl flex items-center justify-center gap-3 transition-all border border-white/5 active:scale-95">
                <LayoutGrid className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Roster</span>
             </button>
             <button className="bg-slate-900 hover:bg-slate-800 text-[#909190] hover:text-[#afefdd] py-5 px-6 rounded-3xl flex items-center justify-center gap-3 transition-all border border-white/5 active:scale-95">
                <History className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Log</span>
             </button>
          </div>
        </div>
      </main>

      {/* Persistent Bottom Bar Indicators */}
      <div className="fixed bottom-6 h-1 w-24 bg-white/5 rounded-full" />
    </div>
  );
}
