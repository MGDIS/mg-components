import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgButton } from '../mg-button';
import { MgBadge } from '../../mg-badge/mg-badge';
import { variants } from '../mg-button.conf';

const getPage = (args, content = 'Text button') =>
  newSpecPage({
    components: [MgButton, MgBadge],
    template: () => <mg-button {...args}>{content}</mg-button>,
  });

describe('mg-button', () => {
  describe.each(variants)('Should render an %s button', variant => {
    test.each([false, true])('isIcon %s', async isIcon => {
      const { root } = await getPage({ identifier: 'identifier', variant, isIcon, label: 'label' });
      expect(root).toMatchSnapshot();
    });
  });

  test.each(['', 'blu', undefined])('Should throw error', async variant => {
    try {
      await getPage({ variant });
    } catch (err) {
      expect(err.message).toContain('<mg-button> prop "variant" must be one of : ');
    }
  });

  test.each(['primary', 'secondary', 'info'])('Should throw error, case mg-button use same variant on mg-badge', async variant => {
    try {
      await getPage(
        { variant },
        <span>
          content<mg-badge variant={variant}></mg-badge>
        </span>,
      );
    } catch (err) {
      expect(err.message).toContain('<mg-button> prop "variant" cannot be the same as child mg-badge variant');
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
