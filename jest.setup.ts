import { configureToMatchImageSnapshot } from 'jest-image-snapshot';

/**
 * Global configuration for Image Snapshot
 */
const toMatchImageSnapshot = configureToMatchImageSnapshot({
  customDiffConfig: { threshold: 0.3 },
  failureThreshold: 0.025,
  failureThresholdType: 'percent',
  dumpInlineDiffToConsole: true,
})

expect.extend({ toMatchImageSnapshot });

/**
 * Change Jest Timeout
 */

 jest.setTimeout(60000)
