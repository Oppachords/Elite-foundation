import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Heart } from "lucide-react";
import { useSponsoredChildren } from "@/lib/use-site-content";
import { submitDonation, fileToDataUrl } from "@/lib/api/cms.functions";
import { CONTACT, IMAGES } from "@/lib/site-data";
import { Reveal, SectionHeader } from "@/components/ui-bits";

export const Route = createFileRoute("/sponsor-a-child")({
  head: () => ({
    meta: [
      { title: "Sponsor a Child — Elite Foundation" },
      { name: "description", content: "Sponsor a child through Elite Foundation. Provide school fees, food, and care for vulnerable children in Uganda." },
      { property: "og:title", content: "Sponsor a Child" },
      { property: "og:description", content: "Change a child's life with monthly or one-time sponsorship." },
      { property: "og:url", content: "/sponsor-a-child" },
    ],
    links: [{ rel: "canonical", href: "/sponsor-a-child" }],
  }),
  component: SponsorPage,
});

function SponsorPage() {
  const children = useSponsoredChildren();

  return (
    <div>
      <section className="relative py-24 overflow-hidden">
        <img src={IMAGES.img5} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--brand-brown-dark)]/90 to-[color:var(--brand-blue)]/80" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-white">
          <h1 className="text-5xl md:text-6xl font-extrabold max-w-3xl">Sponsor a child. Shape a future.</h1>
          <p className="mt-4 text-lg text-white/90 max-w-2xl">
            Your sponsorship provides school fees, meals, and mentorship for a child who needs someone to believe in them.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Children awaiting sponsors"
            title="Meet the children"
            description="Each child has a story. Your monthly gift of $25 can cover school supplies, food, and basic care."
          />

          {children.length === 0 ? (
            <Reveal>
              <div className="rounded-3xl bg-secondary border border-border p-12 text-center max-w-2xl mx-auto">
                <Heart className="mx-auto h-12 w-12 text-accent" />
                <h3 className="mt-4 text-xl font-bold">Profiles coming soon</h3>
                <p className="mt-2 text-muted-foreground">
                  Our team is preparing child profiles. You can still donate today and designate your gift for child sponsorship.
                </p>
                <Link to="/donate" className="mt-6 inline-flex rounded-full bg-accent text-accent-foreground px-6 py-3 font-semibold">
                  Donate to sponsor a child
                </Link>
              </div>
            </Reveal>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {children.map((child, i) => (
                <Reveal key={child.id} delay={i * 0.05}>
                  <ChildCard child={child} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

type Child = {
  id: string;
  name: string;
  age: number;
  story: string;
  photo: string;
};

function ChildCard({ child }: { child: Child }) {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="rounded-3xl bg-card border border-border p-8 text-center shadow-elegant">
        <CheckCircle2 className="mx-auto h-12 w-12 text-accent" />
        <h3 className="mt-3 text-xl font-extrabold">Thank you!</h3>
        <p className="mt-2 text-muted-foreground text-sm">
          Your sponsorship gift for {child.name} has been recorded. Our team will contact you shortly.
        </p>
      </div>
    );
  }

  return (
    <article className="rounded-3xl overflow-hidden bg-card border border-border hover:shadow-elegant transition-all">
      <div className="aspect-[4/5] overflow-hidden">
        <img src={child.photo} alt={child.name} className="w-full h-full object-cover" loading="lazy" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-extrabold">{child.name}</h3>
        <div className="text-sm text-accent font-semibold">Age {child.age}</div>
        <p className="mt-3 text-muted-foreground text-sm leading-relaxed line-clamp-3">{child.story}</p>
        <button
          onClick={() => setOpen(true)}
          className="mt-5 w-full rounded-full bg-accent text-accent-foreground px-6 py-3 font-semibold hover:brightness-105 flex items-center justify-center gap-2"
        >
          <Heart className="h-4 w-4" fill="currentColor" /> Sponsor {child.name.split(" ")[0]}
        </button>
      </div>

      {open && (
        <DonateModal child={child} onClose={() => setOpen(false)} onSuccess={() => { setOpen(false); setDone(true); }} />
      )}
    </article>
  );
}

function DonateModal({ child, onClose, onSuccess }: { child: Child; onClose: () => void; onSuccess: () => void }) {
  const [amount, setAmount] = useState(25);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const proofFile = (fd.get("proof") as File)?.size ? (fd.get("proof") as File) : null;
    let proof: string | undefined;
    let proofName: string | undefined;
    if (proofFile) {
      proof = await fileToDataUrl(proofFile);
      proofName = proofFile.name;
    }

    await submitDonation({
      data: {
        name: String(fd.get("name")),
        email: String(fd.get("email")),
        amount,
        type: "Sponsor a child",
        childId: child.id,
        childName: child.name,
        paymentMethod: String(fd.get("paymentMethod") || "") || undefined,
        reference: String(fd.get("reference") || "") || undefined,
        proof,
        proofName,
        message: String(fd.get("message") || "") || undefined,
      },
    });
    onSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={onClose}>
      <form
        onSubmit={submit}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-3xl bg-card border border-border p-6 md:p-8 max-h-[90vh] overflow-y-auto space-y-4"
      >
        <h3 className="text-xl font-extrabold">Sponsor {child.name}</h3>
        <p className="text-sm text-muted-foreground">
          Transfer to {CONTACT.bank.label} {CONTACT.bank.account} or Mobile Money ({CONTACT.phones.join(", ")}), then confirm below.
        </p>

        <div className="flex flex-wrap gap-2">
          {[25, 50, 100].map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => setAmount(a)}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold border ${amount === a ? "bg-primary text-primary-foreground border-primary" : "border-border"}`}
            >
              ${a}/mo
            </button>
          ))}
        </div>

        <input required name="name" placeholder="Your name" className="w-full rounded-xl border border-input px-4 py-2.5" />
        <input required type="email" name="email" placeholder="Email" className="w-full rounded-xl border border-input px-4 py-2.5" />
        <select name="paymentMethod" className="w-full rounded-xl border border-input px-4 py-2.5">
          <option value="">Payment method</option>
          <option value="Equity Bank">Equity Account number 1039103735170</option>
          <option value="Mobile Money">Mobile Money</option>
        </select>
        <input name="reference" placeholder="Transaction reference" className="w-full rounded-xl border border-input px-4 py-2.5" />
        <input type="file" name="proof" accept="image/*,.pdf" className="w-full text-sm" />
        <textarea name="message" rows={2} placeholder="Message (optional)" className="w-full rounded-xl border border-input px-4 py-2.5" />

        <div className="flex gap-3">
          <button type="button" onClick={onClose} className="flex-1 rounded-full border border-border px-4 py-2.5 font-semibold">Cancel</button>
          <button type="submit" className="flex-1 rounded-full bg-accent text-accent-foreground px-4 py-2.5 font-semibold">
            Confirm ${amount}
          </button>
        </div>
      </form>
    </div>
  );
}
