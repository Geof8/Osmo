import { FONTS, FOOTER_COLUMNS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-[var(--paper)] border-t border-[var(--rule)] relative z-[5]" style={{ padding: "80px 0" }}>
      <div className="max-w-[1380px] mx-auto px-5 sm:px-10">
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
                    style={{ fontFamily: FONTS.mono, fontSize: 12, lineHeight: 2.1 }}
                  >
                    <a
                      href={link.href}
                      className="hover:text-[var(--ink)] transition-colors inline-flex items-center min-h-[32px]"
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
          className="mt-14 pt-5 border-t border-[var(--soft)] flex justify-between gap-6 flex-wrap text-[var(--ink-2)]"
          style={{ fontFamily: FONTS.mono, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase" }}
        >
          <div>© 2026 Osmo Lab · osmolab.fr</div>
          <div className="hidden sm:block">Réf. OSMO/REC—001 · Lot 001 · 04—2026</div>
          <div>Made in France · 50 ex.</div>
        </div>
      </div>
    </footer>
  );
}
