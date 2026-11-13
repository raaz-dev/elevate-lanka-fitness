import { createFileRoute, Link } from "@tanstack/react-router";

import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { mealPlans, recipes, supplements } from "@/data/extras";
import { images } from "@/data/site";
import { useI18n } from "@/i18n";

const title = "Nutrition & Recovery Coaching — IRONPEAK Colombo";
const description =
  "Sri Lankan meal plans, coach-approved recipes, evidence-based supplement guidance and a full recovery suite at IRONPEAK Colombo.";

export const Route = createFileRoute("/nutrition")({
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

  return (
    <div>
      <section className="relative isolate flex min-h-[46vh] items-end overflow-hidden">
        <img
          src={images.nutrition}
          alt="Sri Lankan meals planned for training goals"
          fetchPriority="high"
          className="absolute inset-0 -z-10 size-full object-cover"
        />
        <div className="night-veil absolute inset-0 -z-10" aria-hidden />
        <div className="mx-auto w-full max-w-7xl px-4 pt-32 pb-12 sm:px-6">
          <Reveal immediate>
            <p className="eyebrow">{t.nav.services}</p>
            <h1 className="mt-4 max-w-3xl text-5xl uppercase sm:text-6xl">{t.nutrition.title}</h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              {t.nutrition.subtitle}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionHeading eyebrow={t.brand.name} title={t.nutrition.mealPlansTitle} />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {mealPlans.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.06}>
              <article className="card-hover h-full rounded-2xl border border-border bg-card p-7">
                <h3 className="text-xl uppercase">{p.name}</h3>
                <p className="mt-1 font-display text-3xl ember-text">
                  {p.kcal.toLocaleString()} <span className="text-base">{t.nutrition.kcal}</span>
                </p>
                <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                  {p.meals.map((m) => (
                    <li key={m} className="border-b border-border pb-2 last:border-0">
                      {m}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-surface py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow={t.nav.services} title={t.nutrition.recipesTitle} />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {recipes.map((r, i) => (
              <Reveal key={r.name} delay={i * 0.05}>
                <article className="card-hover h-full rounded-2xl border border-border bg-card p-6">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-lg uppercase">{r.name}</h3>
                    <span className="shrink-0 text-sm text-primary">
                      {r.kcal} {t.nutrition.kcal}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{r.note}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow={t.brand.name} title={t.nutrition.supplementsTitle} />
            <ul className="mt-8 space-y-4">
              {supplements.map((s) => (
                <li key={s.name} className="rounded-xl border border-border bg-card p-5">
                  <p className="text-base uppercase">{s.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
                </li>
              ))}
            </ul>
          </div>
          <Reveal className="self-start rounded-2xl border border-primary bg-card p-8 shadow-ember">
            <p className="eyebrow mb-3">{t.nutrition.consultTitle}</p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              A Precision Nutrition coach reviews your intake, body composition and training load,
              then writes a plan around the food you actually eat.
            </p>
            <Link
              to="/booking"
              className="mt-7 inline-block rounded-full ember-bg px-7 py-3.5 text-xs font-bold tracking-[0.16em] uppercase text-primary-foreground"
            >
              {t.cta.bookTrial}
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
