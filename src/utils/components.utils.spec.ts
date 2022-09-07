import { createID, ClassList, allItemsAreString, isHn } from './components.utils';

describe('components.utils', () => {
  describe('createID', () => {
    test.each([undefined, '', 'blu'])('Should generate a prefixed ID if defined : %s', prefix => {
      const id = createID(prefix);
      let regexp = /^[a-z0-9]{10}$/;
      if (prefix !== undefined && prefix !== '') {
        regexp = new RegExp(`^${prefix}-[a-z0-9]{10}$`);
      }
      expect(id).toMatch(regexp);
    });
  });

  describe('ClassList', () => {
    test('Should add classes to list', () => {
      const classList = new ClassList();
      expect(classList.classes).toEqual([]);
      classList.add('blu');
      expect(classList.classes).toEqual(['blu']);
      classList.add('bli');
      expect(classList.classes).toEqual(['blu', 'bli']);
      // Should not add classes if already in list
      classList.add('blu');
      expect(classList.classes).toEqual(['blu', 'bli']);
    });

    test('Should delete classes from list', () => {
      const classList = new ClassList(['blu', 'bli']);
      classList.delete('blu');
      expect(classList.classes).toEqual(['bli']);
      // List doesn't change if class name doesn't existe in list
      classList.delete('bla');
      expect(classList.classes).toEqual(['bli']);
    });

    test('Should check if class already in list', () => {
      const classList = new ClassList(['blu']);
      expect(classList.has('blu')).toBeTruthy();
      expect(classList.has('bli')).toBeFalsy();
    });

    test('Should return seperated space classes list', () => {
      const classList = new ClassList(['blu', 'bli']);
      expect(classList.join()).toEqual('blu bli');
    });
  });

  describe('allItemsAreString', () => {
    test.each([
      { items: ['blu', 'bli', 'blo', 'bla'], expected: true },
      { items: ['blu', 'bli', 'blo', { value: 'bla' }], expected: false },
    ])('Should test if all otems are string: %s', ({ items, expected }) => {
      expect(allItemsAreString(items as string[])).toEqual(expected);
    });
  });

  describe('isHn', () => {
    test.each([
      { querySelector: 'h1', expected: true },
      { querySelector: 'span', expected: false },
      { querySelector: 'blu', expected: false },
    ])('Should test if all otems are string: %s', ({ querySelector, expected }) => {
      const div = document.createElement('div');
      div.innerHTML = '<h1></h1><span></span>';
      const elm = div.querySelector(querySelector);
      expect(isHn(elm as HTMLElement)).toEqual(expected);
    });
  });
});
