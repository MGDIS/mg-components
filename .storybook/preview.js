import { extractArgTypes, extractComponentDescription, setStencilDocJson } from '@pxtrn/storybook-addon-docs-stencil';
import { defineCustomElements } from '../dist/esm/loader';
import docJson from './docs/components.json';
import '!style-loader!css-loader!sass-loader!../src/global/variables.scss';

defineCustomElements();
setStencilDocJson(docJson);

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    extractArgTypes,
    extractComponentDescription,
  },
};
