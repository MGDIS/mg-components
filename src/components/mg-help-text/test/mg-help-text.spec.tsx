import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgHelpText } from '../mg-help-text';

const getPage = (args, slot) => newSpecPage({
  components: [MgHelpText],
  template: () => (<mg-help-text {...args}>{...slot}</mg-help-text>),
});

describe('mg-help-text',()=> {

  describe.each(['Simple help text.', 'Help text with <a href="https://www.exemple.com">a link</a>, a <strong>bold text</strong> and <em>an italic one</em>.'])('Should render text : %s', (helpText) => {
    test.each([undefined, 'blu'])('renders', async (reference) => {
      const { root } = await getPage({reference}, helpText);
      expect(root).toMatchSnapshot();
    });
  });

});

