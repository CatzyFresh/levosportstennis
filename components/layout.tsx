"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

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
] as const;

const mobileNav = [
  ["/dashboard", "Home"],
  ["/attendance", "Attendance"],
  ["/players", "Players"],
  ["/inventory", "Store"],
  ["/settings", "Settings"]
] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

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
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-800 bg-slate-950/95 px-4 py-3 backdrop-blur md:hidden">
        <button className="border border-slate-700 px-3 py-1.5 text-sm" onClick={() => setMenuOpen(true)}>
          Menu
        </button>
        <p className="text-sm font-semibold">Levo Sports Academy Manager</p>
        <button className="border border-slate-700 px-3 py-1.5 text-sm" onClick={logout}>
          Logout
        </button>
      </header>

      {menuOpen ? (
        <div className="fixed inset-0 z-40 md:hidden">
          <button className="absolute inset-0 h-full w-full bg-slate-950/70" onClick={() => setMenuOpen(false)} aria-label="Close menu" />
          <aside className="absolute left-0 top-0 h-full w-72 border-r border-slate-800 bg-slate-950 p-4">
            <h1 className="text-lg font-semibold">Levo Sports</h1>
            <p className="mb-3 text-xs text-slate-400">Mobile Navigation</p>
            <nav className="space-y-1">
              {nav.map(([href, label]) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={`block rounded px-2 py-2 text-sm ${pathname === href ? "bg-cyan-600 text-white" : "text-slate-200 hover:bg-slate-800"}`}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </aside>
        </div>
      ) : null}

      <aside className="hidden border-r border-slate-800 p-4 md:block md:w-72">
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

      <main className="page-enter flex-1 p-4 pb-24 md:p-6 md:pb-6">{children}</main>

      <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-slate-800 bg-slate-950/95 px-2 py-2 backdrop-blur md:hidden">
        <div className="grid grid-cols-5 gap-2">
          {mobileNav.map(([href, label]) => (
            <Link key={href} href={href} className={`rounded px-2 py-2 text-center text-xs ${pathname === href ? "bg-cyan-600 text-white" : "text-slate-300 hover:bg-slate-800"}`}>
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
