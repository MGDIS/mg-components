import { Component, Event, EventEmitter, h, Prop, State, Element, Watch } from '@stencil/core';
import { createID, ClassList, allItemsAreString } from '../../../utils/components.utils';
import { NavItem, Status } from './mg-menu.conf';

/**
 * type NavItem validation function
 *
 * @param {NavItem} tab tab item
 * @returns {boolean} tab item type is valid
 */
const isNavItem = (tab: NavItem): boolean => typeof tab === 'object' && typeof tab.label === 'string';

@Component({
  tag: 'mg-menu',
  styleUrl: 'mg-menu.scss',
})
export class MgMenu {
  /************
   * Internal *
   ************/

  private startIndex = 1;
  private buttonMenuBaseClass = 'mg-menu__item-button';

  /**************
   * Decorators *
   **************/

  /**
   * Get component DOM element
   */
  @Element() element: HTMLMgMenuElement;

  /**
   * Identifier is used for the element ID (id is a reserved prop in Stencil.js)
   * If not set, it will be created.
   */
  @Prop() identifier: string = createID('mg-menu');

  /**
   * Nav label. Include short nav description.
   * Required for accessibility
   */
  @Prop() label!: string;

  /**
   * Nav items
   * Required
   */
  @Prop() items!: string[] | NavItem[];
  @Watch('items')
  validateItems(newValue: string[] | NavItem[]): void {
    // String array
    if (allItemsAreString(newValue as string[])) {
      this.nav = (newValue as string[]).map(item => ({ label: item, status: Status.VISIBLE }));
    }
    // Object array
    else if (newValue && (newValue as NavItem[]).every(item => isNavItem(item))) {
      this.nav = newValue as NavItem[];
    } else {
      throw new Error('<mg-menu> prop "items" is required and all items must be the same type: NavItem.');
    }
  }

  /**
   * Active tab number
   * default: first is 1
   */
  @Prop({ reflect: true, mutable: true }) activeItem = 1;
  @Watch('activeItem')
  validateActiveItem(newValue: number): void {
    if (newValue < 1 || newValue > this.nav.length) {
      throw new Error('<mg-menu> prop "activeItem" must be between 1 and tabs length.');
    } else {
      this.setActiveItem(newValue);
    }
  }

  /**
   * Component tabs
   */
  @State() nav: NavItem[] = [];

  /**
   * Component classes
   */
  @State() classList: ClassList = new ClassList(['mg-menu']);

  /**
   * Emited event when active nav item change
   */
  @Event({ eventName: 'active-item-change' }) activeItemChange: EventEmitter<number>;

  /**
   * Method to set active tab
   *
   * @param {number} itemKey item tab key to set to ACTIVE status
   * @returns {void}
   */
  private setActiveItem = (itemKey: number): void => {
    // reset active tabs
    this.nav.forEach(item => {
      if (this.navItemHasGivenStatus(item, Status.ACTIVE)) item.status = Status.VISIBLE;
    });
    // set active nav item from given tab key
    this.nav[itemKey - this.startIndex].status = Status.ACTIVE;
    // emit change active nav item key event
    this.activeItemChange.emit(itemKey);
  };

  /**
   * Method to know if given tab has the given status
   *
   * @param {NavItem} tab item tab key to set to ACTIVE status
   * @param {Status} status status to valide
   * @returns {boolean} status comparaison
   */
  private navItemHasGivenStatus = (tab: NavItem, status: Status): boolean => tab.status === status;

  /**
   * Method to get tab index
   *
   * @param {number} index to get
   * @returns {number} index
   */
  private getItemIndex = (index: number): number => index + this.startIndex;

  /**
   * Handle click events on tabs
   *
   * @param {MouseEvent} event mouse event
   */
  private handleClick = (event: MouseEvent & { currentTarget: HTMLElement }): void => {
    const tabId = event.currentTarget.getAttribute('data-index');
    this.activeItem = Number(tabId);
  };

  /**
   * get navigation button class from given status
   *
   * @param {Status} status button tab status
   * @param {boolean} isSelector set if we need a CSS selector with the dot '.' at the begin. default value = false.
   * @returns {string} button class/selector variant
   */
  private getNavItemButtonClass = (status: Status, isSelector = false): string => `${isSelector ? '.' : ''}${this.buttonMenuBaseClass}--${status}`;

  /**
   * Handle keyboard event on tabs
   *
   * @param {MouseEvent} event mouse event
   * @returns {void}
   */
  private handleKeydown = (event: KeyboardEvent & { target: HTMLElement }): void => {
    const tabId = Number(event.target.getAttribute('data-index'));
    const parent = event.target.parentElement;

    // skip process if keyboard isn't Enter or Delete
    if (!['Enter', 'Delete'].includes(event.key)) return;

    // get selected tab if NOT hidden, disabled
    const selectedTab: HTMLElement = parent.querySelector(
      `[data-index="${tabId}"]:not(${[this.getNavItemButtonClass(Status.HIDDEN, true), this.getNavItemButtonClass(Status.DISABLED, true)].join(' ')})`,
    );

    // apply selected tab if exist
    if (selectedTab !== null) {
      selectedTab.focus();
      this.activeItem = tabId;
    }
  };

  /*************
   * Lifecycle *
   *************/

  /**
   * Check if component props are well configured on init
   *
   * @returns {void}
   */
  componentWillLoad(): void {
    // Check tabs format
    this.validateItems(this.items);
    this.validateActiveItem(this.activeItem);
  }

  /**
   * Render
   *
   * @returns {HTMLElement} HTML Element
   */
  render(): HTMLElement {
    return (
      <nav role="navigation" aria-label={this.label} class={this.classList.join()}>
        <ul class="mg-menu__item-list">
          {this.nav.map((item, index) => (
            <li>
              <button
                id={`${this.identifier}-${this.getItemIndex(index)}`}
                class={{
                  [`${this.buttonMenuBaseClass}`]: true,
                  [`${this.getNavItemButtonClass(Status.ACTIVE)}`]: this.navItemHasGivenStatus(item, Status.ACTIVE),
                  [`${this.getNavItemButtonClass(Status.HIDDEN)}`]: this.navItemHasGivenStatus(item, Status.HIDDEN),
                  [`${this.getNavItemButtonClass(Status.DISABLED)}`]: this.navItemHasGivenStatus(item, Status.DISABLED),
                }}
                aria-expanded={this.navItemHasGivenStatus(item, Status.ACTIVE).toString()}
                onClick={this.handleClick}
                onKeyDown={this.handleKeydown}
                data-index={this.getItemIndex(index)}
                disabled={this.navItemHasGivenStatus(item, Status.DISABLED)}
              >
                {item.icon !== undefined && <mg-icon icon={item.icon}></mg-icon>}
                {item.label}
                {item.badge !== undefined && <mg-badge variant="info" value={item.badge.value} label={item.badge.label}></mg-badge>}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}
