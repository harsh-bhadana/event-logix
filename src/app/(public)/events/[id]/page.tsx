import React from "react";
import dbConnect from "@/lib/mongodb";
import Event from "@/models/Event";
import { notFound } from "next/navigation";
import { getSession } from "@/lib/auth";
import { CountdownTimer } from "@/components/ui/CountdownTimer";
import { BookingCard } from "@/components/ui/BookingCard";

export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const session = await getSession();

  await dbConnect();

  let event: any = null;
  try {
    event = await Event.findById(id).lean();
  } catch (err) {
    // invalid ObjectId – fall through to notFound
  }

  if (!event && id !== "1") return notFound();

  const data = event
    ? {
        title: event.title,
        description: event.description,
        date: new Date(event.date).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        eventDate: new Date(event.date),
        location: event.locationName || "The Grand Plaza, Geneva",
        ticketTypes: event.ticketTypes?.length
          ? event.ticketTypes
          : [{ name: "Standard", price: 299, quantity: 100 }],
        imageUrl:
          event.imageUrl ||
          "https://lh3.googleusercontent.com/aida-public/AB6AXuCzNFpGrSR4J4yYE0-DZosjJtsNaIgvorkRcZMzGVOXneTCmTYJqbtkHXHCe8-cnxJPCVy-F4jH9Es28Cvc-gF0H3lF9aamb_9hb1kJ-2ZRsIn1Id7vDljTCln0F9xjonjO2TChCJDA0xecsdCUaVIqxVkjgYE0bl7oNipdPWQoxvPSHa5el0cL-mri3aJjLwCi_VmthwfBNJR21e6lQA3-smcwCPXP0qDTBD4C_QW9VQD5Q4EJ7oq_1TLxci6HKCu4FS2rsNsDxZcz",
        // Merge lineup + speakers (backward compat)
        lineup: (
          event.lineup?.length
            ? event.lineup
            : event.speakers?.map((s: any) => ({ name: s.name, role: s.role, org: s.company, imageUrl: s.imageUrl }))
        ) ??
          [
            { name: "Dr. Alistair Vance", role: "Keynote Speaker", org: "Vanguard Global", imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHeDbTvuBRTti5V7FGndJFympx3Jxi-WkFGpHdPvOWDsar4SyKuxCwXgJnXvBAt22vVJM1FtfOct6Rk7RVXwjQBCc9hDUnWxPSmXAZojfGm5m9g1mEo7ki6lcd8nM-SSpguzPKw68UgxQUFn3DxlwmDS7IIgdWTm78X7Pyj76SZeyZfjLvkE6pCr76vf2kDJ6xBmznaJfhhFbregPaU8ici3lwrAwRJzcv6w_yYoUccFLh9RyNuZSCyk15wBrMvDHyU6tmGytOBzkj" },
            { name: "Helena Rosseau", role: "Headlining Artist", org: "Blue Chip Productions", imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCqy4YCPov8kDkWqObPV-0R8kcMGFIc66I8DttSxvnxgTEL1o-3WYvd3P7OpjAeLcqVyNogfyCJIOZB1KBT5m5qVinHGqfRkuBJGbh-aADb0LDpyqWt0IpyFrWJfdO-xzjpNICupjb_2aWZXDuppDuBZ1n1i1OH04hWyLYLYxh6CeVMsiFcrdUwp33E43VKGO81aeuiXfaFHoeGkmcX4DSiOgBQcP_wnZTNDcDK7w0G62mMNIiJTW6Su8siikZntsbDs1dG49DElFxF" },
            { name: "Marcus Thorne", role: "Workshop Host", org: "The Sovereign Fund", imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDAumuLjWa3WmT376J-KyBuxJ3mjEyRJ8ldl_AQOT7LaGXQe1tSfekP7EI3bGAvcNIXgib7RItNJhwplJm0oMFseheiyWziUTD4V8YyLZuM-hpxdtQYdHOVwYLIKkeaF9BFQigeWvK752CYFyXDsMLHn2rY7mh9aP53L1Qnec8yhogCd33fvMDEcz-9Rvj6hPtjbDDeed2A0gIlcktfWH6h74rWVHeRt2ID2kYZQ6aD5Ym1zCft5wYFgMjlujhQbo34kFdvPu21R3XT" },
          ],
        attendeeTypes: event.attendeeTypes?.length
          ? event.attendeeTypes
          : [
              { name: "C-Suite Executives", description: "Strategic leaders shaping the future vision.", icon: "corporate_fare" },
              { name: "Asset Managers", description: "Professionals overseeing high-stakes capital.", icon: "account_balance" },
              { name: "Policy Architects", description: "Individuals crafting digital age frameworks.", icon: "insights" },
              { name: "Strategy Partners", description: "Consultants driving operational excellence.", icon: "group_work" },
            ],
      }
    : {
        title: "Global Leadership Summit 2024",
        description:
          "The 2024 Global Leadership Summit brings together the world&apos;s most influential decision-makers, financial architects, and technological pioneers. This year&apos;s ledger focuses on &apos;Architecting the Next Decade,&apos; exploring sustainable finance and human-centric leadership.",
        date: "October 14-16, 2024",
        // Set registration deadline 7 days from now for demo
        eventDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        location: "The Grand Plaza, Geneva",
        ticketTypes: [{ name: "Delegate Pass", price: 299, quantity: 500 }],
        imageUrl:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuCzNFpGrSR4J4yYE0-DZosjJtsNaIgvorkRcZMzGVOXneTCmTYJqbtkHXHCe8-cnxJPCVy-F4jH9Es28Cvc-gF0H3lF9aamb_9hb1kJ-2ZRsIn1Id7vDljTCln0F9xjonjO2TChCJDA0xecsdCUaVIqxVkjgYE0bl7oNipdPWQoxvPSHa5el0cL-mri3aJjLwCi_VmthwfBNJR21e6lQA3-smcwCPXP0qDTBD4C_QW9VQD5Q4EJ7oq_1TLxci6HKCu4FS2rsNsDxZcz",
        lineup: [
          { name: "Dr. Alistair Vance", role: "Keynote Speaker", org: "Vanguard Global", imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHeDbTvuBRTti5V7FGndJFympx3Jxi-WkFGpHdPvOWDsar4SyKuxCwXgJnXvBAt22vVJM1FtfOct6Rk7RVXwjQBCc9hDUnWxPSmXAZojfGm5m9g1mEo7ki6lcd8nM-SSpguzPKw68UgxQUFn3DxlwmDS7IIgdWTm78X7Pyj76SZeyZfjLvkE6pCr76vf2kDJ6xBmznaJfhhFbregPaU8ici3lwrAwRJzcv6w_yYoUccFLh9RyNuZSCyk15wBrMvDHyU6tmGytOBzkj" },
          { name: "Helena Rosseau", role: "Headlining Artist", org: "Blue Chip Productions", imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCqy4YCPov8kDkWqObPV-0R8kcMGFIc66I8DttSxvnxgTEL1o-3WYvd3P7OpjAeLcqVyNogfyCJIOZB1KBT5m5qVinHGqfRkuBJGbh-aADb0LDpyqWt0IpyFrWJfdO-xzjpNICupjb_2aWZXDuppDuBZ1n1i1OH04hWyLYLYxh6CeVMsiFcrdUwp33E43VKGO81aeuiXfaFHoeGkmcX4DSiOgBQcP_wnZTNDcDK7w0G62mMNIiJTW6Su8siikZntsbDs1dG49DElFxF" },
          { name: "Marcus Thorne", role: "Workshop Host", org: "The Sovereign Fund", imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDAumuLjWa3WmT376J-KyBuxJ3mjEyRJ8ldl_AQOT7LaGXQe1tSfekP7EI3bGAvcNIXgib7RItNJhwplJm0oMFseheiyWziUTD4V8YyLZuM-hpxdtQYdHOVwYLIKkeaF9BFQigeWvK752CYFyXDsMLHn2rY7mh9aP53L1Qnec8yhogCd33fvMDEcz-9Rvj6hPtjbDDeed2A0gIlcktfWH6h74rWVHeRt2ID2kYZQ6aD5Ym1zCft5wYFgMjlujhQbo34kFdvPu21R3XT" },
        ],
        attendeeTypes: [
          { name: "C-Suite Executives", description: "Strategic leaders shaping the future vision.", icon: "corporate_fare" },
          { name: "Asset Managers", description: "Professionals overseeing high-stakes capital.", icon: "account_balance" },
          { name: "Policy Architects", description: "Individuals crafting digital age frameworks.", icon: "insights" },
          { name: "Strategy Partners", description: "Consultants driving operational excellence.", icon: "group_work" },
        ],
      };

  const isUserLoggedIn = !!session?.user;

  return (
    <div className="bg-surface font-body text-on-surface">
      {/* Hero Banner */}
      <section className="relative h-[614px] min-h-[450px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img 
            alt="Event Hero" 
            className="w-full h-full object-cover" 
            src={data.imageUrl} 
            style={{ viewTransitionName: `event-image-${id}` } as React.CSSProperties}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-neutral-900/40 to-transparent" />
        </div>
        <div className="relative h-full max-w-[1440px] mx-auto px-10 flex flex-col justify-end pb-16">
          <div className="max-w-3xl space-y-4">
            <span className="inline-block bg-tertiary-container text-on-tertiary-container px-3 py-1 rounded-sm text-xs font-bold tracking-widest uppercase">
              Annual Flagship Event
            </span>
            <h1 
              className="text-5xl md:text-7xl font-headline font-extrabold text-white tracking-tight leading-tight uppercase"
              style={{ viewTransitionName: `event-title-${id}` } as React.CSSProperties}
            >
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

      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto px-10 py-20 flex flex-col lg:flex-row gap-16 relative">
        {/* Left Column */}
        <div className="flex-1 space-y-16">
          {/* About */}
          <section className="space-y-6">
            <h2 className="text-3xl font-headline font-bold text-on-surface flex items-center gap-3">
              About the Event
              <div className="h-[2px] w-12 bg-primary" />
            </h2>
            <div className="prose prose-lg max-w-none text-on-surface-variant font-body leading-relaxed">
              <p>{data.description}</p>
            </div>
          </section>

          {/* Who Should Attend */}
          <section className="bg-surface-container-low/50 p-10 rounded-2xl border border-outline-variant/10 space-y-8">
            <h2 className="text-2xl font-headline font-bold text-on-surface">Who Should Attend</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.attendeeTypes.map((type: { name: string; description: string; icon: string }, i: number) => (
                <div key={i} className="bg-surface-container-lowest p-6 rounded-xl flex items-start gap-4 border border-outline-variant/10">
                  <div className="bg-primary-container text-on-primary-container p-3 rounded-md flex-shrink-0">
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

          {/* Event Lineup */}
          <section className="space-y-10">
            <h2 className="text-3xl font-headline font-bold text-on-surface">Event Lineup</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.lineup.map((member: { name: string; role: string; org?: string; imageUrl?: string }, i: number) => (
                <div key={i} className="group">
                  <div className="relative overflow-hidden rounded-xl aspect-square mb-4 shadow-sm bg-surface-container-high">
                    {member.imageUrl ? (
                      <img
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        src={member.imageUrl}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-6xl text-on-surface-variant/30">person</span>
                      </div>
                    )}
                  </div>
                  <h4 className="text-xl font-bold font-headline">{member.name}</h4>
                  <p className="text-primary font-semibold text-sm uppercase tracking-wide">{member.role}</p>
                  {member.org && <p className="text-on-surface-variant text-sm font-body">{member.org}</p>}
                </div>
              ))}
            </div>
          </section>

          {/* Venue */}
          <section className="space-y-6">
            <h2 className="text-3xl font-headline font-bold text-on-surface">Venue Information</h2>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 bg-surface-container-low rounded-2xl overflow-hidden border border-outline-variant/10">
              <div className="lg:col-span-3 h-64 lg:h-auto min-h-[300px] bg-outline-variant/10 relative">
                <img
                  alt="Venue"
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
                  <h3 className="text-2xl font-bold font-headline mb-2">{data.location.split(",")[0]}</h3>
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

        {/* Right Column: Booking (sticky) */}
        <div className="lg:w-[420px]">
          <div className="sticky top-28 space-y-6">
            <BookingCard
              eventId={id}
              ticketTypes={data.ticketTypes}
              isUserLoggedIn={isUserLoggedIn}
            />
            {/* Live countdown timer */}
            <CountdownTimer targetDate={data.eventDate} />
          </div>
        </div>
      </div>
    </div>
  );
}
