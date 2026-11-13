import { createFileRoute } from "@tanstack/react-router";

import { SectionHeading } from "@/components/site/SectionHeading";
import { site } from "@/data/site";

const title = "Privacy Policy — IRONPEAK Fitness Centre Colombo";
const description =
  "How IRONPEAK Fitness Centre collects, uses, stores and protects the personal data of members and website visitors.";

export const Route = createFileRoute("/privacy")({
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
    h: "What we collect",
    p: "Your name, phone number, email address, and — where you join as a member — health screening answers, body composition readings and training records. Website visits generate anonymous analytics data only.",
  },
  {
    h: "Why we collect it",
    p: "To deliver coaching safely, manage your membership and bookings, respond to enquiries and send training notes if you opt in. We never sell personal data to third parties.",
  },
  {
    h: "How we store it",
    p: "Records are held in access-controlled systems and retained for as long as you remain a member, plus seven years where Sri Lankan record-keeping obligations apply.",
  },
  {
    h: "Your rights",
    p: "You may request a copy of your data, ask us to correct it, or ask us to delete it where no legal obligation requires retention. Email us and we will respond within 14 days.",
  },
  {
    h: "Cookies",
    p: "We use essential cookies for language and theme preferences, plus privacy-friendly analytics. No advertising trackers are used on this site.",
  },
];

function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="IRONPEAK"
        title="Privacy Policy"
        subtitle={`Applies to ${site.legalName} and this website.`}
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
          Questions? Email{" "}
          <a
            href={`mailto:${site.email}`}
            className="text-primary underline underline-offset-2 hover:no-underline"
          >
            {site.email}
          </a>{" "}
          or call{" "}
          <a
            href={`tel:${site.phone}`}
            className="text-primary underline underline-offset-2 hover:no-underline"
          >
            {site.phoneDisplay}
          </a>
          .
        </p>
      </div>
    </div>
  );
}
