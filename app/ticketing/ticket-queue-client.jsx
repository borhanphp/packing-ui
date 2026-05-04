"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-sm text-slate-900 outline-none ring-brand/15 placeholder:text-slate-400 focus:border-brand/35 focus:ring-2";

const filterInputClass =
  "w-full rounded-md border border-slate-200/90 bg-white px-2 py-1 text-xs text-slate-800 outline-none placeholder:text-slate-400 focus:border-brand/35 focus:ring-1 focus:ring-brand/25";

const COLUMN_DEFS = [
  { key: "id", header: "ID" },
  { key: "customerCmo", header: "CUSTOMER / CMO" },
  { key: "commodityGrade", header: "COMMODITY & GRADE" },
  { key: "truck", header: "TRUCK" },
  { key: "status", header: "STATUS" },
  { key: "netT", header: "NET (T)", numeric: true },
];

const STATUS_OPTIONS = [
  {
    key: "booked",
    label: "Booked",
    activeRing: "ring-brand/40 bg-brand/10 text-brand-ink",
    inactiveRing: "ring-brand/25 text-brand hover:bg-brand/5",
  },
  {
    key: "processing",
    label: "Processing",
    activeRing: "ring-amber-400/50 bg-amber-50 text-amber-900",
    inactiveRing: "ring-amber-300/60 text-amber-800 hover:bg-amber-50/80",
  },
  {
    key: "completed",
    label: "Completed",
    activeRing: "ring-emerald-400/45 bg-emerald-50 text-emerald-900",
    inactiveRing: "ring-emerald-300/50 text-emerald-800 hover:bg-emerald-50/80",
  },
  {
    key: "cancelled",
    label: "Cancelled",
    activeRing: "ring-slate-300 bg-slate-100 text-slate-800",
    inactiveRing: "ring-slate-200 text-slate-600 hover:bg-slate-50",
  },
];

const IN_ROWS = [
  {
    id: 10421,
    customerCmo: "GrainCorp Trading / CMO-0142",
    commodityGrade: "Feed barley · MALT1",
    truck: "MHY-104",
    status: "booked",
    netT: null,
    date: "2026-05-01",
    notes: "Awaiting weighbridge slot.",
  },
  {
    id: 10418,
    customerCmo: "Riverina Co-op / CMO-0139",
    commodityGrade: "Wheat · APW1",
    truck: "MHY-190",
    status: "processing",
    netT: 42.55,
    date: "2026-05-01",
    notes: "Second gross pending.",
  },
  {
    id: 10398,
    customerCmo: "Sample Holdings / CMO-0110",
    commodityGrade: "Fertiliser · UREA",
    truck: "MHY-055",
    status: "cancelled",
    netT: null,
    date: "2026-04-28",
    notes: "Cancelled — truck breakdown.",
  },
];

const OUT_ROWS = [
  {
    id: 8821,
    customerCmo: "Riverina Co-op / CMO-0138",
    commodityGrade: "Canola · NON-GM",
    truck: "MHY-227",
    status: "booked",
    netT: null,
    date: "2026-05-01",
    notes: "Loader 2 assigned.",
  },
  {
    id: 8814,
    customerCmo: "GrainCorp Trading / CMO-0135",
    commodityGrade: "Feed barley · F1",
    truck: "MHY-104",
    status: "processing",
    netT: 38.2,
    date: "2026-05-01",
    notes: "Seal check complete.",
  },
  {
    id: 8802,
    customerCmo: "Pacific Charter / CMO-0128",
    commodityGrade: "Wheat · ASW1",
    truck: "MHY-088",
    status: "completed",
    netT: 95.0,
    date: "2026-04-29",
    notes: "Dispatched 14:10.",
  },
];

function statusBadgeClass(status) {
  switch (status) {
    case "booked":
      return "bg-brand/12 text-brand-ink ring-1 ring-brand/25";
    case "processing":
      return "bg-amber-50 text-amber-900 ring-1 ring-amber-200";
    case "completed":
      return "bg-emerald-50 text-emerald-900 ring-1 ring-emerald-200";
    case "cancelled":
      return "bg-slate-100 text-slate-700 ring-1 ring-slate-200";
    default:
      return "bg-slate-50 text-slate-700 ring-1 ring-slate-200";
  }
}

function formatNet(v) {
  if (v === null || v === undefined || Number.isNaN(v)) return "—";
  return Number(v).toFixed(2);
}

