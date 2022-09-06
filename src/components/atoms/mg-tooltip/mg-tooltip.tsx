import { Component, Element, h, Host, Prop, Watch } from '@stencil/core';
import { createID } from '../../../utils/components.utils';
import { Instance as PopperInstance, createPopper } from '@popperjs/core';
import { Placement } from './mg-tooltip.conf';

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
   * Needed by the input for accessibility `aria-decribedby`.
   */
  @Prop() identifier: string = createID('mg-tooltip');

  /**
   * Displayed message in the tooltip
   */
  @Prop() message!: string;

  /**
   * Tooltip placement
   */
  @Prop() placement: Placement = 'bottom';

  /**
   * Display tooltip
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
   * Disable tooltip
   */
  @Prop({ mutable: true }) disabled = false;

  /**
   * Show tooltip
   *
   * @returns {void}
   */
  private show = (): void => {
    // Make the tooltip visible
    this.tooltip.setAttribute('data-show', '');
    // Enable the event listeners
    this.popper.setOptions(options => ({
      ...options,
      modifiers: [...options.modifiers, { name: 'eventListeners', enabled: true }],
    }));
    // Update its position
    this.popper.update();
  };

  /**
   * Hide tooltip
   *
   * @returns {void}
   */
  private hide = (): void => {
    // Hide the tooltip
    this.tooltip.removeAttribute('data-show');
    // Disable the event listeners
    this.popper.setOptions(options => ({
      ...options,
      modifiers: [...options.modifiers, { name: 'eventListeners', enabled: false }],
    }));
  };

  /*************
   * Lifecycle *
   *************/

  /**
   * Get slotted element
   * Check if it already contain an interactive element, if not we need to add a tabIndex attribute
   * We need to attach the focused element to the tooltip (aria-describedby)
   *
   * @returns {void}
   */
  componentDidLoad(): void {
    // Get tooltip element
    this.tooltip = this.element.querySelector(`#${this.identifier}`);

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
    if (ariaDescribedby === null) {
      tooltipedElement.setAttribute('aria-describedby', this.identifier);
    } else {
      slotElement.setAttribute('aria-describedby', `${ariaDescribedby} ${this.identifier}`);
    }

    // Create popperjs tooltip
    this.popper = createPopper(tooltipedElement, this.tooltip, {
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

    // Add events
    ['mouseenter', 'focus'].forEach(event => {
      tooltipedElement.addEventListener(event, () => {
        if (!this.disabled) this.display = true;
      });
    });

    ['blur', 'keydown'].forEach(event => {
      tooltipedElement.addEventListener(event, (e: UIEvent & KeyboardEvent) => {
        // we continue to process ONLY for KeyboardEvents 'Escape'
        if (e.type === 'keydown' && e.code !== 'Escape') {
          return;
        }
        if (!this.disabled) this.display = false;
      });
    });

    this.element.addEventListener('mouseleave', () => {
      if (!this.disabled) this.display = false;
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
        <div role="tooltip" id={this.identifier} class="mg-tooltip" innerHTML={this.message}>
          <div class="mg-tooltip__arrow" data-popper-arrow></div>
        </div>
      </Host>
    );
  }
}
