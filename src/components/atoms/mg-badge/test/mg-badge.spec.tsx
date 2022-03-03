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
      const { root } = await getPage({ variant, outline, value: 1, label: 'batman' });
      expect(root).toMatchSnapshot();
    });
  });

  test.each([1, 100, '!', '?'])('value %s', async value => {
    const { root } = await getPage({ value, label: 'batman' });
    expect(root).toMatchSnapshot();
  });

  describe('errors', () => {
    test.each(['', 'batman', undefined])('Should throw error, case invalid variant prop', async variant => {
      try {
        await getPage({ variant, value: 1, label: 'batman' });
      } catch (err) {
        expect(err.message).toContain('<mg-badge> prop "variant" must be one of : ');
      }
    });

    test.each(['', 'batman', '+', '99?'])('Should throw error, case invalid value prop', async value => {
      try {
        await getPage({ value, label: 'batman' });
      } catch (err) {
        expect(err.message).toContain('<mg-badge> prop "value" must be interger or ponctuation character.');
      }
    });
  });
});
