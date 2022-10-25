import en from './en/messages.json';
import fr from './fr/messages.json';

const defaultLocale = 'en';
const messages = { en, fr };

/**
 * Get locale
 *
 * @param {HTMLElement} element element that needs to know the locale to use
 * @returns {string} locale
 */
const getLocale = (element: HTMLElement): string => {
  // validate locale
  const closestLang = Intl.ListFormat.supportedLocalesOf((element.closest('[lang]') as HTMLElement)?.lang);
  return closestLang.length > 0 ? closestLang[0] : navigator.language || defaultLocale;
};

/**
 * Get Intl object
 * We load the defined locale but for now we only support the first subtag for messages
 *
 * @param {HTMLElement} element element we need to get the language
 * @returns {{ locale: string; messages: unknown }} messages object
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const initLocales = (element: HTMLElement): { locale: string; messages: any } => {
  // Get local
  const locale = getLocale(element);
  // Only keep first subtag
  const localeSubtag = locale.split('-').shift();
  // Return
  return {
    locale,
    messages: messages[localeSubtag] || messages[defaultLocale],
  };
};
