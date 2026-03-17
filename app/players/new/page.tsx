"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAppStore } from "@/store/useAppStore";

export default function NewPlayerPage() {
  const { addPlayer } = useAppStore();
  const router = useRouter();
  const [name, setName] = useState("");
  const [skillLevel, setSkillLevel] = useState("Beginner");

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
      <input className="w-full rounded border border-slate-700 bg-slate-900 p-2" placeholder="Skill level" value={skillLevel} onChange={(e) => setSkillLevel(e.target.value)} />
      <button className="rounded bg-cyan-600 px-3 py-2">Save</button>
    </form>
  );
}
