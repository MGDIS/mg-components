/* eslint-disable react/jsx-no-bind */
import { h } from '@stencil/core';

export default {
  component: 'mg-modal',
  title: 'Molecules/mg-modal',
  parameters: { actions: { handles: ['component-show', 'component-hide'] } },
};

/**
 * 1. camelCase arguments must be written in the template, for exemple labelOnTop must be placed in the template as label-on-top={args.labelOnTop}
 * 2. boolean arguments with a default true value must be added like display-character-left={args.displayCharacterLeft ? 'true' : 'false'}
 */

const Template = args => {
  // Extract slot so it won't be render as an attribute
  const slotContent = args.slotContent;
  delete args.slotContent;
  const slotActions = args.slotActions;
  delete args.slotActions;
  const closeButton = args.closeButton;
  delete args.closeButton;
  const modalTitle = args.modalTitle;
  delete args.modalTitle;
  // return element
  return (
    <div>
      <mg-button
        controls="identifier"
        haspopup="dialog"
        onClick={() => {
          const mgModal = document.querySelector('mg-modal');
          const isHide = mgModal.hide === true;
          if (isHide) {
            mgModal.removeAttribute('hide'); // storybook first render is an attribute then we use property
            mgModal.hide = false;
          } else {
            mgModal.hide = true;
          }
        }}
      >
        Open modal
      </mg-button>
      <mg-modal {...args} close-button={closeButton} modal-title={modalTitle}>
        {slotContent && <div slot="content" innerHTML={slotContent}></div>}
        {slotActions && <div slot="actions" innerHTML={slotActions}></div>}
      </mg-modal>
    </div>
  );
};

export const MgModal = Template.bind({});

MgModal.args = {
  slotContent: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>`,
  slotActions: ``,
  modalTitle: 'Modal title',
  identifier: 'identifier',
  closeButton: false,
  hide: true,
};

export const WithCloseButton = Template.bind({});

WithCloseButton.args = {
  ...MgModal.args,
  closeButton: true,
};

export const WithActions = Template.bind({});

WithActions.args = {
  ...MgModal.args,
  closeButton: true,
  slotActions: `<div class="mg-group-elements mg-group-elements--align-right"><mg-button>Primary</mg-button><mg-button variant="secondary">Secondary</mg-button></div>`,
};
