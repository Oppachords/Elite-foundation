import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Heart, HeartHandshake, Users, GraduationCap, Stethoscope, Sprout, Quote } from "lucide-react";
import { HERO_IMAGES, STATS, FOCUS_AREAS, PROGRAMS, STORIES, MISSION, VISION } from "@/lib/site-data";
import { CountUp, Reveal, SectionHeader } from "@/components/ui-bits";

const ICONS: Record<string, typeof Heart> = { HeartHandshake, Users, GraduationCap, Stethoscope, Sprout };

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Elite Foundation — Where Hope Meets Action" },
      { name: "description", content: "Ugandan non-profit empowering vulnerable communities through outreach, education, healthcare, and youth empowerment." },
      { property: "og:title", content: "Elite Foundation — Where Hope Meets Action" },
      { property: "og:description", content: "Join us in empowering vulnerable communities across Uganda. Donate or volunteer today." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % HERO_IMAGES.length), 5000);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">
      <AnimatePresence mode="sync">
        <motion.div
          key={i}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        >
          <img src={HERO_IMAGES[i]} alt="Elite Foundation community outreach" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--brand-brown-dark)]/85 via-[color:var(--brand-brown-dark)]/60 to-[color:var(--brand-blue)]/70" />
        </motion.div>
      </AnimatePresence>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 text-white">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-4 py-1.5 text-xs font-semibold uppercase tracking-widest">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" /> Kampala, Uganda · Since 2023
          </span>
          <h1 className="mt-6 text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05]">
            Where Hope <span className="text-accent">Meets Action</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/85 max-w-2xl leading-relaxed">
            Empowering vulnerable communities through education, health services, youth empowerment,
            and sustainable outreach across Uganda.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/donate" className="inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-7 py-3.5 font-semibold shadow-warm hover:scale-105 transition-transform">
              <Heart className="h-5 w-5" fill="currentColor" /> Donate Now
            </Link>
            <Link to="/volunteer" className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur border border-white/30 text-white px-7 py-3.5 font-semibold hover:bg-white/25 transition-colors">
              Become a Volunteer <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl">
          {STATS.map((s, idx) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + idx * 0.1 }} className="rounded-2xl bg-white/10 backdrop-blur border border-white/20 px-5 py-6">
              <div className="text-3xl md:text-4xl font-extrabold text-accent">
                <CountUp end={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-xs md:text-sm uppercase tracking-wider text-white/85">{s.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {HERO_IMAGES.map((_, idx) => (
            <button key={idx} onClick={() => setI(idx)} aria-label={`Slide ${idx + 1}`} className={`h-1.5 rounded-full transition-all ${idx === i ? "w-8 bg-accent" : "w-3 bg-white/40"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Home() {
  return (
    <div>
      <Hero />

      {/* Mission strip */}
      <section className="py-20 bg-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Our Mission</div>
            <h2 className="mt-3 text-3xl md:text-5xl font-extrabold text-foreground">Where hope meets action.</h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              {MISSION}
            </p>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed italic">
              Our vision: {VISION}
            </p>
            <div className="mt-8 flex gap-4">
              <Link to="/about" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 font-semibold hover:brightness-110 transition">
                Our Story <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="grid grid-cols-2 gap-3">
              {HERO_IMAGES.slice(0, 4).map((src, i) => (
                <img key={i} src={src} alt="Community work" className={`rounded-2xl object-cover w-full ${i % 2 === 0 ? "h-56 mt-8" : "h-56"} shadow-elegant`} loading="lazy" />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Focus areas */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Core Focus Areas" title="Five pillars. One vision." description="Every program we run advances one of these long-term commitments to Ugandan communities." />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FOCUS_AREAS.map((f, idx) => {
              const Icon = ICONS[f.icon] ?? Heart;
              return (
                <Reveal key={f.title} delay={idx * 0.05}>
                  <div className="group h-full rounded-2xl border border-border bg-card p-8 hover:shadow-elegant hover:-translate-y-1 transition-all">
                    <div className="h-14 w-14 rounded-xl bg-gradient-brand flex items-center justify-center shadow-warm group-hover:scale-110 transition-transform">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="mt-5 text-xl font-bold text-foreground">{f.title}</h3>
                    <p className="mt-2 text-muted-foreground leading-relaxed">{f.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Programs preview */}
      <section className="py-24 bg-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Programs" title="Ongoing programs & initiatives" description="Active work in Iganga, Kaliro, and Kampala." />
          <div className="grid gap-8 md:grid-cols-2">
            {PROGRAMS.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.05}>
                <div className="group overflow-hidden rounded-2xl bg-card border border-border hover:shadow-elegant transition-all">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold">{p.title}</h3>
                    <p className="mt-2 text-muted-foreground">{p.short}</p>
                    <div className="mt-4">
                      <div className="flex justify-between text-xs font-medium mb-1.5">
                        <span className="text-muted-foreground">Funding progress</span>
                        <span className="text-primary font-semibold">{p.progress}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <motion.div initial={{ width: 0 }} whileInView={{ width: `${p.progress}%` }} viewport={{ once: true }} transition={{ duration: 1.1, ease: "easeOut" }} className="h-full bg-gradient-brand rounded-full" />
                      </div>
                    </div>
                    <div className="mt-5 flex gap-3">
                      <Link to="/programs" className="text-sm font-semibold text-primary hover:underline">Read more →</Link>
                      <Link to="/donate" className="ml-auto text-sm font-semibold rounded-full bg-accent text-accent-foreground px-4 py-2 hover:brightness-105">Donate</Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stories */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Stories of Hope" title="Real people. Real change." />
          <div className="grid gap-6 md:grid-cols-3">
            {STORIES.map((s, i) => (
              <Reveal key={s.name} delay={i * 0.08}>
                <div className="h-full rounded-2xl overflow-hidden bg-card border border-border shadow-sm hover:shadow-elegant transition-all">
                  <img src={s.image} alt={s.name} className="w-full h-56 object-cover" loading="lazy" />
                  <div className="p-6">
                    <Quote className="h-6 w-6 text-accent mb-3" />
                    <p className="text-foreground/90 italic leading-relaxed">"{s.quote}"</p>
                    <div className="mt-4 border-t border-border pt-3">
                      <div className="font-semibold">{s.name}</div>
                      <div className="text-xs text-muted-foreground">{s.role}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Big CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-brand" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-extrabold">Your hand can change a life today.</h2>
          <p className="mt-4 text-lg text-white/90">Donate, volunteer, or partner with us — every act of hope compounds.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/donate" className="rounded-full bg-white text-primary px-8 py-3.5 font-semibold hover:scale-105 transition-transform">Donate Now</Link>
            <Link to="/partners" className="rounded-full border border-white/60 px-8 py-3.5 font-semibold hover:bg-white/10 transition">Partner With Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
