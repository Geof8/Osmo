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
Dernière session: 2026-05-22 — Hero pré-commande : badge noir pilule (🔒 PRÉ-COMMANDE · Automne 2026) au-dessus du headline, bloc prix barré 30€ → 20€ avec badge -33%, compteur urgency "Il reste X places sur 50" + barre de progression (fill proportionnel au restant, devient ambre + texte "⚡ Plus que X places" si < 10), CTA "Réserver ma place — 20€", lignes de réassurance (pré-commande sécurisée + production démarre à 50). Compteur câblé sur `useWaitlistCount` (Supabase via `/api/early-adopters/count`). Headline, subline, carousel et meta strip préservés. Animations Framer Motion (fade-up gated sur `revealed`, barre anime de 0 → fillPct%).
Session précédente: 2026-05-22 — SocialProof passé du sombre `#111111` à clair `#F4F4F4` (cohérence avec Benefits / PourquoiOsmo). Citation maintenue en ambre `#C8963E` italique (exception explicite au "amber restreint aux CTAs/key numbers/dots").
Statut courant: page d'accueil = Hero (pré-commande) · Marquee · WhyYouSuffer · Benefits · SocialProof · HowItWorks · Formula · ClinicalStudy · PourquoiOsmo · ClosingCTA · FAQ · Newsletter
Bugs ouverts: hydration warning React préexistant sur MolecularAnimation · carousel hero images à uploader · pot 15 doses vs 2 prises/jour (à arbitrer) · `/ugc/[token]` à créer · `LAPOSTE_API_KEY` + `DHL_API_KEY` à configurer
