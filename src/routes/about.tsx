import { createFileRoute } from "@tanstack/react-router";
import { Heart, ShieldCheck, Users, Sun, HandHeart, Sparkles, Lightbulb, ClipboardCheck, Target, Eye, Calendar, MapPin } from "lucide-react";
import { CORE_VALUES, TEAM, HERO_IMAGES, MISSION, VISION, COMMUNITIES_SERVED } from "@/lib/site-data";
import { Reveal, SectionHeader } from "@/components/ui-bits";

const ICONS: Record<string, typeof Heart> = { Heart, ShieldCheck, Users, Sun, HandHeart, Sparkles, Lightbulb, ClipboardCheck };

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Elite Foundation" },
      { name: "description", content: "Founded 4 April 2023 in Kampala, Elite Foundation empowers vulnerable Ugandan communities through outreach, education, and healthcare." },
      { property: "og:title", content: "About Elite Foundation" },
      { property: "og:description", content: "Our mission, vision, values, and the team building hope across Uganda." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  return (
    <div>
      <section className="relative py-24 bg-gradient-brand text-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-xs uppercase tracking-[0.25em] text-white/80">About Us</div>
            <h1 className="mt-3 text-5xl md:text-6xl font-extrabold max-w-3xl">People-first. Community-led. Uganda-rooted.</h1>
            <p className="mt-5 max-w-2xl text-white/90 text-lg">
              Elite Foundation empowers vulnerable communities in Uganda through outreach, education,
              health services, and youth empowerment — founded 4 April 2023 in Kampala.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2"><Calendar className="h-4 w-4" /> Founded 4 April 2023</span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2"><MapPin className="h-4 w-4" /> Kampala, Uganda</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8">
          <Reveal>
            <div className="h-full rounded-2xl bg-card border border-border p-10 shadow-sm">
              <Target className="h-10 w-10 text-primary" />
              <h2 className="mt-4 text-3xl font-extrabold">Mission</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed text-lg">
                {MISSION}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-2xl bg-gradient-warm text-white p-10 shadow-warm">
              <Eye className="h-10 w-10" />
              <h2 className="mt-4 text-3xl font-extrabold">Vision</h2>
              <p className="mt-4 leading-relaxed text-lg text-white/95">
                {VISION}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Collage */}
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {HERO_IMAGES.map((src, i) => (
              <Reveal key={src} delay={i * 0.05}>
                <img src={src} alt="Community" className="w-full h-48 md:h-64 object-cover rounded-2xl" loading="lazy" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Communities served */}
      <section className="py-24 bg-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Reach" title="Communities we serve" />
          <ul className="grid gap-3 md:grid-cols-2 max-w-3xl">
            {COMMUNITIES_SERVED.map((item, i) => (
              <Reveal key={item} delay={i * 0.05}>
                <li className="rounded-xl bg-card border border-border px-5 py-4">{item}</li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Core Values" title="What we stand on." />
          <div className="grid gap-5 grid-cols-2 md:grid-cols-4">
            {CORE_VALUES.map((v, i) => {
              const Icon = ICONS[v.icon] ?? Heart;
              return (
                <Reveal key={v.title} delay={i * 0.04}>
                  <div className="rounded-2xl bg-card border border-border p-6 text-center hover:-translate-y-1 hover:shadow-elegant transition-all">
                    <div className="mx-auto h-12 w-12 rounded-xl bg-gradient-brand flex items-center justify-center">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="mt-3 font-bold">{v.title}</div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Our Team" title="The people behind the work" />
          <div className="grid gap-8 grid-cols-2 md:grid-cols-4">
            {TEAM.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.05}>
                <div className="text-center">
                  <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-brand flex items-center justify-center">
                    {m.image ? (
                      <img src={m.image} alt={m.name} className="w-full h-full object-cover" loading="lazy" />
                    ) : (
                      <div className="text-white text-5xl font-extrabold">{m.initials}</div>
                    )}
                  </div>
                  <div className="mt-4 font-bold text-lg">{m.name}</div>
                  <div className="text-sm text-muted-foreground">{m.role}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
