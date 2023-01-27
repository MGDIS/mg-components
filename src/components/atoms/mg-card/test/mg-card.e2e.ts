import { createPage } from '../../../../utils/e2e.test.utils';

describe('mg-card', () => {
  test('Should render', async () => {
    const html = [
      'short text',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      '<mg-card>Content whith child card.</mg-card>',
    ]
      .map(slot => `<mg-card class="${slot.includes('<mg-card>') ? 'custom-card' : ''}">${slot}</mg-card>`)
      .join('');
    const page = await createPage(html + '<style>.custom-card {--mg-card-background: hsl(var(--color-danger));}</style>');

    const element = await page.find('mg-card');
    expect(element).toHaveClass('hydrated');

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();
  });
});
