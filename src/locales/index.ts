import en from './en/messages.json';
import fr from './fr/messages.json';
import { getLocaleMessages } from '../utils/locale.utils';

const defaultLocale = 'en';
const messages = { en, fr };

/**
 * Get Intl object
 *
 * @param {HTMLElement} element element we need to get the language
 * @returns {{ locale: string; messages: unknown }} messages object
 */
export const initLocales = (element: HTMLElement): { locale: string; messages: unknown } => getLocaleMessages(element, messages, defaultLocale);
