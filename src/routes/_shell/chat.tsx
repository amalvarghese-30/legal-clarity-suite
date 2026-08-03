import { createFileRoute } from "@tanstack/react-router";
import { Send, Paperclip, Search, CheckCheck } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { conversations, messages } from "@/lib/mock-data";

export const Route = createFileRoute("/_shell/chat")({
  head: () => ({
    meta: [
      { title: "Chat · StillWorks LegalOS" },
      {
        name: "description",
        content: "Simple, private team messaging for the firm — no channels, no noise.",
      },
      { property: "og:title", content: "Chat · StillWorks LegalOS" },
      { property: "og:description", content: "Private team messaging for the firm, without the noise." },
    ],
  }),
  component: ChatPage,
});

function ChatPage() {
  return (
    <div>
      <PageHeader
        breadcrumb={[{ label: "StillWorks", to: "/" }, { label: "Chat" }]}
        title="Chat"
        subtitle="Direct messages and matter groups. Groups are created by administrators."
      />

      <div className="grid gap-4 overflow-hidden rounded-lg border border-border bg-card shadow-soft lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="border-border p-4 lg:border-r">
          <label className="flex items-center gap-3 rounded-pill border border-border bg-muted/50 px-4 py-2.5">
            <Search size={17} strokeWidth={1.75} className="shrink-0 text-muted-foreground" />
            <input
              type="search"
              aria-label="Search conversations"
              placeholder="Search conversations"
              className="min-w-0 flex-1 bg-transparent text-helper outline-none"
            />
          </label>
          <ul className="mt-4 space-y-1">
            {conversations.map((c, i) => (
              <li key={c.id}>
                <button
                  className={`grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-md p-3 text-left transition-colors duration-150 ${
                    i === 0 ? "bg-primary/8" : "hover:bg-accent"
                  }`}
                >
                  <span className="relative grid size-10 shrink-0 place-items-center rounded-full bg-primary/12 text-helper font-semibold text-primary">
                    {c.name.slice(0, 1)}
                    {c.online ? (
                      <span className="absolute right-0 bottom-0 size-3 rounded-full bg-success ring-2 ring-card" />
                    ) : null}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-helper font-medium">{c.name}</span>
                    <span className="block truncate text-caption text-muted-foreground">
                      {c.preview}
                    </span>
                  </span>
                  <span className="shrink-0 text-right">
                    <span className="num block text-caption text-muted-foreground">{c.when}</span>
                    {c.unread ? (
                      <span className="num mt-1 inline-block rounded-pill bg-primary px-2 text-caption text-primary-foreground">
                        {c.unread}
                      </span>
                    ) : null}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <section className="flex min-h-[560px] flex-col">
          <header className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 border-b border-border p-4">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary/12 text-helper font-semibold text-primary">
              M
            </span>
            <div className="min-w-0">
              <p className="truncate font-medium">Adv. Meera Iyer</p>
              <p className="flex items-center gap-1.5 text-caption text-success">
                <span className="size-2 rounded-full bg-success" /> Online
              </p>
            </div>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto p-6">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] rounded-md px-4 py-2.5 text-helper shadow-soft ${
                    m.from === "me"
                      ? "gradient-primary text-primary-foreground"
                      : "border border-border bg-muted/60"
                  }`}
                >
                  <p>{m.text}</p>
                  <p
                    className={`num mt-1 flex items-center justify-end gap-1 text-caption ${
                      m.from === "me" ? "opacity-80" : "text-muted-foreground"
                    }`}
                  >
                    {m.at}
                    {m.from === "me" ? <CheckCheck size={14} strokeWidth={1.75} /> : null}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <form
            className="flex items-center gap-2 border-t border-border p-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <button
              type="button"
              aria-label="Attach file"
              className="grid size-11 shrink-0 place-items-center rounded-md text-muted-foreground transition-colors duration-150 hover:bg-accent hover:text-foreground"
            >
              <Paperclip size={19} strokeWidth={1.75} />
            </button>
            <input
              aria-label="Message"
              placeholder="Write a message…"
              className="min-w-0 flex-1 rounded-pill border border-border bg-muted/50 px-4 py-3 text-helper outline-none focus:ring-2 focus:ring-ring/40"
            />
            <button
              type="submit"
              aria-label="Send message"
              className="gradient-primary grid size-11 shrink-0 place-items-center rounded-md text-primary-foreground shadow-soft transition-transform duration-200 hover:-translate-y-0.5"
            >
              <Send size={18} strokeWidth={1.75} />
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
