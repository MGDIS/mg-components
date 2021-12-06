import { createPage } from "../../../../utils/test.utils"

describe('mg-tooltip', () => {
  describe.each(['auto','auto-start','auto-end','top','top-start','top-end','bottom','bottom-start','bottom-end','right','right-start','right-end','left','left-start','left-end'])('placement %s', (placement) => {
    test('Should render', async () => {

      const page = await createPage(`<style>mg-icon{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%)}</style><mg-tooltip message="this is a tooltip message" placement="${placement}"><mg-icon icon="info"></mg-icon></mg-tooltip>`);

      const mgTooltip = await page.find('mg-tooltip');
      const mgIcon = await page.find('mg-icon');
      const tooltip = await page.find('[role="tooltip"]');

      expect(mgTooltip).toHaveClass('hydrated');

      mgIcon.triggerEvent('focus');
      await page.waitForChanges();

      expect(tooltip).toHaveAttribute('data-show');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();

      mgIcon.triggerEvent('blur');
      await page.waitForChanges();

      expect(tooltip).not.toHaveAttribute('data-show');

      mgIcon.triggerEvent('mouseenter');
      await page.waitForChanges();

      expect(tooltip).toHaveAttribute('data-show');

      mgIcon.triggerEvent('mouseleave');
      await page.waitForChanges();

      expect(tooltip).not.toHaveAttribute('data-show');

    });
  });
});
