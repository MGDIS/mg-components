import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgPanel } from '../mg-panel';

import { MgButton } from '../../../atoms/mg-button/mg-button';
import { MgIcon } from '../../../atoms/mg-icon/mg-icon';
import { MgInputText } from '../../inputs/mg-input-text/mg-input-text';

const getPage = (args, slot?) => {
  const page = newSpecPage({
    components: [MgPanel, MgButton, MgIcon, MgInputText],
    template: () => <mg-panel {...args}>{slot}</mg-panel>,
  });
  jest.runAllTimers();

  return page;
};

describe('mg-panel', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.runOnlyPendingTimers());
  test.each([
    { identifier: 'identifier', panelTitle: 'panel title' },
    { identifier: 'identifier', panelTitle: 'panel title', isOpened: true },
    { identifier: 'identifier', panelTitle: 'panel title', isEditabled: true },
  ])('Should render with args %s:', async args => {
    const { root } = await getPage(args);
    expect(root).toMatchSnapshot();
  });

  describe('navigation', () => {
    test.each([true, false])('Should toggle collapse panel', async isOpened => {
      const page = await getPage({ identifier: 'identifier', panelTitle: 'panel title', isOpened });
      const mgPanel = page.doc.querySelector('mg-panel');
      const collapseButton = mgPanel.shadowRoot.querySelector('.mg-panel__collapse-button');

      expect(page.root).toMatchSnapshot();

      if (isOpened) {
        collapseButton.dispatchEvent(new CustomEvent('click', { bubbles: true }));
        await page.waitForChanges();

        expect(page.root).toMatchSnapshot();

        collapseButton.dispatchEvent(new CustomEvent('click', { bubbles: true }));
        await page.waitForChanges();

        expect(page.root).toMatchSnapshot();
      }
    });

    test.each([true, false])('Should toggle edit panel title', async isEditabled => {
      const page = await getPage({ identifier: 'identifier', panelTitle: 'panel title', isEditabled });
      const mgPanel = page.doc.querySelector('mg-panel');
      const editButton = mgPanel.shadowRoot.querySelector('#identifier-edit-button');

      expect(page.root).toMatchSnapshot();

      if (isEditabled) {
        editButton.dispatchEvent(new CustomEvent('click', { bubbles: true }));
        await page.waitForChanges();

        expect(page.root).toMatchSnapshot();

        editButton.dispatchEvent(new CustomEvent('click', { bubbles: true }));
        await page.waitForChanges();

        expect(page.root).toMatchSnapshot();
      }
    });

    test.each(['cancel', 'validate'])('should update panel title, case %s', async lastAction => {
      const updatedPanelTitle = 'Updated panel title';
      const args = { identifier: 'identifier', panelTitle: 'panel title', isEditabled: true };
      const page = await getPage(args);
      const mgPanel = page.doc.querySelector('mg-panel');
      const editButton = mgPanel.shadowRoot.querySelector('#identifier-edit-button');

      expect(page.root).toMatchSnapshot();

      jest.spyOn(page.rootInstance.titleChange, 'emit');

      editButton.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();

      const mgInputText = mgPanel.shadowRoot.querySelector('mg-input-text');
      const input = mgInputText.shadowRoot.querySelector('input');
      await page.waitForChanges();

      expect(input.focus).toHaveBeenCalled();

      input.value = updatedPanelTitle;
      input.dispatchEvent(new CustomEvent('input', { bubbles: true }));
      await page.waitForChanges();

      input.dispatchEvent(new CustomEvent('blur', { bubbles: true }));
      await page.waitForChanges();

      const afterInputAction = mgPanel.shadowRoot.querySelector(`#identifier-edition-button-${lastAction}`);

      afterInputAction.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();

      if (lastAction === 'validate') {
        expect(mgPanel.panelTitle).toBe(updatedPanelTitle);
        expect(page.rootInstance.titleChange.emit).toHaveBeenCalledWith(updatedPanelTitle);
      } else {
        expect(mgPanel.panelTitle).toBe(args.panelTitle);
        expect(page.rootInstance.titleChange.emit).not.toHaveBeenCalled();
      }
    });

    test('should NOT update panel title, case no enter in input', async () => {
      const updatedPanelTitle = 'Updated panel title';
      const args = { identifier: 'identifier', panelTitle: 'panel title', isEditabled: true };
      const page = await getPage(args);
      const mgPanel = page.doc.querySelector('mg-panel');
      const editButton = mgPanel.shadowRoot.querySelector('#identifier-edit-button');

      expect(page.root).toMatchSnapshot();

      jest.spyOn(page.rootInstance.titleChange, 'emit');

      editButton.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();

      const mgInputText = mgPanel.shadowRoot.querySelector('mg-input-text');
      const input = mgInputText.shadowRoot.querySelector('input');
      await page.waitForChanges();

      expect(input.focus).toHaveBeenCalled();

      input.dispatchEvent(new CustomEvent('blur', { bubbles: true }));
      await page.waitForChanges();

      const afterInputAction = mgPanel.shadowRoot.querySelector(`#identifier-edition-button-validate`);

      afterInputAction.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();

      expect(mgPanel.panelTitle).toBe(args.panelTitle);
      expect(page.rootInstance.titleChange.emit).not.toHaveBeenCalledWith(updatedPanelTitle);
    });
  });
});
