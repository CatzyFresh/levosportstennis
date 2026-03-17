export type Role = "super_admin" | "admin" | "head_coach" | "coach" | "store_manager" | "player" | "parent";

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  linkedPlayerIds?: string[];
  coachId?: string;
};

export type Coach = {
  id: string;
  name: string;
  role: "head_coach" | "coach" | "assistant_coach";
  phone?: string;
  specialization?: string;
  active: boolean;
};

export type Batch = {
  id: string;
  name: string;
  level: string;
  schedule: string;
  primaryCoachId: string;
};

export type Player = {
  id: string;
  fullName: string;
  dob?: string;
  gender?: string;
  age?: number;
  contact?: string;
  parentName?: string;
  parentContact?: string;
  emergencyContact?: string;
  skillLevel?: string;
  dominantHand?: string;
  primaryCoachId?: string;
  coachIds: string[];
  batchId?: string;
  joinDate?: string;
  medicalNotes?: string;
  notes?: string;
  active: boolean;
  createdAt: string;
};

export type AttendanceStatus = "present" | "absent" | "late" | "excused";

export type AttendanceEntry = {
  id: string;
  date: string;
  playerId: string;
  coachId?: string;
  batchId?: string;
  status: AttendanceStatus;
  remarks?: string;
};

export type InventoryItem = {
  id: string;
  name: string;
  category: string;
  sku: string;
  stock: number;
  unit: string;
  reorderLevel: number;
  supplier?: string;
  cost?: number;
};

export type InventoryTransaction = {
  id: string;
  itemId: string;
  date: string;
  type: "in" | "out" | "adjustment";
  quantity: number;
  purpose?: string;
  actor?: string;
};

export type PerformanceReview = {
  id: string;
  playerId: string;
  coachId: string;
  date: string;
  reviewType: "weekly" | "monthly" | "session";
  technical: number;
  tactical: number;
  physical: number;
  mental: number;
  matchplay: number;
  serve: number;
  return: number;
  forehand: number;
  backhand: number;
  volley: number;
  footwork: number;
  consistency: number;
  decisionMaking: number;
  competitiveAttitude: number;
  fitness: number;
  coachComments?: string;
  goals?: string;
  reviewDate?: string;
};

export type TournamentMatch = {
  id: string;
  tournamentId: string;
  playerId: string;
  type: "singles" | "doubles";
  partnerName?: string;
  opponentName: string;
  round: string;
  score: string;
  result: "win" | "loss";
  surface: string;
  coachObservation?: string;
  tacticalNotes?: string;
};

export type Tournament = {
  id: string;
  name: string;
  organizer?: string;
  level?: string;
  location?: string;
  startDate: string;
  endDate?: string;
  surface: string;
  ageCategory?: string;
};

export type Goal = { id: string; playerId: string; title: string; status: "not started" | "in progress" | "achieved"; targetDate?: string };

export type AppData = {
  users: User[];
  currentUserId: string;
  coaches: Coach[];
  batches: Batch[];
  players: Player[];
  attendance: AttendanceEntry[];
  inventoryItems: InventoryItem[];
  inventoryTransactions: InventoryTransaction[];
  performanceReviews: PerformanceReview[];
  tournaments: Tournament[];
  tournamentMatches: TournamentMatch[];
  goals: Goal[];
};
