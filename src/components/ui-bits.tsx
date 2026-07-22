import { motion, useInView, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState, type ImgHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Portrait-friendly crop: keeps faces visible when filling a fixed frame. */
export function CoverImage({
  className,
  focus = "top",
  loading = "lazy",
  ...props
}: ImgHTMLAttributes<HTMLImageElement> & { focus?: "top" | "center" }) {
  return (
    <img
      loading={loading}
      className={cn("object-cover", focus === "top" ? "object-top" : "object-center", className)}
      {...props}
    />
  );
}

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function CountUp({ end, suffix = "", duration = 2 }: { end: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: duration * 1000, bounce: 0 });

  useEffect(() => {
    if (inView) mv.set(end);
  }, [inView, end, mv]);

  useEffect(() => {
    return spring.on("change", (v) => {
      if (ref.current) ref.current.textContent = Math.round(v).toLocaleString() + suffix;
    });
  }, [spring, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export function SectionHeader({ eyebrow, title, description, center = true }: { eyebrow?: string; title: string; description?: string; center?: boolean }) {
  return (
    <div className={center ? "text-center max-w-3xl mx-auto mb-12" : "max-w-3xl mb-12"}>
      {eyebrow && <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3">{eyebrow}</div>}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground">{title}</h2>
      {description && <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">{description}</p>}
    </div>
  );
}

export function PageHero({
  images,
  alt = "Elite Foundation community work",
  children,
  minHeight = "min-h-[58vh]",
  interval = 6000,
}: {
  images: readonly string[];
  alt?: string;
  children: ReactNode;
  minHeight?: string;
  interval?: number;
}) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => setI((prev) => (prev + 1) % images.length), interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <section className={cn("relative flex items-center overflow-hidden text-white", minHeight)}>
      <AnimatePresence mode="sync">
        <motion.div
          key={i}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        >
          <motion.img
            src={images[i]}
            alt={alt}
            className="absolute inset-0 h-full w-full object-cover object-top"
            initial={{ scale: 1 }}
            animate={{ scale: 1.1 }}
            transition={{ duration: interval / 1000, ease: "linear" }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--brand-brown-dark)]/88 via-[color:var(--brand-brown-dark)]/62 to-[color:var(--brand-blue)]/72" />
        </motion.div>
      </AnimatePresence>

      <div className="relative mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.12, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      </div>

      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              type="button"
              aria-label={`Show hero image ${idx + 1}`}
              aria-current={idx === i ? "true" : undefined}
              onClick={() => setI(idx)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                idx === i ? "w-7 bg-accent" : "w-2 bg-white/45 hover:bg-white/70",
              )}
            />
          ))}
        </div>
      )}
    </section>
  );
}
