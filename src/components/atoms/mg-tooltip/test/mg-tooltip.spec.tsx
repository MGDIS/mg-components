import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgTooltip } from '../mg-tooltip';
import { MgButton } from '../../mg-button/mg-button';
import { MgIcon } from '../../mg-icon/mg-icon';
import { setupMutationObserverMock } from '../../../../utils/unit.test.utils';

// fix popper console.error in test
// it is generated in @popperjs/core/dist/cjs/popper.js l.1859
// this is due to internal function isHTMLElement(), so we can not mock it directly.
// this function check if test DOM element mockHTMLElement instance is 'instanceof HTMLElement'
// so we only override the console.error side effect for this error
const errorFunction = console.error;
const mock = jest.spyOn(console, 'error');
mock.mockImplementation(error => {
  const compareWith = 'Popper: "arrow" element must be an HTMLElement (not an SVGElement). To use an SVG arrow, wrap it in an HTMLElement that will be used as the arrow.';
  if (error !== compareWith) {
    errorFunction(error);
  }
});

const getPage = (args, element) =>
  newSpecPage({
    components: [MgTooltip, MgButton, MgIcon],
    template: () => <mg-tooltip {...args}>{element}</mg-tooltip>,
  });

describe('mg-tooltip', () => {
  let fireMo;

  beforeEach(() => {
    jest.useFakeTimers();
    setupMutationObserverMock({
      observe: function () {
        fireMo = this.cb;
      },
      disconnect: function () {
        return null;
      },
      takeRecords: () => [],
    });
  });

  afterEach(() => jest.runOnlyPendingTimers());

  test.each([
    <span>span</span>,
    <button aria-describedby="blu">button</button>,
    <mg-icon icon="check-circle"></mg-icon>,
    <mg-button identifier="identifier">mg-button</mg-button>,
    <mg-button identifier="identifier" disabled>
      mg-button.disabled
    </mg-button>,
  ])('Should render with element', async element => {
    const args = { identifier: 'identifier', message: 'My tooltip message' };
    const { root } = await getPage(args, element);
    expect(root).toMatchSnapshot();
  });

  test('Should render with element with given placement', async () => {
    const args = { identifier: 'identifier', message: 'My tooltip message', placement: 'auto' };
    const { root } = await getPage(args, <span>span</span>);
    expect(root).toMatchSnapshot();
  });

  test.each(['', ' ', undefined])('Should throw error, case invalid message prop', async message => {
    expect.assertions(1);
    try {
      await getPage({ message }, <span>span</span>);
    } catch (err) {
      expect(err.message).toContain('<mg-tooltip> prop "message" is required.');
    }
  });

  describe.each([
    { eventIn: 'mouseenter', eventOut: 'mouseleave' },
    { eventIn: 'focus', eventOut: 'blur' },
  ])('Should manage display on events enter with %s, leave with %s', ({ eventIn, eventOut }) => {
    test.each([
      <span>span</span>,
      <button aria-describedby="blu">button</button>,
      <mg-icon icon="check-circle"></mg-icon>,
      <mg-button identifier="identifier-mg-button">mg-button</mg-button>,
    ])('element', async element => {
      const args = { identifier: 'identifier', message: 'blu' };
      const page = await getPage(args, element);
      const mgTooltip = page.doc.querySelector('mg-tooltip');
      const linkedTooltipElement = mgTooltip.querySelector(`[aria-describedby*='${args.identifier}']`);
      const tooltip = mgTooltip.shadowRoot.querySelector(`#${args.identifier}`);

      linkedTooltipElement.dispatchEvent(new CustomEvent(eventIn, { bubbles: true }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();
      expect(tooltip).toHaveAttribute('data-show');

      linkedTooltipElement.dispatchEvent(new CustomEvent(eventOut, { bubbles: true }));

      if (eventOut === 'mouseleave') {
        jest.runOnlyPendingTimers();
      }

      await page.waitForChanges();

      expect(tooltip).not.toHaveAttribute('data-show');
    });

    test.each([false, true])('should not call event methods when disabled and display:%s', async display => {
      const args = { identifier: 'identifier', message: 'blu', disabled: true, display };
      const page = await getPage(args, <span>span</span>);
      const mgTooltip = page.doc.querySelector('mg-tooltip');
      const linkedTooltipElement = mgTooltip.querySelector(`[aria-describedby*='${args.identifier}']`);
      const tooltip = mgTooltip.shadowRoot.querySelector(`#${args.identifier}`);

      [eventIn, eventOut].forEach(async event => {
        linkedTooltipElement.dispatchEvent(new CustomEvent(event, { bubbles: true }));
        await page.waitForChanges();
        if (display) {
          expect(tooltip).toHaveAttribute('data-show');
        } else {
          expect(tooltip).not.toHaveAttribute('data-show');
        }
      });
    });
  });

  test.each([true, false])('Should toogle tooltip from prop display, case display %s', async display => {
    const args = { identifier: 'identifier', message: 'batman', display };
    const page = await getPage(args, <span>batman</span>);
    const mgTooltip = page.doc.querySelector('mg-tooltip');
    const tooltip = mgTooltip.shadowRoot.querySelector(`#${args.identifier}`);

    expect(page.root).toMatchSnapshot();
    if (display) {
      expect(tooltip).toHaveAttribute('data-show');
    } else {
      expect(tooltip).not.toHaveAttribute('data-show');
    }

    page.rootInstance.display = !display;
    await page.waitForChanges();

    expect(page.root).toMatchSnapshot();
    if (display) {
      expect(tooltip).not.toHaveAttribute('data-show');
    } else {
      expect(tooltip).toHaveAttribute('data-show');
    }
  });

  describe('hide method', () => {
    test.each(['Tab', 'Space', 'Enter', 'i'])('should prevent keyboardEvent, case not "Escape" code', async key => {
      const args = { identifier: 'identifier', message: 'batman' };
      const page = await getPage(args, <span id="batman">batman</span>);
      const mgTooltip = page.doc.querySelector('mg-tooltip');
      const tooltip = mgTooltip.shadowRoot.querySelector(`#${args.identifier}`);
      const element = page.doc.querySelector('#batman');

      element.dispatchEvent(new CustomEvent('focus', { bubbles: true }));
      await page.waitForChanges();

      expect(tooltip).toHaveAttribute('data-show');

      document.dispatchEvent(new KeyboardEvent('keydown', { code: key }));
      await page.waitForChanges();

      expect(tooltip).toHaveAttribute('data-show');
    });

    test('should hide tooltip with keyboardEvent, case "Escape" code', async () => {
      const args = { identifier: 'identifier', message: 'batman' };
      const page = await getPage(args, <span id="batman">batman</span>);
      const mgTooltip = page.doc.querySelector('mg-tooltip');
      const tooltip = mgTooltip.shadowRoot.querySelector(`#${args.identifier}`);
      const element = page.doc.querySelector('#batman');

      element.dispatchEvent(new CustomEvent('focus', { bubbles: true }));
      await page.waitForChanges();

      expect(tooltip).toHaveAttribute('data-show');

      document.dispatchEvent(new KeyboardEvent('keydown', { code: 'Escape' }));
      await page.waitForChanges();

      expect(tooltip).not.toHaveAttribute('data-show');
    });
  });

  test('Should keep displayed tooltip when hover it', async () => {
    const element = <span>span</span>;
    const eventIn = 'mouseenter';
    const eventOut = 'mouseleave';
    const args = { identifier: 'identifier', message: 'blu' };
    const page = await getPage(args, element);
    const mgTooltip = page.doc.querySelector('mg-tooltip');
    const linkedTooltipElement = mgTooltip.querySelector(`[aria-describedby*='${args.identifier}']`);
    const tooltip = mgTooltip.shadowRoot.querySelector(`#${args.identifier}`);

    // 1. hover tooltipedElement and display tooltip
    linkedTooltipElement.dispatchEvent(new CustomEvent(eventIn, { bubbles: true }));
    await page.waitForChanges();

    expect(page.root).toMatchSnapshot();
    expect(tooltip).toHaveAttribute('data-show');

    // 2.1 leave tooltipedElement and tooltip stay displayed
    linkedTooltipElement.dispatchEvent(new CustomEvent(eventOut, { bubbles: true }));
    await page.waitForChanges();

    expect(tooltip).toHaveAttribute('data-show');

    // 2.2 hover on tooltipedElement and tooltip stay displayed
    tooltip.dispatchEvent(new CustomEvent(eventIn, { bubbles: true }));
    await page.waitForChanges();

    // 2.3 flush promise to keep tooltip display thanks to guard
    jest.advanceTimersByTime(200);
    await page.waitForChanges();

    expect(tooltip).toHaveAttribute('data-show');

    // 3 leave tooltipElement
    tooltip.dispatchEvent(new CustomEvent(eventOut, { bubbles: true }));
    await page.waitForChanges();

    // 3.2 flush promise to pass tooltip guard and hide it
    jest.advanceTimersByTime(200);
    await page.waitForChanges();

    expect(tooltip).not.toHaveAttribute('data-show');
  });

  test.each(['button', 'mg-button'])('Should update %s wrapper dynamically', async TagName => {
    const page = await getPage(
      { identifier: 'identifier', message: 'My tooltip message' },
      <TagName identifier="identifier" disabled>
        {TagName}.disabled
      </TagName>,
    );

    expect(page.root).toMatchSnapshot();

    // Mock replaceWith
    const mgTooltip = page.doc.querySelector('mg-tooltip');
    mgTooltip.firstElementChild.replaceWith = jest.fn(element => {
      mgTooltip.innerHTML = (element as Node).parentElement.innerHTML;
    });

    const mgButton: HTMLButtonElement | HTMLMgButtonElement = page.doc.querySelector(TagName);
    mgButton.disabled = false;
    fireMo([{ attributeName: TagName === 'MG-BUTTON' ? 'aria-disabled' : 'disabled' }]);
    await page.waitForChanges();

    expect(page.root).toMatchSnapshot();
  });

  test('Should update popper instance when "message" prop change', async () => {
    const page = await getPage(
      { identifier: 'identifier', message: 'My tooltip message' },
      <mg-button identifier="identifier" disabled>
        mg-button.disabled
      </mg-button>,
    );

    const spy = jest.spyOn(page.rootInstance.popper, 'update');
    const mgTooltip = page.doc.querySelector('mg-tooltip');
    mgTooltip.message = 'my new message';

    await page.waitForChanges();

    expect(spy).toHaveBeenCalled();
  });
});
