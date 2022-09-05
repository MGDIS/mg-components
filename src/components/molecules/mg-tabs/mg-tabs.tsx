import { Component, Event, EventEmitter, h, Prop, State, Element, Watch } from '@stencil/core';
import { createID, ClassList, allItemsAreString } from '../../../utils/components.utils';
import { TabItem, sizes, Status } from './mg-tabs.conf';

/**
 * type TabItem validation function
 *
 * @param {TabItem} tab tab item
 * @returns {boolean} tab item type is valid
 */
const isTabItem = (tab: TabItem): boolean => typeof tab === 'object' && typeof tab.label === 'string';

@Component({
  tag: 'mg-tabs',
  styleUrl: 'mg-tabs.scss',
  shadow: true,
})
export class MgTabs {
  /************
   * Internal *
   ************/

  private tabPanel = 'panel';
  private startIndex = 1;
  private buttonTabBaseClass = 'mg-tabs__navigation-button';

  /**************
   * Decorators *
   **************/

  /**
   * Get component DOM element
   */
  @Element() element: HTMLMgTabsElement;

  /**
   * Identifier is used for the element ID (id is a reserved prop in Stencil.js)
   * If not set, it will be created.
   */
  @Prop() identifier: string = createID('mg-tabs');

  /**
   * Tabs label. Include short tabs description.
   * Required for accessibility
   */
  @Prop() label!: string;

  /**
   * Define tabs size
   */
  @Prop() size = 'regular';
  @Watch('size')
  validateSize(newValue: string): void {
    if (!sizes.includes(newValue)) {
      throw new Error(`<mg-tabs> prop "size" must be one of : ${sizes.join(', ')}`);
    }
    this.classList.add(`mg-tabs--size-${this.size}`);
  }

  /**
   * Tabs items
   * Required
   */
  @Prop() items!: string[] | TabItem[];
  @Watch('items')
  validateItems(newValue: string[] | TabItem[]): void {
    // String array
    if (allItemsAreString(newValue as string[])) {
      this.tabs = (newValue as string[]).map(item => ({ label: item, status: Status.VISIBLE }));
    }
    // Object array
    else if (newValue && (newValue as TabItem[]).every(item => isTabItem(item))) {
      this.tabs = newValue as TabItem[];
    } else {
      throw new Error('<mg-tabs> prop "items" is required and all items must be the same type: TabItem.');
    }
  }

  /**
   * Active tab number
   * default: first is 1
   */
  @Prop({ reflect: true, mutable: true }) activeTab = 1;
  @Watch('activeTab')
  validateActiveTab(newValue: number): void {
    if (newValue < 1 || newValue > this.tabs.length) {
      throw new Error('<mg-tabs> prop "activeTab" must be between 1 and tabs length.');
    } else {
      this.setActiveTab(newValue);
    }
  }

  /**
   * Component tabs
   */
  @State() tabs: TabItem[] = [];

  /**
   * Component classes
   */
  @State() classList: ClassList = new ClassList(['mg-tabs']);

  /**
   * Emited event when active tab change
   */
  @Event({ eventName: 'active-tab-change' }) activeTabChange: EventEmitter<number>;

  /**
   * Method to set active tab
   *
   * @param {number} tabKey item tab key to set to ACTIVE status
   * @returns {void}
   */
  private setActiveTab = (tabKey: number): void => {
    // reset active tabs
    this.tabs.forEach(tab => {
      if (this.tabHasGivenStatus(tab, Status.ACTIVE)) tab.status = Status.VISIBLE;
    });
    // set active tab from given tab key
    this.tabs[tabKey - this.startIndex].status = Status.ACTIVE;
    // emit change active tab key event
    this.activeTabChange.emit(tabKey);
  };

  /**
   * Method to know if given tab has the given status
   *
   * @param {TabItem} tab item tab key to set to ACTIVE status
   * @param {Status} status status to valide
   * @returns {boolean} status comparaison
   */
  private tabHasGivenStatus = (tab: TabItem, status: Status): boolean => tab.status === status;

  /**
   * Method to get element id from index
   *
   * @param {string} element to get id
   * @param {number} index to generate id
   * @returns {string} generated element id
   */
  private getElementId = (element: string, index: number): string => `${element}-${this.getTabIndex(index)}`;

  /**
   * Method to get tab index
   *
   * @param {number} index to get
   * @returns {number} index
   */
  private getTabIndex = (index: number): number => index + this.startIndex;

