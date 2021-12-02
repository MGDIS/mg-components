import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgTooltip } from '../mg-tooltip';
import { MgButton } from '../../mg-button/mg-button';
import { MgIcon } from '../../mg-icon/mg-icon';

const getPage = (args, element) => newSpecPage({
  components: [MgTooltip, MgButton, MgIcon],
  template: () => (<mg-tooltip {...args}>{element}</mg-tooltip>),

});

describe('mg-tooltip', () => {

    test.each([
      <span>span</span>,
      <button aria-describedby="blu">button</button>,
      <mg-icon icon="success"></mg-icon>,
      <mg-button identifier="identifier">mg-button</mg-button>
    ])('Should render with element', async (element) => {
      const args = { identifier:"identifier", message: 'My tooltip message'};
      const {root} = await getPage(args, element);
      expect(root).toMatchSnapshot();
    });

    describe.each([
      {eventIn:'mouseenter', eventOut:'mouseleave'},
      {eventIn:'focus', eventOut:'blur'},
    ])('Should manage display on events enter with %s, leave with %s', ({eventIn, eventOut}) => {
      test.each([
        <span>span</span>,
        <button aria-describedby="blu">button</button>,
        <mg-icon icon="success"></mg-icon>,
        <mg-button identifier="identifier">mg-button</mg-button>
      ])('element', async(element) => {
        const args = { identifier:"identifier", message: 'blu'};
        const page = await getPage(args, element);
        const mgTooltip = page.doc.querySelector('mg-tooltip');
        const linkedTooltipElement = mgTooltip.querySelector(`[aria-describedby*='${args.identifier}']`);
        const tooltip = mgTooltip.querySelector(`#${args.identifier}`);

        linkedTooltipElement.dispatchEvent(new CustomEvent(eventIn, { bubbles: true }));
        await page.waitForChanges();

        expect(page.root).toMatchSnapshot();
        expect(tooltip).toHaveAttribute('data-show');

        linkedTooltipElement.dispatchEvent(new CustomEvent(eventOut, { bubbles: true }));
        await page.waitForChanges();

        expect(tooltip).not.toHaveAttribute('data-show');
      });
  });
});

