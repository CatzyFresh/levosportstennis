"use client";

import Link from "next/link";
import { useState } from "react";
import { useAppStore } from "@/store/useAppStore";

export default function InventoryPage() {
  const { inventoryItems, addInventoryItem, updateInventoryItem, deleteInventoryItem } = useAppStore();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Accessories");
  const [sku, setSku] = useState("");
  const [unit, setUnit] = useState("piece");
  const [reorderLevel, setReorderLevel] = useState("10");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftName, setDraftName] = useState("");
  const [draftCategory, setDraftCategory] = useState("");

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Inventory</h2>

      <form
        className="grid gap-2 rounded border border-slate-800 p-3 md:grid-cols-6"
        onSubmit={(e) => {
          e.preventDefault();
          if (!name.trim() || !sku.trim()) return;
          addInventoryItem({
            id: `I-${Date.now()}`,
            name,
            category,
            sku,
            stock: 0,
            unit,
            reorderLevel: Number(reorderLevel) || 0
          });
          setName("");
          setSku("");
        }}
      >
        <input className="rounded border border-slate-700 bg-slate-900 p-2" placeholder="Item name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="rounded border border-slate-700 bg-slate-900 p-2" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
        <input className="rounded border border-slate-700 bg-slate-900 p-2" placeholder="SKU" value={sku} onChange={(e) => setSku(e.target.value)} />
        <input className="rounded border border-slate-700 bg-slate-900 p-2" placeholder="Unit" value={unit} onChange={(e) => setUnit(e.target.value)} />
        <input className="rounded border border-slate-700 bg-slate-900 p-2" placeholder="Reorder" value={reorderLevel} onChange={(e) => setReorderLevel(e.target.value)} />
        <button className="rounded bg-cyan-600 px-3 py-2">Add Item</button>
      </form>

      <div className="space-y-2">
        {inventoryItems.map((item) => {
          const isEditing = editingId === item.id;
          return (
            <div key={item.id} className="rounded border border-slate-800 p-3">
              {isEditing ? (
                <div className="space-y-2">
                  <input className="w-full rounded border border-slate-700 bg-slate-900 p-2" value={draftName} onChange={(e) => setDraftName(e.target.value)} />
                  <input className="w-full rounded border border-slate-700 bg-slate-900 p-2" value={draftCategory} onChange={(e) => setDraftCategory(e.target.value)} />
                  <div className="space-x-2">
                    <button
                      className="rounded bg-cyan-600 px-2 py-1"
                      onClick={() => {
                        updateInventoryItem({ ...item, name: draftName, category: draftCategory });
                        setEditingId(null);
                      }}
                    >
                      Save
                    </button>
                    <button className="rounded border border-slate-700 px-2 py-1" onClick={() => setEditingId(null)}>
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <Link className="underline" href={`/inventory/${item.id}`}>
                      {item.name}
                    </Link>
                    <p className="text-sm text-slate-400">
                      {item.category} · {item.stock} {item.unit} · SKU {item.sku}
                    </p>
                  </div>
                  <div className="space-x-2">
                    <button
                      className="rounded border border-slate-700 px-2 py-1"
                      onClick={() => {
                        setEditingId(item.id);
                        setDraftName(item.name);
                        setDraftCategory(item.category);
                      }}
                    >
                      Edit
                    </button>
                    <button className="rounded bg-rose-700 px-2 py-1" onClick={() => deleteInventoryItem(item.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
