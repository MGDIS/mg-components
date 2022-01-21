import { localeCurrency, localeNumber, localeDate } from './locale.utils';

describe('locale.utils', () => {
  describe('localeCurrency', () => {
    test('Should Format number to the locale currency', () => {
      const formatedCurrency = localeCurrency(1234567890.12);
      expect(formatedCurrency).toEqual('1 234 567 890,12\xa0€');
    });
  });

  describe('localeNumber', () => {
    test('Should Format number to the locale', () => {
      const formatedCurrency = localeNumber(1234567890.12);
      expect(formatedCurrency).toEqual('1 234 567 890,12');
    });
  });
  describe('localeDate', () => {
    test.each([undefined, '', 'blu'])('Should return empty string : %s', date => {
      const formatedDate = localeDate(date);
      expect(formatedDate).toEqual('');
    });

    test('Should return formated date', () => {
      const formatedDate = localeDate('2021-10-14');
      expect(formatedDate).toEqual('14/10/2021');
    });
  });
});
