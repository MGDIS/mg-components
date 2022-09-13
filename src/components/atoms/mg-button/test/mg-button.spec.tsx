import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgButton } from '../mg-button';
import { variants, buttonTypes } from '../mg-button.conf';

const getPage = (args, content = 'Text button') =>
  newSpecPage({
    components: [MgButton],
    template: () => <mg-button {...args}>{content}</mg-button>,
  });

describe('mg-button', () => {
  describe.each(variants)('Should render an %s button', variant => {
    test.each([false, true])('isIcon %s', async isIcon => {
      const { root } = await getPage({ identifier: 'identifier', variant, isIcon, label: 'label' });
      expect(root).toMatchSnapshot();
    });
  });

  test.each([false, true])('Should render a button, case expanded %s', async expanded => {
    const { root } = await getPage({ identifier: 'identifier', label: 'label', expanded });
    expect(root).toMatchSnapshot();
  });

  test('Should render a button, case controls', async () => {
    const { root } = await getPage({ identifier: 'identifier', label: 'label', controls: 'element-controlled' });
    expect(root).toMatchSnapshot();
  });

  test.each([true, false])('Should render a button, case haspopup %s', async haspopup => {
    const { root } = await getPage({ identifier: 'identifier', label: 'label', haspopup });
    expect(root).toMatchSnapshot();
  });

  test.each(buttonTypes)('Should render a button, case type %s', async type => {
    const { root } = await getPage({ identifier: 'identifier', label: 'label', type });
    expect(root).toMatchSnapshot();
  });

  test('Should replace classes on variant changes', async () => {
    const page = await getPage({ identifier: 'identifier', variant: 'primary', label: 'label' });
    const element = page.doc.querySelector('mg-button');
    let classPrimary = element.querySelector('.mg-button--primary');

    expect(classPrimary).not.toBeNull();

    // Change variant
    element.variant = 'danger';
    await page.waitForChanges();

    classPrimary = element.querySelector('.mg-button--primary');
    const classDanger = element.querySelector('.mg-button--danger');

    expect(classPrimary).toBeNull();
    expect(classDanger).not.toBeNull();
  });

  test.each(['', 'blu', undefined])('Should throw error', async variant => {
    try {
      await getPage({ variant });
    } catch (err) {
      expect(err.message).toContain('<mg-button> prop "variant" must be one of : ');
    }
  });

  test.each(['', undefined])('should throw error when using prop "isIcon" without a good prop "label"', async label => {
    try {
      await getPage({ isIcon: true, label });
    } catch (err) {
      expect(err.message).toContain('<mg-button> prop "label" is mandatory when prop "isIcon" is set to true.');
    }
  });

  describe('prevent double click', () => {
    test('should NOT disable button after click', async () => {
      const page = await getPage({ identifier: 'identifier' });
      const element = page.doc.querySelector('mg-button');
      const button = element.querySelector('button');

      expect(page.root).toMatchSnapshot();

      button.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();

      page.rootInstance.disabled = true;

      expect(page.root).toMatchSnapshot();
    });

    test('should disable button after click', async () => {
      const page = await getPage({ identifier: 'identifier', disableOnClick: true });
      const element = page.doc.querySelector('mg-button');
      const button = element.querySelector('button');

      expect(page.root).toMatchSnapshot();

      button.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();

      page.rootInstance.disabled = false;
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();
    });

    test('should not have fn when disabled', async () => {
      const page = await getPage({
        identifier: 'identifier',
        disabled: true,
        onClick: () => {
          return false;
        },
      });

      expect(page.root).toMatchSnapshot();
    });
  });
});
