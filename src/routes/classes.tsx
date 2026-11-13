import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { classes, trainers } from "@/data/site";
import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";

const title = "Fitness Class Timetable — IRONPEAK Colombo";
const description =
  "Over 90 coached classes a week at IRONPEAK Colombo: HIIT, spin, barbell strength, boxing, Zumba, yoga and mobility. Filter by trainer, level and time.";

export const Route = createFileRoute("/classes")({
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

const categories = ["Strength", "Cardio", "Mind & Body", "Dance", "Combat"] as const;
const levels = ["Beginner", "Intermediate", "Advanced"] as const;
const slots = ["morning", "afternoon", "evening"] as const;

/*
 * The filter panel stays in English in every locale. Its options are the
 * programme's own English terms (categories, level names, trainer names), so
 * translating only the labels would leave a mixed-language control.
 */
const filterCopy = {
  category: "Category",
  level: "Difficulty",
  trainer: "Trainer",
  time: "Time of day",
  all: "All",
} as const;

const slotLabels: Record<(typeof slots)[number], string> = {
  morning: "Morning",
  afternoon: "Afternoon",
  evening: "Evening",
};

function FilterRow({
  label,
  options,
  value,
  onChange,
  allLabel,
  render,
}: {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
  allLabel: string;
  render?: (v: string) => string;
}) {
  return (
    <div>
      <p className="mb-2 text-[0.65rem] font-bold tracking-[0.18em] uppercase text-muted-foreground">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {["all", ...options].map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => onChange(o)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-xs transition-colors",
              value === o
                ? "border-primary text-primary"
                : "border-border text-muted-foreground hover:text-foreground",
            )}
          >
            {o === "all" ? allLabel : render ? render(o) : o}
          </button>
        ))}
      </div>
    </div>
  );
}

function Page() {
  const { t } = useI18n();
  const [category, setCategory] = useState("all");
  const [level, setLevel] = useState("all");
  const [trainer, setTrainer] = useState("all");
  const [slot, setSlot] = useState("all");

  const filtered = useMemo(
    () =>
      classes.filter(
        (c) =>
          (category === "all" || c.category === category) &&
          (level === "all" || c.level === level) &&
          (trainer === "all" || c.trainer === trainer) &&
          (slot === "all" || c.slot === slot),
      ),
    [category, level, trainer, slot],
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow={t.nav.classes}
        title={t.classes.title}
        subtitle={t.classes.subtitle}
        level={1}
      />

      <Reveal className="mt-10 grid gap-6 rounded-2xl border border-border bg-card p-6 sm:grid-cols-2">
        <FilterRow
          label={filterCopy.category}
          options={categories}
          value={category}
          onChange={setCategory}
          allLabel={filterCopy.all}
        />
        <FilterRow
          label={filterCopy.level}
          options={levels}
          value={level}
          onChange={setLevel}
          allLabel={filterCopy.all}
        />
        <FilterRow
          label={filterCopy.trainer}
          options={trainers.map((x) => x.name)}
          value={trainer}
          onChange={setTrainer}
          allLabel={filterCopy.all}
        />
        <FilterRow
          label={filterCopy.time}
          options={slots}
          value={slot}
          onChange={setSlot}
          allLabel={filterCopy.all}
          render={(v) => slotLabels[v as (typeof slots)[number]] ?? v}
        />
      </Reveal>

      <h2 className="sr-only">{t.classes.weekView}</h2>

      {filtered.length === 0 ? (
        <p className="mt-14 text-sm text-muted-foreground">{t.classes.noResults}</p>
      ) : (
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.04}>
              <article className="card-hover flex h-full flex-col rounded-2xl border border-border bg-card p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-xl uppercase">{c.name}</h3>
                  <span className="rounded-full border border-border px-3 py-1 text-[0.65rem] font-bold tracking-[0.14em] uppercase text-muted-foreground">
                    {c.category}
                  </span>
                </div>
                <p className="mt-3 font-display text-2xl ember-text">
                  {c.day} · {c.time}
                </p>
                <dl className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <dt>{t.classes.filterTrainer}</dt>
                    <dd className="text-foreground">{c.trainer}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>{t.common.duration}</dt>
                    <dd className="text-foreground">
                      {c.duration} {t.common.minutes}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>{t.common.level}</dt>
                    <dd className="text-foreground">{c.level}</dd>
                  </div>
                </dl>
                <p
                  className={cn(
                    "mt-4 text-xs font-bold tracking-[0.16em] uppercase",
                    c.spots > 0 ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  {c.spots > 0 ? `${c.spots} ${t.classes.spots}` : t.classes.full}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
