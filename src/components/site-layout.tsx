import { Link } from "@tanstack/react-router";
import { Menu, X, Heart, Mail, Phone, Instagram, MessageCircle, Facebook } from "lucide-react";
import { useState, type ReactNode } from "react";
import { CONTACT } from "@/lib/site-data";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/programs", label: "Programs" },
  { to: "/projects", label: "Projects" },
  { to: "/impact", label: "Impact" },
  { to: "/gallery", label: "Gallery" },
  { to: "/stories", label: "Stories" },
  { to: "/events", label: "Events" },
  { to: "/volunteer", label: "Volunteer" },
  { to: "/partners", label: "Partners" },
  { to: "/contact", label: "Contact" },
] as const;

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 group">
      <div className="h-10 w-10 rounded-full bg-gradient-brand flex items-center justify-center shadow-elegant group-hover:scale-105 transition-transform">
        <Heart className="h-5 w-5 text-white" fill="currentColor" />
      </div>
      <div className="leading-tight">
        <div className="font-[family-name:var(--font-display)] font-extrabold text-primary text-lg tracking-tight">Elite Foundation</div>
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Where Hope Meets Action</div>
      </div>
    </Link>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/85 border-b border-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Logo />
        <nav className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              activeProps={{ className: "text-primary font-semibold" }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/donate"
            className="ml-2 inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-5 py-2 text-sm font-semibold shadow-warm hover:brightness-105 hover:scale-105 transition-all"
          >
            <Heart className="h-4 w-4" fill="currentColor" /> Donate
          </Link>
        </nav>
        <button
          className="lg:hidden p-2 rounded-md text-foreground"
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="px-4 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary"
                activeProps={{ className: "text-primary font-semibold bg-secondary" }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/donate"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-accent text-accent-foreground px-5 py-2.5 font-semibold"
            >
              <Heart className="h-4 w-4" fill="currentColor" /> Donate Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-24 bg-[color:var(--brand-brown-dark)] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-gradient-brand flex items-center justify-center">
              <Heart className="h-5 w-5 text-white" fill="currentColor" />
            </div>
            <div className="font-[family-name:var(--font-display)] font-extrabold text-xl">Elite Foundation</div>
          </div>
          <p className="mt-4 text-white/70 max-w-md text-sm leading-relaxed">
            Empowering vulnerable communities in Uganda through sustainable outreach, education,
            healthcare, and youth empowerment. Founded 4 April 2023, Kampala.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a href={`https://instagram.com/${CONTACT.instagram}`} target="_blank" rel="noreferrer" aria-label="Instagram" className="h-10 w-10 rounded-full bg-white/10 hover:bg-accent flex items-center justify-center transition-colors"><Instagram className="h-4 w-4" /></a>
            <a href="#" aria-label="Facebook" className="h-10 w-10 rounded-full bg-white/10 hover:bg-accent flex items-center justify-center transition-colors"><Facebook className="h-4 w-4" /></a>
            <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="h-10 w-10 rounded-full bg-white/10 hover:bg-accent flex items-center justify-center transition-colors"><MessageCircle className="h-4 w-4" /></a>
            <a href={`mailto:${CONTACT.email}`} aria-label="Email" className="h-10 w-10 rounded-full bg-white/10 hover:bg-accent flex items-center justify-center transition-colors"><Mail className="h-4 w-4" /></a>
          </div>
        </div>
        <div>
          <h4 className="text-sm uppercase tracking-widest text-white/80 mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link to="/programs" className="hover:text-accent">Programs</Link></li>
            <li><Link to="/projects" className="hover:text-accent">Projects</Link></li>
            <li><Link to="/volunteer" className="hover:text-accent">Volunteer</Link></li>
            <li><Link to="/donate" className="hover:text-accent">Donate</Link></li>
            <li><Link to="/partners" className="hover:text-accent">Partner With Us</Link></li>
            <li><Link to="/contact" className="hover:text-accent">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm uppercase tracking-widest text-white/80 mb-4">Newsletter</h4>
          <p className="text-sm text-white/70 mb-3">Get stories of impact in your inbox.</p>
          <form onSubmit={(e) => { e.preventDefault(); alert("Thanks for subscribing!"); }} className="flex gap-2">
            <input type="email" required placeholder="you@email.com" className="flex-1 min-w-0 rounded-full bg-white/10 border border-white/20 px-4 py-2 text-sm placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-accent" />
            <button className="rounded-full bg-accent px-4 py-2 text-sm font-semibold hover:brightness-105">Join</button>
          </form>
          <div className="mt-6 space-y-2 text-sm text-white/70">
            <div className="flex items-center gap-2"><Mail className="h-4 w-4" /> {CONTACT.email}</div>
            <div className="flex items-center gap-2"><Phone className="h-4 w-4" /> {CONTACT.phones[0]}</div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-white/60">
          <div>© {new Date().getFullYear()} Elite Foundation. All rights reserved.</div>
          <div>Kampala, Uganda · Founded 4 April 2023</div>
        </div>
      </div>
    </footer>
  );
}

function FloatingWhatsApp() {
  return (
    <a
      href={`https://wa.me/${CONTACT.whatsapp}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-[oklch(0.7_0.18_145)] text-white shadow-elegant flex items-center justify-center hover:scale-110 transition-transform"
    >
      <MessageCircle className="h-6 w-6" fill="currentColor" />
    </a>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Nav />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
