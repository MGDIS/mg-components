import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgIcon } from '../mg-icon';

const getPage = (args) => newSpecPage({
  components: [MgIcon],
  template: () => (<mg-icon {...args}></mg-icon>),
});

describe('mg-icon', () => {
  describe.each(["user-cadenas", "editable"])('Should render %s icon', (icon) => {

    test.each(["regular", "large"])('in %s size', async (size) => {
      const { root } = await getPage({icon, size});
      expect(root).toEqualHtml(`
        <mg-icon>
          <mock:shadow-root>
            <svg class="mg-icon mg-icon-${icon} mg-icon-${size}">
              <use xlink:href="/assets/icons.svg#${icon}"></use>
            </svg>
          </mock:shadow-root>
        </mg-icon>
      `);
    });

  });

  test.each(["", "blu", undefined])('Should not render with invalid icon property : %s', async (value) => {
    try {
      await getPage({icon:value});
    }
    catch (err) {
      expect(err.message).toMatch('<mg-icon> prop "icon" must be one of : ')
    }
  });

  test.each(["", "blu", undefined])('Should not render with invalid size property : %s', async (value) => {
    try {
      await getPage({icon:"user-cadenas", size: value});
    }
    catch (err) {
      expect(err.message).toMatch('<mg-icon> prop "size" must be one of : ')
    }
  });

});
