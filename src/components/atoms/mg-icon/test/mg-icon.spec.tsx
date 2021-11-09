import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgIcon } from '../mg-icon';
import { icons, sizes } from '../mg-icon.conf';

const getPage = (args) => newSpecPage({
  components: [MgIcon],
  template: () => (<mg-icon {...args}></mg-icon>),
});

describe('mg-icon', () => {
  describe.each(icons)('Should render %s icon', (icon) => {

    test.each(sizes)('in %s size', async (size) => {
      const { root } = await getPage({icon, size});
      expect(root).toMatchSnapshot();
    });

  });

  test.each(["", "blu", undefined])('Should throw error with invalid icon property : %s', async (value) => {
    try {
      await getPage({icon:value});
    }
    catch (err) {
      expect(err.message).toMatch('<mg-icon> prop "icon" must be one of : ')
    }
  });

  test.each(["", "blu", undefined])('Should throw error with invalid size property : %s', async (value) => {
    try {
      await getPage({icon:"success", size: value});
    }
    catch (err) {
      expect(err.message).toMatch('<mg-icon> prop "size" must be one of : ')
    }
  });

});
