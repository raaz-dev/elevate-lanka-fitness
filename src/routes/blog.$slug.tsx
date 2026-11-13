import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { posts } from "@/data/site";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const item = posts.find((s) => s.slug === params.slug);
    if (!item) throw notFound();
    return { item };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Unavailable — IRONPEAK" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.item.title} — IRONPEAK Journal`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.item.excerpt },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.item.excerpt },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: Page,
});

const body = [
  "Every recommendation below comes from what we see on the floor in Colombo, cross-checked against the research our coaching team reviews each month. Nothing here requires a supplement order or a piece of equipment you do not already have access to.",
  "Start with the variable that has the highest return for your situation. For most members that is consistency of attendance, then total weekly volume, then load progression — in that order. Chasing the third before the first is the most common reason progress stalls at three months.",
  "Track two numbers only: the sessions you completed and the load you moved on your main lifts. Anything else is noise until those two are trending in the right direction for eight consecutive weeks.",
  "If you are unsure where you sit, book an assessment. A coach will run a movement screen and an InBody scan, then tell you plainly which of the above matters most for you this quarter.",
];

function Page() {
  const { item } = Route.useLoaderData();
  const { t } = useI18n();
  const related = posts.filter((p) => p.slug !== item.slug).slice(0, 2);

  return (
    <div>
      <article className="mx-auto max-w-3xl px-4 py-24 sm:px-6">
        <Reveal immediate>
          <p className="eyebrow">{item.category}</p>
          <h1 className="mt-4 text-4xl uppercase sm:text-5xl">{item.title}</h1>
          <p className="mt-4 text-sm text-muted-foreground">
            {t.blog.by} {item.author} ·{" "}
            {new Date(item.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })} ·{" "}
            {item.readMinutes} {t.blog.minRead}
          </p>
        </Reveal>
        <img src={item.image} alt={item.title} className="mt-10 aspect-[16/9] w-full rounded-2xl object-cover shadow-lift" />
        <p className="mt-10 text-lg leading-relaxed">{item.excerpt}</p>
        <div className="mt-6 space-y-6 text-base leading-relaxed text-muted-foreground">
          {body.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
        <Link to="/booking" className="mt-12 inline-block rounded-full ember-bg px-7 py-3.5 text-xs font-bold tracking-[0.16em] uppercase text-primary-foreground shadow-ember">
          {t.cta.bookTrial}
        </Link>
      </article>

      <section className="border-t border-border bg-surface py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <SectionHeading eyebrow={t.nav.blog} title={t.blog.relatedTitle} />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.06}>
                <Link to="/blog/$slug" params={{ slug: p.slug }} className="card-hover block h-full overflow-hidden rounded-2xl border border-border bg-card">
                  <img src={p.image} alt={p.title} loading="lazy" className="aspect-[16/10] w-full object-cover" />
                  <div className="p-6">
                    <h3 className="text-lg uppercase">{p.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
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
