"use client";

import { useWizard } from "@/hooks/useEventWizard";

export function Step1BasicInfo() {
  const { data, updateData } = useWizard();

  return (
    <div className="max-w-4xl mx-auto px-12 py-10 animate-fade-in">
      <header className="mb-10">
        <div className="flex items-center gap-2 text-primary font-label text-sm font-semibold mb-2">
          <span className="w-2 h-2 rounded-full bg-primary"></span>
          Step 01
        </div>
        <h1 className="font-headline text-3xl font-extrabold tracking-tight text-on-surface mb-3">
          Foundational Details
        </h1>
        <p className="font-body text-on-surface-variant max-w-xl leading-relaxed">
          Set the stage for your executive event. These details will be the primary point of contact for your attendees and staff.
        </p>
      </header>

      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-12 lg:col-span-7 space-y-8">
          <div className="space-y-2">
            <label className="font-label font-bold text-sm text-on-surface-variant ml-1">Event Title</label>
            <input
              type="text"
              value={data.title}
              onChange={(e) => updateData({ title: e.target.value })}
              className="w-full h-12 px-4 bg-surface-container-highest rounded-md border-none focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all font-body text-on-surface"
              placeholder="e.g. Annual Strategic Summit 2024"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="font-label font-bold text-sm text-on-surface-variant ml-1">Category</label>
              <select
                value={data.category}
                onChange={(e) => updateData({ category: e.target.value })}
                className="w-full h-12 px-4 bg-surface-container-highest rounded-md border-none focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all font-body text-on-surface appearance-none"
              >
                <option>Corporate Strategy</option>
                <option>Financial Review</option>
                <option>Stakeholder Gala</option>
                <option>Product Launch</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="font-label font-bold text-sm text-on-surface-variant ml-1">Date</label>
              <input
                type="date"
                value={data.date}
                onChange={(e) => updateData({ date: e.target.value })}
                className="w-full h-12 px-4 bg-surface-container-highest rounded-md border-none focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all font-body text-on-surface"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="font-label font-bold text-sm text-on-surface-variant ml-1">Description</label>
            <div className="rounded-lg bg-surface-container-highest overflow-hidden border border-outline-variant/10">
              <div className="flex items-center gap-2 px-3 py-2 bg-surface-container-high border-b border-outline-variant/10">
                <button className="material-symbols-outlined text-xs p-1 hover:bg-white rounded">format_bold</button>
                <button className="material-symbols-outlined text-xs p-1 hover:bg-white rounded">format_italic</button>
                <button className="material-symbols-outlined text-xs p-1 hover:bg-white rounded">format_list_bulleted</button>
                <div className="w-px h-4 bg-outline-variant/30 mx-1"></div>
                <button className="material-symbols-outlined text-xs p-1 hover:bg-white rounded">link</button>
              </div>
              <textarea
                value={data.description}
                onChange={(e) => updateData({ description: e.target.value })}
                className="w-full p-4 bg-transparent border-none focus:ring-0 font-body text-on-surface resize-none"
                placeholder="Describe the objectives and key highlights of the event..."
                rows={6}
              ></textarea>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <label className="font-label font-bold text-sm text-on-surface-variant ml-1">Event Banner</label>
            <div className="aspect-[4/5] w-full bg-surface-container-low rounded-xl flex flex-col items-center justify-center p-8 text-center border-2 border-dashed border-outline-variant/20 hover:border-primary/40 hover:bg-white transition-all cursor-pointer group relative overflow-hidden">
              {data.bannerImage ? (
                <img src={data.bannerImage} className="absolute inset-0 w-full h-full object-cover" alt="Banner Preview" />
              ) : (
                <>
                  <div className="w-16 h-16 rounded-full bg-primary-container flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-primary text-3xl">add_photo_alternate</span>
                  </div>
                  <h3 className="font-headline font-bold text-on-surface text-base mb-1">Upload Hero Image</h3>
                  <p className="font-body text-xs text-on-surface-variant px-4">
                    Recommended: 1600x900px (Max 5MB). JPG or PNG format.
                  </p>
                </>
              )}
            </div>
          </div>
          <div className="p-6 bg-tertiary-container/30 rounded-xl space-y-3 border border-tertiary/10">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-tertiary text-sm fill-1">lightbulb</span>
              <span className="font-label text-xs font-bold text-tertiary uppercase tracking-wider">Expert Tip</span>
            </div>
            <p className="font-body text-xs text-on-tertiary-container leading-relaxed">
              Events with high-quality banners see 40% higher engagement from executive stakeholders during the RSVP phase.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
