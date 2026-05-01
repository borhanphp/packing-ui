import { PackingScheduleBubbleNav } from "@/components/packing-schedule-bubble-nav";

export default function PackingScheduleLayout({ children }) {
  return (
    <div className="space-y-8">
      <div className="-mx-6 -mt-6 flex min-h-11 items-center border-b border-slate-200/85 bg-white/85 px-3 py-0 shadow-[inset_0_1px_0_rgba(0,112,255,0.06)] backdrop-blur-md md:-mx-10 md:-mt-10 md:min-h-[4.5rem] md:px-10 md:py-0">
        <PackingScheduleBubbleNav />
      </div>

      <div className="mx-auto max-w-6xl space-y-6">
        <header className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Packing schedule</h1>
          <p className="max-w-2xl text-pretty text-sm text-slate-600">Plan batches, docks, and cut-off windows.</p>
        </header>

        {children}
      </div>
    </div>
  );
}
