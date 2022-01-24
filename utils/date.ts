export const formatYmd = (date: Date): string => date.toISOString().slice(0, 10);

export const dateNextWeek = (dayOfWeek: number): Date => {
  var now = new Date();

  var result = new Date(now.getFullYear(), now.getMonth(), now.getDate() + ((7 + dayOfWeek - now.getDay()) % 7), 1, 0);
  result.setDate(result.getDate() + 7);

  return result;
};

export const formatFull = (date: Date, locale: string = "nb-NO"): string =>
  new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeStyle: "medium",
  }).format(date);
