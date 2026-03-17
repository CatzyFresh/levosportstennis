"use client";
import { workbookSeed } from "@/data/seed";
import { AppData, AttendanceEntry, Coach, Goal, InventoryItem, InventoryTransaction, PerformanceReview, Player, Role, Tournament, TournamentMatch, User } from "@/types/models";
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
  addInventoryItem: (v: InventoryItem) => void;
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
      addInventoryItem: (v) => set((s) => ({ inventoryItems: [v, ...s.inventoryItems] })),
      addInventoryTransaction: (v) => set((s) => ({ inventoryTransactions: [v, ...s.inventoryTransactions] })),
      addPerformanceReview: (v) => set((s) => ({ performanceReviews: [v, ...s.performanceReviews] })),
      addTournament: (v) => set((s) => ({ tournaments: [v, ...s.tournaments] })),
      addTournamentMatch: (v) => set((s) => ({ tournamentMatches: [v, ...s.tournamentMatches] })),
      addGoal: (v) => set((s) => ({ goals: [v, ...s.goals] })),
      resetDemoData: () => set(() => ({ ...workbookSeed }))
    }),
    { name: "levo-sports-academy-store" }
  )
);

export const getCurrentUser = (users: User[], currentUserId: string) => users.find((u) => u.id === currentUserId) ?? users[0];
