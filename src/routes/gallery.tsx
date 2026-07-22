import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useGallery } from "@/lib/use-site-content";
import { Reveal } from "@/components/ui-bits";

const CATS = ["All", "Outreach", "Education", "Health", "Volunteers", "Children", "Events", "Community outreach"];

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Elite Foundation" },
      { name: "description", content: "Photos from Elite Foundation outreach, medical camps, education drives and community events across Uganda." },
      { property: "og:title", content: "Photo Gallery" },
      { property: "og:description", content: "See the faces and moments of our work." },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const gallery = useGallery();
  const [cat, setCat] = useState("All");
  const [lightbox, setLightbox] = useState<string | null>(null);
  const items = cat === "All" ? gallery : gallery.filter((g) => g.cat === cat);
  return (
    <div>
      <section className="py-20 bg-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-extrabold">Moments of hope.</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">A visual record of our work in the field.</p>
          <div className="mt-8 flex flex-wrap gap-2">
            {CATS.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${cat === c ? "bg-primary text-primary-foreground" : "bg-card border border-border hover:bg-secondary"}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {items.map((g, i) => (
              <Reveal key={g.url + i} delay={i * 0.03}>
                <button onClick={() => setLightbox(g.url)} className="block w-full break-inside-avoid overflow-hidden rounded-2xl group">
                  <img src={g.url} alt={g.cat} className="w-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {lightbox && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
            <button onClick={() => setLightbox(null)} className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/10 text-white flex items-center justify-center"><X /></button>
            <motion.img initial={{ scale: 0.9 }} animate={{ scale: 1 }} src={lightbox} alt="" className="max-h-[90vh] max-w-[95vw] rounded-2xl object-contain" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
