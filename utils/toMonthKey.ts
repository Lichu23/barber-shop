export const toMonthKey = (dateStr: string): string => {
  const [year, month] = dateStr.split("-");
  return `${year}-${month}`;
};

export const normalizeMonthLabel = (date: Date): string =>
  new Intl.DateTimeFormat("es-ES", {
    month: "long",
    year: "numeric",
  }).format(date).toLowerCase();
