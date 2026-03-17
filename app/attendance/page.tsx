"use client";

import { useMemo, useState } from "react";
import { useAppStore } from "@/store/useAppStore";

const WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function iso(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function inTournament(date: string, startDate: string, endDate?: string) {
  const d = new Date(date).getTime();
  const s = new Date(startDate).getTime();
  const e = new Date(endDate ?? startDate).getTime();
  return d >= s && d <= e;
}

export default function AttendanceCalendarPage() {
  const { attendance, players, tournaments, dayLogs, upsertDayLog } = useAppStore();
  const [viewDate, setViewDate] = useState(new Date("2026-03-01"));
  const [selectedDate, setSelectedDate] = useState("2026-03-16");

  const y = viewDate.getFullYear();
  const m = viewDate.getMonth();
  const first = new Date(y, m, 1);
  const startOffset = first.getDay();
  const daysInMonth = new Date(y, m + 1, 0).getDate();

  const cells = useMemo(() => {
    const arr: (Date | null)[] = [];
    for (let i = 0; i < startOffset; i += 1) arr.push(null);
    for (let d = 1; d <= daysInMonth; d += 1) arr.push(new Date(y, m, d));
    while (arr.length % 7 !== 0) arr.push(null);
    return arr;
  }, [daysInMonth, m, startOffset, y]);

  const selectedRows = attendance.filter((a) => a.date === selectedDate);
  const presentIds = selectedRows.filter((r) => r.status === "present" || r.status === "late").map((r) => r.playerId);
  const absentIds = players.filter((p) => !presentIds.includes(p.id)).map((p) => p.id);
  const selectedTournaments = tournaments.filter((t) => inTournament(selectedDate, t.startDate, t.endDate));
  const selectedLog = dayLogs.find((d) => d.date === selectedDate);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Attendance + Operations Calendar</h2>
        <div className="space-x-2">
          <button className="rounded border border-slate-700 px-2 py-1" onClick={() => setViewDate(new Date(y, m - 1, 1))}>
            Prev
          </button>
          <span className="text-sm text-slate-300">{viewDate.toLocaleString("en-US", { month: "long", year: "numeric" })}</span>
          <button className="rounded border border-slate-700 px-2 py-1" onClick={() => setViewDate(new Date(y, m + 1, 1))}>
            Next
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center text-xs text-slate-400">
        {WEEK.map((w) => (
          <div key={w}>{w}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {cells.map((d, idx) => {
          if (!d) return <div key={idx} className="h-20 rounded border border-slate-900 bg-slate-950" />;
          const day = iso(d);
          const rows = attendance.filter((a) => a.date === day);
          const dayTournament = tournaments.some((t) => inTournament(day, t.startDate, t.endDate));
          const dayRain = dayLogs.find((x) => x.date === day)?.rain;
          return (
            <button
              key={day}
              onClick={() => setSelectedDate(day)}
              className={`h-20 rounded border p-2 text-left ${selectedDate === day ? "border-cyan-500 bg-slate-800" : "border-slate-800 bg-slate-900"}`}
            >
              <div className="text-sm font-semibold">{d.getDate()}</div>
              <div className="text-[11px] text-slate-400">{rows.length} marked</div>
              <div className="text-[11px]">{dayTournament ? "🎾 Tournament" : ""}</div>
              <div className="text-[11px]">{dayRain ? "🌧️ Rain" : ""}</div>
            </button>
          );
        })}
      </div>

      <div className="grid gap-4 rounded border border-slate-800 bg-slate-900 p-4 md:grid-cols-2">
        <div>
          <h3 className="font-semibold">{selectedDate} Details</h3>
          <p className="mt-1 text-sm">Present/Late: {presentIds.map((id) => players.find((p) => p.id === id)?.fullName ?? id).join(", ") || "-"}</p>
          <p className="mt-1 text-sm">Not attended: {absentIds.map((id) => players.find((p) => p.id === id)?.fullName ?? id).join(", ") || "-"}</p>
          <p className="mt-1 text-sm">Tournaments: {selectedTournaments.map((t) => t.name).join(", ") || "None"}</p>
          <p className="mt-1 text-sm">Weather: {selectedLog?.rain ? "Rain" : "No rain"} {selectedLog?.weatherNote ? `(${selectedLog.weatherNote})` : ""}</p>
          <p className="mt-1 text-sm">Day Note: {selectedLog?.dayNote ?? "-"}</p>
        </div>

        <form
          key={selectedDate}
          className="space-y-2"
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            upsertDayLog({
              id: selectedLog?.id ?? `D-${Date.now()}`,
              date: selectedDate,
              rain: fd.get("rain") === "on",
              weatherNote: String(fd.get("weatherNote") ?? ""),
              dayNote: String(fd.get("dayNote") ?? "")
            });
          }}
        >
          <h4 className="font-semibold">Update Day Info</h4>
          <label className="flex items-center gap-2 text-sm">
            <input name="rain" type="checkbox" defaultChecked={selectedLog?.rain} /> Rain on this day
          </label>
          <input name="weatherNote" defaultValue={selectedLog?.weatherNote ?? ""} className="w-full rounded border border-slate-700 bg-slate-950 p-2" placeholder="Weather note" />
          <textarea name="dayNote" defaultValue={selectedLog?.dayNote ?? ""} className="w-full rounded border border-slate-700 bg-slate-950 p-2" placeholder="What happened today?" rows={3} />
          <button className="rounded bg-cyan-600 px-3 py-2">Save Day Log</button>
        </form>
      </div>
    </div>
  );
}
