import { createFileRoute } from "@tanstack/react-router";
import { Calendar, MapPin } from "lucide-react";
import { EVENTS } from "@/lib/site-data";
import { Reveal } from "@/components/ui-bits";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — Elite Foundation" },
      { name: "description", content: "Upcoming outreach, medical camps, fundraising dinners and volunteer drives." },
      { property: "og:title", content: "Upcoming Events" },
      { property: "og:description", content: "Join us on the ground — see what's coming next." },
      { property: "og:url", content: "/events" },
    ],
    links: [{ rel: "canonical", href: "/events" }],
  }),
  component: EventsPage,
});

function fmt(d: string) {
  const dt = new Date(d);
  return { day: dt.getDate(), month: dt.toLocaleString("en", { month: "short" }), year: dt.getFullYear(), full: dt.toLocaleDateString("en", { weekday: "long", month: "long", day: "numeric", year: "numeric" }) };
}

function EventsPage() {
  return (
    <div>
      <section className="py-20 bg-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-extrabold">Upcoming events.</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">Come along — as a volunteer, guest, or supporter.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-4">
          {EVENTS.map((e, i) => {
            const d = fmt(e.date);
            return (
              <Reveal key={e.title} delay={i * 0.05}>
                <article className="flex flex-col sm:flex-row gap-5 rounded-2xl bg-card border border-border p-6 hover:shadow-elegant transition-all">
                  <div className="flex sm:flex-col items-center sm:justify-center gap-3 sm:gap-0 sm:w-24 rounded-xl bg-gradient-brand text-white py-4 px-6 sm:px-0">
                    <div className="text-3xl font-extrabold leading-none">{d.day}</div>
                    <div className="text-xs uppercase tracking-widest">{d.month} {d.year}</div>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-semibold uppercase tracking-widest text-accent">{e.type}</div>
                    <h2 className="mt-1 text-2xl font-extrabold">{e.title}</h2>
                    <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {d.full}</span>
                      <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {e.location}</span>
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
