"use client";
import Link from "next/link";import { useAppStore } from "@/store/useAppStore";
export default function(){const {coaches}=useAppStore();return <div><div className="flex justify-between"><h2 className="text-xl font-semibold">Coaches</h2><Link href="/coaches/new" className="underline">Add coach</Link></div>{coaches.map(c=><div key={c.id} className="border-b border-slate-800 py-2">{c.name} - {c.specialization}</div>)}</div>}
