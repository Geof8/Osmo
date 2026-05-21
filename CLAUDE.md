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
Dernière session: 2026-05-21 — Section ClinicalStudy refondue à la Kosbiotic : fond clair `#F4F4F4` + zone hero arrondie (gradient gris radial + grain SVG) à la place du sombre. Carte BLANCHE top-left (radius 20px, max 560px, padding clamp 28→48px). Titre Fraunces sobre "L'étude clinique sur la NAC détaillée" (le mot "urgentistes" supprimé). Body court NAC + OMS. 2 stats noires en très gros (OMS · 40 ans), valeurs clamp 36→56px. CTA minimal noir transparent (border #111, hover invert), radius 50px conservé. Animations Framer Motion inchangées. (Avant cette refonte : réordonnancement complet des sections selon le flow narratif D2C optimal.)
Statut courant: page d'accueil = Hero · Marquee · WhyYouSuffer · **Benefits** · **SocialProof** · **HowItWorks** · **Formula** · **ClinicalStudy** · PourquoiOsmo · ClosingCTA · FAQ · Newsletter
Bugs ouverts: hydration warning React préexistant sur MolecularAnimation · carousel hero images à uploader · pot 15 doses vs 2 prises/jour (à arbitrer) · `/ugc/[token]` à créer · `LAPOSTE_API_KEY` + `DHL_API_KEY` à configurer · photo lifestyle macro (style Kosbiotic) à uploader pour remplacer le gradient de fond de ClinicalStudy
