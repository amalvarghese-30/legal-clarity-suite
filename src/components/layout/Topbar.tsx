import { useState } from "react";
import { Bell, Search, Sparkles, Menu, Sun, Moon, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Sidebar } from "./Sidebar";

export function Topbar() {
  const [dark, setDark] = useState(false);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
  };

  return (
    <header className="glass sticky top-4 z-30 flex h-18 items-center gap-3 rounded-2xl px-4">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-md lg:hidden" aria-label="Open navigation">
            <Menu size={20} strokeWidth={1.75} />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[320px] border-none bg-transparent p-3">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <Sidebar />
        </SheetContent>
      </Sheet>

      <label className="flex min-w-0 flex-1 items-center gap-3 rounded-pill border border-border/70 bg-card/70 px-4 py-2.5 transition-shadow duration-200 focus-within:shadow-soft focus-within:ring-2 focus-within:ring-ring/40">
        <Search size={18} strokeWidth={1.75} className="shrink-0 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search cases, clients, documents…"
          aria-label="Search"
          className="min-w-0 flex-1 bg-transparent text-helper outline-none placeholder:text-muted-foreground"
        />
        <kbd className="num hidden shrink-0 rounded-sm border border-border bg-muted px-2 py-0.5 text-caption text-muted-foreground sm:block">
          Ctrl K
        </kbd>
      </label>

      <div className="flex shrink-0 items-center gap-1.5">
        <Button variant="ghost" size="icon" className="rounded-md" aria-label="Quick actions">
          <Sparkles size={19} strokeWidth={1.75} />
        </Button>
        <Button variant="ghost" size="icon" className="relative rounded-md" aria-label="Notifications">
          <Bell size={19} strokeWidth={1.75} />
          <span className="absolute top-2 right-2.5 size-2 rounded-full bg-destructive" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-md"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {dark ? <Sun size={19} strokeWidth={1.75} /> : <Moon size={19} strokeWidth={1.75} />}
        </Button>
        <Button className="gradient-primary hidden rounded-md text-primary-foreground shadow-soft transition-transform duration-200 hover:-translate-y-0.5 sm:inline-flex">
          <Plus size={17} strokeWidth={2} />
          New Case
        </Button>
        <span className="grid size-10 place-items-center rounded-full bg-primary/12 font-display text-helper font-semibold text-primary">
          RD
        </span>
      </div>
    </header>
  );
}
