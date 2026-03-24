import React from 'react';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { getStaffApplications } from '@/lib/actions/staff-actions';
import StaffVerificationClient from '@/components/admin/StaffVerificationClient';

export default async function AdminStaffVerificationPage() {
  const session = await getSession();
  
  if (!session?.user || session.user.role !== 'admin') {
    redirect('/login?callbackUrl=/admin/staff');
  }

  const { data, success } = await getStaffApplications();

  if (!success || !data) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-bold text-red-500">Failed to load staff applications.</h2>
        <p className="text-slate-500">Please check your connection and try again.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen">
      <StaffVerificationClient initialApplications={data} />
    </div>
  );
}
