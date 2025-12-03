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
      <div className="text-center">
        <p className="text-foreground-light">Get notified when Kyro launches</p>
      </div>

      <form onSubmit={handleSubscribe} className="space-y-3 max-w-sm mx-auto">
        <div className="flex gap-2">
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
              text-sm
              border border-transparent
            "
            disabled={isLoading}
          />
          <button
            type="submit"
            className="
              bg-primary text-white
              px-6 py-3
              rounded-lg
              text-sm font-medium
              hover:opacity-90
              disabled:opacity-50
              transition-opacity
            "
            disabled={isLoading || !email}
          >
            {isLoading ? "..." : isSubscribed ? "✓" : "Notify"}
          </button>
        </div>

        <AnimatePresence>
          {isSubscribed && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-xs text-primary text-center"
            >
              You'll be notified on launch. Check your email for confirmation.
            </motion.p>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
