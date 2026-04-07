import React from 'react';
import Link from 'next/link';

const faqs = [
  {
    category: "Ticketing",
    questions: [
      { q: "How do I retrieve my QR code?", a: "Your QR code is available in your User Dashboard under 'My Tickets'. It is also sent to your registered email immediately after payment." },
      { q: "Can I transfer my ticket?", a: "Ticket transfers are managed by the event organizer. Please see the 'Terms of Participation' on the checkout page for specific event policies." },
      { q: "What is the refund protocol?", a: "Refunds are processed within 5-7 business days if requested 48 hours prior to the event start time." }
    ]
  },
  {
    category: "Staffing",
    questions: [
      { q: "When do I get paid for a shift?", a: "Payments are processed every Friday for all completed shifts from the previous week. Check your 'Earnings' tab for details." },
      { q: "What is a 'Verified Provider'?", a: "Verified Providers have passed our background and skills audit. This status is required to apply for high-value executive roles." },
      { q: "How do I cancel a shift?", a: "Shifts can be cancelled via the Staff Portal up to 24 hours in advance without penalty." }
    ]
  }
];

export default function SupportPage() {
  return (
    <main className="bg-surface min-h-screen text-on-surface font-body animate-in fade-in duration-1000">
      {/* Hero Section */}
      <section className="relative py-24 px-10 text-center overflow-hidden border-b border-outline-variant/10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10" />
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-high rounded-full border border-outline-variant/20 shadow-sm mb-4">
             <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
             <span className="text-[10px] font-black uppercase tracking-widest text-[#909190]">Systems: Operational</span>
          </div>
          <h1 className="text-6xl font-black tracking-tighter font-headline italic leading-[1.1]">
            How can we <span className="text-primary italic">accelerate</span> your experience?
          </h1>
          <p className="text-on-surface-variant font-medium text-lg max-w-2xl mx-auto leading-relaxed">
            Welcome to the Event Logix Support Hub. From ticketing inquiries to logistics coordination, our strategic team is here to assist.
          </p>
          
          <div className="pt-10 flex flex-wrap justify-center gap-4">
            <Link 
              href="/login" 
              className="px-10 py-4 bg-primary text-on-primary rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
            >
              Access Dashboard
            </Link>
            <button className="px-10 py-4 bg-surface-container-high text-on-surface rounded-2xl font-black uppercase tracking-widest text-xs border border-outline-variant/20 hover:bg-surface-bright transition-all">
              Live Chat Simulator
            </button>
          </div>
        </div>
      </section>

      {/* FAQ & Contact Grid */}
      <section className="max-w-[1440px] mx-auto px-10 py-24 grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* FAQs */}
        <div className="lg:col-span-8 space-y-16">
          <div className="space-y-4">
            <h2 className="text-4xl font-black tracking-tighter font-headline italic">Strategic Guidance</h2>
            <div className="h-1 w-24 bg-primary rounded-full" />
          </div>

          <div className="space-y-12">
            {faqs.map((group) => (
              <div key={group.category} className="space-y-8">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-on-surface-variant/40 border-b border-outline-variant/10 pb-4">
                  {group.category} PROTOCOLS
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {group.questions.map((faq) => (
                    <div key={faq.q} className="p-8 rounded-[2.5rem] bg-surface-container-low border border-outline-variant/10 hover:border-primary/20 transition-all group">
                      <h4 className="font-headline font-extrabold text-lg text-on-surface mb-3 group-hover:text-primary transition-colors leading-tight italic">
                        {faq.q}
                      </h4>
                      <p className="text-on-surface-variant text-sm leading-relaxed font-medium">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Hub */}
        <aside className="lg:col-span-4 space-y-10">
          <div className="p-10 rounded-[3rem] bg-surface-container-lowest border border-outline-variant/20 shadow-[0_20px_50px_rgba(0,0,0,0.05)] sticky top-32">
             <h3 className="text-sm font-black uppercase tracking-widest text-on-surface mb-8 italic flex items-center gap-2">
               <span className="material-symbols-outlined text-sm text-primary">headset_mic</span>
               Direct Human Contact
             </h3>
             <div className="space-y-6">
                <div className="group cursor-pointer">
                   <p className="text-[10px] font-black uppercase text-on-surface-variant tracking-wider mb-2">Priority Support</p>
                   <p className="font-headline font-extrabold text-xl text-primary underline underline-offset-4 group-hover:text-primary-dim transition-colors">support@eventlogix.io</p>
                </div>
                <div className="group cursor-pointer">
                   <p className="text-[10px] font-black uppercase text-on-surface-variant tracking-wider mb-2">Social Inquiries</p>
                   <p className="font-headline font-extrabold text-xl text-on-surface group-hover:text-primary transition-colors">@eventlogix_hq</p>
                </div>
                
                <div className="pt-8 space-y-4">
                  <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10">
                    <p className="text-xs font-bold text-on-surface leading-normal italic">
                      "Executive assistance is currently processing requests from <span className="text-primary">Q1 Symposium</span> delegates."
                    </p>
                  </div>
                  <button className="w-full py-4 bg-outline-variant/10 text-on-surface-variant rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-outline-variant/20 transition-all">
                    <span className="material-symbols-outlined text-sm">schedule</span>
                    Operating: 09:00 - 18:00 EST
                  </button>
                </div>
             </div>
          </div>
        </aside>
      </section>

      {/* Final Call */}
      <section className="py-24 px-10 text-center bg-surface-container-lowest border-t border-screen-variant/10">
         <div className="max-w-2xl mx-auto space-y-8">
            <h2 className="text-3xl font-black font-headline italic leading-tight">Couldn't find the answer in our Strategic Guidance?</h2>
            <button className="px-12 py-5 bg-on-surface text-surface rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-2xl hover:scale-105 active:scale-95 transition-all">
               Initialize Incident Ticket
            </button>
         </div>
      </section>
    </main>
  );
}
