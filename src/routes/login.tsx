import { createFileRoute, Link } from "@tanstack/react-router";
import { Scale, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in · StillWorks LegalOS" },
      {
        name: "description",
        content: "Sign in to StillWorks LegalOS — the calm operating system for modern law firms.",
      },
      { property: "og:title", content: "Sign in · StillWorks LegalOS" },
      { property: "og:description", content: "The calm operating system for modern law firms." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  return (
    <div className="app-canvas grid min-h-screen lg:grid-cols-2">
      <div className="page-enter flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <span className="gradient-primary grid size-12 place-items-center rounded-md text-primary-foreground shadow-soft">
            <Scale size={22} strokeWidth={1.75} />
          </span>
          <h1 className="mt-6 text-hero font-semibold tracking-tight">Welcome back</h1>
          <p className="mt-2 text-body text-muted-foreground">
            Sign in to your firm's legal operating system.
          </p>

          <form className="mt-8 space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-helper">
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@firm.legal"
                className="h-12 rounded-md"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-helper">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                className="h-12 rounded-md"
              />
            </div>
            <div className="flex items-center justify-between gap-3">
              <label className="flex items-center gap-2 text-helper text-muted-foreground">
                <Checkbox id="remember" /> Remember me
              </label>
              <button type="button" className="text-helper text-primary hover:underline">
                Forgot password?
              </button>
            </div>
            <Button
              asChild
              className="gradient-primary h-12 w-full rounded-md text-primary-foreground shadow-soft transition-transform duration-200 hover:-translate-y-0.5"
            >
              <Link to="/">
                Sign in <ArrowRight size={17} strokeWidth={1.75} />
              </Link>
            </Button>
          </form>

          <p className="mt-8 text-caption text-muted-foreground">
            Protected by firm-managed access. Contact your administrator for an account.
          </p>
        </div>
      </div>

      <div className="relative hidden items-center justify-center overflow-hidden p-12 lg:flex">
        <div className="gradient-primary absolute inset-6 rounded-3xl opacity-95" />
        <div className="glass relative w-full max-w-md rounded-2xl p-8">
          <p className="text-caption font-medium tracking-wide text-muted-foreground uppercase">
            StillWorks LegalOS
          </p>
          <p className="mt-4 font-display text-section leading-snug font-semibold">
            "Every hearing, every document, every client — in one calm place."
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              ["36", "Active cases"],
              ["128", "Clients"],
              ["1.2k", "Documents"],
            ].map(([v, l]) => (
              <div key={l} className="rounded-md bg-card/70 p-4">
                <p className="num text-section font-semibold">{v}</p>
                <p className="text-caption text-muted-foreground">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
