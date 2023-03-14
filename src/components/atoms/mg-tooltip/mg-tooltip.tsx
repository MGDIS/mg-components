import { Component, Element, h, Host, Prop, Watch } from '@stencil/core';
import { createID, focusableElements } from '../../../utils/components.utils';
import { Instance as PopperInstance, createPopper, Placement } from '@popperjs/core';
import { Guard } from './mg-tooltip.conf';

@Component({
  tag: 'mg-tooltip',
  styleUrl: 'mg-tooltip.scss',
  shadow: true,
})
export class MgTooltip {
  /************
   * Internal *
   ************/

  private popper: PopperInstance;
  private tooltip: HTMLElement;
  private tooltipedElement: HTMLElement;

  // tooltip actions guards
  private guard: Guard;

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
  @Watch('message')
  validateMessage(newValue: string): void {
    if (typeof newValue !== 'string' || newValue.trim() === '') {
      throw new Error('<mg-tooltip> prop "message" is required.');
    }
  }

  /**
   * Tooltip placement
   */
  @Prop() placement: Placement = 'bottom';

  /**
   * Display tooltip
   */
  @Prop({ mutable: true }) display = false;
  @Watch('display')
  handleDisplay(newValue: boolean): void {
    if (newValue) {
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
    this.tooltip.dataset.show = '';
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

  /**
   * Method to set display prop
   *
   * @param {boolean} newValue display prop new value
   * @param {boolean} condition additionnal condition to apply display prop newValue
   * @returns {void}
   */
  private setDisplay = (newValue: boolean, condition = true): void => {
    if (!this.disabled && condition) this.display = newValue;
  };

  /**
   * Action for tooltip element and tooltiped element mouse listener
   *
   * @param {Guard} elementGuard tooltip element guard
   * @param {boolean} isMouseenter mouseenter validation
   * @param {Guard} conditionalGuard guard condition
   * @returns {void}
   */
  private tooltipMouseListenerAction = (elementGuard: Guard, isMouseenter: boolean, conditionalGuard: Guard): void => {
    // we mutate elementGuard
    if (this.guard !== Guard.FOCUS) {
      this.guard = elementGuard;
      if (!isMouseenter) {
        setTimeout(() => {
          this.setDisplay(isMouseenter, this.guard !== conditionalGuard);
          this.resetGuard();
        }, 100);
      } else if (this.guard === Guard.HOVER_TOOLTIPED_ELEMENT) {
        this.setDisplay(isMouseenter);
      }
    }
  };

  /**
   * Method to reset guard value
   *
   * @returns {void}
   */
  private resetGuard = (): void => {
    this.guard = undefined;
  };

  /**
   * Update slot content when it is a mg-button
   *
   * @param {HTMLMgButtonElement} mgButton slotted mg-button
   * @returns {void}
   */
  private setMgButtonWrapper = (mgButton: HTMLMgButtonElement): void => {
    if (mgButton.disabled) {
      const div = document.createElement('div');
      div.classList.add('mg-tooltip__mg-button-wrapper');
      mgButton.parentNode.insertBefore(div, mgButton);
      div.appendChild(mgButton);
      this.tooltipedElement = div;
    } else if (mgButton.parentElement.classList.contains('mg-tooltip__mg-button-wrapper')) {
      this.element.firstElementChild.replaceWith(mgButton);
      this.tooltipedElement = mgButton;
    }
  };

  /**
   * Init tooltip
   *
   * @param {HTMLElement} slotElement slotted element
   * @param {HTMLElement} interactiveElement interactive element
   */
  private initTooltip = (slotElement: HTMLElement, interactiveElement: HTMLElement): void => {
    // Add tabindex to slotted element if we can't find any interactive element
    if (interactiveElement === null || interactiveElement === undefined) slotElement.tabIndex = 0;
    // Set aria-describedby
    const ariaDescribedby = slotElement.getAttribute('aria-describedby');

    if (ariaDescribedby === null) {
      this.tooltipedElement.setAttribute('aria-describedby', this.identifier);
    } else {
      // We ensure to have uniq ids
      slotElement.setAttribute('aria-describedby', `${[...new Set([...ariaDescribedby.split(' '), this.identifier])].join(' ')}`);
    }

    // Create popperjs tooltip
    this.popper = createPopper(this.tooltipedElement, this.tooltip, {
      placement: this.placement,
      strategy: 'fixed',
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 8],
          },
        },
      ],
    });

    // Manage tooltipedElement focus/blur events
    this.tooltipedElement.addEventListener('focus', () => {
      this.guard = Guard.FOCUS;
      this.setDisplay(true);
    });

    this.tooltipedElement.addEventListener('blur', () => {
      this.resetGuard();
      this.setDisplay(false);
    });

    document.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.code === 'Escape') this.setDisplay(false);
    });

    // manage tooltipElement & tooltipedElement mouseenter/mouseleave events
    ['mouseenter', 'mouseleave'].forEach(eventType => {
      const isMouseenter = eventType === 'mouseenter';
      [
        { element: this.tooltip, action: () => this.tooltipMouseListenerAction(Guard.HOVER_TOOLTIP_ELEMENT, isMouseenter, Guard.HOVER_TOOLTIPED_ELEMENT) },
        { element: this.tooltipedElement, action: () => this.tooltipMouseListenerAction(Guard.HOVER_TOOLTIPED_ELEMENT, isMouseenter, Guard.HOVER_TOOLTIP_ELEMENT) },
      ].forEach(({ element, action }) => {
        element.addEventListener(eventType, () => {
          action();
        });
      });
    });
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
    this.tooltip = this.element.shadowRoot.querySelector(`#${this.identifier}`);

    // get slotted element
    const slotElement = this.element.firstElementChild as HTMLElement;

    // Get interactive element
    const interactiveElement: HTMLElement = slotElement.matches(focusableElements) ? slotElement : slotElement.shadowRoot?.querySelector(focusableElements);

    // define selected element to become tooltip selector
    this.tooltipedElement = interactiveElement || slotElement;

    // Check if slotted element is a disabled mg-button
    // In this case we wrap the mg-button into a div to enable the tooltip
    if (['MG-BUTTON', 'BUTTON'].includes(slotElement.tagName)) {
      new MutationObserver(mutationList => {
        if (mutationList.some(mutation => ['aria-disabled', 'disabled'].includes(mutation.attributeName))) {
          this.setMgButtonWrapper(slotElement as HTMLMgButtonElement);
          // Since Firefox doesn't trigger a "blur" event when the "disabled" attribute is added or removed from a button
          // we have to manually unlock the guard because the "blur" handler of the tooltipedElement won't do it.
          this.resetGuard();
          this.initTooltip(slotElement, interactiveElement);
        }
      }).observe(slotElement, { attributes: true });
      this.setMgButtonWrapper(slotElement as HTMLMgButtonElement);
    }

    // Init Tooltip
    this.initTooltip(slotElement, interactiveElement);

    this.handleDisplay(this.display);
    this.validateMessage(this.message);
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
        <div role="tooltip" id={this.identifier} class="mg-tooltip">
          <span innerHTML={this.message}></span>
          <div class="mg-tooltip__arrow" data-popper-arrow></div>
        </div>
      </Host>
    );
  }
}
