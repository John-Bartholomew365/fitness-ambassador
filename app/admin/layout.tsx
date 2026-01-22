// app/admin/layout.tsx
import { AuthProvider } from "@/components/contexts/AuthContext";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | Fitness Ambassador",
  description: "Admin dashboard for Fitness Ambassador",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider requireAuth={true}>
      {children}
    </AuthProvider>
  );
}