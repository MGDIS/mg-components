import { createPage } from "../../../../utils/test.utils"
import { variants } from '../mg-button.conf';

describe.each(variants)('mg-button %s', (variant) => {
  test('Should render', async () => {

    const page = await createPage(`<mg-button variant="${variant}">${variant}</mg-button>`);

    const element = await page.find('mg-button');
    expect(element).toHaveClass('hydrated');

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();

  });
});

test('Should render a 2 lines button', async ()=>{
  const page = await createPage(`<mg-button>Button with a<br> two lines text</mg-button>`);

  const screenshot = await page.screenshot();
  expect(screenshot).toMatchImageSnapshot();
})

test('Should render a button in a paragraph', async ()=>{
  const page = await createPage(`<p>This is a <mg-button>button</mg-button> in a paragraph.</p>`);

  const screenshot = await page.screenshot();
  expect(screenshot).toMatchImageSnapshot();
})


test.each(["Enter", "Space"])('should disable button after keyUp "%s"', async (key) => {
  const page = await createPage(`<mg-button label="test" disable-on-click>test</mg-button>`);
  const button = await page.find('button');

  const screenshot1 = await page.screenshot();
  expect(screenshot1).toMatchImageSnapshot();

  await button.press(key);

  expect(button).toHaveAttribute('disabled');

  const screenshot2 = await page.screenshot();
  expect(screenshot2).toMatchImageSnapshot();
})

test.each(["Enter", "Space"])('should change content by loader icon "%s"', async (key) => {
  const page = await createPage(`<mg-button label="test">test</mg-button>`);
  const button = await page.find('button');

  const screenshot1 = await page.screenshot();
  expect(screenshot1).toMatchImageSnapshot();

  await button.press(key);

  const screenshot2 = await page.screenshot();
  expect(screenshot2).toMatchImageSnapshot();
})

test.each(["Enter", "Space"])('should change icon by loader icon "%s"', async (key) => {
  const page = await createPage(`<mg-button label="test" is-icon><mg-icon icon="info"></mg-icon></mg-button>`);
  const button = await page.find('button');

  const screenshot1 = await page.screenshot();
  expect(screenshot1).toMatchImageSnapshot();

  await button.press(key);

  const screenshot2 = await page.screenshot();
  expect(screenshot2).toMatchImageSnapshot();
})
