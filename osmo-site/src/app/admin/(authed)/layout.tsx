import type { Metadata } from "next";
import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/admin-auth";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";

export const metadata: Metadata = {
  title: "Admin · OSMO",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminAuthedLayout({ children }: { children: ReactNode }) {
  const authed = await isAuthenticated();
  if (!authed) {
    redirect("/admin/login");
  }

  return (
    <div
      style={{
        minHeight: "100dvh",
        background: "#F4F4F4",
        position: "relative",
        zIndex: 2,
      }}
    >
      <AdminTopbar />
      <AdminSidebar />
      <main
        style={{
          marginLeft: 240,
          marginTop: 56,
          padding: "28px 32px 64px",
          minHeight: "calc(100dvh - 56px)",
        }}
      >
        {children}
      </main>
    </div>
  );
}
