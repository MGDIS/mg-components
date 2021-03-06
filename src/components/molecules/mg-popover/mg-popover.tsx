import { Component, Element, Host, h, Prop, Watch } from '@stencil/core';
import { createID } from '../../../utils/components.utils';
import { Instance as PopperInstance, createPopper } from '@popperjs/core';
import { initLocales } from '../../../locales';
import { Placement } from './mg-popover.conf';

@Component({
  tag: 'mg-popover',
  styleUrl: 'mg-popover.scss',
  scoped: true,
})
export class MgPopover {
  /************
   * Internal *
   ************/

  private popper: PopperInstance;
  private popover: HTMLElement;
  private closeButtonId = '';

  // Locales
  private messages;

  /**************
   * Decorators *
   **************/

  /**
   * Get component DOM element
   */
  @Element() element: HTMLMgPopoverElement;

  /**
   * Sets an `id` attribute.
   * Needed by the input for accessibility `aria-decribedby`.
   */
  @Prop() identifier: string = createID('mg-popover');

  /**
   * Popover placement
   */
  @Prop() placement: Placement = 'bottom';

  /**
   * Define if popover has a cross button
   */
  @Prop() closeButton = false;

  /**
   * Display popover
   */
  @Prop({ mutable: true }) display = false;
  @Watch('display')
  handleDisplay(newVal: boolean): void {
    if (newVal) {
      this.show();
    } else {
      this.hide();
    }
  }

  /**
   * Disable popover
   */
  @Prop({ mutable: true }) disabled = false;

  /**
   * Check if clicked outside of component
   *
   * @param {MouseEvent} event mouse event
   * @returns {void}
   */
  private clickOutside = (event: MouseEvent & { target: HTMLElement }): void => {
    if (!this.disabled && event.target.closest(`#${this.identifier}`)?.parentElement.nodeName !== 'MG-POPOVER') {
      this.display = false;
    }
  };

  /**
   * Show popover
   *
   * @returns {void}
   */
  private show = (): void => {
    // Make the popover visible
    this.popover.setAttribute('data-show', '');
    // Enable the event listeners
    this.popper.setOptions(options => ({
      ...options,
      modifiers: [...options.modifiers, { name: 'eventListeners', enabled: true }],
    }));
    // Update its position
    this.popper.update();
    // hide when click outside
    // setTimeout is used to prevent event to trigger after creation
    setTimeout(() => {
      document.addEventListener('click', this.clickOutside, false);
    }, 0);
  };

  /**
   * Hide popover
   *
   * @returns {void}
   */
  private hide = (): void => {
    // Hide the popover
    this.popover.removeAttribute('data-show');
    // Disable the event listeners
    this.popper.setOptions(options => ({
      ...options,
      modifiers: [...options.modifiers, { name: 'eventListeners', enabled: false }],
    }));
    // Remove event listener
    document.removeEventListener('click', this.clickOutside, false);
  };

  /**
   * Handle action for close button
   *
   * @returns {void}
   */
  private handleCloseButton = (): void => {
    this.display = false;
  };

  /*************
   * Lifecycle *
   *************/

  /**
   * Check if component props are well configured on init
   *
   * @returns {void} timeout
   */
  componentWillLoad(): void {
    // Get locales
    this.messages = initLocales(this.element).messages;
  }

  /**
   * Check if component props are well configured on init
   *
   * @returns {void}
   */
  componentDidLoad(): void {
    //Check if slotted title is a heading
    const headingElements = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
    const slotedTitleElement = this.element.querySelector('[slot="title"]');
    if (slotedTitleElement !== null && !headingElements.includes(slotedTitleElement.tagName.toLowerCase())) {
      throw new Error(`<mg-popover> Slotted title must be a heading:  ${headingElements.join(', ')}.`);
    }

    // Set close button id
    if (this.closeButton) {
      this.closeButtonId = `${this.identifier}-close-button`;
    }

    // Get popover content
    this.popover = this.element.querySelector(`#${this.identifier}`);

    //Get interactive element
    const interactiveElement = this.element.firstElementChild as HTMLElement;
    // Add aria attributes
    interactiveElement.setAttribute('aria-controls', this.identifier);
    interactiveElement.setAttribute('aria-expanded', `${this.display}`);

    // Create popperjs popover
    this.popper = createPopper(interactiveElement, this.popover, {
      placement: this.placement,
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 10],
          },
        },
      ],
    });

    // Add events to toggle display
    interactiveElement.addEventListener('click', () => {
      if (!this.disabled) this.display = !this.display;
    });

    // Add events to hide popover
    this.element.addEventListener('keydown', e => {
      if (!this.disabled && e.code === 'Escape') this.display = false;
    });

    this.handleDisplay(this.display);
  }

  /**
   * Render
   *
   * @returns {HTMLElement} HTML Element
   */
  render(): HTMLElement {
    return (
      <Host>
        <slot></slot>
        <div id={this.identifier} class="mg-popover">
          {!this.disabled && this.closeButton && (
            <mg-button identifier={this.closeButtonId} is-icon variant="flat" label={this.messages.general.close} onClick={this.handleCloseButton}>
              <mg-icon icon="cross"></mg-icon>
            </mg-button>
          )}
          <div class="mg-popover__title">
            <slot name="title"></slot>
          </div>
          <slot name="content"></slot>
          <div class="mg-popover__arrow" data-popper-arrow></div>
        </div>
      </Host>
    );
  }
}
