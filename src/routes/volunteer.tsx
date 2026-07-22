import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { z } from "zod";
import { Reveal, SectionHeader } from "@/components/ui-bits";

const schema = z.object({
  name: z.string().trim().min(2, "Name too short").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(7, "Phone too short").max(30),
  profession: z.string().trim().max(120).optional().or(z.literal("")),
  skills: z.string().trim().max(500).optional().or(z.literal("")),
  availability: z.string().trim().max(200).optional().or(z.literal("")),
  interest: z.string().trim().max(200).optional().or(z.literal("")),
});

export const Route = createFileRoute("/volunteer")({
  head: () => ({
    meta: [
      { title: "Volunteer — Elite Foundation" },
      { name: "description", content: "Join Elite Foundation as a volunteer. Register your skills, availability and interests." },
      { property: "og:title", content: "Volunteer With Us" },
      { property: "og:description", content: "Give your time. Change a life. Apply to volunteer today." },
      { property: "og:url", content: "/volunteer" },
    ],
    links: [{ rel: "canonical", href: "/volunteer" }],
  }),
  component: VolunteerPage,
});

function VolunteerPage() {
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const issue of parsed.error.issues) errs[String(issue.path[0])] = issue.message;
      setErrors(errs);
      return;
    }
    setErrors({});
    setDone(true);
  };

  return (
    <div>
      <section className="py-20 bg-gradient-brand text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-extrabold max-w-3xl">Give your time. Change a life.</h1>
          <p className="mt-4 text-lg text-white/90 max-w-2xl">Volunteers are the heartbeat of our work. Tell us how you'd like to help.</p>
        </div>
      </section>
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            {done ? (
              <div className="rounded-3xl bg-card border border-border p-10 text-center shadow-elegant">
                <CheckCircle2 className="mx-auto h-16 w-16 text-accent" />
                <h2 className="mt-4 text-3xl font-extrabold">Thank you!</h2>
                <p className="mt-3 text-muted-foreground">Your volunteer application was received. We'll be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="rounded-3xl bg-card border border-border p-8 md:p-10 shadow-sm space-y-5">
                <SectionHeader title="Volunteer Registration" center={false} description="All fields except resume are required. Give us a sense of who you are." />
                <div className="grid md:grid-cols-2 gap-5">
                  <Field name="name" label="Full name" error={errors.name} />
                  <Field name="email" label="Email" type="email" error={errors.email} />
                  <Field name="phone" label="Phone" error={errors.phone} />
                  <Field name="profession" label="Profession" error={errors.profession} />
                </div>
                <Field name="skills" label="Skills (comma-separated)" error={errors.skills} />
                <div className="grid md:grid-cols-2 gap-5">
                  <Field name="availability" label="Availability (e.g. weekends)" error={errors.availability} />
                  <Field name="interest" label="Area of interest" error={errors.interest} />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Resume (optional)</label>
                  <input type="file" name="resume" accept=".pdf,.doc,.docx" className="w-full text-sm file:mr-4 file:rounded-full file:border-0 file:bg-secondary file:px-4 file:py-2 file:font-semibold" />
                </div>
                <button className="w-full rounded-full bg-accent text-accent-foreground px-6 py-4 font-semibold hover:brightness-105 transition">
                  Submit application
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function Field({ name, label, type = "text", error }: { name: string; label: string; type?: string; error?: string }) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-2">{label}</label>
      <input name={name} type={type} className="w-full rounded-xl border border-input bg-background px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary" />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
