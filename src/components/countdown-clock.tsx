"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { calculateTimeRemaining } from "@/lib/utils";

interface CountdownClockProps {
  releaseDate: Date;
  timezone: string;
}

interface DigitColumnProps {
  digit: number;
  previousDigit: number;
}

function DigitColumn({ digit, previousDigit }: DigitColumnProps) {
  return (
    <div className="relative h-16 w-14 md:h-20 md:w-16 bg-background-sec rounded-lg overflow-hidden shadow border border-[#d4d4d4]">
      <div className="absolute inset-0">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={digit}
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
              duration: 0.5,
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <span className="text-3xl md:text-4xl font-bold text-foreground-sec">
              {digit}
            </span>
          </motion.div>
        </AnimatePresence>

        {/* Center line */}
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-foreground-light/20 -translate-y-1/2" />
      </div>

      {/* Previous digit visible above */}
      <motion.div
        initial={{ y: -40 }}
        animate={{ y: -80 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 flex items-center justify-center opacity-30"
      >
        <span className="text-3xl md:text-4xl font-bold text-foreground-light/30">
          {previousDigit}
        </span>
      </motion.div>
    </div>
  );
}

function DoubleDigitColumn({ value, label }: { value: number; label: string }) {
  const tens = Math.floor(value / 10);
  const ones = value % 10;
  const [prevTens, setPrevTens] = useState(tens);
  const [prevOnes, setPrevOnes] = useState(ones);

  useEffect(() => {
    setPrevTens(tens);
    setPrevOnes(ones);
  }, [tens, ones]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-0.5">
        <DigitColumn digit={tens} previousDigit={prevTens} />
        <DigitColumn digit={ones} previousDigit={prevOnes} />
      </div>
      <span className="mt-2 text-xs font-medium text-foreground-light uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
}

export default function CountdownClock({
  releaseDate,
  timezone,
}: CountdownClockProps) {
  const [previousTime, setPreviousTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [timeRemaining, setTimeRemaining] = useState(() =>
    calculateTimeRemaining(releaseDate, timezone),
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setPreviousTime(timeRemaining);
      const newTime = calculateTimeRemaining(releaseDate, timezone);
      setTimeRemaining(newTime);
    }, 1000);

    return () => clearInterval(timer);
  }, [releaseDate, timezone, timeRemaining]);

  if (timeRemaining.isReleased) {
    return null; // This is handled by the main SSR component
  }

  return (
    <div className="flex justify-center gap-3 md:gap-6">
      <DoubleDigitColumn value={timeRemaining.days} label="days" />
      <div className="flex flex-col items-center justify-center">
        <span className="text-2xl md:text-3xl font-bold text-foreground-light mb-6">
          :
        </span>
      </div>
      <DoubleDigitColumn value={timeRemaining.hours} label="hours" />
      <div className="flex flex-col items-center justify-center">
        <span className="text-2xl md:text-3xl font-bold text-foreground-light mb-6">
          :
        </span>
      </div>
      <DoubleDigitColumn value={timeRemaining.minutes} label="minutes" />
      <div className="flex flex-col items-center justify-center">
        <span className="text-2xl md:text-3xl font-bold text-foreground-light mb-6">
          :
        </span>
      </div>
      <DoubleDigitColumn value={timeRemaining.seconds} label="seconds" />
    </div>
  );
}
