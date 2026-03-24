'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  XCircle, 
  Mail, 
  MoreVertical, 
  ExternalLink,
  Filter,
  Search,
  Check
} from 'lucide-react';
import { updateStaffStatus } from '@/lib/actions/staff-actions';
import { toast } from 'sonner';

interface StaffApplication {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  staffProfile: {
    bio: string;
    skills: string[];
    yearsOfExperience: string;
    profileImage?: string;
    verificationDocs?: string[];
  };
}

interface StaffVerificationClientProps {
  initialApplications: StaffApplication[];
}

export default function StaffVerificationClient({ initialApplications }: StaffVerificationClientProps) {
  const [applications, setApplications] = useState(initialApplications);
  const [selectedId, setSelectedId] = useState<string | null>(initialApplications[0]?._id || null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const selectedApp = applications.find(a => a._id === selectedId);

  const handleAction = async (status: 'approved' | 'rejected') => {
    if (!selectedId) return;
    if (status === 'rejected' && !rejectionReason) {
      toast.error("Please provide a reason for rejection");
      return;
    }

    setIsProcessing(true);
    try {
      const res = await updateStaffStatus(selectedId, status, rejectionReason);
      if (res.success) {
        toast.success(res.message);
        setApplications(prev => prev.filter(a => a._id !== selectedId));
        setSelectedId(applications.find(a => a._id !== selectedId)?._id || null);
        setRejectionReason('');
      } else {
        toast.error(res.error || "Action failed");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)] overflow-hidden">
      {/* Left: Pending Approvals Side Pane */}
      <section className="w-full lg:w-96 bg-slate-50 dark:bg-slate-900 overflow-y-auto border-r border-slate-200 dark:border-slate-800">
        <div className="p-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-slate-900 dark:text-white font-headline font-bold text-lg">Pending Approvals</h2>
              <p className="text-slate-500 text-sm font-medium">{applications.length} candidates remaining</p>
            </div>
            <Filter className="w-5 h-5 text-[#29695b] cursor-pointer" />
          </div>

          <div className="space-y-4">
            {applications.map((app) => (
              <div 
                key={app._id}
                onClick={() => setSelectedId(app._id)}
                className={`p-5 rounded-xl cursor-pointer transition-all duration-300 border ${
                  selectedId === app._id 
                    ? "bg-white dark:bg-slate-800 border-l-4 border-l-[#29695b] shadow-md border-slate-200 dark:border-slate-700Scale-105" 
                    : "bg-transparent border-transparent hover:bg-slate-200/50 dark:hover:bg-slate-800/50"
                }`}
              >
                <div className="flex items-center gap-4 mb-3">
                  <img 
                    src={app.staffProfile.profileImage || `https://api.dicebear.com/7.x/avataaars/svg?seed=${app.email}`}
                    alt={app.name} 
                    className="w-12 h-12 rounded-lg object-cover bg-slate-200"
                  />
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm">{app.name}</h3>
                    <p className="text-xs text-slate-500">Applied {getTimeAgo(app.createdAt)}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="bg-[#ddf2ce] dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-400 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider font-headline">
                    {app.staffProfile.skills[0] || 'Member'}
                  </span>
                  <span className="bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider font-headline">
                    Level 1
                  </span>
                </div>
              </div>
            ))}

            {applications.length === 0 && (
              <div className="py-20 text-center text-slate-400">
                <CheckCircle2 className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>No pending applications</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Right: Detailed View */}
      <section className="flex-1 bg-white dark:bg-slate-950 overflow-y-auto">
        <AnimatePresence mode="wait">
          {selectedApp ? (
            <motion.div 
              key={selectedApp._id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-5xl mx-auto p-12 space-y-12"
            >
              {/* Profile Header */}
              <div className="flex flex-col md:flex-row items-start gap-10">
                <div className="relative">
                  <img 
                    src={selectedApp.staffProfile.profileImage || `https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedApp.email}`}
                    alt={selectedApp.name} 
                    className="w-32 h-32 rounded-2xl shadow-xl ring-4 ring-slate-50 dark:ring-slate-900 object-cover"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-[#29695b] p-2 rounded-lg shadow-lg text-white">
                    <Check className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <div>
                      <h1 className="text-4xl font-extrabold font-headline text-slate-900 dark:text-white tracking-tight">
                        {selectedApp.name}
                      </h1>
                      <p className="text-[#29695b] dark:text-[#afefdd] font-bold text-sm tracking-wide mt-1">
                        {selectedApp.staffProfile.skills[0]} • Remote Applicant
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <button className="bg-slate-100 dark:bg-slate-800 text-slate-500 p-2.5 rounded-xl hover:bg-slate-200 transition-colors">
                        <Mail className="w-5 h-5" />
                      </button>
                      <button className="bg-slate-100 dark:bg-slate-800 text-slate-500 p-2.5 rounded-xl hover:bg-slate-200 transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl leading-relaxed">
                    {selectedApp.staffProfile.bio || "No biography provided by the candidate."}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-6">
                    {selectedApp.staffProfile.skills.map(skill => (
                      <span key={skill} className="bg-[#ddf2ce] dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-400 px-3 py-1.5 rounded-lg text-xs font-bold font-headline">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Identity Documents */}
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b pb-4 dark:border-slate-800">
                  <h3 className="text-lg font-bold font-headline text-slate-900 dark:text-white">Identity Document Preview</h3>
                  <button className="text-[#29695b] dark:text-[#afefdd] font-bold text-sm flex items-center gap-2 hover:underline">
                    <ExternalLink className="w-4 h-4" /> Open Original
                  </button>
                </div>
                <div className="bg-slate-100 dark:bg-slate-900 rounded-3xl p-6 aspect-video flex items-center justify-center relative group overflow-hidden border border-slate-200 dark:border-slate-800">
                  {selectedApp.staffProfile.verificationDocs?.[0] ? (
                    <img 
                      src={selectedApp.staffProfile.verificationDocs[0]} 
                      className="w-full h-full object-cover rounded-xl transition-transform duration-700 group-hover:scale-105" 
                      alt="ID Preview"
                    />
                  ) : (
                    <div className="text-center space-y-4">
                      <div className="w-20 h-20 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto">
                        <ExternalLink className="w-10 h-10 text-slate-400" />
                      </div>
                      <p className="text-slate-500 font-medium font-headline">Passport Scan Placeholder</p>
                    </div>
                  )}
                  <div className="absolute top-6 left-6 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md px-4 py-2 rounded-full shadow-sm">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#29695b] dark:text-[#afefdd]">Verification ID #4429</p>
                  </div>
                </div>
              </div>

              {/* Verification Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10 border-t border-slate-100 dark:border-slate-800">
                <div className="space-y-4">
                  <label className="block text-sm font-bold text-slate-500 dark:text-slate-400 font-headline uppercase tracking-wider">
                    Rejection Reason (Internal)
                  </label>
                  <textarea 
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-sm focus:ring-2 focus:ring-[#29695b] h-36 dark:text-white transition-all"
                    placeholder="Specify missing documents or verification discrepancies..."
                  />
                </div>
                <div className="flex flex-col justify-end gap-4">
                  <div className="flex flex-col gap-3">
                    <button 
                      onClick={() => handleAction('approved')}
                      disabled={isProcessing}
                      className="w-full bg-gradient-to-r from-[#29695b] to-[#1a5c4f] text-white py-4.5 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg hover:shadow-[#29695b]/20 transition-all font-headline text-base active:scale-98 disabled:opacity-50"
                    >
                      <CheckCircle2 className="w-6 h-6" /> Approve Staff Member
                    </button>
                    <button 
                      onClick={() => handleAction('rejected')}
                      disabled={isProcessing}
                      className="w-full border-2 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 py-4.5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all font-headline text-base active:scale-98 disabled:opacity-50"
                    >
                      <XCircle className="w-6 h-6" /> Reject Application
                    </button>
                  </div>
                  <p className="text-[11px] text-center text-slate-400 px-8 leading-tight font-body italic">
                    By approving, you confirm that all KYC/AML documents have been reviewed and comply with the Executive Ledger standard.
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-400">
              <div className="text-center space-y-4">
                <div className="w-24 h-24 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center mx-auto">
                  <Search className="w-10 h-10 opacity-20" />
                </div>
                <p className="font-medium font-headline">Select a candidate to begin verification</p>
              </div>
            </div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}

function getTimeAgo(date: string) {
  const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + "y ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + "mo ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + "d ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + "h ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + "m ago";
  return Math.floor(seconds) + "s ago";
}
