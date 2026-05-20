# OSMO Recovery — Backend

## Stack
- Base de données : Supabase
- Paiement : Stripe (mode TEST actuellement)
- Emails : Resend
- Déploiement : Vercel (avec Cron jobs)

## Pages admin (protégées)
- `/admin` → Dashboard principal
- `/admin/commandes` → Gestion commandes
- `/admin/clients` → Liste clients
- `/admin/codes-promo` → Codes promo
- `/admin/newsletter` → Gestion newsletter
- `/admin/parrainage` → Programme parrainage
- `/admin/ugc` → Modération témoignages
- `/admin/emails` → Logs emails
- `/admin/parametres` → Paramètres

## Supabase tables
- `waitlist` — emails capturés
- `orders` — commandes Stripe
- `abandoned_carts` — paniers abandonnés
- `newsletter_subscribers` — abonnés newsletter
- `newsletter_queue` — newsletters générées
- `referrals` — codes parrainage
- `referral_uses` — utilisations parrainage
- `ugc_requests` — demandes témoignages
- `email_logs` — logs emails envoyés
- `settings` — paramètres admin
- `promo_codes` — codes promo mirror Stripe

## Automatisations en place

### Emails (Resend)
- Email confirmation commande
- Email milestone 50 atteints (Stripe webhook)
- Email expédition (manuel admin)
- Code parrainage après premier achat (Stripe webhook)

### Vercel Cron jobs
- Relance panier abandonné 1h
- Relance panier abandonné 24h
- Morning brief 8h30
- Newsletter auto toutes les 2 semaines
- Preview newsletter 24h avant envoi (admin)
- UGC request 30 jours après livraison

### Stripe webhooks
- Création commande
- Milestone 50 atteints
- Alerte stock
- Code parrainage après premier achat

## Variables d'environnement
Toutes dans Vercel — ne JAMAIS hardcoder.
Ne JAMAIS les afficher dans le code.
Ne JAMAIS les commiter dans le repo.

Variables existantes :
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_PRICE_ID`
- `STRIPE_WEBHOOK_SECRET`
- `RESEND_API_KEY`
- `ADMIN_PASSWORD`
- `MAINTENANCE_MODE`
- `PREVIEW_PASSWORD`
- `NEXT_PUBLIC_BASE_URL`
- `ANTHROPIC_API_KEY`

## Mode maintenance
Activable via `MAINTENANCE_MODE=true` dans Vercel.
Affiche la page `/maintenance` sur toutes les routes publiques.
