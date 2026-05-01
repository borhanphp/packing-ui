import { notFound } from "next/navigation";

import PackingScheduleContent from "../packing-schedule-content";
import { PACKING_SCHEDULE_NAV, packingScheduleLabel } from "@/lib/packing-schedule-nav";

const validSlugs = new Set(PACKING_SCHEDULE_NAV.filter((e) => e.slug !== "all-orders").map((e) => e.slug));

export function generateStaticParams() {
  return PACKING_SCHEDULE_NAV.filter((e) => e.slug !== "all-orders").map(({ slug }) => ({ view: slug }));
}

export default async function PackingScheduleFilteredPage({ params }) {
  const { view } = await params;

  if (!validSlugs.has(view)) notFound();

  const label = packingScheduleLabel(view) ?? view;

  return <PackingScheduleContent queueLabel={label} />;
}
