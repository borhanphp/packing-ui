import TransactionsClient from "./transactions-client";

export default function TransactionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Transactions</h1>
        <p className="mt-2 max-w-xl text-sm text-slate-600">Operational transactions and lineage.</p>
      </div>
      <TransactionsClient />
    </div>
  );
}
