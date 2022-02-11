import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgBadge } from '../mg-badge';
import { variants } from '../mg-badge.conf';

const getPage = (args, slot) =>
  newSpecPage({
    components: [MgBadge],
    template: () => <mg-badge {...args}>{slot}</mg-badge>,
  });

describe('mg-badge', () => {
  describe.each(variants)('variant %s', variant => {
    test.each([true, false])('outiline %s', async outline => {
      const { root } = await getPage({ variant, outline }, variant);
      expect(root).toMatchSnapshot();
    });
  });

  test.each(['', 'blu', undefined])('Should throw error', async variant => {
    try {
      await getPage({ variant }, 'wrong variant');
    } catch (err) {
      expect(err.message).toContain('<mg-badge> prop "variant" must be one of : ');
    }
  });
});
