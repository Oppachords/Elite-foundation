import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PROGRAMS, PAGE_HERO_IMAGES } from "@/lib/site-data";
import { Reveal, SectionHeader, PageHero, CoverImage } from "@/components/ui-bits";

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title: "Programs — Elite Foundation" },
      { name: "description", content: "Feed a Family, Girls in School, Youth Skills Workshop, Medical Outreach — the programs Elite Foundation runs across Uganda." },
      { property: "og:title", content: "Our Programs" },
      { property: "og:description", content: "Sustained programs empowering vulnerable Ugandan communities." },
      { property: "og:url", content: "/programs" },
    ],
    links: [{ rel: "canonical", href: "/programs" }],
  }),
  component: ProgramsPage,
});

function ProgramsPage() {
  return (
    <div>
      <PageHero images={PAGE_HERO_IMAGES.programs} alt="Elite Foundation programs in action">
        <h1 className="text-5xl md:text-6xl font-extrabold max-w-3xl">Programs that change lives daily.</h1>
        <p className="mt-4 text-lg text-white/90 max-w-2xl">Four active initiatives, one shared purpose — practical, sustained impact for the people who need it most.</p>
      </PageHero>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          {PROGRAMS.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.05}>
              <div className={`grid md:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}>
                <div className="overflow-hidden rounded-3xl shadow-elegant">
                  <CoverImage src={p.image} alt={p.title} className="w-full h-[420px]" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-accent font-semibold">Program</div>
                  <h2 className="mt-2 text-3xl md:text-4xl font-extrabold">{p.title}</h2>
                  <p className="mt-3 text-muted-foreground text-lg">{p.short}</p>
                  <p className="mt-3 text-foreground/80 leading-relaxed">{p.long}</p>
                  <div className="mt-6">
                    <div className="flex justify-between text-sm font-medium mb-2">
                      <span className="text-muted-foreground">Funding progress</span>
                      <span className="text-primary font-semibold">{p.progress}%</span>
                    </div>
                    <div className="h-3 rounded-full bg-muted overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: `${p.progress}%` }} viewport={{ once: true }} transition={{ duration: 1 }} className="h-full bg-gradient-brand" />
                    </div>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link to="/donate" className="rounded-full bg-accent text-accent-foreground px-6 py-3 font-semibold hover:brightness-105">Donate to this program</Link>
                    <Link to="/volunteer" className="rounded-full border border-border px-6 py-3 font-semibold hover:bg-secondary">Volunteer</Link>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
