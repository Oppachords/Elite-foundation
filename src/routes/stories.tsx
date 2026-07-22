import { createFileRoute } from "@tanstack/react-router";
import { Quote } from "lucide-react";
import { STORIES } from "@/lib/site-data";
import { Reveal } from "@/components/ui-bits";

export const Route = createFileRoute("/stories")({
  head: () => ({
    meta: [
      { title: "Stories of Hope — Elite Foundation" },
      { name: "description", content: "Testimonials from beneficiaries and volunteers of Elite Foundation." },
      { property: "og:title", content: "Stories of Hope" },
      { property: "og:description", content: "The people we serve, in their own words." },
      { property: "og:url", content: "/stories" },
    ],
    links: [{ rel: "canonical", href: "/stories" }],
  }),
  component: StoriesPage,
});

function StoriesPage() {
  return (
    <div>
      <section className="py-20 bg-gradient-warm text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-extrabold max-w-3xl">Stories that keep us going.</h1>
          <p className="mt-4 text-lg text-white/90 max-w-2xl">The people we serve — in their own words.</p>
        </div>
      </section>
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
          {STORIES.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.05}>
              <article className={`grid md:grid-cols-5 gap-8 items-center ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}>
                <img src={s.image} alt={s.name} className="md:col-span-2 w-full h-80 md:h-96 object-cover rounded-3xl shadow-elegant" loading="lazy" />
                <div className="md:col-span-3">
                  <Quote className="h-10 w-10 text-accent" />
                  <p className="mt-4 text-2xl md:text-3xl font-medium leading-snug text-foreground">"{s.quote}"</p>
                  <div className="mt-6 border-t border-border pt-4">
                    <div className="font-bold text-lg">{s.name}</div>
                    <div className="text-muted-foreground">{s.role}</div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
