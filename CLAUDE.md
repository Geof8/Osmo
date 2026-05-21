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
Dernière session: 2026-05-21 — Nouvelle section clinique NAC plein écran (full-bleed 100vw × 100vh) entre SocialProof et PourquoiOsmo : fond `#0A0A0A` + grain SVG, overlay gradient, carte glassmorphique (backdrop-blur 12px, radius 20px, max 560px) avec eyebrow "DONNÉES CLINIQUES", headline Fraunces, body NAC/OMS, 3 stats ambre (OMS / +GSH / 40 ans), CTA pilule vers étude Revue Médicale Suisse 2018. Animations Framer Motion (bg scale 1.05→1, carte fade-up délai 0.3s, stats stagger 0.1s, once:true). Spec image lifestyle non dispo → fallback solide #0A0A0A + grain activé.
Statut courant: page d'accueil = Hero · Marquee · WhyYouSuffer · Formula · HowItWorks · SocialProof · **ClinicalStudy** · PourquoiOsmo · ClosingCTA · FAQ · Newsletter
Bugs ouverts: hydration warning React préexistant sur MolecularAnimation · carousel hero images à uploader · pot 15 doses vs 2 prises/jour (à arbitrer) · `/ugc/[token]` à créer · `LAPOSTE_API_KEY` + `DHL_API_KEY` à configurer · photo lifestyle sombre OSMO à uploader pour remplacer le fond solide de ClinicalStudy
