import AdminPageHeader from "@/components/admin/AdminPageHeader";

export default function Placeholder({
  title,
  phase,
}: {
  title: string;
  phase: string;
}) {
  return (
    <>
      <AdminPageHeader title={title} subtitle={`Disponible dans ${phase}`} />
      <div
        className="admin-card admin-card-padded"
        style={{
          textAlign: "center",
          padding: "60px 24px",
          color: "#888888",
          fontFamily: "var(--body)",
        }}
      >
        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          En construction
        </div>
        <p style={{ fontSize: 15, color: "#666666" }}>
          Cette section sera livrée dans une session ultérieure.
        </p>
      </div>
    </>
  );
}
