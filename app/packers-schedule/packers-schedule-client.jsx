"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

const inputClass =
  "rounded-lg border border-slate-200/95 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-brand/15 focus:border-brand/35 focus:ring-2";

const SHIFT_ROWS = [
  { station: "Dock North A", mon: "Alex", tue: "Alex", wed: "Jamie", thu: "Pat", fri: "Alex" },
  { station: "Dock South", mon: "Jamie", tue: "Pat", wed: "Alex", thu: "Jamie", fri: "Pat" },
];

const PACKERS = [
  { id: 1, name: "Dock North A", description: "Heavy lift bay", status: "Active" },
  { id: 2, name: "Dock South", description: "General cargo", status: "Under maintenance" },
];

export default function PackersScheduleClient() {
  const [weekStart, setWeekStart] = useState("2026-04-28");

  return (
    <div className="space-y-8">
      <p className="max-w-2xl text-sm text-slate-600">
        Combines Mahonys packer master data with a lightweight roster grid—assign primary packers by station for the working week.
      </p>

      <section className="space-y-4 rounded-xl border border-slate-200/90 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="space-y-1">
            <label className="text-[11px] font-semibold uppercase text-slate-500">Week starting</label>
            <input className={inputClass} type="date" value={weekStart} onChange={(e) => setWeekStart(e.target.value)} />
          </div>
          <Button type="button" variant="secondary" size="sm">
            Publish roster
          </Button>
        </div>
        <div className="overflow-auto rounded-lg border border-slate-200">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-3 py-2 text-[10px] font-bold uppercase tracking-wide text-slate-500">Station</th>
                {["Mon", "Tue", "Wed", "Thu", "Fri"].map((d) => (
                  <th key={d} className="px-3 py-2 text-[10px] font-bold uppercase tracking-wide text-slate-500">
                    {d}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SHIFT_ROWS.map((r) => (
                <tr key={r.station} className="border-b border-slate-100 last:border-0">
                  <td className="px-3 py-2 font-semibold text-slate-900">{r.station}</td>
                  <td className="px-3 py-2">
                    <input className={inputClass} defaultValue={r.mon} />
                  </td>
                  <td className="px-3 py-2">
                    <input className={inputClass} defaultValue={r.tue} />
                  </td>
                  <td className="px-3 py-2">
                    <input className={inputClass} defaultValue={r.wed} />
                  </td>
                  <td className="px-3 py-2">
                    <input className={inputClass} defaultValue={r.thu} />
                  </td>
                  <td className="px-3 py-2">
                    <input className={inputClass} defaultValue={r.fri} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-slate-900">Packer stations (reference)</h2>
        <div className="overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-sm">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/90">
                {["Name", "Description", "Status"].map((h) => (
                  <th key={h} className="px-3 py-2.5 text-[10px] font-bold uppercase tracking-wide text-slate-500">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PACKERS.map((p) => (
                <tr key={p.id} className="border-b border-slate-100 last:border-0">
                  <td className="px-3 py-2 font-semibold text-brand">{p.name}</td>
                  <td className="px-3 py-2 text-slate-600">{p.description}</td>
                  <td className="px-3 py-2 text-slate-700">{p.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
