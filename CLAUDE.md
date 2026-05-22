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
Dernière session: 2026-05-22 — SocialProof passé du sombre `#111111` à clair `#F4F4F4` (cohérence avec Benefits / PourquoiOsmo). Tous les textes adaptés : H2 + italique `#111`, body `#444`, citation `#111` italique (l'amber est retiré, conforme au design system « amber restreint aux CTAs/key numbers/dots »), stats valeurs `#111` / labels `#666`, bordures haut/bas `#E8E8E8`. Aucun changement de contenu, structure ou animations.
Session précédente: 2026-05-21 — ClinicalStudy : retour au full-bleed sombre 100vh + ajout de la vraie photo de fond `/public/images/study-background.png` (cristaux NAC macro sur fond blanc, servie via `next/image` fill+cover+priority). Overlay sombre `linear-gradient(135deg, rgba(0,0,0,.80), rgba(0,0,0,.50))`. Carte glassmorphique restaurée (backdrop-blur 12px, bg rgba(255,255,255,.06), border rgba(255,255,255,.12), radius 20px, max 560px) avec eyebrow ambre, headline sobre "L'étude clinique sur la NAC détaillée" (sans "urgentistes"), body NAC/OMS, 3 stats ambre (OMS · +GSH · 40 ans), CTA pilule transparent (radius 50px), disclaimer source. z-index: image 0, overlay 1, contenu 2.
Statut courant: page d'accueil = Hero · Marquee · WhyYouSuffer · **Benefits** · **SocialProof** · **HowItWorks** · **Formula** · **ClinicalStudy** · PourquoiOsmo · ClosingCTA · FAQ · Newsletter
Bugs ouverts: hydration warning React préexistant sur MolecularAnimation · carousel hero images à uploader · pot 15 doses vs 2 prises/jour (à arbitrer) · `/ugc/[token]` à créer · `LAPOSTE_API_KEY` + `DHL_API_KEY` à configurer
