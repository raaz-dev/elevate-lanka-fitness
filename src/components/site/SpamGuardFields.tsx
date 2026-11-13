import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useI18n } from "@/i18n";

type Props = {
  id: string;
  challenge: { a: number; b: number };
  captchaAnswer: string;
  onCaptchaChange: (value: string) => void;
  honeypot: string;
  onHoneypotChange: (value: string) => void;
  error?: string | undefined;
  className?: string;
};

export function SpamGuardFields({
  id,
  challenge,
  captchaAnswer,
  onCaptchaChange,
  honeypot,
  onHoneypotChange,
  error,
  className,
}: Props) {
  const { t } = useI18n();
  const question = t.form.captcha
    .replace("{{a}}", String(challenge.a))
    .replace("{{b}}", String(challenge.b));

  return (
    <div className={className}>
      {/* Honeypot — hidden from humans, irresistible to naive bots. */}
      <div aria-hidden className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0">
        <label htmlFor={`${id}-company-url`}>Company website</label>
        <input
          id={`${id}-company-url`}
          name="company_url"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => onHoneypotChange(e.target.value)}
        />
      </div>

      <Label htmlFor={`${id}-captcha`}>{question}</Label>
      <Input
        id={`${id}-captcha`}
        name="captcha"
        inputMode="numeric"
        autoComplete="off"
        className="mt-2 max-w-40"
        value={captchaAnswer}
        onChange={(e) => onCaptchaChange(e.target.value)}
        aria-invalid={!!error}
      />
      {error ? <p className="mt-1 text-xs text-destructive">{error}</p> : null}
    </div>
  );
}
