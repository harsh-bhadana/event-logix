import React from 'react';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { getStaffEarnings } from '@/lib/actions/staff-actions';
import EarningsClient from '@/components/staff/EarningsClient';

export default async function EarningsPage() {
  const session = await getSession();
  
  if (!session?.user || session.user.role !== 'staff') {
    redirect('/login?callbackUrl=/staff/earnings');
  }

  const { data, success } = await getStaffEarnings(session.user.id);

  if (!success || !data) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-bold text-red-500">Failed to load earnings data.</h2>
        <p className="text-slate-500">Please try again later or contact support.</p>
      </div>
    );
  }

  // Ensure shifts are correctly typed and handle empty states
  const earnings = data.earnings || { balance: 0, lifetime: 0 };
  const shifts = data.shifts || [];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pb-20">
      <EarningsClient 
        userId={session.user.id}
        earnings={earnings}
        shifts={shifts}
      />
    </div>
  );
}
