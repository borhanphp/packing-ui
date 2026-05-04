import Link from "next/link";
import { notFound } from "next/navigation";

export default async function OutgoingTicketEditStubPage({ params }) {
  const { id } = await params;
  const ticketId = Number(id);
  if (!Number.isFinite(ticketId) || ticketId <= 0) notFound();

  return (
    <div className="mx-auto max-w-lg space-y-4 py-4">
      <Link href="/ticketing/outgoing" className="text-sm font-medium text-brand hover:text-brand-ink">
        ← Back to outgoing tickets
      </Link>
      <p className="text-sm text-slate-600">
        Edit outgoing ticket #{ticketId} — form not implemented yet.
      </p>
    </div>
  );
}
