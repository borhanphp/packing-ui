import Link from "next/link";
import { notFound } from "next/navigation";

import { REFERENCE_DATA_NAV, referenceDataLabel } from "@/lib/reference-data-nav";

const slugs = new Set(REFERENCE_DATA_NAV.map((e) => e.slug));

export function generateStaticParams() {
  return REFERENCE_DATA_NAV.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const label = referenceDataLabel(slug);
  if (!label) return { title: "Reference data" };
  return {
    title: `${label} · Reference data`,
    description: `${label} — master list and lookups.`,
  };
}

export default async function ReferenceDataCategoryPage({ params }) {
  const { slug } = await params;

  if (!slugs.has(slug)) notFound();

  const title = referenceDataLabel(slug) ?? slug;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-baseline gap-3 border-b border-slate-200/90 pb-4">
        <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
        <Link href="/reference-data" className="text-sm font-medium text-brand hover:text-brand-ink">
          ← All reference data
        </Link>
      </div>
      <p className="max-w-xl text-sm text-slate-600">
        Stub for{" "}
        <span className="font-mono text-xs text-slate-500">
          reference-data/{slug}
        </span>
        . Add grid, imports, and validation here when the backing API or tables are ready.
      </p>
    </div>
  );
}
