# OSMO Recovery — Claude Code Context

## Essentiel
Site: https://osmo-lab.fr
Repo: https://github.com/Geof8/Osmo.git
Stack: Next.js 14 + Tailwind + Supabase +
  Stripe + Resend + Framer Motion + GSAP
Fonts: Fraunces (titles) + DM Sans (body)
Colors: #C8963E amber · #111111 · #FFFFFF · #F4F4F4

## URLs
- Admin: https://osmo-lab.fr/admin
- Supabase: dashboard.supabase.com
- Stripe: dashboard.stripe.com (mode TEST)
- Vercel: vercel.com/dashboard
- Resend: resend.com/dashboard

## Règles absolues
1. Langue du site: FRANÇAIS partout
2. Ne jamais hardcoder les variables d'environnement
3. Toujours pusher sur GitHub en fin de session
4. Toujours mettre à jour JOURNAL.md en fin de session
5. Stripe est en mode TEST — ne pas passer en live
6. Border-radius: 50px sur tous les CTA buttons
7. Tester sur https://osmo-lab.fr après chaque push

## Fichiers de référence
Pour plus de détails lire uniquement si nécessaire:
- /docs/FRONT.md → site, sections, design
- /docs/BACK.md → back-office, tables Supabase
- /docs/PRODUCT.md → formule, protocole, pricing
- /docs/JOURNAL.md → journal de bord des sessions

## Journal rapide
Dernière session: 2026-05-24 — Correctifs post-pass responsive : (1) Navbar : logo "Osmo" remis aligné en haut à gauche sur mobile (grid `[auto_1fr_auto]` restaurée), suite retour utilisateur. (2) ClinicalStudy mobile : padding remonté à 32/24, marges 72px, body 15/1.65, stat value 26, stat label 11 (la version précédente était trop compacte). Reste du pass responsive conservé.
Session précédente: 2026-05-24 — Pass responsive mobile complet : (1) Navbar logo "Osmo" centré absolu sur mobile (left-1/2 -translate-x-1/2), grid 3-cols préservée ≥ sm. (2) Hero : prix dans pilule noire (radius 50, padding 8/16, gap 8, font 13) — 30€ barré #999, 20€ blanc weight 900, -33% en ambre #C8963E. (3) CountUp : durée par défaut 1.2s → 3.5s (easeOutCubic conservé). (4) Benefits : grid 2x2 mobile (`grid-cols-2`), card padding 16, icône 24px, titre 13/600, desc 12. (5) MobileCardCarousel : SWIPE_THRESHOLD 50 → 30, dragElastic 0.1, overflow visible, slide à 85% de la largeur conteneur (peek 15% du suivant via paddingRight 12). (6) ClinicalStudy : retrait du `height: 100vh` fixe sur mobile, padding carte 24, body 14, stat value 20, stat label 10 (via classes + media queries) — contenu étude Sinaeinejad et stats `+16%`/`−12%`/`8 sem.` (font-weight 900) conservés. (7) ClosingCTA : ligne "Vol. 01 · Lot N°001 · 50 ex." supprimée au-dessus du headline. (8) Notre Histoire ajouté à `FOOTER_COLUMNS.Atelier` (visible sur mobile via footer ; nav desktop conserve son lien centré).
Session précédente: 2026-05-22 — ClinicalStudy mis à jour avec la vraie étude Sinaeinejad et al. (Addiction & Health, 2025, essai randomisé double aveugle 69 patients). Body remplacé par accroche « L'alcool détruit le glutathion » + résumé de l'essai. Stats refondues : `+16%` glutathion / `−12%` CRP / `8 sem.` durée (font-weight 900, labels `#999` 12px). Ajout d'un bloc citation scientifique (italique #999 13px en anglais + source en non-italique #666 11px) entre les stats et le CTA, séparé par bordure `rgba(255,255,255,0.1)`. CTA pointe maintenant vers `https://pmc.ncbi.nlm.nih.gov/articles/PMC12718416`. Disclaimer mis à jour avec la nouvelle source. Titre « urgentistes » rétabli (demande explicite). Photo de fond, overlay, carte glass, animations conservés.
Session précédente: 2026-05-22 — Hero pré-commande : badge noir pilule (🔒 PRÉ-COMMANDE · Automne 2026) au-dessus du headline, bloc prix barré 30€ → 20€ avec badge -33%, compteur urgency "Il reste X places sur 50" + barre de progression (fill proportionnel au restant, devient ambre + texte "⚡ Plus que X places" si < 10), CTA "Réserver ma place — 20€", lignes de réassurance (pré-commande sécurisée + production démarre à 50). Compteur câblé sur `useWaitlistCount` (Supabase via `/api/early-adopters/count`). Headline, subline, carousel et meta strip préservés. Animations Framer Motion (fade-up gated sur `revealed`, barre anime de 0 → fillPct%).
Statut courant: page d'accueil = Hero (pré-commande) · Marquee · WhyYouSuffer · Benefits · SocialProof · HowItWorks · Formula · ClinicalStudy · PourquoiOsmo · ClosingCTA · FAQ · Newsletter
Bugs ouverts: hydration warning React préexistant sur MolecularAnimation · carousel hero images à uploader · pot 15 doses vs 2 prises/jour (à arbitrer) · `/ugc/[token]` à créer · `LAPOSTE_API_KEY` + `DHL_API_KEY` à configurer
