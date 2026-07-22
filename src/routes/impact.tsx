import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { COMMUNITIES, COMMUNITIES_SERVED, PAGE_HERO_IMAGES } from "@/lib/site-data";
import { CountUp, Reveal, SectionHeader, PageHero } from "@/components/ui-bits";

const IMPACT_NUMBERS = [
  { label: "Children Supported", value: 100 },
  { label: "Families Fed", value: 160 },
  { label: "Youth Trained", value: 52 },
  { label: "Medical Outreaches", value: 3 },
  { label: "Volunteers", value: 20 },
  { label: "Communities Reached", value: 5 },
];

export const Route = createFileRoute("/impact")({
  head: () => ({
    meta: [
      { title: "Impact — Elite Foundation" },
      { name: "description", content: "Communities served by Elite Foundation across Iganga, Kaliro and Kampala, Uganda." },
      { property: "og:title", content: "Our Impact" },
      { property: "og:description", content: "See where Elite Foundation is active and who we serve." },
      { property: "og:url", content: "/impact" },
    ],
    links: [{ rel: "canonical", href: "/impact" }],
  }),
  component: ImpactPage,
});

function ImpactPage() {
  const [hover, setHover] = useState<string | null>(null);
  return (
    <div>
      <PageHero images={PAGE_HERO_IMAGES.impact} alt="Elite Foundation impact across Uganda">
        <h1 className="text-5xl md:text-6xl font-extrabold max-w-3xl">Impact you can count.</h1>
        <p className="mt-4 text-lg text-white/90 max-w-2xl">Founded in April 2023, we serve vulnerable communities across Iganga, Kaliro, and Kampala.</p>
      </PageHero>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-3 gap-6">
          {IMPACT_NUMBERS.map((n, i) => (
            <Reveal key={n.label} delay={i * 0.04}>
              <div className="rounded-2xl bg-card border border-border p-6 text-center hover:shadow-elegant transition-all">
                <div className="text-4xl md:text-5xl font-extrabold text-gradient-brand">
                  <CountUp end={n.value} suffix="+" />
                </div>
                <div className="mt-2 text-sm text-muted-foreground uppercase tracking-wider">{n.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-16 bg-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Who we serve" title="Communities served" />
          <ul className="grid gap-3 md:grid-cols-2 max-w-4xl mx-auto">
            {COMMUNITIES_SERVED.map((item, i) => (
              <Reveal key={item} delay={i * 0.05}>
                <li className="rounded-xl bg-card border border-border px-5 py-4 text-foreground/90">{item}</li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Locations" title="Where our work happens" description="Hover a location to learn more." />
          <div className="relative mx-auto max-w-3xl aspect-[4/5] rounded-3xl bg-card border border-border p-6 shadow-sm">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path
                d="M20 20 Q35 12 55 15 Q75 18 82 30 Q88 45 82 60 Q78 75 65 82 Q50 88 35 82 Q20 76 15 60 Q10 42 20 20 Z"
                fill="oklch(0.95 0.02 80)"
                stroke="var(--brand-blue)"
                strokeWidth="0.5"
              />
              {COMMUNITIES.map((c) => (
                <g
                  key={c.name}
                  onMouseEnter={() => setHover(c.name)}
                  onMouseLeave={() => setHover(null)}
                  className="cursor-pointer"
                >
                  <motion.circle cx={c.x} cy={c.y} r="3" fill="var(--brand-orange)" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }} />
                  <circle cx={c.x} cy={c.y} r="5" fill="var(--brand-orange)" opacity="0.3" className="animate-ping" />
                  <text x={c.x + 5} y={c.y + 1.5} fontSize="3.2" fill="var(--brand-brown-dark)" fontWeight="700">{c.name}</text>
                </g>
              ))}
            </svg>
            {hover && (
              <div className="absolute top-6 right-6 rounded-xl bg-primary text-primary-foreground px-4 py-3 shadow-elegant text-sm max-w-xs">
                {(() => {
                  const c = COMMUNITIES.find((x) => x.name === hover)!;
                  return (
                    <>
                      <div className="font-bold">{c.name}</div>
                      <div className="text-white/85 text-xs mt-1">{c.detail}</div>
                    </>
                  );
                })()}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
