import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-osmo-border py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="font-display text-lg font-black tracking-tighter text-osmo-text">
            Osmo Lab
          </span>
          <p className="text-xs text-osmo-muted mt-1">
            Complément alimentaire. Ne se substitue pas à une alimentation
            variée et équilibrée.
          </p>
        </div>
        <div className="flex gap-8 text-sm text-osmo-muted font-body">
          <Link
            href="/produit"
            className="hover:text-osmo-text transition-colors"
          >
            Produit
          </Link>
          <Link href="/faq" className="hover:text-osmo-text transition-colors">
            FAQ
          </Link>
        </div>
        <p className="text-xs text-osmo-muted">
          © {new Date().getFullYear()} Osmo Lab. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
