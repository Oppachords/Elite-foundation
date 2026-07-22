import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Building2, Church, GraduationCap, Briefcase, HeartHandshake, Users, CheckCircle2 } from "lucide-react";
import { Reveal, SectionHeader } from "@/components/ui-bits";

const KINDS = [
  { icon: Building2, label: "NGOs" },
  { icon: Church, label: "Churches" },
  { icon: GraduationCap, label: "Schools" },
  { icon: Briefcase, label: "Companies" },
  { icon: HeartHandshake, label: "Organizations" },
  { icon: Users, label: "Volunteer groups" },
];

export const Route = createFileRoute("/partners")({
  head: () => ({
    meta: [
      { title: "Partner With Us — Elite Foundation" },
      { name: "description", content: "Partner with Elite Foundation on outreach, volunteer development and community transformation." },
      { property: "og:title", content: "Partner With Us" },
      { property: "og:description", content: "Let's build sustainable change together." },
      { property: "og:url", content: "/partners" },
    ],
    links: [{ rel: "canonical", href: "/partners" }],
  }),
  component: PartnersPage,
});

function PartnersPage() {
  const [done, setDone] = useState(false);
  return (
    <div>
      <section className="py-20 bg-gradient-warm text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-extrabold max-w-3xl">Let's build change, together.</h1>
          <p className="mt-4 text-lg text-white/90 max-w-2xl">We collaborate with like-minded organizations on outreach, volunteer development, and community transformation.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Who we partner with" title="Six kinds of partners, one shared mission." />
          <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {KINDS.map((k, i) => (
              <Reveal key={k.label} delay={i * 0.04}>
                <div className="rounded-2xl bg-card border border-border p-6 text-center hover:-translate-y-1 hover:shadow-elegant transition-all">
                  <k.icon className="mx-auto h-8 w-8 text-primary" />
                  <div className="mt-3 font-semibold">{k.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            {done ? (
              <div className="rounded-3xl bg-card border border-border p-10 text-center shadow-elegant">
                <CheckCircle2 className="mx-auto h-14 w-14 text-accent" />
                <h3 className="mt-3 text-2xl font-extrabold">Message received</h3>
                <p className="mt-2 text-muted-foreground">Our partnerships team will get back to you within 3 working days.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="rounded-3xl bg-card border border-border p-8 md:p-10 shadow-sm space-y-4">
                <SectionHeader title="Partnership inquiry" center={false} />
                <div className="grid md:grid-cols-2 gap-4">
                  <input required name="org" placeholder="Organization name" className="rounded-xl border border-input bg-background px-4 py-2.5" />
                  <input required name="contact" placeholder="Contact person" className="rounded-xl border border-input bg-background px-4 py-2.5" />
                  <input required type="email" name="email" placeholder="Email" className="rounded-xl border border-input bg-background px-4 py-2.5" />
                  <input name="phone" placeholder="Phone" className="rounded-xl border border-input bg-background px-4 py-2.5" />
                </div>
                <select name="kind" className="w-full rounded-xl border border-input bg-background px-4 py-2.5">
                  <option>NGO</option><option>Church</option><option>School</option><option>Company</option><option>Organization</option><option>Volunteer group</option>
                </select>
                <textarea required name="message" rows={5} placeholder="How would you like to partner with us?" className="w-full rounded-xl border border-input bg-background px-4 py-2.5" />
                <button className="w-full rounded-full bg-primary text-primary-foreground px-6 py-3.5 font-semibold hover:brightness-110">Send inquiry</button>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </div>
  );
}
