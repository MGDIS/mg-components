import { Component, h, Prop, State, Host, Watch, Element, Event, EventEmitter } from '@stencil/core';
import { OverflowBehaviorElements } from '../../../../utils/behaviors.utils';
import { ClassList } from '../../../../utils/components.utils';
import { initLocales } from '../../../../locales';
import { MgMenu } from '../mg-menu/mg-menu';
import { Direction, MenuSizeType, MessageType } from '../mg-menu/mg-menu.conf';
import { Status } from './mg-menu-item.conf';

@Component({
  tag: 'mg-menu-item',
  styleUrl: 'mg-menu-item.scss',
  shadow: true,
})
export class MgMenuItem {
  /************
   * Internal *
   ************/

  private readonly name = 'mg-menu-item';
  private readonly navigationButton = `${this.name}__navigation-button`;
  private badgeLabel: string;

  /**************
   * Decorators *
   **************/

  /**
   * Get component DOM element
   */
  @Element() element: HTMLMgMenuItemElement;

  /************
   * Props *
   ************/

  /**
   * Define menu-item href
   * when defined menu-item contain an anchor instead of button
   */
  @Prop() href: string;

  /**
   * Define menu-item status. Default: "visible"
   */
  @Prop({ reflect: true, mutable: true }) status: Status = Status.VISIBLE;
  @Watch('status')
  validateStatus(newValue: MgMenuItem['status'], oldValue?: MgMenuItem['status']): void {
    if (oldValue !== undefined) {
      this.navigationButtonClassList.delete(`${this.navigationButton}--${oldValue}`);
    }
    this.navigationButtonClassList.add(`${this.navigationButton}--${newValue}`);
    this.statusChange.emit(newValue);
  }

  /**
   * Define menu-item content expanded. Default: false.
   */
  @Prop({ mutable: true }) expanded = false;
  @Watch('expanded')
  validateExpanded(newValue: MgMenuItem['expanded']): void {
    if (typeof newValue !== 'boolean') throw new Error(`<${this.name}> prop "expanded" must be a boolean.`);

    // if menu-item has sub-menu we have to apply some updates:
    if (this.hasChildren) {
      const subItems = Array.from(this.element.querySelectorAll(this.name));
      if (!newValue) {
        // - when main menu item is NOT expanded we need NOT expanded sub-items and NOT expanded sub-content
        subItems.forEach(item => {
          item.expanded = false;
        });
      } else if (newValue && this.hasStatus(this.element, Status.ACTIVE)) {
        // - when expanded and contain an active item parents are expended too
        subItems.forEach(item => {
          if (this.hasStatus(item, Status.ACTIVE)) {
            item.expanded = true;
          }
        });
      }
    }
  }

  /**********
   * Events *
   *********/

  /**
   * Emited event when status change
   */
  @Event({ eventName: 'status-change' }) statusChange: EventEmitter<MgMenuItem['status']>;

  /**********
   * States *
   *********/

  /**
   * Define menu-item size. Default: "regular".
   */
  @State() size: MenuSizeType = 'regular';
  @Watch('size')
  validateSize(newValue: MgMenuItem['size'], oldValue?: MgMenuItem['size']): void {
    this.navigationButtonClassList.delete(`${this.navigationButton}--size-${oldValue}`);
    this.navigationButtonClassList.add(`${this.navigationButton}--size-${newValue}`);
  }

  /**
   * Component button classes
   */
  @State() navigationButtonClassList: ClassList = new ClassList([this.navigationButton]);

  /**
   * Parent menu direction
   */
  @State() direction: MgMenu['direction'];

  /**
   * Does component is in main menu
   */
  @State() isInMainMenu: boolean;

  /**
   * Does component have children. Default: false.
   */
  @State() hasChildren = false;
  @Watch('hasChildren')
  validateHasChildren(newValue: boolean): void {
    if (newValue && this.element.href !== undefined) {
      throw new Error(`<${this.name}> prop "href" is unauthorizied when element is a parent.`);
    }
  }

  /**
   * Does component should display notification badge.
   */
  @State() displayNotificationBadge: boolean;

  /***********
   * Methods *
   **********/

