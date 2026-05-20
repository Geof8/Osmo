# OSMO Recovery — Contexte projet Claude Code

## Le projet
Marque D2C de compléments alimentaires électrolytes.
Fondateur : Geoffrey Debrion
Site live : https://osmo-lab.fr
Repo : https://github.com/Geof8/Osmo.git
Stack : Next.js 14 + Tailwind + Supabase + 
  Stripe + Resend + Framer Motion + GSAP

## URLs importantes
- Site live : https://osmo-lab.fr
- Admin : https://osmo-lab.fr/admin
- GitHub : https://github.com/Geof8/Osmo.git
- Supabase : dashboard.supabase.com
- Stripe : dashboard.stripe.com
- Vercel : vercel.com/dashboard
- Resend : resend.com/dashboard

## Stack technique
- Framework : Next.js 14 App Router
- Styling : Tailwind CSS
- Fonts : Fraunces (titres) + DM Sans (body)
- Animations : Framer Motion + GSAP
- Base de données : Supabase
- Paiement : Stripe (mode TEST actuellement)
- Emails : Resend
- Déploiement : Vercel
- Domaine : osmo-lab.fr

## Le produit
OSMO Recovery — poudre électrolytes goût citron
- 120g · 15 doses · 8g/dose
- Prix Early Adopters (Lot N°001) : 20€
- Prix public : 30€
- 50 places affichées · 250 réelles
- Compteur : -1 affiché toutes les 5 vraies ventes
- Expédition : 6 mois maximum

## Formule V29
1. N-Acétyl-Cystéine (NAC) 600mg
2. Bisglycinate de magnésium 1350mg
3. Citrate de potassium 2000mg
4. Bicarbonate de sodium 1700mg
5. Chlorure de sodium 150mg
6. Aromatisant citron

## Design system
Couleurs :
- Amber : #C8963E
- Black : #111111
- White : #FFFFFF
- Grey : #F4F4F4
- Dark grey : #666666

Typographie :
- Titres : Fraunces (weight 700-900)
- Body : DM Sans (weight 400-700)
- Boutons : pill shape (border-radius 50px)
- Cards : border-radius 12px

## Architecture du site
Pages publiques :
- / → Landing page principale
- /notre-histoire → Page histoire de la marque
- /suivi → Tracking commande client
- /ugc/[token] → Soumission témoignage UGC
- /confirmation → Page post-achat + upsell
- /mentions-legales → Mentions légales
- /cgv → Conditions générales de vente
- /confidentialite → Politique de confidentialité
- /cookies → Politique de cookies
- /maintenance → Page maintenance (si active)

Pages admin (protégées) :
- /admin → Dashboard principal
- /admin/commandes → Gestion commandes
- /admin/clients → Liste clients
- /admin/codes-promo → Codes promo
- /admin/newsletter → Gestion newsletter
- /admin/parrainage → Programme parrainage
- /admin/ugc → Modération témoignages
- /admin/emails → Logs emails
- /admin/parametres → Paramètres

## Sections homepage (ordre)
1. Barre d'annonce + Nav sticky
2. Split screen opening (GSAP)
3. Hero — carousel 3 images + texte
4. Pourquoi tu souffres (+ infographie)
5. Pourquoi OSMO (6 arguments)
6. Cinq actifs. Une équation. (sombre)
7. Le protocole. Le soir. Pas le matin.
8. Stats (90% · 18 mois · 5 actifs · 30 jours)
9. Avant les 50 Early Adopters
10. FAQ accordion
11. Newsletter signup
12. Dark CTA final
13. Footer + liens légaux

## Automatisations en place
- Email confirmation commande (Resend)
- Relance panier abandonné 1h (Vercel Cron)
- Relance panier abandonné 24h (Vercel Cron)
- Email milestone 50 atteints (Stripe webhook)
- Email expédition (manuel admin)
- Morning brief 8h30 (Vercel Cron)
- Newsletter auto toutes les 2 semaines (Vercel Cron)
- Preview newsletter 24h avant envoi (admin)
- UGC request 30 jours après livraison (Vercel Cron)
- Alerte stock (Stripe webhook)
- Code parrainage après premier achat (Stripe webhook)

## Supabase tables
- waitlist (emails capturés)
- orders (commandes Stripe)
- abandoned_carts (paniers abandonnés)
- newsletter_subscribers (abonnés newsletter)
- newsletter_queue (newsletters générées)
- referrals (codes parrainage)
- referral_uses (utilisations parrainage)
- ugc_requests (demandes témoignages)
- email_logs (logs emails envoyés)
- settings (paramètres admin)
- promo_codes (codes promo mirror Stripe)

