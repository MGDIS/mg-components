import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgButton } from '../mg-button';
import { variants } from '../mg-button.conf';

const getPage = (args) => newSpecPage({
  components: [MgButton],
  template: () => (<mg-button {...args}>Text button</mg-button>),
});

describe('mg-button', () => {
  describe.each(variants)('Should render an %s button', async (variant) => {
    test.each([false, true])('isIcon %s', async (isIcon) => {
      const {root} = await getPage({variant, isIcon, label:'label'});
      expect(root).toMatchSnapshot();
    });
  });

  test.each(["", "blu", undefined])('Should throw error', async (variant) => {
    try {
      await getPage({variant, label:'label'});
    }
    catch (err){
      expect(err.message).toContain('<mg-button> prop "variant" must be one of : ')
    }
  });

  test.each(["", undefined])('should throw error when using prop "isIcon" without a good prop "label"', async (label) => {
    try {
      await getPage({isIcon:true, label});
    }
    catch (err){
      expect(err.message).toContain('<mg-button> prop "label" is mandatory when prop "isIcon" is set to true.')
    }
  })
});
