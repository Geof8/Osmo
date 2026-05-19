import Link from "next/link";
import { FONTS, FOOTER_COLUMNS, LEGAL_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-[var(--paper)] border-t border-[var(--rule)] relative z-[5]" style={{ padding: "clamp(56px, 9vw, 80px) 0" }}>
      <div className="max-w-[1380px] mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 lg:gap-14">
          <div>
            <span
              className="relative pr-[14px] inline-block"
              style={{
                fontFamily: FONTS.display,
                fontWeight: 900,
                fontSize: 40,
                letterSpacing: "-0.04em",
                lineHeight: 1,
              }}
            >
              Osmo
              <span className="absolute bottom-[6px] right-0 w-[7px] h-[7px] bg-[var(--ink)] rounded-full" aria-hidden="true" />
            </span>
            <div
              className="text-[var(--ink-2)] mt-[14px]"
              style={{
                fontFamily: FONTS.display,
                fontWeight: 500,
                fontStyle: "normal",
                fontSize: 18,
                lineHeight: 1.4,
                maxWidth: 280,
              }}
            >
              Récupérez.{" "}
              <span style={{ fontWeight: 700 }}>Recommencez.</span>
            </div>
          </div>
          {FOOTER_COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h4
                className="text-[var(--ink-2)] mb-[18px]"
                style={{ fontFamily: FONTS.mono, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 500 }}
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
                      className="hover:text-[var(--ink)] transition-colors inline-flex items-center min-h-[44px]"
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
          className="mt-14 pt-5 border-t border-[var(--soft)] flex flex-col sm:flex-row sm:justify-between gap-3 sm:gap-6 sm:flex-wrap text-[var(--ink-2)]"
          style={{ fontFamily: FONTS.mono, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase" }}
        >
          <div>© 2026 Osmo Lab · osmolab.fr</div>
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
                className="transition-colors hover:text-[var(--ink)]"
                style={{ color: "#666666" }}
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
