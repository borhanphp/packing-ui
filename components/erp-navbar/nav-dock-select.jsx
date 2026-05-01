"use client";

import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

import { useNavDock } from "./nav-dock-context";

const OPTIONS = [
  { value: "vertical-start", label: "Vertical · start edge" },
  { value: "vertical-end", label: "Vertical · end edge" },
  { value: "horizontal-top", label: "Horizontal · top" },
  { value: "horizontal-bottom", label: "Horizontal · bottom" },
];

/** Where to dock the ERP nav (persisted via NavDockProvider / localStorage). */
export function NavDockSelect({ selectId, className }) {
  const { dock, setDock } = useNavDock();

  return (
    <div className={cn("relative rounded-lg px-1 py-1 hover:bg-slate-50", className)}>
      <label htmlFor={selectId ?? "erp-nav-dock"} className="sr-only">
        Navigation layout
      </label>
      <select
        id={selectId ?? "erp-nav-dock"}
        value={dock}
        onChange={(e) => setDock(e.target.value)}
        className="w-full cursor-pointer appearance-none rounded-md bg-transparent py-2 pl-2 pr-8 text-sm text-slate-800 outline-none"
      >
        {OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-2 top-1/2 size-4 -translate-y-1/2 text-slate-400"
        aria-hidden
      />
    </div>
  );
}
