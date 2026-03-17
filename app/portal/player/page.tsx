"use client";

import { getCurrentUser, useAppStore } from "@/store/useAppStore";

export default function PlayerPortalPage() {
  const s = useAppStore();
  const u = getCurrentUser(s.users, s.currentUserId);
  const pid = u?.linkedPlayerIds?.[0];
  const p = s.players.find((x) => x.id === pid);

  if (!p) return <p>No linked player.</p>;

  return (
    <div>
      <h2 className="text-xl">Player Portal</h2>
      <p>{p.fullName}</p>
      <p>Attendance records: {s.attendance.filter((a) => a.playerId === p.id).length}</p>
    </div>
  );
}
