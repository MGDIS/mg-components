import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgBadge } from '../mg-badge';
import { variants } from '../mg-badge.conf';

const getPage = args =>
  newSpecPage({
    components: [MgBadge],
    template: () => <mg-badge {...args}></mg-badge>,
  });

describe('mg-badge', () => {
  describe.each(variants)('variant %s', variant => {
    test.each([true, false])('outiline %s', async outline => {
      const { root } = await getPage({ variant, outline, value: 1, label: 'Batman' });
      expect(root).toMatchSnapshot();
    });
  });

  test.each([1, 100, '!', '?'])('value %s', async value => {
    const { root } = await getPage({ value, label: 'Batman' });
    expect(root).toMatchSnapshot();
  });

  test('Should replace classes on variant/ouline changes', async () => {
    const page = await getPage({ value: 1, label: 'Blu' });
    const element = page.doc.querySelector('mg-badge');
    let classInfo = element.shadowRoot.querySelector('.mg-badge--info');
    let classOutline = element.shadowRoot.querySelector('.mg-badge--outline');

    expect(classInfo).not.toBeNull();
    expect(classOutline).toBeNull();

    // Change variant
    element.variant = 'danger';
    await page.waitForChanges();

    classInfo = element.shadowRoot.querySelector('.mg-badge--info');
    const classDanger = element.shadowRoot.querySelector('.mg-badge--danger');

    expect(classInfo).toBeNull();
    expect(classDanger).not.toBeNull();

    // Change outline
    element.outline = true;
    await page.waitForChanges();

    classOutline = element.shadowRoot.querySelector('.mg-badge--outline');
    expect(classOutline).not.toBeNull();
  });

  describe('errors', () => {
    test.each(['', ' ', undefined])('Should throw error, case invalid label prop', async label => {
      expect.assertions(1);
      try {
        await getPage({ value: 1, label });
      } catch (err) {
        expect(err.message).toContain('<mg-badge> prop "label" is required.');
      }
    });

    test.each(['', 'Batman'])('Should throw error, case invalid variant prop', async variant => {
      expect.assertions(1);
      try {
        await getPage({ variant, value: 1, label: 'Batman' });
      } catch (err) {
        expect(err.message).toContain('<mg-badge> prop "variant" must be one of : ');
      }
    });

    test.each(['', 'Batman', '+', '99?'])('Should throw error, case invalid value prop', async value => {
      expect.assertions(1);
      try {
        await getPage({ value, label: 'Batman' });
      } catch (err) {
        expect(err.message).toContain('<mg-badge> prop "value" must be interger or ponctuation character.');
      }
    });
  });
});
