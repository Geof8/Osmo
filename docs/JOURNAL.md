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
