"use client";import { useAppStore } from "@/store/useAppStore";
export default function(){const s=useAppStore();return <div><h2 className="text-xl">Admin Settings</h2><button className="bg-amber-600 px-2 py-1 rounded" onClick={()=>s.resetDemoData()}>Reset Seed Data</button></div>}
