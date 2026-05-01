import { notFound } from "next/navigation";

import { PACKING_SCHEDULE_NAV, packingScheduleLabel } from "@/lib/packing-schedule-nav";

const validSlugs = new Set(PACKING_SCHEDULE_NAV.filter((e) => e.slug !== "all-orders").map((e) => e.slug));

export function generateStaticParams() {
  return PACKING_SCHEDULE_NAV.filter((e) => e.slug !== "all-orders").map(({ slug }) => ({ view: slug }));
}

export default async function PackingScheduleFilteredPage({ params }) {
  const { view } = await params;

  if (!validSlugs.has(view)) notFound();

  const label = packingScheduleLabel(view) ?? view;

  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white/85 px-5 py-8 sm:px-8">
      <p className="text-sm text-slate-600">
        Viewing <span className="font-medium text-slate-800">{label}</span>.
      </p>
    </div>
  );
}
