"use client";import Link from "next/link";import { useAppStore } from "@/store/useAppStore";
export default function(){const {inventoryItems}=useAppStore(); return <div><h2 className="text-xl font-semibold">Inventory</h2>{inventoryItems.map(i=><div key={i.id}><Link className="underline" href={`/inventory/${i.id}`}>{i.name}</Link> ({i.stock} {i.unit})</div>)}</div>}
