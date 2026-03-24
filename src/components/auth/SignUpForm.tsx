'use client';

import { useState } from "react";
import { registerPublic } from "@/lib/actions/auth-actions";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData(event.currentTarget);
    const result = await registerPublic(formData);

    if (result.success) {
      setSuccess(result.message);
      setLoading(false);
      // Increase delay to 3 seconds for better visibility
      setTimeout(() => router.push("/login"), 3000);
    } else {
      setError(result.message || "Registration failed");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-1">Full Name</label>
        <div className="relative group">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">person</span>
          <input
            name="name"
            type="text"
            required
            className="w-full bg-surface-container-high border-none rounded-2xl pl-12 pr-4 py-3.5 text-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-on-surface-variant/40 font-body"
            placeholder="John Doe"
          />
        </div>
      </div>

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

      <div className="space-y-2">
        <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-1">Password</label>
        <div className="relative group">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">lock</span>
          <input
            name="password"
            type="password"
            required
            className="w-full bg-surface-container-high border-none rounded-2xl pl-12 pr-4 py-3.5 text-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-on-surface-variant/40 font-body"
            placeholder="••••••••"
          />
        </div>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-error-container/20 border border-error/10 text-error text-xs font-bold flex items-center gap-2 animate-in fade-in zoom-in-95 duration-200">
          <span className="material-symbols-outlined text-base">error</span>
          {error}
        </div>
      )}

      {success && (
        <div className="p-3.5 rounded-xl bg-tertiary-container/20 border border-tertiary/10 text-tertiary text-xs font-bold flex items-center gap-2 animate-in fade-in zoom-in-95 duration-200">
          <span className="material-symbols-outlined text-base">check_circle</span>
          {success}
        </div>
      )}

      <button
        disabled={loading}
        type="submit"
        className="w-full bg-primary text-on-primary py-4 rounded-2xl font-bold text-sm shadow-xl shadow-primary/10 active:scale-[0.98] transition-all disabled:opacity-70 disabled:grayscale flex items-center justify-center gap-2 group mt-2"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin"></div>
        ) : (
          <>
            Create Account
            <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">how_to_reg</span>
          </>
        )}
      </button>

      <div className="pt-2 flex flex-col items-center gap-4">
        <p className="text-[13px] font-medium text-on-surface-variant">
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-bold hover:text-primary-dim transition-colors">
            Sign In
          </Link>
        </p>
        
        <div className="flex items-center gap-3 w-full opacity-30">
          <div className="h-[1px] flex-1 bg-outline"></div>
          <span className="text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">OR JOIN AS STAFF</span>
          <div className="h-[1px] flex-1 bg-outline"></div>
        </div>
        
        <Link href="/staff/onboarding" className="text-xs font-bold text-primary hover:text-primary-dim uppercase tracking-widest flex items-center gap-1 group">
          Partner with us for work
          <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">work</span>
        </Link>
      </div>
    </form>
  );
}
