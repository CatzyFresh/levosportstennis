"use client";import Link from "next/link";import { useAppStore } from "@/store/useAppStore";
export default function(){const s=useAppStore();return <div><h2 className="text-xl">Tournament List</h2>{s.tournaments.map(t=><div key={t.id}><Link className="underline" href={`/tournaments/${t.id}`}>{t.name}</Link> ({t.startDate})</div>)}</div>}
