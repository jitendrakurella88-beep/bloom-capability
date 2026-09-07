import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Award,
  Briefcase,
  Building2,
  Clock3,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Settings2,
  Target,
  User as UserIcon,
} from "lucide-react";
import { Protected } from "@/components/layout/Protected";
import {
  Avatar,
  Badge,
  Button,
  Card,
  ErrorState,
  Field,
  LoadingState,
  Modal,
  PageHeader,
  ProgressBar,
  SectionTitle,
  SkillBadge,
  Toast,
  inputClass,
} from "@/components/ui-kit";
import { useApi } from "@/hooks/useApi";
import { getProfile } from "@/services/api";
import { skills } from "@/data/mock";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "My Profile — AI LearnHub" },
      { name: "description", content: "View and edit your personal, professional and learning preference details." },
      { property: "og:title", content: "My Profile — AI LearnHub" },
      { property: "og:description", content: "Employee profile, certifications and learning preferences." },
    ],
  }),
  component: () => (
    <Protected role="employee" title="Profile">
      <ProfilePage />
    </Protected>
  ),
});

function InfoRow({ icon: Icon, label, value }: { icon: typeof Mail; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-border p-3">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-secondary text-muted-foreground">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-muted-foreground">{label}</p>
        <p className="truncate text-sm font-semibold text-foreground">{value}</p>
      </div>
    </div>
  );
}

function ProfilePage() {
  const { data, loading, error, retry } = useApi(getProfile);
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", location: "", designation: "", bio: "" });

  if (loading) return <LoadingState rows={2} />;
  if (error || !data) return <ErrorState onRetry={retry} />;

  const p = { ...data, ...Object.fromEntries(Object.entries(form).filter(([, v]) => v !== "")) } as typeof data;

  const openEdit = () => {
    setForm({ name: p.name, phone: p.phone, location: p.location, designation: p.designation, bio: p.bio });
    setEditing(true);
  };

  return (
    <>
      <PageHeader
        title="My Profile"
        subtitle="Your personal details, professional record and learning preferences."
        actions={
          <Button icon={Pencil} onClick={openEdit}>
            Edit Profile
          </Button>
        }
      />

      <Card className="mb-5">
        <div className="grid gap-5 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center">
          <Avatar initials={p.avatar} size="xl" />
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-extrabold text-foreground">{p.name}</h2>
              <Badge tone="primary">{p.id}</Badge>
              <Badge tone="success">Active</Badge>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {p.designation} · {p.department}
            </p>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{p.bio}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge tone="neutral">
                <Target className="h-3.5 w-3.5" /> Target role: {p.targetRole}
              </Badge>
              <Badge tone="neutral">
                <Clock3 className="h-3.5 w-3.5" /> {p.experience}
              </Badge>
              <Badge tone="neutral">
                <MapPin className="h-3.5 w-3.5" /> {p.location}
              </Badge>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <SectionTitle title="Personal Information" subtitle="Contact and identity details" />
          <div className="grid gap-3 sm:grid-cols-2">
            <InfoRow icon={UserIcon} label="Full name" value={p.name} />
            <InfoRow icon={Mail} label="Email" value={p.email} />
            <InfoRow icon={Phone} label="Phone" value={p.phone} />
            <InfoRow icon={MapPin} label="Location" value={p.location} />
          </div>
        </Card>

        <Card>
          <SectionTitle title="Professional Information" subtitle="Role and reporting" />
          <div className="grid gap-3 sm:grid-cols-2">
            <InfoRow icon={Briefcase} label="Designation" value={p.designation} />
            <InfoRow icon={Building2} label="Department" value={p.department} />
            <InfoRow icon={Clock3} label="Experience" value={p.experience} />
            <InfoRow icon={UserIcon} label="Reporting to" value={p.reportingTo} />
          </div>
        </Card>

        <Card>
          <SectionTitle title="Current Skills" subtitle="Assessed capability levels" />
          <div className="grid gap-4">
            {skills.map((s) => (
              <div key={s.name}>
                <div className="mb-1.5 flex items-center justify-between gap-2">
                  <span className="truncate text-sm font-semibold text-foreground">{s.name}</span>
                  <span className="text-xs font-bold text-muted-foreground">
                    {s.current}% <span className="font-medium">/ {s.required}% required</span>
                  </span>
                </div>
                <ProgressBar value={s.current} tone={s.current >= s.required ? "success" : "primary"} />
              </div>
            ))}
          </div>
        </Card>

        <div className="grid gap-5">
          <Card>
            <SectionTitle title="Certifications" subtitle="Verified credentials" />
            <ul className="grid gap-3">
              {p.certifications.map((c) => (
                <li key={c.name} className="flex items-start gap-3 rounded-lg border border-border p-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-warning-soft text-warning-foreground">
                    <Award className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-foreground">{c.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {c.issuer} · {c.year}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <SectionTitle title="Learning Preferences" subtitle="Used to personalise your roadmap" />
            <div className="flex flex-wrap gap-2">
              <SkillBadge skill={`Format: ${p.preferences.format}`} />
              <SkillBadge skill={`Pace: ${p.preferences.pace}`} />
              <SkillBadge skill={`Language: ${p.preferences.language}`} />
              <SkillBadge skill={`Level: ${p.preferences.difficulty}`} />
              <SkillBadge skill={`Alerts: ${p.preferences.notifications}`} />
            </div>
            <p className="mt-3 flex items-start gap-2 text-xs text-muted-foreground">
              <Settings2 className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              Preferences influence course format, weekly hours and difficulty in your generated roadmap.
            </p>
          </Card>
        </div>
      </div>

      <Modal
        open={editing}
        onClose={() => setEditing(false)}
        title="Edit profile"
        subtitle="Changes are stored locally in this prototype."
        footer={
          <>
            <Button variant="outline" onClick={() => setEditing(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setEditing(false);
                setSaved(true);
                setTimeout(() => setSaved(false), 2200);
              }}
            >
              Save changes
            </Button>
          </>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Full name">
            <input className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </Field>
          <Field label="Phone">
            <input className={inputClass} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </Field>
          <Field label="Designation">
            <input
              className={inputClass}
              value={form.designation}
              onChange={(e) => setForm({ ...form, designation: e.target.value })}
            />
          </Field>
          <Field label="Location">
            <input
              className={inputClass}
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />
          </Field>
          <div className="sm:col-span-2">
            <Field label="About">
              <textarea
                rows={3}
                className={`${inputClass} h-auto py-2`}
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
              />
            </Field>
          </div>
        </div>
      </Modal>

      <Toast show={saved} message="Profile updated" />
    </>
  );
}
