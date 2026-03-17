"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAppStore } from "@/store/useAppStore";
export default function NewPlayer(){const {addPlayer}=useAppStore();const r=useRouter();const [name,setName]=useState("");return <form className="space-y-3" onSubmit={(e)=>{e.preventDefault();if(!name.trim())return;addPlayer({id:`P-${Date.now()}`,fullName:name,coachIds:[],active:true,createdAt:new Date().toISOString().slice(0,10)} as any);r.push('/players')}}><h2 className="text-xl font-semibold">Create Player</h2><input className="bg-slate-900 border p-2 rounded w-full" placeholder="Full name" value={name} onChange={e=>setName(e.target.value)}/><button className="bg-cyan-600 px-3 py-2 rounded">Save</button></form>}
