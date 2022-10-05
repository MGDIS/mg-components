import { Component, h, Prop, State, Host, Watch, Element, Event, EventEmitter } from '@stencil/core';
import { createID, ClassList } from '../../../../utils/components.utils';
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
   * Identifier is used for the element ID (id is a reserved prop in Stencil.js)
   * If not set, it will be created.
   */
  @Prop() identifier: MenuItemType['identifier'] = createID(this.name);

  /**
   * Define menu-item button label
   */
  @Prop() label!: MenuItemType['label'];
  @Watch('label')
  validateLabel(newValue: MenuItemType['label']): void {
    if (!(newValue.length > 0)) {
      throw new Error(`<${this.name}> prop "label" must be set.`);
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
  @Prop() status: MenuItemType['status'] = Status.VISIBLE;
  @Watch('status')
  validateActive(newValue: MenuItemType['status']): void {
    for (const status in Status) {
      this.navigationButtonClassList.delete(`${this.navigationButton}--${status}`);
    }
    this.navigationButtonClassList.add(`${this.navigationButton}--${newValue}`);
  }

  /**
   * Define tabs size
   */
  @Prop() size: MenuItemType['size'] = 'large';
  @Watch('size')
  validateSize(newValue: MenuItemType['size']): void {
    if (!sizes.includes(newValue)) {
      throw new Error(`<${this.name}> prop "size" must be one of : ${sizes.join(', ')}`);
    }
    this.navigationButtonClassList.add(`${this.navigationButton}--size-${this.size}`);
  }

  /**
   * Define menu-item index in parent menu
   */
  @Prop({ mutable: true, reflect: true }) menuIndex: MenuItemType['menuIndex'];

  /**
   * Define menu-item content expended
   */
  @Prop({ mutable: true }) expanded: MenuItemType['expanded'] = false;
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
   * Does component have child menu
   */
  @State() hasSubMenu = false;
  @Watch('hasSubMenu')
  validateHasSubMenu(newValue: boolean): void {
    if (newValue) {
      if (this.element.href !== undefined) {
        throw new Error(`<${this.name}> prop "href" is unauthorizied when element is a parent.`);
      }
    }
  }

  /************
   * Methodes *
   ************/

  /**
   * Toggle expanded prop value
   */
  private toggleExpanded = (): void => {
    this.expanded = !this.expanded;
  };

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
    const hasNextMenuItem = this.element.nextElementSibling?.nodeName === 'MG-MENU-ITEM';
    const hasPreviousMenuItem = this.element.previousElementSibling?.nodeName === 'MG-MENU-ITEM';

    // manage last menu item
    if (!hasNextMenuItem && hasPreviousMenuItem && this.contextualOrientitation === DisplayType.HORIZONTAL) {
      this.classList.add(`${this.name}--${ElementPosition.LAST}`);
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
      <Host id={this.identifier} role="menuitem" aria-haspopup={this.hasSubMenu.toString()} class={this.classList.join()}>
        <TagName
          href={this.href}
          class={this.navigationButtonClassList.join()}
          tabindex={[Status.DISABLED, Status.HIDDEN].includes(this.status) ? -1 : 0}
          aria-expanded={this.expanded.toString()}
          aria-current={this.status === Status.ACTIVE && 'page'}
          onClick={this.handleElementCLick}
          onFocus={this.handleElementFocus}
        >
          {this.icon !== undefined && <mg-icon {...this.icon}></mg-icon>}
          <span class={`${this.navigationButton}-text`}>{this.label}</span>
          {this.badge !== undefined && <mg-badge {...this.badge} variant={this.badge.variant || 'info'}></mg-badge>}
          {this.hasSubMenu && (
            <span class={`${this.navigationButton}-chevron`}>
              <mg-icon icon={`chevron-${this.expanded === true ? 'up' : 'down'}`}></mg-icon>
            </span>
          )}
        </TagName>
        <div class={`${this.name}__collapse-container`}>
          <slot></slot>
        </div>
      </Host>
    );
  }
}
