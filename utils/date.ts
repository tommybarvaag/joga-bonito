import { getISOWeek, startOfWeek } from "date-fns";

export const getNextWeekNumber = (): number => {
  const today = new Date();

  const monday = startOfWeek(today, { weekStartsOn: 1 });
  monday.setDate(monday.getDate() + 7);

  return getISOWeek(monday);
};

export const formatYmd = (date: Date): string => date.toISOString().slice(0, 10);

export const dateNextWeek = (dayOfWeek: number): Date => {
  const date = new Date();

  const monday = startOfWeek(date, { weekStartsOn: 1 });
  monday.setDate(monday.getDate() + 7 + dayOfWeek);

  return monday;
};

export const formatFull = (date: Date, locale: string = "nb-NO"): string =>
  new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeStyle: "medium",
  }).format(date);

export const formatSmallDateFullTime = (date: Date, locale: string = "nb-NO"): string =>
  new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeStyle: "medium",
  }).format(date);

export const formatCageballEventDateAndTime = (date: Date, locale: string = "nb-NO"): string => {
  const dateFormat = new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    weekday: "short",
    month: "short",
  });

  const timeFormat = new Intl.DateTimeFormat(locale, {
    timeStyle: "short",
  });

  return `${dateFormat.format(date)} kl. ${timeFormat.format(date)}`;
};
