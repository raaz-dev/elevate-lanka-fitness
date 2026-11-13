import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";

export function Header() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { to: "/", label: t.nav.home },
    { to: "/about", label: t.nav.about },
    { to: "/services", label: t.nav.services },
    { to: "/trainers", label: t.nav.trainers },
    { to: "/classes", label: t.nav.classes },
    { to: "/gallery", label: t.nav.gallery },
    { to: "/blog", label: t.nav.blog },
    { to: "/contact", label: t.nav.contact },
  ] as const;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled ? "glass border-b" : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 pl-4 pr-8 sm:px-6 lg:h-20">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t.nav.close : t.nav.menu}
            aria-expanded={open}
            className="inline-flex size-9 items-center justify-center rounded-full border border-border xl:hidden"
          >
            {open ? <X className="size-4" aria-hidden /> : <Menu className="size-4" aria-hidden />}
          </button>
          <Link to="/" className="flex items-baseline gap-2" onClick={() => setOpen(false)}>
            <span className="font-display text-2xl leading-none tracking-[0.18em] uppercase lg:text-3xl">
              {t.brand.name}
            </span>
            <span className="hidden text-[0.6rem] font-semibold tracking-[0.24em] text-muted-foreground uppercase lg:inline">
              {t.brand.tagline}
            </span>
          </Link>
        </div>

        <nav aria-label="Main" className="hidden items-center gap-5 xl:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "text-primary" }}
              className="text-[0.7rem] font-bold tracking-[0.16em] text-muted-foreground uppercase transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>

      {open ? (
        <div className="glass border-t xl:hidden">
          <nav aria-label="Mobile" className="mx-auto grid max-w-7xl gap-1 px-4 py-4 sm:px-6">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: l.to === "/" }}
                activeProps={{ className: "text-primary" }}
                className="rounded-md px-2 py-2.5 text-sm font-bold tracking-[0.12em] uppercase transition-colors hover:bg-secondary"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
