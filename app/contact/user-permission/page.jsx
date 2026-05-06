"use client";

import { useMemo, useState } from "react";

import { PACKING_NAV_MODULES } from "@/components/erp-navbar/packing-defaults";
import { Button } from "@/components/ui/button";

const USERS = [
  { id: 1, name: "Alec Stead", email: "ops@packing.local" },
  { id: 2, name: "Jordan Miles", email: "warehouse@packing.local" },
  { id: 3, name: "Sam Rivera", email: "finance@packing.local" },
];

function buildAccessTemplate() {
  const template = {};
  for (const module of PACKING_NAV_MODULES) {
    template[module.name] = false;
    for (const child of module.children ?? []) {
      template[child.name] = false;
    }
  }
  return template;
}

export default function UserPermissionPage() {
  const userOptions = useMemo(
    () => USERS.map((user) => ({ value: String(user.id), label: `${user.name} (${user.email})` })),
    []
  );

  const [selectedUserId, setSelectedUserId] = useState(userOptions[0]?.value ?? "");
  const [permissions, setPermissions] = useState(() =>
    USERS.reduce((acc, user, index) => {
      const base = buildAccessTemplate();
      if (index === 0) {
        for (const key of Object.keys(base)) {
          base[key] = true;
        }
      }
      if (index === 1) {
        base["Packing schedule"] = true;
        base["Packers schedule"] = true;
        base["Ticketing"] = true;
      }
      acc[user.id] = base;
      return acc;
    }, {})
  );

  const selectedPermissionMap = permissions[selectedUserId] ?? buildAccessTemplate();

  const togglePermission = (key, value) => {
    setPermissions((prev) => ({
      ...prev,
      [selectedUserId]: {
        ...(prev[selectedUserId] ?? buildAccessTemplate()),
        [key]: value,
      },
    }));
  };

  const applyAll = (value) => {
    const next = buildAccessTemplate();
    for (const key of Object.keys(next)) {
      next[key] = value;
    }
    setPermissions((prev) => ({ ...prev, [selectedUserId]: next }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">User Permission</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          Assign module accessibility by selecting which navbar options each user can access.
        </p>
      </div>

      <section className="space-y-4 rounded-xl border border-slate-200/90 bg-white p-5 shadow-sm">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,340px)_1fr]">
          <div className="space-y-1">
            <label className="text-[11px] font-semibold uppercase text-slate-500">User</label>
            <select
              value={selectedUserId}
              onChange={(event) => setSelectedUserId(event.target.value)}
              className="w-full rounded-lg border border-slate-200/95 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-brand/15 focus:border-brand/35 focus:ring-2"
            >
              {userOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end gap-2">
            <Button type="button" variant="outline" onClick={() => applyAll(true)}>
              Grant all
            </Button>
            <Button type="button" variant="outline" onClick={() => applyAll(false)}>
              Remove all
            </Button>
            <Button type="button">Save permission</Button>
          </div>
        </div>

        <div className="space-y-4">
          {PACKING_NAV_MODULES.map((module) => (
            <div key={module.name} className="rounded-lg border border-slate-200/90 bg-slate-50/50 p-4">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <input
                  type="checkbox"
                  checked={Boolean(selectedPermissionMap[module.name])}
                  onChange={(event) => togglePermission(module.name, event.target.checked)}
                  className="rounded border-slate-300"
                />
                {module.name}
              </label>

              {module.children?.length ? (
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {module.children.map((child) => (
                    <label key={child.name} className="flex items-center gap-2 text-sm text-slate-700">
                      <input
                        type="checkbox"
                        checked={Boolean(selectedPermissionMap[child.name])}
                        onChange={(event) => togglePermission(child.name, event.target.checked)}
                        className="rounded border-slate-300"
                      />
                      {child.name}
                    </label>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
