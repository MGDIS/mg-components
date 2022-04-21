import { configureToMatchImageSnapshot } from 'jest-image-snapshot';

/**
 * Global configuration for Image Snapshot
 */
const toMatchImageSnapshot = configureToMatchImageSnapshot({
  // customDiffConfig: { threshold: 0.3 },
  // failureThreshold: 0.05,
  failureThresholdType: 'percent',
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
