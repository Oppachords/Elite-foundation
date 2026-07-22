import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Bell,
  Heart,
  ImagePlus,
  LayoutDashboard,
  LogOut,
  Plus,
  Trash2,
  Users,
  FolderKanban,
  DollarSign,
  UserPlus,
} from "lucide-react";
import {
  addChild,
  addGalleryPhoto,
  addProject,
  deleteChild,
  deleteGalleryPhoto,
  deleteProject,
  fileToDataUrl,
  getStore,
  isAuthenticated,
  login,
  logout,
  markDonationRead,
  markVolunteerRead,
  subscribeStore,
  updateChild,
  updateProject,
  type DonationSubmission,
  type ProjectStatus,
  type SponsoredChild,
  type VolunteerSubmission,
} from "@/lib/admin-store";
import { IMAGES, type Project } from "@/lib/site-data";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Admin — Elite Foundation" }],
  }),
  component: AdminPage,
});

type Tab = "overview" | "children" | "donations" | "volunteers" | "projects" | "gallery";

function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState<Tab>("overview");
  const [store, setStore] = useState(getStore);

  useEffect(() => {
    setAuthed(isAuthenticated());
    return subscribeStore(() => setStore(getStore()));
  }, []);

  if (!authed) {
    return <LoginForm onSuccess={() => setAuthed(true)} />;
  }

  const unread =
    store.donations.filter((d) => !d.read).length + store.volunteers.filter((v) => !v.read).length;

  return (
    <div className="min-h-screen flex bg-secondary">
      <aside className="w-64 shrink-0 bg-[color:var(--brand-brown-dark)] text-white flex flex-col">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <img src={IMAGES.logo} alt="" className="h-9 w-9 rounded-full object-cover" />
            <div>
              <div className="font-extrabold text-sm">Elite Foundation</div>
              <div className="text-[10px] uppercase tracking-widest text-white/60">Admin</div>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {(
            [
              ["overview", "Overview", LayoutDashboard],
              ["children", "Sponsor Children", Heart],
              ["donations", "Donations", DollarSign],
              ["volunteers", "Volunteers", UserPlus],
              ["projects", "Projects", FolderKanban],
              ["gallery", "Gallery", ImagePlus],
            ] as const
          ).map(([id, label, Icon]) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`w-full flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${tab === id ? "bg-accent text-accent-foreground" : "text-white/80 hover:bg-white/10"}`}
            >
              <Icon className="h-4 w-4" />
              {label}
              {id === "donations" && unread > 0 && (
                <span className="ml-auto rounded-full bg-red-500 text-white text-[10px] px-1.5 py-0.5">{unread}</span>
              )}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10 space-y-2">
          <Link to="/" className="block text-center text-xs text-white/60 hover:text-white">← Back to website</Link>
          <button
            onClick={() => { logout(); setAuthed(false); }}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm hover:bg-white/20"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <header className="sticky top-0 z-10 bg-background/90 backdrop-blur border-b border-border px-8 py-5 flex items-center justify-between">
          <h1 className="text-2xl font-extrabold capitalize">{tab === "overview" ? "Dashboard" : tab.replace("-", " ")}</h1>
          {unread > 0 && (
            <div className="flex items-center gap-2 text-sm text-accent font-semibold">
              <Bell className="h-4 w-4" /> {unread} new notification{unread !== 1 ? "s" : ""}
            </div>
          )}
        </header>
        <div className="p-8">
          {tab === "overview" && <OverviewPanel store={store} onNavigate={setTab} />}
          {tab === "children" && <ChildrenPanel children={store.children} />}
          {tab === "donations" && <DonationsPanel donations={store.donations} />}
          {tab === "volunteers" && <VolunteersPanel volunteers={store.volunteers} />}
          {tab === "projects" && <ProjectsPanel projects={store.projects} />}
          {tab === "gallery" && <GalleryPanel gallery={store.gallery} />}
        </div>
      </main>
    </div>
  );
}

