# OSMO Recovery — Frontend

## Stack technique
- Framework : Next.js 14 App Router
- Styling : Tailwind CSS
- Fonts : Fraunces (titres) + DM Sans (body)
- Animations : Framer Motion + GSAP
- Déploiement : Vercel
- Domaine : osmo-lab.fr

## Design system

### Couleurs
- Amber : #C8963E
- Black : #111111
- White : #FFFFFF
- Grey : #F4F4F4
- Dark grey : #666666

### Typographie
- Titres : Fraunces (weight 700-900)
- Body : DM Sans (weight 400-700)
- Toujours utiliser Fraunces pour les titres H1/H2/H3
- Toujours utiliser DM Sans pour le body

### Composants UI
- Boutons : pill shape (border-radius 50px)
- Cards : border-radius 12px

## Pages publiques
- `/` → Landing page principale
- `/notre-histoire` → Page histoire de la marque
- `/suivi` → Tracking commande client
- `/ugc/[token]` → Soumission témoignage UGC
- `/confirmation` → Page post-achat + upsell
- `/mentions-legales` → Mentions légales
- `/cgv` → Conditions générales de vente
- `/confidentialite` → Politique de confidentialité
- `/cookies` → Politique de cookies
- `/maintenance` → Page maintenance (si active)

## Sections homepage (ordre)
1. Barre d'annonce + Nav sticky
2. Split screen opening (GSAP)
3. Hero — carousel 3 images + texte
4. Pourquoi tu souffres (+ infographie)
5. Pourquoi OSMO (6 arguments)
6. Cinq actifs. Une équation. (sombre)
7. Le protocole OSMO — récupération en 2 étapes (cartes 01 LE SOIR / 02 LE MATIN / 03 LE RÉSULTAT)
8. Stats (90% · 18 mois · 5 actifs · 30 jours)
9. Avant les 50 Early Adopters
10. FAQ accordion
11. Newsletter signup
12. Dark CTA final
13. Footer + liens légaux

## Animations
- Split screen opening en GSAP
- Compteurs animés sur les Stats
- Framer Motion pour les transitions composants
- Carousel hero (3 images)

## Règles UI
- Langue : FRANÇAIS partout
- Border-radius : 50px sur tous les boutons CTA
- Border-radius : 12px sur les cards
