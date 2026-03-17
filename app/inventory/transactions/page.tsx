"use client";

import { useState } from "react";
import { useAppStore } from "@/store/useAppStore";

export default function InventoryTransactionsPage() {
  const { inventoryItems, inventoryTransactions, addInventoryTransaction } = useAppStore();
  const [itemId, setItemId] = useState(inventoryItems[0]?.id ?? "");
  const [type, setType] = useState<"in" | "out" | "adjustment">("in");
  const [quantity, setQuantity] = useState("1");
  const [purpose, setPurpose] = useState("New stock movement");

  return (
    <div className="space-y-4">
      <h2 className="text-xl">Inventory Transactions</h2>
      <form
        className="grid gap-2 rounded border border-slate-800 p-3 md:grid-cols-5"
        onSubmit={(e) => {
          e.preventDefault();
          if (!itemId) return;
          addInventoryTransaction({
            id: `IT-${Date.now()}`,
            itemId,
            date: new Date().toISOString().slice(0, 10),
            type,
            quantity: Number(quantity) || 0,
            purpose,
            actor: "Admin"
          });
          setQuantity("1");
        }}
      >
        <select className="rounded border border-slate-700 bg-slate-900 p-2" value={itemId} onChange={(e) => setItemId(e.target.value)}>
          {inventoryItems.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        <select className="rounded border border-slate-700 bg-slate-900 p-2" value={type} onChange={(e) => setType(e.target.value as typeof type)}>
          <option value="in">Stock In</option>
          <option value="out">Stock Out</option>
          <option value="adjustment">Adjustment</option>
        </select>
        <input className="rounded border border-slate-700 bg-slate-900 p-2" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Quantity" />
        <input className="rounded border border-slate-700 bg-slate-900 p-2" value={purpose} onChange={(e) => setPurpose(e.target.value)} placeholder="Purpose" />
        <button className="rounded bg-cyan-600 px-3 py-2">Add Transaction</button>
      </form>

      <div className="space-y-2">
        {inventoryTransactions.map((t) => (
          <div key={t.id} className="rounded border border-slate-800 p-2 text-sm">
            {t.date} · {t.type.toUpperCase()} · {t.quantity} · {inventoryItems.find((i) => i.id === t.itemId)?.name ?? t.itemId} · {t.purpose}
          </div>
        ))}
      </div>
    </div>
  );
}
