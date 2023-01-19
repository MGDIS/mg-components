import { initLocales } from '.';
import messagesEn from './en/messages.json';
import messagesFr from './fr/messages.json';

describe('locales', () => {
  describe('initLocales', () => {
    test('Should return default locale', () => {
      const locales = initLocales(document.createElement('div'));
      expect(locales.locale).toEqual('en');
      expect(locales.messages).toMatchObject(messagesEn);
    });

    test('Should return matching locale', () => {
      const div = document.createElement('div');
      div.lang = 'fr-FR';
      const locales = initLocales(div);
      expect(locales.locale).toEqual(div.lang);
      expect(locales.messages).toMatchObject(messagesFr);
    });

    test('Should return default locale messages when requested does not exist', () => {
      const div = document.createElement('div');
      div.lang = 'ca';
      const locales = initLocales(div);
      expect(locales.locale).toEqual(div.lang);
      expect(locales.messages).toMatchObject(messagesEn);
    });
  });
});
