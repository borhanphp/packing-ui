"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";

export function SectionRouteDropdown({ ariaLabel, items, placeholder }) {
  const pathname = usePathname();
  const selected = items.find((i) => pathname === i.href);
  const label = selected?.label ?? placeholder;

  return (
    <nav aria-label={ariaLabel} className="flex w-full min-w-0 items-center justify-between gap-3 md:gap-4">
      <span className="min-w-0 flex-1 truncate text-base font-semibold tracking-tight text-slate-900 md:text-lg">{label}</span>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger
          type="button"
          aria-label={`Open ${ariaLabel}`}
          className={cn(
            "inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-lg text-slate-600 outline-none ring-brand/25 transition-colors",
            "hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-2",
            "md:size-10"
          )}
        >
          <Menu className="size-[1.125rem] shrink-0 stroke-[2.25] md:size-5 md:stroke-[2]" aria-hidden />
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            side="bottom"
            align="end"
            sideOffset={6}
            collisionPadding={12}
            className="z-50 max-h-[min(24rem,var(--radix-dropdown-menu-content-available-height))] min-w-[12rem] overflow-y-auto rounded-lg border border-slate-200 bg-white p-1 text-sm shadow-lg"
          >
            {items.map((item) => {
              const active = pathname === item.href;
              return (
                <DropdownMenu.Item key={item.href} asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex cursor-pointer items-center rounded-md px-2 py-2 outline-none transition-colors",
                      active ? "bg-brand/15 font-medium text-brand-ink" : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                    )}
                  >
                    {item.label}
                  </Link>
                </DropdownMenu.Item>
              );
            })}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </nav>
  );
}
