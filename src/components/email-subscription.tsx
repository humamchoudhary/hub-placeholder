"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function EmailSubscription() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userTimezone, setUserTimezone] = useState("UTC");

  useEffect(() => {
    // Get user's timezone on client
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setUserTimezone(timezone);
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isLoading) return;

    setIsLoading(true);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-timezone": userTimezone,
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setIsSubscribed(true);
        setEmail("");
        setTimeout(() => setIsSubscribed(false), 5000);
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Subscription failed");
      }
    } catch (error) {
      console.error("Subscription error:", error);
      alert("Failed to subscribe. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center px-2">
        <p className="text-foreground-light text-sm sm:text-base">
          Get notified when Kyro launches
        </p>
      </div>

      <form
        onSubmit={handleSubscribe}
        className="space-y-3 w-full max-w-xs sm:max-w-sm mx-auto px-2 sm:px-0"
      >
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            required
            className="
              flex-1
              px-4 py-3
              bg-background-sec
              text-foreground
              rounded-lg
              placeholder:text-foreground-light/60
              focus:outline-none focus:ring-2 focus:ring-primary
              text-sm sm:text-base
              border border-transparent
              w-full
            "
            disabled={isLoading}
          />
          <button
            type="submit"
            className="
              bg-primary text-white
              px-6 py-3
              rounded-lg
              text-sm sm:text-base font-medium
              hover:opacity-90
              disabled:opacity-50
              transition-opacity
              whitespace-nowrap
              w-full sm:w-auto
            "
            disabled={isLoading || !email}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span className="hidden sm:inline">Subscribing...</span>
                <span className="sm:hidden">...</span>
              </span>
            ) : isSubscribed ? (
              <>
                <span className="hidden sm:inline">Subscribed ✓</span>
                <span className="sm:hidden">✓</span>
              </>
            ) : (
              "Notify Me"
            )}
          </button>
        </div>

        <AnimatePresence>
          {isSubscribed && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-center space-y-1"
            >
              <p className="text-xs text-primary">
                You'll be notified on launch
              </p>
              <p className="text-xs text-foreground-light/60">
                Check your email for confirmation
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </form>

      <div className="text-center px-4">
        <p className="text-xs text-foreground-light/60">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </div>
  );
}
