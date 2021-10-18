import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgHelpText } from '../mg-help-text';

const getPage = (args, slot) => newSpecPage({
  components: [MgHelpText],
  template: () => (<mg-help-text {...args}>{...slot}</mg-help-text>),
});

describe('mg-help-text',()=> {

  describe.each(['Simple help text.', 'Help text with html <strong>bold</strong>, <em>italic</em>.'])('Should render text : %s', (helpText) => {
    test.each([undefined, 'blu'])('renders', async (identifier) => {
      const { root } = await getPage({identifier}, helpText);
      expect(root).toMatchSnapshot();
    });
  });

});

