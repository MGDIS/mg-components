/**
 * Format number to the locale currency
 *
 * @param {number} number number to format
 * @param {string} locale locale to apply
 * @param {string} currency currency to apply
 * @returns {string} formatted currency
 */
export const localeCurrency = (number: number, locale: string, currency: string): string => {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(number);
};

/**
 * Format number to locale
 *
 * @param {number} number number to format
 * @param {string} locale locale to apply
 * @returns {string} formatted number
 */
export const localeNumber = (number: number, locale: string): string => {
  return new Intl.NumberFormat(locale).format(number);
};

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
export const localeDate = (date: string, locale: string): string => {
  if (typeof date !== 'string' || date === '' || !dateRegExp.test(date)) {
    return '';
  }
  return new Intl.DateTimeFormat(locale).format(new Date(date));
};

/**
 * Get locale and messages
 * We load the defined locale but for now we only support the first subtag for messages
 *
 * @param {HTMLElement} element element we need to get the language
 * @param {unknown} messages messages to use
 * @param {string} defaultLocale default messages locale
 * @returns {{ locale: string; messages: unknown }} messages object
 */
export const getLocaleMessages = (element: HTMLElement, messages: unknown, defaultLocale: string): { locale: string; messages: unknown } => {
  // Get local
  const closestLangAttribute: HTMLElement = element.closest('[lang]');
  const closestLang: string[] = Intl.NumberFormat.supportedLocalesOf(closestLangAttribute?.lang);
  const locale = closestLang.length > 0 ? closestLang[0] : navigator.language || defaultLocale;
  // Only keep first subtag
  const localeSubtag = locale.split('-').shift();
  // Return
  return {
    locale,
    messages: messages[localeSubtag] || messages[defaultLocale],
  };
};
