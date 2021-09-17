import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgButton } from '../mg-button';

const getPage = (variant) => newSpecPage({
  components: [MgButton],
  template: () => (<mg-button variant={variant}></mg-button>),
});

describe('mg-button', () => {
  test.each(["primary" , "secondary" , "alert", "alert-alt",  "info"])('Should render', async (variant) => {
    const {root} = await getPage(variant);
    expect(root).toEqualHtml(`
      <mg-button>
        <mock:shadow-root>
          <button class="mg-button mg-button-${variant}">
            <slot></slot>
          </button>
        </mock:shadow-root>
      </mg-button>
    `);
  });

  test.each(["", "blu", undefined])('Should not render', async (variant) => {
    try {
      await getPage(variant);
    }
    catch (err){
      expect(err.message).toContain('<mg-button> prop "variant" must be one of : ')
    }

  });
});
