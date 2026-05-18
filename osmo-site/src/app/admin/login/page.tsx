import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Admin · OSMO",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage({
  searchParams,
}: {
  searchParams: { from?: string };
}) {
  const from = typeof searchParams.from === "string" ? searchParams.from : "/admin";

  return (
    <div
      style={{
        minHeight: "100dvh",
        background: "#111111",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        position: "relative",
        zIndex: 2,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 380,
          background: "#1A1A1A",
          border: "1px solid #2A2A2A",
          borderRadius: 16,
          padding: "40px 32px",
        }}
      >
        <div
          style={{
            fontFamily: "var(--display)",
            fontWeight: 700,
            fontSize: 28,
            letterSpacing: "0.04em",
            color: "#FFFFFF",
            textAlign: "center",
            marginBottom: 8,
          }}
        >
          OSMO
        </div>
        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#888888",
            textAlign: "center",
            marginBottom: 32,
          }}
        >
          Back-office
        </div>
        <LoginForm redirectTo={from} />
      </div>
    </div>
  );
}
