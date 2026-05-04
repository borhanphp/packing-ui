import SystemSettingsClient from "./system-settings-client";

export default function SystemSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">System settings</h1>
        <p className="mt-2 max-w-xl text-sm text-slate-600">
          Org defaults, integrations, audit, and environment configuration.
        </p>
      </div>
      <SystemSettingsClient />
    </div>
  );
}
