import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased">
      {/* Navigation */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-slate-200 dark:border-slate-800 bg-background-light dark:bg-background-dark px-6 py-4 lg:px-20 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="text-primary">
            <span className="material-symbols-outlined text-4xl">deployed_code</span>
          </div>
          <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-tight">EventLogix</h2>
        </div>
        <div className="flex flex-1 justify-end gap-8 items-center">
          <nav className="hidden md:flex items-center gap-8">
            <Link className="text-slate-700 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors" href="#mission">Mission</Link>
            <Link className="text-slate-700 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors" href="#benefits">Benefits</Link>
            <Link className="text-slate-700 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors" href="#process">Process</Link>
          </nav>
          <button className="flex min-w-[100px] cursor-pointer items-center justify-center rounded-lg h-10 px-5 bg-primary text-white text-sm font-bold tracking-wide hover:bg-primary/90 transition-all">
            <span>Apply Now</span>
          </button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-8 order-2 lg:order-1">
              <div className="flex flex-col gap-4">
                <span className="inline-flex w-fit px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">Join the Elite Crew</span>
                <h1 className="text-slate-900 dark:text-white text-5xl lg:text-6xl font-black leading-tight tracking-tight">
                  Power the World's Best Events
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-xl">
                  Join our elite logistics team. Gain world-class experience, build your network, and earn rewards while making magic happen behind the scenes at the most prestigious festivals and conferences.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <button className="flex min-w-[200px] cursor-pointer items-center justify-center rounded-xl h-14 px-8 bg-primary text-white text-base font-bold tracking-wide hover:shadow-lg hover:shadow-primary/20 transition-all">
                  <span>Start Your Application</span>
                </button>
                <button className="flex min-w-[160px] cursor-pointer items-center justify-center rounded-xl h-14 px-8 border-2 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-base font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                  <span>View Open Roles</span>
                </button>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  alt="Modern event production background" 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVfd-kF5FAFjikw3vpZANUoD_QM5x6xtOO-Nbxgw_IuYSVOdebIfn8dtSaByTcApxIDH6JgJ7OnLhuBdNqdL91OdpS6aXWnbeD3UaJBAKMBDUG-rqxsMoHN5g-Cg2kLoUO6W0hqFwVlnNc3W-GZWZnNThVQ8lxbT95bRJdeG7PGTQz31DVNRj-mMaEzHDPdZrqGNLkgGTpAzHisrBEam0CAmQcnz28UVX1NMw7msDvE6mULmm3r_XhRhYqiZELjcfksaHoKD4UR20f"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark/60 to-transparent"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: "Events Managed", val: "1,200+" },
              { label: "Active Volunteers", val: "50,000+" },
              { label: "Global Cities", val: "85" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col gap-2 rounded-2xl p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold uppercase tracking-wider">{stat.label}</p>
                <p className="text-slate-900 dark:text-white text-4xl font-black leading-tight">{stat.val}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Join Section */}
        <section className="max-w-7xl mx-auto px-6 py-20" id="benefits">
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-4 text-center max-w-2xl mx-auto">
              <h2 className="text-slate-900 dark:text-white text-4xl lg:text-5xl font-black tracking-tight">Why Join EventLogix?</h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg">We provide more than just a temporary role; we provide a career-launching experience with tangible benefits.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: "hub", title: "Professional Networking", desc: "Connect with industry leaders, top-tier vendors, and fellow professionals from across the globe." },
                { icon: "card_giftcard", title: "Exclusive Rewards", desc: "Earn points for every shift redeemable for VIP concert tickets, travel vouchers, and limited-edition gear." },
                { icon: "trending_up", title: "Skill Development", desc: "Get certified in event safety, logistics management, and on-site coordination through our workshops." },
              ].map((benefit, i) => (
                <div key={i} className="flex flex-col gap-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 hover:border-primary transition-colors group">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                    <span className="material-symbols-outlined text-3xl">{benefit.icon}</span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-slate-900 dark:text-white text-xl font-bold">{benefit.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="bg-slate-900 text-white py-24" id="mission">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                alt="Collaborative team environment" 
                className="rounded-2xl shadow-2xl" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCp8m6BF0qSiss7Jsc43ZNO-CN_8z6LFRUG-ipd0U00JjhJ_nJmILnR4hvKV8uAvFDbXq0vnSHeooAS5WwYhfo9LVKBiaHmD9qF7LWKTDpie4UkEfFPneWrjjP1VcpGP_r6RsQQAG7rgnYllXWrMVw89XlNzsrK37SfWrQ8cdmtsAAVxY5Ao7Yx65U_5av2sxmt0yB7HDFbcjDM609eUliwdgS0M1_Ko-UPAJ4nh2PGxItMGcfj_8zkFXzT6NOjSGh7MZdTntk4g6Xm"
              />
              <div className="absolute -bottom-6 -right-6 bg-primary p-8 rounded-2xl hidden md:block">
                <p className="text-3xl font-bold">100%</p>
                <p className="text-sm opacity-80 uppercase tracking-widest">Commitment</p>
              </div>
            </div>
            <div className="flex flex-col gap-8">
              <h2 className="text-4xl lg:text-5xl font-black tracking-tight leading-tight">Our Mission is the Magic Behind the Moments</h2>
              <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
                <p>We believe that every world-class event is built on a foundation of seamless execution. Our mission is to empower the hidden heroes of the event industry with the tools, community, and support they need to excel.</p>
                <p>From Coachella to Davos, we provide the human infrastructure that allows visionaries to create experiences that change lives.</p>
              </div>
              <div className="flex flex-col gap-4">
                {[
                  "Empowering local talent through global opportunities",
                  "Building a sustainable and fair gig-economy for event staff",
                  "Pioneering new standards in safety and operational excellence",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-primary">check_circle</span>
                    <p className="font-semibold text-white">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Onboarding Flow / Journey */}
        <section className="max-w-7xl mx-auto px-6 py-20" id="process">
          <h2 className="text-slate-900 dark:text-white text-3xl font-black mb-16 text-center">Your Journey to the Main Stage</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 dark:bg-slate-800 -z-10 translate-y-[-24px]"></div>
            {[
              { step: 1, title: "Quick Apply", desc: "Complete your profile in under 5 minutes." },
              { step: 2, title: "Vetting", desc: "Brief interview and background check for safety." },
              { step: 3, title: "Training", desc: "Online orientation and safety protocol briefing." },
              { step: 4, title: "Go Live", desc: "Pick your first shift and start earning rewards." },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-6">
                <div className="size-16 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-primary/30 z-10">{item.step}</div>
                <div className="flex flex-col gap-2">
                  <h4 className="font-bold text-slate-900 dark:text-white">{item.title}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="bg-primary rounded-[2rem] p-12 lg:p-20 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-20 -mr-20 size-80 rounded-full bg-white/10 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 size-80 rounded-full bg-white/5 blur-3xl"></div>
            <div className="relative z-10 max-w-3xl mx-auto flex flex-col gap-8">
              <h2 className="text-4xl lg:text-6xl font-black leading-tight">Ready to make magic happen?</h2>
              <p className="text-xl text-white/80 leading-relaxed">Join 50,000+ staff members worldwide. Your career in event logistics starts today.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
                <Link 
                  href="/dashboard"
                  className="bg-white text-primary px-10 py-5 rounded-xl font-black text-lg hover:bg-slate-50 transition-all hover:scale-105 active:scale-95 inline-flex items-center justify-center"
                >
                  Create Staff Account
                </Link>
                <button className="bg-primary/20 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-xl font-black text-lg hover:bg-primary/30 transition-all active:scale-95">
                  Partner with Us
                </button>
              </div>
              <p className="text-sm text-white/60">No experience required for entry-level roles. Training provided.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-background-light dark:bg-background-dark border-t border-slate-200 dark:border-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="text-primary">
                <span className="material-symbols-outlined text-3xl">deployed_code</span>
              </div>
              <h2 className="text-slate-900 dark:text-white text-xl font-bold tracking-tight">EventLogix</h2>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">The global standard for event workforce management and logistics excellence.</p>
            <div className="flex gap-4">
              <a className="text-slate-400 hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">public</span></a>
              <a className="text-slate-400 hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">mail</span></a>
            </div>
          </div>
          <div>
            <h4 className="text-slate-900 dark:text-white font-bold mb-6">Opportunities</h4>
            <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400">
              <li><Link className="hover:text-primary transition-colors" href="#">Volunteer Roles</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">Technical Crew</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">Site Management</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">Hospitality Staff</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-slate-900 dark:text-white font-bold mb-6">Resources</h4>
            <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400">
              <li><Link className="hover:text-primary transition-colors" href="#">Training Center</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">Safety Protocols</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">Gear Store</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">Reward Catalog</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-slate-900 dark:text-white font-bold mb-6">Locations</h4>
            <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400">
              <li><Link className="hover:text-primary transition-colors" href="#">North America</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">Europe & UK</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">Asia Pacific</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">Middle East</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500">
          <p>© 2024 EventLogix Global Logistics Inc. All rights reserved. Built for the creators.</p>
        </div>
      </footer>
    </div>
  );
}
