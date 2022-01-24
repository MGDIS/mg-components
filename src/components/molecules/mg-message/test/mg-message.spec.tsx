import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgMessage } from '../mg-message';
import { variants } from '../mg-message.conf';

const getDefaultContent = () => (
  <p>
    <strong>Strong</strong> content!
  </p>
);

const getPage = (args, content) =>
  newSpecPage({
    components: [MgMessage],
    template: () => <mg-message {...args}>{content}</mg-message>,
  });

describe('mg-message', () => {
  describe.each(variants)('Should render a %s message', variant => {
    test.each([{ identifier: 'identifier' }, { identifier: 'identifier', closeButton: true }])('with args %s', async args => {
      const { root } = await getPage({ ...args, variant }, getDefaultContent());
      expect(root).toMatchSnapshot();
    });
  });

  test.each(['', 'blu', undefined])('Should throw error with invalid variant property : %s', async variant => {
    try {
      await getPage({ identifier: 'identifier', variant }, getDefaultContent());
    } catch (err) {
      expect(err.message).toMatch('<mg-message> prop "variant" must be one of :');
    }
  });

  test('Should throw error when using prop "close-button" with an action slot', async () => {
    try {
      await getPage({ identifier: 'identifier', closeButton: true }, [
        getDefaultContent(),
        <div slot="actions" class="mg-group-elements mg-group-elements--align-right">
          <mg-button>Primary</mg-button>
          <mg-button variant="secondary">Secondary</mg-button>
        </div>,
      ]);
    } catch (err) {
      expect(err.message).toMatch('<mg-message> prop "close-button" can\'t be used with the actions slot.');
    }
  });

  test('Should hide message on close button', async () => {
    const args = { identifier: 'identifier', closeButton: true };
    const page = await getPage(args, getDefaultContent());

    const element = page.doc.querySelector('mg-message');
    const button = element.shadowRoot.querySelector('mg-button');

    button.dispatchEvent(new CustomEvent('click', { bubbles: true }));
    await page.waitForChanges();

    expect(page.rootInstance.classList.join()).toContain('mg-message--hide');
  });
});
