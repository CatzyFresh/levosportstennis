"use client";
import Link from "next/link";
import { useAppStore } from "@/store/useAppStore";
export default function PlayersPage(){const {players}=useAppStore();return <div><div className="flex justify-between"><h2 className="text-xl font-semibold">Players</h2><Link href="/players/new" className="underline">Add player</Link></div><table className="w-full mt-3 text-sm"><thead><tr><th>Name</th><th>Batch</th><th>Skill</th></tr></thead><tbody>{players.map(p=><tr key={p.id} className="border-t border-slate-800"><td><Link className="underline" href={`/players/${p.id}`}>{p.fullName}</Link></td><td>{p.batchId}</td><td>{p.skillLevel}</td></tr>)}</tbody></table></div>}
