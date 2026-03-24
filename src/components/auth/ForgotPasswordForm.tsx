'use client';

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordForm() {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSuccess(true);
    setLoading(false);
  }

  if (success) {
    return (
      <div className="text-center space-y-4 py-4 animate-in fade-in zoom-in-95 duration-500">
        <div className="w-16 h-16 rounded-full bg-tertiary-container/30 text-tertiary flex items-center justify-center mx-auto mb-6">
          <span className="material-symbols-outlined text-3xl">check_circle</span>
        </div>
        <h3 className="text-xl font-black text-on-surface tracking-tight font-headline">Check your email</h3>
        <p className="text-on-surface-variant text-sm font-medium leading-relaxed">
          We've sent a password reset link to your email address. Please follow the instructions to reset your password.
        </p>
        <div className="pt-6">
          <Link href="/login" className="text-primary font-bold hover:text-primary-dim transition-colors flex items-center justify-center gap-2 group">
            <span className="material-symbols-outlined text-lg group-hover:-translate-x-1 transition-transform">arrow_back</span>
            Back to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-2">
        <h3 className="text-xl font-black text-on-surface tracking-tight font-headline">Reset Password</h3>
        <p className="text-on-surface-variant text-[13px] font-medium mt-1">
          Enter your email and we'll send you a link to reset your account.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-1">Email Address</label>
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">mail</span>
            <input
              name="email"
              type="email"
              required
              className="w-full bg-surface-container-high border-none rounded-2xl pl-12 pr-4 py-3.5 text-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-on-surface-variant/40 font-body"
              placeholder="name@company.com"
            />
          </div>
        </div>

        <button
          disabled={loading}
          type="submit"
          className="w-full bg-primary text-on-primary py-4 rounded-2xl font-bold text-sm shadow-xl shadow-primary/10 active:scale-[0.98] transition-all disabled:opacity-70 disabled:grayscale flex items-center justify-center gap-2 group"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin"></div>
          ) : (
            <>
              Send Reset Link
              <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">send</span>
            </>
          )}
        </button>

        <div className="text-center">
          <Link href="/login" className="text-[13px] font-bold text-on-surface-variant hover:text-primary transition-colors inline-flex items-center gap-1 group">
            <span className="material-symbols-outlined text-base group-hover:-translate-x-1 transition-transform">chevron_left</span>
            Nevermind, I remembered
          </Link>
        </div>
      </form>
    </div>
  );
}
