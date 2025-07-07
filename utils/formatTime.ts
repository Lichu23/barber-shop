export function formatTimeTo12H(timeStr: string | undefined): string {
  if (!timeStr) return "";
  // Extrae solo la parte HH:mm:ss
  const [hourStr, minuteStr] = timeStr.split(":");
  let hour = parseInt(hourStr, 10);
  const minute = minuteStr;
  const ampm = hour >= 12 ? "pm" : "am";
  hour = hour % 24;
  if (hour === 0) hour = 12;
  return `${hour}:${minute} ${ampm}`;
}