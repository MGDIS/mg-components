import { extractArgTypes, extractComponentDescription, setStencilDocJson } from '@pxtrn/storybook-addon-docs-stencil';
import { defineCustomElements } from '../dist/esm/loader';
import prettier from 'prettier/standalone';
import prettierBabel from 'prettier/parser-babel';
import docJson from './docs/components.json';
import '!style-loader!css-loader!sass-loader!../src/styles/global.scss';
import '!style-loader!css-loader!sass-loader!./demo.scss';

defineCustomElements();
setStencilDocJson(docJson);

export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    extractArgTypes,
    extractComponentDescription,
    transformSource: input =>
      prettier
        .format(input, {
          parser: 'babel',
          plugins: [prettierBabel],
        })
        .replaceAll('="mg__storybook__filter"', '') // Used to remove `=''` in code example
        .slice(0, -2), // use to remove semicolon at code example end. semi: false still display a semicolon at start.
  },
  options: {
    storySort: {
      order: ['Intro'],
    },
  },
};
