import { createFileRoute, Link } from "@tanstack/react-router";
import {
  UserCog,
  ShieldCheck,
  ScrollText,
  Briefcase,
  Users,
  FileText,
  ArrowRight,
  Activity as ActivityIcon,
} from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionCard, StatCard } from "@/components/common/Surface";
import { StatusPill } from "@/components/common/StatusPill";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { approvals, auditLogs, employees, activity, cases, clients, documents } from "@/lib/mock-data";

export const Route = createFileRoute("/_admin/admin/")({
  head: () => ({
    meta: [
      { title: "Admin Console · StillWorks LegalOS" },
      {
        name: "description",
        content:
          "Firm-wide administration: team capacity, approval queue, audit trail and governance controls.",
      },
      { property: "og:title", content: "Admin Console · StillWorks LegalOS" },
      {
        property: "og:description",
        content: "Team capacity, approvals, audit trail and governance in one console.",
      },
    ],
  }),
  component: AdminDashboard,
});

function AdminDashboard() {
  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumb={[{ label: "Admin", to: "/admin" }, { label: "Console" }]}
        title="Firm administration"
        subtitle="Governance, people and oversight — separate from the day-to-day case workspace."
        actions={
          <>
            <Button variant="outline" className="rounded-md" asChild>
              <Link to="/admin/audit-logs">
                <ScrollText size={17} strokeWidth={1.75} />
                Audit trail
              </Link>
            </Button>
            <Button
              className="gradient-primary rounded-md text-primary-foreground shadow-soft transition-transform duration-200 hover:-translate-y-0.5"
              asChild
            >
              <Link to="/admin/employees">
                <UserCog size={17} strokeWidth={2} />
                Manage team
              </Link>
            </Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        <StatCard label="Pending approvals" value={approvals.length} hint="Needs your sign-off" icon={ShieldCheck} accent />
        <StatCard label="Team members" value={employees.length} hint="Roles & permissions" icon={UserCog} />
        <StatCard label="Active cases" value={cases.length} hint="Firm-wide" icon={Briefcase} />
        <StatCard label="Clients" value={clients.length} hint="On record" icon={Users} />
        <StatCard label="Documents" value={documents.length} hint="Under governance" icon={FileText} />
        <StatCard label="Audit events" value={auditLogs.length} hint="Last 24 hours" icon={ScrollText} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <SectionCard
          title="Approval queue"
          description="Requests waiting on an administrator"
          action={
            <Button variant="ghost" size="sm" className="rounded-md" asChild>
              <Link to="/admin/approvals">
                Open centre <ArrowRight size={15} strokeWidth={1.75} />
              </Link>
            </Button>
          }
        >
          <ul className="divide-y divide-border/60">
            {approvals.slice(0, 5).map((a) => (
              <li key={a.id} className="flex items-center gap-3 py-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-md bg-primary/10 text-primary">
                  <ShieldCheck size={17} strokeWidth={1.75} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-helper font-medium">{a.title}</p>
                  <p className="truncate text-caption text-muted-foreground">
                    {a.by} · {a.when}
                  </p>
                </div>
                <StatusPill label={a.kind} tone="primary" />
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Team capacity" description="Workload across the firm">
          <ul className="space-y-4">
            {employees.slice(0, 6).map((e) => (
              <li key={e.id}>
                <div className="flex items-center justify-between gap-3">
                  <p className="truncate text-helper font-medium">{e.name}</p>
                  <span className="num text-caption text-muted-foreground">{e.workload}%</span>
                </div>
                <p className="truncate text-caption text-muted-foreground">{e.role}</p>
                <Progress value={e.workload} className="mt-2 h-1.5" />
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <SectionCard
        title="Recent activity"
        description="Everything happening across the firm"
        action={
          <Button variant="ghost" size="sm" className="rounded-md" asChild>
            <Link to="/admin/audit-logs">
              Full audit log <ArrowRight size={15} strokeWidth={1.75} />
            </Link>
          </Button>
        }
      >
        <ul className="divide-y divide-border/60">
          {activity.slice(0, 6).map((a) => (
            <li key={a.id} className="flex items-center gap-3 py-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-md bg-accent text-muted-foreground">
                <ActivityIcon size={16} strokeWidth={1.75} />
              </span>
              <p className="min-w-0 flex-1 truncate text-helper">
                <span className="font-medium">{a.who}</span> {a.what}
              </p>
              <span className="shrink-0 text-caption text-muted-foreground">{a.when}</span>
            </li>
          ))}
        </ul>
      </SectionCard>
    </div>
  );
}
