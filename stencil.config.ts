import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'design-system',
  globalStyle: 'src/global/global.scss',
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
        src:'global/variables.scss', // export variable in a seperate file for component inside another framework
      }]
    },
    {
      type: 'dist-custom-elements-bundle',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
  plugins: [
    sass()
  ]
};
