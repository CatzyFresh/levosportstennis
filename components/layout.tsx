"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppStore, getCurrentUser } from "@/store/useAppStore";

const nav = [
  ["/dashboard", "Dashboard"], ["/players", "Players"], ["/coaches", "Coaches"], ["/attendance", "Attendance"], ["/attendance/quick", "Quick Attendance"], ["/attendance/reports", "Attendance Reports"],
  ["/inventory", "Inventory"], ["/inventory/transactions", "Inventory Transactions"], ["/inventory/low-stock", "Low Stock"],
  ["/performance", "Performance Reviews"], ["/performance/add", "Add Review"], ["/progress", "Player Progress"],
  ["/tournaments", "Tournaments"], ["/tournaments/new", "New Tournament"], ["/settings", "Admin Settings"], ["/portal/player", "Player Portal"], ["/portal/parent", "Parent Portal"]
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const p = usePathname();
  const { users, currentUserId, setCurrentUser } = useAppStore();
  const user = getCurrentUser(users, currentUserId);
  return <div className="min-h-screen md:flex bg-slate-950 text-slate-100">
    <aside className="md:w-72 border-r border-slate-800 p-4">
      <h1 className="text-xl font-semibold">Levo Sports Academy Manager</h1>
      <p className="text-xs text-slate-400 mb-3">Role-based academy ops platform</p>
      <select className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-2 text-sm mb-4" value={user.id} onChange={(e) => setCurrentUser(e.target.value)}>
        {users.map((u) => <option key={u.id} value={u.id}>{u.name} ({u.role})</option>)}
      </select>
      <nav className="space-y-1">{nav.map(([href, label]) => <Link key={href} href={href} className={`block rounded px-2 py-2 text-sm ${p === href ? "bg-cyan-600 text-white" : "hover:bg-slate-800 text-slate-200"}`}>{label}</Link>)}</nav>
    </aside>
    <main className="flex-1 p-4 md:p-6">{children}</main>
  </div>;
}
