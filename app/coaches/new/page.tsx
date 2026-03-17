"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";

export default function NewCoachPage() {
  const [name, setName] = useState("");
  const [role, setRole] = useState<"head_coach" | "coach" | "assistant_coach">("coach");
  const { addCoach } = useAppStore();
  const router = useRouter();

  return (
    <form
      className="space-y-3"
      onSubmit={(e) => {
        e.preventDefault();
        if (!name.trim()) return;
        addCoach({ id: `C-${Date.now()}`, name, role, active: true });
        router.push("/coaches");
      }}
    >
      <h2 className="text-xl">Create Coach</h2>
      <input className="w-full rounded border border-slate-700 bg-slate-900 p-2" value={name} onChange={(e) => setName(e.target.value)} placeholder="Coach name" />
      <select className="w-full rounded border border-slate-700 bg-slate-900 p-2" value={role} onChange={(e) => setRole(e.target.value as typeof role)}>
        <option value="head_coach">Head Coach</option>
        <option value="coach">Coach</option>
        <option value="assistant_coach">Assistant Coach</option>
      </select>
      <button className="rounded bg-cyan-600 px-3 py-2">Save Coach</button>
    </form>
  );
}
