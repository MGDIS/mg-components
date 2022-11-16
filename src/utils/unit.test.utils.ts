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
 * mock the resize observer, but its methods.
 * You can manually fire an intersection entry:
 * @param {Function} mutationObserverMock.disconnect disconnect function
 * @param {Function} mutationObserverMock.observe observe fnuction
 * @param {Function} mutationObserverMock.takeRecords takeRecords fnuction
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
export const setupMutationObserverMock = ({ disconnect, observe, takeRecords }) => {
  class MockMutationObserver implements MutationObserver {
    disconnect: () => void = disconnect;
    observe: (target: Node, options?: MutationObserverInit) => void = observe;
    takeRecords: () => MutationRecord[] = takeRecords;
    cb: () => unknown;
    constructor(fn) {
      this.cb = fn;
    }
  }

  Object.defineProperty(window, 'MutationObserver', {
    writable: true,
    configurable: true,
    value: MockMutationObserver,
  });

  Object.defineProperty(global, 'MutationObserver', {
    writable: true,
    configurable: true,
    value: MockMutationObserver,
  });

  return MockMutationObserver;
};
