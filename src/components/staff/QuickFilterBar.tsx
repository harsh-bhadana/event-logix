'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export function QuickFilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dateRange = searchParams.get('dateRange') || 'All Dates';
  const expertise = searchParams.get('expertise') || 'All Roles';

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'All Dates' || value === 'All Roles') {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="mb-10">
      <h1 className="text-3xl font-extrabold text-on-surface tracking-tight mb-6 font-headline">Staff Opportunities</h1>
      <div className="flex flex-col md:flex-row md:items-center gap-6 bg-surface-container-low p-4 rounded-xl">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Date Range</span>
          <div className="flex bg-surface-container-high p-1 rounded-full">
            {['This Week', 'Next Month', 'All Dates'].map((range) => (
              <button
                key={range}
                onClick={() => updateFilter('dateRange', range)}
                className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all ${
                  dateRange === range
                    ? 'bg-surface-container-lowest shadow-sm text-primary'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
        <div className="h-6 w-px bg-outline-variant/30 hidden md:block"></div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Expertise</span>
          <div className="flex gap-2">
            {['Security', 'Tech', 'Hosting'].map((role) => (
              <button
                key={role}
                onClick={() => updateFilter('expertise', role)}
                className={`px-4 py-1.5 text-xs font-semibold rounded-full border transition-colors ${
                  expertise === role
                    ? 'bg-primary text-on-primary border-primary'
                    : 'border-outline-variant/50 hover:border-primary hover:text-primary'
                }`}
              >
                {role}
              </button>
            ))}
            <button
              onClick={() => updateFilter('expertise', 'All Roles')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all ${
                expertise === 'All Roles'
                  ? 'bg-primary text-on-primary'
                  : 'border border-outline-variant/50 hover:border-primary hover:text-primary'
              }`}
            >
              All Roles
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
