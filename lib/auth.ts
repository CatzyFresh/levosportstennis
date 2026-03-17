export type AdminAccount = { email: string; password: string; role: "admin" | "super_admin"; name: string };

export const ADMIN_ACCOUNTS: AdminAccount[] = [
  { email: "superadmin@levo.app", password: "Admin@123", role: "super_admin", name: "Levo Super Admin" },
  { email: "admin@levo.app", password: "Admin@123", role: "admin", name: "Academy Admin" }
];

export const AUTH_COOKIE = "levo_admin_auth";

export function findAdmin(email: string, password: string) {
  return ADMIN_ACCOUNTS.find((a) => a.email.toLowerCase() === email.toLowerCase() && a.password === password);
}

export function makeAuthToken(account: AdminAccount) {
  return Buffer.from(JSON.stringify({ email: account.email, role: account.role, name: account.name })).toString("base64url");
}

export function parseAuthToken(value?: string) {
  if (!value) return null;
  try {
    const parsed = JSON.parse(Buffer.from(value, "base64url").toString("utf8"));
    if (parsed?.role === "admin" || parsed?.role === "super_admin") return parsed;
    return null;
  } catch {
    return null;
  }
}
