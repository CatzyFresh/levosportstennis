"use client";import { useAppStore } from "@/store/useAppStore";
export default function(){const s=useAppStore();return <div><h2 className="text-xl">Inventory Transactions</h2>{s.inventoryTransactions.map(t=><div key={t.id}>{t.date} {t.type} {t.quantity} ({t.itemId})</div>)}</div>}
