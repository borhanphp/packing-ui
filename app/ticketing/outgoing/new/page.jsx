import Link from "next/link";

export default function OutgoingTicketNewStubPage() {
  return (
    <div className="mx-auto max-w-lg space-y-4 py-4">
      <Link href="/ticketing/outgoing" className="text-sm font-medium text-brand hover:text-brand-ink">
        ← Back to outgoing tickets
      </Link>
      <p className="text-sm text-slate-600">
        Outgoing weighbridge ticket form will mirror the incoming layout; wire this route when the out-ticket UI is ported.
      </p>
    </div>
  );
}
