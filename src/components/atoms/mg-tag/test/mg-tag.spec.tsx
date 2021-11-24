import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgTag } from '../mg-tag';
import { variants } from '../mg-tag.conf';

const getPage = (args, slot) => newSpecPage({
  components: [MgTag],
  template: () => (<mg-tag {...args}>{slot}</mg-tag>)
});

describe('mg-tag', () => {
  describe.each(variants)('variant %s', (variant) => {
    test.each([true, false])('outiline %s', async (outline) => {
      const { root } = await getPage({variant, outline}, variant);
      expect(root).toMatchSnapshot();
    })
  });

  test.each(["", "blu", undefined])('Should throw error', async (variant) => {
    try {
      await getPage({variant}, "wrong variant");
    }
    catch (err){
      expect(err.message).toContain('<mg-tag> prop "variant" must be one of : ')
    }
  });
});
