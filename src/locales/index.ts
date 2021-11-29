// TODO ADD POSSIBILITY TO CHANGE LOCALE
const availableLocales = ['fr-FR'];

export const locale = availableLocales[0];

export const messages = require(`./${locale}/messages.json`);

export const currency = 'EUR';

