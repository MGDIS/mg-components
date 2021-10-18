import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgButton } from '../mg-button';

const getPage = (args) => newSpecPage({
  components: [MgButton],
  template: () => (<mg-button {...args}></mg-button>),
});

describe('mg-button', () => {
  test.each(["primary" , "secondary" , "alert", "alert-alt",  "info"])('Should render an %s button', async (variant) => {
    const {root} = await getPage({variant});
    expect(root).toMatchSnapshot();
  });

  test.each(["", "blu", undefined])('Should not render', async (variant) => {
    try {
      await getPage({variant});
    }
    catch (err){
      expect(err.message).toContain('<mg-button> prop "variant" must be one of : ')
    }
  });
});
