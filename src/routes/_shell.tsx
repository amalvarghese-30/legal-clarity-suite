import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";

export const Route = createFileRoute("/_shell")({
  component: ShellLayout,
});

function ShellLayout() {
  return (
    <div className="app-canvas min-h-screen">
      <div className="mx-auto flex w-full max-w-[1600px] gap-6 px-4 pb-10 lg:px-6">
        <aside className="sticky top-4 hidden h-[calc(100vh-2rem)] shrink-0 py-4 lg:block">
          <Sidebar />
        </aside>
        <div className="flex min-w-0 flex-1 flex-col py-4">
          <Topbar />
          <main className="page-enter mt-6 min-w-0">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
