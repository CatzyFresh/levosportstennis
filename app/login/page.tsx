"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("admin@levo.app");
  const [password, setPassword] = useState("Admin@123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    if (!res.ok) {
      const payload = await res.json().catch(() => ({}));
      setError(payload?.message ?? "Login failed");
      setLoading(false);
      return;
    }

    const next = new URLSearchParams(window.location.search).get("next") || "/dashboard";
    router.replace(next);
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-md rounded-lg border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-1 text-2xl font-semibold">Admin Login</h2>
      <p className="mb-4 text-sm text-slate-400">Only Admin and Super Admin accounts are allowed.</p>
      <form onSubmit={onSubmit} className="space-y-3">
        <input className="w-full rounded border border-slate-700 bg-slate-950 p-2" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input className="w-full rounded border border-slate-700 bg-slate-950 p-2" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
        {error ? <p className="text-sm text-rose-400">{error}</p> : null}
        <button disabled={loading} className="w-full rounded bg-cyan-600 px-3 py-2 font-medium disabled:opacity-60">
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
      <p className="mt-3 text-xs text-slate-500">Demo admins: admin@levo.app / Admin@123</p>
    </div>
  );
}
