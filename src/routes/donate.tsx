import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Heart, Banknote, Smartphone, Copy } from "lucide-react";
import { CONTACT } from "@/lib/site-data";
import { addDonation, fileToDataUrl } from "@/lib/admin-store";
import { Reveal, SectionHeader } from "@/components/ui-bits";

const OPTIONS = [
  { id: "one", label: "One-time", desc: "A single gift, any amount." },
  { id: "monthly", label: "Monthly", desc: "Sustain our programs year-round." },
  { id: "sponsor", label: "Sponsor a child", desc: "$25/month — school, food, care.", link: "/sponsor-a-child" },
  { id: "family", label: "Feed a family", desc: "$40 feeds a family for two weeks." },
  { id: "edu", label: "Support education", desc: "Books, uniforms, and fees." },
  { id: "med", label: "Medical outreach", desc: "Fund a community medical camp." },
];

const AMOUNTS = [10, 25, 50, 100, 250];

export const Route = createFileRoute("/donate")({
  head: () => ({
    meta: [
      { title: "Donate — Elite Foundation" },
      { name: "description", content: "Support Elite Foundation via bank transfer or Mobile Money and upload your proof of payment." },
      { property: "og:title", content: "Donate to Elite Foundation" },
      { property: "og:description", content: "Every gift changes a life. Give one-time, monthly, or sponsor a program." },
      { property: "og:url", content: "/donate" },
    ],
    links: [{ rel: "canonical", href: "/donate" }],
  }),
  component: DonatePage,
});

