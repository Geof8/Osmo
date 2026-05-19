import { EmailLayout, H1, P } from "./EmailLayout";

export type GenericMessageProps = {
  preheader: string;
  title: string;
  greeting?: string;
  body: string[];
  signoff?: string;
};

export function GenericMessage({
  preheader,
  title,
  greeting,
  body,
  signoff = "L'équipe OSMO",
}: GenericMessageProps) {
  return (
    <EmailLayout preheader={preheader}>
      <H1>{title}</H1>
      {greeting && <P>{greeting}</P>}
      {body.map((paragraph, i) => (
        <P key={i}>{paragraph}</P>
      ))}
      <P>— {signoff}</P>
    </EmailLayout>
  );
}
