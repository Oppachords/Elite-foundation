import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { COMMUNITIES } from "@/lib/site-data";
import { CountUp, Reveal, SectionHeader } from "@/components/ui-bits";

const IMPACT_NUMBERS = [
  { label: "Children Supported", value: 500 },
  { label: "Families Fed", value: 800 },
  { label: "Women Empowered", value: 320 },
  { label: "Youth Trained", value: 260 },
  { label: "Schools Reached", value: 18 },
  { label: "Medical Camps", value: 12 },
  { label: "Volunteers", value: 100 },
  { label: "Partner Organizations", value: 15 },
];

export const Route = createFileRoute("/impact")({
  head: () => ({
    meta: [
      { title: "Impact — Elite Foundation" },
      { name: "description", content: "Numbers, communities, and stories that show the reach of Elite Foundation across Uganda." },
      { property: "og:title", content: "Our Impact" },
      { property: "og:description", content: "See where Elite Foundation is active and how far your support reaches." },
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
      <section className="py-20 bg-gradient-brand text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-extrabold max-w-3xl">Impact you can count.</h1>
          <p className="mt-4 text-lg text-white/90 max-w-2xl">Every number is a person, a family, a village whose life has moved forward.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
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

      <section className="py-20 bg-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Communities Served" title="Where our work happens" description="Hover a location to see our footprint." />
          <div className="relative mx-auto max-w-3xl aspect-[4/5] rounded-3xl bg-card border border-border p-6 shadow-sm">
            {/* Simplified Uganda outline */}
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
              <div className="absolute top-6 right-6 rounded-xl bg-primary text-primary-foreground px-4 py-3 shadow-elegant text-sm">
                {(() => {
                  const c = COMMUNITIES.find((x) => x.name === hover)!;
                  return (
                    <>
                      <div className="font-bold">{c.name}</div>
                      <div className="text-white/85 text-xs mt-1">{c.projects} projects · {c.beneficiaries} beneficiaries</div>
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
