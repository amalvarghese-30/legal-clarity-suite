import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Briefcase,
  Users,
  CheckSquare,
  UserCog,
  ShieldCheck,
  Gavel,
  Clock3,
  FileText,
  Activity as ActivityIcon,
  ArrowRight,
  Plus,
  CalendarDays,
} from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionCard, StatCard } from "@/components/common/Surface";
import { StatusPill, toneForStatus } from "@/components/common/StatusPill";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { activity, approvals, cases, documents, employees, hearings } from "@/lib/mock-data";

export const Route = createFileRoute("/_shell/")({
  head: () => ({
    meta: [
      { title: "Today · StillWorks LegalOS" },
      {
        name: "description",
        content:
          "A calm daily command centre for your firm: hearings, approvals, tasks and live activity in one view.",
      },
      { property: "og:title", content: "Today · StillWorks LegalOS" },
      {
        property: "og:description",
        content: "Hearings, approvals, tasks and live activity in one calm view.",
      },
    ],
  }),
  component: Dashboard,
});

const toneRing: Record<string, string> = {
  primary: "bg-primary",
  indigo: "bg-indigo",
  violet: "bg-violet",
};

function Dashboard() {
  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumb={[{ label: "StillWorks", to: "/" }, { label: "Dashboard" }]}
        title="What should I work on today?"
        subtitle="Monday, 3 August · 3 hearings, 4 approvals waiting and 2 tasks overdue."
        actions={
          <>
            <Button variant="outline" className="rounded-md" asChild>
              <Link to="/calendar">
                <CalendarDays size={17} strokeWidth={1.75} />
                Open calendar
              </Link>
            </Button>
            <Button className="gradient-primary rounded-md text-primary-foreground shadow-soft transition-transform duration-200 hover:-translate-y-0.5">
              <Plus size={17} strokeWidth={2} />
              New case
            </Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        <StatCard label="Today's hearings" value={3} hint="Next at 10:30 AM" icon={Gavel} accent />
        <StatCard label="Active cases" value={36} hint="+4 this month" icon={Briefcase} />
        <StatCard label="Clients" value={128} hint="12 VIP" icon={Users} />
        <StatCard label="Open tasks" value={27} hint="2 overdue" icon={CheckSquare} />
        <StatCard label="Pending approval" value={4} hint="Oldest 4 h ago" icon={ShieldCheck} />
        <StatCard label="Team on duty" value={5} hint="1 on leave" icon={UserCog} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <div className="space-y-6">
          <SectionCard
            title="Today's hearings"
            description="Everything scheduled in court today."
            icon={Gavel}
            action={
              <Button variant="ghost" size="sm" className="rounded-sm" asChild>
                <Link to="/calendar">
                  View all <ArrowRight size={15} strokeWidth={1.75} />
                </Link>
              </Button>
            }
          >
            <ol className="relative space-y-4 border-l border-border pl-6">
              {hearings.map((h) => (
                <li key={h.id} className="relative">
                  <span
                    className={`absolute top-2 -left-[1.9rem] size-2.5 rounded-full ring-4 ring-card ${toneRing[h.tone]}`}
                  />
                  <div className="lift grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-md border border-border bg-card p-4">
                    <div className="min-w-0">
                      <p className="truncate font-medium">{h.title}</p>
                      <p className="mt-0.5 truncate text-helper text-muted-foreground">
                        {h.court} · {h.advocate}
                      </p>
                    </div>
                    <span className="num shrink-0 rounded-pill bg-muted px-3 py-1 text-caption">
                      {h.time}
                    </span>
                  </div>
                </li>
              ))}
            </ol>
          </SectionCard>

          <SectionCard
            title="Pending approval"
            description="Requests waiting on you."
            icon={ShieldCheck}
            action={
              <Button variant="ghost" size="sm" className="rounded-sm" asChild>
                <Link to="/approvals">
                  Approval centre <ArrowRight size={15} strokeWidth={1.75} />
                </Link>
              </Button>
            }
          >
            <ul className="space-y-3">
              {approvals.slice(0, 3).map((a) => (
                <li
                  key={a.id}
                  className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-md border border-border p-4"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <StatusPill tone="primary">{a.kind}</StatusPill>
                      <span className="text-caption text-muted-foreground">{a.when}</span>
                    </div>
                    <p className="mt-2 truncate font-medium">{a.title}</p>
                    <p className="truncate text-helper text-muted-foreground">
                      {a.context} · {a.by}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <Button variant="outline" size="sm" className="rounded-sm">
                      Reject
                    </Button>
                    <Button
                      size="sm"
                      className="gradient-primary rounded-sm text-primary-foreground"
                    >
                      Approve
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </SectionCard>

          <SectionCard title="Recent cases" description="Latest movement across the firm." icon={Briefcase}>
            <ul className="space-y-3">
              {cases.slice(0, 4).map((c) => (
                <li key={c.id}>
                  <Link
                    to="/cases/$caseId"
                    params={{ caseId: c.id }}
                    className="lift grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-md border border-border p-4"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium">{c.title}</p>
                      <p className="num mt-0.5 truncate text-caption text-muted-foreground">
                        {c.number} · {c.court}
                      </p>
                      <Progress value={c.progress} className="mt-3 h-1.5" />
                    </div>
                    <StatusPill tone={toneForStatus(c.status)}>{c.status}</StatusPill>
                  </Link>
                </li>
              ))}
            </ul>
          </SectionCard>
        </div>

        <div className="space-y-6">
          <SectionCard title="Live activity" description="What the team just did." icon={ActivityIcon}>
            <ul className="space-y-4">
              {activity.map((a) => (
                <li key={a.id} className="flex gap-3">
                  <span className="mt-1 grid size-8 shrink-0 place-items-center rounded-full bg-primary/10 text-caption font-semibold text-primary">
                    {a.who.slice(0, 1)}
                  </span>
                  <p className="min-w-0 text-helper">
                    <span className="font-medium">{a.who}</span>{" "}
                    <span className="text-muted-foreground">{a.what}</span>
                    <span className="block text-caption text-muted-foreground/80">{a.when}</span>
                  </p>
                </li>
              ))}
            </ul>
          </SectionCard>

          <SectionCard title="Team status" description="Capacity at a glance." icon={UserCog}>
            <ul className="space-y-4">
              {employees.slice(0, 4).map((e) => (
                <li key={e.id}>
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                    <p className="truncate text-helper font-medium">{e.name}</p>
                    <StatusPill tone={toneForStatus(e.status)}>{e.status}</StatusPill>
                  </div>
                  <div className="mt-2 flex items-center gap-3">
                    <Progress value={e.workload} className="h-1.5" />
                    <span className="num shrink-0 text-caption text-muted-foreground">
                      {e.workload}%
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </SectionCard>

          <SectionCard title="Recent documents" description="Freshly uploaded files." icon={FileText}>
            <ul className="space-y-3">
              {documents.slice(0, 4).map((d) => (
                <li key={d.id} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
                  <span className="num grid size-9 shrink-0 place-items-center rounded-sm bg-muted text-caption font-semibold text-muted-foreground">
                    {d.kind}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-helper font-medium">{d.name}</p>
                    <p className="truncate text-caption text-muted-foreground">
                      {d.uploadedBy} · {d.updated}
                    </p>
                  </div>
                  <StatusPill tone={toneForStatus(d.state)}>{d.state}</StatusPill>
                </li>
              ))}
            </ul>
          </SectionCard>

          <SectionCard title="Performance snapshot" description="Last 30 days." icon={Clock3}>
            <dl className="grid grid-cols-2 gap-4">
              {[
                ["Hearings attended", "48"],
                ["Tasks completed", "213"],
                ["Docs approved", "96"],
                ["Avg. response", "2.4 h"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-md bg-muted/60 p-4">
                  <dt className="text-caption text-muted-foreground">{label}</dt>
                  <dd className="num mt-1 text-section font-semibold">{value}</dd>
                </div>
              ))}
            </dl>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
