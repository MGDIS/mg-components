import { configureToMatchImageSnapshot } from 'jest-image-snapshot';
import MutationObserver from 'mutation-observer';
(global as any).MutationObserver = MutationObserver;

/**
 * Global configuration for Image Snapshot
 */
const toMatchImageSnapshot = configureToMatchImageSnapshot({
  dumpInlineDiffToConsole: true,
});

expect.extend({ toMatchImageSnapshot });

// missing JSDom polyfill
// https://github.com/enzymejs/enzyme/issues/374#issuecomment-371823436
global.HTMLInputElement.prototype.checkValidity = jest.fn(() => true);

/**
 * Change Jest Timeout
 */

jest.setTimeout(60000);
