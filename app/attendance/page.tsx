"use client";import { useAppStore } from "@/store/useAppStore";
export default function(){const s=useAppStore();return <div><h2 className="text-xl font-semibold">Attendance Calendar/List</h2>{s.attendance.map(a=><div key={a.id} className="border-b border-slate-800 py-1">{a.date} - {a.playerId} - {a.status}</div>)}</div>}
