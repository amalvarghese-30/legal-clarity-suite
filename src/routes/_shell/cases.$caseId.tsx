import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Gavel,
  FileText,
  CheckSquare,
  StickyNote,
  History,
  Users,
  Activity,
  Home,
  LayoutDashboard,
  Plus,
} from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionCard, EmptyState } from "@/components/common/Surface";
import { StatusPill, toneForStatus } from "@/components/common/StatusPill";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cases, documents, tasks } from "@/lib/mock-data";

export const Route = createFileRoute("/_shell/cases/$caseId")({
  head: () => ({
    meta: [
      { title: "Case workspace · StillWorks LegalOS" },
      {
        name: "description",
        content: "A single operating screen for a matter: hearings, documents, tasks, parties and timeline.",
      },
      { property: "og:title", content: "Case workspace · StillWorks LegalOS" },
      {
        property: "og:description",
        content: "Hearings, documents, tasks, parties and timeline for one matter.",
      },
    ],
  }),
  component: CaseWorkspace,
});

const sections = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "hearings", label: "Hearings", icon: Gavel },
  { id: "documents", label: "Documents", icon: FileText },
  { id: "tasks", label: "Tasks", icon: CheckSquare },
  { id: "notes", label: "Notes", icon: StickyNote },
  { id: "timeline", label: "Timeline", icon: History },
  { id: "parties", label: "Parties", icon: Users },
  { id: "activity", label: "Activity", icon: Activity },
  { id: "property", label: "Property", icon: Home },
];

const timeline = [
  { id: "tl1", when: "2 Aug", title: "Written statement drafted", by: "Adv. Rohan Desai" },
  { id: "tl2", when: "28 Jul", title: "Sale deed received from client", by: "Priya Nair" },
  { id: "tl3", when: "19 Jul", title: "Hearing adjourned", by: "Bombay High Court" },
  { id: "tl4", when: "04 Jul", title: "Case filed", by: "Adv. Rohan Desai" },
];

