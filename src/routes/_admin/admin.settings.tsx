import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { User, Building2, Bell, Lock, Palette, HardDrive } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionCard } from "@/components/common/Surface";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/_admin/admin/settings")({
  head: () => ({
    meta: [
      { title: "Settings · StillWorks LegalOS" },
      {
        name: "description",
        content: "Manage your profile, firm details, notifications, security and storage preferences.",
      },
      { property: "og:title", content: "Settings · StillWorks LegalOS" },
      {
        property: "og:description",
        content: "Profile, firm details, notifications, security and storage preferences.",
      },
    ],
  }),
  component: SettingsPage,
});

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "firm", label: "Firm details", icon: Building2 },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Lock },
  { id: "storage", label: "Storage", icon: HardDrive },
];

function SettingsPage() {
  const [tab, setTab] = useState("profile");

  return (
    <div>
      <PageHeader
        breadcrumb={[{ label: "StillWorks", to: "/" }, { label: "Settings" }]}
        title="Settings"
        subtitle="Preferences for you and for the firm."
      />

      <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
        <nav aria-label="Settings sections" className="lg:sticky lg:top-28 lg:self-start">
          <ul className="flex gap-1 overflow-x-auto rounded-lg border border-border bg-card p-2 shadow-soft lg:flex-col lg:overflow-visible">
            {tabs.map((t) => (
              <li key={t.id} className="shrink-0 lg:shrink">
                <button
                  onClick={() => setTab(t.id)}
                  aria-current={tab === t.id ? "true" : undefined}
                  className={`flex min-h-11 w-full items-center gap-2.5 rounded-sm px-3 text-helper font-medium transition-colors duration-150 ${
                    tab === t.id
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  }`}
                >
                  <t.icon size={18} strokeWidth={1.75} />
                  {t.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="min-w-0 space-y-6">
          {tab === "notifications" || tab === "security" ? (
            <SectionCard
              title={tab === "security" ? "Security" : "Notifications"}
              description="Choose what reaches you, and how."
              icon={tab === "security" ? Lock : Bell}
            >
              <ul className="divide-y divide-border">
                {(tab === "security"
                  ? [
                      ["Two-factor authentication", "Ask for a code on every new device"],
                      ["Session timeout", "Sign out after 30 minutes of inactivity"],
                      ["Login alerts", "Email me when a new device signs in"],
                    ]
                  : [
                      ["Hearing reminders", "One day before, and one hour before"],
                      ["Approval requests", "Notify me as soon as something needs review"],
                      ["Call reminders", "Alert me 15 minutes before a scheduled call"],
                      ["Daily digest", "A calm morning summary at 8:00 AM"],
                    ]
                ).map(([title, desc], i) => (
                  <li key={title} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-4">
                    <div className="min-w-0">
                      <p className="truncate font-medium">{title}</p>
                      <p className="text-helper text-muted-foreground">{desc}</p>
                    </div>
                    <Switch defaultChecked={i < 2} aria-label={title} />
                  </li>
                ))}
              </ul>
            </SectionCard>
          ) : (
            <SectionCard
              title={tabs.find((t) => t.id === tab)?.label ?? "Profile"}
              description="Keep these details current — they appear on filings and shared documents."
              icon={tabs.find((t) => t.id === tab)?.icon ?? User}
            >
              <form className="grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
                {(tab === "firm"
                  ? [
                      ["Firm name", "StillWorks Legal LLP"],
                      ["Bar registration", "MAH/2091/2016"],
                      ["Primary court", "Bombay High Court"],
                      ["Office address", "Nariman Point, Mumbai"],
                    ]
                  : tab === "appearance"
                    ? [
                        ["Accent", "Royal Blue"],
                        ["Density", "Comfortable"],
                        ["Font size", "Standard"],
                        ["Motion", "Full"],
                      ]
                    : tab === "storage"
                      ? [
                          ["Storage used", "412 GB of 2 TB"],
                          ["Backup schedule", "Nightly at 02:00"],
                          ["Retention", "7 years"],
                          ["Location", "On-premise, Mumbai"],
                        ]
                      : [
                          ["Full name", "Adv. Rohan Desai"],
                          ["Email", "rohan@stillworks.legal"],
                          ["Phone", "+91 98200 11223"],
                          ["Designation", "Managing Partner"],
                        ]
                ).map(([label, value]) => (
                  <div key={label} className="space-y-2">
                    <Label className="text-helper">{label}</Label>
                    <Input defaultValue={value} className="h-12 rounded-md" />
                  </div>
                ))}
                <div className="sm:col-span-2">
                  <Button className="gradient-primary rounded-md text-primary-foreground shadow-soft">
                    Save changes
                  </Button>
                </div>
              </form>
            </SectionCard>
          )}
        </div>
      </div>
    </div>
  );
}
