import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgSkipLinks } from '../mg-skip-links';

const getPage = args =>
  newSpecPage({
    components: [MgSkipLinks],
    template: () => <mg-skip-links {...args}></mg-skip-links>,
  });

describe('mg-skip-links', () => {
  test('with args %s', async () => {
    const { root } = await getPage({
      links: [
        { href: '#content', label: 'Content' },
        { href: '#menu', label: 'Menu' },
        { href: '#search', label: 'Search' },
        { href: '#footer', label: 'Footer' },
      ],
    });
    expect(root).toMatchSnapshot();
  });

  test.each([
    {},
    { links: [] },
    { links: [{ blu: 'blu', bli: 'bli' }] },
    { links: [{ href: 'nohash', Label: 'label' }] },
    { links: [{ href: '#hash', Label: ' ' }] },
    { links: [{ href: '#hash', Label: '' }] },
  ])('Should throw error with wrong link params: %s', async args => {
    expect.assertions(1);
    try {
      await getPage(args);
    } catch (err) {
      expect(err.message).toMatch('<mg-skip-links> prop "links": Cannot be empty and each link must contains an href starting with a "#" and a non empty label attributes.');
    }
  });

  test('should emit event when link is clicked', async () => {
    const page = await getPage({
      links: [
        { href: '#content', label: 'Content' },
        { href: '#menu', label: 'Menu' },
        { href: '#search', label: 'Search' },
        { href: '#footer', label: 'Footer' },
      ],
    });

    const spyGoToAnchor = jest.spyOn(page.rootInstance.goToAnchor, 'emit');

    const mgSkiplinks = page.doc.querySelector('mg-skip-links');
    const anchor = mgSkiplinks.shadowRoot.querySelector('a');
    const spyBlur = jest.spyOn(anchor, 'blur');
    anchor.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    await page.waitForChanges();

    expect(spyGoToAnchor).toHaveBeenCalledWith('#content');
    expect(spyBlur).toHaveBeenCalled();
  });
});
