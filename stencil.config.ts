import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'design-system',
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
        src:'styles/variables.scss', // export variable in a seperate file for component inside another framework
      },
      {
        src:'styles/fonts', // export fonts
      }]
    },
    {
      type: 'dist-custom-elements-bundle',
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
};
