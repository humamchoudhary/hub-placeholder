import CountdownClock from "./countdown-clock";
import { formatReleaseDate } from "@/lib/utils";
import EmailSubscription from "./email-subscription";

// Pre-defined positions for dots to avoid hydration mismatch
const DOT_POSITIONS = [
  { x: 10, y: 20 },
  { x: 25, y: 60 },
  { x: 40, y: 30 },
  { x: 55, y: 80 },
  { x: 70, y: 40 },
  { x: 85, y: 70 },
  { x: 20, y: 85 },
  { x: 35, y: 15 },
  { x: 50, y: 55 },
  { x: 65, y: 25 },
  { x: 80, y: 45 },
  { x: 95, y: 65 },
  { x: 15, y: 35 },
  { x: 30, y: 75 },
  { x: 45, y: 50 },
];

interface CountdownPlaceholderProps {
  releaseDate: Date;
}

export default function CountdownPlaceholder({
  releaseDate,
}: CountdownPlaceholderProps) {
  // Server-side: Use UTC for initial calculation
  const serverTimezone = "UTC";
  const formattedDate = formatReleaseDate(releaseDate, serverTimezone);

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 overflow-hidden">
      {/* Background animation - Static on server */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Static grid pattern - responsive sizing */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, var(--color-foreground-light) 1px, transparent 1px),
              linear-gradient(to bottom, var(--color-foreground-light) 1px, transparent 1px)
            `,
            backgroundSize: "clamp(30px, 8vw, 50px) clamp(30px, 8vw, 50px)",
            maskImage:
              "radial-gradient(ellipse at center, black 20%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 20%, transparent 80%)",
            opacity: 0.02,
          }}
        />

        {/* Static dots - will be animated on client */}
        {DOT_POSITIONS.map((pos, i) => (
          <div
            key={i}
            className="absolute w-[2px] h-[2px] sm:w-1 sm:h-1 bg-foreground-light rounded-full"
            style={{
              left: `${pos.x}vw`,
              top: `${pos.y}vh`,
              opacity: 0.08,
            }}
          />
        ))}
      </div>

      {/* Content - All SSR */}
      <div className="relative z-10 w-full max-w-2xl mx-auto space-y-8 sm:space-y-10 md:space-y-12 py-6 sm:py-8 md:py-12 px-2">
        {/* Header */}
        <div className="text-center space-y-4 sm:space-y-6">
          <div>
            <h1 className="logo-font text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-normal text-foreground mb-2 sm:mb-3 leading-tight">
              Kyro
            </h1>
            <div className="h-px w-24 xs:w-28 sm:w-32 bg-primary/40 mx-auto"></div>
          </div>

          <div className="space-y-2 sm:space-y-3">
            <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-medium text-foreground-sec leading-snug">
              Kyro Hub
            </h2>
            <p className="text-foreground-light text-sm xs:text-base sm:text-base md:text-lg max-w-md mx-auto px-2 sm:px-0 leading-relaxed">
              A streamlined tool for managing your business in one place
            </p>
          </div>
        </div>

        {/* Countdown Section */}
        <div className="space-y-6 sm:space-y-8">
          <div className="text-center">
            <h3 className="text-base sm:text-lg md:text-lg font-medium text-foreground-light">
              Launching in
            </h3>
          </div>

          {/* Client-only Clock */}
          <div className="px-1">
            <CountdownClock
              releaseDate={releaseDate}
              timezone={serverTimezone}
            />
          </div>

          <div className="text-center px-2">
            <p className="text-xs xs:text-sm sm:text-sm text-foreground-light break-words leading-relaxed">
              {formattedDate}
            </p>
            <p className="text-xs text-foreground-light/60 mt-1">
              Your local time
            </p>
          </div>
        </div>

        {/* Email subscription - Client Component */}
        <div className="px-3 sm:px-4 md:px-0">
          <EmailSubscription />
        </div>

        {/* Footer */}
        <div className="text-center pt-6 sm:pt-8 border-t border-background-sec/50">
          <p className="text-xs text-foreground-light/60">
            © {new Date().getFullYear()} Kyro
          </p>
        </div>
      </div>
    </div>
  );
}
