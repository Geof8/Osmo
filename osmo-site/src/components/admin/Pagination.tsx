import Link from "next/link";

function buildHref(currentSearch: string, page: number) {
  const sp = new URLSearchParams(currentSearch);
  if (page <= 1) sp.delete("page");
  else sp.set("page", String(page));
  const qs = sp.toString();
  return qs ? `?${qs}` : "?";
}

export default function Pagination({
  page,
  pageSize,
  total,
  searchString,
}: {
  page: number;
  pageSize: number;
  total: number;
  searchString: string;
}) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  if (totalPages <= 1) {
    return (
      <div
        style={{
          padding: "12px 4px",
          fontSize: 12,
          color: "#888888",
          fontFamily: "var(--mono)",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        {total} résultat{total > 1 ? "s" : ""}
      </div>
    );
  }
  const prev = Math.max(1, page - 1);
  const next = Math.min(totalPages, page + 1);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 4px",
      }}
    >
      <div
        style={{
          fontSize: 12,
          color: "#888888",
          fontFamily: "var(--mono)",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        Page {page} / {totalPages} · {total} résultats
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <Link
          href={buildHref(searchString, prev)}
          aria-disabled={page === 1}
          className="admin-pill-btn admin-pill-btn-ghost"
          style={{
            pointerEvents: page === 1 ? "none" : "auto",
            opacity: page === 1 ? 0.4 : 1,
          }}
        >
          ← Précédent
        </Link>
        <Link
          href={buildHref(searchString, next)}
          aria-disabled={page === totalPages}
          className="admin-pill-btn admin-pill-btn-ghost"
          style={{
            pointerEvents: page === totalPages ? "none" : "auto",
            opacity: page === totalPages ? 0.4 : 1,
          }}
        >
          Suivant →
        </Link>
      </div>
    </div>
  );
}
