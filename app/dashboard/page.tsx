"use client";
import { StatCard } from "@/components/stat-card";
import { useAppStore } from "@/store/useAppStore";

export default function DashboardPage(){
 const s=useAppStore(); const today=new Date().toISOString().slice(0,10);
 const month=new Date().toISOString().slice(0,7);
 const todayRows=s.attendance.filter(a=>a.date===today);
 const low=s.inventoryItems.filter(i=>i.stock<=i.reorderLevel).length;
 const monthlySales=s.playerPurchases.filter((p)=>p.date.startsWith(month)).reduce((sum,p)=>sum+p.price*p.quantity,0);
 return <div className="space-y-4"><h2 className="text-2xl font-semibold">Admin Dashboard</h2>
 <div className="grid md:grid-cols-5 gap-3">
 <StatCard label="Players" value={s.players.length}/><StatCard label="Coaches" value={s.coaches.length}/><StatCard label="Attendance Today" value={todayRows.length}/><StatCard label="Low Stock Items" value={low}/><StatCard label="Monthly Sales" value={`₹${monthlySales.toFixed(0)}`}/>
 </div>
 </div>
}
