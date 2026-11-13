import { Languages } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LOCALES, useI18n } from "@/i18n";

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n();
  const active = LOCALES.find((l) => l.code === locale) ?? LOCALES[0]!;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={`${t.nav.language}: ${active.label}`}
        className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-semibold tracking-widest uppercase transition-colors hover:border-primary hover:text-primary"
      >
        <Languages className="size-3.5" aria-hidden />
        {active?.short ?? "EN"}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-40">
        {LOCALES.map((l) => (
          <DropdownMenuItem
            key={l.code}
            onSelect={() => setLocale(l.code)}
            className={l.code === locale ? "text-primary" : undefined}
          >
            {l.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
