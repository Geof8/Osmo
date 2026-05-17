# Deploiement Vercel — OSMO Recovery

## Variables d'environnement a ajouter dans Vercel

Dans **Vercel Dashboard → Settings → Environment Variables**, ajouter :

| Variable | Environnement |
|----------|---------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Production, Preview, Development |

Les valeurs sont les memes que dans `.env.local`.

## Checklist de deploiement

1. **Connecter le repo GitHub a Vercel**
   - Vercel Dashboard → New Project → Import Git Repository
   - Selectionner le repo `osmo-site`
   - Framework Preset : Next.js (detecte automatiquement)

2. **Ajouter les variables d'environnement**
   - Coller les 2 variables listees ci-dessus avec leurs valeurs

3. **Deployer**
   - Cliquer Deploy — Vercel lance `npm run build` automatiquement

4. **Verifier apres deploiement**
   - Ouvrir l'URL Vercel generee
   - Verifier que le site s'affiche correctement
   - Verifier que le compteur waitlist fonctionne (connexion Supabase)

5. **Configurer le domaine custom (optionnel)**
   - Vercel Dashboard → Settings → Domains
   - Ajouter le domaine et configurer les DNS

## Prochaines etapes apres deploiement

- [ ] Creer la route API `/api/waitlist` pour permettre les inscriptions
- [ ] Integrer Stripe pour le panier (remplacer le placeholder actuel)
- [ ] Configurer les RLS (Row Level Security) sur la table `waitlist` dans Supabase
- [ ] Ajouter `SUPABASE_SERVICE_ROLE_KEY` si necessaire pour les operations serveur
