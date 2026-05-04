"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { referenceDataLabel } from "@/lib/reference-data-nav";

const inputClass =
  "w-full rounded-lg border border-slate-200/95 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-brand/15 placeholder:text-slate-400 focus:border-brand/35 focus:ring-2";
const labelClass = "text-[11px] font-semibold uppercase tracking-wide text-slate-500";

function textareaClass() {
  return `${inputClass} resize-y min-h-[80px]`;
}

function SimpleTable({ columns, rows, empty }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-sm shadow-slate-200/40">
      <div className="max-h-[min(420px,55vh)] overflow-auto">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200/90 bg-slate-50/90">
              {columns.map((c) => (
                <th key={c.key} className="whitespace-nowrap px-3 py-2.5 text-[10px] font-bold uppercase tracking-wide text-slate-500">
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td className="px-3 py-10 text-center text-slate-400" colSpan={columns.length}>
                  {empty}
                </td>
              </tr>
            ) : (
              rows.map((row, i) => (
                <tr key={row.id ?? i} className="border-b border-slate-100 last:border-0">
                  {columns.map((c) => (
                    <td key={c.key} className="px-3 py-2.5 text-slate-700">
                      {row[c.key] ?? "—"}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const DEMO = {
  countries: {
    columns: [
      { key: "countryName", label: "Country name" },
      { key: "countryCode", label: "Code" },
      { key: "notesPreview", label: "Notes" },
      { key: "contacts", label: "Contact(s)" },
      { key: "warnings", label: "Warning(s)" },
    ],
    rows: [
      {
        id: 1,
        countryName: "Australia",
        countryCode: "AU",
        notesPreview: "Standard documentation apply…",
        contacts: "2 contacts",
        warnings: "—",
      },
      {
        id: 2,
        countryName: "New Zealand",
        countryCode: "NZ",
        notesPreview: "—",
        contacts: "1 contact",
        warnings: "1 warning",
      },
    ],
  },
  trucks: {
    columns: [
      { key: "name", label: "Truck" },
      { key: "driver", label: "Driver" },
      { key: "tare", label: "Tare (kg)" },
    ],
    rows: [
      { id: 1, name: "MHY-104", driver: "Alex Nguyen", tare: "8,200" },
      { id: 2, name: "MHY-227", driver: "Jamie Cole", tare: "8,450" },
    ],
  },
  packer: {
    columns: [
      { key: "name", label: "Name" },
      { key: "description", label: "Description" },
      { key: "status", label: "Status" },
      { key: "commodityTypesAllowed", label: "Commodity types" },
      { key: "stockLocationsAllowed", label: "Stock locations" },
    ],
    rows: [
      {
        id: 1,
        name: "Dock North A",
        description: "Heavy lift bay",
        status: "Active",
        commodityTypesAllowed: "All",
        stockLocationsAllowed: "3",
      },
      {
        id: 2,
        name: "Dock South",
        description: "General cargo",
        status: "Under maintenance",
        commodityTypesAllowed: "2",
        stockLocationsAllowed: "All",
      },
    ],
  },
  "stock-location": {
    columns: [
      { key: "name", label: "Location" },
      { key: "site", label: "Site" },
      { key: "locationType", label: "Type" },
      { key: "status", label: "Status" },
      { key: "capacity", label: "Capacity" },
    ],
    rows: [
      { id: 1, name: "Bay 12", site: "Melbourne", locationType: "Bay", status: "Active", capacity: "420" },
      { id: 2, name: "Shed C", site: "Melbourne", locationType: "Shed", status: "Active", capacity: "800" },
    ],
  },
  "container-codes": {
    columns: [
      { key: "isoCode", label: "ISO code" },
      { key: "containerSize", label: "Size" },
      { key: "description", label: "Description" },
      { key: "cubicMeters", label: "m³" },
      { key: "averageWeight", label: "Avg (t)" },
      { key: "maxWeight", label: "Max (t)" },
      { key: "averageEmptyTare", label: "Tare (t)" },
    ],
    rows: [
      {
        id: 1,
        isoCode: "22G1",
        containerSize: "20ft",
        description: "Dry freight",
        cubicMeters: "33.2",
        averageWeight: "21.5",
        maxWeight: "28.0",
        averageEmptyTare: "2.3",
      },
      {
        id: 2,
        isoCode: "42G1",
        containerSize: "40ft",
        description: "Dry freight HC",
        cubicMeters: "67.7",
        averageWeight: "26.0",
        maxWeight: "30.5",
        averageEmptyTare: "3.8",
      },
    ],
  },
  site: {
    columns: [
      { key: "id", label: "ID" },
      { key: "name", label: "Site name" },
    ],
    rows: [
      { id: "1", name: "Melbourne" },
      { id: "2", name: "Sydney" },
    ],
  },
  port: {
    columns: [
      { key: "code", label: "Code" },
      { key: "name", label: "Port name" },
      { key: "country", label: "Country" },
    ],
    rows: [
      { id: 1, code: "AUMEL", name: "Melbourne", country: "Australia" },
      { id: 2, code: "AUSYD", name: "Sydney", country: "Australia" },
    ],
  },
  vessel: {
    columns: [
      { key: "vessel", label: "Vessel" },
      { key: "voyageNumber", label: "Voyage" },
      { key: "vesselCutoffDate", label: "Cut-off" },
      { key: "vesselReceivalsOpenDate", label: "Receivals" },
      { key: "vesselEta", label: "ETA" },
      { key: "vesselEtd", label: "ETD" },
      { key: "vesselFreeDays", label: "Free days" },
      { key: "shippingLine", label: "Shipping line" },
    ],
    rows: [
      {
        id: 1,
        vessel: "Pacific Trader",
        voyageNumber: "PT0426",
        vesselCutoffDate: "2026-05-02 14:00",
        vesselReceivalsOpenDate: "2026-04-28 06:00",
        vesselEta: "2026-05-05 08:00",
        vesselEtd: "2026-05-06 16:00",
        vesselFreeDays: "7",
        shippingLine: "BlueStar Line",
      },
    ],
  },
  "shipping-line": {
    columns: [
      { key: "code", label: "Code" },
      { key: "name", label: "Name" },
      { key: "website", label: "Website" },
      { key: "email", label: "Email" },
      { key: "phone", label: "Phone" },
    ],
    rows: [
      {
        id: 1,
        code: "BSL",
        name: "BlueStar Line",
        website: "https://example.com/bluestar",
        email: "schedules@example.com",
        phone: "+61 3 9000 1111",
      },
    ],
  },
  terminal: {
    columns: [
      { key: "code", label: "Code" },
      { key: "name", label: "Name" },
      { key: "contacts", label: "Contacts" },
      { key: "revenuePrice", label: "Revenue" },
      { key: "expensePrice", label: "Expense" },
    ],
    rows: [
      { id: 1, code: "APT", name: "Appleton Terminal", contacts: "2 contacts", revenuePrice: "185.00", expensePrice: "132.50" },
    ],
  },
  "container-park": {
    columns: [
      { key: "code", label: "Code" },
      { key: "name", label: "Name" },
      { key: "containerChainName", label: "Chain" },
      { key: "contacts", label: "Contacts" },
      { key: "revenuePrice", label: "Revenue" },
      { key: "expensePrice", label: "Expense" },
    ],
    rows: [
      {
        id: 1,
        code: "ECP01",
        name: "West Yard Empty Park",
        containerChainName: "ChainCo",
        contacts: "1 contact",
        revenuePrice: "95.00",
        expensePrice: "72.00",
      },
    ],
  },
};

function CountryForm() {
  const [countryName, setCountryName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [notes, setNotes] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [warningDescription, setWarningDescription] = useState("");
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="space-y-1.5">
        <label className={labelClass}>Country name</label>
        <input className={inputClass} value={countryName} onChange={(e) => setCountryName(e.target.value)} placeholder="e.g. Australia" />
      </div>
      <div className="space-y-1.5">
        <label className={labelClass}>Country code</label>
        <input className={inputClass} value={countryCode} onChange={(e) => setCountryCode(e.target.value)} placeholder="e.g. AU" />
      </div>
      <div className="space-y-1.5 sm:col-span-2">
        <label className={labelClass}>Notes</label>
        <textarea className={textareaClass()} value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder="Operational notes" />
      </div>
      <div className="rounded-xl border border-slate-200/80 bg-slate-50/50 p-4 sm:col-span-2">
        <p className="mb-3 text-xs font-semibold text-slate-600">Primary contact</p>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="space-y-1.5">
            <label className={labelClass}>Name</label>
            <input className={inputClass} value={contactName} onChange={(e) => setContactName(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <label className={labelClass}>Phone</label>
            <input className={inputClass} value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <label className={labelClass}>Email</label>
            <input className={inputClass} type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />
          </div>
        </div>
      </div>
      <div className="space-y-1.5 sm:col-span-2">
        <label className={labelClass}>Pack warning (description)</label>
        <textarea className={textareaClass()} value={warningDescription} onChange={(e) => setWarningDescription(e.target.value)} rows={2} />
      </div>
      <div className="flex flex-wrap gap-2 sm:col-span-2">
        <Button type="button">Save country</Button>
        <Button type="button" variant="outline">
          Clear
        </Button>
      </div>
    </div>
  );
}

function TruckForm() {
  const [name, setName] = useState("");
  const [driver, setDriver] = useState("");
  const [tare, setTare] = useState("");
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <div className="space-y-1.5 sm:col-span-1">
        <label className={labelClass}>Truck name</label>
        <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} required placeholder="Fleet ID" />
      </div>
      <div className="space-y-1.5">
        <label className={labelClass}>Driver</label>
        <input className={inputClass} value={driver} onChange={(e) => setDriver(e.target.value)} />
      </div>
      <div className="space-y-1.5">
        <label className={labelClass}>Tare (kg)</label>
        <input className={inputClass} inputMode="decimal" value={tare} onChange={(e) => setTare(e.target.value)} />
      </div>
      <div className="flex gap-2 sm:col-span-3">
        <Button type="button">Save truck</Button>
        <Button type="button" variant="outline">
          Cancel
        </Button>
      </div>
    </div>
  );
}

function PackerForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("active");
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="space-y-1.5">
        <label className={labelClass}>Name</label>
        <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="space-y-1.5">
        <label className={labelClass}>Status</label>
        <select className={inputClass} value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="active">Active</option>
          <option value="under_maintenance">Under maintenance</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <div className="space-y-1.5 sm:col-span-2">
        <label className={labelClass}>Description</label>
        <textarea className={textareaClass()} value={description} onChange={(e) => setDescription(e.target.value)} rows={2} />
      </div>
      <div className="space-y-1.5">
        <label className={labelClass}>Commodity types allowed</label>
        <p className="text-xs text-slate-500">Empty selection means all types (parity with legacy app).</p>
        <select className={inputClass} multiple size={3}>
          <option>Grain</option>
          <option>Pulses</option>
          <option>Fertiliser</option>
        </select>
      </div>
      <div className="space-y-1.5">
        <label className={labelClass}>Stock locations allowed</label>
        <p className="text-xs text-slate-500">Empty selection means all locations.</p>
        <select className={inputClass} multiple size={3}>
          <option>Bay 12</option>
          <option>Shed C</option>
          <option>Laneway 4</option>
        </select>
      </div>
      <div className="flex gap-2 sm:col-span-2">
        <Button type="button">Save packer</Button>
      </div>
    </div>
  );
}

function StockLocationForm() {
  const [name, setName] = useState("");
  const [site, setSite] = useState("melbourne");
  const [locationType, setLocationType] = useState("Bay");
  const [status, setStatus] = useState("active");
  const [capacity, setCapacity] = useState("");
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="space-y-1.5 sm:col-span-2">
        <label className={labelClass}>Location name</label>
        <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="space-y-1.5">
        <label className={labelClass}>Site</label>
        <select className={inputClass} value={site} onChange={(e) => setSite(e.target.value)}>
          <option value="melbourne">Melbourne</option>
          <option value="sydney">Sydney</option>
          <option value="brisbane">Brisbane</option>
        </select>
      </div>
      <div className="space-y-1.5">
        <label className={labelClass}>Location type</label>
        <select className={inputClass} value={locationType} onChange={(e) => setLocationType(e.target.value)}>
          <option>Bay</option>
          <option>Shed</option>
          <option>Lane</option>
        </select>
      </div>
      <div className="space-y-1.5">
        <label className={labelClass}>Status</label>
        <select className={inputClass} value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <div className="space-y-1.5">
        <label className={labelClass}>Capacity</label>
        <input className={inputClass} inputMode="numeric" value={capacity} onChange={(e) => setCapacity(e.target.value)} />
      </div>
      <div className="flex gap-2 sm:col-span-2">
        <Button type="button">Save location</Button>
      </div>
    </div>
  );
}

function ContainerCodeForm() {
  const [isoCode, setIsoCode] = useState("");
  const [containerSize, setContainerSize] = useState("");
  const [description, setDescription] = useState("");
  const [cubicMeters, setCubicMeters] = useState("");
  const [averageWeight, setAverageWeight] = useState("");
  const [maxWeight, setMaxWeight] = useState("");
  const [averageEmptyTare, setAverageEmptyTare] = useState("");
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <div className="space-y-1.5">
        <label className={labelClass}>ISO code</label>
        <input className={inputClass} value={isoCode} onChange={(e) => setIsoCode(e.target.value)} />
      </div>
      <div className="space-y-1.5">
        <label className={labelClass}>Size</label>
        <input className={inputClass} value={containerSize} onChange={(e) => setContainerSize(e.target.value)} placeholder="20ft / 40ft" />
      </div>
      <div className="space-y-1.5 sm:col-span-3">
        <label className={labelClass}>Description</label>
        <input className={inputClass} value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div className="space-y-1.5">
        <label className={labelClass}>Cubic metres (m³)</label>
        <input className={inputClass} inputMode="decimal" value={cubicMeters} onChange={(e) => setCubicMeters(e.target.value)} />
      </div>
      <div className="space-y-1.5">
        <label className={labelClass}>Average weight (tonnes)</label>
        <input className={inputClass} inputMode="decimal" value={averageWeight} onChange={(e) => setAverageWeight(e.target.value)} />
      </div>
      <div className="space-y-1.5">
        <label className={labelClass}>Max weight (tonnes)</label>
        <input className={inputClass} inputMode="decimal" value={maxWeight} onChange={(e) => setMaxWeight(e.target.value)} />
      </div>
      <div className="space-y-1.5">
        <label className={labelClass}>Average empty tare (tonnes)</label>
        <input className={inputClass} inputMode="decimal" value={averageEmptyTare} onChange={(e) => setAverageEmptyTare(e.target.value)} />
      </div>
      <div className="flex gap-2 sm:col-span-3">
        <Button type="button">Save container code</Button>
      </div>
    </div>
  );
}

function SiteForm() {
  const [name, setName] = useState("");
  return (
    <div className="max-w-md space-y-4">
      <div className="space-y-1.5">
        <label className={labelClass}>Site name</label>
        <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <Button type="button">Save site</Button>
    </div>
  );
}

function PortForm() {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <div className="space-y-1.5">
        <label className={labelClass}>Port code</label>
        <input className={inputClass} value={code} onChange={(e) => setCode(e.target.value)} />
      </div>
      <div className="space-y-1.5">
        <label className={labelClass}>Port name</label>
        <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="space-y-1.5">
        <label className={labelClass}>Country</label>
        <input className={inputClass} value={country} onChange={(e) => setCountry(e.target.value)} />
      </div>
      <div className="sm:col-span-3">
        <Button type="button">Save port</Button>
      </div>
    </div>
  );
}

function VesselForm() {
  const [vessel, setVessel] = useState("");
  const [voyageNumber, setVoyageNumber] = useState("");
  const [vesselLloyds, setVesselLloyds] = useState("");
  const [cutoff, setCutoff] = useState("");
  const [receivals, setReceivals] = useState("");
  const [eta, setEta] = useState("");
  const [etd, setEtd] = useState("");
  const [freeDays, setFreeDays] = useState("");
  const [shippingLineId, setShippingLineId] = useState("");
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="space-y-1.5">
        <label className={labelClass}>Vessel</label>
        <input className={inputClass} value={vessel} onChange={(e) => setVessel(e.target.value)} />
      </div>
      <div className="space-y-1.5">
        <label className={labelClass}>Voyage number</label>
        <input className={inputClass} value={voyageNumber} onChange={(e) => setVoyageNumber(e.target.value)} />
      </div>
      <div className="space-y-1.5 sm:col-span-2">
        <label className={labelClass}>Lloyd&apos;s / IMO reference</label>
        <input className={inputClass} value={vesselLloyds} onChange={(e) => setVesselLloyds(e.target.value)} />
      </div>
      <div className="space-y-1.5">
        <label className={labelClass}>Cut-off</label>
        <input className={inputClass} type="datetime-local" value={cutoff} onChange={(e) => setCutoff(e.target.value)} />
      </div>
      <div className="space-y-1.5">
        <label className={labelClass}>Receivals open</label>
        <input className={inputClass} type="datetime-local" value={receivals} onChange={(e) => setReceivals(e.target.value)} />
      </div>
      <div className="space-y-1.5">
        <label className={labelClass}>ETA</label>
        <input className={inputClass} type="datetime-local" value={eta} onChange={(e) => setEta(e.target.value)} />
      </div>
      <div className="space-y-1.5">
        <label className={labelClass}>ETD</label>
        <input className={inputClass} type="datetime-local" value={etd} onChange={(e) => setEtd(e.target.value)} />
      </div>
      <div className="space-y-1.5">
        <label className={labelClass}>Free days</label>
        <input className={inputClass} inputMode="numeric" value={freeDays} onChange={(e) => setFreeDays(e.target.value)} />
      </div>
      <div className="space-y-1.5">
        <label className={labelClass}>Shipping line</label>
        <select className={inputClass} value={shippingLineId} onChange={(e) => setShippingLineId(e.target.value)}>
          <option value="">Select line…</option>
          <option value="1">BlueStar Line</option>
          <option value="2">Southern Reef</option>
        </select>
      </div>
      <div className="flex gap-2 sm:col-span-2">
        <Button type="button">Save vessel departure</Button>
      </div>
    </div>
  );
}

function ShippingLineForm() {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="space-y-1.5">
        <label className={labelClass}>Code</label>
        <input className={inputClass} value={code} onChange={(e) => setCode(e.target.value)} />
      </div>
      <div className="space-y-1.5">
        <label className={labelClass}>Name</label>
        <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="space-y-1.5 sm:col-span-2">
        <label className={labelClass}>Website</label>
        <input className={inputClass} type="url" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>
      <div className="space-y-1.5">
        <label className={labelClass}>Email</label>
        <input className={inputClass} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="space-y-1.5">
        <label className={labelClass}>Phone</label>
        <input className={inputClass} value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>
      <div className="sm:col-span-2">
        <Button type="button">Save shipping line</Button>
      </div>
    </div>
  );
}

function TerminalParkForm({ variant }) {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [chain, setChain] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [revenuePrice, setRevenuePrice] = useState("");
  const [expensePrice, setExpensePrice] = useState("");
  const showChain = variant === "park";
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="space-y-1.5">
        <label className={labelClass}>Code</label>
        <input className={inputClass} value={code} onChange={(e) => setCode(e.target.value)} />
      </div>
      <div className="space-y-1.5">
        <label className={labelClass}>Name</label>
        <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      {showChain ? (
        <div className="space-y-1.5 sm:col-span-2">
          <label className={labelClass}>Container chain name</label>
          <input className={inputClass} value={chain} onChange={(e) => setChain(e.target.value)} />
        </div>
      ) : null}
      <div className="rounded-xl border border-slate-200/80 bg-slate-50/50 p-4 sm:col-span-2">
        <p className="mb-3 text-xs font-semibold text-slate-600">Primary contact</p>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="space-y-1.5">
            <label className={labelClass}>Name</label>
            <input className={inputClass} value={contactName} onChange={(e) => setContactName(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <label className={labelClass}>Email</label>
            <input className={inputClass} type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <label className={labelClass}>Phone</label>
            <input className={inputClass} value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} />
          </div>
        </div>
      </div>
      <div className="space-y-1.5 sm:col-span-2">
        <label className={labelClass}>Notes</label>
        <textarea className={textareaClass()} value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} />
      </div>
      <div className="space-y-1.5">
        <label className={labelClass}>Revenue price</label>
        <input className={inputClass} inputMode="decimal" value={revenuePrice} onChange={(e) => setRevenuePrice(e.target.value)} />
      </div>
      <div className="space-y-1.5">
        <label className={labelClass}>Expense price</label>
        <input className={inputClass} inputMode="decimal" value={expensePrice} onChange={(e) => setExpensePrice(e.target.value)} />
      </div>
      <div className="sm:col-span-2">
        <Button type="button">{variant === "park" ? "Save container park" : "Save terminal"}</Button>
      </div>
    </div>
  );
}

function FormForSlug({ slug }) {
  switch (slug) {
    case "countries":
      return <CountryForm />;
    case "trucks":
      return <TruckForm />;
    case "packer":
      return <PackerForm />;
    case "stock-location":
      return <StockLocationForm />;
    case "container-codes":
      return <ContainerCodeForm />;
    case "site":
      return <SiteForm />;
    case "port":
      return <PortForm />;
    case "vessel":
      return <VesselForm />;
    case "shipping-line":
      return <ShippingLineForm />;
    case "terminal":
      return <TerminalParkForm variant="terminal" />;
    case "container-park":
      return <TerminalParkForm variant="park" />;
    default:
      return null;
  }
}

export default function CategoryClient({ slug }) {
  const label = referenceDataLabel(slug) ?? slug;
  const demo = DEMO[slug];
  const [search, setSearch] = useState("");

  const rows = useMemo(() => {
    if (!demo) return [];
    if (!search.trim()) return demo.rows;
    const q = search.toLowerCase();
    return demo.rows.filter((row) =>
      Object.values(row).some((v) => String(v ?? "").toLowerCase().includes(q))
    );
  }, [demo, search]);

  if (!demo) {
    return (
      <p className="text-sm text-slate-600">
        No demo layout is registered for <span className="font-mono text-xs">{slug}</span>.
      </p>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <input
          className={`${inputClass} sm:max-w-xs`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={`Search ${label.toLowerCase()}…`}
          aria-label={`Search ${label}`}
        />
        <Button type="button" variant="secondary" size="sm">
          Add new
        </Button>
      </div>

      <section className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-900">Master list</h3>
        <SimpleTable columns={demo.columns} rows={rows} empty="No rows match your search." />
      </section>

      <section className="space-y-4 rounded-2xl border border-slate-200/90 bg-white/80 p-5 shadow-sm shadow-slate-200/30">
        <h3 className="text-sm font-semibold text-slate-900">Edit / create</h3>
        <p className="text-xs text-slate-500">
          Field layout mirrors Mahonys Packing reference screens; wire save actions when APIs are available.
        </p>
        <FormForSlug slug={slug} />
      </section>
    </div>
  );
}
