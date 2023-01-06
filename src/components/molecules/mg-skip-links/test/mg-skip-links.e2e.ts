import { createPage } from '../../../../utils/e2e.test.utils';

describe('mg-skip-links', () => {
  test('Should render', async () => {
    const page = await createPage(`<mg-skip-links></mg-skip-links>
    <style>body{background:#999;}</style>
    <script>
      const mgSkipLinks = document.querySelector('mg-skip-links');
      mgSkipLinks.links = [
        { href: '#content', label: 'Content' },
        { href: '#menu', label: 'Menu' },
        { href: '#search', label: 'Search' },
        { href: '#footer', label: 'Footer' },
      ];
    </script>`);

    const mgSkipLinks = await page.find('mg-skip-links');
    expect(mgSkipLinks).toHaveClass('hydrated');

    await page.setViewport({ width: 400, height: 60 });

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();

    await page.keyboard.down('Tab');
    await page.waitForChanges();

    const screenshotTab = await page.screenshot();
    expect(screenshotTab).toMatchImageSnapshot();
  });
});
