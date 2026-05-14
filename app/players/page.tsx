"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useAppStore } from "@/store/useAppStore";

const LEVEL_OPTIONS = ["Beginner", "Intermediate", "Advanced", "Professional", "Members"] as const;

export default function PlayersPage() {
  const { players, updatePlayer, deletePlayer } = useAppStore();
  const [query, setQuery] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftName, setDraftName] = useState("");
  const [draftLevel, setDraftLevel] = useState<(typeof LEVEL_OPTIONS)[number]>("Beginner");

  const filteredPlayers = useMemo(() => players.filter((p) => p.fullName.toLowerCase().includes(query.toLowerCase())), [players, query]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xl font-semibold">Players</h2>
        <Link href="/players/new" className="rounded bg-cyan-600 px-4 py-2 text-sm font-semibold text-white">
          Add player
        </Link>
      </div>
      <input placeholder="Search players" value={query} onChange={(e) => setQuery(e.target.value)} className="w-full p-3" />
      <div className="space-y-2">
        {filteredPlayers.map((player) => {
          const isEditing = editingId === player.id;
          return (
            <div key={player.id} className="rounded-xl border border-slate-700 p-3">
              {isEditing ? (
                <div className="space-y-2">
                  <input className="w-full p-3" value={draftName} onChange={(e) => setDraftName(e.target.value)} />
                  <select className="w-full p-3" value={draftLevel} onChange={(e) => setDraftLevel(e.target.value as (typeof LEVEL_OPTIONS)[number])}>
                    {LEVEL_OPTIONS.map((lvl) => (
                      <option key={lvl} value={lvl}>{lvl}</option>
                    ))}
                  </select>
                  <div className="flex gap-2">
                    <button className="rounded bg-cyan-600 px-4 py-2" onClick={() => { updatePlayer({ ...player, fullName: draftName, skillLevel: draftLevel }); setEditingId(null); }}>Save</button>
                    <button className="rounded border border-slate-700 px-4 py-2" onClick={() => setEditingId(null)}>Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <Link className="font-semibold underline" href={`/players/${player.id}`}>{player.fullName}</Link>
                    <p className="text-sm text-slate-400">Level: {player.skillLevel ?? "-"}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="rounded border border-slate-700 px-3 py-2 text-sm" onClick={() => { setEditingId(player.id); setDraftName(player.fullName); setDraftLevel((player.skillLevel as (typeof LEVEL_OPTIONS)[number]) ?? "Beginner"); }}>Edit</button>
                    <button className="rounded bg-rose-700 px-3 py-2 text-sm" onClick={() => deletePlayer(player.id)}>Delete</button>
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
