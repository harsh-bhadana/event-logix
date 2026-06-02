import React from 'react';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import AuditHubClient from '@/components/admin/AuditHubClient';

export default async function AdminAuditLogsPage() {
  const session = await getSession();

  if (!session?.user || session.user.role !== 'admin') {
    redirect('/login?callbackUrl=/admin/audit');
  }

  return (
    <div className="min-h-screen bg-surface px-10 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2 mb-10">
        <h1 className="text-4xl font-black tracking-tighter text-on-surface font-headline uppercase leading-none">
          Security & Audit Hub
        </h1>
        <p className="text-xs uppercase tracking-widest text-slate-500 font-bold">
          Cryptographic ledger logging of senior portal updates and security access events
        </p>
      </div>
      
      <AuditHubClient />
    </div>
  );
}