function DonatePage() {
  const [opt, setOpt] = useState("one");
  const [amount, setAmount] = useState<number | "">(50);
  const [done, setDone] = useState(false);

  const copy = (t: string) => navigator.clipboard?.writeText(t);

  const optLabel = OPTIONS.find((o) => o.id === opt)?.label ?? opt;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const proofFile = (fd.get("proof") as File)?.size ? (fd.get("proof") as File) : null;
    let proof: string | undefined;
    let proofName: string | undefined;
    if (proofFile) {
      proof = await fileToDataUrl(proofFile);
      proofName = proofFile.name;
    }

    addDonation({
      name: String(fd.get("name")),
      email: String(fd.get("email")),
      amount: Number(amount) || 0,
      type: optLabel,
      paymentMethod: String(fd.get("paymentMethod") || ""),
      reference: String(fd.get("reference") || ""),
      proof,
      proofName,
      message: String(fd.get("message") || ""),
    });
    setDone(true);
  };

  return (
    <div>
      <section className="py-20 bg-gradient-brand text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-extrabold max-w-3xl">Your generosity, their tomorrow.</h1>
          <p className="mt-4 text-lg text-white/90 max-w-2xl">Choose how you want to give. 100% of your gift funds programs on the ground.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3 space-y-8">
            <Reveal>
              <SectionHeader title="Choose your gift" center={false} />
              <div className="grid sm:grid-cols-2 gap-4">
                {OPTIONS.map((o) => (
                  o.link ? (
                    <Link
                      key={o.id}
                      to={o.link}
                      className="text-left rounded-2xl border p-5 transition-all border-border bg-card hover:border-accent/50 block"
                    >
                      <div className="font-bold">{o.label}</div>
                      <div className="text-sm text-muted-foreground mt-1">{o.desc}</div>
                      <div className="text-xs text-primary font-semibold mt-2">View children →</div>
                    </Link>
                  ) : (
                    <button key={o.id} onClick={() => setOpt(o.id)} className={`text-left rounded-2xl border p-5 transition-all ${opt === o.id ? "border-accent bg-accent/5 shadow-warm" : "border-border bg-card hover:border-accent/50"}`}>
                      <div className="flex items-center gap-2 font-bold">{opt === o.id && <CheckCircle2 className="h-4 w-4 text-accent" />}{o.label}</div>
                      <div className="text-sm text-muted-foreground mt-1">{o.desc}</div>
                    </button>
                  )
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-3xl bg-card border border-border p-6 md:p-8">
                <div className="font-bold mb-3">Amount (USD)</div>
                <div className="flex flex-wrap gap-2">
                  {AMOUNTS.map((a) => (
                    <button key={a} onClick={() => setAmount(a)} className={`rounded-full px-5 py-2 text-sm font-semibold border ${amount === a ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-secondary"}`}>${a}</button>
                  ))}
                  <input type="number" placeholder="Custom" value={amount === "" ? "" : amount} onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : "")} className="rounded-full border border-border px-5 py-2 text-sm w-32" />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="rounded-3xl bg-secondary border border-border p-6 md:p-8">
                <SectionHeader title="Payment methods" center={false} />
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-card border border-border p-5">
                    <div className="flex items-center gap-3"><Banknote className="h-6 w-6 text-primary" /> <div className="font-bold">{CONTACT.bank.name}</div></div>
                    <div className="mt-3 text-sm text-muted-foreground">Account Number</div>
                    <div className="flex items-center gap-2">
                      <div className="font-mono text-lg font-bold">{CONTACT.bank.account}</div>
                      <button type="button" onClick={() => copy(CONTACT.bank.account)} className="text-primary hover:opacity-70"><Copy className="h-4 w-4" /></button>
                    </div>
                  </div>
                  <div className="rounded-2xl bg-card border border-border p-5">
                    <div className="flex items-center gap-3"><Smartphone className="h-6 w-6 text-accent" /> <div className="font-bold">Mobile Money</div></div>
                    <div className="mt-3 space-y-1">
                      {CONTACT.phones.map((p) => (
                        <div key={p} className="flex items-center gap-2">
                          <div className="font-mono font-semibold">{p}</div>
                          <button type="button" onClick={() => copy(p)} className="text-primary hover:opacity-70"><Copy className="h-4 w-4" /></button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-2">
            <Reveal delay={0.2}>
              {done ? (
                <div className="rounded-3xl bg-card border border-border p-8 text-center shadow-elegant sticky top-24">
                  <CheckCircle2 className="mx-auto h-14 w-14 text-accent" />
                  <h3 className="mt-3 text-2xl font-extrabold">Thank you!</h3>
                  <p className="mt-2 text-muted-foreground">We received your donation notice and will send a receipt shortly. Our admin team has been notified.</p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="rounded-3xl bg-card border border-border p-8 shadow-sm sticky top-24 space-y-4">
                  <h3 className="text-xl font-extrabold flex items-center gap-2"><Heart className="h-5 w-5 text-accent" fill="currentColor" /> Confirm your gift</h3>
                  <p className="text-sm text-muted-foreground">Upload your proof of payment (optional).</p>
                  <input required name="name" placeholder="Your name" className="w-full rounded-xl border border-input bg-background px-4 py-2.5" />
                  <input required type="email" name="email" placeholder="Email" className="w-full rounded-xl border border-input bg-background px-4 py-2.5" />
                  <select name="paymentMethod" className="w-full rounded-xl border border-input bg-background px-4 py-2.5">
                    <option value="">Payment method</option>
                    <option value="Equity Bank">Equity Bank</option>
                    <option value="Mobile Money">Mobile Money</option>
                  </select>
                  <input name="reference" placeholder="Transaction reference" className="w-full rounded-xl border border-input bg-background px-4 py-2.5" />
                  <input type="file" name="proof" accept="image/*,.pdf" className="w-full text-sm file:mr-4 file:rounded-full file:border-0 file:bg-secondary file:px-4 file:py-2 file:font-semibold" />
                  <textarea name="message" rows={3} placeholder="Message (optional)" className="w-full rounded-xl border border-input bg-background px-4 py-2.5" />
                  <button className="w-full rounded-full bg-accent text-accent-foreground px-6 py-3.5 font-semibold hover:brightness-105">Submit — ${amount || 0} {opt === "monthly" && "/mo"}</button>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
