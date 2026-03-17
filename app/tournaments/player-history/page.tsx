"use client";import { useAppStore } from "@/store/useAppStore";
export default function(){const s=useAppStore();return <div><h2 className="text-xl">Player Tournament History</h2>{s.players.map(p=><div key={p.id} className="mb-2"><strong>{p.fullName}</strong>: {s.tournamentMatches.filter(m=>m.playerId===p.id).length} matches</div>)}</div>}