  /**
   * Toggle expanded prop value
   *
   * @returns {void}
   */
  private toggleExpanded = (): void => {
    this.expanded = !this.expanded;
  };

  /**
   * Does an Element have given Status
   *
   * @param {Element} element to parse
   * @param {MgMenuItem['status']} status to check
   * @returns {boolean} true if element with status is found
   */
  private hasStatus = (element: Element, status: MgMenuItem['status']): boolean => element.querySelector(`${this.name}[status="${status}"]`) !== null;

  /**
   * Is component contextual direction match the given direction
   *
   * @param {MgMenuItem['direction']} direction in parent menu
   * @returns {boolean} true is direction match the direction propertie
   */
  private isdirection = (direction: MgMenuItem['direction']): boolean => this.direction === direction;

  /************
   * Handlers *
   ************/

  /**
   * Handle interacrtive element click
   *
   * @param {MouseEvent} event click on element
   * @returns {void}
   */
  private handleElementCLick = (event: MouseEvent): void => {
    if ((this.hasChildren && !this.isInMainMenu) || this.status === Status.DISABLED) {
      event.preventDefault();
      event.stopPropagation();
    }

    // toggle expanded when mg-menu-item has child items
    if (this.hasChildren) this.toggleExpanded();
  };

  /**
   * Handle popover element display-change event
   *
   * @param {CustomEvent} event popover display event
   * @returns {void}
   */
  private handlePopoverDisplay = (event: CustomEvent): void => {
    this.expanded = event.detail;
  };

  /**
   * Update displayNotificationBadge
   * current component notification badge have priority over the slot badge when submenu contain badge
   *
   * @returns {void} update displayNotificationBadge value
   */
  private updateDisplayNotificationBadge = (): void => {
    const childMenu = this.element.querySelector('mg-menu');
    this.displayNotificationBadge =
      childMenu !== null &&
      Array.from(childMenu.children).some((subItem: HTMLMgMenuItemElement) => subItem.querySelector('mg-badge') !== null && subItem.getAttribute('hidden') === null);
  };

  /*************
   * Lifecycle *
   *************/

  /**
   * Validate props
   *
   * @returns {void}
   */
  componentWillLoad(): void {
    // has children items that is NOT [slot='image' | 'information' | 'label' | 'metadata'] element
    // we store only matching elements
    this.hasChildren = Array.from(this.element.children).filter(child => !['image', 'information', 'label', 'metadata'].includes(child.getAttribute('slot'))).length > 0;

    // Validate props
    this.validateSize(this.size);
    this.validateStatus(this.status);
    this.validateExpanded(this.expanded);
    this.badgeLabel = (initLocales(this.element).messages as { plusMenu: MessageType }).plusMenu.badgeLabel;
  }

  /**
   * Check if component slots configuration
   *
   * @returns {ReturnType<typeof setTimeout>} timeout
   */
  componentDidLoad(): ReturnType<typeof setTimeout> {
    // slot title AND metadata validation
    // add title on label AND metada slots due to text-overflow on these element
    if (Array.from(this.element.children).find(child => child.getAttribute('slot') === 'label') === undefined) throw new Error(`<${this.name}> slot "label" is required.`);

    ['label', 'metadata'].forEach(slot => {
      Array.from(this.element.querySelectorAll(`[slot="${slot}"]`)).forEach(element => {
        if (element.textContent.trim().length < 1) throw new Error(`<${this.name}> slot "${slot}" must have text content.`);
        if (element.getAttribute('title') === null) element.setAttribute('title', element.textContent);
      });
    });

    // update props and states after componentDidLoad hook
    // return a promise to process action only in the FIRST render().
    // https://stenciljs.com/docs/component-lifecycle#componentwillload
    return setTimeout(() => {
      // define menu-item context states
      const menu = this.element.closest('mg-menu');
      this.direction = this.element.getAttribute(OverflowBehaviorElements.MORE) !== null || menu === null ? Direction.HORIZONTAL : menu.direction;
      this.size = menu?.size;

      this.isInMainMenu = this.element.parentElement.closest('mg-menu-item') === null;

      // when main menu item contain an active item it will get the active style
      // AND if item is in vertical menu it will be expanded
      const hasActiveChild = Array.from(this.element.children).some(element => this.hasStatus(element, Status.ACTIVE) && element.getAttribute('hidden') === null);
      if (this.isInMainMenu && hasActiveChild) {
        this.status = Status.ACTIVE;
        this.expanded = this.isdirection(Direction.VERTICAL);
      }

      // manage menu items style depending to parent menu horientation
      this.element.setAttribute(`data-style-direction-${this.direction}`, '');
      this.navigationButtonClassList.add(`${this.navigationButton}--${this.direction}`);

      this.updateDisplayNotificationBadge();

      // manage all sub levels child menu-items level with data-level attribut
      if (this.isdirection(Direction.VERTICAL)) {
        Array.from(this.element.querySelectorAll('mg-menu-item')).forEach(item => {
          const itemLevel = Number(item.getAttribute('data-level')) || 1;
          item.setAttribute('data-level', `${itemLevel + 1}`);
        });
      }

      // manage first sub-level menu-items
      const childItems = Array.from(this.element.querySelector('mg-menu')?.children || []).filter(item => item.nodeName === 'MG-MENU-ITEM');
      childItems.forEach(item => {
        // manage child menu listener
        new MutationObserver(() => {
          this.updateDisplayNotificationBadge();
        }).observe(item, { attributes: true });
      });
    }, 0);
  }

