import "./globals.css";
import { AppShell } from "@/components/layout";

export const metadata = { title: "Levo Sports Academy Manager" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className="dark"><body><AppShell>{children}</AppShell></body></html>;
}
