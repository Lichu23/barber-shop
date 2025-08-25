import { toZonedTime } from "date-fns-tz";

export const availableTimesFilter = (
  times: string[],
  dateString: string,
  tenantTimezone: string
): string[] => {
  const now = new Date();

  const tenantNow = toZonedTime(now, tenantTimezone);

  const [year, month, day] = dateString.split("-").map(Number);
  const referenceDate = new Date(year, month - 1, day);

  const isReferenceDateToday =
    tenantNow.getFullYear() === referenceDate.getFullYear() &&
    tenantNow.getMonth() === referenceDate.getMonth() &&
    tenantNow.getDate() === referenceDate.getDate();

  if (isReferenceDateToday) {
    const currentHour = tenantNow.getHours();
    const currentMinute = tenantNow.getMinutes();
    const currentTimeInMinutes = currentHour * 60 + currentMinute;

    return times.filter((time) => {
      const [hour, minute] = time.split(":").map(Number);
      const timeInMinutes = hour * 60 + minute;
      return timeInMinutes > currentTimeInMinutes;
    });
  }

  return times;
};
