import { createPage } from '../../../../utils/test.utils';
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
  describe.each(variants)('%s', variant => {
    describe.each([
      { contentSize: 'short', withAction: false, closeButton: false },
      { contentSize: 'long', withAction: false, closeButton: false },
      { contentSize: 'short', withAction: true, closeButton: false },
      { contentSize: 'long', withAction: true, closeButton: false },
      { contentSize: 'short', withAction: false, closeButton: true },
      { contentSize: 'long', withAction: false, closeButton: true },
    ])('params %s', ({ contentSize, withAction, closeButton }) => {
      test('Should render', async () => {
        const page = await createPage(`<mg-message variant="${variant}" close-button="${closeButton}">${getContent(contentSize, withAction)}</mg-message>`);

        const element = await page.find('mg-message');
        expect(element).toHaveClass('hydrated');

        const screenshot = await page.screenshot();
        expect(screenshot).toMatchImageSnapshot();
      });
    });
  });

  test('Should hide message on close button click', async () => {
    const page = await createPage(`<mg-message close-button><p>Blu</p></mg-message>`);

    const mgMessage = await page.find('mg-message');
    expect(mgMessage).not.toHaveAttribute('hide');

    const mgButton = await page.find('mg-message >>> mg-button');
    mgButton.triggerEvent('click');
    await page.waitForChanges();

    const mgMessageHideProp = await mgMessage.getProperty('hide');
    expect(mgMessageHideProp).toBeTruthy();

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();
  });
});
