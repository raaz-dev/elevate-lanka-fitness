import { createFileRoute, Link } from "@tanstack/react-router";

import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { accreditations, achievements, equipment, values } from "@/data/extras";
import { images, site, stats, trainers } from "@/data/site";
import { useI18n } from "@/i18n";

const title = "About IRONPEAK — Premium Fitness Centre in Colombo";
const description =
  "From a 900 sq ft strength room in 2011 to a 22,000 sq ft training facility serving 4,800+ members in Colombo. Our story, mission, values and team.";

export const Route = createFileRoute("/about")({
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
      <section className="relative isolate flex min-h-[52vh] items-end overflow-hidden">
        <img
          src={images.facility}
          alt="IRONPEAK training floor in Colombo"
          fetchPriority="high"
          className="absolute inset-0 -z-10 size-full object-cover"
        />
        <div className="night-veil absolute inset-0 -z-10" aria-hidden />
        <div className="mx-auto w-full max-w-7xl px-4 pt-32 pb-14 sm:px-6">
          <Reveal immediate>
            <p className="eyebrow">{t.nav.about}</p>
            <h1 className="mt-4 max-w-3xl text-5xl uppercase sm:text-6xl">{t.about.title}</h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              {t.about.subtitle}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal className="rounded-2xl border border-border bg-card p-8">
            <p className="eyebrow mb-3">{t.about.missionTitle}</p>
            <p className="text-lg leading-relaxed">{t.about.mission}</p>
          </Reveal>
          <Reveal delay={0.08} className="rounded-2xl border border-border bg-card p-8">
            <p className="eyebrow mb-3">{t.about.visionTitle}</p>
            <p className="text-lg leading-relaxed">{t.about.vision}</p>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-border bg-surface py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow={t.brand.name} title={t.about.valuesTitle} />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.05}>
                <article className="card-hover h-full rounded-2xl border border-border bg-card p-6">
                  <h3 className="text-lg uppercase">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionHeading eyebrow={t.about.storyTitle} title={t.about.achievementsTitle} />
        <ol className="mt-10 space-y-6 border-l border-border pl-6">
          {achievements.map((a, i) => (
            <li key={a.year} className="relative">
              <Reveal delay={i * 0.05}>
                <span
                  className="absolute -left-[1.9rem] top-2 size-3 rounded-full ember-bg"
                  aria-hidden
                />
                <p className="font-display text-2xl ember-text">{a.year}</p>
                <h3 className="mt-1 text-lg uppercase">{a.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{a.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-y border-border bg-surface py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow={t.nav.about} title={t.about.equipmentTitle} />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {equipment.map((e) => (
                <li key={e} className="rounded-xl border border-border bg-card px-4 py-3 text-sm">
                  {e}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading eyebrow={t.brand.name} title={t.about.certificationsTitle} />
            <div className="mt-8 flex flex-wrap gap-3">
              {accreditations.map((a) => (
                <span
                  key={a}
                  className="rounded-full border border-border px-4 py-2 text-xs font-bold tracking-[0.16em] uppercase text-muted-foreground"
                >
                  {a}
                </span>
              ))}
            </div>
            <div className="mt-10 grid grid-cols-2 gap-6">
              {stats.slice(0, 4).map((s) => (
                <div key={s.key}>
                  <p className="font-display text-3xl ember-text">
                    {s.value.toLocaleString()}
                    {s.suffix}
                  </p>
                  <p className="mt-1 text-[0.68rem] font-bold tracking-[0.18em] uppercase text-muted-foreground">
                    {t.home.stats[s.key]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionHeading
          eyebrow={t.nav.trainers}
          title={t.about.teamTitle}
          subtitle={t.trainers.subtitle}
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trainers.map((tr, i) => (
            <Reveal key={tr.slug} delay={i * 0.05}>
              <article className="card-hover overflow-hidden rounded-2xl border border-border bg-card">
                <img
                  src={tr.image}
                  alt={tr.name}
                  loading="lazy"
                  className="aspect-[3/4] w-full object-cover"
                />
                <div className="p-5">
                  <h3 className="text-lg uppercase">{tr.name}</h3>
                  <p className="mt-1 text-xs tracking-[0.12em] uppercase text-muted-foreground">
                    {tr.role}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12 flex flex-wrap gap-3">
          <Link
            to="/booking"
            className="rounded-full ember-bg px-7 py-3.5 text-xs font-bold tracking-[0.16em] uppercase text-primary-foreground shadow-ember"
          >
            {t.cta.bookTrial}
          </Link>
          <a
            href={`tel:${site.phone}`}
            className="rounded-full border border-border px-7 py-3.5 text-xs font-bold tracking-[0.16em] uppercase transition-colors hover:border-primary hover:text-primary"
          >
            {t.cta.callNow}
          </a>
        </Reveal>
      </section>
    </div>
  );
}
