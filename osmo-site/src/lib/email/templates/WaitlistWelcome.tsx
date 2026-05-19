import { EmailLayout, H1, P } from "./EmailLayout";

export function WaitlistWelcome() {
  return (
    <EmailLayout preheader="Tu es sur la liste pour le lancement d'OSMO Recovery.">
      <H1>Bienvenue chez OSMO 👋</H1>
      <P>Bonjour,</P>
      <P>
        Tu fais maintenant partie des premiers à être prévenus du lancement
        d&apos;<strong>OSMO Recovery</strong> — Lot N°001, édition fondateurs
        (50 places).
      </P>
      <P>On revient vers toi dès que tout est prêt.</P>
      <P>
        À très vite,
        <br />
        <strong>L&apos;équipe OSMO</strong>
      </P>
    </EmailLayout>
  );
}
