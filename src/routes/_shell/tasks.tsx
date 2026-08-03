import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, PhoneCall, ListTodo, LayoutGrid, CalendarDays } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionCard } from "@/components/common/Surface";
import { StatusPill, toneForStatus } from "@/components/common/StatusPill";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { tasks } from "@/lib/mock-data";

export const Route = createFileRoute("/_shell/tasks")({
  head: () => ({
    meta: [
      { title: "Tasks · StillWorks LegalOS" },
      {
        name: "description",
        content: "A calm reminders-style task list: overdue, due today, upcoming and call reminders.",
      },
      { property: "og:title", content: "Tasks · StillWorks LegalOS" },
      {
        property: "og:description",
        content: "Overdue, due today, upcoming work and call reminders in one calm list.",
      },
    ],
  }),
  component: TasksPage,
});

const buckets = ["Overdue", "Due Today", "Upcoming", "Completed"] as const;
const views = [
  { id: "list", label: "List", icon: ListTodo },
  { id: "kanban", label: "Kanban", icon: LayoutGrid },
  { id: "calendar", label: "Calendar", icon: CalendarDays },
];

function TaskCard({ task }: { task: (typeof tasks)[number] }) {
  const pct = Math.round((task.checklist.done / task.checklist.total) * 100);
  return (
    <article className="lift rounded-md border border-border bg-card p-4">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
        <div className="min-w-0">
          <p className="truncate font-medium">{task.title}</p>
          <p className="truncate text-caption text-muted-foreground">{task.caseName}</p>
        </div>
        <StatusPill tone={toneForStatus(task.priority)}>{task.priority}</StatusPill>
      </div>
      <div className="mt-4 flex items-center gap-3">
        <Progress value={pct} className="h-1.5" />
        <span className="num shrink-0 text-caption text-muted-foreground">
          {task.checklist.done}/{task.checklist.total}
        </span>
      </div>
      <p className="num mt-3 text-caption text-muted-foreground">
        {task.assignee} · {task.due}
      </p>
    </article>
  );
}

function TasksPage() {
  const [view, setView] = useState("list");

  return (
    <div>
      <PageHeader
        breadcrumb={[{ label: "StillWorks", to: "/" }, { label: "Tasks" }]}
        title="Tasks"
        subtitle="27 open items · 2 overdue · 3 call reminders today."
        actions={
          <Button className="gradient-primary rounded-md text-primary-foreground shadow-soft transition-transform duration-200 hover:-translate-y-0.5">
            <Plus size={17} strokeWidth={2} />
            Create task
          </Button>
        }
      />

      <div className="mb-6 inline-flex rounded-pill border border-border bg-card p-1 shadow-soft">
        {views.map((v) => (
          <button
            key={v.id}
            onClick={() => setView(v.id)}
            className={`flex min-h-11 items-center gap-2 rounded-pill px-4 text-helper font-medium transition-all duration-200 ${
              view === v.id
                ? "gradient-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <v.icon size={17} strokeWidth={1.75} />
            {v.label}
          </button>
        ))}
      </div>

      {view === "kanban" ? (
        <div className="grid gap-4 lg:grid-cols-4">
          {buckets.map((b) => (
            <div key={b} className="rounded-lg border border-border bg-card/70 p-4">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-helper font-semibold">{b}</h2>
                <StatusPill tone={toneForStatus(b)}>
                  {tasks.filter((t) => t.bucket === b).length}
                </StatusPill>
              </div>
              <div className="space-y-3">
                {tasks
                  .filter((t) => t.bucket === b)
                  .map((t) => (
                    <TaskCard key={t.id} task={t} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
          <div className="space-y-6">
            {buckets.map((b) => (
              <SectionCard
                key={b}
                title={b}
                description={`${tasks.filter((t) => t.bucket === b).length} item(s)`}
                icon={ListTodo}
                bodyClassName="grid gap-3 sm:grid-cols-2"
              >
                {tasks
                  .filter((t) => t.bucket === b)
                  .map((t) => (
                    <TaskCard key={t.id} task={t} />
                  ))}
              </SectionCard>
            ))}
          </div>

          <SectionCard title="Call reminders" description="Client calls scheduled today." icon={PhoneCall}>
            <ul className="space-y-3">
              {[
                ["Anaya Mehra", "Today, 5:00 PM", "Upcoming"],
                ["Vikram Rao", "Today, 11:00 AM", "Completed"],
                ["Nandi Infra — Mr. Deshpande", "Yesterday, 4:30 PM", "Overdue"],
              ].map(([who, when, state]) => (
                <li
                  key={who}
                  className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-md border border-border p-4"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium">{who}</p>
                    <p className="num truncate text-caption text-muted-foreground">{when}</p>
                  </div>
                  <StatusPill tone={toneForStatus(state!)}>{state}</StatusPill>
                </li>
              ))}
            </ul>
          </SectionCard>
        </div>
      )}
    </div>
  );
}
