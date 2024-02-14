export function formatDate(dateString) {
  const date = new Date(dateString + "T00:00:00Z");
  const options = {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  };
  return date.toLocaleDateString("en-US", options);
}
