'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Bell, 
  Settings, 
  Search, 
  ListFilter, 
  History, 
  CheckCircle2, 
  AlertTriangle,
  QrCode,
  ScanLine,
  RefreshCw,
  UserCheck,
  UserMinus
} from 'lucide-react';
import { verifyTicket, getRecentScans, getInGateRoster, manuallyCheckInAttendee } from '@/lib/actions/staff-actions';
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

  // Tab State
  const [activeTab, setActiveTab] = useState<'scanner' | 'roster' | 'log'>('scanner');
  const [roster, setRoster] = useState<any[]>([]);
  const [scanLogs, setScanLogs] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoadingData, setIsLoadingData] = useState(false);

  const fetchData = async () => {
    setIsLoadingData(true);
    try {
      const [scansRes, rosterRes] = await Promise.all([
        getRecentScans(eventId),
        getInGateRoster(eventId)
      ]);
      if (scansRes.success) setScanLogs(scansRes.data);
      if (rosterRes.success) setRoster(rosterRes.data);
    } catch (err) {
      console.error("Error loading gate lists for event:", err);
      toast.error("Failed to load list details");
    } finally {
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [eventId]);

  const handleVerify = async (id: string) => {
    if (!id) return;
    setIsVerifying(true);
    setVerificationResult(null);

    try {
      // Enforce checking in specifically to this event
      const res = await verifyTicket(id, eventId);
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

  const filteredRoster = roster.filter(guest => {
    const term = searchQuery.toLowerCase();
    const name = guest.attendeeInfo?.name?.toLowerCase() || '';
    const email = guest.attendeeInfo?.email?.toLowerCase() || '';
    const id = guest._id.toString().toLowerCase();
    return name.includes(term) || email.includes(term) || id.includes(term);
  });

  const checkedInCount = roster.filter(g => !!g.checkedInAt).length;

  return (
    <div className="bg-[#121414] text-white font-body min-h-screen flex flex-col items-center max-w-lg mx-auto w-full relative overflow-hidden">
      {/* TopAppBar */}
      <header className="bg-[#121414]/90 backdrop-blur-md fixed top-0 z-50 flex justify-between items-center w-full px-6 h-20 max-w-lg mx-auto border-b border-white/5">
        <div className="flex items-center gap-4">
          <button onClick={() => window.history.back()} className="text-[#afefdd] p-2 hover:bg-white/5 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex flex-col">
            <h1 className="text-lg font-black tracking-tighter text-[#afefdd] font-headline uppercase leading-none">Event Logix</h1>
            <p className="text-[10px] uppercase tracking-widest text-[#909190] font-label font-bold mt-1">Gate Control</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={fetchData} disabled={isLoadingData} className="text-[#909190] hover:text-[#afefdd] transition-colors p-2 disabled:opacity-50">
            <RefreshCw className={`w-5 h-5 ${isLoadingData ? 'animate-spin' : ''}`} />
          </button>
          <div className="w-9 h-9 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center font-bold text-[#afefdd] text-xs">
            JD
          </div>
        </div>
      </header>

      <main className="flex-grow pt-24 pb-24 px-6 flex flex-col items-center w-full overflow-y-auto">
        {/* Event Context */}
        <div className="w-full mb-6 text-center space-y-2">
          <h2 className="text-lg font-black tracking-tight font-headline text-[#afefdd] leading-tight uppercase">
            {eventTitle}
          </h2>
          <div className="flex justify-center gap-3">
            <span className="bg-[#29695b]/20 text-[#afefdd] px-2.5 py-1 rounded text-[9px] font-bold font-label uppercase tracking-widest border border-[#29695b]/30">
              Station 01
            </span>
            <span className="bg-[#ddf2ce]/10 text-[#ddf2ce] px-2.5 py-1 rounded text-[9px] font-bold font-label uppercase tracking-widest border border-[#ddf2ce]/20">
              Live Entry
            </span>
          </div>
        </div>

        {/* Tab-based Rendering */}
        <div className="w-full flex-grow flex flex-col">
          {activeTab === 'scanner' && (
            <motion.div 
              key="event-scanner-tab"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="flex flex-col items-center w-full"
            >
              {/* Camera Scanner Placeholder */}
              <div className="relative w-full aspect-square bg-slate-900/50 rounded-[2.5rem] overflow-hidden shadow-2xl flex items-center justify-center border-2 border-white/5 mb-8">
                <div className="absolute inset-0 opacity-40">
                  <img 
                    src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=800" 
                    className="w-full h-full object-cover grayscale opacity-20" 
                    alt="Scanning View" 
                  />
                </div>

                <div className="relative z-10 w-64 h-64 flex flex-col items-center justify-center">
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

                <div className="absolute bottom-6 left-0 w-full text-center px-6">
                  <p className="text-[#afefdd] text-[9px] font-bold font-headline bg-slate-900/80 backdrop-blur-xl py-3 px-6 rounded-full inline-flex items-center gap-2 border border-[#afefdd]/10 uppercase tracking-widest">
                    <ScanLine className="w-3.5 h-3.5 animate-pulse" /> Position QR Code in frame
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
                      <CheckCircle2 className="w-20 h-20 text-white mb-6" />
                      <h3 className="text-white text-2xl font-black font-headline uppercase tracking-tighter">Verified</h3>
                      <p className="text-[#defff4] font-bold text-base mt-2 font-headline">{verificationResult.data?.attendeeName}</p>
                      <p className="text-[#defff4]/70 text-[9px] uppercase font-bold tracking-[0.2em] mt-4 font-label">
                        {verificationResult.data?.ticketType} • QUANTITY: {verificationResult.data?.quantity}
                      </p>
                      <button 
                        onClick={resetScanner}
                        className="mt-8 px-8 py-3.5 bg-white text-[#29695b] rounded-2xl font-black uppercase tracking-widest text-[9px] shadow-xl active:scale-95 transition-transform"
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
                      <AlertTriangle className="w-20 h-20 text-white mb-6" />
                      <h3 className="text-white text-2xl font-black font-headline uppercase tracking-tighter">Access Denied</h3>
                      <p className="text-red-100 font-bold text-sm mt-2 font-headline">{verificationResult.error}</p>
                      <button 
                        onClick={resetScanner}
                        className="mt-8 px-8 py-3.5 bg-white/20 text-white border border-white/20 rounded-2xl font-black uppercase tracking-widest text-[9px] active:scale-95 transition-transform"
                      >
                        Retry Scan
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Manual Entry Section */}
              <div className="w-full space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-[1px] flex-grow bg-white/10"></div>
                  <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#909190] font-label">Manual Entry</span>
                  <div className="h-[1px] flex-grow bg-white/10"></div>
                </div>
                
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#afefdd] transition-colors w-5 h-5" />
                  <input 
                    value={manualId}
                    onChange={(e) => setManualId(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleVerify(manualId)}
                    className="w-full bg-slate-900 border-none text-white rounded-2xl py-4.5 pl-12 pr-4 focus:ring-2 focus:ring-[#29695b] placeholder-slate-600 transition-all font-body text-xs outline-none" 
                    placeholder="Search attendee name or ID..." 
                    type="text"
                  />
                  {manualId && (
                    <button 
                      onClick={() => handleVerify(manualId)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#29695b] text-[#afefdd] px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest"
                    >
                      Verify
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => setActiveTab('roster')} className="bg-slate-900 hover:bg-slate-800 text-[#afefdd] py-4 px-6 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 border border-white/5">
                    <ListFilter className="w-4 h-4" />
                    <span className="text-[10px] font-bold font-label uppercase tracking-widest">Guest List</span>
                  </button>
                  <button onClick={() => setActiveTab('log')} className="bg-slate-900 hover:bg-slate-800 text-[#afefdd] py-4 px-6 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 border border-white/5">
                    <History className="w-4 h-4" />
                    <span className="text-[10px] font-bold font-label uppercase tracking-widest">Recent</span>
                  </button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="w-full mt-6 bg-slate-900/40 border border-white/5 rounded-3xl p-6 flex justify-between items-center">
                <div className="text-center flex-1 border-r border-white/5">
                  <p className="text-[#909190] text-[9px] uppercase font-bold tracking-[0.2em] mb-1">Checked In</p>
                  <p className="text-xl font-black font-headline text-[#afefdd]">
                    {checkedInCount} <span className="text-slate-600 text-xs font-medium">/ {roster.length}</span>
                  </p>
                </div>
                <div className="text-center flex-1">
                  <p className="text-[#909190] text-[9px] uppercase font-bold tracking-[0.2em] mb-1">In Queue</p>
                  <p className="text-xl font-black font-headline text-[#afefdd]">Low</p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'roster' && (
            <motion.div 
              key="event-roster-tab"
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
                  placeholder="Filter guest list..." 
                  type="text"
                />
              </div>

              {/* Roster List */}
              <div className="space-y-3 overflow-y-auto max-h-[420px] pr-1 custom-scrollbar">
                {isLoadingData ? (
                  <div className="py-12 text-center text-slate-500 text-xs flex justify-center items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin text-[#afefdd]" /> Loading guest database...
                  </div>
                ) : filteredRoster.length === 0 ? (
                  <div className="py-12 text-center text-slate-500 text-xs italic">
                    No guests found matching search
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
              key="event-log-tab"
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
