export const filterPastTimes = (times: string[], dateString: string): string[] => {
  const today = new Date();
  const [year, month, day] = dateString.split('-').map(Number);
  const referenceDate = new Date(year, month - 1, day); 

  const isReferenceDateToday =
    today.getFullYear() === referenceDate.getFullYear() &&
    today.getMonth() === referenceDate.getMonth() &&
    today.getDate() === referenceDate.getDate();

  if (isReferenceDateToday) {
    const currentHour = today.getHours();
    const currentMinute = today.getMinutes();
    const currentTimeInMinutes = currentHour * 60 + currentMinute;

    return times.filter((time) => {
      const [hour, minute] = time.split(':').map(Number);
      const timeInMinutes = hour * 60 + minute;
      return timeInMinutes > currentTimeInMinutes;
    });
  }

  return times;
};
