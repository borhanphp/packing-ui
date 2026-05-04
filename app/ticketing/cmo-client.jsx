"use client";

import { useMemo, useState } from "react";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const inputClass =
  "h-9 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none ring-brand/15 placeholder:text-slate-400 focus:border-brand/35 focus:ring-2";

const filterInputClass =
  "h-6 w-full rounded border border-slate-200 bg-white px-1.5 text-[10px] font-normal text-slate-700 outline-none placeholder:text-slate-400 focus:border-brand/35";

const DIRECTION_OPTIONS = [
  { value: "incoming", label: "Incoming" },
  { value: "outgoing", label: "Outgoing" },
];

const CUSTOMER_OPTIONS = ["GrainCorp Trading", "Riverina Co-op", "Pacific Charter"];
const COMMODITY_TYPE_OPTIONS = ["Grain", "Oilseeds", "Fertiliser"];
const COMMODITY_OPTIONS = {
  Grain: ["Feed barley", "Wheat"],
  Oilseeds: ["Canola", "Sunflower"],
  Fertiliser: ["UREA", "DAP"],
};

const DEFAULT_STATUSES = ["Open", "In Progress", "Completed", "Cancelled"];

const TABLE_COLUMNS = [
  { key: "cmoReference", label: "CMO REF" },
  { key: "id", label: "ID" },
  { key: "customer", label: "CUSTOMER" },
  { key: "commodityType", label: "COMMODITY TYPE" },
  { key: "commodity", label: "COMMODITY" },
  { key: "status", label: "STATUS" },
  { key: "bookings", label: "BOOKINGS" },
];

function emptyForm(statuses) {
  return {
    direction: "incoming",
    customer: "",
    commodityType: "",
    commodity: "",
    status: statuses[0] || "",
    estimatedAmount: "0",
    actualAmountDelivered: "0",
    additionalReferenceDraft: "",
    additionalReferences: [],
    attachments: [],
    note: "",
  };
}

