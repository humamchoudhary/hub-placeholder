import { toZonedTime } from "date-fns-tz";

export async function getReleaseDate() {
  const releaseDateStr = process.env.RELEASE_DATE!;
  const releaseTimezone = process.env.RELEASE_TIMEZONE!;

  const date = new Date(releaseDateStr);
  return toZonedTime(date, releaseTimezone);
}

export function getAppName() {
  return process.env.NEXT_PUBLIC_APP_NAME || "Coming Soon";
}
