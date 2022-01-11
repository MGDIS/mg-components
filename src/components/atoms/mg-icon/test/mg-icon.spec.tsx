import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgIcon } from '../mg-icon';
import { icons, sizes, variants } from '../mg-icon.conf';

const getPage = (args) => newSpecPage({
  components: [MgIcon],
  template: () => (<mg-icon {...args}></mg-icon>),
});

describe('mg-icon', () => {
  describe.each(Object.keys(icons))('Should render %s icon', (icon) => {

    test.each(sizes)('in %s size', async (size) => {
      const { root } = await getPage({icon, size});
      expect(root).toMatchSnapshot();
    });

    test.each(variants)('using %s variant', async (variant) => {
      const { root } = await getPage({icon, variant});
      expect(root).toMatchSnapshot();
    });

  });

  test.each(["", "blu", undefined])('Should throw error with invalid icon property : %s', async (icon) => {
    try {
      await getPage({icon});
    }
    catch (err) {
      expect(err.message).toMatch('<mg-icon> prop "icon" must be one of : ')
    }
  });

  test.each(["", "blu", undefined])('Should throw error with invalid size property : %s', async (size) => {
    try {
      await getPage({icon:"success", size});
    }
    catch (err) {
      expect(err.message).toMatch('<mg-icon> prop "size" must be one of : ')
    }
  });

  test.each(["", "blu"])('Should throw error with invalid variant property : %s', async (variant) => {
    try {
      await getPage({icon: "success", variant});
    }
    catch (err) {
      expect(err.message).toMatch('<mg-icon> prop "variant" must be one of : ')
    }
  });

});
