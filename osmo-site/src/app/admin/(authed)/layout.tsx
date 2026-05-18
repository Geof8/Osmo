import type { Metadata } from "next";
import type { ReactNode } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata: Metadata = {
  title: "Admin · OSMO",
  robots: { index: false, follow: false },
};

export default function AdminAuthedLayout({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        minHeight: "100dvh",
        background: "#F4F4F4",
        position: "relative",
        zIndex: 2,
      }}
    >
      <AdminSidebar />
      <main
        style={{
          marginLeft: 240,
          padding: "32px 40px 64px",
          minHeight: "100dvh",
        }}
      >
        {children}
      </main>
    </div>
  );
}
