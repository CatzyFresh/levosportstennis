"use client";

import Link from "next/link";
import { useState } from "react";
import { useAppStore } from "@/store/useAppStore";

export default function CoachesPage() {
  const { coaches, updateCoach, deleteCoach } = useAppStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftName, setDraftName] = useState("");
  const [draftRole, setDraftRole] = useState<"head_coach" | "coach" | "assistant_coach">("coach");

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold">Coaches</h2>
        <Link href="/coaches/new" className="underline">
          Add coach
        </Link>
      </div>
      <div className="mt-3 space-y-2">
        {coaches.map((coach) => {
          const isEditing = editingId === coach.id;
          return (
            <div key={coach.id} className="rounded border border-slate-800 p-3">
              {isEditing ? (
                <div className="space-y-2">
                  <input value={draftName} onChange={(e) => setDraftName(e.target.value)} className="w-full rounded border border-slate-700 bg-slate-900 p-2" />
                  <select value={draftRole} onChange={(e) => setDraftRole(e.target.value as typeof draftRole)} className="w-full rounded border border-slate-700 bg-slate-900 p-2">
                    <option value="head_coach">Head Coach</option>
                    <option value="coach">Coach</option>
                    <option value="assistant_coach">Assistant Coach</option>
                  </select>
                  <div className="space-x-2">
                    <button
                      className="rounded bg-cyan-600 px-2 py-1"
                      onClick={() => {
                        updateCoach({ ...coach, name: draftName, role: draftRole });
                        setEditingId(null);
                      }}
                    >
                      Save
                    </button>
                    <button className="rounded border border-slate-700 px-2 py-1" onClick={() => setEditingId(null)}>
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between gap-3">
                  <p>
                    <span className="font-semibold">{coach.name}</span> · {coach.role}
                  </p>
                  <div className="space-x-2">
                    <button
                      className="rounded border border-slate-700 px-2 py-1"
                      onClick={() => {
                        setEditingId(coach.id);
                        setDraftName(coach.name);
                        setDraftRole(coach.role);
                      }}
                    >
                      Edit
                    </button>
                    <button className="rounded bg-rose-700 px-2 py-1" onClick={() => deleteCoach(coach.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
