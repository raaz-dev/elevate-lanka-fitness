import { Link } from "@tanstack/react-router";
import { Clock, Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { useState } from "react";
import { toast } from "@/lib/toast";

import { services, site } from "@/data/site";
import { useI18n } from "@/i18n";

/**
 * Legal and credit strings stay in English in every locale, so they are
 * intentionally kept out of the translation dictionaries.
 */
const FOOTER_LEGAL = {
  rights: "All rights reserved.",
  createdBy: "Created by Mohamed Razeem Razeek",
  privacy: "Privacy Policy",
  terms: "Terms & Conditions",
} as const;

export function Footer() {
  const { t } = useI18n();
  const [email, setEmail] = useState("");

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-4">
          <span className="font-display text-3xl tracking-[0.18em] uppercase">{t.brand.name}</span>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {t.footer.about}
          </p>
          <div className="mt-6 flex gap-3">
            {[
              { href: site.social.instagram, Icon: Instagram, label: "Instagram" },
              { href: site.social.facebook, Icon: Facebook, label: "Facebook" },
              { href: site.social.youtube, Icon: Youtube, label: "YouTube" },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={label}
                className="inline-flex size-9 items-center justify-center rounded-full border border-border transition-colors hover:border-primary hover:text-primary"
              >
                <Icon className="size-4" aria-hidden />
              </a>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <h3 className="text-sm tracking-[0.18em] uppercase">{t.footer.quickLinks}</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {(
              [
                { to: "/about", label: t.nav.about },
                { to: "/membership", label: t.nav.membership },
                { to: "/trainers", label: t.nav.trainers },
                { to: "/classes", label: t.nav.classes },
                { to: "/gallery", label: t.nav.gallery },
                { to: "/tools", label: t.nav.tools },
                { to: "/blog", label: t.nav.blog },
              ] as const
            ).map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-primary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h3 className="text-sm tracking-[0.18em] uppercase">{t.footer.servicesCol}</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {services.slice(0, 6).map((s) => (
              <li key={s.slug}>
                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="transition-colors hover:text-primary"
                >
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h3 className="text-sm tracking-[0.18em] uppercase">{t.footer.newsletter}</h3>
          <form
            className="mt-4 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                toast.error(t.form.invalidEmail);
                return;
              }
              setEmail("");
              toast.success(t.form.subscribed);
            }}
          >
            <label className="sr-only" htmlFor="footer-email">
              {t.contact.email}
            </label>
            <input
              id="footer-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.footer.emailPlaceholder}
              className="min-w-0 flex-1 rounded-full border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
            />
            <button
              type="submit"
              className="rounded-full ember-bg px-4 py-2.5 text-xs font-bold tracking-widest text-primary-foreground uppercase"
            >
              {t.cta.subscribe}
            </button>
          </form>

          <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              {site.address}
            </li>
            <li className="flex gap-2">
              <Phone className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              <a href={`tel:${site.phone}`} className="hover:text-primary">
                {site.phoneDisplay}
              </a>
            </li>
            <li className="flex gap-2">
              <Mail className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              <a href={`mailto:${site.email}`} className="hover:text-primary">
                {site.email}
              </a>
            </li>
            <li className="flex gap-2">
              <Clock className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              {t.contact.weekdays}: {site.hours.weekdays}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div
          lang="en"
          className="mx-auto flex max-w-7xl flex-col gap-2 px-4 pt-6 pb-20 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:pb-24"
        >
          <p>
            © {new Date().getFullYear()} {site.legalName}. {FOOTER_LEGAL.rights}
          </p>
          <p className="sm:text-center">{FOOTER_LEGAL.createdBy}</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-primary">
              {FOOTER_LEGAL.privacy}
            </Link>
            <Link to="/terms" className="hover:text-primary">
              {FOOTER_LEGAL.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
