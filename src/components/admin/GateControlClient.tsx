'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Search, 
  QrCode, 
  ScanLine, 
  CheckCircle2, 
  AlertTriangle,
  ChevronDown,
  LayoutGrid,
  History,
  Settings,
  RefreshCw,
  XCircle,
  Scan,
  UserCheck,
  UserMinus
} from 'lucide-react';
import { verifyTicket, getRecentScans, getInGateRoster, manuallyCheckInAttendee } from '@/lib/actions/staff-actions';
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

  // Tab State
  const [activeTab, setActiveTab] = useState<'scanner' | 'roster' | 'log'>('scanner');
  const [roster, setRoster] = useState<any[]>([]);
  const [scanLogs, setScanLogs] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoadingData, setIsLoadingData] = useState(false);

  const fetchData = async () => {
    setIsLoadingData(true);
    try {
      const scansRes = await getRecentScans(selectedEvent?._id);
      if (scansRes.success) {
        setScanLogs(scansRes.data);
      }
      
      if (selectedEvent) {
        const rosterRes = await getInGateRoster(selectedEvent._id);
        if (rosterRes.success) {
          setRoster(rosterRes.data);
        }
      } else {
        setRoster([]);
      }
    } catch (err) {
      console.error("Error loading gate control lists:", err);
      toast.error("Failed to load logs/roster");
    } finally {
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    fetchData();
    // Default to scanner if event changes
    setActiveTab('scanner');
  }, [selectedEvent]);

  const handleVerify = async (id: string) => {
    if (!id) return;
    setIsVerifying(true);
    setVerificationResult(null);

    try {
      // Pass both ID and selectedEvent?._id to enforce event validation on backend
      const res = await verifyTicket(id, selectedEvent?._id);
      
      setVerificationResult(res);
      if (res.success) {
        toast.success("Ticket Verified!");
      } else {
        toast.error(res.error || "Invalid Ticket");
      }
      await fetchData();
    } catch (error) {
      toast.error("Verification error");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleManualCheckIn = async (bookingId: string) => {
    try {
      const res = await manuallyCheckInAttendee(bookingId);
      if (res.success) {
        toast.success(res.message);
        await fetchData();
      } else {
        toast.error(res.error || "Failed to check in");
      }
    } catch (err) {
      toast.error("Check-in error");
    }
  };

  const resetScanner = () => {
    setVerificationResult(null);
    setManualId('');
  };

  // Filter roster based on search
  const filteredRoster = roster.filter(guest => {
    const term = searchQuery.toLowerCase();
    const name = guest.attendeeInfo?.name?.toLowerCase() || '';
    const email = guest.attendeeInfo?.email?.toLowerCase() || '';
    const id = guest._id.toString().toLowerCase();
    return name.includes(term) || email.includes(term) || id.includes(term);
  });

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
          <button onClick={fetchData} disabled={isLoadingData} className="text-[#909190] hover:text-[#afefdd] p-2 transition-colors disabled:opacity-50">
            <RefreshCw className={`w-5 h-5 ${isLoadingData ? 'animate-spin' : ''}`} />
          </button>
          <div className="w-9 h-9 rounded-full bg-[#afefdd]/10 border border-[#afefdd]/20 flex items-center justify-center font-bold text-[#afefdd] text-xs">
            AD
          </div>
        </div>
      </header>

      <main className="flex-grow pt-24 pb-24 px-6 flex flex-col items-center w-full overflow-y-auto">
        {/* Event Context & Switcher */}
        <div className="w-full mb-6">
          <button 
            onClick={() => setShowEventPicker(!showEventPicker)}
            className="w-full bg-slate-900/50 border border-white/5 p-5 rounded-3xl flex items-center justify-between group hover:border-[#afefdd]/20 transition-all active:scale-[0.98]"
          >
            <div className="flex flex-col items-start text-left">
              <span className="text-[10px] uppercase tracking-widest text-[#909190] font-bold mb-1">Checking into</span>
              <p className="text-sm font-black font-headline text-[#afefdd] truncate max-w-[280px]">
                {selectedEvent ? selectedEvent.title.toUpperCase() : "UNIVERSAL SCANNER"}
              </p>
            </div>
            <div className="bg-[#afefdd]/10 p-2 rounded-xl text-[#afefdd] group-hover:bg-[#afefdd]/20 transition-colors">
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showEventPicker ? 'rotate-180' : ''}`} />
            </div>
          </button>

          {/* Event Picker Dropdown */}
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
                      <p className="font-bold text-sm truncate max-w-[280px]">{event.title}</p>
                      <p className="text-[10px] text-slate-500">{new Date(event.date).toLocaleDateString()}</p>
                    </div>
                    {selectedEvent?._id === event._id && <div className="w-2 h-2 rounded-full bg-[#afefdd]" />}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Tab-based Rendering */}
        <div className="w-full flex-grow flex flex-col">
          {activeTab === 'scanner' && (
            <motion.div 
              key="scanner-tab"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="flex flex-col items-center w-full"
            >
              {/* Camera Scanner Container */}
              <div className="relative w-full aspect-square bg-[#0a0c0c] rounded-[3rem] overflow-hidden shadow-2xl flex items-center justify-center border border-white/5 mb-8">
                <div className="absolute inset-0 opacity-20">
                  <img 
                    src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=800" 
                    className="w-full h-full object-cover grayscale" 
                    alt="Scanning View" 
                  />
                </div>

                <div className="relative z-10 w-64 h-64 flex flex-col items-center justify-center">
                  <div className="absolute top-0 left-0 w-16 h-16 border-t-[3px] border-l-[3px] border-[#afefdd] rounded-tl-3xl opacity-60"></div>
                  <div className="absolute top-0 right-0 w-16 h-16 border-t-[3px] border-r-[3px] border-[#afefdd] rounded-tr-3xl opacity-60"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 border-b-[3px] border-l-[3px] border-[#afefdd] rounded-bl-3xl opacity-60"></div>
                  <div className="absolute bottom-0 right-0 w-16 h-16 border-b-[3px] border-r-[3px] border-[#afefdd] rounded-br-3xl opacity-60"></div>
                  
                  <QrCode className="w-24 h-24 text-[#afefdd] opacity-10" />
                  
                  <motion.div 
                    animate={{ y: [-110, 110] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                    className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#afefdd]/80 to-transparent shadow-[0_0_20px_#afefdd]"
                  />
                </div>

                <AnimatePresence>
                  {verificationResult?.success && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-[#29695b] flex flex-col items-center justify-center z-20 text-center p-8"
                    >
                      <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-6">
                        <CheckCircle2 className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-white text-2xl font-black font-headline uppercase tracking-tighter">Verified</h3>
                      <div className="mt-4 space-y-1">
                        <p className="text-[#defff4] font-bold text-lg font-headline tracking-tight">{verificationResult.data?.attendeeName}</p>
                        <p className="text-[#defff4]/60 text-[10px] uppercase font-black tracking-widest">{verificationResult.data?.eventName}</p>
                      </div>
                      
                      <div className="mt-6 bg-black/10 rounded-2xl p-4 w-full border border-white/5">
                        <div className="flex justify-between items-center px-4">
                          <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Type</span>
                          <span className="font-bold text-xs">{verificationResult.data?.ticketType}</span>
                        </div>
                        <div className="h-[1px] bg-white/5 my-2.5 mx-4" />
                        <div className="flex justify-between items-center px-4">
                          <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Qty</span>
                          <span className="font-bold text-xs">x{verificationResult.data?.quantity}</span>
                        </div>
                      </div>

                      <button 
                        onClick={resetScanner}
                        className="mt-8 w-full py-4 bg-white text-[#29695b] rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl active:scale-95 transition-transform"
                      >
                        Scan Next
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
                      <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mb-6">
                        <AlertTriangle className="w-10 h-10 text-red-500" />
                      </div>
                      <h3 className="text-white text-2xl font-black font-headline uppercase tracking-tighter">Access Denied</h3>
                      <p className="text-red-300 font-bold text-xs mt-3 px-4 leading-relaxed">{verificationResult.error}</p>
                      
                      <button 
                        onClick={resetScanner}
                        className="mt-8 w-full py-4 bg-red-500 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl active:scale-95 transition-transform"
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
                    className="w-full bg-slate-900/50 border border-white/5 text-white rounded-3xl py-5 pl-14 pr-32 focus:ring-2 focus:ring-[#afefdd]/30 placeholder-slate-600 outline-none transition-all font-body text-sm" 
                    placeholder="Attendee ID or Booking ID..." 
                    type="text"
                  />
                  {manualId && (
                    <button 
                      onClick={() => handleVerify(manualId)}
                      disabled={isVerifying}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#afefdd] text-[#121414] px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg active:scale-95"
                    >
                      {isVerifying ? "..." : "Verify"}
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => {
                      if (!selectedEvent) {
                        toast.info("Select an event to inspect the Roster");
                        return;
                      }
                      setActiveTab('roster');
                    }}
                    className={`py-5 px-6 rounded-3xl flex items-center justify-center gap-3 transition-all border border-white/5 active:scale-95 ${
                      selectedEvent ? 'bg-slate-900 hover:bg-slate-800 text-[#afefdd]' : 'bg-slate-900/30 text-slate-600 cursor-not-allowed'
                    }`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Roster</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab('log')}
                    className="bg-slate-900 hover:bg-slate-800 text-[#afefdd] py-5 px-6 rounded-3xl flex items-center justify-center gap-3 transition-all border border-white/5 active:scale-95"
                  >
                    <History className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Log</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'roster' && (
            <motion.div 
              key="roster-tab"
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }}
              className="w-full space-y-6 flex flex-col flex-grow"
            >
              {/* Back Link */}
              <div className="flex items-center justify-between">
                <button onClick={() => setActiveTab('scanner')} className="text-slate-400 hover:text-white flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                  <ArrowLeft className="w-4 h-4" /> Scanner
                </button>
                <span className="text-[10px] font-bold uppercase tracking-widest bg-[#afefdd]/10 text-[#afefdd] px-3 py-1 rounded-full">
                  Guests: {filteredRoster.length}
                </span>
              </div>

              {/* Roster Search */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                <input 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-900 border border-white/5 text-white rounded-2xl py-4 pl-12 pr-4 focus:ring-1 focus:ring-[#afefdd] placeholder-slate-600 outline-none text-xs" 
                  placeholder="Filter by name, email, or booking ID..." 
                  type="text"
                />
              </div>

              {/* Roster List */}
              <div className="space-y-3 overflow-y-auto max-h-[420px] pr-1 custom-scrollbar">
                {isLoadingData ? (
                  <div className="py-12 text-center text-slate-500 text-xs flex justify-center items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin text-[#afefdd]" /> Loading roster database...
                  </div>
                ) : filteredRoster.length === 0 ? (
                  <div className="py-12 text-center text-slate-500 text-xs italic">
                    {searchQuery ? "No matching guests found" : "No ticket holders for this event"}
                  </div>
                ) : (
                  filteredRoster.map((guest: any) => {
                    const checkedIn = !!guest.checkedInAt;
                    return (
                      <div key={guest._id} className="p-4 bg-slate-900/60 rounded-2xl border border-white/5 flex items-center justify-between">
                        <div>
                          <p className="font-bold text-xs text-white">{guest.attendeeInfo?.name || "Anonymous Guest"}</p>
                          <p className="text-[9px] text-slate-500 font-mono mt-0.5 truncate max-w-[200px]">{guest.attendeeInfo?.email || guest._id}</p>
                          <div className="flex gap-2 items-center mt-2">
                            <span className="px-2 py-0.5 bg-[#afefdd]/5 text-[#afefdd] border border-[#afefdd]/10 text-[8px] font-bold rounded">
                              {guest.ticketType}
                            </span>
                            {checkedIn && (
                              <span className="text-[8px] text-emerald-400 font-bold flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                                {new Date(guest.checkedInAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <button 
                          onClick={() => handleManualCheckIn(guest._id)}
                          className={`px-3 py-2 rounded-xl text-[9px] font-black uppercase tracking-wider flex items-center gap-1.5 active:scale-95 transition-transform ${
                            checkedIn 
                              ? 'bg-red-950/40 text-red-400 border border-red-500/20 hover:bg-red-900/40' 
                              : 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-900/40'
                          }`}
                        >
                          {checkedIn ? (
                            <>
                              <UserMinus className="w-3.5 h-3.5" /> Check Out
                            </>
                          ) : (
                            <>
                              <UserCheck className="w-3.5 h-3.5" /> Check In
                            </>
                          )}
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'log' && (
            <motion.div 
              key="log-tab"
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }}
              className="w-full space-y-6 flex flex-col flex-grow"
            >
              {/* Back Link */}
              <div className="flex items-center justify-between">
                <button onClick={() => setActiveTab('scanner')} className="text-slate-400 hover:text-white flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                  <ArrowLeft className="w-4 h-4" /> Scanner
                </button>
                <span className="text-[10px] font-bold uppercase tracking-widest bg-[#afefdd]/10 text-[#afefdd] px-3 py-1 rounded-full">
                  Recent Scans: {scanLogs.length}
                </span>
              </div>

              {/* Log List */}
              <div className="space-y-3 overflow-y-auto max-h-[480px] pr-1 custom-scrollbar">
                {isLoadingData ? (
                  <div className="py-12 text-center text-slate-500 text-xs flex justify-center items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin text-[#afefdd]" /> Reading entry ledger...
                  </div>
                ) : scanLogs.length === 0 ? (
                  <div className="py-12 text-center text-slate-500 text-xs italic">
                    No scan entries recorded yet
                  </div>
                ) : (
                  scanLogs.map((log: any) => {
                    const isSuccess = log.status === 'success';
                    return (
                      <div key={log._id} className="p-4 bg-slate-900/60 rounded-2xl border border-white/5 flex gap-4">
                        <div className="mt-0.5">
                          {isSuccess ? (
                            <div className="w-8 h-8 rounded-full bg-emerald-950/40 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                              <CheckCircle2 className="w-4.5 h-4.5" />
                            </div>
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-red-950/40 border border-red-500/20 flex items-center justify-center text-red-400">
                              <AlertTriangle className="w-4.5 h-4.5" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start gap-2">
                            <h4 className={`text-xs font-bold truncate ${isSuccess ? 'text-emerald-400' : 'text-red-400'}`}>
                              {isSuccess ? 'Access Granted' : 'Access Denied'}
                            </h4>
                            <span className="text-[9px] text-slate-500 shrink-0 font-medium">
                              {new Date(log.scannedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-400 font-medium mt-1">
                            {isSuccess 
                              ? `Guest: ${log.booking?.attendeeInfo?.name || 'Anonymous'}` 
                              : `Reason: ${log.errorReason || 'Validation failed'}`
                            }
                          </p>
                          <div className="flex gap-3 items-center mt-2.5">
                            <span className="text-[8px] text-slate-500 font-mono tracking-tighter truncate max-w-[120px]">
                              Code: {log.ticketCode}
                            </span>
                            {log.scannedBy && (
                              <span className="text-[8px] text-slate-500">
                                Scanner: {log.scannedBy.name}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </motion.div>
          )}
        </div>
      </main>

      {/* Persistent Bottom Bar Indicators */}
      <div className="fixed bottom-6 h-1 w-24 bg-white/5 rounded-full" />
    </div>
  );
}
