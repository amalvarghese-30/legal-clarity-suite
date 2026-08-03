import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, CalendarDays } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_shell/calendar")({
  head: () => ({
    meta: [
      { title: "Calendar · StillWorks LegalOS" },
      {
        name: "description",
        content: "Hearings, tasks, call reminders and firm events across month, week, day and agenda views.",
      },
      { property: "og:title", content: "Calendar · StillWorks LegalOS" },
      {
        property: "og:description",
        content: "Hearings, tasks, call reminders and firm events in one schedule.",
      },
    ],
  }),
  component: CalendarPage,
});

const legend = [
  { label: "Hearings", cls: "bg-primary" },
  { label: "Tasks", cls: "bg-violet" },
  { label: "Call reminders", cls: "bg-warning" },
  { label: "Leave", cls: "bg-success" },
  { label: "Firm events", cls: "bg-indigo" },
];

const events: Record<number, { label: string; cls: string }[]> = {
  4: [{ label: "10:30 Mehra hearing", cls: "bg-primary/12 text-primary" }],
  6: [{ label: "Call — Anaya Mehra", cls: "bg-warning/15 text-warning" }],
  12: [
    { label: "11:00 Sterling plea", cls: "bg-primary/12 text-primary" },
    { label: "Draft settlement", cls: "bg-violet/18 text-indigo" },
  ],
  15: [{ label: "Imran on leave", cls: "bg-success/12 text-success" }],
  18: [{ label: "14:15 Rao hearing", cls: "bg-primary/12 text-primary" }],
  22: [{ label: "Firm town hall", cls: "bg-indigo/15 text-indigo" }],
};

function CalendarPage() {
  const [view, setView] = useState("Month");
  const days = Array.from({ length: 35 }, (_, i) => i - 4);

  return (
    <div>
      <PageHeader
        breadcrumb={[{ label: "StillWorks", to: "/" }, { label: "Calendar" }]}
        title="August 2026"
        subtitle="Firm-wide schedule. Drag an event to reschedule it."
        actions={
          <Button className="gradient-primary rounded-md text-primary-foreground shadow-soft transition-transform duration-200 hover:-translate-y-0.5">
            <Plus size={17} strokeWidth={2} />
            New event
          </Button>
        }
      />

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="inline-flex rounded-pill border border-border bg-card p-1 shadow-soft">
          {["Month", "Week", "Day", "Agenda"].map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`min-h-11 rounded-pill px-4 text-helper font-medium transition-all duration-200 ${
                view === v
                  ? "gradient-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
        <ul className="flex flex-wrap items-center gap-4">
          {legend.map((l) => (
            <li key={l.label} className="flex items-center gap-2 text-caption text-muted-foreground">
              <span className={`size-2.5 rounded-full ${l.cls}`} />
              {l.label}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-lg border border-border bg-card p-4 shadow-soft sm:p-6">
        <div className="grid grid-cols-7 gap-2 pb-3 text-caption font-medium text-muted-foreground">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
            <div key={d} className="px-2">
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {days.map((d) => {
            const inMonth = d >= 1 && d <= 31;
            return (
              <div
                key={d}
                className={`min-h-24 rounded-md border p-2 transition-colors duration-150 sm:min-h-28 ${
                  inMonth
                    ? "border-border bg-card hover:bg-accent/50"
                    : "border-transparent bg-muted/40"
                }`}
              >
                <span
                  className={`num text-caption ${
                    d === 3 ? "gradient-primary rounded-pill px-2 py-0.5 text-primary-foreground" : "text-muted-foreground"
                  }`}
                >
                  {inMonth ? d : ""}
                </span>
                <div className="mt-1.5 space-y-1">
                  {(events[d] ?? []).map((e) => (
                    <p
                      key={e.label}
                      className={`truncate rounded-sm px-2 py-1 text-caption font-medium ${e.cls}`}
                    >
                      {e.label}
                    </p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <p className="mt-4 flex items-center gap-2 text-helper text-muted-foreground">
        <CalendarDays size={16} strokeWidth={1.75} /> Showing all employees · switch to a person from
        Settings
      </p>
    </div>
  );
}
