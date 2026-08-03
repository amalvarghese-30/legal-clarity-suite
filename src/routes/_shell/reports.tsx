import { createFileRoute } from "@tanstack/react-router";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { BarChart3, TrendingUp, PieChart as PieIcon, Users } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionCard } from "@/components/common/Surface";
import { Progress } from "@/components/ui/progress";
import { caseGrowth, employees, practiceMix } from "@/lib/mock-data";

export const Route = createFileRoute("/_shell/reports")({
  head: () => ({
    meta: [
      { title: "Reports · StillWorks LegalOS" },
      {
        name: "description",
        content: "Operational insight for the firm: case mix, growth, workload and completion rates.",
      },
      { property: "og:title", content: "Reports · StillWorks LegalOS" },
      {
        property: "og:description",
        content: "Case mix, growth, workload and completion rates at a glance.",
      },
    ],
  }),
  component: ReportsPage,
});

const palette = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

function ReportsPage() {
  return (
    <div>
      <PageHeader
        breadcrumb={[{ label: "StillWorks", to: "/" }, { label: "Reports" }]}
        title="Reports"
        subtitle="Operational insight — what the firm is doing, not what it is billing."
      />

      <div className="grid gap-6 xl:grid-cols-2">
        <SectionCard title="Monthly case growth" description="New vs. closed matters." icon={TrendingUp}>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={caseGrowth} margin={{ left: -20, right: 8, top: 8 }}>
                <defs>
                  <linearGradient id="gNew" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "var(--radius-medium)",
                    border: "1px solid var(--border)",
                    boxShadow: "var(--shadow-soft)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="cases"
                  stroke="var(--chart-1)"
                  fill="url(#gNew)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="closed"
                  stroke="var(--chart-3)"
                  fill="transparent"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Case distribution" description="By practice area." icon={BarChart3}>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={practiceMix} layout="vertical" margin={{ left: 24, right: 16 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                <XAxis type="number" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis
                  type="category"
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                  fontSize={12}
                  width={80}
                />
                <Tooltip
                  cursor={{ fill: "var(--muted)" }}
                  contentStyle={{
                    borderRadius: "var(--radius-medium)",
                    border: "1px solid var(--border)",
                  }}
                />
                <Bar dataKey="value" radius={[8, 8, 8, 8]} fill="var(--chart-2)" barSize={18} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Active vs. closed" description="Current portfolio split." icon={PieIcon}>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={practiceMix}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={62}
                  outerRadius={92}
                  paddingAngle={3}
                  stroke="none"
                >
                  {practiceMix.map((entry, i) => (
                    <Cell key={entry.name} fill={palette[i % palette.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: "var(--radius-medium)",
                    border: "1px solid var(--border)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Employee workload" description="Capacity used this week." icon={Users}>
          <ul className="space-y-4">
            {employees.map((e) => (
              <li key={e.id}>
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                  <p className="truncate text-helper font-medium">{e.name}</p>
                  <span className="num text-caption text-muted-foreground">{e.workload}%</span>
                </div>
                <Progress value={e.workload} className="mt-2 h-1.5" />
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>
    </div>
  );
}
