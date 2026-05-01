import { notFound } from "next/navigation";

import InTicketFormClient from "../in-ticket-form-client";

export default async function EditInTicketPage({ params }) {
  const { id } = await params;
  const ticketId = Number(id);
  if (!Number.isFinite(ticketId) || ticketId <= 0) notFound();
  return <InTicketFormClient mode="edit" ticketId={ticketId} />;
}
