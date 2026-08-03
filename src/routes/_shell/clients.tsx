import { createFileRoute } from "@tanstack/react-router";
import { Plus, Search, Mail, Phone, ShieldCheck, Briefcase } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { StatusPill, toneForStatus } from "@/components/common/StatusPill";
import { Button } from "@/components/ui/button";
import { clients } from "@/lib/mock-data";

export const Route = createFileRoute("/_shell/clients")({
  head: () => ({
    meta: [
      { title: "Clients · StillWorks LegalOS" },
      {
        name: "description",
        content: "Premium client profiles with KYC status, matters and relationships in one place.",
      },
      { property: "og:title", content: "Clients · StillWorks LegalOS" },
      {
        property: "og:description",
        content: "Client profiles with KYC status, matters and relationships.",
      },
    ],
  }),
  component: ClientsPage,
});

function ClientsPage() {
  return (
    <div>
      <PageHeader
        breadcrumb={[{ label: "StillWorks", to: "/" }, { label: "Clients" }]}
        title="Clients"
        subtitle="128 relationships — individuals, corporates and their sub-clients."
        actions={
          <Button className="gradient-primary rounded-md text-primary-foreground shadow-soft transition-transform duration-200 hover:-translate-y-0.5">
            <Plus size={17} strokeWidth={2} />
            Add client
          </Button>
        }
      />

      <label className="mb-6 flex items-center gap-3 rounded-pill border border-border bg-card px-4 py-2.5 shadow-soft">
        <Search size={18} strokeWidth={1.75} className="shrink-0 text-muted-foreground" />
        <input
          type="search"
          aria-label="Search clients"
          placeholder="Search clients by name, email or phone…"
          className="min-w-0 flex-1 bg-transparent text-helper outline-none"
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {clients.map((c) => (
          <article key={c.id} className="lift rounded-lg border border-border bg-card p-6 shadow-soft">
            <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
              <span className="gradient-primary grid size-12 shrink-0 place-items-center rounded-full font-display font-semibold text-primary-foreground">
                {c.name.slice(0, 1)}
              </span>
              <div className="min-w-0">
                <h2 className="truncate font-semibold">{c.name}</h2>
                <p className="truncate text-caption text-muted-foreground">
                  {c.type} · Client since {c.since}
                </p>
              </div>
              <StatusPill tone={toneForStatus(c.tag)}>{c.tag}</StatusPill>
            </div>

            <ul className="mt-5 space-y-2 text-helper text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail size={16} strokeWidth={1.75} className="shrink-0" />
                <span className="truncate">{c.email}</span>
              </li>
              <li className="num flex items-center gap-2">
                <Phone size={16} strokeWidth={1.75} className="shrink-0" />
                <span className="truncate">{c.phone}</span>
              </li>
            </ul>

            <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
              <span className="flex items-center gap-2 text-helper">
                <Briefcase size={16} strokeWidth={1.75} className="text-muted-foreground" />
                <span className="num font-medium">{c.cases}</span> matters
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck
                  size={16}
                  strokeWidth={1.75}
                  className={c.kyc === "Verified" ? "text-success" : "text-warning"}
                />
                <span className="text-helper">KYC {c.kyc}</span>
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
