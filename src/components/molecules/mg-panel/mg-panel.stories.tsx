import { h } from '@stencil/core';

export default {
  component: 'mg-panel',
  title: 'Molecules/mg-panel',
  parameters: { actions: { handles: ['title-change'] } },
};

/**
 * 1. camelCase arguments must be written in the template, for exemple labelOnTop must be placed in the template as label-on-top={args.labelOnTop}
 * 2. boolean arguments with a default true value must be added like display-character-left={args.displayCharacterLeft ? 'true' : 'false'}
 */

const Template = args => {
  // Extract slot so it won't be render as an attribute
  const panelTitle = args.panelTitle;
  delete args.panelTitle;
  const titleEditable = args.titleEditable;
  delete args.titleEditable;
  const expandToggleDisabled = args.expandToggleDisabled;
  delete args.expandToggleDisabled;
  const panelTitlePattern = args.panelTitlePattern;
  delete args.panelTitlePattern;
  const panelTitlePatternErrorMessage = args.panelTitlePatternErrorMessage;
  delete args.panelTitlePatternErrorMessage;
  // return element
  return (
    <mg-panel
      {...args}
      panel-title={panelTitle}
      title-editable={titleEditable}
      expand-toggle-disabled={expandToggleDisabled}
      panel-title-pattern={panelTitlePattern}
      panel-title-pattern-error-message={panelTitlePatternErrorMessage}
    >
      <div>Content</div>
      <div slot="header-right">
        <mg-button variant="secondary">
          <mg-icon icon="file-upload"></mg-icon> Upload
        </mg-button>
        <mg-button is-icon variant="secondary" label="delete">
          <mg-icon icon="trash"></mg-icon>
        </mg-button>
      </div>
    </mg-panel>
  );
};

export const MgPanel = Template.bind({});

MgPanel.args = {
  panelTitle: 'title',
  expanded: false,
  titleEditable: true,
  expandToggleDisabled: true,
};