export default function TicketQueueClient({ variant }) {
  const router = useRouter();
  const baseRows = variant === "incoming" ? IN_ROWS : OUT_ROWS;
  const breadcrumbCurrent = variant === "incoming" ? "Incoming" : "Outgoing";
  const title = variant === "incoming" ? "Incoming Tickets" : "Outgoing Tickets";

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState(() => new Set(STATUS_OPTIONS.map((s) => s.key)));
  const [byDate, setByDate] = useState(false);
  const [filterDate, setFilterDate] = useState("");
  const [colFilters, setColFilters] = useState(() =>
    Object.fromEntries(COLUMN_DEFS.map((c) => [c.key, ""]))
  );
  const [visibleCols, setVisibleCols] = useState(() =>
    Object.fromEntries(COLUMN_DEFS.map((c) => [c.key, true]))
  );
  const [selectedId, setSelectedId] = useState(null);

  const toggleStatus = (key) => {
    setStatusFilter((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const toggleColumn = (key) => {
    setVisibleCols((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      if (!Object.values(next).some(Boolean)) return prev;
      return next;
    });
  };

  const filteredRows = useMemo(() => {
    return baseRows.filter((row) => {
      if (statusFilter.size === 0) return false;
      if (!statusFilter.has(row.status)) return false;
      if (byDate && filterDate && row.date !== filterDate) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        const blob = `${row.id} ${row.customerCmo} ${row.commodityGrade} ${row.truck} ${row.status} ${formatNet(row.netT)}`.toLowerCase();
        if (!blob.includes(q)) return false;
      }
      for (const col of COLUMN_DEFS) {
        const f = (colFilters[col.key] || "").trim().toLowerCase();
        if (!f) continue;
        let cell = "";
        if (col.key === "netT") cell = formatNet(row.netT).toLowerCase();
        else if (col.key === "status") cell = String(row.status).toLowerCase();
        else cell = String(row[col.key] ?? "").toLowerCase();
        if (!cell.includes(f)) return false;
      }
      return true;
    });
  }, [baseRows, statusFilter, byDate, filterDate, search, colFilters]);

  useEffect(() => {
    if (selectedId != null && !filteredRows.some((r) => r.id === selectedId)) {
      setSelectedId(null);
    }
  }, [filteredRows, selectedId]);

  const selected = selectedId != null ? filteredRows.find((r) => r.id === selectedId) ?? null : null;
  const visibleColumnList = COLUMN_DEFS.filter((c) => visibleCols[c.key]);
  const colCount = Math.max(visibleColumnList.length, 1);

  return (
    <div className="space-y-5">
      <div>
        <nav className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500" aria-label="Breadcrumb">
          <span>Operations</span>
          <span className="text-slate-300" aria-hidden>
            /
          </span>
          <span className="font-semibold text-slate-900">{breadcrumbCurrent}</span>
        </nav>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 md:text-[1.65rem]">{title}</h1>
      </div>

      <div className="rounded-xl border border-slate-200/90 bg-white p-3 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-center">
        <input
          className={`${inputClass} lg:min-w-[240px] lg:flex-1`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tickets…"
        />
        <div className="flex flex-wrap items-center gap-2">
          {STATUS_OPTIONS.map(({ key, label, activeRing, inactiveRing }) => {
            const on = statusFilter.has(key);
            return (
              <button
                key={key}
                type="button"
                onClick={() => toggleStatus(key)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-semibold ring-1 transition-colors",
                  on ? activeRing : inactiveRing
                )}
              >
                {label}
              </button>
            );
          })}
        </div>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={byDate}
            onChange={(e) => setByDate(e.target.checked)}
            className="size-3.5 rounded border-slate-300 text-brand focus:ring-brand/30"
          />
          By Date
        </label>
        {byDate ? (
          <input className={`${inputClass} w-auto max-w-[11rem]`} type="date" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} />
        ) : null}
        <div className="flex flex-wrap gap-2 lg:ms-auto">
          <Button
            type="button"
            size="sm"
            className="border border-brand/35"
            onClick={() =>
              router.push(variant === "incoming" ? "/ticketing/in/new" : "/ticketing/outgoing/new")
            }
          >
            + Create
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="border-slate-300"
            disabled={!selected}
            onClick={() =>
              selected &&
              router.push(
                variant === "incoming" ? `/ticketing/in/${selected.id}` : `/ticketing/outgoing/${selected.id}`
              )
            }
          >
            Edit
          </Button>
          <Button type="button" variant="destructive" size="sm" className="border border-red-300/80" disabled={!selected}>
            Delete
          </Button>
        </div>
      </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(240px,320px)] xl:items-start">
        <div className="min-w-0 space-y-2">
          <details className="group relative w-fit">
            <summary
              className="flex cursor-pointer list-none items-center gap-1 rounded-lg border border-slate-200/90 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 [&::-webkit-details-marker]:hidden"
            >
              Columns
              <ChevronDown className="size-3.5 text-slate-500 transition-transform group-open:rotate-180" aria-hidden />
            </summary>
            <div className="absolute left-0 z-20 mt-1 min-w-[12rem] rounded-lg border border-slate-200 bg-white p-2 shadow-lg">
              {COLUMN_DEFS.map((col) => (
                <label key={col.key} className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm text-slate-700 hover:bg-slate-50">
                  <input
                    type="checkbox"
                    checked={visibleCols[col.key]}
                    onChange={() => toggleColumn(col.key)}
                    className="rounded border-slate-300 text-brand focus:ring-brand/30"
                  />
                  <span className="text-xs font-medium">{col.header}</span>
                </label>
              ))}
            </div>
          </details>

          <div className="overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/95">
                    {COLUMN_DEFS.map((col) =>
                      visibleCols[col.key] ? (
                        <th
                          key={col.key}
                          className={cn(
                            "whitespace-nowrap px-3 py-2.5 text-[10px] font-bold uppercase tracking-wide text-slate-500",
                            col.numeric && "text-right"
                          )}
                        >
                          {col.header}
                        </th>
                      ) : null
                    )}
                  </tr>
                  <tr className="border-b border-slate-200 bg-white">
                    {COLUMN_DEFS.map((col) =>
                      visibleCols[col.key] ? (
                        <th key={`f-${col.key}`} className="px-2 py-1.5">
                          <input
                            className={filterInputClass}
                            placeholder="Filter…"
                            value={colFilters[col.key]}
                            onChange={(e) => setColFilters((prev) => ({ ...prev, [col.key]: e.target.value }))}
                            aria-label={`Filter ${col.header}`}
                          />
                        </th>
                      ) : null
                    )}
                  </tr>
                </thead>
                <tbody>
                  {filteredRows.length === 0 ? (
                    <tr>
                      <td colSpan={colCount} className="px-3 py-14 text-center text-sm text-slate-400">
                        No tickets match the current filters.
                      </td>
                    </tr>
                  ) : (
                    filteredRows.map((row) => {
                      const isSel = selectedId === row.id;
                      return (
                        <tr
                          key={row.id}
                          onClick={() => setSelectedId(row.id)}
                          className={cn(
                            "cursor-pointer border-b border-slate-100 transition-colors last:border-0",
                            isSel ? "bg-brand/[0.07]" : "hover:bg-slate-50/90"
                          )}
                        >
                          {visibleCols.id ? (
                            <td className="px-3 py-2.5 font-semibold tabular-nums text-brand">{row.id}</td>
                          ) : null}
                          {visibleCols.customerCmo ? (
                            <td className="max-w-[220px] px-3 py-2.5 text-slate-800">{row.customerCmo}</td>
                          ) : null}
                          {visibleCols.commodityGrade ? (
                            <td className="max-w-[200px] px-3 py-2.5 text-slate-700">{row.commodityGrade}</td>
                          ) : null}
                          {visibleCols.truck ? (
                            <td className="px-3 py-2.5 font-mono text-xs text-slate-700">{row.truck}</td>
                          ) : null}
                          {visibleCols.status ? (
                            <td className="px-3 py-2.5">
                              <span className={cn("inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold capitalize", statusBadgeClass(row.status))}>
                                {row.status}
                              </span>
                            </td>
                          ) : null}
                          {visibleCols.netT ? (
                            <td className="px-3 py-2.5 text-right tabular-nums font-medium text-slate-800">{formatNet(row.netT)}</td>
                          ) : null}
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <aside className="rounded-xl border border-slate-200/90 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900">Ticket Details</h2>
          {!selected ? (
            <p className="mt-4 text-sm leading-relaxed text-slate-500">Select a ticket to view details.</p>
          ) : (
            <dl className="mt-4 space-y-3 text-sm">
              <DetailItem label="ID" value={String(selected.id)} highlight />
              <DetailItem label="Customer / CMO" value={selected.customerCmo} />
              <DetailItem label="Commodity & grade" value={selected.commodityGrade} />
              <DetailItem label="Truck" value={selected.truck} mono />
              <DetailItem label="Status" value={<span className={cn("rounded-full px-2 py-0.5 text-[11px] font-semibold capitalize", statusBadgeClass(selected.status))}>{selected.status}</span>} />
              <DetailItem label="Net (T)" value={formatNet(selected.netT)} />
              <DetailItem label="Date" value={selected.date} />
              <DetailItem label="Notes" value={selected.notes || "—"} />
            </dl>
          )}
        </aside>
      </div>
    </div>
  );
}

function DetailItem({ label, value, highlight, mono }) {
  return (
    <div>
      <dt className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{label}</dt>
      <dd className={cn("mt-0.5 text-slate-800", highlight && "font-semibold text-brand", mono && "font-mono text-xs")}>{value}</dd>
    </div>
  );
}
