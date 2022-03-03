import { locale, currency } from '../locales';

/**
 * Format number to the locale currency
 * @param number {number}
 * @returns {string} formatted currency
 */
export function localeCurrency(number: number): string {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(number);
}

/**
 * Format number to locale
 * @param number {number}
 * @returns {string} formatted number
 */
export function localeNumber(number: number): string {
  return new Intl.NumberFormat(locale).format(number);
}

export const dateRegexp = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

/**
 * Locale date format
 * @param date {string}
 * @returns {string} formatted date
 */
export function localeDate(date: string): string {
  if (typeof date !== 'string' || date === '' || !dateRegexp.test(date)) {
    return '';
  }
  return new Intl.DateTimeFormat(locale).format(new Date(date));
}
