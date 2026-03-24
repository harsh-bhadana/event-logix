import React from "react";
import dbConnect from "@/lib/mongodb";
import Event, { IEvent } from "@/models/Event";
import { notFound } from "next/navigation";

export default async function EventDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  await dbConnect();
  
  let event = null;
  try {
    event = await Event.findById(id).lean() as unknown as IEvent;
  } catch (err) {
    // If id is not a valid ObjectId, we handle it
  }

  if (!event && id !== "1") {
    return notFound();
  }

  // Fallback to mock data if it's the demo ID "1" or not found but we want to show the premium mockup
  const data = event ? {
    title: event.title,
    description: event.description,
    date: new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    location: event.locationName || "The Grand Plaza, Geneva",
    price: event.ticketTypes?.[0]?.price || 299,
    imageUrl: event.imageUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuCzNFpGrSR4J4yYE0-DZosjJtsNaIgvorkRcZMzGVOXneTCmTYJqbtkHXHCe8-cnxJPCVy-F4jH9Es28Cvc-gF0H3lF9aamb_9hb1kJ-2ZRsIn1Id7vDljTCln0F9xjonjO2TChCJDA0xecsdCUaVIqxVkjgYE0bl7oNipdPWQoxvPSHa5el0cL-mri3aJjLwCi_VmthwfBNJR21e6lQA3-smcwCPXP0qDTBD4C_QW9VQD5Q4EJ7oq_1TLxci6HKCu4FS2rsNsDxZcz",
    speakers: (event as any).speakers || [
      { name: "Dr. Alistair Vance", role: "Chief Economist", company: "Vanguard Global Securities", imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHeDbTvuBRTti5V7FGndJFympx3Jxi-WkFGpHdPvOWDsar4SyKuxCwXgJnXvBAt22vVJM1FtfOct6Rk7RVXwjQBCc9hDUnWxPSmXAZojfGm5m9g1mEo7ki6lcd8nM-SSpguzPKw68UgxQUFn3DxlwmDS7IIgdWTm78X7Pyj76SZeyZfjLvkE6pCr76vf2kDJ6xBmznaJfhhFbregPaU8ici3lwrAwRJzcv6w_yYoUccFLh9RyNuZSCyk15wBrMvDHyU6tmGytOBzkj" },
      { name: "Helena Rosseau", role: "Head of Strategy", company: "Blue Chip Innovations", imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCqy4YCPov8kDkWqObPV-0R8kcMGFIc66I8DttSxvnxgTEL1o-3WYvd3P7OpjAeLcqVyNogfyCJIOZB1KBT5m5qVinHGqfRkuBJGbh-aADb0LDpyqWt0IpyFrWJfdO-xzjpNICupjb_2aWZXDuppDuBZ1n1i1OH04hWyLYLYxh6CeVMsiFcrdUwp33E43VKGO81aeuiXfaFHoeGkmcX4DSiOgBQcP_wnZTNDcDK7w0G62mMNIiJTW6Su8siikZntsbDs1dG49DElFxF" },
      { name: "Marcus Thorne", role: "Managing Director", company: "The Sovereign Fund", imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDAumuLjWa3WmT376J-KyBuxJ3mjEyRJ8ldl_AQOT7LaGXQe1tSfekP7EI3bGAvcNIXgib7RItNJhwplJm0oMFseheiyWziUTD4V8YyLZuM-hpxdtQYdHOVwYLIKkeaF9BFQigeWvK752CYFyXDsMLHn2rY7mh9aP53L1Qnec8yhogCd33fvMDEcz-9Rvj6hPtjbDDeed2A0gIlcktfWH6h74rWVHeRt2ID2kYZQ6aD5Ym1zCft5wYFgMjlujhQbo34kFdvPu21R3XT" }
    ],
    attendeeTypes: (event as any).attendeeTypes || [
      { name: "C-Suite Executives", description: "Strategic leaders shaping the future vision.", icon: "corporate_fare" },
      { name: "Asset Managers", description: "Professionals overseeing high-stakes capital.", icon: "account_balance" },
      { name: "Policy Architects", description: "Individuals crafting digital age frameworks.", icon: "insights" },
      { name: "Strategy Partners", description: "Consultants driving operational excellence.", icon: "group_work" }
    ]
  } : {
    title: "Global Leadership Summit 2024",
    description: "The 2024 Global Leadership Summit brings together the world's most influential decision-makers, financial architects, and technological pioneers. This year's ledger focuses on 'Architecting the Next Decade,' exploring sustainable finance and human-centric leadership.",
    date: "October 14-16, 2024",
    location: "The Grand Plaza, Geneva",
    price: 299,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCzNFpGrSR4J4yYE0-DZosjJtsNaIgvorkRcZMzGVOXneTCmTYJqbtkHXHCe8-cnxJPCVy-F4jH9Es28Cvc-gF0H3lF9aamb_9hb1kJ-2ZRsIn1Id7vDljTCln0F9xjonjO2TChCJDA0xecsdCUaVIqxVkjgYE0bl7oNipdPWQoxvPSHa5el0cL-mri3aJjLwCi_VmthwfBNJR21e6lQA3-smcwCPXP0qDTBD4C_QW9VQD5Q4EJ7oq_1TLxci6HKCu4FS2rsNsDxZcz",
    speakers: [
      { name: "Dr. Alistair Vance", role: "Chief Economist", company: "Vanguard Global Securities", imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHeDbTvuBRTti5V7FGndJFympx3Jxi-WkFGpHdPvOWDsar4SyKuxCwXgJnXvBAt22vVJM1FtfOct6Rk7RVXwjQBCc9hDUnWxPSmXAZojfGm5m9g1mEo7ki6lcd8nM-SSpguzPKw68UgxQUFn3DxlwmDS7IIgdWTm78X7Pyj76SZeyZfjLvkE6pCr76vf2kDJ6xBmznaJfhhFbregPaU8ici3lwrAwRJzcv6w_yYoUccFLh9RyNuZSCyk15wBrMvDHyU6tmGytOBzkj" },
      { name: "Helena Rosseau", role: "Head of Strategy", company: "Blue Chip Innovations", imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCqy4YCPov8kDkWqObPV-0R8kcMGFIc66I8DttSxvnxgTEL1o-3WYvd3P7OpjAeLcqVyNogfyCJIOZB1KBT5m5qVinHGqfRkuBJGbh-aADb0LDpyqWt0IpyFrWJfdO-xzjpNICupjb_2aWZXDuppDuBZ1n1i1OH04hWyLYLYxh6CeVMsiFcrdUwp33E43VKGO81aeuiXfaFHoeGkmcX4DSiOgBQcP_wnZTNDcDK7w0G62mMNIiJTW6Su8siikZntsbDs1dG49DElFxF" },
      { name: "Marcus Thorne", role: "Managing Director", company: "The Sovereign Fund", imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDAumuLjWa3WmT376J-KyBuxJ3mjEyRJ8ldl_AQOT7LaGXQe1tSfekP7EI3bGAvcNIXgib7RItNJhwplJm0oMFseheiyWziUTD4V8YyLZuM-hpxdtQYdHOVwYLIKkeaF9BFQigeWvK752CYFyXDsMLHn2rY7mh9aP53L1Qnec8yhogCd33fvMDEcz-9Rvj6hPtjbDDeed2A0gIlcktfWH6h74rWVHeRt2ID2kYZQ6aD5Ym1zCft5wYFgMjlujhQbo34kFdvPu21R3XT" }
    ],
    attendeeTypes: [
      { name: "C-Suite Executives", description: "Strategic leaders shaping the future vision.", icon: "corporate_fare" },
      { name: "Asset Managers", description: "Professionals overseeing high-stakes capital.", icon: "account_balance" },
      { name: "Policy Architects", description: "Individuals crafting digital age frameworks.", icon: "insights" },
      { name: "Strategy Partners", description: "Consultants driving operational excellence.", icon: "group_work" }
    ]
  };

  return (
    <div className="bg-surface font-body text-on-surface">
      {/* Hero Banner */}
      <section className="relative h-[614px] min-h-[450px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img alt="Event Hero" className="w-full h-full object-cover" src={data.imageUrl} />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-neutral-900/40 to-transparent"></div>
        </div>
        <div className="relative h-full max-w-[1440px] mx-auto px-10 flex flex-col justify-end pb-16">
          <div className="max-w-3xl space-y-4">
            <span className="inline-block bg-tertiary-container text-on-tertiary-container px-3 py-1 rounded-sm text-xs font-bold tracking-widest uppercase">
              Annual Flagship Event
            </span>
            <h1 className="text-5xl md:text-7xl font-headline font-extrabold text-white tracking-tight leading-tight uppercase">
              {data.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-white/90 font-medium font-headline">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary-fixed">calendar_today</span>
                <span>{data.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary-fixed">location_on</span>
                <span>{data.location}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-[1440px] mx-auto px-10 py-20 flex flex-col lg:flex-row gap-16 relative">
        {/* Left Column: Content */}
        <div className="flex-1 space-y-16">
          {/* About Section */}
          <section className="space-y-6">
            <h2 className="text-3xl font-headline font-bold text-on-surface flex items-center gap-3">
              About the Event
              <div className="h-[2px] w-12 bg-primary"></div>
            </h2>
            <div className="prose prose-lg max-w-none text-on-surface-variant font-body leading-relaxed space-y-4">
              <p>{data.description}</p>
            </div>
          </section>

          {/* Who Should Attend Section */}
          <section className="bg-surface-container-low/50 p-10 rounded-2xl border border-outline-variant/10 space-y-8">
            <h2 className="text-2xl font-headline font-bold text-on-surface">Who Should Attend</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.attendeeTypes.map((type: { name: string; description: string; icon: string }, i: number) => (
                <div key={i} className="bg-surface-container-lowest p-6 rounded-xl flex items-start gap-4 border border-outline-variant/10">
                  <div className="bg-primary-container text-on-primary-container p-3 rounded-md">
                    <span className="material-symbols-outlined">{type.icon}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">{type.name}</h4>
                    <p className="text-sm text-on-surface-variant">{type.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Speakers Grid */}
          <section className="space-y-10">
            <h2 className="text-3xl font-headline font-bold text-on-surface">Featured Speakers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.speakers.map((speaker: { name: string; role: string; company: string; imageUrl: string }, i: number) => (
                <div key={i} className="group">
                  <div className="relative overflow-hidden rounded-xl aspect-square mb-4 shadow-sm">
                    <img 
                      alt={speaker.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                      src={speaker.imageUrl} 
                    />
                  </div>
                  <h4 className="text-xl font-bold font-headline">{speaker.name}</h4>
                  <p className="text-primary font-semibold text-sm uppercase tracking-wide">{speaker.role}</p>
                  <p className="text-on-surface-variant text-sm font-body">{speaker.company}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Venue Info */}
          <section className="space-y-6">
            <h2 className="text-3xl font-headline font-bold text-on-surface">Venue Information</h2>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 bg-surface-container-low rounded-2xl overflow-hidden border border-outline-variant/10">
              <div className="lg:col-span-3 h-64 lg:h-auto min-h-[300px] bg-outline-variant/10 relative">
                <img 
                  alt="Map" 
                  className="w-full h-full object-cover grayscale opacity-50" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsuUGrOr46eXdaJtjVFsgF_SAhaR3kPUTaxQYKYCPRkFmxKBEDC2VNa9G9wKzFL92PQ--nLR8FzXyZJQFL3VWoPyEVTNRDjwmyME-jCXyvfbNSgqkaC_Fpb7hneWUg4jCuzw-gTQSzOccJZD9zH3K7CrbglM0UI5HsQPuuMLhAIsiW049no0wpzoIb86zasMOxwQ9QjqKm-_4h8Nihu2PgY5UaTu5BksWIiVyscoohxZYSqPF-u1iDgO0DGHZHwRg8DhnxkbJAoRTX" 
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-primary text-on-primary p-3 rounded-full shadow-lg">
                    <span className="material-symbols-outlined">location_on</span>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-2 p-10 flex flex-col justify-center space-y-6">
                <div>
                  <h3 className="text-2xl font-bold font-headline mb-2">{data.location.split(',')[0]}</h3>
                  <p className="text-on-surface-variant font-body leading-relaxed">{data.location}</p>
                </div>
                <div className="space-y-4 font-body text-sm">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">hotel</span>
                    <span>Preferential rates for delegates available</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">local_taxi</span>
                    <span>20 minutes from International Airport</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Registration Card (Sticky) */}
        <div className="lg:w-[400px]">
          <div className="sticky top-28 space-y-6">
            <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-2xl shadow-xl shadow-primary/5 overflow-hidden">
              <div className="p-8 bg-surface-container-low flex justify-between items-center">
                <div>
                  <p className="text-on-surface-variant text-xs font-bold uppercase tracking-widest mb-1">Delegate Pass</p>
                  <h3 className="text-3xl font-headline font-extrabold text-on-surface">${data.price.toFixed(2)}</h3>
                </div>
                <span className="bg-tertiary-container text-on-tertiary-container px-3 py-1 rounded-sm text-[10px] font-black uppercase tracking-tighter">
                  Early Access
                </span>
              </div>
              <div className="p-8 space-y-8">
                <div className="space-y-3 pt-4 border-t border-outline-variant/10">
                  <div className="flex justify-between text-sm text-on-surface-variant font-body">
                    <span>Delegate Pass x1</span>
                    <span>${data.price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 text-on-surface font-headline">
                    <span>Subtotal</span>
                    <span>${data.price.toFixed(2)}</span>
                  </div>
                </div>
                <button className="w-full bg-gradient-to-r from-primary to-primary-dim text-on-primary py-4 rounded-lg font-bold text-lg shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                  Secure My Spot
                </button>
                <ul className="space-y-3 pt-4 font-body text-xs text-on-surface-variant">
                  <li className="flex items-center gap-3 italic">
                    <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                    All-access pass to keynote floor
                  </li>
                  <li className="flex items-center gap-3 italic">
                    <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                    Gala dinner &amp; networking evening
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-error-container/10 border border-error-container/20 p-6 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-error">timer</span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-error">Registration Closes In</p>
                  <p className="font-headline font-extrabold text-on-error-container">2D 14H 32M</p>
                </div>
              </div>
              <div className="text-[10px] bg-error text-on-error px-2 py-0.5 rounded-full font-bold">Urgent</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
