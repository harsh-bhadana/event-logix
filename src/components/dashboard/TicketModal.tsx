"use client";

import React from "react";
import { QRCodeSVG } from "qrcode.react";
import { X, Download, Wallet } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: any;
}

export default function TicketModal({ isOpen, onClose, booking }: TicketModalProps) {
  if (!isOpen || !booking) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 md:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl relative"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors z-10"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>

          <div className="p-8 text-center">
            <h3 className="font-headline font-bold text-2xl mb-1 dark:text-white">Event Ticket</h3>
            <p className="text-slate-500 text-sm mb-6">{booking.event?.title}</p>

            <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-2xl inline-block mb-6 border border-slate-100 dark:border-slate-800">
              <div className="bg-white p-4 rounded-xl shadow-inner">
                <QRCodeSVG
                  value={booking.qrCode || booking._id}
                  size={180}
                  level="H"
                  includeMargin={false}
                />
              </div>
            </div>

            <h4 className="font-headline font-bold text-lg mb-1 dark:text-white">Scan at Entry</h4>
            <p className="text-slate-500 text-sm px-4">
              Please present this code at the main reception. This ticket is valid for {booking.quantity} attendee(s).
            </p>

            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-3">
              <button className="w-full py-3.5 bg-slate-900 dark:bg-slate-700 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all">
                <Wallet className="w-4 h-4" />
                Add to Apple Wallet
              </button>
              <button 
                className="w-full py-3.5 text-emerald-600 dark:text-emerald-400 font-bold text-sm flex items-center justify-center gap-2 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-xl transition-all"
                onClick={() => window.print()}
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
