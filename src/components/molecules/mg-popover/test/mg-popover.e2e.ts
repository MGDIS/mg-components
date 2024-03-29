import { createPage, renderAttributes } from '../../../../utils/e2e.test.utils';

describe('mg-popover', () => {
  describe.each([
    'auto',
    'auto-start',
    'auto-end',
    'top',
    'top-start',
    'top-end',
    'bottom',
    'bottom-start',
    'bottom-end',
    'right',
    'right-start',
    'right-end',
    'left',
    'left-start',
    'left-end',
  ])('placement %s', placement => {
    test.each([true, false])('Should render, case hide arrow %s', async arrowHide => {
      const page = await createPage(
        `<style>mg-button{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%)}</style>
        <mg-popover ${renderAttributes({ placement, arrowHide })}>
        <mg-button>Button</mg-button>
        <h2 slot="title">Blu bli blo bla</h2>
        <p slot="content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
          non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        </mg-popover>`,
      );

      const mgPopover = await page.find('mg-popover');
      const mgButton = await page.find('mg-button');
      const popover = await page.find('mg-popover >>> .mg-popover');

      expect(mgPopover).toHaveClass('hydrated');

      // display popover on click on slotted element
      mgButton.triggerEvent('click');
      await page.waitForChanges();
      await page.waitForNetworkIdle();

      expect(popover).toHaveAttribute('data-show');

      await page.setViewport({ width: 800, height: 350 });

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();

      // hide popover on click on slotted element
      mgButton.triggerEvent('click');
      await page.waitForChanges();
      await page.waitForNetworkIdle();

      expect(popover).not.toHaveAttribute('data-show');

      // display popover on keyboad click event on slotted element
      await page.keyboard.down('Tab');
      await page.keyboard.down('Enter');
      await page.waitForChanges();
      await page.waitForNetworkIdle();

      expect(popover).toHaveAttribute('data-show');

      // hide popover on keyboad escape key
      await page.keyboard.down('Escape');
      await page.waitForChanges();
      await page.waitForNetworkIdle();

      expect(popover).not.toHaveAttribute('data-show');
    });
  });

  describe.each([
    '',
    '<h2 slot="title">Titre un peu plus long un peu plus long un peu plus long un peu plus long un peu plus long un peu plus long un peu plus long un peu plus long un peu plus long un peu plus long un peu plus long</h2>',
  ])('with or without title', title => {
    test('Should render with close button', async () => {
      const page = await createPage(
        `<mg-popover display close-button>
        <mg-button>Button</mg-button>
        ${title}
        <p slot="content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
          non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        </mg-popover>`,
      );

      const mgPopover = await page.find('mg-popover');

      expect(mgPopover).toHaveClass('hydrated');

      await page.setViewport({ width: 500, height: 350 });

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });
  });

  describe.each(['title', 'content'])('re-position %s slot', slot => {
    test('should re-position when slot size change', async () => {
      const tagName = slot === 'title' ? 'h2' : 'p';
      const page = await createPage(
        `<style>mg-button{position:fixed;left:50%;transform:translateX(-50%)}</style>
        <mg-popover ${renderAttributes({ placement: 'bottom-start', display: true })}>
        <mg-button>Button</mg-button>
        <${tagName} slot="${slot}">
          Lorem ipsum
        </${tagName}>
        </mg-popover>`,
        { width: 400, height: 100 },
      );

      let screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();

      await page.$eval('[slot]', el => {
        el.textContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit';
      });

      await page.waitForChanges();

      screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });
  });

  describe('style', () => {
    test('Should render with child mg-card', async () => {
      const page = await createPage(
        `<mg-popover display close-button class="custom-popover-card">
        <mg-button>Button</mg-button>
        <mg-card slot="content">
          My custom card
        </mg-card>
        </mg-popover>
        <style>
          .custom-popover-card {
            --mg-popover-background-color: var(--color-danger);
          }
        </style>
        `,
      );

      const mgPopover = await page.find('mg-popover');

      expect(mgPopover).toHaveClass('hydrated');

      await page.setViewport({ width: 500, height: 300 });

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });
  });
});
