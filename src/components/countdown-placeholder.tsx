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
    <div className="min-h-screen relative flex flex-col items-center justify-center p-4 space-y-12 overflow-hidden h-screen">
      {/* Background animation - Static on server */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Static grid pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, var(--color-foreground-light) 1px, transparent 1px),
              linear-gradient(to bottom, var(--color-foreground-light) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            maskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 70%)",
            opacity: 0.03,
          }}
        />

        {/* Static dots - will be animated on client */}
        {DOT_POSITIONS.map((pos, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-foreground-light rounded-full"
            style={{
              left: `${pos.x}vw`,
              top: `${pos.y}vh`,
              opacity: 0.1,
            }}
          />
        ))}
      </div>

      {/* Content - All SSR */}
      <div className="relative z-10 w-full max-w-2xl mx-auto space-y-12 h-full flex flex-col justify-evenly">
        {/* Header */}
        <div className="text-center space-y-6">
          <div>
            <h1 className="logo-font text-6xl md:text-7xl font-normal text-foreground mb-3">
              Kyro
            </h1>
            <div className="h-px w-32 bg-primary/40 mx-auto"></div>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl md:text-3xl font-medium text-foreground-sec">
              Kyro Hub
            </h2>
            <p className="text-foreground-light max-w-md mx-auto">
              A streamlined tool for managing your business in one place
            </p>
          </div>
        </div>

        {/* Countdown Section */}
        <div className="space-y-8">
          <div className="text-center mb-6">
            <h3 className="text-lg font-medium text-foreground-light mb-2">
              Launching in
            </h3>
          </div>

          {/* Client-only Clock */}
          <CountdownClock releaseDate={releaseDate} timezone={serverTimezone} />

          <div className="text-center">
            <p className="text-sm text-foreground-light">{formattedDate}</p>
          </div>
        </div>

        {/* Email subscription - Client Component */}
        <EmailSubscription />

        {/* Footer */}
        <div className="text-center pt-8 border-t border-background-sec">
          <p className="text-xs text-foreground-light/60">© 2024 Kyro</p>
        </div>
      </div>
    </div>
  );
}