function CaseWorkspace() {
  const { caseId } = Route.useParams();
  const record = cases.find((c) => c.id === caseId) ?? cases[0]!;
  const [active, setActive] = useState("overview");

  return (
    <div>
      <PageHeader
        breadcrumb={[
          { label: "StillWorks", to: "/" },
          { label: "Cases", to: "/cases" },
          { label: record.number },
        ]}
        title={record.title}
        subtitle={`${record.client} · ${record.court}`}
        actions={
          <>
            <Button variant="outline" className="rounded-md">
              Add hearing
            </Button>
            <Button className="gradient-primary rounded-md text-primary-foreground shadow-soft">
              <Plus size={17} strokeWidth={2} />
              Quick action
            </Button>
          </>
        }
      />

      <div className="gradient-primary mb-6 rounded-lg p-6 text-primary-foreground shadow-lift">
        <div className="grid gap-6 md:grid-cols-4">
          {[
            ["Status", record.status],
            ["Priority", record.priority],
            ["Assigned", record.assigned],
            ["Next hearing", record.nextHearing],
          ].map(([label, value]) => (
            <div key={label} className="min-w-0">
              <p className="text-caption opacity-85">{label}</p>
              <p className="mt-1 truncate text-body font-semibold">{value}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex items-center gap-3">
          <Progress value={record.progress} className="h-1.5 bg-white/25" />
          <span className="num shrink-0 text-caption">{record.progress}% complete</span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
        <nav aria-label="Case sections" className="lg:sticky lg:top-28 lg:self-start">
          <ul className="flex gap-1 overflow-x-auto rounded-lg border border-border bg-card p-2 shadow-soft lg:flex-col lg:overflow-visible">
            {sections.map((s) => (
              <li key={s.id} className="shrink-0 lg:shrink">
                <button
                  onClick={() => setActive(s.id)}
                  aria-current={active === s.id ? "true" : undefined}
                  className={`flex min-h-11 w-full items-center gap-2.5 rounded-sm px-3 text-helper font-medium transition-colors duration-150 ${
                    active === s.id
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  }`}
                >
                  <s.icon size={18} strokeWidth={1.75} />
                  {s.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="min-w-0 space-y-6">
          {active === "overview" && (
            <>
              <SectionCard title="Matter summary" description="The essentials, nothing else." icon={LayoutDashboard}>
                <p className="text-body text-muted-foreground">
                  Dispute over the transfer of a 4,200 sq ft residential plot at Bandra West.
                  Client seeks specific performance of the agreement to sell dated 12 March 2024,
                  with an interim injunction restraining third-party transfer.
                </p>
                <dl className="mt-6 grid gap-4 sm:grid-cols-3">
                  {[
                    ["Practice area", record.practice],
                    ["Filed on", "04 July 2025"],
                    ["Case number", record.number],
                  ].map(([k, v]) => (
                    <div key={k} className="rounded-md bg-muted/60 p-4">
                      <dt className="text-caption text-muted-foreground">{k}</dt>
                      <dd className="mt-1 truncate text-helper font-medium">{v}</dd>
                    </div>
                  ))}
                </dl>
              </SectionCard>

              <SectionCard title="Timeline" description="How the matter progressed." icon={History}>
                <ol className="relative space-y-5 border-l border-border pl-6">
                  {timeline.map((t) => (
                    <li key={t.id} className="relative">
                      <span className="absolute top-1.5 -left-[1.9rem] size-2.5 rounded-full bg-primary ring-4 ring-card" />
                      <p className="font-medium">{t.title}</p>
                      <p className="text-helper text-muted-foreground">
                        {t.when} · {t.by}
                      </p>
                    </li>
                  ))}
                </ol>
              </SectionCard>
            </>
          )}

          {active === "documents" && (
            <SectionCard title="Documents" description="Files linked to this matter." icon={FileText}>
              <ul className="space-y-3">
                {documents.slice(0, 4).map((d) => (
                  <li
                    key={d.id}
                    className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-md border border-border p-4"
                  >
                    <span className="num grid size-10 shrink-0 place-items-center rounded-sm bg-muted text-caption font-semibold text-muted-foreground">
                      {d.kind}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate font-medium">{d.name}</p>
                      <p className="truncate text-caption text-muted-foreground">
                        {d.size} · {d.uploadedBy} · {d.updated}
                      </p>
                    </div>
                    <StatusPill tone={toneForStatus(d.state)}>{d.state}</StatusPill>
                  </li>
                ))}
              </ul>
            </SectionCard>
          )}

          {active === "tasks" && (
            <SectionCard title="Tasks" description="Work assigned on this matter." icon={CheckSquare}>
              <ul className="space-y-3">
                {tasks.slice(0, 4).map((t) => (
                  <li
                    key={t.id}
                    className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-md border border-border p-4"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium">{t.title}</p>
                      <p className="num truncate text-caption text-muted-foreground">
                        {t.assignee} · {t.due} · {t.checklist.done}/{t.checklist.total} steps
                      </p>
                    </div>
                    <StatusPill tone={toneForStatus(t.bucket)}>{t.bucket}</StatusPill>
                  </li>
                ))}
              </ul>
            </SectionCard>
          )}

          {active === "parties" && (
            <SectionCard title="Parties" description="Clients, sub-clients and relationships." icon={Users}>
              <ul className="grid gap-3 sm:grid-cols-2">
                {[
                  ["Anaya Mehra", "Primary client · Buyer"],
                  ["Rakesh Mehra", "Sub-client · Power of Attorney"],
                  ["Kapoor Estates LLP", "Opposing party · Seller"],
                  ["Adv. S. Venkat", "Opposing counsel"],
                ].map(([name, rel]) => (
                  <li key={name} className="rounded-md border border-border p-4">
                    <p className="truncate font-medium">{name}</p>
                    <p className="truncate text-helper text-muted-foreground">{rel}</p>
                  </li>
                ))}
              </ul>
            </SectionCard>
          )}

          {!["overview", "documents", "tasks", "parties"].includes(active) && (
            <EmptyState
              icon={sections.find((s) => s.id === active)?.icon ?? StickyNote}
              title={`No ${sections.find((s) => s.id === active)?.label.toLowerCase()} yet`}
              message="When something is added to this matter it will appear here, in order, with full history."
              action={
                <Button className="gradient-primary rounded-md text-primary-foreground">
                  <Plus size={17} strokeWidth={2} />
                  Add entry
                </Button>
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}
