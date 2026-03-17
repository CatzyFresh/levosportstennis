"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const nav = [
  ["/dashboard", "Dashboard"],
  ["/players", "Players"],
  ["/coaches", "Coaches"],
  ["/attendance", "Attendance"],
  ["/attendance/quick", "Quick Attendance"],
  ["/attendance/reports", "Attendance Reports"],
  ["/inventory", "Inventory"],
  ["/inventory/transactions", "Inventory Transactions"],
  ["/inventory/low-stock", "Low Stock"],
  ["/performance", "Performance Reviews"],
  ["/performance/add", "Add Review"],
  ["/progress", "Player Progress"],
  ["/tournaments", "Tournaments"],
  ["/tournaments/new", "New Tournament"],
  ["/settings", "Admin Settings"],
  ["/portal/player", "Player Portal"],
  ["/portal/parent", "Parent Portal"]
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/login" || pathname === "/forgot-password") {
    return <main className="min-h-screen bg-slate-950 p-6 text-slate-100">{children}</main>;
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 md:flex">
      <aside className="border-r border-slate-800 p-4 md:w-72">
        <h1 className="text-xl font-semibold">Levo Sports Academy Manager</h1>
        <p className="mb-3 text-xs text-slate-400">Admin operations console</p>
        <button onClick={logout} className="mb-4 w-full rounded border border-slate-700 px-2 py-2 text-sm hover:bg-slate-800">
          Logout
        </button>
        <nav className="space-y-1">
          {nav.map(([href, label]) => (
            <Link key={href} href={href} className={`block rounded px-2 py-2 text-sm ${pathname === href ? "bg-cyan-600 text-white" : "text-slate-200 hover:bg-slate-800"}`}>
              {label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="page-enter flex-1 p-4 md:p-6">{children}</main>
    </div>
  );
}