## Variables d'environnement
Toutes dans Vercel — ne JAMAIS hardcoder.
Ne JAMAIS les afficher dans le code.
Ne JAMAIS les commiter dans le repo.

Variables existantes :
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
- NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
- STRIPE_SECRET_KEY
- STRIPE_PRICE_ID
- STRIPE_WEBHOOK_SECRET
- RESEND_API_KEY
- ADMIN_PASSWORD
- MAINTENANCE_MODE
- PREVIEW_PASSWORD
- NEXT_PUBLIC_BASE_URL
- ANTHROPIC_API_KEY

## Règles importantes
1. Langue du site : FRANÇAIS partout
2. Ne jamais modifier les variables d'environnement
3. Toujours pusher sur GitHub en fin de session
4. Toujours mettre à jour le Journal de bord ci-dessous
5. Stripe est en mode TEST — ne pas passer en live
6. La page maintenance est active (MAINTENANCE_MODE=true)
7. Tester sur osmo-lab.fr après chaque push
8. Border-radius: 50px sur tous les boutons CTA
9. Toujours utiliser Fraunces pour les titres H1/H2/H3
10. Toujours utiliser DM Sans pour le body

## Journal de bord

### Session du 20/05/2026 — Pivot protocole 2 étapes
**Fait :**
- Section protocole (HowItWorks) refondue : cartes
  01 LE SOIR / 02 LE MATIN / 03 LE RÉSULTAT.
  Titre "Le protocole OSMO." + sous-titre
  "Pas juste un électrolyte. Un protocole de
  récupération en 2 étapes."
- Hero subline — "À prendre le soir. Pas le matin."
  remplacé par "Protocole de récupération en 2 étapes
  · Soir + Matin", emphase changée à
  "pendant le sommeil et au réveil".
- AnnouncementBar — ajout
  "PROTOCOLE 2 ÉTAPES · SOIR + MATIN"
  (mobile + desktop).
- Marquee (MARQUEE_ITEMS) — ajout du même item.
- FAQ — remplacement de "Pourquoi le soir et pas
  le matin ?" par "Comment utiliser OSMO Recovery ?"
  avec le protocole détaillé en 2 doses. Item 1 mis
  à jour pour retirer "conçu pour être pris le soir".
- /notre-histoire — pas de copie "soir uniquement"
  présente, aucun changement nécessaire.

**Non touché (volontairement) :** dosages, quantité
par pot (15 doses), prix, autres sections.

**Bugs identifiés pendant la session :**
- HowItWorks section : reveal animations gated par
  IntersectionObserver — vérifier en réel sur prod
  que les cartes apparaissent bien au scroll après
  le splash GSAP.
- Formula : warnings d'hydratation float sur les
  SVG lines (MolecularAnimation.tsx) — préexistant,
  non bloquant.

### Session du 19/05/2026
**Fait :**
- Site déployé sur osmo-lab.fr
- Stripe configuré en mode test
- Resend configuré + domaine vérifié
- Back-office /admin en cours de build
- Page maintenance créée
- Newsletter system créé
- CGV + Mentions légales créées (à améliorer)
- Refonte back-office style Shopify lancée

**En cours :**
- Back-office refonte style Shopify
- Fix bugs front (titre hero collé, 
  compteurs à zéro, domaine osmolab.fr)
- Responsive mobile

**Bugs ouverts :**
- Titre hero "Lelendemainmatin" — espaces manquants
- Stats hero affichent 0 au lieu d'animer
- Footer/meta affichent osmolab.fr sans tiret
- Carousel hero — images pas encore uploadées

**À faire (prochaines sessions) :**
- Morning brief email (prompt prêt)
- Programme parrainage (prompt prêt)
- UGC automatisé (prompt prêt)
- CGV à refaire plus complètes
- Carousel hero — uploader les 3 images
- GIFs protocole — filmer et intégrer
- Responsive — vérifier sur iPhone réel
- Meta Pixel — après labo confirmé
- Page Facebook + Instagram Osmo

## Instructions fin de session
À la fin de chaque session, mettre à jour 
ce fichier avec :
1. Date de la session
2. Ce qui a été fait
3. Ce qui est en cours
4. Les bugs ouverts ou nouveaux
5. Ce qui reste à faire

Push CLAUDE.md avec le reste du code.