function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(username, password)) {
      onSuccess();
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-brand px-4">
      <form onSubmit={submit} className="w-full max-w-md rounded-3xl bg-card border border-border p-8 shadow-elegant space-y-5">
        <div className="text-center">
          <img src={IMAGES.logo} alt="" className="h-16 w-16 rounded-full object-cover mx-auto" />
          <h1 className="mt-4 text-2xl font-extrabold">Admin Login</h1>
          <p className="text-sm text-muted-foreground mt-1">Elite Foundation dashboard</p>
        </div>
        {error && <div className="rounded-xl bg-destructive/10 text-destructive text-sm px-4 py-2">{error}</div>}
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="w-full rounded-xl border border-input bg-background px-4 py-2.5"
          autoComplete="username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full rounded-xl border border-input bg-background px-4 py-2.5"
          autoComplete="current-password"
        />
        <button className="w-full rounded-full bg-accent text-accent-foreground px-6 py-3 font-semibold hover:brightness-105">
          Sign in
        </button>
        <Link to="/" className="block text-center text-sm text-muted-foreground hover:text-primary">← Back to website</Link>
      </form>
    </div>
  );
}

function OverviewPanel({ store, onNavigate }: { store: ReturnType<typeof getStore>; onNavigate: (t: Tab) => void }) {
  const cards = [
    { label: "Sponsored Children", value: store.children.length, icon: Heart, tab: "children" as Tab },
    { label: "Donations", value: store.donations.length, icon: DollarSign, tab: "donations" as Tab },
    { label: "Volunteers", value: store.volunteers.length, icon: Users, tab: "volunteers" as Tab },
    { label: "Projects", value: store.projects.length, icon: FolderKanban, tab: "projects" as Tab },
    { label: "Gallery Photos", value: store.gallery.length, icon: ImagePlus, tab: "gallery" as Tab },
  ];

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <button
            key={c.label}
            onClick={() => onNavigate(c.tab)}
            className="rounded-2xl bg-card border border-border p-6 text-left hover:shadow-elegant transition-all"
          >
            <c.icon className="h-8 w-8 text-primary mb-3" />
            <div className="text-3xl font-extrabold">{c.value}</div>
            <div className="text-sm text-muted-foreground">{c.label}</div>
          </button>
        ))}
      </div>
      {store.donations.filter((d) => !d.read).length > 0 && (
        <div className="rounded-2xl bg-accent/10 border border-accent/30 p-6">
          <h3 className="font-bold text-lg">Recent donations awaiting review</h3>
          <ul className="mt-3 space-y-2">
            {store.donations.filter((d) => !d.read).slice(0, 5).map((d) => (
              <li key={d.id} className="text-sm">
                <strong>{d.name}</strong> — ${d.amount} ({d.type}) {d.childName && `for ${d.childName}`}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function ChildrenPanel({ children }: { children: SponsoredChild[] }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [story, setStory] = useState("");
  const [photo, setPhoto] = useState("");

  const handlePhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPhoto(await fileToDataUrl(file));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !age || !story || !photo) return;
    addChild({ name, age: Number(age), story, photo });
    setName(""); setAge(""); setStory(""); setPhoto("");
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <form onSubmit={submit} className="rounded-2xl bg-card border border-border p-6 space-y-4">
        <h3 className="font-bold text-lg flex items-center gap-2"><Plus className="h-5 w-5" /> Add child</h3>
        <input value={name} onChange={(e) => setName(e.target.value)} required placeholder="Full name" className="w-full rounded-xl border border-input px-4 py-2.5" />
        <input value={age} onChange={(e) => setAge(e.target.value)} required type="number" min={1} max={18} placeholder="Age" className="w-full rounded-xl border border-input px-4 py-2.5" />
        <textarea value={story} onChange={(e) => setStory(e.target.value)} required rows={4} placeholder="Brief story" className="w-full rounded-xl border border-input px-4 py-2.5" />
        <input type="file" accept="image/*" onChange={handlePhoto} required className="w-full text-sm" />
        {photo && <img src={photo} alt="" className="h-32 w-32 object-cover rounded-xl" />}
        <button className="rounded-full bg-primary text-primary-foreground px-6 py-2.5 font-semibold">Add child</button>
      </form>

      <div className="space-y-4">
        {children.length === 0 && <p className="text-muted-foreground">No children added yet. They will appear on the Sponsor a Child page.</p>}
        {children.map((c) => (
          <ChildCard key={c.id} child={c} />
        ))}
      </div>
    </div>
  );
}

function ChildCard({ child }: { child: SponsoredChild }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(child.name);
  const [age, setAge] = useState(String(child.age));
  const [story, setStory] = useState(child.story);

  const save = () => {
    updateChild(child.id, { name, age: Number(age), story });
    setEditing(false);
  };

  return (
    <div className="rounded-2xl bg-card border border-border p-4 flex gap-4">
      <img src={child.photo} alt={child.name} className="h-24 w-24 rounded-xl object-cover shrink-0" />
      <div className="flex-1 min-w-0">
        {editing ? (
          <div className="space-y-2">
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-lg border px-3 py-1.5 text-sm" />
            <input value={age} onChange={(e) => setAge(e.target.value)} type="number" className="w-20 rounded-lg border px-3 py-1.5 text-sm" />
            <textarea value={story} onChange={(e) => setStory(e.target.value)} rows={2} className="w-full rounded-lg border px-3 py-1.5 text-sm" />
            <div className="flex gap-2">
              <button onClick={save} className="text-xs font-semibold text-primary">Save</button>
              <button onClick={() => setEditing(false)} className="text-xs text-muted-foreground">Cancel</button>
            </div>
          </div>
        ) : (
          <>
            <div className="font-bold">{child.name}, {child.age}</div>
            <p className="text-sm text-muted-foreground line-clamp-2">{child.story}</p>
            <div className="mt-2 flex gap-3">
              <button onClick={() => setEditing(true)} className="text-xs font-semibold text-primary">Edit</button>
              <button onClick={() => deleteChild(child.id)} className="text-xs text-destructive flex items-center gap-1"><Trash2 className="h-3 w-3" /> Delete</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function DonationsPanel({ donations }: { donations: DonationSubmission[] }) {
  return (
    <div className="space-y-4">
      {donations.length === 0 && <p className="text-muted-foreground">No donations submitted yet.</p>}
      {donations.map((d) => (
        <div key={d.id} className={`rounded-2xl border p-5 ${d.read ? "bg-card border-border" : "bg-accent/5 border-accent/40"}`}>
          <div className="flex justify-between items-start gap-4">
            <div>
              <div className="font-bold">{d.name} {!d.read && <span className="text-xs bg-accent text-accent-foreground rounded-full px-2 py-0.5 ml-2">New</span>}</div>
              <div className="text-sm text-muted-foreground">{d.email}</div>
            </div>
            <div className="text-right">
              <div className="text-xl font-extrabold text-primary">${d.amount}</div>
              <div className="text-xs text-muted-foreground">{new Date(d.createdAt).toLocaleString()}</div>
            </div>
          </div>
          <div className="mt-3 grid sm:grid-cols-2 gap-2 text-sm">
            <div><span className="text-muted-foreground">Type:</span> {d.type}</div>
            {d.childName && <div><span className="text-muted-foreground">Child:</span> {d.childName}</div>}
            {d.paymentMethod && <div><span className="text-muted-foreground">Payment:</span> {d.paymentMethod}</div>}
            {d.reference && <div><span className="text-muted-foreground">Reference:</span> {d.reference}</div>}
          </div>
          {d.message && <p className="mt-2 text-sm italic">"{d.message}"</p>}
          {d.proof && (
            <div className="mt-3">
              <div className="text-xs font-semibold mb-1">Payment proof{d.proofName ? `: ${d.proofName}` : ""}</div>
              <img src={d.proof} alt="Payment proof" className="max-h-48 rounded-xl border" />
            </div>
          )}
          {!d.read && (
            <button onClick={() => markDonationRead(d.id)} className="mt-3 text-sm font-semibold text-primary">Mark as read</button>
          )}
        </div>
      ))}
    </div>
  );
}

function VolunteersPanel({ volunteers }: { volunteers: VolunteerSubmission[] }) {
  return (
    <div className="space-y-4">
      {volunteers.length === 0 && <p className="text-muted-foreground">No volunteer applications yet.</p>}
      {volunteers.map((v) => (
        <div key={v.id} className={`rounded-2xl border p-5 ${v.read ? "bg-card border-border" : "bg-primary/5 border-primary/30"}`}>
          <div className="flex justify-between">
            <div className="font-bold">{v.name} {!v.read && <span className="text-xs bg-primary text-primary-foreground rounded-full px-2 py-0.5 ml-2">New</span>}</div>
            <div className="text-xs text-muted-foreground">{new Date(v.createdAt).toLocaleString()}</div>
          </div>
          <div className="mt-2 grid sm:grid-cols-2 gap-1 text-sm">
            <div>{v.email}</div>
            <div>{v.phone}</div>
            {v.profession && <div>Profession: {v.profession}</div>}
            {v.skills && <div>Skills: {v.skills}</div>}
            {v.availability && <div>Availability: {v.availability}</div>}
            {v.interest && <div>Interest: {v.interest}</div>}
          </div>
          {!v.read && <button onClick={() => markVolunteerRead(v.id)} className="mt-3 text-sm font-semibold text-primary">Mark as read</button>}
        </div>
      ))}
    </div>
  );
}

function ProjectsPanel({ projects }: { projects: Project[] }) {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [raised, setRaised] = useState("");
  const [status, setStatus] = useState<ProjectStatus>("Ongoing");
  const [hero, setHero] = useState("");

  const handleHero = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setHero(await fileToDataUrl(file));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !location || !description || !budget || !hero) return;
    addProject({
      title,
      hero,
      gallery: [hero],
      location,
      budget: Number(budget),
      raised: Number(raised) || 0,
      status,
      description,
    });
    setTitle(""); setLocation(""); setDescription(""); setBudget(""); setRaised(""); setHero("");
  };

  const updateRaised = (slug: string, raisedVal: number) => {
    updateProject(slug, { raised: raisedVal });
  };

  return (
    <div className="space-y-8">
      <form onSubmit={submit} className="rounded-2xl bg-card border border-border p-6 grid sm:grid-cols-2 gap-4">
        <h3 className="sm:col-span-2 font-bold text-lg flex items-center gap-2"><Plus className="h-5 w-5" /> Add project</h3>
        <input value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="Project title" className="rounded-xl border border-input px-4 py-2.5" />
        <input value={location} onChange={(e) => setLocation(e.target.value)} required placeholder="Location" className="rounded-xl border border-input px-4 py-2.5" />
        <input value={budget} onChange={(e) => setBudget(e.target.value)} required type="number" placeholder="Budget (USD)" className="rounded-xl border border-input px-4 py-2.5" />
        <input value={raised} onChange={(e) => setRaised(e.target.value)} type="number" placeholder="Raised (USD)" className="rounded-xl border border-input px-4 py-2.5" />
        <select value={status} onChange={(e) => setStatus(e.target.value as ProjectStatus)} className="rounded-xl border border-input px-4 py-2.5">
          <option value="Upcoming">Upcoming</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Completed">Completed</option>
        </select>
        <input type="file" accept="image/*" onChange={handleHero} required className="text-sm" />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows={3} placeholder="Description" className="sm:col-span-2 rounded-xl border border-input px-4 py-2.5" />
        {hero && <img src={hero} alt="" className="sm:col-span-2 h-40 w-full object-cover rounded-xl" />}
        <button className="sm:col-span-2 rounded-full bg-primary text-primary-foreground px-6 py-2.5 font-semibold w-fit">Add project</button>
      </form>

      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((p) => (
          <div key={p.slug} className="rounded-2xl bg-card border border-border overflow-hidden">
            <img src={p.hero} alt={p.title} className="h-40 w-full object-cover" />
            <div className="p-4">
              <div className="font-bold">{p.title}</div>
              <div className="text-sm text-muted-foreground">{p.location} · {p.status}</div>
              <p className="text-sm mt-2 line-clamp-2">{p.description}</p>
              <div className="mt-3 flex items-center gap-2">
                <label className="text-xs text-muted-foreground">Raised:</label>
                <input
                  type="number"
                  defaultValue={p.raised}
                  onBlur={(e) => updateRaised(p.slug, Number(e.target.value))}
                  className="w-24 rounded-lg border px-2 py-1 text-sm"
                />
                <span className="text-xs text-muted-foreground">/ ${p.budget}</span>
                <button onClick={() => deleteProject(p.slug)} className="ml-auto text-destructive"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GalleryPanel({ gallery }: { gallery: { url: string; cat: string }[] }) {
  const [cat, setCat] = useState("Outreach");
  const cats = ["Outreach", "Education", "Health", "Volunteers", "Children", "Events", "Community outreach"];

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = await fileToDataUrl(file);
      addGalleryPhoto({ url, cat });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4 rounded-2xl bg-card border border-border p-4">
        <select value={cat} onChange={(e) => setCat(e.target.value)} className="rounded-xl border border-input px-4 py-2">
          {cats.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <label className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2 text-sm font-semibold cursor-pointer">
          <ImagePlus className="h-4 w-4" /> Upload photo
          <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
        </label>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {gallery.map((g, i) => (
          <div key={g.url + i} className="relative group rounded-xl overflow-hidden">
            <img src={g.url} alt={g.cat} className="w-full h-36 object-cover" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
              <span className="text-white text-xs font-semibold">{g.cat}</span>
              <button onClick={() => deleteGalleryPhoto(g.url)} className="text-white bg-destructive rounded-full p-1.5"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
