import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
  titleClassName,
  level = 2,
}: {
  eyebrow?: string | undefined;
  title: string;
  subtitle?: string | undefined;
  align?: "left" | "center";
  className?: string | undefined;
  titleClassName?: string | undefined;
  /** Page titles pass level={1}; in-page section headings keep the default. */
  level?: 1 | 2 | 3;
}) {
  const Title = `h${level}` as "h1" | "h2" | "h3";

  return (
    <Reveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? <p className="eyebrow mb-3">{eyebrow}</p> : null}
      <Title
        className={cn("text-4xl leading-none tracking-wide uppercase sm:text-5xl", titleClassName)}
      >
        {title}
      </Title>
      {subtitle ? (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{subtitle}</p>
      ) : null}
    </Reveal>
  );
}
