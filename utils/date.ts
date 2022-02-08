import { format, getISOWeek, Locale, startOfWeek } from "date-fns";
import { nb } from "date-fns/locale";

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

export const formatCageballEventDateAndTime = (date: Date, locale: Locale = nb): string => {
  return `${format(date, "dd. MMM", {
    locale,
  })} kl. ${format(date, "HH:mm", {
    locale,
  })}`;
};
