"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SectionRouteDropdown } from "@/components/section-route-dropdown";
import { REFERENCE_DATA_NAV } from "@/lib/reference-data-nav";
import { cn } from "@/lib/utils";

const REFERENCE_DATA_ITEMS = REFERENCE_DATA_NAV.map(({ slug, label }) => ({
  label,
  href: `/reference-data/${slug}`,
}));

function ReferenceDataTabs() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Reference data categories"
      className="flex w-full min-w-0 flex-nowrap items-end gap-1 overflow-x-auto py-0 [scrollbar-width:thin]"
      role="tablist"
    >
      {REFERENCE_DATA_NAV.map(({ slug, label }) => {
        const href = `/reference-data/${slug}`;
        const active = pathname === href;
        return (
          <Link
            key={slug}
            href={href}
            role="tab"
            aria-selected={active}
            className={cn(
              "inline-flex shrink-0 items-center border-b-2 border-transparent px-2 py-1.5 text-xs font-medium transition-colors md:px-3 md:py-2 md:text-sm",
              active
                ? "border-brand text-brand-ink"
                : "text-slate-600 hover:border-slate-300 hover:text-slate-900"
            )}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

export function ReferenceDataBubbleNav() {
  return (
    <>
      <div className="w-full min-w-0 md:hidden">
        <SectionRouteDropdown
          ariaLabel="Reference data categories"
          items={REFERENCE_DATA_ITEMS}
          placeholder="Select category"
        />
      </div>
      <div className="hidden w-full min-w-0 md:block">
        <ReferenceDataTabs />
      </div>
    </>
  );
}