  /**
   * Render ineractive element
   *
   * @returns {HTMLElement} HTML Element
   */
  private renderInteractiveElement(): HTMLElement {
    const TagName: string = this.href !== undefined ? 'a' : 'button';
    return (
      <TagName
        href={this.href}
        class={this.navigationButtonClassList.join()}
        tabindex={[Status.DISABLED, Status.HIDDEN].includes(this.status) ? -1 : 0}
        disabled={this.status === Status.DISABLED}
        hidden={this.status === Status.HIDDEN}
        aria-expanded={this.hasChildren && this.expanded.toString()}
        aria-current={this.status === Status.ACTIVE && 'page'}
        onClick={this.handleElementCLick}
      >
        <slot name="image"></slot>
        <div class={`${this.navigationButton}-center`}>
          <div class={`${this.navigationButton}-text-content`}>
            <slot name="label"></slot>
            {!this.displayNotificationBadge && <slot name="information"></slot>}
            {this.displayNotificationBadge && (
              <span class="mg-menu-item__navigation-button-text-content-notification">
                <mg-badge label={this.badgeLabel} value="!" variant="info" slot="information"></mg-badge>
              </span>
            )}
          </div>
          {this.size !== 'regular' && <slot name="metadata"></slot>}
        </div>
        {this.hasChildren && this.href === undefined && (
          <span
            class={{
              [`${this.navigationButton}-chevron`]: true,
              [`${this.navigationButton}-chevron--rotate`]: this.expanded === true,
              'mg-a11y-animation': true,
            }}
          >
            <mg-icon icon="chevron-down"></mg-icon>
          </span>
        )}
      </TagName>
    );
  }

  /**
   * Render slot
   *
   * @returns {HTMLElement} HTML Element
   */
  private renderSlot = (): HTMLElement => <slot></slot>;

  /**
   * Render
   *
   * @returns {HTMLElement} HTML Element
   */
  render(): HTMLElement {
    const getContainerClasses = () => ({
      [`${this.name}__collapse-container`]: true,
      [`${this.name}__collapse-container--first-level`]: this.isInMainMenu && this.isdirection(Direction.HORIZONTAL),
    });

    return (
      <Host role="menuitem" aria-haspopup={this.hasChildren.toString()}>
        {this.isdirection(Direction.HORIZONTAL) && this.hasChildren && this.href === undefined ? (
          <mg-popover display={this.expanded} placement="bottom-start" arrowHide={true} onDisplay-change={this.handlePopoverDisplay}>
            {this.renderInteractiveElement()}
            <div class={getContainerClasses()} slot="content">
              {this.renderSlot()}
            </div>
          </mg-popover>
        ) : (
          [
            this.renderInteractiveElement(),
            <div class={getContainerClasses()} hidden={!this.expanded}>
              {this.renderSlot()}
            </div>,
          ]
        )}
      </Host>
    );
  }
}
