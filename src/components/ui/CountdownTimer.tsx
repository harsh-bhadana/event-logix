"use client";

import { useState, useEffect } from "react";

interface CountdownTimerProps {
  targetDate: Date;
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: false });

  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      const diff = targetDate.getTime() - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: true });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft({ days, hours, minutes, seconds, expired: false });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  if (timeLeft.expired) {
    return (
      <div className="bg-surface-container-high border border-outline-variant/20 p-6 rounded-xl">
        <p className="text-on-surface-variant font-bold text-center text-sm">Registration has closed</p>
      </div>
    );
  }

  return (
    <div className="bg-error-container/10 border border-error-container/20 p-6 rounded-xl flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="material-symbols-outlined text-error">timer</span>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-error">Registration Closes In</p>
          <p className="font-headline font-extrabold text-on-error-container text-lg tracking-tight">
            {timeLeft.days > 0 && `${timeLeft.days}D `}
            {String(timeLeft.hours).padStart(2, "0")}H{" "}
            {String(timeLeft.minutes).padStart(2, "0")}M{" "}
            {String(timeLeft.seconds).padStart(2, "0")}S
          </p>
        </div>
      </div>
      <div className="text-[10px] bg-error text-on-error px-2 py-0.5 rounded-full font-bold">
        {timeLeft.days === 0 ? "Today!" : "Urgent"}
      </div>
    </div>
  );
}
