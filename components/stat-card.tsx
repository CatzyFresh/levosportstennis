export function StatCard({ label, value }: { label: string; value: string | number }) {
  return <div className="rounded-lg border border-slate-800 bg-slate-900 p-4"><p className="text-xs text-slate-400">{label}</p><p className="text-2xl font-semibold">{value}</p></div>;
}
