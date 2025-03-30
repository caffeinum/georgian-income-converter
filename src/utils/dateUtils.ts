
import { format, parse } from "date-fns";

export const formatDateForDisplay = (date: Date): string => {
  return format(date, "dd/MM/yyyy");
};

export const formatDateForAPI = (date: Date): string => {
  return format(date, "yyyy-MM-dd");
};

export const parseAPIDate = (dateString: string): Date => {
  return parse(dateString, "yyyy-MM-dd", new Date());
};

export const parseDisplayDate = (dateString: string): Date => {
  return parse(dateString, "dd/MM/yyyy", new Date());
};

export const getCurrentMonth = (): string => {
  return format(new Date(), "MMMM yyyy");
};

export const isDateInCurrentMonth = (date: Date): boolean => {
  const now = new Date();
  return date.getMonth() === now.getMonth() && 
         date.getFullYear() === now.getFullYear();
};
