import { Component, Element, Host, h, Prop, Watch, EventEmitter, Event, State } from '@stencil/core';
import { createID, isTagName, getWindows, ClassList } from '../../../utils/components.utils';
import { Instance as PopperInstance, createPopper, Placement } from '@popperjs/core';
import { initLocales } from '../../../locales';

@Component({
  tag: 'mg-popover',
  styleUrl: 'mg-popover.scss',
  shadow: true,
})
export class MgPopover {
  /************
   * Internal *
   ************/

  private popper: PopperInstance;
  private popover: HTMLElement;
  private closeButtonId = '';
  private windows;
  private resizeObserver: ResizeObserver;

  // Locales
  private messages;

  // Classes
  private readonly classArrowHide = `mg-popover--arrow-hide`;

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
   * Hide popover arrow
   */
  @Prop() arrowHide = false;
  @Watch('arrowHide')
  validateArrowHide(newValue: MgPopover['arrowHide']): void {
    if (newValue) this.classList.add(this.classArrowHide);
    else this.classList.delete(this.classArrowHide);
  }

  /**
   * Define if popover has a cross button
   */
  @Prop() closeButton = false;

  /**
   * Display popover
   */
  @Prop({ mutable: true }) display = false;
  @Watch('display')
  handleDisplay(newValue: boolean): void {
    if (newValue) {
      this.show();
    } else {
      this.hide();
    }
    this.displayChange.emit(newValue);
  }

  /**
   * Disable popover
   */
  @Prop({ mutable: true }) disabled = false;

  /**
   * Component classes
   */
  @State() classList: ClassList = new ClassList(['mg-popover']);

  /**
   * Emited event when display value change
   */
  @Event({ eventName: 'display-change' }) displayChange: EventEmitter<boolean>;

  /**
   * Check if clicked outside of component
   *
   * @param {MouseEvent} event mouse event
   * @returns {void}
   */
  private clickOutside = (event: MouseEvent & { target: HTMLElement }): void => {
    if (
      !this.disabled &&
      event.target.closest('mg-popover') !== this.element &&
      !((event.target.closest(`[data-mg-popover-guard]`) as HTMLElement)?.dataset.mgPopoverGuard === this.identifier)
    ) {
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
    this.popover.dataset.show = '';
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
      this.windows.forEach((localWindow: Window) => {
        localWindow.addEventListener('click', this.clickOutside, false);
      });
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
    this.windows.forEach((localWindow: Window) => {
      localWindow.removeEventListener('click', this.clickOutside, false);
    });
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
    // Get windows to attach events
    this.windows = getWindows(window);
    // Get locales
    this.messages = initLocales(this.element).messages;
    this.validateArrowHide(this.arrowHide);
  }

  /**
   * Check if component props are well configured on init
   *
   * @returns {void}
   */
  componentDidLoad(): void {
    const headingTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

    const slottedTitleElement = this.element.querySelector('[slot="title"]');
    if (slottedTitleElement && !isTagName(slottedTitleElement, headingTags)) {
      throw new Error(`<mg-popover> Slotted title must be a heading: ${headingTags.join(', ')}`);
    }

    // Set close button id
    if (this.closeButton) {
      this.closeButtonId = `${this.identifier}-close-button`;
    }

    // Get popover content
    this.popover = this.element.shadowRoot.getElementById(this.identifier);

    //Get interactive element (first element without slot attribute)
    const interactiveElement = this.element.querySelector(':not([slot])') as HTMLElement;
    // Add aria attributes
    interactiveElement.setAttribute('aria-controls', this.identifier);
    interactiveElement.setAttribute('aria-expanded', `${this.display}`);

    // Create popperjs popover
    this.popper = createPopper(interactiveElement, this.popover, {
      placement: this.placement,
      strategy: 'fixed',
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 0],
          },
        },
      ],
    });

    if (this.resizeObserver === undefined) {
      // add resize observer
      this.resizeObserver = new ResizeObserver(entries => {
        if (entries.some(entrie => entrie.target.getAttribute('slot') !== null)) {
          this.popper.update();
        }
      });
      Array.from(this.element.querySelectorAll('[slot]')).forEach(element => {
        this.resizeObserver.observe(element);
      });
    }

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
        <div id={this.identifier} class={this.classList.join()}>
          <mg-card>
            {this.closeButton && (
              <mg-button identifier={this.closeButtonId} is-icon variant="flat" label={this.messages.general.close} onClick={this.handleCloseButton}>
                <mg-icon icon="cross"></mg-icon>
              </mg-button>
            )}
            <div class="mg-popover__title">
              <slot name="title"></slot>
            </div>
            <slot name="content"></slot>
          </mg-card>

          {!this.arrowHide && <div class="mg-popover__arrow" data-popper-arrow></div>}
        </div>
      </Host>
    );
  }
}
