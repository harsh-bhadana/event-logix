'use client';

import { useState, useEffect } from "react";
import { login } from "@/lib/actions/auth-actions";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const errorParam = params.get("error");
    if (errorParam) {
      setError(errorParam);
    }
  }, []);

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
          router.push("/admin");
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
          <Link href="/forgot-password" className="text-[10px] font-bold text-primary hover:text-primary-dim uppercase tracking-wider transition-colors">
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

      <div className="flex items-center my-4">
        <div className="flex-grow border-t border-outline-variant/10"></div>
        <span className="mx-3 text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest">or</span>
        <div className="flex-grow border-t border-outline-variant/10"></div>
      </div>

      <a
        href="/api/auth/google"
        className="w-full bg-surface-container-high text-on-surface hover:bg-surface-container-highest py-3.5 rounded-2xl font-bold text-sm shadow-sm hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 border border-outline-variant/20 cursor-pointer"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            fill="#EA4335"
            d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.37 0 3.383 2.714 1.486 6.647l3.78 3.118z"
          />
          <path
            fill="#4285F4"
            d="M23.49 12.275c0-.825-.074-1.62-.21-2.385H12v4.51h6.44c-.277 1.455-1.096 2.69-2.325 3.514v2.92h3.76c2.2-2.025 3.615-5.002 3.615-8.56z"
          />
          <path
            fill="#FBBC05"
            d="M5.266 14.235L1.486 17.35c1.897 3.935 5.884 6.65 10.514 6.65 3.055 0 5.864-1.01 7.91-2.74l-3.76-2.92c-1.12.75-2.555 1.196-4.15 1.196-4.327 0-7.995-2.927-9.3-6.65z"
          />
          <path
            fill="#34A853"
            d="M12 19.536c2.595 0 4.773-.86 6.364-2.336l3.76 2.92C20.07 21.855 17.26 24 12 24c-4.63 0-8.617-2.715-10.514-6.65l3.78-3.117c1.305 3.722 4.973 6.65 9.3 6.65z"
          />
        </svg>
        Continue with Google
      </a>

      <div className="pt-4 text-center text-[13px] font-medium text-on-surface-variant">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-primary font-bold hover:text-primary-dim transition-colors">
          Create Account
        </Link>
      </div>
    </form>
  );
}
