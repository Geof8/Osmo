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

### Session du 2026-05-21 (3) — ClinicalStudy : retour au sombre + photo de fond cristaux NAC
**Fait :**
- Geoffrey a fourni une vraie photo (cristaux NAC macro sur fond blanc) → copiée dans [osmo-site/public/images/study-background.png](osmo-site/public/images/study-background.png) (1.29 MB, 1114×627).
- Retour à la version full-bleed sombre 100vh (la variante claire à la Kosbiotic est abandonnée car incompatible avec la photo fournie qui est très claire et a besoin d'un overlay sombre pour mettre la carte en valeur).
- Photo servie via `next/image` `fill` + `priority` + `sizes="100vw"` + `objectFit:cover` + `objectPosition:center`, wrappée dans la `motion.div` qui anime le scale 1.05→1.
- Overlay sombre : `linear-gradient(135deg, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.50) 100%)` en `position:absolute inset-0 zIndex:1`.
- Carte glassmorphique restaurée : `backdrop-filter: blur(12px)`, bg `rgba(255,255,255,0.06)`, border `rgba(255,255,255,0.12)`, radius 20px, padding clamp 32→48px, max 560px, ancrée bottom-center mobile / center-left desktop, en `zIndex:2`.
- Contenu : eyebrow ambre "DONNÉES CLINIQUES", **titre adouci** "L'étude clinique sur la NAC détaillée" (le mot "urgentistes" reste écarté), body NAC/OMS/glutathion en 2 paragraphes, 3 stats ambre (OMS · +GSH · 40 ans), CTA pilule transparent avec border 50px, disclaimer source.

**Vérifié via preview MCP :**
- Desktop 1280×720 : section 1280×720, bg `#0A0A0A`, image chargée (`complete:true`, natW 1114), overlay `linear-gradient(135deg, rgba(0,0,0,0.8), rgba(0,0,0,0.5))` à z-index 1, carte glassmorphique à z-index 2 (backdrop-blur 12px, bg rgba(255,255,255,0.06), border ok, radius 20px, padding 48px, max 560px).
- Mobile 375×812 : section 375×812, carte 327px à x=24, padding 32px.
- Aucune requête réseau en échec.

---

### Session du 2026-05-21 (suite) — Refonte ClinicalStudy à la Kosbiotic (titre adouci) [remplacée]
**Fait :**
- Refonte complète du visuel sur photo de référence Kosbiotic envoyée par Geoffrey.
- Fond passé de sombre `#0A0A0A` à clair `#F4F4F4` ; zone hero arrondie (radius 20px) avec gradient gris radial + grain subtil pour évoquer la photo macro (placeholder en attendant l'upload d'une vraie photo).
- Carte passée de glassmorphique sombre à **blanche pleine** (bg `#FFFFFF`, radius 20px, padding clamp 28→48px, max-width 560px), ancrée top-left.
- Titre adouci : suppression du mot "urgentistes" qui évoquait l'urgence/stress. Nouveau titre Fraunces 28→44px : **"L'étude clinique sur la NAC détaillée"** (calque de la sobriété du titre Kosbiotic "L'étude clinique in vivo détaillée").
- Body court (2 paragraphes, gris foncé `#444`) avec mise en gras des termes-clés (NAC, OSMO Recovery).
- Stats réduites à **2 colonnes** (au lieu de 3) avec valeurs en **très gros noir** (clamp 36→56px, `#111`) et labels gris `#666`. OMS / 40 ans (suppression de +GSH).
- CTA minimal noir : transparent + border `#111`, texte `#111`, radius 50px (règle CTA OSMO conservée), hover invert (bg noir / texte blanc). Texte raccourci : "Voir l'étude clinique".
- Disclaimer supprimé pour épurer comme Kosbiotic.
- Animations Framer Motion conservées (bg scale 1.05→1, carte fade-up, stats stagger).

**Vérifié via preview MCP (1280×720 + 375×812) :**
- Section bg `rgb(244,244,244)`, carte 560×blanc à x=88.
- H2 44px desktop / 28px mobile, couleur `#111`.
- Stats : 56px desktop / 36px mobile, couleur `#111`.
- CTA : radius 50px, border `#111`, bg transparent.
- Mobile : carte 279px à x=48, padding 28px.

**Pourquoi ce changement :**
- Geoffrey a signalé que "urgentistes" donnait un côté stressant. Référence Kosbiotic envoyée pour le ton serein/factuel à reproduire ("ni plus ni moins").

---

### Session du 2026-05-21 — Section clinique NAC plein écran (full-bleed) [remplacée]
**Fait :**
- Nouvelle section `ClinicalStudy` ([osmo-site/src/components/sections/ClinicalStudy.tsx](osmo-site/src/components/sections/ClinicalStudy.tsx)) insérée entre `SocialProof` et `PourquoiOsmo`.
- Layout full-bleed (`width:100vw` + `margin-left:calc(50% - 50vw)`), hauteur `100vh` (min 640px), fond `#0A0A0A` + grain SVG turbulence (filtre noise data-URI), overlay `linear-gradient(135deg, rgba(0,0,0,.85), rgba(0,0,0,.6))`.
- Carte glassmorphique (`backdrop-filter: blur(12px)`, bordure `rgba(255,255,255,0.12)`, `border-radius:20px`, padding clamp 32→48px, max 560px) ancrée bottom-center mobile / center-left desktop.
- Contenu : eyebrow ambre "DONNÉES CLINIQUES", headline Fraunces "L'actif que les urgentistes utilisent depuis 40 ans.", body en 2 paragraphes sur la NAC (OMS, glutathion, détox hépatique pendant le sommeil).
- Stats row 3 colonnes (OMS / +GSH / 40 ans) avec valeurs `#C8963E` et labels `#999999`.
- CTA pilule (border-radius 50px conforme à la règle absolue) vers l'étude [Revue Médicale Suisse 2018](https://www.revmed.ch/view/423640/3672706/RMS_590_146.pdf) en `target="_blank" rel="noopener noreferrer"`, hover transparent → blanc/0.1.
- Disclaimer source en bas de carte.
- Animations Framer Motion : background scale 1.05→1 sur 1.5s, carte fade-up délai 0.3s, stats stagger 0.1s, `once: true`.
- Mobile : carte pleine largeur (375 → 327px à 24px de marge), grille stats compactée (valeur 20px / label 11px), H2 clamp 24px.

**Vérifié via preview MCP (1280×720 + 375×812) :**
- `[aria-label*="Données cliniques"]` → section 1280×720, bg `rgb(10,10,10)`.
- Carte : `border-radius:20px`, `backdrop-filter: blur(12px)`, padding 48px, max-width 560px.
- CTA : `border-radius:50px`, border `rgba(255,255,255,0.3)`, `target=_blank`.
- Eyebrow + stats : couleur `rgb(200,150,62)` (#C8963E) ✓
- Mobile 375 : carte 327px à x=24, stats 20px/11px, h2 24px.

**Note image de fond :**
- Spec demandait "la photo lifestyle sombre du pot OSMO déjà dans /public/images/" — aucun fichier sombre disponible (seul `infographic.png/svg` existe). Fallback spec activé : fond solide `#0A0A0A` + grain SVG (turbulence fractalNoise teintée ambre légère 6%).

**À faire / améliorations possibles :**
- Uploader une vraie photo lifestyle sombre du pot OSMO dans `/public/images/` puis remplacer le fond solide par un `<Image>` next/image avec `objectFit:cover, objectPosition:center`.

**Bugs ouverts inchangés :** hydration warning MolecularAnimation · carousel hero images · pot 15 doses vs 2 prises/jour · `/ugc/[token]` · `LAPOSTE_API_KEY` + `DHL_API_KEY`.

---

### Session du 2026-05-20 — Newsletter admin : compte live + sans cache
**Fait :**
- `/admin/newsletter` : compte d'abonnés actifs maintenant
  toujours frais (`unstable_noStore` + `force-dynamic` +
  `revalidate = 0` + `Cache-Control: no-store` sur l'API).
- Nouvelle route `GET /api/admin/newsletter/subscribers/count`
  (auth admin requise) renvoie `{ active, total }`.
- Hook `useLiveActiveSubscribers` partagé entre le header,
  les KpiCards et le bouton "Envoyer à tous" → un seul compte
  source de vérité, synchronisé partout.
- Trois mécanismes de refresh redondants :
  - Supabase Realtime sur `newsletter_subscribers`
    (instantané quand la publication est configurée).
  - Polling toutes les 15 s (filet de sécurité).
  - Refresh au focus / visibilitychange (admin revient sur l'onglet).
- Migration `0009_newsletter_realtime.sql` : ajoute la table
  à la publication `supabase_realtime` et passe
  `replica identity full` (sinon `payload.old.active` est null
  et on ne peut pas suivre les désabonnements en live).

**À appliquer côté Supabase :**
- Exécuter `0009_newsletter_realtime.sql` dans le SQL editor
  (sinon le live update ne fonctionne pas, mais le polling
  prend le relais).

**Bugs ouverts :**
- À vérifier sur osmo-lab.fr/admin/newsletter après déploiement
  Vercel : ouvrir l'onglet, s'inscrire depuis une autre fenêtre,
  le compte doit passer en live (ou max 15 s plus tard via polling).

### Session du 2026-05-20 — Refonte design system premium
**Fait :**
- Amber #C8963E restreint à 3 usages :
  CTA principal "Devenir Early Adopter", key numbers
  (5 · 15 · 20€ · 50), active dots des carousels mobiles.
- Autres usages amber remplacés :
  borders → #E8E8E8, text accents → #111111 bold/italic,
  badges "★ Clé" et tags ingrédients → noir/blanc,
  FAQ active → #111111, callout ClosingCTA → bordure blanche,
  arrows ingrédients → blanc, MolecularAnimation pictos → blanc.
- Typographie : H3 700 → 500, body 17px → 16px / #444444,
  eyebrows (LA FORMULE, LE PROTOCOLE) → #999999 weight 400
  letter-spacing 0.15em, labels 12px 0.08em.
- Spacing : section padding 80px → 100px, gap cards 16px → 24px,
  card padding 24px → 32px.
- Cards : nouvelle classe `.osmo-card` (white, 1px solid #E8E8E8,
  radius 16px, shadow 0 2px 12px rgba(0,0,0,0.04), hover shadow
  0 8px 24px rgba(0,0,0,0.08) + border #CCCCCC).
- Boutons secondaires : nouvelle classe `.cta-pill-ghost`
  (outline #111111, hover bg noir + texte blanc).
- Navbar : drop dot retirée à côté du wordmark "Osmo",
  nav link Notre Histoire → #444444 hover #111111.
- Footer : background #F4F4F4, drop dot retirée,
  hover links #111111, bullets/underlines amber neutralisés.
- AnnouncementBar : weight 400, letter-spacing 0.15em.
- Accordion FAQ : border ouvert #111111, icons toujours noires.
- NewsletterSignup : bouton secondaire blanc plein.
- SideCart : erreurs amber → #D14D4D, borders → #E8E8E8.
- CookieBanner : bouton Accepter passé en blanc plein.
- Notre Histoire : "29 versions" #111111, intro italique #444444,
  closing line WordByWord #111111 bold.
- Tailwind config : osmo.border #E0E0E0 → #E8E8E8,
  osmo.muted #666 → #444, ajout osmo.subtle #999.
- Globals.css : --ink-2 #555 → #444, --rule/--soft → #E8E8E8,
  --ring → ink, --radius-card → 16px, focus-ring → ink.
- Appliqué par-dessus l'adoucissement protocole de la session
  précédente : HowItWorks conserve "01 Préparation / 02 Dilution
  / 03 Dégustation" et le sous-titre "Trois gestes simples…",
  réharmonisés sous le nouveau design system.

**En cours :**
- Aucun travail en cours.

**Bugs ouverts (préexistants) :**
- Hydration warning React sur MolecularAnimation
  (différence floating-point SSR/client : 88.19660112501052 vs ...49).
- Carousel hero — images pas encore uploadées.

**À faire :**
- Validation visuelle complète sur osmo-lab.fr après deploy
  (preview Vercel limité par l'animation SplitOverlay).

### Session du 2026-05-20 — Adoucissement protocole (3 gestes)
**Fait :**
- Section protocole repensée en 3 gestes de
  préparation : 01 PRÉPARATION (Versez la dose) /
  02 DILUTION (Ajoutez 250ml d'eau) /
  03 DÉGUSTATION (Mélangez et dégustez).
  Plus de "Dose 1 / Dose 2", plus de "à jeun",
  plus de "lendemain matin" dans les cartes.
- Sous-titre section : "Trois gestes simples.
  À prendre deux fois par jour, dont une prise
  le soir avant de dormir."
- Hero subline : "Protocole de récupération en
  2 étapes" → "Protocole quotidien".
- Bandeau + Marquee : "PROTOCOLE 2 ÉTAPES" →
  "PROTOCOLE QUOTIDIEN".
- FAQ "Comment utiliser OSMO Recovery ?" réécrite
  sans "à jeun", sans "dernière boisson",
  avec "idéalement accompagné d'un repas".
- docs/PRODUCT.md mis à jour pour refléter le
  nouveau ton suggestif (lire entre les lignes).
- Les 3 cartes sont minimalistes pour permettre
  l'ajout futur de 3 GIFs animés (versement dose,
  versement eau, mélange).

**À arbitrer :**
- Le pot 15 doses ne tient que 7,5 jours à 2 prises/jour.
  Soit augmenter à 30 doses, soit repositionner comme
  cure ponctuelle.

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
