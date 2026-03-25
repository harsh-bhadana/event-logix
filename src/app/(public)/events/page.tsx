import React from "react";
import { EventCard } from "@/components/ui/EventCard";
import { getAdminEvents } from "@/lib/actions/event-actions";

const MOCK_EVENTS = [
  {
    id: "1",
    title: "Modern Tech Summit 2024",
    price: 149,
    date: "Nov 12-14",
    location: "San Francisco, CA",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDiNDvtKNzZ2CM1VQNS_VRqH-937UPlj6YCfgZCpT88XweYPsKrKnI6mRSzOBOirTXj6wpyPWfMpmw30hJHShAjhMCjPfBpGgIILb6VAJ7Vgb5HiT89v-C-gzl6EuXAb1OI8Ct4R4lJVkaoP34Ala_zHPmLXDof9gB2jPVemP21xq3SQ8bJegt2Xeb3crq_hBso77RhpDfWUJgAznwt57T4NI5jHLNmR9aUWD4PKIU3nErEs47qDMQ5fw7TtutP9sobUEqTHM3FyTG2",
    tag: "Trending",
  },
  {
    id: "2",
    title: "Urban Sketchers Workshop",
    price: 0,
    date: "Oct 28",
    location: "Central Park, NY",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBjs0lVrL6guiIffai20F1DIMppBpGDZQIfYl9KnSN8MYcraO0nPOGAilrLxf4vEOunJAVwcoRzg_QjLpvGXebhodxRAN2nqLY2NTsPA5lKfPc5gFSE0c1kdLk3ZIdDE_lDNLnEwZzFcpD5hOHa3Lm3Fg9k6PWHLsty6_TpBfIA1BuoiCPTFRcxhJFFkfhpwSU56DN7l5BwsjLmcyyBbEZTBEacmBiVRcb_dqcfx_uOR7lXAmior56K6l0HXHQd2GKm8tvaqw0UXZyh",
  },
  {
    id: "3",
    title: "Neon Horizon Music Fest",
    price: 45,
    date: "Dec 05",
    location: "Austin, TX",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB-3ssWPrG0wgi0aT7CtOfyP7ZVUO9bQNbK9vWrk78FrXcFPJR-gvdR2rX21lvvptciQ8GvU6lg1IVXnt-JIpcYsfsZH63XGh_tzDWobATUw2Oe8mbUF4eQBE-VgitT6z8qPHgeX-jPbZ26JiRIeRLxg0cYgHXT-69RZaHCOpFWKIiU2yVUPVpQ6y3vwgyg5Xicvq",
  },
  {
    id: "4",
    title: "Sunset Half-Marathon",
    price: 30,
    date: "Jan 12",
    location: "Miami, FL",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB5dpGnaRlRSdA9G2cM56d3Zxg5SsT5AO0uU63eQOuz7_ymlvfge2DCQJcgA5Awjz1xrysFHBdpQKv-zFCP5Dob1C4qdmUuzxFfdyYkK6Wuc2FME1ki7aGW9IfiLigRJu4FSGlQLgXeFJllmhZW5o8vVfqLm77O6_W-Vg3VpoKguDjcPqmRZRCbT-7KhtP70AlUWIiL_mqhZV0abieoFG4w6NEVQMrWiDUAgwWocvQ0gww5Vh8YQuVYU9dRnqSRI4w7G_8yaXUPHAe8",
  },
  {
    id: "5",
    title: "Founders & Funders Mixer",
    price: 0,
    date: "Oct 30",
    location: "Palo Alto, CA",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAs4dGHAYP3X0qchnCKGYO2qPsoxfZMnPo0T5qbt3lK0J4TtFpH90_HksM3M5W8_P6qWQuY2KpKOOYpe05gOm-CD7uCpBu_rw0FxDA5O3GmRk_Pp4rwX1AphVEQp-dRHG7ZjdNPaVhj1TIXHVCzrdgW4KQekNPqrrZOd8bUenHEFBR55UiKmlbVwuoNQ9Wph_bsFNH-DMau0ihTlYpSPIpzUOMLTjXeq61RiY2jS_0iLhc1G3ne-jNzZZCryvfON6NJQZaIS1imLJT4",
  },
  {
    id: "6",
    title: "Midnight Jazz & Blues",
    price: 60,
    date: "Nov 22",
    location: "Chicago, IL",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBwRHmvoT_d4Vy4SobGnlp0GzgYPWL2ACwjxlgvim7i7oWPOILd7CEFM9ekJEY0TvNiLGwzTr4ETahFHCOpFWKIiU2yVUPVpQ6y3vwgyg5Xicvq",
    tag: "Selling Fast",
  },
];

