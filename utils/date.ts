import { format, getDate, getISOWeek, Locale, setDate, startOfWeek } from "date-fns";
import { nb } from "date-fns/locale";

type DayString = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";

export const getNextWeekNumber = (): number => {
  const today = new Date();

  const monday = startOfWeek(today, { weekStartsOn: 1 });
  monday.setDate(monday.getDate() + 7);

  return getISOWeek(monday);
};

export const formatYmd = (date: Date, locale: Locale = nb): string => format(date, "yyyy-MM-dd", { locale });

const getDayOfWeekFromString = (day: DayString): number => {
  switch (day) {
    case "monday":
      return 0;
    case "tuesday":
      return 1;
    case "wednesday":
      return 2;
    case "thursday":
      return 3;
    case "friday":
      return 4;
    case "saturday":
      return 5;
    case "sunday":
      return 6;
    default:
      return 0;
  }
};

export const dateNextWeek = (dayOfWeek: DayString, weekNumber?: number, locale: Locale = nb): Date => {
  const date = new Date();
  let daysToAdd = 7;

  const nextWeek = getISOWeek(new Date()) + 1;

  if (weekNumber > nextWeek) {
    const extraDays = (weekNumber - nextWeek) * 7;
    daysToAdd = daysToAdd + extraDays;
  }

  const monday = startOfWeek(date, { weekStartsOn: 1, locale });

  const dateNextWeek = setDate(monday, getDate(monday) + daysToAdd + getDayOfWeekFromString(dayOfWeek));

  return dateNextWeek;
};

export const formatCageballEventDay = (date: Date, locale: Locale = nb): string => {
  return format(date, "EEEE", {
    locale,
  });
};

export const formatCageballEventDate = (date: Date, locale: Locale = nb): string => {
  return format(date, "dd. MMM", {
    locale,
  });
};

export const formatCageballEventTime = (date: Date, locale: Locale = nb): string => {
  return format(date, "HH:mm", {
    locale,
  });
};

export const formatCageballEventDateAndTime = (date: Date, locale: Locale = nb): string => {
  return `${formatCageballEventDate(date, locale)} kl. ${formatCageballEventTime(date, locale)}`;
};
