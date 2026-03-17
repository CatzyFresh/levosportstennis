"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAppStore } from "@/store/useAppStore";

const LEVEL_OPTIONS = ["Beginner", "Intermediate", "Advanced", "Professional", "Members"] as const;

export default function NewPlayerPage() {
  const { addPlayer } = useAppStore();
  const router = useRouter();
  const [name, setName] = useState("");
  const [skillLevel, setSkillLevel] = useState<(typeof LEVEL_OPTIONS)[number]>("Beginner");

  return (
    <form
      className="space-y-3"
      onSubmit={(e) => {
        e.preventDefault();
        if (!name.trim()) return;
        addPlayer({
          id: `P-${Date.now()}`,
          fullName: name,
          skillLevel,
          coachIds: [],
          active: true,
          createdAt: new Date().toISOString().slice(0, 10)
        });
        router.push("/players");
      }}
    >
      <h2 className="text-xl font-semibold">Create Player</h2>
      <input className="w-full rounded border border-slate-700 bg-slate-900 p-2" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
      <select className="w-full rounded border border-slate-700 bg-slate-900 p-2" value={skillLevel} onChange={(e) => setSkillLevel(e.target.value as (typeof LEVEL_OPTIONS)[number])}>
        {LEVEL_OPTIONS.map((lvl) => (
          <option key={lvl} value={lvl}>
            {lvl}
          </option>
        ))}
      </select>
      <button className="rounded bg-cyan-600 px-3 py-2">Save</button>
    </form>
  );
}
