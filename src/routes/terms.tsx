import { createFileRoute } from "@tanstack/react-router";

import { SectionHeading } from "@/components/site/SectionHeading";
import { site } from "@/data/site";

const title = "Terms & Conditions — IRONPEAK Fitness Centre Colombo";
const description =
  "Membership terms, billing, freezing, cancellation, class booking rules and facility conduct for IRONPEAK Fitness Centre in Colombo.";

export const Route = createFileRoute("/terms")({
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

const sections = [
  {
    h: "Membership & billing",
    p: "Memberships are billed monthly, quarterly or annually in advance in Sri Lankan Rupees. Prices may change with 30 days' written notice; your current cycle is always honoured at the agreed rate.",
  },
  {
    h: "Freezing & cancellation",
    p: "You may freeze your membership for up to two months per year at no cost. Monthly memberships can be cancelled with 30 days' notice. Annual memberships are non-refundable but transferable once.",
  },
  {
    h: "Bookings & no-shows",
    p: "Classes and personal training may be cancelled free of charge up to four hours before the session. Three no-shows in a month may result in temporary loss of priority booking.",
  },
  {
    h: "Health & safety",
    p: "You must complete a health screening before training and disclose any condition that affects safe exercise. Follow coach instruction, re-rack weights and wear closed footwear on the floor.",
  },
  {
    h: "Conduct",
    p: "Harassment, intimidation, filming other members without consent, and use of banned substances on the premises all result in immediate termination without refund.",
  },
  {
    h: "Liability",
    p: "Training carries inherent risk. Beyond our duty of care as operators, we are not liable for injury arising from failure to follow instruction, or for personal property left unsecured.",
  },
];

function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="IRONPEAK"
        title="Terms & Conditions"
        subtitle={`Agreement between you and ${site.legalName}.`}
        level={1}
      />
      <div className="mt-12 space-y-8">
        {sections.map((s) => (
          <section key={s.h}>
            <h2 className="text-xl uppercase">{s.h}</h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">{s.p}</p>
          </section>
        ))}
        <p className="text-sm text-muted-foreground">
          For clarification, contact us at{" "}
          <a
            href={`mailto:${site.email}`}
            className="text-primary underline underline-offset-2 hover:no-underline"
          >
            {site.email}
          </a>
          .
        </p>
      </div>
    </div>
  );
}
