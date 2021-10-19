import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgTag } from '../mg-tag';

const getPage = (args, slot) => newSpecPage({
  components: [MgTag],
  template: () => (<mg-tag {...args}>{slot}</mg-tag>)
});

describe('mg-tag', () => {
  test.each(["product" , "success" , "warning", "danger",  "draft"])('Should render a %s tag', async (variant) => {
    const { root } = await getPage({variant}, variant);
    expect(root).toMatchSnapshot();
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
