import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "@/lib/toast";

import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { SpamGuardFields } from "@/components/site/SpamGuardFields";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { services, site } from "@/data/site";
import { useAntiSpam } from "@/hooks/use-anti-spam";
import { useI18n } from "@/i18n";

const title = "Contact IRONPEAK — Gym in Colombo 04, Sri Lanka";
const description =
  "Visit IRONPEAK at 182 Duplication Road, Colombo 04. Call +94 76 123 4567, message us on WhatsApp, or send an enquiry — we reply within one working hour.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

type FieldKey = "name" | "email" | "phone" | "message" | "consent" | "captcha";

function Page() {
  const { t } = useI18n();
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const guard = useAntiSpam("contact");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const next: Partial<Record<FieldKey, string>> = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name) next.name = t.form.required;
    if (name.length > 100) next.name = t.form.tooLong;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255)
      next.email = t.form.invalidEmail;
    if (!/^(\+94|0)\d{9}$/.test(phone.replace(/[\s-]/g, ""))) next.phone = t.form.invalidPhone;
    if (message.length < 10) next.message = t.form.tooShort;
    if (message.length > 1000) next.message = t.form.tooLong;
    if (!consent) next.consent = t.form.consentRequired;

    if (Object.keys(next).length > 0) {
      setErrors(next);
      return;
    }

    const check = guard.verify();
    if (!check.ok) {
      if (check.reason === "captcha") {
        setErrors({ captcha: t.form.captchaWrong });
      } else {
        setErrors({});
        toast.error(
          check.reason === "bot"
            ? t.form.botDetected
            : check.reason === "tooFast"
              ? t.form.tooFast
              : t.form.throttled.replace("{{s}}", String(check.retryInSeconds)),
        );
      }
      return;
    }

    setErrors({});
    form.reset();
    setConsent(false);
    guard.reset();
    toast.success(t.contact.success);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow={t.nav.contact}
        title={t.contact.title}
        subtitle={t.contact.subtitle}
        level={1}
      />

      <div className="mt-14 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <Reveal className="rounded-2xl border border-border bg-card p-7">
          <h2 className="text-2xl uppercase">{t.contact.formTitle}</h2>
          <form onSubmit={onSubmit} noValidate className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="name">{t.contact.name}</Label>
              <Input id="name" name="name" className="mt-2" aria-invalid={!!errors.name} />
              {errors.name ? <p className="mt-1 text-xs text-destructive">{errors.name}</p> : null}
            </div>
            <div>
              <Label htmlFor="email">{t.contact.email}</Label>
              <Input
                id="email"
                name="email"
                type="email"
                className="mt-2"
                aria-invalid={!!errors.email}
              />
              {errors.email ? (
                <p className="mt-1 text-xs text-destructive">{errors.email}</p>
              ) : null}
            </div>
            <div>
              <Label htmlFor="phone">{t.contact.phone}</Label>
              <Input
                id="phone"
                name="phone"
                className="mt-2"
                placeholder="+94 7X XXX XXXX"
                aria-invalid={!!errors.phone}
              />
              {errors.phone ? (
                <p className="mt-1 text-xs text-destructive">{errors.phone}</p>
              ) : null}
            </div>
            <div>
              <Label htmlFor="interest">{t.contact.interest}</Label>
              <select
                id="interest"
                name="interest"
                className="mt-2 h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm"
              >
                {services.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="message">{t.contact.message}</Label>
              <Textarea
                id="message"
                name="message"
                rows={5}
                className="mt-2"
                aria-invalid={!!errors.message}
              />
              {errors.message ? (
                <p className="mt-1 text-xs text-destructive">{errors.message}</p>
              ) : null}
            </div>
            <SpamGuardFields
              id="contact"
              className="relative sm:col-span-2"
              challenge={guard.challenge}
              captchaAnswer={guard.captchaAnswer}
              onCaptchaChange={guard.setCaptchaAnswer}
              honeypot={guard.honeypot}
              onHoneypotChange={guard.setHoneypot}
              error={errors.captcha}
            />
            <div className="sm:col-span-2 flex items-start gap-3">
              <Checkbox
                id="consent"
                checked={consent}
                onCheckedChange={(v) => setConsent(v === true)}
              />
              <Label htmlFor="consent" className="text-sm leading-relaxed text-muted-foreground">
                {t.contact.consent}
              </Label>
            </div>
            {errors.consent ? (
              <p className="sm:col-span-2 text-xs text-destructive">{errors.consent}</p>
            ) : null}
            <button
              type="submit"
              className="sm:col-span-2 justify-self-start rounded-full ember-bg px-7 py-3.5 text-xs font-bold tracking-[0.16em] uppercase text-primary-foreground shadow-ember"
            >
              {t.cta.send}
            </button>
          </form>
        </Reveal>

        <div className="space-y-6">
          <Reveal className="rounded-2xl border border-border bg-card p-7">
            <h2 className="text-xl uppercase">{t.contact.addressTitle}</h2>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                <span>{site.address}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                <a href={`tel:${site.phone}`} className="hover:text-primary">
                  {site.phoneDisplay}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                <a href={`mailto:${site.email}`} className="hover:text-primary">
                  {site.email}
                </a>
              </li>
            </ul>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${site.mapQuery}`}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-block rounded-full border border-border px-6 py-3 text-xs font-bold tracking-[0.16em] uppercase transition-colors hover:border-primary hover:text-primary"
            >
              {t.cta.directions}
            </a>
          </Reveal>

          <Reveal delay={0.06} className="rounded-2xl border border-border bg-card p-7">
            <h2 className="flex items-center gap-2 text-xl uppercase">
              <Clock className="size-4 text-primary" aria-hidden />
              {t.contact.hoursTitle}
            </h2>
            <dl className="mt-5 space-y-2 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">{t.contact.weekdays}</dt>
                <dd>{site.hours.weekdays}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">{t.contact.saturday}</dt>
                <dd>{site.hours.saturday}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">{t.contact.sunday}</dt>
                <dd>{site.hours.sunday}</dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={0.12} className="overflow-hidden rounded-2xl border border-border">
            <iframe
              title="IRONPEAK location map"
              src={`https://www.google.com/maps?q=${site.mapQuery}&output=embed`}
              loading="lazy"
              className="h-64 w-full"
            />
          </Reveal>
        </div>
      </div>
    </div>
  );
}
