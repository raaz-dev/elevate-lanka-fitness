import { createFileRoute } from "@tanstack/react-router";
import { X } from "lucide-react";
import { useState } from "react";

import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { galleryItems } from "@/data/extras";
import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";

const title = "Gallery — Inside IRONPEAK Fitness Centre Colombo";
const description =
  "Photos of the IRONPEAK training floor, studios, conditioning zone, classes and recovery suite in Colombo, Sri Lanka.";

export const Route = createFileRoute("/gallery")({
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

const cats = ["all", "facility", "classes", "events"] as const;

function Page() {
  const { t } = useI18n();
  const [cat, setCat] = useState<(typeof cats)[number]>("all");
  const [open, setOpen] = useState<number | null>(null);

  const label: Record<(typeof cats)[number], string> = {
    all: t.gallery.all,
    facility: t.gallery.facility,
    classes: t.gallery.classesCat,
    events: t.gallery.events,
  };

  const items = galleryItems.filter((g) => cat === "all" || g.cat === cat);

  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow={t.nav.gallery}
        title={t.gallery.title}
        subtitle={t.gallery.subtitle}
        level={1}
      />

      <div className="mt-10 flex flex-wrap gap-2">
        {cats.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCat(c)}
            className={cn(
              "rounded-full border px-5 py-2 text-xs font-bold tracking-[0.16em] uppercase transition-colors",
              cat === c
                ? "border-primary text-primary"
                : "border-border text-muted-foreground hover:text-foreground",
            )}
          >
            {label[c]}
          </button>
        ))}
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((g, i) => (
          <Reveal key={g.alt} delay={i * 0.04}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label={t.gallery.open}
              className="card-hover group block w-full overflow-hidden rounded-2xl border border-border"
            >
              <img
                src={g.src}
                alt={g.alt}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </button>
          </Reveal>
        ))}
      </div>

      {open !== null && items[open] ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 p-6"
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setOpen(null)}
            aria-label={t.gallery.closeLightbox}
            className="absolute top-6 right-6 rounded-full border border-border p-2 text-muted-foreground hover:text-primary"
          >
            <X className="size-5" aria-hidden />
          </button>
          <figure className="max-h-full max-w-4xl">
            <img
              src={items[open].src}
              alt={items[open].alt}
              className="max-h-[75vh] w-full rounded-2xl object-contain"
            />
            <figcaption className="mt-4 text-center text-sm text-muted-foreground">
              {items[open].alt}
            </figcaption>
          </figure>
        </div>
      ) : null}
    </div>
  );
}
