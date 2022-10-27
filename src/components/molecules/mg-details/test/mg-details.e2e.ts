import { createPage } from '../../../../utils/test.utils';

const content =
  '<span slot="summary"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </span><p slot="details">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>';

describe('mg-details', () => {
  test('Should toggle details', async () => {
    const page = await createPage(`<mg-details toggle-closed="Show details" toggle-opened="Hide details">${content}</mg-details>`);

    const mgDetails = await page.find('mg-details');
    expect(mgDetails).toHaveClass('hydrated');

    const details = await page.find('mg-details >>> details');
    expect(details).not.toHaveAttribute('open');

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();

    const summary = await page.find('mg-details >>> summary');
    summary.click();
    await page.waitForChanges();

    expect(details).toHaveAttribute('open');

    const screenshotOpened = await page.screenshot();
    expect(screenshotOpened).toMatchImageSnapshot();
  });

  test('Should hidde summary', async () => {
    const page = await createPage(`<mg-details toggle-closed="Show details" toggle-opened="Hide details" hidde-summary>${content}</mg-details>`);

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();

    const summary = await page.find('mg-details >>> summary');
    summary.click();
    await page.waitForChanges();

    const screenshotOpened = await page.screenshot();
    expect(screenshotOpened).toMatchImageSnapshot();
  });
});
