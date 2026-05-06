import ContactClient from "../contact-client";

export default function ContactUsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Users</h1>
        <p className="mt-2 max-w-xl text-sm text-slate-600">
          Manage user records and default access setup for your organization.
        </p>
      </div>
      <ContactClient />
    </div>
  );
}
