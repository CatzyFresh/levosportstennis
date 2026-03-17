"use client";

import Link from "next/link";
import { useState } from "react";
import { useAppStore } from "@/store/useAppStore";

const LEVEL_OPTIONS = ["Beginner", "Intermediate", "Advanced", "Professional", "Members"] as const;

export default function PlayersPage() {
  const { players, updatePlayer, deletePlayer } = useAppStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftName, setDraftName] = useState("");
  const [draftLevel, setDraftLevel] = useState<(typeof LEVEL_OPTIONS)[number]>("Beginner");

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold">Players</h2>
        <Link href="/players/new" className="underline">
          Add player
        </Link>
      </div>

      <div className="mt-3 space-y-2">
        {players.map((player) => {
          const isEditing = editingId === player.id;
          return (
            <div key={player.id} className="rounded border border-slate-800 p-3">
              {isEditing ? (
                <div className="space-y-2">
                  <input className="w-full rounded border border-slate-700 bg-slate-900 p-2" value={draftName} onChange={(e) => setDraftName(e.target.value)} />
                  <select className="w-full rounded border border-slate-700 bg-slate-900 p-2" value={draftLevel} onChange={(e) => setDraftLevel(e.target.value as (typeof LEVEL_OPTIONS)[number])}>
                    {LEVEL_OPTIONS.map((lvl) => (
                      <option key={lvl} value={lvl}>
                        {lvl}
                      </option>
                    ))}
                  </select>
                  <div className="space-x-2">
                    <button
                      className="rounded bg-cyan-600 px-2 py-1"
                      onClick={() => {
                        updatePlayer({ ...player, fullName: draftName, skillLevel: draftLevel });
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
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <Link className="underline" href={`/players/${player.id}`}>
                      {player.fullName}
                    </Link>
                    <p className="text-sm text-slate-400">Level: {player.skillLevel ?? "-"}</p>
                  </div>
                  <div className="space-x-2">
                    <button
                      className="rounded border border-slate-700 px-2 py-1"
                      onClick={() => {
                        setEditingId(player.id);
                        setDraftName(player.fullName);
                        setDraftLevel((player.skillLevel as (typeof LEVEL_OPTIONS)[number]) ?? "Beginner");
                      }}
                    >
                      Edit
                    </button>
                    <button className="rounded bg-rose-700 px-2 py-1" onClick={() => deletePlayer(player.id)}>
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
