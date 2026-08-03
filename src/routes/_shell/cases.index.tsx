import { createFileRoute, Link } from "@tanstack/react-router";
import { Briefcase, Plus, Filter, Search } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { StatusPill, toneForStatus } from "@/components/common/StatusPill";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cases } from "@/lib/mock-data";

export const Route = createFileRoute("/_shell/cases/")({
  head: () => ({
    meta: [
      { title: "Cases · StillWorks LegalOS" },
      {
        name: "description",
        content: "Every matter in one workspace — status, priority, next hearing and assigned counsel.",
      },
      { property: "og:title", content: "Cases · StillWorks LegalOS" },
      {
        property: "og:description",
        content: "Every matter in one workspace with status, hearings and counsel.",
      },
    ],
  }),
  component: CasesPage,
});

function CasesPage() {
  return (
    <div>
      <PageHeader
        breadcrumb={[{ label: "StillWorks", to: "/" }, { label: "Cases" }]}
        title="Cases"
        subtitle="36 active matters across five practice areas."
        actions={
          <Button className="gradient-primary rounded-md text-primary-foreground shadow-soft transition-transform duration-200 hover:-translate-y-0.5">
            <Plus size={17} strokeWidth={2} />
            Add case
          </Button>
        }
      />

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <label className="flex min-w-0 flex-1 items-center gap-3 rounded-pill border border-border bg-card px-4 py-2.5 shadow-soft">
          <Search size={18} strokeWidth={1.75} className="shrink-0 text-muted-foreground" />
          <input
            type="search"
            aria-label="Search cases"
            placeholder="Search by case number, client or court…"
            className="min-w-0 flex-1 bg-transparent text-helper outline-none"
          />
        </label>
        {["All", "Active", "Urgent", "On Hold", "Closed"].map((f, i) => (
          <button
            key={f}
            className={`min-h-11 rounded-pill px-4 text-helper font-medium transition-colors duration-150 ${
              i === 0
                ? "gradient-primary text-primary-foreground shadow-soft"
                : "border border-border bg-card text-muted-foreground hover:text-foreground"
            }`}
          >
            {f}
          </button>
        ))}
        <Button variant="outline" size="icon" className="rounded-md" aria-label="More filters">
          <Filter size={18} strokeWidth={1.75} />
        </Button>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        {cases.map((c) => (
          <Link
            key={c.id}
            to="/cases/$caseId"
            params={{ caseId: c.id }}
            className="lift rounded-lg border border-border bg-card p-6 shadow-soft"
          >
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
              <div className="min-w-0">
                <p className="num text-caption text-muted-foreground">{c.number}</p>
                <h2 className="mt-1 truncate text-card font-semibold">{c.title}</h2>
                <p className="mt-1 truncate text-helper text-muted-foreground">
                  {c.client} · {c.court}
                </p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-2">
                <StatusPill tone={toneForStatus(c.status)}>{c.status}</StatusPill>
                <StatusPill tone={toneForStatus(c.priority)}>{c.priority} priority</StatusPill>
              </div>
            </div>

            <dl className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div>
                <dt className="text-caption text-muted-foreground">Practice</dt>
                <dd className="mt-0.5 truncate text-helper font-medium">{c.practice}</dd>
              </div>
              <div>
                <dt className="text-caption text-muted-foreground">Assigned</dt>
                <dd className="mt-0.5 truncate text-helper font-medium">{c.assigned}</dd>
              </div>
              <div>
                <dt className="text-caption text-muted-foreground">Next hearing</dt>
                <dd className="num mt-0.5 truncate text-helper font-medium">{c.nextHearing}</dd>
              </div>
            </dl>

            <div className="mt-5 flex items-center gap-3">
              <Progress value={c.progress} className="h-1.5" />
              <span className="num shrink-0 text-caption text-muted-foreground">{c.progress}%</span>
            </div>
          </Link>
        ))}
      </div>

      <p className="mt-6 flex items-center gap-2 text-helper text-muted-foreground">
        <Briefcase size={16} strokeWidth={1.75} /> Showing 5 of 36 matters
      </p>
    </div>
  );
}
