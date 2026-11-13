import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useState } from "react";

import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { plans } from "@/data/site";
import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";

const title = "Membership Plans & Pricing — IRONPEAK Colombo";
const description =
  "Four membership tiers from LKR 6,500/month: gym floor, 90+ classes, InBody scans, recovery suite and personal training. Joining fee waived this month.";

type Cycle = "monthly" | "quarterly" | "annual";

export const Route = createFileRoute("/membership")({
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

function Page() {
  const { t } = useI18n();
  const [cycle, setCycle] = useState<Cycle>("monthly");

  const cycleLabel: Record<Cycle, string> = {
    monthly: t.membership.perMonth,
    quarterly: t.membership.perQuarter,
    annual: t.membership.perYear,
  };

  const allFeatures = Array.from(new Set(plans.flatMap((p) => p.features)));

  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow={t.nav.membership}
        title={t.membership.title}
        subtitle={t.membership.subtitle}
        level={1}
      />

      <Reveal className="mt-10 flex flex-wrap items-center gap-3">
        <div className="inline-flex w-full rounded-full border border-border bg-card p-1 sm:w-auto">
          {(["monthly", "quarterly", "annual"] as const).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCycle(c)}
              className={cn(
                "flex-1 rounded-full px-2.5 py-2 text-[0.65rem] font-bold tracking-[0.12em] uppercase transition-colors sm:flex-none sm:px-5 sm:text-xs sm:tracking-[0.16em]",
                cycle === c
                  ? "ember-bg text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {t.membership[c]}
            </button>
          ))}
        </div>
        <p className="text-xs tracking-[0.14em] uppercase text-primary">{t.membership.saveNote}</p>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {plans.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.05}>
            <article
              className={cn(
                "card-hover flex h-full flex-col rounded-2xl border bg-card p-7",
                p.popular ? "border-primary shadow-ember" : "border-border",
              )}
            >
              {p.popular ? (
                <p className="mb-3 text-[0.65rem] font-bold tracking-[0.18em] uppercase text-primary">
                  {t.membership.popular}
                </p>
              ) : null}
              <h2 className="text-2xl uppercase">{p.name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{p.tagline}</p>
              <p className="mt-6 font-display text-4xl ember-text">
                LKR {p[cycle].toLocaleString()}
              </p>
              <p className="text-[0.68rem] font-bold tracking-[0.18em] uppercase text-muted-foreground">
                {cycleLabel[cycle]}
              </p>
              <ul className="mt-6 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2.5 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link to="/booking" className={cn("mt-auto pt-7")}>
                <span className="block rounded-full ember-bg px-6 py-3 text-center text-xs font-bold tracking-[0.16em] uppercase text-primary-foreground">
                  {t.cta.join}
                </span>
              </Link>
            </article>
          </Reveal>
        ))}
      </div>

      <p className="mt-8 text-sm text-primary">{t.membership.joiningFee}</p>

      <section className="mt-24">
        <SectionHeading eyebrow={t.nav.membership} title={t.membership.compareTitle} />
        <div className="mt-10 overflow-x-auto rounded-2xl border border-border">
          <table className="w-full min-w-[720px] text-sm">
            <thead className="bg-surface">
              <tr>
                <th
                  scope="col"
                  className="p-4 text-left text-[0.68rem] font-bold tracking-[0.18em] uppercase text-muted-foreground"
                >
                  {t.membership.benefit}
                </th>
                {plans.map((p) => (
                  <th
                    key={p.slug}
                    scope="col"
                    className="p-4 text-left text-[0.68rem] font-bold tracking-[0.18em] uppercase"
                  >
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allFeatures.map((f) => (
                <tr key={f} className="border-t border-border">
                  <th scope="row" className="p-4 text-left font-normal text-muted-foreground">
                    {f}
                  </th>
                  {plans.map((p) => (
                    <td key={p.slug} className="p-4">
                      {p.features.includes(f) ? (
                        <Check className="size-4 text-primary" aria-hidden />
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
