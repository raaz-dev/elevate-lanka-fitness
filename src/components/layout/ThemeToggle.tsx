import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/hooks/use-theme";
import { useI18n } from "@/i18n";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const { t } = useI18n();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t.nav.theme}
      className="inline-flex size-9 items-center justify-center rounded-full border border-border transition-colors hover:border-primary hover:text-primary"
    >
      {theme === "dark" ? <Moon className="size-4" aria-hidden /> : <Sun className="size-4" aria-hidden />}
    </button>
  );
}
