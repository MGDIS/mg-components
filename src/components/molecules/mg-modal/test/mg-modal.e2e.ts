import { createPage } from '../../../../utils/e2e.test.utils';

const getSlots = ({ content, actions }: { content?: boolean; actions?: boolean }): string => {
  let slots = '';
  if (content) {
    slots += `
    <p slot="content">
      <strong>Strong</strong> content!
    </p>`;
  }
  if (actions) {
    slots += `
   <div slot="actions" class="mg-group-elements mg-group-elements--align-right">
     <mg-button identifier="identifier">Primary</mg-button>
     <mg-button variant="secondary" identifier="identifier">
       Secondary
     </mg-button>
   </div>`;
  }

  return slots;
};

describe('mg-modal', () => {
  describe.each([
    { content: false, actions: false },
    { content: true, actions: false },
    { content: false, actions: true },
    { content: true, actions: true },
  ])('render whith slots %s', slots => {
    test.each([
      { closeButton: false, hide: false },
      { closeButton: true, hide: false },
      { closeButton: true, hide: true },
    ])('Should render', async ({ closeButton, hide }) => {
      const page = await createPage(
        `<mg-button id="modal-button">Open modal</mg-button><mg-modal modal-title="Modal title" close-button="${closeButton}" ${hide === true ? 'hide="true"' : ''}">${getSlots(
          slots,
        )}</mg-modal>`,
      );

      await page.setViewport({ width: 800, height: 500 });

      const element = await page.find('mg-modal');

      expect(element).toHaveClass('hydrated');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });

    test('Should render with long title', async () => {
      const page = await createPage(
        `<mg-button id="modal-button">Open modal</mg-button>
        <mg-modal modal-title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat " close-button="true">${getSlots(
          slots,
        )}</mg-modal>`,
      );

      await page.setViewport({ width: 800, height: 500 });

      const element = await page.find('mg-modal');

      expect(element).toHaveClass('hydrated');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });

    test('Should render with long content', async () => {
      const page = await createPage(
        `<mg-button id="modal-button">Open modal</mg-button>
          <mg-modal modal-title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat " close-button="true">${getSlots(
            slots,
          )}
          <p slot="content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia dLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia dLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia dLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia dLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia dLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia dLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia d</p>
        </mg-modal>`,
      );

      await page.setViewport({ width: 800, height: 500 });

      const element = await page.find('mg-modal');

      expect(element).toHaveClass('hydrated');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });
  });

  describe('navigation', () => {
    test('Should trigger modal and close modal.', async () => {
      const page = await createPage(`
        <mg-button id="modal-button">Open modal</mg-button>
        <mg-modal modal-title="Modal Title" close-button hide>${getSlots({ content: true, actions: true })}</mg-modal>
      `);

      await page.setViewport({ width: 800, height: 500 });

      await page.evaluate(() => {
        document.querySelector('#modal-button').addEventListener('click', () => {
          const mgModal = document.querySelector('mg-modal');
          const isHide = mgModal.hide === true;
          if (isHide) {
            mgModal.removeAttribute('hide');
            mgModal.hide = false;
          } else {
            mgModal.hide = true;
          }
        });
      });

      const mgButton = await page.find('mg-button');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();

      mgButton.triggerEvent('click');
      await page.waitForChanges();

      const screenshot2 = await page.screenshot();
      expect(screenshot2).toMatchImageSnapshot();

      const closeButton = await page.find('mg-modal >>> mg-button');

      closeButton.triggerEvent('click');
      await page.waitForChanges();

      const screenshot3 = await page.screenshot();
      expect(screenshot3).toMatchImageSnapshot();
    });
  });
});
