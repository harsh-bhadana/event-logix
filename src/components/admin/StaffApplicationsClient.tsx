'use client';

import React, { useState } from 'react';
import { updateStaffStatus, bulkUpdateStaffStatus } from "@/lib/actions/staff-actions";
import Image from 'next/image';
import { BulkActionToolbar } from '../ui/BulkActionToolbar';
import { toast } from 'sonner';

interface StaffApplicationsClientProps {
  initialApplications: any[];
}

export function StaffApplicationsClient({ initialApplications }: StaffApplicationsClientProps) {
  const [applications, setApplications] = useState(initialApplications);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isBulkLoading, setIsBulkLoading] = useState(false);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev: string[]) => 
      prev.includes(id) ? prev.filter((i: string) => i !== id) : [...prev, id]
    );
  };

  const handleBulkStatusUpdate = async (status: 'approved' | 'rejected') => {
    if (selectedIds.length === 0) return;
    setIsBulkLoading(true);
    const result = await bulkUpdateStaffStatus(selectedIds, status);
    
    if (result.success) {
      toast.success(result.message);
      setApplications((prev: any[]) => prev.filter((app: any) => !selectedIds.includes(app._id)));
      setSelectedIds([]);
    } else {
      toast.error(result.error || "Bulk update failed");
    }
    setIsBulkLoading(false);
  };

  const handleStatusUpdate = async (userId: string, status: 'approved' | 'rejected') => {
    setLoadingId(userId);
    const result = await updateStaffStatus(userId, status);
    if (result.success) {
      setApplications((prev: any[]) => prev.filter((app: any) => app._id !== userId));
    } else {
      toast.error(result.error);
    }
    setLoadingId(null);
  };

  if (applications.length === 0) {
    return (
      <div className="bg-surface-container-low rounded-3xl p-20 text-center border border-outline-variant/10">
        <div className="w-20 h-20 bg-surface-container-highest rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="material-symbols-outlined text-4xl text-on-surface-variant/40">person_search</span>
        </div>
        <h3 className="text-xl font-black text-on-surface font-headline">All Caught Up!</h3>
        <p className="text-on-surface-variant mt-2 font-medium">There are no pending staff applications at the moment.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
        {applications.map((app) => (
          <div 
            key={app._id} 
            onClick={() => toggleSelect(app._id)}
            className={`
              bg-white rounded-[2.5rem] p-8 shadow-sm border transition-all group relative cursor-pointer
              ${selectedIds.includes(app._id) 
                ? 'border-primary ring-4 ring-primary/5 bg-primary/[0.01]' 
                : 'border-outline-variant/5 hover:shadow-xl'
              }
            `}
          >
            {/* Selection Checkbox */}
            <div className={`
              absolute top-6 right-8 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all
              ${selectedIds.includes(app._id)
                ? 'bg-primary border-primary scale-110 shadow-lg shadow-primary/20'
                : 'border-outline-variant/20 bg-surface-container-low opacity-0 group-hover:opacity-100'
              }
            `}>
              {selectedIds.includes(app._id) && (
                <span className="material-symbols-outlined text-on-primary text-sm font-black">check</span>
              )}
            </div>

            <div className="flex items-center gap-5 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center overflow-hidden">
              {app.staffProfile?.profileImage ? (
                <Image src={app.staffProfile.profileImage} width={64} height={64} alt={app.name} className="object-cover" />
              ) : (
                <span className="material-symbols-outlined text-3xl text-primary font-bold">person</span>
              )}
            </div>
            <div>
              <h3 className="text-lg font-black text-on-surface font-headline">{app.name}</h3>
              <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">{app.email}</p>
            </div>
          </div>

          <div className="space-y-6 mb-8">
            <div>
              <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-2 opacity-50">Skills</p>
              <div className="flex flex-wrap gap-2">
                {app.staffProfile?.skills?.map((skill: string) => (
                  <span key={skill} className="px-3 py-1 bg-surface-container-highest rounded-lg text-[10px] font-bold text-on-surface">
                    {skill}
                  </span>
                )) || <span className="text-xs italic text-on-surface-variant">No skills listed</span>}
              </div>
            </div>

            <div>
              <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-2 opacity-50">Bio</p>
              <p className="text-sm text-on-surface-variant font-medium line-clamp-3 leading-relaxed">
                {app.staffProfile?.bio || "No bio provided."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-outline-variant/5">
            <button
              disabled={loadingId === app._id}
              onClick={() => handleStatusUpdate(app._id, 'approved')}
              className="flex-1 bg-primary text-on-primary py-3.5 rounded-2xl font-bold text-sm shadow-lg shadow-primary/10 active:scale-95 transition-all disabled:opacity-50"
            >
              Approve
            </button>
            <button
              disabled={loadingId === app._id}
              onClick={() => handleStatusUpdate(app._id, 'rejected')}
              className="px-5 py-3.5 bg-surface-container-highest text-on-surface rounded-2xl font-bold text-sm hover:bg-error/10 hover:text-error transition-all active:scale-95 disabled:opacity-50"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>

    <BulkActionToolbar 
      selectedCount={selectedIds.length}
      onClear={() => setSelectedIds([])}
      actions={[
        {
          label: "Approve Selected",
          icon: "check_circle",
          variant: "primary",
          onClick: () => handleBulkStatusUpdate('approved'),
          loading: isBulkLoading
        },
        {
          label: "Reject Selected",
          icon: "cancel",
          variant: "error",
          onClick: () => handleBulkStatusUpdate('rejected'),
          loading: isBulkLoading
        }
      ]}
    />
  </>
  );
}
