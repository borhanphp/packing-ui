"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";

const inputClass =
  "rounded-lg border border-slate-200/95 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-brand/15 focus:border-brand/35 focus:ring-2";

const CMOS = [
  {
    id: 1,
    cmoReference: "CMO-0142",
    direction: "in",
    customer: "GrainCorp Trading",
    commodityType: "Grain",
    commodity: "Feed barley",
    status: "Open",
    bookings: 3,
    estimatedAmount: 5200,
  },
  {
    id: 2,
    cmoReference: "CMO-0140",
    direction: "out",
    customer: "Riverina Co-op",
    commodityType: "Oilseeds",
    commodity: "Canola",
    status: "In progress",
    bookings: 1,
    estimatedAmount: 2100,
  },
];

export default function CmoTicketingClient() {
  const [cmoTypeFilter, setCmoTypeFilter] = useState("all");
  const [search, setSearch] = useState("");

  const rows = useMemo(() => {
    return CMOS.filter((c) => cmoTypeFilter === "all" || c.direction === cmoTypeFilter).filter((c) => {
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return `${c.cmoReference} ${c.customer} ${c.commodity} ${c.status}`.toLowerCase().includes(q);
    });
  }, [cmoTypeFilter, search]);

  return (
    <div className="space-y-8">
      <div>
        <nav className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500" aria-label="Breadcrumb">
          <span>Operations</span>
          <span className="text-slate-300" aria-hidden>
            /
          </span>
          <span className="font-semibold text-slate-900">CMO</span>
        </nav>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 md:text-[1.65rem]">CMO</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          CMO register matching Mahonys <span className="font-mono text-xs text-slate-500">cmo.js</span>—reference, direction, customer,
          commodities, workflow status, and booking counts.
        </p>
      </div>

      <section className="space-y-4 rounded-xl border border-slate-200/90 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-900">Create / edit CMO</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-1">
            <label className="text-[11px] font-semibold uppercase text-slate-500">Direction</label>
            <select className={inputClass} defaultValue="in">
              <option value="in">Incoming</option>
              <option value="out">Outgoing</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-semibold uppercase text-slate-500">Customer</label>
            <select className={inputClass}>
              <option value="">Select customer…</option>
              <option>GrainCorp Trading</option>
              <option>Riverina Co-op</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-semibold uppercase text-slate-500">Status</label>
            <select className={inputClass}>
              <option>Open</option>
              <option>In progress</option>
              <option>Closed</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-semibold uppercase text-slate-500">Commodity type</label>
            <select className={inputClass}>
              <option>Grain</option>
              <option>Oilseeds</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-semibold uppercase text-slate-500">Commodity</label>
            <select className={inputClass}>
              <option>Feed barley</option>
              <option>Canola</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-semibold uppercase text-slate-500">Estimated amount (MT)</label>
            <input className={inputClass} inputMode="decimal" placeholder="e.g. 5200" />
          </div>
          <div className="space-y-1 sm:col-span-2 lg:col-span-3">
            <label className="text-[11px] font-semibold uppercase text-slate-500">Note</label>
            <textarea className={`${inputClass} min-h-[80px] w-full resize-y`} placeholder="Operational notes, references…" />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button type="button">Save CMO</Button>
          <Button type="button" variant="outline">
            Manage bookings
          </Button>
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            className={`${inputClass} min-w-[200px] flex-1`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search CMOs…"
          />
          <select className={inputClass} value={cmoTypeFilter} onChange={(e) => setCmoTypeFilter(e.target.value)}>
            <option value="all">All directions</option>
            <option value="in">Incoming</option>
            <option value="out">Outgoing</option>
          </select>
        </div>
        <div className="overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-sm">
          <div className="overflow-auto">
            <table className="w-full min-w-[820px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/90">
                  {["CMO ref", "Dir", "Customer", "Commodity type", "Commodity", "Status", "Bookings", "Est. (MT)"].map((h) => (
                    <th key={h} className="whitespace-nowrap px-3 py-2.5 text-[10px] font-bold uppercase tracking-wide text-slate-500">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((c) => (
                  <tr key={c.id} className="border-b border-slate-100 last:border-0">
                    <td className="px-3 py-2 font-semibold text-brand">{c.cmoReference}</td>
                    <td className="px-3 py-2 text-xs font-semibold uppercase text-slate-600">{c.direction}</td>
                    <td className="px-3 py-2 text-slate-700">{c.customer}</td>
                    <td className="px-3 py-2 text-slate-600">{c.commodityType}</td>
                    <td className="px-3 py-2 text-slate-700">{c.commodity}</td>
                    <td className="px-3 py-2">
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-800">{c.status}</span>
                    </td>
                    <td className="px-3 py-2 text-right tabular-nums text-slate-700">{c.bookings}</td>
                    <td className="px-3 py-2 text-right tabular-nums text-slate-700">{c.estimatedAmount?.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
