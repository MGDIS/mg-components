import { Component, h, Prop, State, Host, Watch, Element, Event, EventEmitter } from '@stencil/core';
import { ClassList } from '../../../../utils/components.utils';
import { ElementPosition, MenuItemType, sizes, Status } from './mg-menu-item.conf';
import { DisplayType } from '../mg-menu/mg-menu.conf';

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

  /**
   * DOM child element
   */
  private childMenu: HTMLMgMenuElement;

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
   * Define menu-item button label
   */
  @Prop() label!: MenuItemType['label'];
  @Watch('label')
  validateLabel(newValue: MenuItemType['label']): void {
    if (!(newValue.length > 0)) {
      throw new Error(`<${this.name}> prop "label" is required.`);
    }
  }

  /**
   * Define menu-item badge
   * when defined menu-item contain an anchor instead of button
   */
  @Prop() href: MenuItemType['href'];

  /**
   * Define menu-item badge
   */
  @Prop() badge: MenuItemType['badge'];

  /**
   * Define menu-item icon
   */
  @Prop() icon: MenuItemType['icon'];

  /**
   * Define menu-item status
   */
  @Prop({ reflect: true }) status: MenuItemType['status'] = Status.VISIBLE;
  @Watch('status')
  validateActive(newValue: MenuItemType['status'], oldValue?: MenuItemType['status']): void {
    if (oldValue !== undefined) {
      this.navigationButtonClassList.delete(`${this.navigationButton}--${oldValue}`);
    }
    this.navigationButtonClassList.add(`${this.navigationButton}--${newValue}`);
  }

  /**
   * Define menu-item size
   */
  @Prop() size: MenuItemType['size'] = 'large';
  @Watch('size')
  validateSize(newValue: MenuItemType['size'], oldValue?: MenuItemType['size']): void {
    if (!sizes.includes(newValue)) {
      throw new Error(`<${this.name}> prop "size" must be one of : ${sizes.join(', ')}`);
    }
    if (oldValue !== undefined) {
      this.navigationButtonClassList.delete(`${this.navigationButton}--size-${oldValue}`);
    }
    this.navigationButtonClassList.add(`${this.navigationButton}--size-${newValue}`);
  }

  /**
   * Define menu-item index in parent menu
   */
  @Prop({ mutable: true, reflect: true }) menuIndex: MenuItemType['menuIndex'];

  /**
   * Define menu-item content expended
   */
  @Prop({ mutable: true }) expanded = false;
  @Watch('expanded')
  validateExpanded(newValue: MenuItemType['expanded']): void {
    if (this.childMenu !== undefined && this.childMenu !== null) {
      if (newValue) this.childMenu.removeAttribute('hidden');
      else this.childMenu.setAttribute('hidden', '');
    }
  }

  /************
   * Events *
   ************/

  /**
   * Emited event to communicate next focused menu-item to parent
   */
  @Event({ eventName: 'focused-item' }) focusedItem: EventEmitter<MenuItemType['menuIndex']>;

  /**
   * Emited event when active menu-item change
   */
  @Event({ eventName: 'menu-item-selected' }) menuItemSelected: EventEmitter<undefined>;

  /************
   * States *
   ************/

  /**
   * Component classes
   */
  @State() classList: ClassList = new ClassList([`${this.name}`]);

  /**
   * Component classes
   */
  @State() navigationButtonClassList: ClassList = new ClassList([`${this.navigationButton}`]);

  /**
   * Does component have parent menu
   */
  @State() contextualOrientitation: DisplayType;

  /**
   * Does component is in main menu
   */
  @State() isInMainMenu: boolean;

  /**
   * Does component have child menu
   */
  @State() hasSubMenu = false;
  @Watch('hasSubMenu')
  validateHasSubMenu(newValue: boolean): void {
    if (newValue && this.element.href !== undefined) {
      throw new Error(`<${this.name}> prop "href" is unauthorizied when element is a parent.`);
    }
  }

  /************
   * Methods *
   ************/

  /**
   * Toggle expanded prop value
   */
  private toggleExpanded = (): void => {
    this.expanded = !this.expanded;
  };

  /**
   * Does an HTMLElement contain child with given Status
   *
   * @param {HTMLElement} element to parse
   * @param {Status} status to check
   * @returns {boolean} true if element with status is found
   */
  private hasChildElementStatus = (element: HTMLElement, status: Status): boolean => element.querySelector(`${this.name}[status="${status}"]`) !== null;

  /**
   * Is component contextual orientation match the given orientation
   *
   * @param {DisplayType} orientation in parent menu
   * @returns {boolean} true is orientation match the contextualOrientitation propertie
   */
  private isContextualOrientitation = (orientation: DisplayType): boolean => this.contextualOrientitation === orientation;

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
    if (this.hasSubMenu) {
      this.toggleExpanded();

      // when main menu item is NOT expanded we need NOT expanded sub-items
      const subItems = Array.from(this.element.querySelectorAll(`${this.name}`));
      if (!this.expanded && this.isInMainMenu) {
        subItems.forEach(item => {
          item.expanded = false;
        });
      }

      // when expended and contain an active item parents are expended too
      if (this.expanded && this.hasChildElementStatus(this.element, Status.ACTIVE)) {
        subItems.forEach(item => {
          if (this.hasChildElementStatus(item, Status.ACTIVE)) {
            item.expanded = true;
          }
        });
      }
    } else {
      this.menuItemSelected.emit();
    }
    event.preventDefault();
  };

  /**
   * Handle interactive element focus
   *
   * @param {FocusEvent} event focus on element
   * @returns {void}
   */
  private handleElementFocus = (event: FocusEvent): void => {
    this.focusedItem.emit(this.menuIndex);
    event.preventDefault();
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
    // define submenu
    this.childMenu = this.element.querySelector('mg-menu');
    this.hasSubMenu = this.childMenu !== null;

    // Validate props
    this.validateLabel(this.label);
    this.validateSize(this.size);
    this.validateActive(this.status);
    this.validateExpanded(this.expanded);
  }

  /**
   * Check if component slots configuration
   *
   * @returns {void}
   */
  componentDidLoad(): void {
    // define menu-item context states
    if (this.element.parentElement.nodeName === 'MG-MENU') {
      this.contextualOrientitation = (this.element.parentElement as HTMLMgMenuElement).display;
    }

    this.isInMainMenu = this.element.offsetParent?.className.includes('mg-menu-item') === false;
    const hasNextMenuItem = this.element.nextElementSibling?.nodeName === 'MG-MENU-ITEM';
    const hasPreviousMenuItem = this.element.previousElementSibling?.nodeName === 'MG-MENU-ITEM';

    // manage last menu item
    if (!hasNextMenuItem && hasPreviousMenuItem && this.isContextualOrientitation(DisplayType.HORIZONTAL)) {
      this.classList.add(`${this.name}--${ElementPosition.LAST}`);
    }

    // when main menu item contain an active item it will get the active style
    if (this.isInMainMenu && this.hasChildElementStatus(this.element, Status.ACTIVE)) {
      this.status = Status.ACTIVE;
    }

    // manage menu items style depending to parent menu horientation
    this.classList.add(`${this.name}--${this.contextualOrientitation}`);
    this.navigationButtonClassList.add(`${this.navigationButton}--${this.contextualOrientitation}`);
  }

  /**
   * Render
   *
   * @returns {HTMLElement} HTML Element
   */
  render(): HTMLElement {
    const TagName: string = this.href !== undefined ? 'a' : 'button';
    return (
      <Host role="menuitem" aria-haspopup={this.hasSubMenu.toString()} class={this.classList.join()}>
        <TagName
          href={this.href}
          class={this.navigationButtonClassList.join()}
          tabindex={[Status.DISABLED, Status.HIDDEN].includes(this.status) ? -1 : 0}
          aria-expanded={this.expanded.toString()}
          aria-current={this.status === Status.ACTIVE && 'page'}
          onClick={this.handleElementCLick}
          onFocus={this.handleElementFocus}
        >
          {this.icon !== undefined && <mg-icon variant={this.icon.variant} icon={this.icon.icon}></mg-icon>}
          <span class={`${this.navigationButton}-text`}>{this.label}</span>
          {this.badge !== undefined && <mg-badge {...this.badge} variant={this.badge.variant || 'info'}></mg-badge>}
          {this.hasSubMenu && (
            <span class={`${this.navigationButton}-chevron`}>
              <mg-icon icon={`chevron-${this.expanded === true ? 'up' : 'down'}`}></mg-icon>
            </span>
          )}
        </TagName>
        <div
          class={`${this.name}__collapse-container ${this.isInMainMenu && this.isContextualOrientitation(DisplayType.HORIZONTAL) && this.name + '__collapse-container--shadow'}`}
        >
          <slot></slot>
        </div>
      </Host>
    );
  }
}
