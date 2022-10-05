import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgButton } from '../../../atoms/mg-button/mg-button';
import { MgModal } from '../mg-modal';

const getPage = (args, slots?) =>
  newSpecPage({
    components: [MgModal, MgButton],
    template: () => (
      <mg-modal {...args}>
        {slots?.content && (
          <p slot="content">
            <strong>Strong</strong> content!
          </p>
        )}
        {slots?.actions && (
          <div slot="actions" class="mg-group-elements mg-group-elements--align-right">
            <mg-button identifier="identifier">Primary</mg-button>
            <mg-button variant="secondary" identifier="identifier">
              Secondary
            </mg-button>
          </div>
        )}
      </mg-modal>
    ),
  });

describe('mg-modal', () => {
  describe.each([undefined, { content: true }, { actions: true }, { content: true, actions: true }])('Should render a modal', slots => {
    test.each([
      { modalTitle: 'Modal Title', identifier: 'identifier' },
      { modalTitle: 'Modal Title', identifier: 'identifier', closeButton: true },
      { modalTitle: 'Modal Title', identifier: 'identifier', closeButton: true, hide: true },
      { modalTitle: 'Modal Title', identifier: 'identifier', closeButton: true, lang: 'fr' },
      { modalTitle: 'Modal Title', identifier: 'identifier', closeButton: true, lang: 'xx' },
    ])('with args %s', async args => {
      const { root } = await getPage({ ...args }, slots);
      expect(root).toMatchSnapshot();
    });
  });

  test.each(['', ' ', undefined])('Should not render with invalid modalTitle property: %s', async modalTitle => {
    // TODO on 5.0.0 move back to throw new Error test (replace content with commented test)
    // expect.assertions(1);
    // try {
    //   await getPage({ modalTitle });
    // } catch (err) {
    //   expect(err.message).toMatch('<mg-modal> prop "modalTitle" is required.');
    // }
    console.error = jest.fn();
    await getPage({ modalTitle });
    expect(console.error).toHaveBeenCalledWith('<mg-modal> prop "modalTitle" is required.');
  });

  describe('navigation', () => {
    test('should hide panel with button', async () => {
      const page = await getPage({ modalTitle: 'Modal Title', identifier: 'identifier', closeButton: true });
      const closeButton = page.root.shadowRoot.querySelector('#identifier-close-button');

      expect(page.root).toMatchSnapshot();

      const spy = jest.spyOn(page.rootInstance.componentHide, 'emit');

      closeButton.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();
      expect(spy).toHaveBeenCalled();
    });
    test.each([true, false])('should hide panel with escape keyboard', async closeButton => {
      const page = await getPage({ modalTitle: 'Modal Title', identifier: 'identifier', closeButton });
      expect(page.root).toMatchSnapshot();

      const spy = jest.spyOn(page.rootInstance.componentHide, 'emit');

      page.win.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();
      if (closeButton) {
        expect(spy).toHaveBeenCalled();
      } else {
        expect(spy).not.toHaveBeenCalled();
      }
    });
  });
});
