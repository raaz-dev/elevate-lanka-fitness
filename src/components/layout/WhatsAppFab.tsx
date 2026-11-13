import { MessageCircle } from "lucide-react";

import { site } from "@/data/site";
import { useI18n } from "@/i18n";

export function WhatsAppFab() {
  const { t } = useI18n();
  return (
    <a
      href={`https://wa.me/${site.whatsapp}`}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={t.cta.whatsapp}
      className="fixed right-4 bottom-4 z-50 inline-flex items-center gap-2 rounded-full ember-bg px-4 py-3 text-sm font-bold tracking-wide text-primary-foreground uppercase shadow-ember transition-transform hover:scale-105 sm:right-6 sm:bottom-6"
    >
      <MessageCircle className="size-5" aria-hidden />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
