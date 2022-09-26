import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgIcon } from '../mg-icon';
import { icons, sizes, variants } from '../mg-icon.conf';

const getPage = args =>
  newSpecPage({
    components: [MgIcon],
    template: () => <mg-icon {...args}></mg-icon>,
  });

describe('mg-icon', () => {
  describe.each(Object.keys(icons))('Should render %s icon', icon => {
    test.each(sizes)('in %s size', async size => {
      const { root } = await getPage({ icon, size });
      expect(root).toMatchSnapshot();
    });

    test.each(variants)('using %s variant', async variant => {
      const { root } = await getPage({ icon, variant });
      expect(root).toMatchSnapshot();
    });
  });

  test('Should render a spin icon', async () => {
    const { root } = await getPage({ icon: 'check-circle', spin: true });
    expect(root).toMatchSnapshot();
  });

  test('Should replace classes on icon changes', async () => {
    const page = await getPage({ icon: 'chevron-up', variant: 'success' });
    const element = page.doc.querySelector('mg-icon');
    let classChevronUp = element.shadowRoot.querySelector('.mg-icon--chevron-up');
    let classSizeRegular = element.shadowRoot.querySelector('.mg-icon--size-regular');
    let classVariantSuccess = element.shadowRoot.querySelector('.mg-icon--variant-success');

    expect(classChevronUp).not.toBeNull();
    expect(classSizeRegular).not.toBeNull();
    expect(classVariantSuccess).not.toBeNull();

    // Change icon
    element.icon = 'chevron-down';
    await page.waitForChanges();

    classChevronUp = element.shadowRoot.querySelector('.mg-icon--chevron-up');
    const classChevronDown = element.shadowRoot.querySelector('.mg-icon--chevron-down');

    expect(classChevronUp).toBeNull();
    expect(classChevronDown).not.toBeNull();

    // Change size
    element.size = 'large';
    await page.waitForChanges();

    classSizeRegular = element.shadowRoot.querySelector('.mg-icon--size-regular');
    const classSizeLarge = element.shadowRoot.querySelector('.mg-icon--size-large');

    expect(classSizeRegular).toBeNull();
    expect(classSizeLarge).not.toBeNull();

    // Change variant
    element.variant = 'danger';
    await page.waitForChanges();

    classVariantSuccess = element.shadowRoot.querySelector('.mg-icon--variant-success');
    const classVariantDanger = element.shadowRoot.querySelector('.mg-icon--variant-danger');

    expect(classVariantSuccess).toBeNull();
    expect(classVariantDanger).not.toBeNull();
  });

  test.each(['', 'blu', undefined])('Should throw error with invalid icon property : %s', async icon => {
    expect.assertions(1);
    try {
      await getPage({ icon });
    } catch (err) {
      expect(err.message).toMatch('<mg-icon> prop "icon" must be one of : ');
    }
  });

  test.each(['', 'blu'])('Should throw error with invalid size property : %s', async size => {
    expect.assertions(1);
    try {
      await getPage({ icon: 'check-circle', size });
    } catch (err) {
      expect(err.message).toMatch('<mg-icon> prop "size" must be one of : ');
    }
  });

  test.each(['', 'blu'])('Should throw error with invalid variant property : %s', async variant => {
    expect.assertions(1);
    try {
      await getPage({ icon: 'check-circle', variant });
    } catch (err) {
      expect(err.message).toMatch('<mg-icon> prop "variant" must be one of : ');
    }
  });
});
