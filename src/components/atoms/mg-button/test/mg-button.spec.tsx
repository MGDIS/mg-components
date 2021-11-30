import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgButton } from '../mg-button';
import { variants } from '../mg-button.conf';

const getPage = (args) => newSpecPage({
  components: [MgButton],
  template: () => (<mg-button {...args}>Text button</mg-button>),
});

describe('mg-button', () => {
  describe.each(variants)('Should render an %s button', (variant) => {
    test.each([false, true])('isIcon %s', async (isIcon) => {
      const {root} = await getPage({identifier: 'identifier', variant, isIcon, label:'label'});
      expect(root).toMatchSnapshot();
    });
  });

  test.each(["", "blu", undefined])('Should throw error', async (variant) => {
    try {
      await getPage({variant, label:'label'});
    }
    catch (err){
      expect(err.message).toContain('<mg-button> prop "variant" must be one of : ')
    }
  });

  test.each(["", undefined])('should throw error when using prop "isIcon" without a good prop "label"', async (label) => {
    try {
      await getPage({isIcon:true, label});
    }
    catch (err){
      expect(err.message).toContain('<mg-button> prop "label" is mandatory when prop "isIcon" is set to true.')
    }
  })

  describe('prevent double click', () => {
    test('should disable button after click', async () => {
      const page = await getPage({isIcon:true, label: 'test'});
      const element = page.doc.querySelector('mg-button');
      const button = element.shadowRoot.querySelector('button');

      button.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      await page.waitForChanges();

      expect(button).toHaveAttribute('disabled')
      expect(element.loading).toBeTruthy();
    })

    test.each(['enter', 'space'])('should disable button after keyUp "%s"', async (key) => {
      const page = await getPage({isIcon:true, label: 'test'});
      const element = page.doc.querySelector('mg-button');
      const button = element.shadowRoot.querySelector('button');

      button.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true, key }));
      await page.waitForChanges();

      expect(button).toHaveAttribute('disabled')
      expect(element.loading).toBeTruthy();
    })

    test('should NOT disable button after keyUp "tab"', async () => {
      const page = await getPage({isIcon:true, label: 'test'});
      const element = page.doc.querySelector('mg-button');
      const button = element.shadowRoot.querySelector('button');

      button.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true, key: 'tab' }));
      await page.waitForChanges();

      expect(button).not.toHaveAttribute('disabled')
      expect(element.loading).toBeFalsy();
    })
  })
});
