"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SectionRouteDropdown } from "@/components/section-route-dropdown";
import { TICKETING_NAV } from "@/lib/ticketing-nav";
import { cn } from "@/lib/utils";

const TICKETING_ITEMS = TICKETING_NAV.map(({ label, href }) => ({ label, href }));

function TicketingTabs() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Ticketing sections"
      className="flex w-full min-w-0 flex-nowrap items-end gap-1 overflow-x-auto py-0 [scrollbar-width:thin]"
      role="tablist"
    >
      {TICKETING_NAV.map(({ slug, label, href }) => {
        const active = pathname === href;
        return (
          <Link
            key={slug}
            href={href}
            role="tab"
            aria-selected={active}
            className={cn(
              "inline-flex shrink-0 items-center border-b-2 border-transparent px-2 py-1.5 text-xs font-medium transition-colors md:px-3 md:py-2 md:text-sm",
              active ? "border-brand text-brand-ink" : "text-slate-600 hover:border-slate-300 hover:text-slate-900"
            )}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

export function TicketingBubbleNav() {
  return (
    <>
      <div className="w-full min-w-0 md:hidden">
        <SectionRouteDropdown ariaLabel="Ticketing sections" items={TICKETING_ITEMS} placeholder="Ticketing" />
      </div>
      <div className="hidden w-full min-w-0 md:block">
        <TicketingTabs />
      </div>
    </>
  );
}
