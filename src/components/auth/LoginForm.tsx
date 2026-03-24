'use client';

import { useState } from "react";
import { login } from "@/lib/actions/auth-actions";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const result = await login(formData);

    if (result.success) {
      // Redirect based on role
      switch (result.role) {
        case 'admin':
          router.push("/admin/manage-events");
          break;
        case 'staff':
          router.push("/staff/jobs");
          break;
        default:
          router.push("/");
          break;
      }
    } else {
      setError(result.message || "Login failed");
      setLoading(false);
    }
  }

  return (
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

      <div className="space-y-2">
        <div className="flex justify-between items-center ml-1">
          <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Password</label>
          <Link href="/forgot-password" size="sm" className="text-[10px] font-bold text-primary hover:text-primary-dim uppercase tracking-wider transition-colors">
            Forgot Password?
          </Link>
        </div>
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

      <button
        disabled={loading}
        type="submit"
        className="w-full bg-primary text-on-primary py-4 rounded-2xl font-bold text-sm shadow-xl shadow-primary/10 active:scale-[0.98] transition-all disabled:opacity-70 disabled:grayscale flex items-center justify-center gap-2 group mt-2"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin"></div>
        ) : (
          <>
            Sign In to Portfolio
            <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </>
        )}
      </button>

      <div className="pt-2 text-center text-[13px] font-medium text-on-surface-variant">
        Don't have an account?{" "}
        <Link href="/signup" className="text-primary font-bold hover:text-primary-dim transition-colors">
          Create Account
        </Link>
      </div>
    </form>
  );
}
