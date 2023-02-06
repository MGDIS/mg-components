import { createID, ClassList, allItemsAreString, isTagName, getWindows } from './components.utils';

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
      expect(classList.has('blu')).toEqual(true);
      expect(classList.has('bli')).toEqual(false);
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

  describe('isTagName', () => {
    test.each([
      { querySelector: 'h1', expected: true },
      { querySelector: 'span', expected: false },
      { querySelector: 'blu', expected: false },
    ])('Should test if all otems are string: %s', ({ querySelector, expected }) => {
      const div = document.createElement('div');
      div.innerHTML = '<h1></h1><span></span>';
      const elm = div.querySelector(querySelector);
      expect(isTagName(elm as HTMLElement, ['h1'])).toEqual(expected);
    });
  });

  describe('getWindows', () => {
    const mockWindowFramesLength = jest.fn();
    const mockWindowIndexZero = jest.fn();
    Object.defineProperty(window, 'frames', {
      value: {
        get length() {
          return mockWindowFramesLength();
        },
        get 0() {
          return mockWindowIndexZero();
        },
      },
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test('Should return the window in an array', () => {
      mockWindowFramesLength.mockReturnValue(0);
      const localWindow: Window = window;
      const windows: Window[] = getWindows(localWindow);
      expect(windows).toHaveLength(1);
      expect(windows[0]).toEqual(localWindow);
    });

    test('Should return the window with a parent', () => {
      mockWindowFramesLength.mockReturnValue(0);
      const spyWindowSelf = jest.spyOn(window, 'self', 'get').mockImplementationOnce(jest.fn());
      const spyWindowParent = jest.spyOn(window, 'parent', 'get').mockImplementationOnce(() => window);

      const windows = getWindows(window);
      expect(windows).toHaveLength(2);
      expect(spyWindowSelf).toBeCalledTimes(2);
      expect(spyWindowParent).toBeCalledTimes(1);
    });

    test('Should return the window with a child', () => {
      mockWindowFramesLength.mockReturnValueOnce(1).mockReturnValueOnce(1).mockReturnValue(0);
      mockWindowIndexZero.mockReturnValueOnce(window);
      const windows = getWindows(window);
      expect(windows).toHaveLength(2);
    });

    test('Should throw an error when cannot access top parent window', () => {
      mockWindowFramesLength.mockReturnValue(0);
      const spyConsole = jest.spyOn(console, 'error');
      const spyWindowSelf = jest.spyOn(window, 'self', 'get').mockImplementationOnce(jest.fn());
      const spyWindowParent = jest.spyOn(window, 'parent', 'get').mockImplementationOnce(() => {
        throw new Error('non');
      });
      const localWindow: Window = window;
      const windows: Window[] = getWindows(localWindow);
      expect(windows).toHaveLength(1);
      expect(windows[0]).toEqual(localWindow);
      expect(spyConsole).toBeCalledTimes(1);
      expect(spyWindowSelf).toBeCalledTimes(1);
      expect(spyWindowParent).toBeCalledTimes(1);
    });
  });
});
