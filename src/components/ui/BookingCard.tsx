"use client";

import { useState } from "react";
import { bookTicket } from "@/lib/actions/booking-actions";

interface TicketType {
  name: string;
  price: number;
  quantity: number;
}

interface BookingCardProps {
  eventId: string;
  ticketTypes: TicketType[];
  isUserLoggedIn: boolean;
}

export function BookingCard({ eventId, ticketTypes, isUserLoggedIn }: BookingCardProps) {
  const [selectedTicket, setSelectedTicket] = useState<TicketType>(ticketTypes[0]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const total = selectedTicket.price * quantity;

  async function handleBook() {
    if (!isUserLoggedIn) {
      window.location.href = "/login";
      return;
    }

    setLoading(true);
    setResult(null);

    const res = await bookTicket({
      eventId,
      ticketType: selectedTicket.name,
      quantity,
    });

    setResult({ success: res.success, message: res.message });
    setLoading(false);
  }

  return (
    <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-2xl shadow-xl shadow-primary/5 overflow-hidden">
      <div className="p-8 bg-surface-container-low flex justify-between items-center">
        <div>
          <p className="text-on-surface-variant text-xs font-bold uppercase tracking-widest mb-1">
            {selectedTicket?.name || "Delegate Pass"}
          </p>
          <h3 className="text-3xl font-headline font-extrabold text-on-surface">
            {selectedTicket?.price === 0 ? "Free" : `$${selectedTicket?.price.toFixed(2)}`}
          </h3>
        </div>
        <span className="bg-tertiary-container text-on-tertiary-container px-3 py-1 rounded-sm text-[10px] font-black uppercase tracking-tighter">
          {ticketTypes.length > 1 ? `${ticketTypes.length} Types` : "Early Access"}
        </span>
      </div>

      <div className="p-8 space-y-6">
        {/* Ticket type selector */}
        {ticketTypes.length > 1 && (
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2 block">
              Ticket Type
            </label>
            <div className="space-y-2">
              {ticketTypes.map((t) => (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => setSelectedTicket(t)}
                  className={`w-full flex justify-between items-center px-4 py-3 rounded-xl border text-sm font-semibold transition-all ${
                    selectedTicket.name === t.name
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-outline-variant/20 text-on-surface hover:border-primary/30"
                  }`}
                >
                  <span>{t.name}</span>
                  <span>{t.price === 0 ? "Free" : `$${t.price.toFixed(2)}`}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity picker */}
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2 block">
            Quantity
          </label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors font-bold text-lg"
            >
              −
            </button>
            <span className="text-xl font-black text-on-surface w-8 text-center">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.min(10, q + 1))}
              className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors font-bold text-lg"
            >
              +
            </button>
          </div>
        </div>

        {/* Price breakdown */}
        <div className="space-y-3 pt-4 border-t border-outline-variant/10">
          <div className="flex justify-between text-sm text-on-surface-variant font-body">
            <span>{selectedTicket?.name} × {quantity}</span>
            <span>{total === 0 ? "Free" : `$${total.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between font-bold text-lg pt-2 text-on-surface font-headline">
            <span>Subtotal</span>
            <span>{total === 0 ? "Free" : `$${total.toFixed(2)}`}</span>
          </div>
        </div>

        {/* Result message */}
        {result && (
          <div
            className={`px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-2 ${
              result.success
                ? "bg-primary-container/30 text-on-primary-container"
                : "bg-error-container/20 text-error"
            }`}
          >
            <span className="material-symbols-outlined text-base">
              {result.success ? "check_circle" : "error"}
            </span>
            {result.message}
          </div>
        )}

        {/* CTA */}
        <button
          type="button"
          onClick={handleBook}
          disabled={loading || (result?.success ?? false)}
          className="w-full bg-gradient-to-r from-primary to-primary-dim text-on-primary py-4 rounded-lg font-bold text-lg shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-60 disabled:scale-100 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="w-5 h-5 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin" />
              Processing...
            </>
          ) : result?.success ? (
            <>
              <span className="material-symbols-outlined">check_circle</span>
              Booked!
            </>
          ) : isUserLoggedIn ? (
            "Secure My Spot"
          ) : (
            "Log In to Book"
          )}
        </button>

        <ul className="space-y-3 pt-2 font-body text-xs text-on-surface-variant">
          <li className="flex items-center gap-3 italic">
            <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
            Instant booking confirmation
          </li>
          <li className="flex items-center gap-3 italic">
            <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
            Free cancellation within 48 hours
          </li>
        </ul>
      </div>
    </div>
  );
}
