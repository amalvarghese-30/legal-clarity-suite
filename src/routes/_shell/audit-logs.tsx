import { createFileRoute } from "@tanstack/react-router";
import { Search, Download } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { auditLogs } from "@/lib/mock-data";

export const Route = createFileRoute("/_shell/audit-logs")({
  head: () => ({
    meta: [
      { title: "Audit Logs · StillWorks LegalOS" },
      {
        name: "description",
        content: "A searchable record of every action taken inside the firm's legal operating system.",
      },
      { property: "og:title", content: "Audit Logs · StillWorks LegalOS" },
      { property: "og:description", content: "A searchable record of every action taken in the firm." },
    ],
  }),
  component: AuditLogsPage,
});

function AuditLogsPage() {
  return (
    <div>
      <PageHeader
        breadcrumb={[{ label: "StillWorks", to: "/" }, { label: "Audit Logs" }]}
        title="Audit logs"
        subtitle="Every action, with who did it, when and from where."
        actions={
          <Button variant="outline" className="rounded-md">
            <Download size={17} strokeWidth={1.75} />
            Export
          </Button>
        }
      />

      <label className="mb-6 flex items-center gap-3 rounded-pill border border-border bg-card px-4 py-2.5 shadow-soft">
        <Search size={18} strokeWidth={1.75} className="shrink-0 text-muted-foreground" />
        <input
          type="search"
          aria-label="Search logs"
          placeholder="Search by user, action or record…"
          className="min-w-0 flex-1 bg-transparent text-helper outline-none"
        />
      </label>

      <div className="overflow-hidden rounded-lg border border-border bg-card shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-separate border-spacing-y-1 p-2 text-left">
            <thead>
              <tr className="text-caption text-muted-foreground">
                <th className="px-4 py-3 font-medium">User</th>
                <th className="px-4 py-3 font-medium">Action</th>
                <th className="px-4 py-3 font-medium">Details</th>
                <th className="px-4 py-3 font-medium">Device</th>
                <th className="px-4 py-3 font-medium">When</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.map((l) => (
                <tr
                  key={l.id}
                  className="rounded-md text-helper transition-colors duration-150 hover:bg-accent/60"
                >
                  <td className="rounded-l-md px-4 py-4 font-medium">{l.user}</td>
                  <td className="px-4 py-4">{l.action}</td>
                  <td className="px-4 py-4 text-muted-foreground">{l.detail}</td>
                  <td className="px-4 py-4 text-muted-foreground">{l.device}</td>
                  <td className="num rounded-r-md px-4 py-4 text-muted-foreground">{l.when}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
