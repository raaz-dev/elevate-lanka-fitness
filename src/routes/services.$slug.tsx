import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check } from "lucide-react";

import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { services, site } from "@/data/site";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const item = services.find((s) => s.slug === params.slug);
    if (!item) throw notFound();
    return { item };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Unavailable — IRONPEAK" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${loaderData.item.name} — IRONPEAK Fitness Centre Colombo`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.item.description },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.item.description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: Page,
});

function Page() {
  const { item } = Route.useLoaderData();
  const { t } = useI18n();
  const related = services.filter((s) => s.slug !== item.slug).slice(0, 3);

  return (
    <div>
      <section className="relative isolate flex min-h-[48vh] items-end overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          fetchPriority="high"
          className="absolute inset-0 -z-10 size-full object-cover"
        />
        <div className="night-veil absolute inset-0 -z-10" aria-hidden />
        <div className="mx-auto w-full max-w-7xl px-4 pt-32 pb-12 sm:px-6">
          <Reveal immediate>
            <p className="eyebrow">{t.nav.services}</p>
            <h1 className="mt-4 max-w-3xl text-5xl uppercase sm:text-6xl">{item.name}</h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-3">
          <Reveal className="rounded-2xl border border-border bg-card p-7">
            <p className="eyebrow mb-4">{t.services.includesTitle}</p>
            <ul className="space-y-3">
              {item.includes.map((inc: string) => (
                <li key={inc} className="flex gap-3 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                  <span>{inc}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.06} className="rounded-2xl border border-border bg-card p-7">
            <p className="eyebrow mb-4">{t.services.forWhoTitle}</p>
            <p className="text-sm leading-relaxed text-muted-foreground">{item.forWho}</p>
          </Reveal>
          <Reveal delay={0.12} className="rounded-2xl border border-border bg-card p-7">
            <p className="eyebrow mb-4">{t.services.sessionsTitle}</p>
            <p className="text-sm leading-relaxed text-muted-foreground">{item.sessions}</p>
            <div className="mt-6 flex flex-col gap-3">
              <Link
                to="/booking"
                className="rounded-full ember-bg px-6 py-3 text-center text-xs font-bold tracking-[0.16em] uppercase text-primary-foreground shadow-ember"
              >
                {t.services.detailCta}
              </Link>
              <a
                href={`https://wa.me/${site.whatsapp}`}
                className="rounded-full border border-border px-6 py-3 text-center text-xs font-bold tracking-[0.16em] uppercase transition-colors hover:border-primary hover:text-primary"
              >
                {t.cta.whatsapp}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border bg-surface py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow={t.brand.name} title={t.services.relatedTitle} />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.05}>
                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="card-hover group block h-full overflow-hidden rounded-2xl border border-border bg-card"
                >
                  <img
                    src={s.image}
                    alt={s.name}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="p-6">
                    <h3 className="text-xl uppercase">{s.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{s.short}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
