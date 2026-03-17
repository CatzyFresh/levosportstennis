import { AppData } from "@/types/models";

export const workbookSeed: AppData = {
  currentUserId: "U-1",
  users: [
    { id: "U-1", name: "Levo Super Admin", email: "superadmin@levo.app", role: "super_admin" },
    { id: "U-2", name: "Academy Admin", email: "admin@levo.app", role: "admin" },
    { id: "U-3", name: "Elan Head Coach", email: "elan@levo.app", role: "head_coach", coachId: "C-1" },
    { id: "U-4", name: "Coach Stephen", email: "stephen@levo.app", role: "coach", coachId: "C-2" },
    { id: "U-5", name: "Store Manager Nina", email: "store@levo.app", role: "store_manager" },
    { id: "U-6", name: "Player Prativ", email: "prativ@levo.app", role: "player", linkedPlayerIds: ["P-1"] },
    { id: "U-7", name: "Parent of Arya", email: "parent.arya@levo.app", role: "parent", linkedPlayerIds: ["P-4"] }
  ],
  coaches: [
    { id: "C-1", name: "Elan", specialization: "High performance", phone: "+91-900000001", active: true },
    { id: "C-2", name: "Stephen", specialization: "Junior development", phone: "+91-900000002", active: true }
  ],
  batches: [
    { id: "B-1", name: "Elite U18", level: "Advanced", schedule: "Mon-Fri 6:00 AM", primaryCoachId: "C-1" },
    { id: "B-2", name: "Competitive U14", level: "Intermediate", schedule: "Mon-Fri 5:00 PM", primaryCoachId: "C-2" }
  ],
  players: [
    { id: "P-1", fullName: "Prativ Menon", age: 15, gender: "Male", skillLevel: "Advanced", dominantHand: "Right", primaryCoachId: "C-1", coachIds: ["C-1"], batchId: "B-1", joinDate: "2025-04-10", parentName: "Lakshmi Menon", parentContact: "+91-911111111", active: true, createdAt: "2025-04-10" },
    { id: "P-2", fullName: "Bhavishnu Ravi", age: 16, gender: "Male", skillLevel: "Advanced", dominantHand: "Right", primaryCoachId: "C-1", coachIds: ["C-1"], batchId: "B-1", active: true, createdAt: "2025-03-10" },
    { id: "P-3", fullName: "Aarish Kumar", age: 14, gender: "Male", skillLevel: "Intermediate", dominantHand: "Right", primaryCoachId: "C-2", coachIds: ["C-2"], batchId: "B-2", active: true, createdAt: "2025-05-01" },
    { id: "P-4", fullName: "Arya S", age: 13, gender: "Female", skillLevel: "Intermediate", dominantHand: "Right", primaryCoachId: "C-2", coachIds: ["C-2"], batchId: "B-2", active: true, createdAt: "2025-07-01" }
  ],
  attendance: [
    { id: "A-1", date: "2026-03-16", playerId: "P-1", coachId: "C-1", batchId: "B-1", status: "present" },
    { id: "A-2", date: "2026-03-16", playerId: "P-2", coachId: "C-1", batchId: "B-1", status: "late" },
    { id: "A-3", date: "2026-03-16", playerId: "P-3", coachId: "C-2", batchId: "B-2", status: "absent" },
    { id: "A-4", date: "2026-03-16", playerId: "P-4", coachId: "C-2", batchId: "B-2", status: "present" }
  ],
  inventoryItems: [
    { id: "I-1", name: "Wilson US Open Balls", category: "Tennis balls", sku: "BALL-001", stock: 18, unit: "can", reorderLevel: 20, supplier: "Ace Sports", cost: 350 },
    { id: "I-2", name: "Overgrip Pro", category: "Overgrips", sku: "GRIP-009", stock: 60, unit: "piece", reorderLevel: 25, supplier: "SpinTrade", cost: 75 }
  ],
  inventoryTransactions: [
    { id: "IT-1", itemId: "I-1", date: "2026-03-15", type: "out", quantity: 12, purpose: "Morning batch usage", actor: "Coach Elan" },
    { id: "IT-2", itemId: "I-1", date: "2026-03-14", type: "in", quantity: 30, purpose: "Supplier refill", actor: "Store Manager" }
  ],
  performanceReviews: [
    { id: "R-1", playerId: "P-1", coachId: "C-1", date: "2026-03-12", reviewType: "weekly", technical: 8, tactical: 7, physical: 8, mental: 7, matchplay: 8, serve: 7, return: 8, forehand: 8, backhand: 7, volley: 7, footwork: 8, consistency: 7, decisionMaking: 7, competitiveAttitude: 9, fitness: 8, coachComments: "Strong intensity", goals: "Improve 2nd serve depth" }
  ],
  tournaments: [
    { id: "T-1", name: "Chennai Junior Open", organizer: "TNTA", level: "AITA", location: "Chennai", startDate: "2026-03-20", endDate: "2026-03-24", surface: "Hard", ageCategory: "U16" }
  ],
  tournamentMatches: [
    { id: "TM-1", tournamentId: "T-1", playerId: "P-1", type: "singles", opponentName: "R. Suri", round: "R16", score: "6-4 3-6 10-7", result: "win", surface: "Hard", tacticalNotes: "Targeted backhand high" }
  ],
  goals: [
    { id: "G-1", playerId: "P-1", title: "Reach 70% first serve", status: "in progress", targetDate: "2026-04-20" }
  ]
};
