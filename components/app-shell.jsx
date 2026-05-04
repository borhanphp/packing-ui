"use client";

import { ErpNavbar, NavDockProvider, SiteProvider, useNavDock } from "@/components/erp-navbar";

import { cn } from "@/lib/utils";

const SHELL_BG =
  "bg-[#f6f8fc] bg-[radial-gradient(ellipse_120%_80%_at_50%_-12%,rgba(0,112,255,0.09),transparent_55%)]";

function MainPanel({ children }) {
  return (
    <main className="relative min-h-dvh min-w-0 flex-1 overflow-x-hidden p-6 md:p-10">
      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-brand/35 to-transparent" />
      <div className="relative">{children}</div>
    </main>
  );
}

function AppShellInner({ children }) {
  const { dock, isVertical } = useNavDock();

  if (!isVertical) {
    const top = dock === "horizontal-top";
    return (
      <div className={cn("flex min-h-dvh flex-col text-slate-900", SHELL_BG)}>
        {top ? (
          <>
            <ErpNavbar />
            <MainPanel>{children}</MainPanel>
          </>
        ) : (
          <>
            <MainPanel>{children}</MainPanel>
            <ErpNavbar />
          </>
        )}
      </div>
    );
  }

  if (dock === "vertical-end") {
    return (
      <div className={cn("flex min-h-dvh flex-row text-slate-900", SHELL_BG)}>
        <MainPanel>{children}</MainPanel>
        <ErpNavbar />
      </div>
    );
  }

  return (
    <div className={cn("flex min-h-dvh flex-row text-slate-900", SHELL_BG)}>
      <ErpNavbar />
      <MainPanel>{children}</MainPanel>
    </div>
  );
}

export function AppShell({ children }) {
  return (
    <SiteProvider>
      <NavDockProvider>
        <AppShellInner>{children}</AppShellInner>
      </NavDockProvider>
    </SiteProvider>
  );
}
