"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";

const COMMON_ITEMS = ["Grips", "Racquet", "Strings", "Stringing Service", "Ball Can", "Kit Bag", "Dampener"];

export default function PlayerDetail() {
  const { id } = useParams<{ id: string }>();
  const { players, playerPurchases, addPlayerPurchase, deletePlayerPurchase } = useAppStore();
  const player = players.find((x) => x.id === id);
  const [itemName, setItemName] = useState(COMMON_ITEMS[0]);
  const [customItem, setCustomItem] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [notes, setNotes] = useState("");
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const purchases = useMemo(() => playerPurchases.filter((p) => p.playerId === id).sort((a, b) => b.date.localeCompare(a.date)), [playerPurchases, id]);
  const dailyTotals = useMemo(() => purchases.reduce<Record<string, number>>((acc, p) => ({ ...acc, [p.date]: (acc[p.date] ?? 0) + p.price * p.quantity }), {}), [purchases]);
  const monthlyPurchases = useMemo(() => purchases.filter((p) => p.date.startsWith(month)), [purchases, month]);
  const monthlyTotal = monthlyPurchases.reduce((sum, p) => sum + p.price * p.quantity, 0);

  if (!player) return <p>Not found</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{player.fullName}</h2>
      <p className="text-sm text-slate-300">Skill: {player.skillLevel ?? "-"}</p>

      <section className="rounded-xl border border-slate-700 p-3 space-y-2">
        <h3 className="font-semibold">Add purchase</h3>
        <select value={itemName} onChange={(e) => setItemName(e.target.value)} className="w-full p-3">
          {COMMON_ITEMS.map((item) => <option key={item}>{item}</option>)}
          <option value="custom">Custom</option>
        </select>
        {itemName === "custom" && <input className="w-full p-3" placeholder="Custom item" value={customItem} onChange={(e) => setCustomItem(e.target.value)} />}
        <div className="grid grid-cols-2 gap-2">
          <input className="p-3" type="number" min={1} value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} placeholder="Qty" />
          <input className="p-3" type="number" min={0} value={price} onChange={(e) => setPrice(Number(e.target.value))} placeholder="Price" />
        </div>
        <input className="w-full p-3" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <textarea className="w-full p-3" placeholder="Notes (optional)" value={notes} onChange={(e) => setNotes(e.target.value)} />
        <button
          className="w-full bg-cyan-600 py-3"
          onClick={() => {
            const resolvedItem = itemName === "custom" ? customItem : itemName;
            if (!resolvedItem || !quantity || !price) return;
            addPlayerPurchase({ id: crypto.randomUUID(), playerId: player.id, itemName: resolvedItem, quantity, price, date, notes });
            setNotes("");
            setCustomItem("");
          }}
        >
          Save purchase
        </button>
      </section>

      <section className="rounded-xl border border-slate-700 p-3">
        <h3 className="font-semibold">Calendar / timeline</h3>
        <div className="mt-2 space-y-1 text-sm">
          {Object.entries(dailyTotals).sort((a, b) => b[0].localeCompare(a[0])).map(([d, total]) => (
            <button key={d} className="flex w-full justify-between rounded border border-slate-700 p-2" onClick={() => setSelectedDate(d)}>
              <span>{d}</span><span>₹{total.toFixed(2)}</span>
            </button>
          ))}
        </div>
        {selectedDate && <div className="mt-2 rounded bg-slate-900 p-2 text-sm">{purchases.filter((p) => p.date === selectedDate).map((p) => <p key={p.id}>{p.itemName} x{p.quantity} = ₹{(p.price * p.quantity).toFixed(2)}</p>)}</div>}
      </section>

      <section className="rounded-xl border border-slate-700 p-3 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Monthly invoice</h3>
          <input type="month" value={month} onChange={(e) => setMonth(e.target.value)} className="p-2" />
        </div>
        <div className="text-sm space-y-1">
          {monthlyPurchases.map((p) => <div key={p.id} className="flex justify-between"><span>{p.date} • {p.itemName} x{p.quantity}</span><span>₹{(p.quantity * p.price).toFixed(2)}</span></div>)}
        </div>
        <p className="font-semibold">Total: ₹{monthlyTotal.toFixed(2)}</p>
        <div className="grid grid-cols-2 gap-2">
          <button className="bg-emerald-600 py-2" onClick={() => window.print()}>Download PDF</button>
          <a className="rounded bg-green-700 py-2 text-center" href={`https://wa.me/?text=${encodeURIComponent(`Invoice for ${player.fullName} (${month}) total ₹${monthlyTotal.toFixed(2)}`)}`} target="_blank">Share WhatsApp</a>
        </div>
      </section>

      <section className="rounded-xl border border-slate-700 p-3 space-y-2">
        <h3 className="font-semibold">All purchases</h3>
        {purchases.map((p) => (
          <div key={p.id} className="flex items-center justify-between rounded border border-slate-700 p-2 text-sm">
            <span>{p.date} • {p.itemName} x{p.quantity} • ₹{(p.price * p.quantity).toFixed(2)}</span>
            <button className="bg-rose-700 px-2 py-1" onClick={() => deletePlayerPurchase(p.id)}>Delete</button>
          </div>
        ))}
      </section>
    </div>
  );
}
