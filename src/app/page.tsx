import { getFeaturedEvents } from "@/lib/actions/event-actions";
import { Hero } from "@/components/landing/Hero";
import { SearchBar } from "@/components/landing/SearchBar";
import { Categories } from "@/components/landing/Categories";
import { FeaturedEvents } from "@/components/landing/FeaturedEvents";
import { Features } from "@/components/landing/Features";
import { Newsletter } from "@/components/landing/Newsletter";
import { PublicHeader } from "@/components/ui/PublicHeader";
import { getSession } from "@/lib/auth";

export default async function LandingPage() {
  const session = await getSession();
  const featuredResult = await getFeaturedEvents();
  const featuredEvents = featuredResult.success ? featuredResult.data : [];

  return (
    <div className="min-h-screen bg-white">
      <PublicHeader user={session?.user} />
      
      <main>
        <Hero />
        
        <div className="relative z-30 -mt-16 max-w-4xl mx-auto px-6">
          <SearchBar />
        </div>

        <div className="mt-24">
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
    </div>
  );
}
