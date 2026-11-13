import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

/**
 * Fades content up as it scrolls into view.
 *
 * A CSS transition plus a single IntersectionObserver keeps this dependency
 * free instead of shipping an animation library. Pass `immediate` for
 * above-the-fold content (for example a page hero) so it paints visible
 * straight away and is never delayed by hydration.
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  immediate = false,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  immediate?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(immediate);

  useEffect(() => {
    if (immediate) return;
    const el = ref.current;
    if (!el) return;

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -80px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [immediate]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : `translate3d(0, ${y}px, 0)`,
        transition: `opacity 0.65s ${EASE}, transform 0.65s ${EASE}`,
        transitionDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
