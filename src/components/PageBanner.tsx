"use client";

/**
 * PageBanner — reusable full-width section header
 *
 * imageSrc: path to /public/banners/*.jpg  (optional — falls back to plain gradient)
 * When an image is present it shows through an 88% opacity overlay, staying readable.
 */

interface PageBannerProps {
  /** Small pill label above the title, e.g. "ADATBÁZIS" */
  badge?: string;
  /** Show a pulsing live indicator dot next to the badge */
  badgeLive?: boolean;
  title: string;
  subtitle?: string;
  /** Optional path to /public/banners/<name>.jpg */
  imageSrc?: string;
  /** Slot for stats row, decorative chips, etc. */
  children?: React.ReactNode;
}

export default function PageBanner({
  badge,
  badgeLive,
  title,
  subtitle,
  imageSrc,
  children,
}: PageBannerProps) {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "#ffffff",
        ...(imageSrc
          ? {
              backgroundImage: `url('${imageSrc}')`,
              backgroundSize: "cover",
              backgroundPosition: "center top",
            }
          : {}),
        minHeight: 240,
      }}
    >
      {/* White overlay — ensures text is always readable over the image */}
      {imageSrc && (
        <div
          aria-hidden
          style={{ position: "absolute", inset: 0, background: "rgba(240,245,251,0.88)" }}
        />
      )}

      {/* Blueprint grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(2,132,199,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(2,132,199,0.07) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(2,132,199,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative max-w-6xl mx-auto px-6 lg:px-8 py-14 lg:py-16 flex items-start gap-8">
        {/* Left: page title area */}
        <div className="flex-1 min-w-0">
          {badge && (
            <div className="flex items-center gap-3 mb-5">
              <span
                className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.18em] uppercase px-3 py-1 rounded-full border"
                style={{
                  color: "#0284c7",
                  borderColor: "rgba(2,132,199,0.25)",
                  background: "rgba(2,132,199,0.07)",
                }}
              >
                {badgeLive && (
                  <span className="relative flex h-2 w-2">
                    <span
                      className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                      style={{ background: "#0284c7" }}
                    />
                    <span
                      className="relative inline-flex rounded-full h-2 w-2"
                      style={{ background: "#0284c7" }}
                    />
                  </span>
                )}
                {badge}
              </span>
            </div>
          )}

          <h1
            className="font-black leading-none mb-4"
            style={{
              fontSize: "clamp(2.4rem, 6vw, 4.5rem)",
              color: "#0f172a",
              letterSpacing: "-0.03em",
              fontFamily: "'Georgia', serif",
            }}
          >
            {title}
          </h1>

          {subtitle && (
            <p
              className="max-w-2xl text-base md:text-lg leading-relaxed mb-6"
              style={{ color: "#64748b" }}
            >
              {subtitle}
            </p>
          )}

          {children}
        </div>

        {/* Right: sponsor badge */}
        <a
          href="https://www.tablog.pro"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:flex flex-col items-center gap-2 flex-shrink-0 group"
          style={{
            background: "rgba(255,255,255,0.72)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(2,132,199,0.15)",
            borderRadius: "14px",
            padding: "14px 20px",
            textDecoration: "none",
            minWidth: 148,
            transition: "box-shadow 0.2s, border-color 0.2s",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 20px rgba(2,132,199,0.15)";
            (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(2,132,199,0.35)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = "";
            (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(2,132,199,0.15)";
          }}
        >
          <span
            className="text-xs font-mono tracking-widest uppercase"
            style={{ color: "#94a3b8", letterSpacing: "0.14em" }}
          >
            Támogató
          </span>
          <img
            src="/tabloglogo/TablogLogo.png"
            alt="Tablog"
            style={{ height: 36, width: "auto", objectFit: "contain" }}
          />
          <span
            className="text-center leading-tight"
            style={{ fontSize: "0.65rem", color: "#64748b", maxWidth: 120 }}
          >
            Felhőalapú irodai beléptető &amp; vendégérkeztető rendszerek
          </span>
        </a>
      </div>
    </section>
  );
}
