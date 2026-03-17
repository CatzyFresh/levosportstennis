export function whatsappAttendanceReport(date, attendance, players, coaches, batches) {
  const rows = attendance.filter((a) => a.date === date);
  const fmt = (id) => players.find((p) => p.id === id)?.fullName ?? id;
  const present = rows.filter((r) => r.status === 'present').map((r) => fmt(r.playerId));
  const absent = rows.filter((r) => r.status === 'absent').map((r) => fmt(r.playerId));
  const late = rows.filter((r) => r.status === 'late').map((r) => fmt(r.playerId));
  const excused = rows.filter((r) => r.status === 'excused').map((r) => fmt(r.playerId));
  const coachGroups = coaches.map((c) => {
    const names = rows.filter((r) => r.coachId === c.id && r.status === 'present').map((r) => fmt(r.playerId));
    return names.length ? `${c.name}: ${names.join(', ')}` : null;
  }).filter(Boolean);
  const batchGroups = batches.map((b) => {
    const names = rows.filter((r) => r.batchId === b.id && r.status === 'present').map((r) => fmt(r.playerId));
    return names.length ? `${b.name}: ${names.join(', ')}` : null;
  }).filter(Boolean);
  return `Date: ${date}\nPresent: ${present.join(', ') || '-'}\nAbsent: ${absent.join(', ') || '-'}\nLate: ${late.join(', ') || '-'}\nExcused: ${excused.join(', ') || '-'}\n\nBy Coach\n${coachGroups.join('\n') || '-'}\n\nBy Batch\n${batchGroups.join('\n') || '-'}`;
}
