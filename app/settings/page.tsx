"use client";

import { useAppStore } from "@/store/useAppStore";

export default function SettingsPage() {
  const { resetDemoData } = useAppStore();

  return (
    <div className="space-y-3">
      <h2 className="text-xl">Admin Settings</h2>
      <p className="text-sm text-slate-400">This clears all stored records and keeps the system empty.</p>
      <button className="rounded bg-rose-700 px-3 py-2" onClick={() => resetDemoData()}>
        Delete All Data
      </button>
    </div>
  );
}
