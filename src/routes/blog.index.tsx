import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Input } from "@/components/ui/input";
import { posts } from "@/data/site";
import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";

const title = "The IRONPEAK Journal — Training, Nutrition & Recovery";
const description =
  "Evidence-based training, nutrition and recovery articles written by IRONPEAK's certified coaching team in Colombo, Sri Lanka.";

export const Route = createFileRoute("/blog/")({
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

const categories = ["Training", "Nutrition", "Recovery", "Mindset"] as const;

function Page() {
  const { t } = useI18n();
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<string>("all");

  const filtered = useMemo(
    () =>
      posts.filter(
        (p) =>
          (cat === "all" || p.category === cat) &&
          (p.title + p.excerpt).toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [query, cat],
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow={t.nav.blog}
        title={t.blog.title}
        subtitle={t.blog.subtitle}
        level={1}
      />

      <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.blog.search}
          aria-label={t.blog.search}
          className="sm:max-w-xs"
        />
        <div className="flex flex-wrap gap-2">
          {["all", ...categories].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-xs transition-colors",
                cat === c
                  ? "border-primary text-primary"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {c === "all" ? t.blog.allCategories : c}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-14 text-sm text-muted-foreground">{t.blog.noResults}</p>
      ) : (
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.05}>
              <Link
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="card-hover group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card"
              >
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-primary">
                    {p.category}
                  </p>
                  <h2 className="mt-2 text-xl uppercase">{p.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
                  <p className="mt-auto pt-5 text-xs text-muted-foreground">
                    {t.blog.by} {p.author} · {p.readMinutes} {t.blog.minRead}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
