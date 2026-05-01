import { ReferenceDataBubbleNav } from "@/components/reference-data-bubble-nav";

export default function ReferenceDataLayout({ children }) {
  return (
    <div className="space-y-8">
      <div className="-mx-6 -mt-6 flex min-h-11 items-center border-b border-slate-200/85 bg-white/85 px-3 py-0 shadow-[inset_0_1px_0_rgba(0,112,255,0.06)] backdrop-blur-md md:-mx-10 md:-mt-10 md:min-h-[4.5rem] md:px-10 md:py-0">
        <ReferenceDataBubbleNav />
      </div>

      <div className="mx-auto max-w-6xl space-y-6">
        <header className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Reference data</h1>
          <p className="max-w-2xl text-pretty text-sm text-slate-600">
            Master lists, lookups, and shared dimensions for Packing ERP modules.
          </p>
        </header>

        {children}
      </div>
    </div>
  );
}
