import PackersScheduleClient from "./packers-schedule-client";

export default function PackersSchedulePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Packers schedule</h1>
        <p className="mt-2 max-w-xl text-sm text-slate-600">Shift rosters and station assignments.</p>
      </div>
      <PackersScheduleClient />
    </div>
  );
}
