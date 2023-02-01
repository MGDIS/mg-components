import { createPage } from '../../../../utils/e2e.test.utils';

describe('mg-tooltip', () => {
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
    test('Should render', async () => {
      const page = await createPage(
        `<style>mg-icon{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%)}</style><mg-tooltip message="this is a tooltip message" placement="${placement}"><mg-icon icon="info-circle"></mg-icon></mg-tooltip>`,
      );

      const mgTooltip = await page.find('mg-tooltip');
      const mgIcon = await page.find('mg-icon');
      const tooltip = await page.find('mg-tooltip >>> .mg-tooltip');

      expect(mgTooltip).toHaveClass('hydrated');

      mgIcon.triggerEvent('focus');
      await page.waitForChanges();

      expect(tooltip).toHaveAttribute('data-show');

      await page.setViewport({ width: 400, height: 400 });

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

  describe.each([
    '<mg-tooltip message="my tooltip coucou"><span>coucou</span></mg-tooltip>',
    `<mg-tooltip message="this is a tooltip message"><mg-icon icon="info-circle"></mg-icon></mg-tooltip>`,
    '<mg-tooltip message="my tooltip mg-button"><mg-button>mg-button</mg-button></mg-tooltip>',
    '<mg-tooltip message="my tooltip native button"><button class="mg-button mg-button--primary" aria-describedby="blu">native button</button></mg-tooltip>',
  ])('Keyboard navigation with template', template => {
    test.each(['Space', 'Enter'])('Should NOT navigate with keyboard, case key %s', async key => {
      const page = await createPage(template);

      const mgTooltip = await page.find('mg-tooltip');
      const tooltip = await page.find('mg-tooltip >>> .mg-tooltip');

      expect(mgTooltip).toHaveClass('hydrated');

      await page.keyboard.down('Tab');
      await page.waitForChanges();

      expect(tooltip).toHaveAttribute('data-show');

      await page.keyboard.down(key as never);
      await page.waitForChanges();

      expect(tooltip).toHaveAttribute('data-show');
    });

    test('Should navigate with keyboard, case key "Escape"', async () => {
      const page = await createPage(template);

      const mgTooltip = await page.find('mg-tooltip');
      const tooltip = await page.find('mg-tooltip >>> .mg-tooltip');

      expect(mgTooltip).toHaveClass('hydrated');

      await page.keyboard.down('Tab');
      await page.waitForChanges();

      expect(tooltip).toHaveAttribute('data-show');

      await page.keyboard.down('Escape');
      await page.waitForChanges();

      expect(tooltip).not.toHaveAttribute('data-show');
    });
  });

  test('Should keep tooltip displaied when hover with mouse after focus event', async () => {
    const page = await createPage('<mg-tooltip identifier="identifier" message="Batman tooltip"><mg-icon icon="user"></mg-icon></mg-tooltip>');

    const tooltipedElement = await page.find('mg-icon');
    const tooltipElement = await page.find('mg-tooltip >>> .mg-tooltip');

    // 1. take focus on tooltipedElement and display tooltip
    tooltipedElement.triggerEvent('focus');
    await page.waitForChanges();

    expect(tooltipElement).toHaveAttribute('data-show');

    // 2. mouseenter on tooltipedElement and tooltip stay displaied
    tooltipedElement.triggerEvent('mouseenter');
    await page.waitForChanges();

    expect(tooltipElement).toHaveAttribute('data-show');

    // 3. mouseleave on tooltipedElement and tooltip stay displaied
    tooltipedElement.triggerEvent('mouseleave');
    await page.waitForChanges();

    expect(tooltipElement).toHaveAttribute('data-show');

    // 4. presse tab key and tooltip is hidden
    tooltipedElement.triggerEvent('blur');
    await page.waitForChanges();

    expect(tooltipElement).not.toHaveAttribute('data-show');
  });

  test('Should keep tooltip arrow when update message', async () => {
    const page = await createPage('<mg-tooltip message="Batman tooltip"><mg-icon icon="user"></mg-icon></mg-tooltip>');

    await page.keyboard.down('Tab');
    await page.waitForChanges();

    await page.setViewport({ width: 400, height: 100 });

    let screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();

    await page.$eval('mg-tooltip', elm => {
      (elm as HTMLMgTooltipElement).message = 'Joker is here';
    });
    await page.waitForChanges();

    screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();
  });
});
