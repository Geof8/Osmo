# OSMO Recovery — Journal de bord

## Format de fin de session

```
### Session du [date]
**Fait:** liste courte
**En cours:** liste courte
**Bugs ouverts:** liste courte
**À faire:** liste courte
```

À la fin de chaque session, ajouter une nouvelle entrée en haut de la section "Historique" ci-dessous, puis push avec le reste du code.

---

## Historique

### Session du 2026-05-20 — Workflow commande end-to-end
**Fait :**
- Migration `0008_order_fulfillment.sql` :
  ajout `production_started_at`, `tracking_carrier`,
  `late_alert_sent_at`, `ugc_request_sent_at` sur `orders`.
- Lib partagée `lib/fulfillment.ts` : stage dérivé
  (`paid` → `in_production` → `shipped` → `delivered`)
  + helpers carrier/URL/ugc token.
- Admin `/commandes` : tabs filtrés par étape
  (Toutes / Payées / En production / Expédiées / Livrées)
  + badge couleur dédié pour chaque étape.
- Admin `/commandes/[id]` : nouveau `StatusChanger`
  remplace l'ancien `ShipForm`. Boutons « Passer à »
  + modal de confirmation. Pour « Expédié » : dropdown
  transporteur (Colissimo · Chronopost · DHL · Autre)
  + champ tracking. Lien tracking cliquable dans la fiche.
- API unifiée `POST /api/admin/orders/[id]/fulfillment` :
  valide la transition (forward-only), écrit les
  timestamps, déclenche l'email matching l'étape,
  loggue dans `email_logs`.
- 3 nouveaux templates Resend :
  - `OrderInProduction` (🔬 En production)
  - `OrderShipped` (📦 réécrit selon spec : carrier,
    tracking URL, rappel protocole, CTA suivi)
  - `OrderDelivered` (✅ + lien UGC + promo -20 %)
- Cron `GET /api/cron/check-delivery` toutes les 6h
  (`vercel.json`) :
  - polling Colissimo/Chronopost via api.laposte.fr
    (clé `LAPOSTE_API_KEY`) et DHL via api-eu.dhl.com
    (`DHL_API_KEY`),
  - auto-promotion en « Livré » + email + meta
    `ugc_followup_scheduled_for`,
  - alerte `contact@osmo-lab.fr` (override
    `ADMIN_ALERT_EMAIL`) si > 15 jours sans livraison
    confirmée — flag `late_alert_sent_at` pour éviter
    les doublons.
- Automation `ugc-request-d30` (daily) : envoie le
  rappel d'avis + promo 30 jours après livraison
  (flag `ugc_request_sent_at`).
- Page publique `/suivi` :
  - formulaire de lookup (commande + email),
  - composant `TrackingTimeline` : 4 étapes horizontal
    desktop / vertical mobile, pulse amber sur l'étape
    courante, ligne pleine quand complétée,
  - CTAs « Suivre mon colis » + « Donner mon avis ».
- `EmailType` étendu (`order_in_production`,
  `order_delivered`, `delivery_late_alert`) + page
  admin `/emails` mise à jour avec les nouveaux types.
- Suppression code mort : `ShipForm.tsx` et
  `/api/admin/orders/[id]/ship` (remplacés par
  `StatusChanger` + `/fulfillment`).
- Vérifié : `tsc --noEmit` propre, `/suivi` rendu
  testé dans le browser preview (lookup form +
  état not-found).

**En cours :**
- Page `/ugc/[token]` à créer (les emails et la
  timeline pointent déjà vers ce path, le token
  est `base64url(orderId)`).

**Bugs ouverts :**
- Les env vars `LAPOSTE_API_KEY` et `DHL_API_KEY`
  pas encore sur Vercel — le cron tournera mais
  retournera `not_configured` jusqu'à ce qu'elles
  soient ajoutées.
- L'alerte « livraison en retard » utilise
  `ADMIN_ALERT_EMAIL` ou par défaut
  `contact@osmo-lab.fr` — vérifier que cet email
  est routé.
- Pas de page `/ugc/[token]` encore : les liens
  dans les emails 404 jusqu'à sa création.

**À faire :**
- Créer `/ugc/[token]` : page de soumission
  témoignage + génération automatique du code promo
  -20 % à la validation.
- Ajouter `LAPOSTE_API_KEY` (Colissimo + Chronopost
  partagent l'API La Poste) et `DHL_API_KEY` sur
  Vercel quand on aura les comptes.
- Vérifier l'affichage de la timeline `/suivi` sur
  iPhone réel après expédition de la 1re commande.

---

### Session du 2026-05-20 — Restructuration CLAUDE.md
**Fait :**
- CLAUDE.md réduit à l'essentiel (≤80 lignes) pour
  accélérer la lecture en début de session
- Création de /docs/FRONT.md (frontend, design system,
  sections homepage)
- Création de /docs/BACK.md (Supabase, API, webhooks,
  cron Vercel, variables d'env)
- Création de /docs/PRODUCT.md (formule V29, protocole
  2 étapes, pricing, Early Adopters)
- Création de /docs/JOURNAL.md (historique des sessions)

**En cours :**
- (aucune tâche en cours)

**Bugs ouverts :**
- Titre hero "Lelendemainmatin" — espaces manquants
- Stats hero affichent 0 au lieu d'animer
- Footer/meta affichent osmolab.fr sans tiret
- Carousel hero — images pas encore uploadées
- HowItWorks reveal animations à vérifier en prod
- Formula : warnings d'hydratation float sur SVG lines
  (MolecularAnimation.tsx) — préexistant, non bloquant

**À faire :**
- Morning brief email (prompt prêt)
- Programme parrainage (prompt prêt)
- UGC automatisé (prompt prêt)
- CGV à refaire plus complètes
- Carousel hero — uploader les 3 images
- GIFs protocole — filmer et intégrer
- Responsive — vérifier sur iPhone réel
- Meta Pixel — après labo confirmé
- Page Facebook + Instagram Osmo

---

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

---

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
