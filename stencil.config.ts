import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'mg-components',
  globalStyle: 'src/styles/global.scss',
  devServer: {
    openBrowser: false,
  },
  tsconfig: 'tsconfig.prod.json',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
      copy: [
        {
          src: 'styles/variables.css',
          dest: 'variables.css', // export variable in a seperate file for component inside another framework
        },
        {
          src: 'styles/**/*.scss',
          dest: './styles', // export variable in a seperate file for component inside another framework
        },
        {
          src: 'styles/fonts',
          dest: 'fonts', // export fonts
        },
        {
          src: 'locales/en',
          dest: 'locales/en',
        },
        {
          src: 'locales/fr',
          dest: 'locales/fr',
        },
      ],
    },
    {
      type: 'dist-custom-elements',
      autoDefineCustomElements: true,
    },
    {
      type: 'docs-json',
      file: '.storybook/docs/components.json',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
      copy: [
        {
          src: 'iframe.html',
        },
        {
          src: 'styles/variables.css',
          dest: 'build/variables.css', // export variable for working space
        },
        {
          src: 'styles/fonts',
          dest: 'build/fonts', // export fonts for working space
        },
      ],
    },
  ],
  plugins: [sass()],
  testing: {
    timers: 'fake',
    collectCoverage: true,
    reporters: ['default', 'jest-junit'],
    /**
     * Gitlab CI doesn't allow sandbox, therefor this parameters must be passed to your Headless Chrome
     * before it can run your tests
     */
    browserArgs: ['--no-sandbox', '--disable-setuid-sandbox'],
    setupFilesAfterEnv: ['./jest.setup.ts'],
    // browserHeadless: false
  },
};
