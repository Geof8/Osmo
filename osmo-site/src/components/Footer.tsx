export default function Footer() {
  const cols = [
    { title: "Produit", links: ["Recovery", "Composition", "Protocole"] },
    { title: "Atelier", links: ["Notre approche", "Lot 001", "Analyses"] },
    { title: "Légal", links: ["Mentions légales", "CGV", "Contact"] },
  ];

  return (
    <footer className="bg-[var(--paper)] border-t border-[var(--rule)] relative z-[5]" style={{ padding: "64px 0 36px" }}>
      <div className="max-w-[1380px] mx-auto px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-14">
          <div>
            <span
              className="relative pr-[14px] inline-block"
              style={{
                fontFamily: "var(--font-barlow), var(--display)",
                fontWeight: 900,
                fontSize: 40,
                letterSpacing: "-0.04em",
                lineHeight: 1,
              }}
            >
              Osmo
              <span className="absolute bottom-[6px] right-0 w-[7px] h-[7px] bg-[var(--ink)] rounded-full" />
            </span>
            <div
              className="text-[var(--ink-2)] mt-[14px]"
              style={{
                fontFamily: "var(--font-barlow), var(--display)",
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
          {cols.map((col) => (
            <div key={col.title}>
              <h4
                className="text-[var(--ink-2)] mb-[18px]"
                style={{ fontFamily: "var(--font-mono), var(--mono)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 500 }}
              >
                {col.title}
              </h4>
              <ul className="list-none">
                {col.links.map((link) => (
                  <li
                    key={link}
                    style={{ fontFamily: "var(--font-mono), var(--mono)", fontSize: 12, lineHeight: 2.1 }}
                  >
                    <span className="cursor-pointer hover:text-[var(--ink)] transition-colors">{link}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="mt-14 pt-5 border-t border-[var(--soft)] flex justify-between gap-6 flex-wrap text-[var(--ink-2)]"
          style={{ fontFamily: "var(--font-mono), var(--mono)", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase" }}
        >
          <div>© 2026 Osmo Lab · osmolab.fr</div>
          <div>Réf. OSMO/REC—001 · Lot 001 · 04—2026</div>
          <div>Made in France · 300 ex.</div>
        </div>
      </div>
    </footer>
  );
}
