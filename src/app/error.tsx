'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6 text-center">
      <div className="w-20 h-20 rounded-3xl bg-error-container/20 text-error flex items-center justify-center mb-8 shadow-inner">
        <span className="material-symbols-outlined text-4xl">warning</span>
      </div>
      
      <h2 className="text-3xl font-black text-on-surface tracking-tight font-headline mb-4">Something went wrong</h2>
      <p className="text-on-surface-variant max-w-md mx-auto mb-10 font-medium leading-relaxed">
        We encountered an unexpected error while processing your request. Our associates have been notified.
      </p>
      
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <button
          onClick={() => reset()}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary text-on-primary px-8 py-4 rounded-2xl font-bold text-sm shadow-xl shadow-primary/10 active:scale-95 transition-all group"
        >
          <span className="material-symbols-outlined text-lg group-hover:rotate-180 transition-transform duration-500">refresh</span>
          Try Again
        </button>
        <Link 
          href="/" 
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-surface-container-high text-on-surface px-8 py-4 rounded-2xl font-bold text-sm hover:bg-surface-container-highest transition-all"
        >
          Go to Homepage
        </Link>
      </div>

      <p className="mt-12 text-[10px] font-mono text-on-surface-variant/40">
        Digest: {error.digest || 'Internal Server Error'}
      </p>
    </div>
  );
}
