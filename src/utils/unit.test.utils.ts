/**
 * Clone Deep function
 *
 * @param {unknown} obj object to clone
 * @returns {unknown} cloned json
 */
export const cloneDeep = (obj: unknown): unknown => JSON.parse(JSON.stringify(obj));

/**
 * Utility function that mocks the `MutationObserver` API. Recommended to execute inside `beforeEach`.
 *
 * @param mutationObserverMock - Parameter that is sent to the `Object.defineProperty`
 * overwrite method. `jest.fn()` mock functions can be passed here if the goal is to not only
 * mock the mutation observer, but its methods.
 * You can manually fire an intersection entry:
 * @param {Function} mutationObserverMock.disconnect disconnect function
 * @param {Function} mutationObserverMock.observe observe function
 * @param {Function} mutationObserverMock.takeRecords takeRecords function
 * @returns {MutationObserver} Mocked MutationObserver
 * @example
 * ```
 * let fireMo;
 * setupMutationObserverMock({
 *   observe: function () {
 *     fireMo = this.cb;
 *   },
 * });
 * ...
 * fireMo([{ type: 'childList', addedNodes: [AMockElemenet, AnotherMockElemenet], target: yourMockElemenet }]);;
 * ```
 */
type SetupMutationObserverMockParams = { disconnect: MutationObserver['disconnect']; observe: MutationObserver['observe']; takeRecords: MutationObserver['takeRecords'] };
export const setupMutationObserverMock = ({ disconnect, observe, takeRecords }: SetupMutationObserverMockParams): typeof MutationObserver => {
  class MockMutationObserver implements MutationObserver {
    disconnect: () => void = disconnect;
    observe: (target: Node, options?: MutationObserverInit) => void = observe;
    takeRecords: () => MutationRecord[] = takeRecords;
    cb: () => unknown;
    constructor(fn) {
      this.cb = fn;
    }
  }

  [window, global].forEach(element => {
    Object.defineProperty(element, 'MutationObserver', {
      writable: true,
      configurable: true,
      value: MockMutationObserver,
    });
  });

  return MockMutationObserver;
};

/**
 * Utility function that mocks the `ResizeObserver` API. Recommended to execute inside `beforeEach`.
 *
 * @param resizeObserverMock - Parameter that is sent to the `Object.defineProperty`
 * overwrite method. `jest.fn()` mock functions can be passed here if the goal is to not only
 * mock the resize observer, but its methods.
 * You can manually fire an intersection entry:
 * @param {Function} resizeObserverMock.disconnect disconnect function
 * @param {Function} resizeObserverMock.observe observe function
 * @returns {ResizeObserver} Mocked ResizeObserver
 * @example
 * ```
 * let fireMo;
 * setupResizeObserverMock({
 *   observe: function () {
 *     fireMo = this.cb;
 *   },
 * });
 * ...
 * fireMo([{
 *  borderBoxSize: ResizeObserverSize[],
 *  contentBoxSize: ResizeObserverSize[],
 *  contentRect: DOMRectReadOnly,
 *  devicePixelContentBoxSize: ResizeObserverSize[],
 *  target: yourMockElemenet
 * }]);;
 * ```
 */
type setupResizeObserverMockParams = { disconnect: ResizeObserver['disconnect']; observe: ResizeObserver['observe'] };
export const setupResizeObserverMock = ({ disconnect, observe }: setupResizeObserverMockParams): typeof ResizeObserver => {
  class MockResizeObserver implements ResizeObserver {
    disconnect: () => void = disconnect;
    observe: (target: Element, options?: ResizeObserverOptions) => void = observe;
    unobserve: () => void;
    cb: () => unknown;
    constructor(fn) {
      this.cb = fn;
    }
  }

  [window, global].forEach(element => {
    Object.defineProperty(element, 'ResizeObserver', {
      writable: true,
      configurable: true,
      value: MockResizeObserver,
    });
  });

  return MockResizeObserver;
};

/**
 * force popover id when component use randomed identifier
 *
 * @param {Element} item element wich include mg-popover
 * @param {string} id new fixed id
 * @returns {void}
 */
export const forcePopoverId = (item: Element, id: string): void => {
  const popover = item.shadowRoot.querySelector('mg-popover');
  if (popover !== null) {
    popover.shadowRoot.querySelector('.mg-popover').setAttribute('id', id);
    item.shadowRoot.querySelector('button').setAttribute('aria-controls', id);
  }
};
