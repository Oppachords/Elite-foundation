import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, MapPin, Instagram, MessageCircle, CheckCircle2 } from "lucide-react";
import { CONTACT } from "@/lib/site-data";
import { Reveal, SectionHeader } from "@/components/ui-bits";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Elite Foundation" },
      { name: "description", content: "Get in touch with Elite Foundation in Kampala, Uganda." },
      { property: "og:title", content: "Contact Elite Foundation" },
      { property: "og:description", content: "Reach us by phone, email, WhatsApp or Instagram." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [done, setDone] = useState(false);
  return (
    <div>
      <section className="py-20 bg-gradient-brand text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-extrabold">Let's talk.</h1>
          <p className="mt-4 text-lg text-white/90 max-w-2xl">We reply to every message. Really.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10">
          <Reveal>
            <SectionHeader title="Reach us" center={false} />
            <div className="space-y-4">
              <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-4 rounded-2xl bg-card border border-border p-5 hover:shadow-elegant transition-all">
                <Mail className="h-6 w-6 text-primary" />
                <div><div className="text-xs text-muted-foreground">Email</div><div className="font-semibold">{CONTACT.email}</div></div>
              </a>
              {CONTACT.phones.map((p) => (
                <a key={p} href={`tel:${p}`} className="flex items-center gap-4 rounded-2xl bg-card border border-border p-5 hover:shadow-elegant transition-all">
                  <Phone className="h-6 w-6 text-primary" />
                  <div><div className="text-xs text-muted-foreground">Phone</div><div className="font-semibold">{p}</div></div>
                </a>
              ))}
              <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noreferrer" className="flex items-center gap-4 rounded-2xl bg-card border border-border p-5 hover:shadow-elegant transition-all">
                <MessageCircle className="h-6 w-6 text-accent" />
                <div><div className="text-xs text-muted-foreground">WhatsApp</div><div className="font-semibold">+256757696884</div></div>
              </a>
              <a href={`https://instagram.com/${CONTACT.instagram}`} target="_blank" rel="noreferrer" className="flex items-center gap-4 rounded-2xl bg-card border border-border p-5 hover:shadow-elegant transition-all">
                <Instagram className="h-6 w-6 text-accent" />
                <div><div className="text-xs text-muted-foreground">Instagram</div><div className="font-semibold">@{CONTACT.instagram}</div></div>
              </a>
              <div className="flex items-center gap-4 rounded-2xl bg-card border border-border p-5">
                <MapPin className="h-6 w-6 text-primary" />
                <div><div className="text-xs text-muted-foreground">Location</div><div className="font-semibold">{CONTACT.location}</div></div>
              </div>
            </div>
            <div className="mt-6 rounded-2xl overflow-hidden border border-border h-64">
              <iframe title="Kampala map" src="https://www.google.com/maps?q=Kampala,Uganda&output=embed" className="w-full h-full" loading="lazy" />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            {done ? (
              <div className="rounded-3xl bg-card border border-border p-10 text-center shadow-elegant">
                <CheckCircle2 className="mx-auto h-14 w-14 text-accent" />
                <h3 className="mt-3 text-2xl font-extrabold">Message sent</h3>
                <p className="mt-2 text-muted-foreground">Thanks for reaching out — we'll reply within 2 working days.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="rounded-3xl bg-card border border-border p-8 md:p-10 shadow-sm space-y-4">
                <SectionHeader title="Send a message" center={false} />
                <div className="grid md:grid-cols-2 gap-4">
                  <input required name="name" placeholder="Your name" className="rounded-xl border border-input bg-background px-4 py-2.5" />
                  <input required type="email" name="email" placeholder="Email" className="rounded-xl border border-input bg-background px-4 py-2.5" />
                </div>
                <input name="subject" placeholder="Subject" className="w-full rounded-xl border border-input bg-background px-4 py-2.5" />
                <textarea required name="message" rows={6} placeholder="Your message" className="w-full rounded-xl border border-input bg-background px-4 py-2.5" />
                <button className="w-full rounded-full bg-accent text-accent-foreground px-6 py-3.5 font-semibold hover:brightness-105">Send message</button>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </div>
  );
}
