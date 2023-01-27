import { createPage } from '../../../../utils/e2e.test.utils';
import { variants } from '../mg-message.conf';

const getContent = (contentSize, withAction) => {
  let content = '<strong>Strong</strong> content!';
  let actions = '';
  if (contentSize === 'long') {
    content =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
  }
  if (withAction) {
    actions = `<div slot="actions" class="mg-group-elements mg-group-elements--align-right"><mg-button>Primary</mg-button><mg-button variant="secondary">Secondary</mg-button></div>`;
  }
  return `<p>${content}</p>${actions}`;
};

describe('mg-message', () => {
  test('Should render', async () => {
    const html = variants
      .map(variant => {
        const props = [
          { contentSize: 'short', withAction: false, closeButton: false },
          { contentSize: 'long', withAction: false, closeButton: false },
          { contentSize: 'short', withAction: true, closeButton: false },
          { contentSize: 'long', withAction: true, closeButton: false },
          { contentSize: 'short', withAction: false, closeButton: true },
          { contentSize: 'long', withAction: false, closeButton: true },
        ];
        return props
          .map(({ contentSize, withAction, closeButton }) => `<mg-message variant="${variant}" close-button="${closeButton}">${getContent(contentSize, withAction)}</mg-message>`)
          .join('');
      })
      .join('');
    const page = await createPage(html);

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();
  });

  test('Should render with child mg-card', async () => {
    const page = await createPage(`
      <mg-message class="custom-message-card">
        <mg-card>child card</mg-card>
      </mg-message>
      <style>
        .custom-message-card {
          --mg-card-background-override: hsl(var(--color-danger));
        }
      </style>
    `);

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();
  });

  test('Should hide message on close button click', async () => {
    const page = await createPage(`<mg-message close-button><p>Blu</p></mg-message>`);

    const mgMessage = await page.find('mg-message');
    expect(mgMessage).not.toHaveAttribute('hide');

    const mgButton = await page.find('mg-message >>> mg-button');
    mgButton.triggerEvent('click');
    await page.waitForChanges();

    const mgMessageHideProp = await mgMessage.getProperty('hide');
    expect(mgMessageHideProp).toEqual(true);

    await page.setViewport({ width: 600, height: 100 });

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();
  });
});
