# Deploiement Vercel — OSMO Recovery

## Variables d'environnement a ajouter dans Vercel

Dans **Vercel Dashboard → Settings → Environment Variables**, ajouter :

| Variable | Scope | Description |
|----------|-------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Production, Preview, Development | URL projet Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Production, Preview, Development | Clef anonyme Supabase (client) |
| `SUPABASE_SERVICE_ROLE_KEY` | Production, Preview, Development | Clef service-role Supabase (server only, jamais expose au client) |
| `STRIPE_SECRET_KEY` | Production, Preview, Development | Clef secrete Stripe (`sk_test_…` ou `sk_live_…`) |
| `STRIPE_PRICE_ID` | Production, Preview, Development | Price ID du produit Stripe (`price_…`, pas `prod_…`) |
| `STRIPE_WEBHOOK_SECRET` | Production, Preview, Development | Signing secret du webhook Stripe (`whsec_…`) |
| `NEXT_PUBLIC_BASE_URL` | Production, Preview, Development | URL publique (`https://osmolab.fr` en prod) — utilise pour les `success_url`/`cancel_url` Stripe |

> Les valeurs Supabase sont les memes que dans `.env.local`.
> Les variables `STRIPE_*` et `SUPABASE_SERVICE_ROLE_KEY` doivent rester **server-only** (pas de prefixe `NEXT_PUBLIC_`).

## Checklist de deploiement

1. **Connecter le repo GitHub a Vercel**
   - Vercel Dashboard → New Project → Import Git Repository
   - Selectionner le repo `osmo-site`
   - Framework Preset : Next.js (detecte automatiquement)

2. **Ajouter les variables d'environnement** (cf. tableau ci-dessus)

3. **Deployer**
   - Cliquer Deploy — Vercel lance `npm run build` automatiquement

4. **Configurer le webhook Stripe** (apres le 1er deploiement)
   - Stripe Dashboard → Developers → Webhooks → Add endpoint
   - Endpoint URL : `https://osmolab.fr/api/stripe/webhook`
   - Events : `checkout.session.completed`
   - Copier le signing secret `whsec_…` → ajouter comme `STRIPE_WEBHOOK_SECRET` dans Vercel
   - Redeployer pour prendre en compte la nouvelle variable

5. **Verifier apres deploiement**
   - Ouvrir l'URL Vercel generee
   - Verifier que le site s'affiche correctement
   - Verifier que le compteur waitlist fonctionne (connexion Supabase)
   - Lancer un paiement test (carte `4242 4242 4242 4242`) et verifier la mise a jour dans Supabase

6. **Configurer le domaine custom (optionnel)**
   - Vercel Dashboard → Settings → Domains
   - Ajouter le domaine et configurer les DNS

## Migration SQL a executer dans Supabase

Dans **Supabase Dashboard → SQL Editor**, executer :

```sql
ALTER TABLE waitlist
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS stripe_session_id text,
  ADD COLUMN IF NOT EXISTS stripe_customer_id text,
  ADD COLUMN IF NOT EXISTS shipping_address jsonb,
  ADD COLUMN IF NOT EXISTS amount_paid_cents integer,
  ADD COLUMN IF NOT EXISTS paid_at timestamptz;

CREATE INDEX IF NOT EXISTS waitlist_stripe_session_id_idx ON waitlist(stripe_session_id);
CREATE INDEX IF NOT EXISTS waitlist_status_idx ON waitlist(status);
```

## Tests en local (Stripe CLI)

Pour tester le flow complet avant de pousser :

```bash
# Terminal 1 — dev server
npm run dev

# Terminal 2 — forward les webhooks Stripe vers ton localhost
stripe listen --forward-to localhost:3000/api/stripe/webhook
# → copie le `whsec_…` affiche dans .env.local comme STRIPE_WEBHOOK_SECRET
```

Carte test : `4242 4242 4242 4242` (date future, CVC `123`, code postal `75001`).

## Prochaines etapes

- [ ] Bascule mode live Stripe (re-creer le produit en live → nouveau Price ID)
- [ ] Email de confirmation transactionnel custom (Stripe envoie deja un recu par defaut)
- [ ] Page admin/dashboard des Early Adopters payes
- [ ] Politique de remboursement automatisee
