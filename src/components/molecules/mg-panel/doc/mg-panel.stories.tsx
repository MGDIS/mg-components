import { h } from '@stencil/core';
import { filterArgs } from '../../../../../.storybook/utils';

export default {
  component: 'mg-panel',
  title: 'Molecules/mg-panel',
  parameters: { actions: { handles: ['title-change', 'expanded-change'] } },
};

/**
 * Template
 *
 * @param {any} args component arguments
 * @returns {HTMLElement} HTMLElement
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template = (args: any): HTMLElement => (
  <mg-panel {...filterArgs(args)}>
    <div>Content</div>
    <div slot="header-right">
      <mg-button variant="secondary">
        <mg-icon icon="file-upload"></mg-icon> Upload
      </mg-button>
      <mg-button {...filterArgs({ isIcon: true })} variant="secondary" label="delete">
        <mg-icon icon="trash"></mg-icon>
      </mg-button>
    </div>
  </mg-panel>
);

export const MgPanel = Template.bind({});

MgPanel.args = {
  panelTitle: 'title',
  expanded: false,
  titleEditable: true,
  expandToggleDisabled: false,
};
