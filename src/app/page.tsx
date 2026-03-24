import { getFeaturedEvents } from "@/lib/actions/event-actions";
import { Hero } from "@/components/landing/Hero";
import { SearchBar } from "@/components/landing/SearchBar";
import { Categories } from "@/components/landing/Categories";
import { FeaturedEvents } from "@/components/landing/FeaturedEvents";
import { Features } from "@/components/landing/Features";
import { Newsletter } from "@/components/landing/Newsletter";
import { PublicHeader } from "@/components/ui/PublicHeader";
import { PublicFooter } from "@/components/ui/PublicFooter";
import { getSession } from "@/lib/auth";

export const metadata = {
  title: "The Guest Gallery – Event Logix",
  description:
    "Discover unforgettable events, experiences, and professional gatherings. Join thousands of organizers and attendees on the premium event platform.",
};

export default async function LandingPage() {
  const session = await getSession();
  const featuredResult = await getFeaturedEvents();
  const featuredEvents = featuredResult.success ? featuredResult.data : [];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <PublicHeader user={session?.user} />

      <main className="flex-1">
        <Hero />

        <div className="relative z-30 -mt-16 max-w-4xl mx-auto px-6">
          <SearchBar />
        </div>

        {/* Stats bar */}
        <div className="mt-16 mb-8 max-w-[1440px] mx-auto px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "5,000+", label: "Event Organizers" },
              { value: "120+", label: "Cities Worldwide" },
              { value: "2M+", label: "Tickets Sold" },
              { value: "98%", label: "Satisfaction Rate" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/5"
              >
                <p className="text-3xl font-black text-primary font-headline">
                  {stat.value}
                </p>
                <p className="text-sm text-on-surface-variant font-medium mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <Categories />
        </div>

        <div className="mt-32">
          <FeaturedEvents events={featuredEvents} />
        </div>

        <div className="mt-32">
          <Features />
        </div>

        <div className="mt-32 pb-32">
          <Newsletter />
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
