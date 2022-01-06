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

  test.each([true, false])('Should toogle tooltip from prop display, case display %s', async (display) => {
    const args = { identifier:"identifier", message: 'batman', display};
    const element = <span>batman</span>;
    const page = await getPage(args, element);

    const mgTooltip = page.doc.querySelector('mg-tooltip');
    const tooltip = mgTooltip.querySelector(`#${args.identifier}`);

    await page.waitForChanges();

    expect(page.root).toMatchSnapshot();
    if(display) {
      expect(tooltip).toHaveAttribute('data-show');
    } else {
      expect(tooltip).not.toHaveAttribute('data-show');
    }

    page.rootInstance.display = !display;
    await page.waitForChanges();

    expect(page.root).toMatchSnapshot();
    if(display) {
      expect(tooltip).not.toHaveAttribute('data-show');
    } else {
      expect(tooltip).toHaveAttribute('data-show');
    }
  });

  describe('method hide', () => {
    test.each(['Tab', 'Space', 'Enter' , 'i'])('should prevent keyboardEvent, case not "Escape" code', async (key) => {
      const args = { identifier:"identifier", message: 'batman'};
      const element = <span id="batman">batman</span>;
      const page = await getPage(args, element);

      const mgTooltip = page.doc.querySelector('mg-tooltip');
      const tooltip = mgTooltip.querySelector(`#${args.identifier}`);
      const i = page.doc.querySelector('#batman')

      i.dispatchEvent(new CustomEvent('focus', { bubbles: true }));
      await page.waitForChanges();

      expect(tooltip).toHaveAttribute('data-show');

      i.dispatchEvent(new KeyboardEvent('keydown', {'code': key}));
      await page.waitForChanges();

      expect(tooltip).toHaveAttribute('data-show');
    })
  })
});

