/* eslint-disable @typescript-eslint/no-explicit-any */
import { newE2EPage, E2EPage } from '@stencil/core/testing';
import { Page as PuppeteerPage } from 'puppeteer';

export type DesignSystemE2EPage = E2EPage & Pick<PuppeteerPage, 'screenshot' | 'viewport'>;

/**
 * Create E2E page
 *
 * @param {string} htmlString html to render
 * @returns {Promise<DesignSystemE2EPage>} page
 */
export async function createPage(htmlString?: string): Promise<DesignSystemE2EPage> {
  const defaultSize = 600;
  const page = (await newE2EPage()) as DesignSystemE2EPage;
  await page.setViewport({ width: defaultSize, height: defaultSize });
  await page.setContent(`<link rel="stylesheet" href="http://localhost:3333/build/variables.css" /><meta charset="UTF-8">${htmlString}`, { waitUntil: 'networkidle0' });
  await page.evaluateHandle('document.fonts.ready');

  // monkey patch screenshot function to add some extra features
  const screenshot = page.screenshot;
  page.screenshot = async () => {
    let width = page.viewport().width;
    let height = page.viewport().height;
    // if viewport has not been redefined
    if (page.viewport().width === defaultSize && page.viewport().height === defaultSize) {
      const htmlElement = await page.$('html');
      const boundingBox = await htmlElement.boundingBox();
      width = Math.round(boundingBox.width);
      height = Math.round(boundingBox.height);
    }

    return screenshot.call(page, {
      clip: { x: 0, y: 0, width, height },
    });
  };

  return page;
}

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
export const setupMutationObserverMock = ({ disconnect = () => null, observe = (_target: any, _options: any) => null, takeRecords = () => [] } = {}) => {
  class MockMutationObserver implements MutationObserver {
    disconnect: () => void = disconnect;
    observe: (target: Node, options?: MutationObserverInit) => void = observe;
    takeRecords: () => MutationRecord[] = takeRecords;
    cb: () => any;
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
