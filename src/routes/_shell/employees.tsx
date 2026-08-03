import { createFileRoute } from "@tanstack/react-router";
import { Plus, Gavel, CheckSquare } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { StatusPill, toneForStatus } from "@/components/common/StatusPill";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { employees } from "@/lib/mock-data";

export const Route = createFileRoute("/_shell/employees")({
  head: () => ({
    meta: [
      { title: "Employees · StillWorks LegalOS" },
      {
        name: "description",
        content: "Team management for the firm — roles, workload, hearings and permissions.",
      },
      { property: "og:title", content: "Employees · StillWorks LegalOS" },
      { property: "og:description", content: "Roles, workload, hearings and permissions for your team." },
    ],
  }),
  component: EmployeesPage,
});

function EmployeesPage() {
  return (
    <div>
      <PageHeader
        breadcrumb={[{ label: "StillWorks", to: "/" }, { label: "Employees" }]}
        title="Employees"
        subtitle="Five people on duty today. One on approved leave."
        actions={
          <Button className="gradient-primary rounded-md text-primary-foreground shadow-soft transition-transform duration-200 hover:-translate-y-0.5">
            <Plus size={17} strokeWidth={2} />
            Add employee
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {employees.map((e) => (
          <article key={e.id} className="lift rounded-lg border border-border bg-card p-6 shadow-soft">
            <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
              <span className="gradient-primary grid size-12 shrink-0 place-items-center rounded-full font-display font-semibold text-primary-foreground">
                {e.name
                  .replace("Adv. ", "")
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
              <div className="min-w-0">
                <h2 className="truncate font-semibold">{e.name}</h2>
                <p className="truncate text-caption text-muted-foreground">{e.role}</p>
              </div>
              <StatusPill tone={toneForStatus(e.status)}>{e.status}</StatusPill>
            </div>

            <div className="mt-5">
              <div className="flex items-center justify-between text-caption text-muted-foreground">
                <span>Workload</span>
                <span className="num">{e.workload}%</span>
              </div>
              <Progress value={e.workload} className="mt-2 h-1.5" />
            </div>

            <dl className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-md bg-muted/60 p-3">
                <dt className="flex items-center gap-1.5 text-caption text-muted-foreground">
                  <Gavel size={14} strokeWidth={1.75} /> Hearings
                </dt>
                <dd className="num mt-1 text-card font-semibold">{e.hearings}</dd>
              </div>
              <div className="rounded-md bg-muted/60 p-3">
                <dt className="flex items-center gap-1.5 text-caption text-muted-foreground">
                  <CheckSquare size={14} strokeWidth={1.75} /> Tasks
                </dt>
                <dd className="num mt-1 text-card font-semibold">{e.tasks}</dd>
              </div>
            </dl>

            <p className="mt-4 truncate text-caption text-muted-foreground">{e.email}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
