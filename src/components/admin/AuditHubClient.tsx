'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  ShieldAlert, 
  User, 
  Activity, 
  Calendar, 
  ChevronDown, 
  ChevronUp, 
  RefreshCw, 
  Database,
  Terminal,
  Filter
} from 'lucide-react';
import { getAuditLogs } from '@/lib/actions/audit-actions';
import { toast } from 'sonner';

export default function AuditHubClient() {
  const [logs, setLogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedLog, setExpandedLog] = useState<string | null>(null);

  // Filters
  const [actionFilter, setActionFilter] = useState('');
  const [emailFilter, setEmailFilter] = useState('');
  const [targetFilter, setTargetFilter] = useState('');

  const fetchLogs = async () => {
    setIsLoading(true);
    try {
      const res = await getAuditLogs({
        action: actionFilter || undefined,
        actorEmail: emailFilter || undefined,
        targetType: targetFilter || undefined
      });
      if (res.success) {
        setLogs(res.data || []);
      } else {
        toast.error(res.error || "Failed to load audit logs");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error loading logs");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [actionFilter, targetFilter]); // Refetch on dropdown change, search uses manual reload or debounced

  const toggleExpand = (id: string) => {
    if (expandedLog === id) {
      setExpandedLog(null);
    } else {
      setExpandedLog(id);
    }
  };

  const getActionBadgeStyle = (action: string) => {
    if (action.includes('fail') || action.includes('reject') || action.includes('delete')) {
      return 'bg-error-container/20 text-error border border-error/20';
    }
    if (action.includes('approve') || action.includes('success') || action.includes('publish')) {
      return 'bg-primary-container/20 text-primary border border-primary/20';
    }
    return 'bg-secondary-container/20 text-secondary border border-secondary/20';
  };

  const formatAction = (action: string) => {
    return action
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="space-y-8 font-body">
      {/* Filters Bar */}
      <div className="bg-white p-6 rounded-[2rem] border border-outline-variant/10 shadow-sm space-y-4">
        <div className="flex items-center gap-3 text-on-surface-variant font-bold text-xs uppercase tracking-widest mb-2">
          <Filter className="w-4 h-4 text-primary" />
          <span>Search & Filters</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Email Filter input */}
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              value={emailFilter}
              onChange={(e) => setEmailFilter(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchLogs()}
              placeholder="Actor Email (Press Enter)..." 
              className="w-full bg-surface border border-outline-variant/10 rounded-2xl py-3.5 pl-11 pr-4 text-xs text-on-surface outline-none focus:ring-1 focus:ring-primary"
              type="text"
            />
          </div>

          {/* Action Filter */}
          <div className="relative">
            <select 
              value={actionFilter} 
              onChange={(e) => setActionFilter(e.target.value)}
              className="w-full bg-surface border border-outline-variant/10 rounded-2xl py-3.5 px-4 text-xs text-on-surface-variant outline-none focus:ring-1 focus:ring-primary appearance-none cursor-pointer"
            >
              <option value="">All Actions</option>
              <option value="admin_login_success">Admin Login Success</option>
              <option value="admin_login_failed">Admin Login Failed</option>
              <option value="update_event_status">Update Event Status</option>
              <option value="bulk_update_event_status">Bulk Update Event Status</option>
              <option value="bulk_delete_events">Bulk Delete Events</option>
              <option value="approve_staff">Approve Staff</option>
              <option value="reject_staff">Reject Staff</option>
              <option value="bulk_approve_staff">Bulk Approve Staff</option>
              <option value="bulk_reject_staff">Bulk Reject Staff</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
          </div>

          {/* Target Type Filter */}
          <div className="relative">
            <select 
              value={targetFilter} 
              onChange={(e) => setTargetFilter(e.target.value)}
              className="w-full bg-surface border border-outline-variant/10 rounded-2xl py-3.5 px-4 text-xs text-on-surface-variant outline-none focus:ring-1 focus:ring-primary appearance-none cursor-pointer"
            >
              <option value="">All Target Types</option>
              <option value="Event">Event</option>
              <option value="User">User</option>
              <option value="Booking">Booking</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button 
            onClick={() => { setActionFilter(''); setEmailFilter(''); setTargetFilter(''); setLogs([]); fetchLogs(); }} 
            className="px-5 py-2.5 rounded-xl border border-outline-variant/10 text-on-surface-variant text-xs font-bold hover:bg-surface transition-colors"
          >
            Clear Filters
          </button>
          <button 
            onClick={fetchLogs} 
            disabled={isLoading}
            className="px-5 py-2.5 rounded-xl bg-primary text-on-primary text-xs font-black uppercase tracking-wider shadow-md hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Audit Logs Table / Timeline */}
      <div className="bg-white rounded-[2rem] border border-outline-variant/10 overflow-hidden shadow-sm">
        <div className="px-8 py-5 border-b border-outline-variant/10 flex justify-between items-center bg-surface-container-low">
          <div className="flex items-center gap-3">
            <Terminal className="w-5 h-5 text-[#afefdd]" />
            <h3 className="font-headline font-black text-sm uppercase tracking-wider text-on-surface-variant">Ledger Entries</h3>
          </div>
          <span className="text-[10px] font-bold px-3 py-1 bg-white border border-outline-variant/10 rounded-full text-on-surface-variant font-mono">
            {logs.length} entries shown
          </span>
        </div>

        <div className="divide-y divide-outline-variant/5">
          {isLoading ? (
            <div className="p-16 text-center text-slate-500 text-xs flex flex-col items-center gap-3 justify-center">
              <RefreshCw className="w-6 h-6 animate-spin text-primary" />
              <span>Querying secure ledger database...</span>
            </div>
          ) : logs.length === 0 ? (
            <div className="p-16 text-center text-slate-500 text-xs italic">
              No ledger logs found matching criteria.
            </div>
          ) : (
            logs.map((log) => {
              const isExpanded = expandedLog === log._id;
              return (
                <div key={log._id} className="transition-colors hover:bg-surface-container-lowest/50">
                  {/* Summary row */}
                  <div 
                    onClick={() => toggleExpand(log._id)}
                    className="px-8 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer select-none"
                  >
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className={`px-2.5 py-0.5 rounded text-[9px] font-black uppercase tracking-widest ${getActionBadgeStyle(log.action)}`}>
                          {formatAction(log.action)}
                        </span>
                        <span className="text-slate-400 text-[10px] flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(log.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-medium text-on-surface-variant mt-1.5">
                        <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="font-bold text-on-surface">{log.actor?.name || 'System Operator'}</span>
                        <span className="text-[10px] text-slate-400 font-mono">({log.actorEmail})</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 shrink-0 justify-between md:justify-end">
                      <div className="text-right">
                        <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Target</p>
                        <p className="text-xs font-bold text-on-surface mt-0.5">{log.targetType} <span className="font-mono text-[9px] text-slate-400">#{log.targetId?.slice(-6) || 'N/A'}</span></p>
                      </div>
                      <div className="text-slate-400 hover:text-primary">
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Detail Panel */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden bg-surface-container-lowest border-t border-outline-variant/5"
                      >
                        <div className="p-6 md:mx-8 md:my-4 bg-slate-900 text-emerald-400 rounded-2xl border border-white/5 font-mono text-[10px] space-y-3 leading-relaxed shadow-inner">
                          <div className="flex items-center justify-between border-b border-white/5 pb-2 text-[9px] text-slate-500">
                            <span className="flex items-center gap-1.5"><Database className="w-3.5 h-3.5 text-emerald-500" /> METADATA INSPECTOR</span>
                            <span>ID: {log._id}</span>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-300">
                            <div>
                              <p className="text-slate-500 text-[9px] uppercase font-bold">Action Key</p>
                              <p className="font-semibold">{log.action}</p>
                            </div>
                            <div>
                              <p className="text-slate-500 text-[9px] uppercase font-bold">Client IP Address</p>
                              <p className="font-semibold">{log.ipAddress || 'Internal Call / Localhost'}</p>
                            </div>
                            <div>
                              <p className="text-slate-500 text-[9px] uppercase font-bold">Target Instance</p>
                              <p className="font-semibold">{log.targetType} ID: {log.targetId || 'N/A'}</p>
                            </div>
                            <div>
                              <p className="text-slate-500 text-[9px] uppercase font-bold">Operator Session</p>
                              <p className="font-semibold">Role: {log.actor?.role || 'SYSTEM'}</p>
                            </div>
                          </div>
                          <div className="pt-2 border-t border-white/5">
                            <p className="text-slate-500 text-[9px] uppercase font-bold mb-1">JSON Payload details</p>
                            <pre className="overflow-x-auto whitespace-pre-wrap max-w-full text-emerald-300 bg-black/30 p-4 rounded-xl border border-white/5 font-mono text-[9px]">
                              {JSON.stringify(log.details, null, 2)}
                            </pre>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
