import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgTag } from '../mg-tag';
import { variants } from '../mg-tag.conf';

const getPage = (args, slot) =>
  newSpecPage({
    components: [MgTag],
    template: () => <mg-tag {...args}>{slot}</mg-tag>,
  });

describe('mg-tag', () => {
  describe.each(variants)('variant %s', variant => {
    test.each([true, false])('outiline %s', async outline => {
      const { root } = await getPage({ variant, outline }, variant);
      expect(root).toMatchSnapshot();
    });
  });

  test('Should replace classes on variant/ouline changes', async () => {
    const page = await getPage({}, 'Blu');
    const element = page.doc.querySelector('mg-tag');
    let classPrimary = element.shadowRoot.querySelector('.mg-tag--primary');
    let classOutline = element.shadowRoot.querySelector('.mg-tag--outline');

    expect(classPrimary).not.toBeNull();
    expect(classOutline).toBeNull();

    // Change variant
    element.variant = 'danger';
    await page.waitForChanges();

    classPrimary = element.shadowRoot.querySelector('.mg-tag--primary');
    const classDanger = element.shadowRoot.querySelector('.mg-tag--danger');

    expect(classPrimary).toBeNull();
    expect(classDanger).not.toBeNull();

    // Change outline
    element.outline = true;
    await page.waitForChanges();

    classOutline = element.shadowRoot.querySelector('.mg-tag--outline');
    expect(classOutline).not.toBeNull();
  });

  test.each(['', 'blu', undefined])('Should throw error', async variant => {
    try {
      await getPage({ variant }, 'wrong variant');
    } catch (err) {
      expect(err.message).toContain('<mg-tag> prop "variant" must be one of : ');
    }
  });
});
