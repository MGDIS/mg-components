import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgPopover } from '../mg-popover';
import { MgButton } from '../../../atoms/mg-button/mg-button';

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
    components: [MgPopover, MgButton],
    template: () => (
      <div id="outer-element">
        <mg-popover {...args}>{element}</mg-popover>
      </div>
    ),
  });

describe('mg-popover', () => {
  test.each([
    { identifier: 'identifier' },
    { identifier: 'identifier', display: true },
    { identifier: 'identifier', closeButton: true },
    { identifier: 'identifier', display: true },
  ])('Should render with element', async args => {
    const { root } = await getPage(args, [
      <h2 slot="title">Blu bli blo bla</h2>,
      <p slot="content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>,
      <mg-button identifier="identifier-btn">mg-button</mg-button>,
    ]);
    expect(root).toMatchSnapshot();
  });

  test.each([
    { eventIn: 'click', eventOut: 'clickBtn' },
    { eventIn: 'click', eventOut: { code: 'Escape' } },
    { eventIn: 'click', eventOut: 'clickCross' },
    // { eventIn: 'click', eventOut: 'clickOutside' },
  ])('Should manage display on events', async ({ eventIn, eventOut }) => {
    const args = { identifier: 'identifier', closeButton: true };
    const page = await getPage(args, [
      <h2 slot="title">Blu bli blo bla</h2>,
      <p slot="content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>,
      <mg-button identifier="identifier-btn">mg-button</mg-button>,
    ]);

    const mgPopover = page.doc.querySelector('mg-popover');
    const interactiveElement = mgPopover.querySelector(`[aria-controls*='${args.identifier}']`);
    const popover = mgPopover.querySelector(`#${args.identifier}`);
    const popoverButton = popover.querySelector(`mg-button`);
    const outerElement = page.doc.querySelector('#outer-element');

    interactiveElement.dispatchEvent(new CustomEvent(eventIn, { bubbles: true }));
    await page.waitForChanges();

    expect(popover).toHaveAttribute('data-show');

    if (typeof eventOut === 'string') {
      if (eventOut === 'clickBtn') {
        interactiveElement.dispatchEvent(new Event('click', { bubbles: true }));
      } else if (eventOut === 'clickCross') {
        popoverButton.dispatchEvent(new Event('click', { bubbles: true }));
      } else if (eventOut === 'clickOutside') {
        outerElement.dispatchEvent(new Event('click', { bubbles: true }));
      }
    } else {
      mgPopover.dispatchEvent(new KeyboardEvent('keydown', { code: eventOut.code }));
    }
    await page.waitForChanges();

    expect(popover).not.toHaveAttribute('data-show');
  });

  test('Should throw error if slot title element is not a heading', async () => {
    try {
      const args = { identifier: 'identifier', closeButton: true };
      await getPage(args, [
        <span slot="title">Blu bli blo bla</span>,
        <p slot="content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>,
        <mg-button identifier="identifier-btn">mg-button</mg-button>,
      ]);
    } catch (err) {
      expect(err.message).toContain('<mg-popover> Slotted title must be a heading:  ');
    }
  });
});
