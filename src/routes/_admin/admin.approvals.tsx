import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, FileText, KeyRound, UserPlus, Briefcase } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { StatusPill } from "@/components/common/StatusPill";
import { Button } from "@/components/ui/button";
import { approvals } from "@/lib/mock-data";

export const Route = createFileRoute("/_admin/admin/approvals")({
  head: () => ({
    meta: [
      { title: "Approvals · StillWorks LegalOS" },
      {
        name: "description",
        content: "One approval centre for document uploads, access requests, case and client requests.",
      },
      { property: "og:title", content: "Approvals · StillWorks LegalOS" },
      {
        property: "og:description",
        content: "Document uploads, access, case and client requests in one queue.",
      },
    ],
  }),
  component: ApprovalsPage,
});

const iconFor = (kind: string) =>
  kind === "Document Upload"
    ? FileText
    : kind === "Access Request"
      ? KeyRound
      : kind === "Client Request"
        ? UserPlus
        : Briefcase;

function ApprovalsPage() {
  return (
    <div>
      <PageHeader
        breadcrumb={[{ label: "StillWorks", to: "/" }, { label: "Approvals" }]}
        title="Approval centre"
        subtitle="Four requests waiting. Oldest submitted yesterday."
      />

      <div className="mb-6 flex flex-wrap gap-2">
        {["All", "Documents", "Access", "Cases", "Clients"].map((f, i) => (
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
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        {approvals.map((a) => {
          const Icon = iconFor(a.kind);
          return (
            <article key={a.id} className="lift rounded-lg border border-border bg-card p-6 shadow-soft">
              <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-md bg-primary/10 text-primary">
                  <Icon size={20} strokeWidth={1.75} />
                </span>
                <div className="min-w-0">
                  <StatusPill tone="primary">{a.kind}</StatusPill>
                  <h2 className="mt-2 truncate font-semibold">{a.title}</h2>
                  <p className="truncate text-helper text-muted-foreground">{a.context}</p>
                </div>
                <span className="shrink-0 text-caption text-muted-foreground">{a.when}</span>
              </div>

              <div className="mt-5 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-t border-border pt-4">
                <p className="truncate text-helper text-muted-foreground">Requested by {a.by}</p>
                <div className="flex shrink-0 gap-2">
                  <Button variant="ghost" size="sm" className="rounded-sm">
                    View
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-sm">
                    Reject
                  </Button>
                  <Button size="sm" className="gradient-primary rounded-sm text-primary-foreground">
                    <ShieldCheck size={15} strokeWidth={1.75} />
                    Approve
                  </Button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
