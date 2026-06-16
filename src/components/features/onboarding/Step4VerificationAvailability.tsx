"use client";

import React, { useState, useRef } from "react";
import { useStaffOnboarding } from "@/hooks/useStaffOnboarding";
import { registerStaff } from "@/lib/actions/auth-actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const DAYS = [
  { id: "monday", label: "Mon" },
  { id: "tuesday", label: "Tue" },
  { id: "wednesday", label: "Wed" },
  { id: "thursday", label: "Thu" },
  { id: "friday", label: "Fri" },
  { id: "saturday", label: "Sat" },
  { id: "sunday", label: "Sun" },
];

export default function Step4VerificationAvailability() {
  const { data, updateData, setCurrentStep } = useStaffOnboarding();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [shortNotice, setShortNotice] = useState(true);
  const [remotePreferred, setRemotePreferred] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const toggleDay = (day: string) => {
    updateData({
      availability: {
        ...data.availability,
        [day]: !data.availability[day as keyof typeof data.availability],
      },
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Document file size must be less than 10MB");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (result.success && result.url) {
        updateData({
          verificationDocs: [...(data.verificationDocs || []), result.url],
        });
        toast.success(`${file.name} uploaded successfully!`);
      } else {
        toast.error(result.error || "Failed to upload document.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred during upload.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const result = await registerStaff(data);
      if (result.success) {
        toast.success(result.message);
        router.push("/login");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-right-4 duration-500 pb-20">
      {/* Identity Documents Section */}
      <section>
        <header className="mb-6 flex items-end justify-between">
          <div>
            <h3 className="text-xl font-headline font-bold text-on-surface">Identity Documents</h3>
            <p className="text-on-surface-variant text-sm mt-1">Please provide identification for secure verification.</p>
          </div>
          <span className="material-symbols-outlined text-primary text-4xl opacity-20">security</span>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8 flex flex-col">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf,image/*"
              className="hidden"
            />
            <div 
              onClick={() => !isUploading && fileInputRef.current?.click()}
              className="group relative flex flex-col items-center justify-center border-2 border-dashed border-outline-variant bg-surface-container-lowest rounded-xl p-12 transition-all hover:border-primary hover:bg-primary/5 cursor-pointer min-h-[220px]"
            >
              {isUploading ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <p className="font-body text-xs text-primary font-semibold">Uploading document...</p>
                </div>
              ) : (
                <>
                  <div className="bg-primary-container p-4 rounded-full mb-4 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-primary text-3xl">upload_file</span>
                  </div>
                  <h4 className="font-headline font-semibold text-lg text-on-surface mb-1">Upload Identification / Resume</h4>
                  <p className="text-on-surface-variant text-sm text-center max-w-xs font-body">
                    Click here to <span className="text-primary font-bold">browse your files</span>
                  </p>
                  <p className="text-[10px] text-outline mt-6 uppercase tracking-widest font-bold">Supported: PDF, JPG, PNG (Max 10MB)</p>
                </>
              )}
            </div>

            {/* Uploaded Documents List */}
            {data.verificationDocs && data.verificationDocs.length > 0 && (
              <div className="mt-6 space-y-3">
                <h5 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Uploaded Documents</h5>
                <div className="grid grid-cols-1 gap-2">
                  {data.verificationDocs.map((url, idx) => {
                    const isBase64 = url.startsWith("data:");
                    const filename = isBase64 
                      ? `document_${idx + 1}.${url.split(";")[0].split("/")[1] || "pdf"}`
                      : url.substring(url.lastIndexOf('/') + 1);

                    return (
                      <div key={idx} className="flex items-center justify-between p-3 bg-surface-container-low rounded-lg border border-outline-variant/10 animate-in fade-in duration-300">
                        <div className="flex items-center gap-2 max-w-[80%]">
                          <span className="material-symbols-outlined text-primary text-sm">description</span>
                          <a href={url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary font-medium hover:underline truncate">
                            {filename}
                          </a>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            const updated = data.verificationDocs.filter((_, i) => i !== idx);
                            updateData({ verificationDocs: updated });
                            toast.success("Document removed.");
                          }}
                          className="text-xs text-error font-semibold hover:text-error/80 cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          <div className="md:col-span-4 space-y-4">
            <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/10 h-fit">
              <span className="material-symbols-outlined text-primary mb-3">info</span>
              <h5 className="font-bold text-sm text-on-surface mb-2">Why is this required?</h5>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Verification ensures network integrity and enables secure payroll processing for future placements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Availability Section */}
      <section>
        <header className="mb-8">
          <h3 className="text-xl font-headline font-bold text-on-surface">Professional Availability</h3>
          <p className="text-on-surface-variant text-sm mt-1">Configure your recurring weekly schedule.</p>
        </header>
        
        <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm border border-outline-variant/10">
          <div className="grid grid-cols-7 border-b border-surface-container">
            {DAYS.map((day) => (
              <div key={day.id} className="py-4 text-center text-xs font-bold text-on-surface-variant uppercase tracking-wider border-r border-surface-container last:border-r-0">
                {day.label}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 h-32">
            {DAYS.map((day) => {
              const active = data.availability[day.id as keyof typeof data.availability];
              return (
                <label 
                  key={day.id}
                  onClick={() => toggleDay(day.id)}
                  className={`relative cursor-pointer group hover:bg-primary/5 transition-colors flex flex-col items-center justify-center border-r border-surface-container last:border-r-0 ${!active ? 'bg-surface-container-low/30' : ''}`}
                >
                  <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${
                    active ? "border-primary bg-primary-container" : "border-outline-variant"
                  }`}>
                    <span className={`material-symbols-outlined text-sm ${active ? 'text-primary' : 'text-transparent'}`}>check</span>
                  </div>
                  <span className="text-[10px] mt-2 font-bold text-on-surface-variant group-hover:text-primary">
                    {active ? 'Available' : (day.id === 'saturday' || day.id === 'sunday' ? 'Weekend' : 'Unavailable')}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center justify-between p-5 bg-surface-container-low rounded-lg border border-outline-variant/10">
            <div>
              <h6 className="text-sm font-bold text-on-surface">Short-Notice Projects</h6>
              <p className="text-xs text-on-surface-variant">Available for roles starting within 48 hours.</p>
            </div>
            <button 
              onClick={() => setShortNotice(!shortNotice)}
              className={`w-12 h-6 rounded-full relative transition-colors ${shortNotice ? 'bg-primary' : 'bg-outline-variant'}`}
            >
              <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${shortNotice ? 'right-1' : 'left-1'}`}></div>
            </button>
          </div>
          <div className="flex items-center justify-between p-5 bg-surface-container-low rounded-lg border border-outline-variant/10">
            <div>
              <h6 className="text-sm font-bold text-on-surface">Remote Preferred</h6>
              <p className="text-xs text-on-surface-variant">Filter for positions with work-from-home options.</p>
            </div>
            <button 
              onClick={() => setRemotePreferred(!remotePreferred)}
              className={`w-12 h-6 rounded-full relative transition-colors ${remotePreferred ? 'bg-primary' : 'bg-outline-variant'}`}
            >
              <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${remotePreferred ? 'right-1' : 'left-1'}`}></div>
            </button>
          </div>
        </div>
      </section>

      {/* Footer Action Bar */}
      <footer className="mt-20 pt-10 border-t border-surface-container-highest flex items-center justify-between">
        <button
          onClick={() => setCurrentStep(3)}
          disabled={isSubmitting}
          className="flex items-center gap-2 px-6 py-3 text-on-surface-variant font-semibold hover:text-primary transition-colors disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          Previous Step
        </button>
        <div className="flex gap-4">
          <button className="px-8 py-3 bg-surface-container-high text-on-surface font-semibold rounded-lg hover:bg-surface-dim transition-all disabled:opacity-50">
            Skip for Now
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-10 py-3 bg-gradient-to-r from-primary to-primary-dim text-on-primary font-bold rounded-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <span className="animate-pulse">Completing Profile...</span>
            ) : (
              "Complete Profile"
            )}
            {!isSubmitting && <span className="material-symbols-outlined text-sm">verified</span>}
          </button>
        </div>
      </footer>
    </div>
  );
}