  /**
   * Handle click events on tabs
   *
   * @param {MouseEvent} event mouse event
   */
  private handleClick = (event: MouseEvent & { currentTarget: HTMLElement }): void => {
    const tabId = event.currentTarget.getAttribute('data-index');
    this.activeTab = Number(tabId);
  };

  /**
   * get navigation button class from given status
   *
   * @param {Status} status button tab status
   * @param {boolean} isSelector set if we need a CSS selector with the dot '.' at the begin. default value = false.
   * @returns {string} button class/selector variant
   */
  private getNavigationButtonClass = (status: Status, isSelector = false): string => `${isSelector ? '.' : ''}${this.buttonTabBaseClass}--${status}`;

  /**
   * Handle keyboard event on tabs
   *
   * @param {MouseEvent} event mouse event
   * @returns {void}
   */
  private handleKeydown = (event: KeyboardEvent & { target: HTMLElement }): void => {
    let tabId = Number(event.target.getAttribute('data-index'));
    const parent = event.target.parentElement;

    // change selected id from key code
    if (event.key === 'ArrowRight') {
      tabId++;
    } else if (event.key === 'ArrowLeft') {
      tabId--;
    }

    // get selected tab if NOT hidden, disabled
    const selectedTab: HTMLElement = parent.querySelector(
      `[data-index="${tabId}"]:not(${[this.getNavigationButtonClass(Status.HIDDEN, true), this.getNavigationButtonClass(Status.DISABLED, true)].join()})`,
    );

    // apply selected tab if exist
    if (selectedTab !== null) {
      selectedTab.focus();
      this.activeTab = tabId;
    }
  };

  /**
   * Validate slots setting
   */
  private validateSlots = (): void => {
    const slots = Array.from(this.element.children).filter(slot => slot.getAttribute('slot')?.includes('tab_content-'));
    if (slots.length !== this.tabs.length) {
      throw new Error('<mg-tabs> Must have slots counts equal to tabs count.');
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
    this.validateActiveTab(this.activeTab);
    this.validateSize(this.size);
    this.validateSlots();
  }

  /**
   * Render
   *
   * @returns {HTMLElement} HTML Element
   */
  render(): HTMLElement {
    return (
      <div class={this.classList.join()}>
        <header role="tablist" aria-label={this.label} class="mg-tabs__header">
          {this.tabs.map((tab, index) => (
            <button
              role="tab"
              id={this.getElementId(this.identifier, index)}
              class={{
                [`${this.buttonTabBaseClass}`]: true,
                [`${this.getNavigationButtonClass(Status.ACTIVE)}`]: this.tabHasGivenStatus(tab, Status.ACTIVE),
                [`${this.getNavigationButtonClass(Status.DISABLED)}`]: this.tabHasGivenStatus(tab, Status.DISABLED),
                [`${this.getNavigationButtonClass(Status.HIDDEN)}`]: this.tabHasGivenStatus(tab, Status.HIDDEN),
              }}
              tabindex={this.tabHasGivenStatus(tab, Status.ACTIVE) ? 0 : -1}
              aria-selected={this.tabHasGivenStatus(tab, Status.ACTIVE).toString()}
              aria-controls={this.getElementId(this.tabPanel, index)}
              onClick={this.handleClick}
              onKeyDown={this.handleKeydown}
              data-index={this.getTabIndex(index)}
              disabled={this.tabHasGivenStatus(tab, Status.DISABLED)}
            >
              {tab.icon !== undefined && <mg-icon icon={tab.icon}></mg-icon>}
              {tab.label}
              {tab.badge !== undefined && <mg-badge variant="info" value={tab.badge.value} label={tab.badge.label}></mg-badge>}
            </button>
          ))}
        </header>
        {this.tabs.map((tab, index) => (
          <article
            role="tabpanel"
            id={this.getElementId(this.tabPanel, index)}
            hidden={!this.tabHasGivenStatus(tab, Status.ACTIVE)}
            aria-labelledby={this.getElementId(this.identifier, index)}
            tabindex={this.tabHasGivenStatus(tab, Status.ACTIVE) ? 0 : -1}
            class="mg-tabs__content-container"
          >
            <slot name={this.getElementId('tab_content', index)}></slot>
          </article>
        ))}
      </div>
    );
  }
}
