import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgTooltip } from '../mg-tooltip';
import { MgButton } from '../../mg-button/mg-button';
import { MgIcon } from '../../mg-icon/mg-icon';

// fix popper console.error in test
// it is generated in @popperjs/core/dist/cjs/popper.js l.1859
// this is due to internal function isHTMLElement(), so we can not mock it directly.
// this function check if test DOM element mockHTMLElement instance is 'instanceof HTMLElement'
// so we only override the console.error side effect for this error
const errorFunction = console.error;
const mock = jest.spyOn(console, 'error')
mock.mockImplementation((error) => {
  const compareWith = 'Popper: "arrow" element must be an HTMLElement (not an SVGElement). To use an SVG arrow, wrap it in an HTMLElement that will be used as the arrow.';
  if (error !== compareWith) {
    errorFunction(error)
  }
})

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

