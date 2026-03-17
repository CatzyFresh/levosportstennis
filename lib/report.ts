import { AttendanceEntry, Batch, Coach, Player } from "@/types/models";

export function whatsappAttendanceReport(date: string, attendance: AttendanceEntry[], players: Player[], coaches: Coach[], batches: Batch[]) {
  const rows = attendance.filter((a) => a.date === date);
  const statuses = ["present", "absent", "late", "excused"] as const;
  const fmt = (id: string) => players.find((p) => p.id === id)?.fullName ?? id;
  const byStatus = Object.fromEntries(statuses.map((s) => [s, rows.filter((r) => r.status === s).map((r) => fmt(r.playerId))]));
  const coachGroups = coaches.map((c) => {
    const names = rows.filter((r) => r.coachId === c.id && r.status === "present").map((r) => fmt(r.playerId));
    return names.length ? `${c.name}: ${names.join(", ")}` : null;
  }).filter(Boolean);
  const batchGroups = batches.map((b) => {
    const names = rows.filter((r) => r.batchId === b.id && r.status === "present").map((r) => fmt(r.playerId));
    return names.length ? `${b.name}: ${names.join(", ")}` : null;
  }).filter(Boolean);
  return `Date: ${date}\nPresent: ${byStatus.present.join(", ") || "-"}\nAbsent: ${byStatus.absent.join(", ") || "-"}\nLate: ${byStatus.late.join(", ") || "-"}\nExcused: ${byStatus.excused.join(", ") || "-"}\n\nBy Coach\n${coachGroups.join("\n") || "-"}\n\nBy Batch\n${batchGroups.join("\n") || "-"}`;
}
