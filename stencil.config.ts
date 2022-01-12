import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'mg-components',
  globalStyle: 'src/styles/global.scss',
  buildEs5: true,
  extras: {
    cssVarsShim: true,
    shadowDomShim: true,
  },
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
      copy: [{
        src:'styles/variables.scss', dest: 'variables.scss' // export variable in a seperate file for component inside another framework
      },
      {
        src:'styles/fonts', dest: 'fonts' // export fonts
      }]
    },
    {
      type: 'dist-custom-elements',
      autoDefineCustomElements: true,
    },
    {
      type: 'docs-json',
      file: '.storybook/docs/components.json'
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
      copy: [{
        src:'styles/fonts', dest: 'build/fonts', // export fonts for working space
      }]
    },
  ],
  plugins: [
    sass()
  ],
  testing: {
    collectCoverage: true,
    reporters: ['default', 'jest-junit'],
    /**
     * Gitlab CI doesn't allow sandbox, therefor this parameters must be passed to your Headless Chrome
     * before it can run your tests
     */
    browserArgs: ['--no-sandbox', '--disable-setuid-sandbox'],
    setupFilesAfterEnv: ['./jest.setup.ts'],
    // browserHeadless: false
  }
};
