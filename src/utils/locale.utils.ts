/**
 * Format number to the locale currency
 *
 * @param {number} number number to format
 * @param {string} locale locale to apply
 * @param {string} currency currency to apply
 * @returns {string} formatted currency
 */
export function localeCurrency(number: number, locale: string, currency: string): string {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(number);
}

/**
 * Format number to locale
 *
 * @param {number} number number to format
 * @param {string} locale locale to apply
 * @returns {string} formatted number
 */
export function localeNumber(number: number, locale: string): string {
  return new Intl.NumberFormat(locale).format(number);
}

/**
 * Date RegExp
 */
export const dateRegExp = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

/**
 * Locale date format
 *
 * @param {string} date date to format
 * @param {string} locale locale to apply
 * @returns {string} formatted date
 */
export function localeDate(date: string, locale: string): string {
  if (typeof date !== 'string' || date === '' || !dateRegExp.test(date)) {
    return '';
  }
  return new Intl.DateTimeFormat(locale).format(new Date(date));
}
