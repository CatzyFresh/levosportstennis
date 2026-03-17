"use client";import { useAppStore } from "@/store/useAppStore";
export default function(){const {inventoryItems}=useAppStore();const rows=inventoryItems.filter(i=>i.stock<=i.reorderLevel);return <div><h2 className="text-xl">Low Stock</h2>{rows.map(r=><div key={r.id}>{r.name} - {r.stock}/{r.reorderLevel}</div>)}</div>}
