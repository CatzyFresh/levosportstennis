"use client";
import { StatCard } from "@/components/stat-card";
import { useAppStore } from "@/store/useAppStore";

export default function DashboardPage(){
 const s=useAppStore(); const today='2026-03-16';
 const todayRows=s.attendance.filter(a=>a.date===today);
 const low=s.inventoryItems.filter(i=>i.stock<=i.reorderLevel).length;
 return <div className="space-y-4"><h2 className="text-2xl font-semibold">Admin Dashboard</h2>
 <div className="grid md:grid-cols-4 gap-3">
 <StatCard label="Players" value={s.players.length}/><StatCard label="Coaches" value={s.coaches.length}/><StatCard label="Attendance Today" value={todayRows.length}/><StatCard label="Low Stock Items" value={low}/>
 </div>
 </div>
}
