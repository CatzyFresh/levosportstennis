"use client";import { useParams } from "next/navigation";import { useAppStore } from "@/store/useAppStore";
export default function(){const {id}=useParams<{id:string}>();const s=useAppStore();const i=s.inventoryItems.find(x=>x.id===id);if(!i)return <p>Not found</p>;return <div><h2 className="text-xl">{i.name}</h2><p>SKU: {i.sku}</p><p>Supplier: {i.supplier}</p></div>}
