import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgPopover } from '../mg-popover';
import { MgButton } from '../../../atoms/mg-button/mg-button';
import { mockPopperArrowError } from '../../../../utils/unit.test.utils';

mockPopperArrowError();

const getPage = (args, slot, parent?: boolean) => {
  const popover = () => <mg-popover {...args}>{slot}</mg-popover>;
  return newSpecPage({
    components: [MgPopover, MgButton],
    template: () => (parent ? <span data-mg-popover-guard={args.identifier}>{popover()}</span> : popover()),
  });
};

Object.defineProperty(window, 'frames', {
  value: { length: 0 },
});

describe('mg-popover', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.clearAllTimers());

  test.each([
    { identifier: 'identifier' },
    { identifier: 'identifier', placement: 'auto' },
    { identifier: 'identifier', display: true },
    { identifier: 'identifier', closeButton: true },
    { identifier: 'identifier', display: true },
    { identifier: 'identifier', closeButton: true, lang: 'fr' },
    { identifier: 'identifier', closeButton: true, lang: 'xx' },
    { identifier: 'identifier', arrowHide: true },
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
    { eventIn: 'click', eventOut: 'clickDocument' },
    { eventIn: 'click', eventOut: 'clickPopover' },
    { eventIn: 'click', eventOut: 'clickGuard' },
  ])('Should manage display on events %s', async ({ eventIn, eventOut }) => {
    const args = { identifier: 'identifier', closeButton: true };
    const page = await getPage(
      args,
      [
        <h2 slot="title">Blu bli blo bla</h2>,
        <p slot="content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>,
        <mg-button identifier="identifier-btn">mg-button</mg-button>,
      ],
      eventOut === 'clickGuard',
    );

    const mgPopover = page.doc.querySelector('mg-popover');
    const interactiveElement = mgPopover.querySelector(`[aria-controls*='${args.identifier}']`);
    const popover = mgPopover.shadowRoot.querySelector(`#${args.identifier}`);
    const popoverButton = popover.querySelector(`mg-button`);
    const dataGuard = page.doc.querySelector('[data-mg-popover-guard]');

    const displayChangeSpy = jest.spyOn(page.rootInstance.displayChange, 'emit');

    interactiveElement.dispatchEvent(new CustomEvent(eventIn, { bubbles: true }));
    await page.waitForChanges();
    jest.runAllTimers();

    expect(popover).toHaveAttribute('data-show');

    if (typeof eventOut === 'string') {
      if (eventOut === 'clickBtn') {
        interactiveElement.dispatchEvent(new Event('click', { bubbles: true }));
      } else if (eventOut === 'clickCross') {
        popoverButton.dispatchEvent(new Event('click', { bubbles: true }));
      } else if (eventOut === 'clickDocument') {
        document.dispatchEvent(new Event('click', { bubbles: true }));
      } else if (eventOut === 'clickPopover') {
        popover.dispatchEvent(new Event('click', { bubbles: true }));
      } else if (eventOut === 'clickGuard') {
        dataGuard.dispatchEvent(new Event('click', { bubbles: true }));
      }
    } else {
      mgPopover.dispatchEvent(new KeyboardEvent('keydown', { code: eventOut.code }));
    }
    await page.waitForChanges();

    if (typeof eventOut === 'string' && ['clickPopover', 'clickGuard'].includes(eventOut)) {
      expect(popover).toHaveAttribute('data-show');
      expect(displayChangeSpy).toHaveBeenCalledWith(true);
    } else {
      expect(popover).not.toHaveAttribute('data-show');
      expect(displayChangeSpy).toHaveBeenCalledWith(false);
    }
  });

  test('Should throw error if slot title element is not a heading', async () => {
    expect.assertions(1);
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
      expect(err.message).toContain('<mg-popover> Slotted title must be a heading: ');
    }
  });
});
