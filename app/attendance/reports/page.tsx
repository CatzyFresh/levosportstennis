"use client";
import { useMemo } from "react";
import { useAppStore } from "@/store/useAppStore";
import { whatsappAttendanceReport } from "@/lib/report";
export default function(){const s=useAppStore(); const text=useMemo(()=>whatsappAttendanceReport('2026-03-16',s.attendance,s.players,s.coaches,s.batches),[s]); return <div><h2 className="text-xl font-semibold">Attendance Reports</h2><pre className="bg-slate-900 border border-slate-800 p-3 rounded whitespace-pre-wrap">{text}</pre><button className="bg-cyan-600 px-2 py-1 rounded mt-2" onClick={()=>navigator.clipboard.writeText(text)}>Copy WhatsApp Text</button></div>}
