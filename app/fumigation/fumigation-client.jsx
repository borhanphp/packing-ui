"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

const inputClass =
  "rounded-lg border border-slate-200/95 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-brand/15 focus:border-brand/35 focus:ring-2";

const LOTS = [
  {
    id: "FUM-014",
    packJob: "JOB-88902",
    commodity: "Canola",
    chemical: "Methyl bromide substitute",
    appliedAt: "2026-05-01 06:15",
    clearedAt: "—",
    status: "Awaiting clearance",
    inspector: "QA East",
  },
  {
    id: "FUM-013",
    packJob: "JOB-88771",
    commodity: "Feed barley",
    chemical: "Heat treatment",
    appliedAt: "2026-04-29 22:00",
    clearedAt: "2026-04-30 08:30",
    status: "Released",
    inspector: "QA East",
  },
];

export default function FumigationClient() {
  const [lotRef, setLotRef] = useState("");
  const [packJob, setPackJob] = useState("");
  const [chemical, setChemical] = useState("");
  const [appliedAt, setAppliedAt] = useState("");
  const [clearedAt, setClearedAt] = useState("");
  const [status, setStatus] = useState("scheduled");
  const [inspector, setInspector] = useState("");
  const [notes, setNotes] = useState("");

  return (
    <div className="space-y-8">
      <p className="max-w-2xl text-sm text-slate-600">
        Operational counterpart to packs sitting in Pending Fumigation—record treatments,
        inspectors, and clearance timestamps like downstream compliance steps in Mahonys.
      </p>

      <section className="space-y-4 rounded-xl border border-slate-200/90 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-900">Treatment record</h2>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="space-y-1">
            <label className="text-[11px] font-semibold uppercase text-slate-500">Lot / treatment ref</label>
            <input className={inputClass} value={lotRef} onChange={(e) => setLotRef(e.target.value)} placeholder="FUM-0xx" />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-semibold uppercase text-slate-500">Pack job</label>
            <input className={inputClass} value={packJob} onChange={(e) => setPackJob(e.target.value)} placeholder="JOB-88902" />
          </div>
          <div className="space-y-1 lg:col-span-2">
            <label className="text-[11px] font-semibold uppercase text-slate-500">Chemical / method</label>
            <input className={inputClass} value={chemical} onChange={(e) => setChemical(e.target.value)} />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-semibold uppercase text-slate-500">Applied at</label>
            <input className={inputClass} type="datetime-local" value={appliedAt} onChange={(e) => setAppliedAt(e.target.value)} />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-semibold uppercase text-slate-500">Cleared at</label>
            <input className={inputClass} type="datetime-local" value={clearedAt} onChange={(e) => setClearedAt(e.target.value)} />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-semibold uppercase text-slate-500">Status</label>
            <select className={inputClass} value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="scheduled">Scheduled</option>
              <option value="in_progress">In progress</option>
              <option value="awaiting_clearance">Awaiting clearance</option>
              <option value="released">Released</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-semibold uppercase text-slate-500">Inspector / QA</label>
            <input className={inputClass} value={inspector} onChange={(e) => setInspector(e.target.value)} />
          </div>
          <div className="space-y-1 lg:col-span-2">
            <label className="text-[11px] font-semibold uppercase text-slate-500">Notes</label>
            <textarea className={`${inputClass} min-h-[88px] w-full resize-y`} value={notes} onChange={(e) => setNotes(e.target.value)} />
          </div>
        </div>
        <Button type="button">Save treatment</Button>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-slate-900">Recent lots</h2>
        <div className="overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-sm">
          <div className="overflow-auto">
            <table className="w-full min-w-[860px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/90">
                  {["Lot", "Pack job", "Commodity", "Chemical", "Applied", "Cleared", "Status", "Inspector"].map((h) => (
                    <th key={h} className="whitespace-nowrap px-3 py-2.5 text-[10px] font-bold uppercase tracking-wide text-slate-500">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {LOTS.map((r) => (
                  <tr key={r.id} className="border-b border-slate-100 last:border-0">
                    <td className="px-3 py-2 font-semibold text-brand">{r.id}</td>
                    <td className="px-3 py-2 font-mono text-xs text-slate-700">{r.packJob}</td>
                    <td className="px-3 py-2 text-slate-700">{r.commodity}</td>
                    <td className="px-3 py-2 text-slate-600">{r.chemical}</td>
                    <td className="px-3 py-2 text-slate-600">{r.appliedAt}</td>
                    <td className="px-3 py-2 text-slate-600">{r.clearedAt}</td>
                    <td className="px-3 py-2 text-slate-800">{r.status}</td>
                    <td className="px-3 py-2 text-slate-600">{r.inspector}</td>
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
