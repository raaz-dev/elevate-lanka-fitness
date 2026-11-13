import { createFileRoute, Link } from "@tanstack/react-router";
import { Star } from "lucide-react";

import { HeroMedia } from "@/components/site/HeroMedia";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { classes, faqs, images, plans, services, site, stats, testimonials, trainers, whyUs } from "@/data/site";
import { useI18n } from "@/i18n";

const title = "IRONPEAK Fitness Centre — Premium Gym in Colombo, Sri Lanka";
const description =
  "Train at Colombo's premium 22,000 sq ft fitness centre: certified coaches, 90+ weekly classes, nutrition and recovery. Book a free trial today.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Index,
});

function Index() {
  const { t, locale } = useI18n();

  return (
    <div>
      {/* Hero */}
      <section className="relative isolate flex min-h-[88vh] items-end overflow-hidden">
        <HeroMedia />
        <div className="night-veil absolute inset-0 -z-10" aria-hidden />
        <div className="mx-auto w-full max-w-7xl px-4 pt-32 pb-20 sm:px-6">
          <Reveal immediate>
            <p className="eyebrow">{t.home.eyebrow}</p>
            <h1 className={`mt-4 max-w-3xl uppercase ${locale === "ta" ? "text-4xl sm:text-5xl lg:text-6xl" : "text-6xl sm:text-7xl lg:text-8xl"}`}>
              <span className="text-outline-yellow">{t.home.title1}</span> <span className="ember-text">{t.home.title2}</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
              {t.home.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/membership"
                className="rounded-full ember-bg px-7 py-3.5 text-xs font-bold tracking-[0.16em] text-primary-foreground uppercase shadow-ember transition-transform hover:scale-[1.03]"
              >
                {t.cta.becomeMember}
              </Link>
              <Link
                to="/booking"
                className="rounded-full ember-bg px-7 py-3.5 text-xs font-bold tracking-[0.16em] text-primary-foreground uppercase shadow-ember transition-transform hover:scale-[1.03]"
              >
                {t.cta.bookTrial}
              </Link>
              <a
                href={`tel:${site.phone}`}
                className="rounded-full border border-transparent px-4 py-3.5 text-xs font-bold tracking-[0.16em] uppercase text-muted-foreground transition-colors hover:text-primary"
              >
                {t.cta.callNow}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-14 sm:px-6 md:grid-cols-5">
          {stats.map((s, i) => (
            <Reveal key={s.key} delay={i * 0.06} className="text-center">
              <p className="font-display text-4xl ember-text sm:text-5xl">
                {s.value.toLocaleString()}
                {s.suffix}
              </p>
              <p className="mt-2 text-[0.68rem] font-bold tracking-[0.18em] text-muted-foreground uppercase">
                {t.home.stats[s.key]}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Why us */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <SectionHeading eyebrow={t.brand.name} title={t.home.whyTitle} subtitle={t.home.whySubtitle} />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {whyUs.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05}>
              <article className="card-hover h-full rounded-2xl border border-border bg-card p-7">
                <h3 className="text-xl uppercase">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="border-t border-border bg-surface py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow={t.nav.services}
            title={t.home.servicesTitle}
            subtitle={t.home.servicesSubtitle}
            titleClassName={locale === "ta" ? "text-3xl sm:text-4xl" : undefined}
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services
              .filter((s) => s.featured)
              .map((s, i) => (
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
                      <p className="mt-4 text-[0.68rem] font-bold tracking-[0.18em] text-primary uppercase">
                        {t.cta.explore}
                      </p>
                    </div>
                  </Link>
                </Reveal>
              ))}
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <SectionHeading eyebrow={t.nav.membership} title={t.home.plansTitle} subtitle={t.home.plansSubtitle} />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.05}>
              <article
                className={`card-hover flex h-full flex-col rounded-2xl border p-7 ${
                  p.popular ? "border-primary bg-card shadow-ember" : "border-border bg-card"
                }`}
              >
                {p.popular ? (
                  <span className="mb-3 self-start rounded-full ember-bg px-3 py-1 text-[0.6rem] font-bold tracking-[0.18em] text-primary-foreground uppercase">
                    {t.membership.popular}
                  </span>
                ) : null}
                <h3 className="text-2xl uppercase">{p.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.tagline}</p>
                <p className="mt-6 font-display text-4xl">
                  LKR {p.monthly.toLocaleString()}
                  <span className="ml-1 text-xs font-sans font-semibold tracking-widest text-muted-foreground uppercase">
                    {t.membership.perMonth}
                  </span>
                </p>
                <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
                  {p.features.map((f) => (
                    <li key={f}>• {f}</li>
                  ))}
                </ul>
                <Link
                  to="/membership"
                  className="mt-7 rounded-full border border-border px-5 py-3 text-center text-[0.68rem] font-bold tracking-[0.16em] uppercase transition-colors hover:border-primary hover:text-primary"
                >
                  {t.cta.join}
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Trainers */}
      <section className="border-t border-border bg-surface py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow={t.nav.trainers}
            title={t.home.trainersTitle}
            subtitle={t.home.trainersSubtitle}
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trainers.map((tr, i) => (
              <Reveal key={tr.slug} delay={i * 0.05}>
                <article className="card-hover overflow-hidden rounded-2xl border border-border bg-card">
                  <img
                    src={tr.image}
                    alt={`${tr.name}, ${tr.role} at IRONPEAK`}
                    loading="lazy"
                    className="aspect-[3/4] w-full object-cover"
                  />
                  <div className="p-5">
                    <h3 className="text-lg uppercase">{tr.name}</h3>
                    <p className="text-xs font-semibold tracking-widest text-primary uppercase">{tr.role}</p>
                    <p className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="size-3.5 fill-current text-ember" aria-hidden /> {tr.rating} ·{" "}
                      {tr.reviews} {t.trainers.reviews}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <SectionHeading
          eyebrow={t.nav.classes}
          title={t.home.scheduleTitle}
          subtitle={t.home.scheduleSubtitle}
        />
        <div className="mt-10 overflow-hidden rounded-2xl border border-border">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="sr-only">
                <tr>
                  <th scope="col">{t.classes.title}</th>
                  <th scope="col">{t.classes.filterTrainer}</th>
                  <th scope="col">{t.classes.filterTime}</th>
                  <th scope="col">{t.classes.availability}</th>
                </tr>
              </thead>
              <tbody>
                {classes.slice(0, 6).map((c) => (
                  <tr key={c.id} className="border-b border-border last:border-0 odd:bg-surface">
                    <td className="px-4 py-3.5 font-semibold sm:px-5 sm:py-4">{c.name}</td>
                    <td className="hidden px-5 py-4 text-muted-foreground sm:table-cell">{c.trainer}</td>
                    <td className="px-3 py-3.5 text-muted-foreground sm:px-5 sm:py-4">
                      <span className="whitespace-nowrap">
                        {c.day} · {c.time}
                      </span>
                    </td>
                    <td className="py-3.5 pr-4 text-right text-[0.68rem] font-bold tracking-widest uppercase sm:px-5 sm:py-4 sm:text-xs">
                      {c.spots > 0 ? (
                        <span className="text-primary">
                          {c.spots} {t.classes.spots}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">{t.classes.full}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-6">
          <Link
            to="/classes"
            className="text-[0.68rem] font-bold tracking-[0.18em] text-primary uppercase"
          >
            {t.cta.viewAll}
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-y border-border bg-surface py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow={t.testimonials.title} title={t.home.testimonialsTitle} />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {testimonials.map((tm, i) => (
              <Reveal key={tm.name} delay={i * 0.05}>
                <blockquote className="h-full rounded-2xl border border-border bg-card p-7">
                  <div className="flex gap-1" role="img" aria-label={`${tm.rating} / 5`}>
                    {Array.from({ length: tm.rating }).map((_, idx) => (
                      <Star key={idx} className="size-4 fill-current text-ember" aria-hidden />
                    ))}
                  </div>
                  <p className="mt-4 text-base leading-relaxed">“{tm.quote}”</p>
                  <footer className="mt-5 text-xs font-bold tracking-[0.16em] text-muted-foreground uppercase">
                    {tm.name} · {tm.role}
                  </footer>
                </blockquote>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-24 sm:px-6">
        <SectionHeading title={t.home.faqTitle} align="center" />
        <Accordion type="single" collapsible className="mt-10">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`faq-${i}`}>
              <AccordionTrigger className="text-left text-base">{f.q}</AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* CTA */}
      <section className="relative isolate overflow-hidden border-t border-border">
        <img
          src={images.functional}
          alt="Functional training area at IRONPEAK"
          loading="lazy"
          className="absolute inset-0 -z-10 size-full object-cover"
        />
        <div className="night-veil absolute inset-0 -z-10" aria-hidden />
        <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
          <h2 className="text-4xl uppercase sm:text-5xl">{t.cta.bookTrial}</h2>
          <p className="mt-4 text-sm text-muted-foreground">{t.membership.joiningFee}</p>
          <Link
            to="/booking"
            className="mt-8 inline-block rounded-full ember-bg px-8 py-4 text-xs font-bold tracking-[0.16em] text-primary-foreground uppercase shadow-ember"
          >
            {t.cta.bookTrial}
          </Link>
        </div>
      </section>
    </div>
  );
}
