export const PACKING_SCHEDULE_NAV = [
  { slug: "all-orders", label: "All Orders" },
  { slug: "pending", label: "Pending" },
  { slug: "packs-completed", label: "Packs Completed" },
  { slug: "docs-pems", label: "Docs/PEMs" },
  { slug: "fumigation-pending", label: "Fumigation Pending" },
  { slug: "completed", label: "Completed" },
  { slug: "archieve", label: "Archieve" },
];

export function packingScheduleLabel(slug) {
  return PACKING_SCHEDULE_NAV.find((e) => e.slug === slug)?.label;
}
