import { createPage } from '../../../../utils/test.utils';
import { variants } from '../mg-button.conf';

describe.each(variants)('mg-button %s', variant => {
  test('Should render', async () => {
    const page = await createPage(`<mg-button variant="${variant}">${variant}</mg-button>`);

    const element = await page.find('mg-button');
    expect(element).toHaveClass('hydrated');

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();
  });
});

test.each(['<mg-icon icon="trash"></mg-icon>Text button', '<mg-icon icon="trash"></mg-icon>Text button<mg-badge value="1" label="label"></mg-badge>'])(
  'Should render whith icon slot',
  async slot => {
    const page = await createPage(`<mg-button>${slot}</mg-button>`);

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();
  },
);

test('Should render a 2 lines button', async () => {
  const page = await createPage(`<mg-button>Button with a<br> two lines text</mg-button>`);

  const screenshot = await page.screenshot();
  expect(screenshot).toMatchImageSnapshot();
});

test('Should render a button in a paragraph', async () => {
  const page = await createPage(`<p>This is a <mg-button>button</mg-button> in a paragraph.</p>`);

  const screenshot = await page.screenshot();
  expect(screenshot).toMatchImageSnapshot();
});

describe.each([
  '<mg-button disable-on-click>Message action</mg-button>',
  '<mg-button disable-on-click label="test" is-icon><mg-icon icon="info-circle"></mg-icon></mg-button>',
  '<mg-button disable-on-click><mg-icon icon="info-circle"></mg-icon> Message action</mg-button>',
])('template', template => {
  test('should disable button after keyUp "Space"', async () => {
    const page = await createPage(template);
    const button = await page.find('mg-button');

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();

    await button.press('Space');

    // Wait for spinner to be displayed
    await page.waitForChanges();

    // Remove spinner annimation for screenshot
    await page.$eval('mg-icon', elm => {
      const svg = elm.shadowRoot.querySelector('svg');
      svg.classList.remove('mg-icon--spin');
    });
    await page.waitForChanges();

    const screenshotLoading = await page.screenshot();
    expect(screenshotLoading).toMatchImageSnapshot();
  });
});

describe.each([
  '<a href="#" class="mg-button mg-button--primary">a.mg-button</a>',
  '<a href="#" class="mg-button mg-button--primary"><mg-icon icon="check-circle"></mg-icon>a.mg-button w/ icon</a>',
  '<a href="#" class="mg-button mg-button--primary mg-button--icon"><mg-icon icon="check-circle"></mg-icon></a>',
])('template', template => {
  test('should render a link like a button', async () => {
    const page = await createPage(`<link rel="stylesheet" href="http://localhost:3333/build/mg-components.css" />${template}`);

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();
  });
});
