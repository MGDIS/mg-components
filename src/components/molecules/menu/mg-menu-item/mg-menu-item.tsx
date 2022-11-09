import { Component, h, Prop, State, Host, Watch, Element, Event, EventEmitter } from '@stencil/core';
import { ClassList } from '../../../../utils/components.utils';
import { MgMenu } from '../mg-menu/mg-menu';
import { Direction } from '../mg-menu/mg-menu.conf';
import { ElementPosition, sizes, MenuItemSizeType, Status } from './mg-menu-item.conf';

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
   */
  @Prop() identifier!: string;
  @Watch('identifier')
  validateIdentifier(newValue: MgMenuItem['identifier']): void {
    if (!(newValue?.trim().length > 0)) {
      throw new Error(`<${this.name}> prop "identifier" is required.`);
    }
  }

  /**
   * Define menu-item button label
   */
  @Prop() label!: string;
  @Watch('label')
  validateLabel(newValue: MgMenuItem['label']): void {
    if (!(newValue?.trim().length > 0)) {
      throw new Error(`<${this.name}> prop "label" is required.`);
    }
  }

  /**
   * Define menu-item badge
   * when defined menu-item contain an anchor instead of button
   */
  @Prop() href: string;

  /**
   * Define menu-item status
   */
  @Prop({ reflect: true, mutable: true }) status: Status = Status.VISIBLE;
  @Watch('status')
  validateActive(newValue: MgMenuItem['status'], oldValue?: MgMenuItem['status']): void {
    if (oldValue !== undefined) {
      this.navigationButtonClassList.delete(`${this.navigationButton}--${oldValue}`);
    }
    this.navigationButtonClassList.add(`${this.navigationButton}--${newValue}`);
  }

  /**
   * Define menu-item size
   */
  @Prop() size: MenuItemSizeType = 'large';
  @Watch('size')
  validateSize(newValue: MgMenuItem['size'], oldValue?: MgMenuItem['size']): void {
    if (!sizes.includes(newValue)) {
      throw new Error(`<${this.name}> prop "size" must be one of : ${sizes.join(', ')}.`);
    }
    this.navigationButtonClassList.delete(`${this.navigationButton}--size-${oldValue}`);
    this.navigationButtonClassList.add(`${this.navigationButton}--size-${newValue}`);
  }

  /**
   * Define menu-item index in parent menu
   */
  @Prop({ mutable: true, reflect: true }) menuIndex: number;

  /**
   * Define menu-item content expended
   */
  @Prop({ mutable: true }) expanded = false;
  @Watch('expanded')
  validateExpanded(newValue: MgMenuItem['expanded']): void {
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
  @Event({ eventName: 'focused-item' }) focusedItem: EventEmitter<MgMenuItem['menuIndex']>;

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
  @State() classList: ClassList = new ClassList([this.name]);

  /**
   * Component classes
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
   * @param {MgMenuItem['status']} status to check
   * @returns {boolean} true if element with status is found
   */
  private hasChildElementStatus = (element: HTMLElement, status: MgMenuItem['status']): boolean => element.querySelector(`${this.name}[status="${status}"]`) !== null;

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
    this.validateIdentifier(this.identifier);
    this.validateLabel(this.label);
    this.validateSize(this.size);
    this.validateActive(this.status);
    this.validateExpanded(this.expanded);
  }

  /**
   * Check if component slots configuration
   *
   * @returns {ReturnType<typeof setTimeout>} timeout
   */
  componentDidLoad(): ReturnType<typeof setTimeout> {
    // update props and states after componentDidLoad hook
    // return a promise to process action only in the FIRST render().
    // https://stenciljs.com/docs/component-lifecycle#componentwillload
    return setTimeout(() => {
      // define menu-item context states
      if (this.element.parentElement.nodeName === 'MG-MENU') {
        this.direction = (this.element.parentElement as HTMLMgMenuElement).direction;
      }

      this.isInMainMenu = this.element.parentElement.className.includes('mg-menu-item') === false;
      const hasNextMenuItem = this.element.nextElementSibling?.nodeName === 'MG-MENU-ITEM';
      const hasPreviousMenuItem = this.element.previousElementSibling?.nodeName === 'MG-MENU-ITEM';

      // manage last menu item
      if (!hasNextMenuItem && hasPreviousMenuItem && this.isdirection(Direction.HORIZONTAL)) {
        this.classList.add(`${this.name}--${ElementPosition.LAST}`);
      }

      // when main menu item contain an active item it will get the active style
      if (this.isInMainMenu && this.hasChildElementStatus(this.element, Status.ACTIVE)) {
        this.status = Status.ACTIVE;
      }

      // manage menu items style depending to parent menu horientation
      this.classList.add(`${this.name}--${this.direction}`);
      this.navigationButtonClassList.add(`${this.navigationButton}--${this.direction}`);
    }, 0);
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
          id={this.identifier}
          href={this.href}
          class={this.navigationButtonClassList.join()}
          tabindex={[Status.DISABLED, Status.HIDDEN].includes(this.status) ? -1 : 0}
          aria-expanded={this.expanded.toString()}
          aria-current={this.status === Status.ACTIVE && 'page'}
          onClick={this.handleElementCLick}
          onFocus={this.handleElementFocus}
        >
          <slot name="illustration"></slot>
          <span class={`${this.navigationButton}-text`}>{this.label}</span>
          <slot name="info"></slot>
          {this.hasSubMenu && (
            <span class={`${this.navigationButton}-chevron`}>
              <mg-icon icon={`chevron-${this.expanded === true ? 'up' : 'down'}`}></mg-icon>
            </span>
          )}
        </TagName>
        <div class={{ [`${this.name}__collapse-container`]: true, [`${this.name}__collapse-container--shadow`]: this.isInMainMenu && this.isdirection(Direction.HORIZONTAL) }}>
          <slot></slot>
        </div>
      </Host>
    );
  }
}
