import { localeCurrency, localeNumber, localeDate } from './locale.utils';

describe('locale.utils', () => {
  describe.each(['en', 'fr'])('locale.utils: %s', locale => {
    describe('localeCurrency', () => {
      test('Should Format number to the locale currency', () => {
        const formatedCurrency = localeCurrency(1234567890.12, locale, 'EUR');
        expect(formatedCurrency).toEqual(locale === 'en' ? '€1,234,567,890.12' : '1 234 567 890,12\xa0€');
      });
    });

    describe('localeNumber', () => {
      test('Should Format number to the locale', () => {
        const formatedCurrency = localeNumber(1234567890.12, locale);
        expect(formatedCurrency).toEqual(locale === 'en' ? '1,234,567,890.12' : '1 234 567 890,12');
      });
    });
    describe('localeDate', () => {
      test.each([undefined, '', 'blu'])('Should return empty string: %s', date => {
        const formatedDate = localeDate(date, locale);
        expect(formatedDate).toEqual('');
      });

      test('Should return formated date', () => {
        const formatedDate = localeDate('2022-06-02', locale);
        expect(formatedDate).toEqual(locale === 'en' ? '6/2/2022' : '02/06/2022');
      });
    });
  });
});
