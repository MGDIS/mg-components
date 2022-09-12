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
    transformSource: input => {
      let codeExample = prettier
        .format(input, {
          parser: 'babel',
          plugins: [prettierBabel],
        })
        .replaceAll('="mg__storybook__boolean-true"', '') // Used to remove `=''` in code example
        .slice(0, -2); // use to remove semicolon at code example end. semi: false still display a semicolon at start.}
      // Check if component has a comment to display
      const regex = /mg__storybook__comment="([a-zA-Z0-9:;\.\s\(\)\-\,!\/\\]*)"/gi;
      const match = regex.exec(codeExample);
      // return code example
      return match ? `<>${match[1]}${codeExample.replace(regex, '')}</>` : codeExample;
    },
  },
  options: {
    storySort: {
      order: ['Intro'],
    },
  },
};
