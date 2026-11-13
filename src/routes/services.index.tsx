import { createFileRoute, Link } from "@tanstack/react-router";

import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { services } from "@/data/site";
import { useI18n } from "@/i18n";

const title = "Programmes & Services — IRONPEAK Fitness Centre Colombo";
const description =
  "Personal training, strength & conditioning, weight loss, hypertrophy, group classes, yoga, nutrition coaching and recovery at IRONPEAK Colombo.";

export const Route = createFileRoute("/services/")({
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
        eyebrow={t.nav.services}
        title={t.services.title}
        subtitle={t.services.subtitle}
        level={1}
      />
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <Reveal key={s.slug} delay={i * 0.04}>
            <Link
              to="/services/$slug"
              params={{ slug: s.slug }}
              className="card-hover group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card"
            >
              <img
                src={s.image}
                alt={s.name}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="flex flex-1 flex-col p-6">
                <h2 className="text-xl uppercase">{s.name}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{s.short}</p>
                <p className="mt-4 text-xs text-muted-foreground">{s.sessions}</p>
                <p className="mt-auto pt-5 text-[0.68rem] font-bold tracking-[0.18em] uppercase text-primary">
                  {t.cta.explore}
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