const CATEGORIES = [
  { name: "Concerts", icon: "music_note", color: "bg-primary-container text-on-primary-container" },
  { name: "Workshops", icon: "brush", color: "bg-surface-container-low" },
  { name: "Tech", icon: "terminal", color: "bg-surface-container-low" },
  { name: "Sports", icon: "sports_soccer", color: "bg-surface-container-low" },
  { name: "Arts", icon: "palette", color: "bg-surface-container-low" },
  { name: "Networking", icon: "groups", color: "bg-surface-container-low" },
];

export const metadata = {
  title: "Events – The Guest Gallery",
  description: "Browse and discover curated events, workshops, concerts, and experiences near you.",
};

export default async function EventsPage() {
  // Use the server action layer instead of direct DB access
  const result = await getAdminEvents({ status: "published" });
  const dbEvents = result.success ? result.data : [];

  // Map DB events to EventCard format, fall back to mocks if DB is empty
  const events =
    dbEvents.length > 0
      ? dbEvents.map((e: any) => ({
          id: e._id.toString(),
          title: e.title,
          price: e.ticketTypes?.[0]?.price || 0,
          date: new Date(e.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
          location: e.locationName || "TBD",
          imageUrl:
            e.imageUrl ||
            "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=2070",
          tag: e.category === "tech" ? "New" : undefined,
        }))
      : MOCK_EVENTS;

  return (
    <div className="max-w-[1440px] mx-auto px-6 md:px-10 pt-12 pb-24 border-t border-outline-variant/10">
      {/* Search & Discover header */}
      <section className="mb-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <h1 className="text-4xl md:text-5xl font-extrabold font-headline tracking-tight text-on-background">
              Find your next experience
            </h1>
            <p className="text-on-surface-variant text-lg font-body">
              Curated events for the curious and the creative.
            </p>
          </div>

          <div className="relative group">
            <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-full flex items-center p-2 shadow-xl shadow-primary/5 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
              <span className="material-symbols-outlined ml-4 text-on-surface-variant">search</span>
              <input
                className="w-full bg-transparent border-none focus:ring-0 px-4 py-3 text-on-surface placeholder:text-outline/60 text-lg font-body"
                placeholder="Search events, cities, or organizers..."
                type="search"
              />
              <button
                type="button"
                className="bg-primary text-on-primary px-8 py-3 rounded-full font-bold text-base hover:bg-primary-dim transition-colors mr-1"
              >
                Search
              </button>
            </div>
          </div>

          {/* Category chips */}
          <div className="flex flex-wrap justify-center gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.name}
                type="button"
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-sm transition-all hover:brightness-95 ${cat.color}`}
              >
                <span className="material-symbols-outlined text-[18px]">{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Event grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {events.map(
          (event: {
            id: string;
            title: string;
            price: number;
            date: string;
            location: string;
            imageUrl: string;
            tag?: string;
          }) => (
            <EventCard key={event.id} {...event} />
          )
        )}
      </section>

      {/* Load more */}
      <div className="mt-20 flex flex-col items-center gap-6">
        <button
          type="button"
          className="px-10 py-4 border-2 border-primary text-primary font-bold rounded-full hover:bg-primary-container/30 transition-all active:scale-95"
        >
          Discover More Events
        </button>
        <p className="text-on-surface-variant text-sm font-medium font-body">
          Showing {events.length} upcoming events
        </p>
      </div>
    </div>
  );
}
