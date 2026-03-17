"use client";
import { useParams } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";
export default function PlayerDetail(){const {id}=useParams<{id:string}>(); const s=useAppStore(); const p=s.players.find(x=>x.id===id); if(!p) return <p>Not found</p>; return <div className="space-y-2"><h2 className="text-xl font-semibold">{p.fullName}</h2><p>Skill: {p.skillLevel}</p><p>Batch: {p.batchId}</p></div>}
