import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6 text-center">
      <div className="relative mb-8">
        <h1 className="text-[12rem] font-black text-primary/5 leading-none select-none">404</h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 rounded-3xl bg-surface-container flex items-center justify-center shadow-xl border border-outline-variant/10">
            <span className="material-symbols-outlined text-5xl text-primary animate-bounce">search_off</span>
          </div>
        </div>
      </div>
      
      <h2 className="text-3xl font-black text-on-surface tracking-tight font-headline mb-4">Page Not Found</h2>
      <p className="text-on-surface-variant max-w-md mx-auto mb-10 font-medium leading-relaxed">
        The page you're looking for was moved, removed, or never existed in our active ledger.
      </p>
      
      <Link 
        href="/" 
        className="flex items-center gap-2 bg-primary text-on-primary px-8 py-4 rounded-2xl font-bold text-sm shadow-xl shadow-primary/10 active:scale-95 transition-all group"
      >
        <span className="material-symbols-outlined text-lg group-hover:-translate-x-1 transition-transform">arrow_back</span>
        Return to Safety
      </Link>
      
      <div className="mt-16 flex items-center gap-6 opacity-40 grayscale">
        <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-[10px] font-bold">EL</div>
        <div className="h-4 w-[1px] bg-outline"></div>
        <p className="text-[10px] uppercase tracking-widest font-black">Event Logix Suite</p>
      </div>
    </div>
  );
}
