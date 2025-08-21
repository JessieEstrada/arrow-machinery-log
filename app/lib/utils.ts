export function timeAgo(dateString: string) {
  const now = new Date();
  const past = new Date(dateString.replace(" ", "T") + "Z");
  const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (seconds < 2) return "just now";

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const counter = Math.floor(seconds / secondsInUnit);
    if (counter > 0) {
      return `${counter} ${unit}${counter !== 1 ? "s" : ""} ago`;
    }
  }
  // Fallback
  return "just now";
}
