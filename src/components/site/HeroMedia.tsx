import heroVideo from "@/assets/hero-gym.mp4";

/**
 * Hero background.
 *
 * Video only. A poster image painted instantly but was then covered by the
 * video once it buffered, which read as a flash, so the video now paints its
 * own first frame. Muted and inline, which is what lets mobile browsers
 * autoplay it.
 */
export function HeroMedia() {
  return (
    <video
      src={heroVideo}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      aria-hidden
      tabIndex={-1}
      className="absolute inset-0 -z-10 size-full object-cover"
    />
  );
}
