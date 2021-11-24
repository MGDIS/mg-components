import { locale, currency } from "../locales";

/**
 * Format number to the locale currency
 * @param number {number}
 * @returns {string} formatted currency
 */
export function localeCurrency(number:number):string {
  return new Intl.NumberFormat(locale, {style: "currency", currency}).format(number);
};

/**
 * Locale date format
 * @param date {string}
 * @returns {string} formatted date
 */
export function localeDate(date:string):string {
  const dateRegexp = /\d{4}-\d{2}-\d{2}/;
  if(typeof date !== 'string' || date === '' || !dateRegexp.test(date)) {
    return '';
  }
  return new Intl.DateTimeFormat(locale).format(new Date(date));
}
