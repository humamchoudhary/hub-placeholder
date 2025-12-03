import CountdownPlaceholder from "@/components/countdown-placeholder";
import { getReleaseDate } from "@/lib/config";

export default async function Home() {
  const releaseDate = await getReleaseDate();

  return <CountdownPlaceholder releaseDate={releaseDate} />;
}
