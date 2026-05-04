import FumigationClient from "./fumigation-client";

export default function FumigationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Fumigation</h1>
        <p className="mt-2 max-w-xl text-sm text-slate-600">Treatments, holds, and compliance checkpoints.</p>
      </div>
      <FumigationClient />
    </div>
  );
}
