import { formatInTimeZone, toZonedTime } from "date-fns-tz";
import { format } from "date-fns";

export function formatReleaseDate(date: Date, userTimeZone: string): string {
  return formatInTimeZone(date, userTimeZone, "MMMM d, yyyy h:mm a zzz");
}

export function calculateTimeRemaining(targetDate: Date, userTimeZone: string) {
  const now = new Date();
  const userNow = toZonedTime(now, userTimeZone);
  const userTarget = toZonedTime(targetDate, userTimeZone);

  const diff = userTarget.getTime() - userNow.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isReleased: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, isReleased: false };
}
