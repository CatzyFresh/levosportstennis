"use client";import { useAppStore } from "@/store/useAppStore";
export default function(){const s=useAppStore();return <div><h2 className="text-xl">Performance Reviews</h2>{s.performanceReviews.map(r=><div key={r.id}>{r.date} {r.playerId} Tech:{r.technical} Mental:{r.mental}</div>)}</div>}
