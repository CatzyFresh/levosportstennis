"use client";
import { workbookSeed } from "@/data/seed";
import { AppData, AttendanceEntry, Coach, DayLog, Goal, InventoryItem, InventoryTransaction, PerformanceReview, Player, Role, Tournament, TournamentMatch, User } from "@/types/models";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AppState = AppData & {
  setCurrentUser: (id: string) => void;
  addPlayer: (v: Player) => void;
  updatePlayer: (v: Player) => void;
  deletePlayer: (id: string) => void;
  addCoach: (v: Coach) => void;
  updateCoach: (v: Coach) => void;
  deleteCoach: (id: string) => void;
  addAttendance: (v: AttendanceEntry) => void;
  upsertDayLog: (v: DayLog) => void;
  addInventoryItem: (v: InventoryItem) => void;
  updateInventoryItem: (v: InventoryItem) => void;
  deleteInventoryItem: (id: string) => void;
  addInventoryTransaction: (v: InventoryTransaction) => void;
  addPerformanceReview: (v: PerformanceReview) => void;
  addTournament: (v: Tournament) => void;
  addTournamentMatch: (v: TournamentMatch) => void;
  addGoal: (v: Goal) => void;
  resetDemoData: () => void;
};

export const rolePermissions: Record<Role, string[]> = {
  super_admin: ["*"],
  admin: ["*"],
  head_coach: ["dashboard", "players", "coaches", "attendance", "performance", "tournaments", "reports"],
  coach: ["dashboard", "players_assigned", "attendance", "performance", "tournaments"],
  store_manager: ["inventory", "dashboard"],
  player: ["portal_player"],
  parent: ["portal_parent"]
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      ...workbookSeed,
      setCurrentUser: (id) => set(() => ({ currentUserId: id })),
      addPlayer: (v) => set((s) => ({ players: [v, ...s.players] })),
      updatePlayer: (v) => set((s) => ({ players: s.players.map((p) => (p.id === v.id ? v : p)) })),
      deletePlayer: (id) => set((s) => ({ players: s.players.filter((p) => p.id !== id), attendance: s.attendance.filter((a) => a.playerId !== id) })),
      addCoach: (v) => set((s) => ({ coaches: [v, ...s.coaches] })),
      updateCoach: (v) => set((s) => ({ coaches: s.coaches.map((c) => (c.id === v.id ? v : c)) })),
      deleteCoach: (id) =>
        set((s) => ({
          coaches: s.coaches.filter((c) => c.id !== id),
          players: s.players.map((p) => ({
            ...p,
            primaryCoachId: p.primaryCoachId === id ? undefined : p.primaryCoachId,
            coachIds: p.coachIds.filter((coachId) => coachId !== id)
          }))
        })),
      addAttendance: (v) => set((s) => ({ attendance: [v, ...s.attendance] })),
      upsertDayLog: (v) => set((s) => ({ dayLogs: s.dayLogs.some((d) => d.date === v.date) ? s.dayLogs.map((d) => (d.date === v.date ? { ...d, ...v } : d)) : [v, ...s.dayLogs] })),
      addInventoryItem: (v) => set((s) => ({ inventoryItems: [v, ...s.inventoryItems] })),
      updateInventoryItem: (v) => set((s) => ({ inventoryItems: s.inventoryItems.map((i) => (i.id === v.id ? v : i)) })),
      deleteInventoryItem: (id) =>
        set((s) => ({
          inventoryItems: s.inventoryItems.filter((i) => i.id !== id),
          inventoryTransactions: s.inventoryTransactions.filter((t) => t.itemId !== id)
        })),
      addInventoryTransaction: (v) =>
        set((s) => ({
          inventoryTransactions: [v, ...s.inventoryTransactions],
          inventoryItems: s.inventoryItems.map((item) => {
            if (item.id !== v.itemId) return item;
            const delta = v.type === "in" ? v.quantity : v.type === "out" ? -v.quantity : v.quantity;
            return { ...item, stock: Math.max(0, item.stock + delta) };
          })
        })),
      addPerformanceReview: (v) => set((s) => ({ performanceReviews: [v, ...s.performanceReviews] })),
      addTournament: (v) => set((s) => ({ tournaments: [v, ...s.tournaments] })),
      addTournamentMatch: (v) => set((s) => ({ tournamentMatches: [v, ...s.tournamentMatches] })),
      addGoal: (v) => set((s) => ({ goals: [v, ...s.goals] })),
      resetDemoData: () => set(() => ({ ...workbookSeed }))
    }),
    { name: "levo-sports-academy-store" }
  )
);

export const getCurrentUser = (users: User[], currentUserId: string): User | undefined => users.find((u) => u.id === currentUserId) ?? users[0];
