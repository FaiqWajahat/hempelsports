import { Suspense } from "react";
import QuoteHero from "./QuoteHero";
import QuoteForm from "./QuoteForm";
import QuoteBenefits from "./QuoteBenefits";

export const metadata = {
  title: "Request a Quote | Venpa Sports Manufacturing",
  description: "Request a custom manufacturing quote for boxing, MMA, and martial arts equipment from Venpa Sports.",
};

export default function QuotePage() {
  return (
    <>
      <QuoteHero />
      
      <section className="bg-zinc-50 py-16 lg:py-24 relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 -mt-32 -mr-32 h-96 w-96 rounded-full bg-[var(--color-primary)] opacity-5 blur-3xl pointer-events-none" />
        
        <div className="mx-auto max-w-7xl px-5 lg:px-8 relative z-10">
          
            
            <div className="lg:grid lg:grid-cols-12 lg:gap-8 lg:items-start max-w-7xl mx-auto">
              {/* Left/Main: Detailed Quote Form */}
              <div className="lg:col-span-8">
                <Suspense fallback={<div className="h-[600px] w-full rounded-[32px] bg-zinc-100 animate-pulse border border-zinc-200" />}>
                  <QuoteForm />
                </Suspense>
              </div>
              
              {/* Right/Sidebar: Benefits & Assurances */}
              <div className="mt-12 lg:mt-0 lg:col-span-4 lg:sticky lg:top-24">
                <QuoteBenefits />
              </div>
            </div>

          </div>
        
      </section>
    </>
  );
}
