import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "@/lib/toast";

import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { SpamGuardFields } from "@/components/site/SpamGuardFields";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trainers } from "@/data/site";
import { useAntiSpam } from "@/hooks/use-anti-spam";
import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";

const title = "Book a Free Trial or PT Session — IRONPEAK Colombo";
const description =
  "Reserve a free trial session, personal training slot or group class at IRONPEAK Colombo. Pick your date, time and coach in under a minute.";

export const Route = createFileRoute("/booking")({
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

const times = ["6:00 AM", "7:30 AM", "10:00 AM", "12:30 PM", "4:00 PM", "6:00 PM", "7:30 PM"];
type SessionType = "trial" | "pt" | "classSession";

function Page() {
  const { t } = useI18n();
  const [type, setType] = useState<SessionType>("trial");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [trainer, setTrainer] = useState("any");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<
    Partial<Record<"name" | "phone" | "date" | "time" | "captcha", string>>
  >({});
  const [done, setDone] = useState(false);
  const guard = useAntiSpam("booking");

  const today = new Date().toISOString().slice(0, 10);

  function confirm() {
    const next: Partial<Record<"name" | "phone" | "date" | "time" | "captcha", string>> = {};
    if (!name.trim()) next.name = t.form.required;
    if (name.trim().length > 100) next.name = t.form.tooLong;
    if (!/^(\+94|0)\d{9}$/.test(phone.replace(/[\s-]/g, ""))) next.phone = t.form.invalidPhone;
    if (!date) next.date = t.form.required;
    if (!time) next.time = t.form.selectOption;
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
    setDone(true);
  }

  if (done) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-32 text-center sm:px-6">
        <p className="eyebrow">{t.nav.contact}</p>
        <h1 className="mt-4 text-4xl uppercase sm:text-5xl">{t.booking.confirmed}</h1>
        <p className="mt-5 text-base leading-relaxed text-muted-foreground">
          {t.booking.confirmedBody}
        </p>
        <dl className="mt-8 rounded-2xl border border-border bg-card p-6 text-left text-sm">
          <div className="flex justify-between border-b border-border pb-2">
            <dt className="text-muted-foreground">{t.booking.type}</dt>
            <dd>{t.booking.types[type]}</dd>
          </div>
          <div className="flex justify-between border-b border-border py-2">
            <dt className="text-muted-foreground">{t.booking.date}</dt>
            <dd>{date}</dd>
          </div>
          <div className="flex justify-between border-b border-border py-2">
            <dt className="text-muted-foreground">{t.booking.time}</dt>
            <dd>{time}</dd>
          </div>
          <div className="flex justify-between pt-2">
            <dt className="text-muted-foreground">{t.booking.trainer}</dt>
            <dd>{trainer === "any" ? t.booking.anyTrainer : trainer}</dd>
          </div>
        </dl>
        <button
          type="button"
          onClick={() => {
            setDone(false);
            setDate("");
            setTime("");
            guard.reset();
          }}
          className="mt-8 rounded-full border border-border px-7 py-3.5 text-xs font-bold tracking-[0.16em] uppercase transition-colors hover:border-primary hover:text-primary"
        >
          {t.booking.another}
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow={t.cta.bookTrial}
        title={t.booking.title}
        subtitle={t.booking.subtitle}
        level={1}
      />

      <div className="mt-14 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
        <Reveal className="space-y-8 rounded-2xl border border-border bg-card p-7">
          <div>
            <p className="mb-3 text-[0.68rem] font-bold tracking-[0.18em] uppercase text-muted-foreground">
              {t.booking.type}
            </p>
            <div className="flex flex-wrap gap-2">
              {(["trial", "pt", "classSession"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setType(s)}
                  className={cn(
                    "rounded-full border px-5 py-2 text-xs font-bold tracking-[0.14em] uppercase transition-colors",
                    type === s
                      ? "border-primary text-primary"
                      : "border-border text-muted-foreground hover:text-foreground",
                  )}
                >
                  {t.booking.types[s]}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="bname">{t.contact.name}</Label>
              <Input
                id="bname"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2"
              />
              {errors.name ? <p className="mt-1 text-xs text-destructive">{errors.name}</p> : null}
            </div>
            <div>
              <Label htmlFor="bphone">{t.contact.phone}</Label>
              <Input
                id="bphone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-2"
                placeholder="+94 7X XXX XXXX"
              />
              {errors.phone ? (
                <p className="mt-1 text-xs text-destructive">{errors.phone}</p>
              ) : null}
            </div>
            <div>
              <Label htmlFor="bdate">{t.booking.date}</Label>
              <Input
                id="bdate"
                type="date"
                min={today}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-2"
              />
              {errors.date ? <p className="mt-1 text-xs text-destructive">{errors.date}</p> : null}
            </div>
            <div>
              <Label htmlFor="btrainer">{t.booking.trainer}</Label>
              <select
                id="btrainer"
                value={trainer}
                onChange={(e) => setTrainer(e.target.value)}
                className="mt-2 h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm"
              >
                <option value="any">{t.booking.anyTrainer}</option>
                {trainers.map((tr) => (
                  <option key={tr.slug} value={tr.name}>
                    {tr.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <p className="mb-3 text-[0.68rem] font-bold tracking-[0.18em] uppercase text-muted-foreground">
              {t.booking.time}
            </p>
            {!date ? (
              <p className="text-sm text-muted-foreground">{t.booking.selectDatePrompt}</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {times.map((tm) => (
                  <button
                    key={tm}
                    type="button"
                    onClick={() => setTime(tm)}
                    className={cn(
                      "rounded-full border px-4 py-1.5 text-xs transition-colors",
                      time === tm
                        ? "border-primary text-primary"
                        : "border-border text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {tm}
                  </button>
                ))}
              </div>
            )}
            {errors.time ? <p className="mt-2 text-xs text-destructive">{errors.time}</p> : null}
          </div>

          <SpamGuardFields
            id="booking"
            className="relative"
            challenge={guard.challenge}
            captchaAnswer={guard.captchaAnswer}
            onCaptchaChange={guard.setCaptchaAnswer}
            honeypot={guard.honeypot}
            onHoneypotChange={guard.setHoneypot}
            error={errors.captcha}
          />
        </Reveal>

        <Reveal
          delay={0.08}
          className="self-start rounded-2xl border border-primary bg-card p-7 shadow-ember"
        >
          <h2 className="text-xl uppercase">{t.booking.summary}</h2>
          <dl className="mt-5 space-y-2 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">{t.booking.type}</dt>
              <dd>{t.booking.types[type]}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">{t.booking.date}</dt>
              <dd>{date || "—"}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">{t.booking.time}</dt>
              <dd>{time || "—"}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">{t.booking.trainer}</dt>
              <dd>{trainer === "any" ? t.booking.anyTrainer : trainer}</dd>
            </div>
          </dl>
          <button
            type="button"
            onClick={confirm}
            className="mt-7 w-full rounded-full ember-bg px-7 py-3.5 text-xs font-bold tracking-[0.16em] uppercase text-primary-foreground"
          >
            {t.booking.confirm}
          </button>
        </Reveal>
      </div>
    </div>
  );
}
