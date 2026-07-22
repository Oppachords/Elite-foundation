import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useProjects } from "@/lib/use-site-content";
import { Reveal } from "@/components/ui-bits";

const STATUS_STYLE: Record<string, string> = {
  Upcoming: "bg-accent/15 text-accent",
  Ongoing: "bg-primary/15 text-primary",
  Completed: "bg-[color:var(--brand-brown)]/15 text-[color:var(--brand-brown-dark)]",
};

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Elite Foundation" },
      { name: "description", content: "Explore Elite Foundation's ongoing, upcoming and completed projects across Uganda." },
      { property: "og:title", content: "Our Projects" },
      { property: "og:description", content: "Field projects with real budgets, real progress, and real people." },
      { property: "og:url", content: "/projects" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const projects = useProjects();
  return (
    <div>
      <section className="py-20 bg-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-extrabold max-w-3xl">Every project is a promise kept.</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">Transparent budgets, measurable progress, and stories from the ground.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-8 md:grid-cols-2">
          {projects.map((p, i) => {
            const pct = Math.round((p.raised / p.budget) * 100);
            return (
              <Reveal key={p.slug} delay={i * 0.05}>
                <article className="group h-full rounded-3xl overflow-hidden bg-card border border-border hover:shadow-elegant transition-all">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img src={p.hero} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                    <span className={`absolute top-4 left-4 text-xs font-semibold uppercase tracking-wider rounded-full px-3 py-1 ${STATUS_STYLE[p.status]}`}>{p.status}</span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" /> {p.location}
                    </div>
                    <h3 className="mt-2 text-2xl font-extrabold">{p.title}</h3>
                    <p className="mt-2 text-muted-foreground">{p.description}</p>
                    <div className="mt-5">
                      <div className="flex justify-between text-sm font-medium mb-1.5">
                        <span className="text-foreground font-semibold">${p.raised.toLocaleString()} raised</span>
                        <span className="text-muted-foreground">of ${p.budget.toLocaleString()}</span>
                      </div>
                      <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                        <motion.div initial={{ width: 0 }} whileInView={{ width: `${pct}%` }} viewport={{ once: true }} transition={{ duration: 1 }} className="h-full bg-gradient-brand" />
                      </div>
                    </div>
                    {p.gallery.length > 1 && (
                      <div className="mt-4 flex gap-2">
                        {p.gallery.slice(1, 4).map((g, gi) => (
                          <img key={gi} src={g} alt="" className="h-16 w-20 object-cover rounded-lg" loading="lazy" />
                        ))}
                      </div>
                    )}
                    <div className="mt-5 flex gap-3">
                      <Link to="/donate" className="flex-1 text-center rounded-full bg-accent text-accent-foreground px-5 py-2.5 font-semibold hover:brightness-105">Donate</Link>
                      <Link to="/volunteer" className="flex-1 text-center rounded-full border border-border px-5 py-2.5 font-semibold hover:bg-secondary">Volunteer</Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>
    </div>
  );
}
