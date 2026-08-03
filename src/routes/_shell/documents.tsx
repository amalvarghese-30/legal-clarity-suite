import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  UploadCloud,
  Clock3,
  Star,
  Briefcase,
  Share2,
  ShieldCheck,
  LayoutGrid,
  List,
  FileText,
} from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { StatusPill, toneForStatus } from "@/components/common/StatusPill";
import { Button } from "@/components/ui/button";
import { documents } from "@/lib/mock-data";

export const Route = createFileRoute("/_shell/documents")({
  head: () => ({
    meta: [
      { title: "Documents · StillWorks LegalOS" },
      {
        name: "description",
        content: "A Finder-calm document library with previews, approvals and version history.",
      },
      { property: "og:title", content: "Documents · StillWorks LegalOS" },
      {
        property: "og:description",
        content: "Document library with previews, approvals and version history.",
      },
    ],
  }),
  component: DocumentsPage,
});

const shelves = [
  { label: "Recent", icon: Clock3 },
  { label: "Favourites", icon: Star },
  { label: "Assigned cases", icon: Briefcase },
  { label: "Shared with me", icon: Share2 },
  { label: "Pending approval", icon: ShieldCheck },
];

function DocumentsPage() {
  const [grid, setGrid] = useState(true);
  const [selected, setSelected] = useState(documents[0]!);

  return (
    <div>
      <PageHeader
        breadcrumb={[{ label: "StillWorks", to: "/" }, { label: "Documents" }]}
        title="Documents"
        subtitle="1,284 files organised by matter — securely stored on the firm's own storage."
        actions={
          <Button className="gradient-primary rounded-md text-primary-foreground shadow-soft transition-transform duration-200 hover:-translate-y-0.5">
            <UploadCloud size={17} strokeWidth={2} />
            Upload
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[220px_minmax(0,1fr)_300px]">
        <nav aria-label="Library" className="lg:sticky lg:top-28 lg:self-start">
          <ul className="flex gap-1 overflow-x-auto rounded-lg border border-border bg-card p-2 shadow-soft lg:flex-col lg:overflow-visible">
            {shelves.map((s, i) => (
              <li key={s.label} className="shrink-0 lg:shrink">
                <button
                  className={`flex min-h-11 w-full items-center gap-2.5 rounded-sm px-3 text-helper font-medium transition-colors duration-150 ${
                    i === 0
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

        <div className="min-w-0">
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="text-helper text-muted-foreground">Recent files</p>
            <div className="inline-flex rounded-pill border border-border bg-card p-1">
              {[
                { id: true, icon: LayoutGrid, label: "Grid view" },
                { id: false, icon: List, label: "List view" },
              ].map((v) => (
                <button
                  key={v.label}
                  aria-label={v.label}
                  onClick={() => setGrid(v.id)}
                  className={`grid size-9 place-items-center rounded-pill transition-colors duration-150 ${
                    grid === v.id ? "gradient-primary text-primary-foreground" : "text-muted-foreground"
                  }`}
                >
                  <v.icon size={17} strokeWidth={1.75} />
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6 rounded-lg border border-dashed border-primary/40 bg-primary/5 px-6 py-10 text-center">
            <UploadCloud size={26} strokeWidth={1.75} className="mx-auto text-primary" />
            <p className="mt-3 font-medium">Drop files here to upload</p>
            <p className="text-helper text-muted-foreground">
              PDF, DOC, XLSX, images and archives · up to 200 MB per file
            </p>
          </div>

          <div className={grid ? "grid gap-4 sm:grid-cols-2 2xl:grid-cols-3" : "space-y-3"}>
            {documents.map((d) => (
              <button
                key={d.id}
                onClick={() => setSelected(d)}
                className={`lift w-full rounded-lg border bg-card p-5 text-left shadow-soft ${
                  selected.id === d.id ? "border-primary/50" : "border-border"
                }`}
              >
                <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3">
                  <span className="num grid size-11 shrink-0 place-items-center rounded-sm bg-muted text-caption font-semibold text-muted-foreground">
                    {d.kind}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-medium">{d.name}</p>
                    <p className="truncate text-caption text-muted-foreground">{d.caseName}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="num text-caption text-muted-foreground">
                    {d.size} · {d.updated}
                  </span>
                  <StatusPill tone={toneForStatus(d.state)}>{d.state}</StatusPill>
                </div>
              </button>
            ))}
          </div>
        </div>

        <aside className="hidden xl:sticky xl:top-28 xl:block xl:self-start">
          <div className="rounded-lg border border-border bg-card p-6 shadow-soft">
            <div className="grid h-40 place-items-center rounded-md bg-muted/70">
              <FileText size={34} strokeWidth={1.5} className="text-muted-foreground" />
            </div>
            <h2 className="mt-4 truncate text-card font-semibold">{selected.name}</h2>
            <p className="truncate text-helper text-muted-foreground">{selected.caseName}</p>
            <dl className="mt-5 space-y-3 text-helper">
              {[
                ["Uploaded by", selected.uploadedBy],
                ["Size", selected.size],
                ["Updated", selected.updated],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="truncate font-medium">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-5 flex gap-2">
              <Button variant="outline" className="flex-1 rounded-md">
                Versions
              </Button>
              <Button className="gradient-primary flex-1 rounded-md text-primary-foreground">
                Open
              </Button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
