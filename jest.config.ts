import { Config } from '@stencil/core';

export const config: Config = {
  testing: {
    collectCoverage: true,
    /**
     * Gitlab CI doesn't allow sandbox, therefor this parameters must be passed to your Headless Chrome
     * before it can run your tests
     */
    browserArgs: ['--no-sandbox', '--disable-setuid-sandbox'],
  }
};