export default function CmoTicketingClient() {
  const [rows, setRows] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [statuses, setStatuses] = useState(DEFAULT_STATUSES);
  const [showModal, setShowModal] = useState(false);
  const [newStatusDraft, setNewStatusDraft] = useState("");
  const [colFilters, setColFilters] = useState(() =>
    Object.fromEntries(TABLE_COLUMNS.map((column) => [column.key, ""]))
  );
  const [form, setForm] = useState(() => emptyForm(DEFAULT_STATUSES));

  const filteredRows = useMemo(() => {
    return rows
      .filter((row) => activeTab === "all" || row.direction === activeTab)
      .filter((row) => {
        return TABLE_COLUMNS.every((column) => {
          const f = (colFilters[column.key] || "").trim().toLowerCase();
          if (!f) return true;
          return String(row[column.key] ?? "")
            .toLowerCase()
            .includes(f);
        });
      });
  }, [rows, activeTab, colFilters]);

  const selected = useMemo(() => filteredRows.find((row) => row.id === selectedId) || null, [filteredRows, selectedId]);

  const commodityChoices = form.commodityType ? COMMODITY_OPTIONS[form.commodityType] || [] : [];

  function openCreateModal() {
    setForm(emptyForm(statuses));
    setShowModal(true);
  }

  function closeCreateModal() {
    setShowModal(false);
    setNewStatusDraft("");
  }

  function setField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function addStatusOption() {
    const next = newStatusDraft.trim();
    if (!next) return;
    if (statuses.some((s) => s.toLowerCase() === next.toLowerCase())) return;
    setStatuses((prev) => [...prev, next]);
    setForm((prev) => ({ ...prev, status: next }));
    setNewStatusDraft("");
  }

  function addAdditionalReference() {
    const ref = form.additionalReferenceDraft.trim();
    if (!ref) return;
    setForm((prev) => ({
      ...prev,
      additionalReferences: [...prev.additionalReferences, ref],
      additionalReferenceDraft: "",
    }));
  }

  function createCmo() {
    if (!form.customer || !form.commodityType || !form.commodity || !form.status) return;

    const nextId = rows.length ? Math.max(...rows.map((r) => Number(r.id) || 0)) + 1 : 1;
    const cmoReference = `CMO-${String(nextId).padStart(4, "0")}`;
    const nextRow = {
      id: nextId,
      cmoReference,
      direction: form.direction,
      customer: form.customer,
      commodityType: form.commodityType,
      commodity: form.commodity,
      status: form.status,
      bookings: 0,
      estimatedAmount: form.estimatedAmount || "0",
      actualAmountDelivered: form.actualAmountDelivered || "0",
      additionalReferences: form.additionalReferences,
      attachments: form.attachments,
      note: form.note,
    };
    setRows((prev) => [nextRow, ...prev]);
    setSelectedId(nextId);
    closeCreateModal();
  }

  return (
    <div className="space-y-5">
      <div>
        <nav className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500" aria-label="Breadcrumb">
          <span>Operations</span>
          <span className="text-slate-300" aria-hidden>
            /
          </span>
          <span className="font-semibold text-slate-900">CMO Management</span>
        </nav>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 md:text-[1.65rem]">CMO Management</h1>
      </div>

      <section className="space-y-2 rounded-xl border border-slate-200/90 bg-white p-3 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1">
            <TabButton active={activeTab === "all"} onClick={() => setActiveTab("all")}>
              All CMOs
            </TabButton>
            <TabButton active={activeTab === "incoming"} onClick={() => setActiveTab("incoming")}>
              Incoming
            </TabButton>
            <TabButton active={activeTab === "outgoing"} onClick={() => setActiveTab("outgoing")}>
              Outgoing
            </TabButton>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" size="sm" className="border-slate-300" onClick={addStatusOption}>
              Manage Statuses
            </Button>
            <Button type="button" size="sm" className="border border-brand/35" onClick={openCreateModal}>
              + New CMO
            </Button>
          </div>
        </div>
      </section>

      <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_250px]">
        <section className="overflow-hidden rounded-xl border border-slate-200/90 bg-white">
          <div className="border-b border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600">Columns -</div>
          <div className="min-h-[420px] overflow-auto">
            <table className="w-full min-w-[760px] border-collapse text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/95">
                  {TABLE_COLUMNS.map((column) => (
                    <th key={column.key} className="whitespace-nowrap px-2 py-2 text-[10px] font-bold uppercase text-slate-500">
                      {column.label}
                    </th>
                  ))}
                </tr>
                <tr className="border-b border-slate-200 bg-white">
                  {TABLE_COLUMNS.map((column) => (
                    <th key={`f-${column.key}`} className="px-1.5 py-1.5">
                      <input
                        className={filterInputClass}
                        placeholder="Filter..."
                        value={colFilters[column.key]}
                        onChange={(event) => setColFilters((prev) => ({ ...prev, [column.key]: event.target.value }))}
                      />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredRows.length ? (
                  filteredRows.map((row) => (
                    <tr
                      key={row.id}
                      onClick={() => setSelectedId(row.id)}
                      className={cn(
                        "cursor-pointer border-b border-slate-100 text-[11px] last:border-0",
                        selected?.id === row.id ? "bg-brand/[0.06]" : "hover:bg-slate-50"
                      )}
                    >
                      <td className="px-2 py-2 font-semibold text-slate-800">{row.cmoReference}</td>
                      <td className="px-2 py-2 text-slate-700">{row.id}</td>
                      <td className="px-2 py-2 text-slate-700">{row.customer}</td>
                      <td className="px-2 py-2 text-slate-700">{row.commodityType}</td>
                      <td className="px-2 py-2 text-slate-700">{row.commodity}</td>
                      <td className="px-2 py-2 text-slate-700">{row.status}</td>
                      <td className="px-2 py-2 text-right text-slate-700">{row.bookings}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={TABLE_COLUMNS.length} className="py-16 text-center text-xs text-slate-400">
                      No CMOs found. Create your first CMO!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <aside className="rounded-xl border border-slate-200/90 bg-white">
          <div className="border-b border-slate-200 px-3 py-3">
            <h2 className="text-sm font-semibold text-slate-900">CMO Details</h2>
          </div>
          {selected ? (
            <div className="space-y-2 p-3 text-xs">
              <DetailRow label="CMO Ref" value={selected.cmoReference} />
              <DetailRow label="Direction" value={selected.direction} />
              <DetailRow label="Customer" value={selected.customer} />
              <DetailRow label="Commodity Type" value={selected.commodityType} />
              <DetailRow label="Commodity" value={selected.commodity} />
              <DetailRow label="Status" value={selected.status} />
              <DetailRow label="Estimated (T)" value={selected.estimatedAmount} />
              <DetailRow label="Actual Delivered (T)" value={selected.actualAmountDelivered} />
              <DetailRow label="Additional References" value={selected.additionalReferences?.join(", ") || "—"} />
              <DetailRow label="Attached Files" value={selected.attachments?.join(", ") || "—"} />
              <DetailRow label="Note" value={selected.note || "—"} />
            </div>
          ) : (
            <div className="p-6 text-center text-xs text-slate-400">Select a CMO to view details</div>
          )}
        </aside>
      </div>

      {showModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/35 p-4">
          <div className="relative flex max-h-[92vh] w-full max-w-[980px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <h2 className="text-lg font-semibold text-slate-900">Create New CMO</h2>
              <button type="button" onClick={closeCreateModal} className="rounded p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-700">
                <X className="size-4" />
              </button>
            </div>

            <div className="space-y-4 overflow-y-auto px-6 py-5">
              <input
                className="h-10 w-full rounded-md border border-slate-200 bg-slate-100 px-3 text-xs font-semibold uppercase tracking-wide text-slate-500"
                value="CMO reference will be auto-generated"
                disabled
                readOnly
              />

              <Field label="Direction" required>
                <select className={inputClass} value={form.direction} onChange={(event) => setField("direction", event.target.value)}>
                  {DIRECTION_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Customer / Account" required>
                <select className={inputClass} value={form.customer} onChange={(event) => setField("customer", event.target.value)}>
                  <option value="">— Select Customer / Account —</option>
                  {CUSTOMER_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Commodity Type" required>
                <select
                  className={inputClass}
                  value={form.commodityType}
                  onChange={(event) => {
                    setField("commodityType", event.target.value);
                    setField("commodity", "");
                  }}
                >
                  <option value="">— Select Commodity Type —</option>
                  {COMMODITY_TYPE_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Commodity" required>
                <select className={inputClass} value={form.commodity} onChange={(event) => setField("commodity", event.target.value)} disabled={!form.commodityType}>
                  <option value="">— Select Commodity —</option>
                  {commodityChoices.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Status" required>
                <div className="flex gap-2">
                  <select className={inputClass} value={form.status} onChange={(event) => setField("status", event.target.value)}>
                    <option value="">— Select Status —</option>
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                  <div className="w-[170px] shrink-0 space-y-2">
                    <input
                      className={inputClass}
                      value={newStatusDraft}
                      onChange={(event) => setNewStatusDraft(event.target.value)}
                      placeholder="New status"
                    />
                    <Button type="button" variant="outline" size="sm" className="w-full border-slate-300" onClick={addStatusOption}>
                      + New
                    </Button>
                  </div>
                </div>
              </Field>

              <Field label="Estimated Amount (T)">
                <input className={inputClass} inputMode="decimal" value={form.estimatedAmount} onChange={(event) => setField("estimatedAmount", event.target.value)} />
              </Field>

              <Field label="Actual Amount Delivered (T)">
                <input className={inputClass} inputMode="decimal" value={form.actualAmountDelivered} onChange={(event) => setField("actualAmountDelivered", event.target.value)} />
              </Field>

              <Field label="Additional References">
                <div className="flex gap-2">
                  <input
                    className={inputClass}
                    value={form.additionalReferenceDraft}
                    onChange={(event) => setField("additionalReferenceDraft", event.target.value)}
                    placeholder="e.g. REF-2024-001"
                  />
                  <Button type="button" variant="outline" size="sm" className="border-slate-300" onClick={addAdditionalReference}>
                    + Add
                  </Button>
                </div>
                {form.additionalReferences.length ? (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {form.additionalReferences.map((ref, index) => (
                      <span key={`${ref}-${index}`} className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-700">
                        {ref}
                      </span>
                    ))}
                  </div>
                ) : null}
              </Field>

              <Field label="Attach Files">
                <div className="space-y-2">
                  <input
                    type="file"
                    multiple
                    className="block h-9 w-full rounded-md border border-slate-300 bg-white px-2 py-1 text-sm text-slate-700 file:me-3 file:rounded file:border-0 file:bg-brand/10 file:px-2.5 file:py-1 file:text-xs file:font-semibold file:text-brand hover:file:bg-brand/15"
                    onChange={(event) => {
                      const files = Array.from(event.target.files || []).map((file) => file.name);
                      setField("attachments", files);
                    }}
                  />
                  {form.attachments.length ? (
                    <div className="flex flex-wrap gap-1.5">
                      {form.attachments.map((fileName, index) => (
                        <span key={`${fileName}-${index}`} className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-700">
                          {fileName}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500">No files selected.</p>
                  )}
                </div>
              </Field>

              <Field label="Note">
                <textarea className={`${inputClass} min-h-[86px] resize-y py-2`} value={form.note} onChange={(event) => setField("note", event.target.value)} />
              </Field>
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-slate-200 px-6 py-4">
              <Button type="button" variant="ghost" onClick={closeCreateModal}>
                Cancel
              </Button>
              <Button type="button" className="border border-brand/35" onClick={createCmo}>
                Create CMO
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function TabButton({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-md border px-2.5 py-1 text-[10px] font-semibold transition-colors",
        active ? "border-brand/35 bg-brand text-white shadow-sm" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
      )}
    >
      {children}
    </button>
  );
}

function Field({ label, required, children }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold uppercase tracking-wide text-slate-600">
        {label} {required ? <span className="text-rose-500">*</span> : null}
      </label>
      {children}
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="space-y-0.5">
      <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">{label}</div>
      <div className="rounded border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] text-slate-700">{value || "—"}</div>
    </div>
  );
}
