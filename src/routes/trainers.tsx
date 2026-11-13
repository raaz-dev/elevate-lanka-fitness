import { createFileRoute, Link } from "@tanstack/react-router";
import { Star } from "lucide-react";

import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { trainers } from "@/data/site";
import { useI18n } from "@/i18n";

const title = "Personal Trainers & Coaches — IRONPEAK Colombo";
const description =
  "Meet IRONPEAK's internationally certified coaches: powerlifting, fat loss, hypertrophy, pre/post-natal, yoga and mobility specialists in Colombo.";

export const Route = createFileRoute("/trainers")({
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
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow={t.nav.trainers}
        title={t.trainers.title}
        subtitle={t.trainers.subtitle}
        level={1}
      />

      <div className="mt-14 grid gap-8 lg:grid-cols-2">
        {trainers.map((tr, i) => (
          <Reveal key={tr.slug} delay={i * 0.05}>
            <article className="card-hover flex h-full flex-col gap-6 rounded-2xl border border-border bg-card p-6 sm:flex-row">
              <img
                src={tr.image}
                alt={tr.name}
                loading="lazy"
                className="h-56 w-full rounded-xl object-cover sm:w-44"
              />
              <div className="flex flex-1 flex-col">
                <h2 className="text-2xl uppercase">{tr.name}</h2>
                <p className="mt-1 text-xs tracking-[0.14em] uppercase text-primary">{tr.role}</p>
                <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                  <Star className="size-4 fill-primary text-primary" aria-hidden />
                  <span>
                    {tr.rating.toFixed(1)} · {tr.reviews} {t.trainers.reviews}
                  </span>
                  <span>·</span>
                  <span>
                    {tr.years} {t.trainers.years}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{tr.bio}</p>
                <div className="mt-4">
                  <p className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-muted-foreground">
                    {t.trainers.specialisation}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {tr.specialisations.map((s) => (
                      <span key={s} className="rounded-full border border-border px-3 py-1 text-xs">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-muted-foreground">
                    {t.trainers.certifications}
                  </p>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    {tr.certifications.join(" · ")}
                  </p>
                </div>
                <Link
                  to="/booking"
                  className="mt-6 self-start rounded-full ember-bg px-6 py-3 text-xs font-bold tracking-[0.16em] uppercase text-primary-foreground shadow-ember"
                >
                  {t.cta.bookTrainer}
                </Link>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
