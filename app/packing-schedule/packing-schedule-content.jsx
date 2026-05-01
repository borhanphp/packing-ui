"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";

const PACK_STATUSES = [
  "Pending",
  "Inprogress",
  "Awaiting Approval",
  "Pending Fumigation",
  "Approved",
  "Invoiced",
  "Completed",
];

const inputClass =
  "rounded-lg border border-slate-200/95 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-brand/15 focus:border-brand/35 focus:ring-2";

const DEMO_PACKS = [
  {
    id: 10442,
    importExport: "Export",
    customer: "Riverina Co-op",
    commodity: "Feed barley",
    status: "Pending",
    jobReference: "JOB-88921",
    containersRequired: 4,
    mtTotal: 102.4,
    exporter: "AusGrain Pty Ltd",
    destinationCountry: "Vietnam",
    vessel: "Pacific Trader",
    jobNotes: "Docs pending PEM signature.",
  },
  {
    id: 10441,
    importExport: "Import",
    customer: "GrainCorp Trading",
    commodity: "Canola",
    status: "Pending Fumigation",
    jobReference: "JOB-88902",
    containersRequired: 2,
    mtTotal: 58.0,
    exporter: "—",
    destinationCountry: "Australia",
    vessel: "Southern Reef",
    jobNotes: "Awaiting fumigation clearance.",
  },
];

function statusBadge(status) {
  const tone =
    status === "Approved"
      ? "bg-emerald-50 text-emerald-800 ring-emerald-200"
      : status === "Pending Fumigation"
        ? "bg-violet-50 text-violet-900 ring-violet-200"
        : status === "Pending"
          ? "bg-amber-50 text-amber-900 ring-amber-200"
          : "bg-slate-100 text-slate-700 ring-slate-200";
  return `inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ${tone}`;
}

export default function PackingScheduleContent({ queueLabel }) {
  const [search, setSearch] = useState("");
  const [importExportFilter, setImportExportFilter] = useState("all");
  const [searchByDate, setSearchByDate] = useState(false);
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [selectedStatuses, setSelectedStatuses] = useState(() => [...PACK_STATUSES]);
  const [selectedId, setSelectedId] = useState(DEMO_PACKS[0]?.id ?? null);

  const toggleStatus = (s) => {
    setSelectedStatuses((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
  };

  const filtered = useMemo(() => {
    return DEMO_PACKS.filter((p) => selectedStatuses.includes(p.status))
      .filter((p) => importExportFilter === "all" || p.importExport === importExportFilter)
      .filter((p) => {
        if (!search.trim()) return true;
        const q = search.toLowerCase();
        return `${p.id} ${p.jobReference} ${p.customer} ${p.commodity} ${p.vessel} ${p.jobNotes}`.toLowerCase().includes(q);
      });
  }, [search, importExportFilter, selectedStatuses]);

  const selected = DEMO_PACKS.find((p) => p.id === selectedId) || filtered[0] || null;

  return (
    <div className="space-y-6">
      <p className="text-sm text-slate-600">
        Queue: <span className="font-semibold text-slate-900">{queueLabel}</span>. Toolbar and grid follow the Mahonys packing schedule (status
        chips, I/E filter, pack list + detail pane).
      </p>

      <div className="space-y-3 rounded-xl border border-slate-200/90 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-end">
          <div className="min-w-[200px] flex-1 space-y-1">
            <label className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Search</label>
            <input className={`${inputClass} w-full`} value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Job, customer, commodity…" />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Import / export</label>
            <select className={inputClass} value={importExportFilter} onChange={(e) => setImportExportFilter(e.target.value)}>
              <option value="all">All</option>
              <option value="Import">Import</option>
              <option value="Export">Export</option>
            </select>
          </div>
          <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
            <input type="checkbox" checked={searchByDate} onChange={(e) => setSearchByDate(e.target.checked)} className="rounded border-slate-300" />
            Filter by date
          </label>
          {searchByDate ? (
            <input className={inputClass} type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
          ) : null}
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="me-1 self-center text-[11px] font-semibold uppercase tracking-wide text-slate-500">Status</span>
          {PACK_STATUSES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => toggleStatus(s)}
              className={`rounded-full px-2.5 py-1 text-[11px] font-medium ring-1 transition-colors ${
                selectedStatuses.includes(s) ? "bg-brand/15 text-brand-ink ring-brand/30" : "bg-slate-50 text-slate-500 ring-slate-200"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
        <div className="overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-sm">
          <div className="max-h-[420px] overflow-auto xl:max-h-[520px]">
            <table className="w-full min-w-[720px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/90">
                  {["ID", "I/E", "Customer", "Commodity", "Status", "Job ref", "Cnt", "MT"].map((h) => (
                    <th key={h} className="whitespace-nowrap px-3 py-2.5 text-[10px] font-bold uppercase tracking-wide text-slate-500">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr
                    key={p.id}
                    onClick={() => setSelectedId(p.id)}
                    className={`cursor-pointer border-b border-slate-100 last:border-0 ${selected?.id === p.id ? "bg-brand/[0.06]" : "hover:bg-slate-50/80"}`}
                  >
                    <td className="px-3 py-2 font-bold text-brand">{p.id}</td>
                    <td className="px-3 py-2 text-xs text-slate-500">{p.importExport}</td>
                    <td className="px-3 py-2 text-slate-800">{p.customer}</td>
                    <td className="px-3 py-2 text-slate-700">{p.commodity}</td>
                    <td className="px-3 py-2">
                      <span className={statusBadge(p.status)}>{p.status}</span>
                    </td>
                    <td className="px-3 py-2 font-mono text-xs text-slate-500">{p.jobReference}</td>
                    <td className="px-3 py-2 text-right tabular-nums">{p.containersRequired}</td>
                    <td className="px-3 py-2 text-right tabular-nums font-semibold text-emerald-700">{p.mtTotal?.toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4 rounded-xl border border-slate-200/90 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <h3 className="text-sm font-semibold text-slate-900">Pack detail</h3>
            <div className="flex gap-2">
              <Button type="button" size="sm" variant="secondary">
                Save
              </Button>
              <Button type="button" size="sm" variant="destructive">
                Delete
              </Button>
            </div>
          </div>
          {selected ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Pack ID" value={String(selected.id)} highlight />
              <Field label="Status" value={selected.status} />
              <Field label="Customer" value={selected.customer} />
              <Field label="Commodity" value={selected.commodity} />
              <Field label="Import / export" value={selected.importExport} />
              <Field label="Job reference" value={selected.jobReference} />
              <Field label="Exporter" value={selected.exporter} />
              <Field label="Destination" value={selected.destinationCountry} />
              <Field label="Vessel" value={selected.vessel} />
              <Field label="Containers required" value={String(selected.containersRequired)} />
              <Field label="MT total" value={selected.mtTotal?.toFixed(2)} />
              <div className="space-y-1 sm:col-span-2">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Job notes</span>
                <textarea className={`${inputClass} min-h-[88px] w-full resize-y`} readOnly value={selected.jobNotes} />
              </div>
            </div>
          ) : (
            <p className="text-sm text-slate-500">Select a pack from the schedule.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, highlight }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{label}</span>
      <span className={`text-sm ${highlight ? "font-semibold text-brand" : "font-medium text-slate-800"}`}>{value ?? "—"}</span>
    </div>
  );
}
