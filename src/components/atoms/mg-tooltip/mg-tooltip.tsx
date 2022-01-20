import { Component, Element, h, Host, Prop, Watch } from '@stencil/core';
import { createID } from '../../../utils/components.utils';
import { Instance as PopperInstance, createPopper } from '@popperjs/core'

@Component({
  tag: 'mg-tooltip',
  styleUrl: 'mg-tooltip.scss',
  scoped: true,
})
export class MgTooltip {

  /************
   * Internal *
   ************/

  private popper: PopperInstance;
  private tooltip: HTMLElement;

  /**************
   * Decorators *
   **************/

  /**
   * Get component DOM element
   */
  @Element() element: HTMLMgTooltipElement;

  /**
   * Sets an `id` attribute.
   * Needed by the input for accessibility `arai-decribedby`.
   */
  @Prop() identifier: string = createID('mg-tooltip');

  /**
   * Displayed message in the tooltip
   */
  @Prop() message!: string;

  /**
   * Tooltip placement
   */
  @Prop() placement: 'auto'|'auto-start'|'auto-end'|'top'|'top-start'|'top-end'|'bottom'|'bottom-start'|'bottom-end'|'right'|'right-start'|'right-end'|'left'|'left-start'|'left-end' = 'bottom';

  /**
  * Display tooltip
  */
  @Prop({ mutable: true, reflect: true}) display: boolean = false;
  @Watch('display')
  handleDisplay(newVal) {
    if (newVal) {
      this.show();
    } else {
      this.hide();
    }
  }

  /**
   * Show tooltip
   * @returns {void}
   */
  private show = () => {
    // Make the tooltip visible
    this.tooltip.setAttribute('data-show', '');
    // Enable the event listeners
    this.popper.setOptions((options) => ({
      ...options,
      modifiers: [
        ...options.modifiers,
        { name: 'eventListeners', enabled: true },
      ],
    }));
    // Update its position
    this.popper.update();
  }

  /**
   * Hide tooltip
   * @returns {void}
   */
  private hide = (event?: UIEvent & KeyboardEvent) => {
    // we continue to process ONLY for KeyboardEvents 'Escape'
    if(event?.type === 'keydown' && event.code !== 'Escape') {
      return;
    }
    // Hide the tooltip
    this.tooltip.removeAttribute('data-show');
    // Disable the event listeners
    this.popper.setOptions((options) => ({
      ...options,
      modifiers: [
        ...options.modifiers,
        { name: 'eventListeners', enabled: false },
      ],
    }));
  }

  /*************
   * Lifecycle *
   *************/

  render() {
    return (
      <Host>
        <slot></slot>
        <div role="tooltip" id={this.identifier} innerHTML={this.message}><div class="mg-tooltip__arrow" data-popper-arrow></div></div>
      </Host>
    );
  }

  /**
   * Get slotted element
   * Check if it already contain an interactive element, if not we need to add a tabIndex attribute
   * We need to attach the focused element to the tooltip (aria-describedby)
   */
  componentDidLoad() {
    // get slotted element
    const slotElement = this.element.firstElementChild as HTMLElement;
    // Get interactive element
    const interactiveElements = ['a', 'button', 'input', 'textarea', 'select']; //! Might needs updates
    const interactiveElement = this.element.querySelector(interactiveElements.join(',')) || slotElement.shadowRoot?.querySelector(interactiveElements.join(','));

    // define selected element to become tooltip selector
    const tooltipedElement = interactiveElement || slotElement;

    // Add tabindex to slotted element if we can't find any interactive element
    if (interactiveElement === null || interactiveElement === undefined) slotElement.tabIndex = 0;

    // Set aria-describedby
    const ariaDescribedby = slotElement.getAttribute('aria-describedby');
    if(ariaDescribedby === null) {
      tooltipedElement.setAttribute('aria-describedby', this.identifier)
    }
    else {
      slotElement.setAttribute('aria-describedby', `${ariaDescribedby} ${this.identifier}`);
    }

    // Get tooltip element
    this.tooltip = this.element.querySelector(`#${this.identifier}`);

    // Create popperjs tooltip
    this.popper = createPopper((interactiveElement || slotElement), this.tooltip, {
      placement: this.placement,
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 8],
          },
        },
      ],
    });

    this.handleDisplay(this.display);

    // Add events
    ['mouseenter', 'focus'].forEach((event) => {
      tooltipedElement.addEventListener(event, this.show);
    });

    ['mouseleave', 'blur', 'keydown'].forEach((event) => {
      tooltipedElement.addEventListener(event, this.hide);
    });
  }
}
