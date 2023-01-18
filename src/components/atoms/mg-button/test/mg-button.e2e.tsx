import { createPage } from '../../../../utils/e2e.test.utils';
import { variants } from '../mg-button.conf';

const buttonHeight = 35;

describe('mg-button', () => {
  test('Should render', async () => {
    const html = variants.map(variant => `<div><mg-button variant="${variant}">${variant}</mg-button></div>`).join('');
    const page = await createPage(html, { width: 100, height: variants.length * buttonHeight });

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();
  });

  test('Should render whith icon slot', async () => {
    const slots = ['<mg-icon icon="trash"></mg-icon>Text button', '<mg-icon icon="trash"></mg-icon>Text button<mg-badge value="1" label="label"></mg-badge>'];
    const html = slots.map(slot => `<div><mg-button>${slot}</mg-button></div>`).join('');
    const page = await createPage(html, { width: 150, height: slots.length * buttonHeight });

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();
  });

  test('Should render a 2 lines button', async () => {
    const page = await createPage(`<mg-button>Button with a<br> two lines text</mg-button>`);

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();
  });

  test('Should render a button in a paragraph', async () => {
    const paragraphs = [`<p>This is a <mg-button>button</mg-button> in a paragraph.</p>`, `<p>This is a <mg-button variant="link">button</mg-button> in a paragraph.</p>`];
    const html = paragraphs.join('');
    const page = await createPage(html);

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();
  });

  test('Should render a full-width button', async () => {
    const slots = ['batman', '<mg-icon icon="check-circle"></mg-icon>batman'];
    const html = slots.map(slot => `<mg-button full-width>${slot}</mg-button>`).join('');

    const page = await createPage(html);

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
      await page.$eval('mg-button', elm => {
        const svg = elm.shadowRoot.querySelector('mg-icon').shadowRoot.querySelector('svg');
        svg.classList.remove('mg-icon--spin');
      });
      await page.waitForChanges();

      const screenshotLoading = await page.screenshot();
      expect(screenshotLoading).toMatchImageSnapshot();
    });
  });

  test('should render a link like a button', async () => {
    const links = [
      '<a href="#" class="mg-button mg-button--primary">a.mg-button</a>',
      '<a href="#" class="mg-button mg-button--primary"><mg-icon icon="check-circle"></mg-icon>a.mg-button w/ icon</a>',
      '<a href="#" class="mg-button mg-button--primary mg-button--icon"><mg-icon icon="check-circle"></mg-icon></a>',
    ];
    const html = links.map(link => `<div>${link}</div>`).join('');
    const page = await createPage(`<link rel="stylesheet" href="http://localhost:3333/build/mg-components.css" />${html}`, { width: 200, height: links.length * buttonHeight });

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();
  });
});
