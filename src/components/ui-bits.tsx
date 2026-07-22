import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";

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
