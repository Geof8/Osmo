import Link from "next/link";
import { FONTS, FOOTER_COLUMNS, LEGAL_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer
      className="relative z-[5]"
      style={{ background: "#F4F4F4", padding: "clamp(72px, 10vw, 100px) 0" }}
    >
      <div className="max-w-[1380px] mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 lg:gap-14">
          <div>
            <span
              className="inline-block"
              style={{
                fontFamily: FONTS.display,
                fontWeight: 900,
                fontSize: 40,
                letterSpacing: "-0.04em",
                lineHeight: 1,
                color: "#111111",
              }}
            >
              Osmo
            </span>
            <div
              className="mt-[14px]"
              style={{
                fontFamily: FONTS.display,
                fontWeight: 500,
                fontStyle: "normal",
                fontSize: 18,
                lineHeight: 1.4,
                maxWidth: 280,
                color: "#666666",
              }}
            >
              Récupérez.{" "}
              <span style={{ fontWeight: 700, color: "#111111" }}>Recommencez.</span>
            </div>
          </div>
          {FOOTER_COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h4
                className="mb-[18px]"
                style={{
                  fontFamily: FONTS.mono,
                  fontSize: 11,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  fontWeight: 400,
                  color: "#999999",
                }}
              >
                {col.title}
              </h4>
              <ul className="list-none">
                {col.links.map((link) => (
                  <li
                    key={link.label}
                    style={{ fontFamily: FONTS.mono, fontSize: 14, lineHeight: 1.8 }}
                  >
                    <a
                      href={link.href}
                      className="transition-colors inline-flex items-center min-h-[44px]"
                      style={{ color: "#666666" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#111111")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#666666")}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div
          className="mt-14 pt-6 flex flex-col sm:flex-row sm:justify-between gap-3 sm:gap-6 sm:flex-wrap"
          style={{
            borderTop: "1px solid #E8E8E8",
            fontFamily: FONTS.mono,
            fontSize: 11,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#666666",
          }}
        >
          <div>© 2026 Osmo Lab · osmo-lab.fr</div>
          <div className="hidden sm:block">Réf. OSMO/REC—001 · Lot 001 · 04—2026</div>
          <div>Made in France · 50 ex.</div>
        </div>

        <nav
          aria-label="Pages légales"
          className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1"
          style={{
            fontFamily: FONTS.body,
            fontSize: 12,
            color: "#666666",
          }}
        >
          {LEGAL_LINKS.map((link, i) => (
            <span key={link.href} className="inline-flex items-center gap-2">
              {i > 0 ? <span aria-hidden="true">·</span> : null}
              <Link
                href={link.href}
                className="transition-colors"
                style={{ color: "#666666" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#111111")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#666666")}
              >
                {link.label}
              </Link>
            </span>
          ))}
        </nav>
      </div>
    </footer>
  );
}
