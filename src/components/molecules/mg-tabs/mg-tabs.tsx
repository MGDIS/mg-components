import { Component, Event, EventEmitter, h, Prop, State, Element, Watch } from '@stencil/core';
import { createID, ClassList, allItemsAreString } from '../../../utils/components.utils';
import { TabItem, sizes, Status, SizeType } from './mg-tabs.conf';

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

  // classes
  private readonly tabPanel = 'panel';
  private readonly buttonTabBaseClass = 'mg-tabs__navigation-button';

  // variables
  private startIndex = 1;

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
  @Watch('label')
  validateLabel(newValue: MgTabs['label']): void {
    if (typeof newValue !== 'string' || newValue.trim() === '') {
      throw new Error('<mg-tabs> prop "label" is required.');
    }
  }

  /**
   * Define tabs size
   */
  @Prop() size: SizeType = 'regular';
  @Watch('size')
  validateSize(newValue: MgTabs['size']): void {
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
  validateItems(newValue: MgTabs['items']): void {
    // String array
    if (allItemsAreString(newValue as string[])) {
      this.tabs = (newValue as string[]).map((item, index) => ({ label: item, status: index === 0 ? Status.ACTIVE : Status.VISIBLE }));
    }
    // Object array
    else if (newValue && newValue.length > 0 && (newValue as TabItem[]).every(item => isTabItem(item))) {
      this.tabs = newValue as TabItem[];
      // init active tabs if not set. Default: index 0.
      if (this.tabs.find(tab => this.tabHasStatus(tab, Status.ACTIVE)) === undefined) this.tabs[0].status = Status.ACTIVE;
    } else {
      throw new Error('<mg-tabs> prop "items" is required and all items must be the same type: TabItem.');
    }
  }

  /**
   * Active tab number
   */
  @Prop({ reflect: true, mutable: true }) activeTab: number;
  @Watch('activeTab')
  validateActiveTab(newValue: MgTabs['activeTab']): void {
    if (typeof newValue === 'number' && newValue >= 1 && newValue <= this.tabs.length) {
      this.tabs.forEach((tab, index) => {
        const isNewActiveTab = index === newValue - this.startIndex;
        // reset active tabs
        if (this.tabHasStatus(tab, Status.ACTIVE) && !isNewActiveTab) tab.status = Status.VISIBLE;
        // set active tab from given tab key
        else if ((tab.status === undefined || this.tabHasStatus(tab, Status.VISIBLE)) && isNewActiveTab) tab.status = Status.ACTIVE;
      });
      // emit change active tab key event
      if (this.tabs.find(tab => this.tabHasStatus(tab, Status.ACTIVE)) !== undefined) {
        this.activeTabChange.emit(newValue);
      }
    } else if (newValue !== undefined) {
      throw new Error('<mg-tabs> prop "activeTab" must be between 1 and tabs length.');
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
   * Method to know if given tab has the given status
   *
   * @param {TabItem} tab item tab key to set to ACTIVE status
   * @param {Status} status status to valide
   * @returns {boolean} status comparaison
   */
  private tabHasStatus = (tab: TabItem, status: Status): boolean => tab.status === status;

  /**
   * Method to get element id from index
   *
   * @param {string} element to get id
   * @param {number} index to generate id
   * @returns {string} generated element id
   */
  private getElementId = (element: string, index: number): string => `${element}-${this.getTabItemIndex(index)}`;

  /**
   * Method to get tab item index
   *
   * @param {number} index to get
   * @returns {number} index
   */
  private getTabItemIndex = (index: number): number => index + this.startIndex;

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
    this.validateLabel(this.label);
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
                [`${this.buttonTabBaseClass}--horizontal`]: true,
                [`${this.getNavigationButtonClass(Status.ACTIVE)}`]: this.tabHasStatus(tab, Status.ACTIVE),
                [`${this.getNavigationButtonClass(Status.DISABLED)}`]: this.tabHasStatus(tab, Status.DISABLED),
                [`${this.getNavigationButtonClass(Status.HIDDEN)}`]: this.tabHasStatus(tab, Status.HIDDEN),
              }}
              tabindex={this.tabHasStatus(tab, Status.ACTIVE) ? 0 : -1}
              aria-selected={this.tabHasStatus(tab, Status.ACTIVE).toString()}
              aria-controls={this.getElementId(this.tabPanel, index)}
              onClick={this.handleClick}
              onKeyDown={this.handleKeydown}
              data-index={this.getTabItemIndex(index)}
              disabled={this.tabHasStatus(tab, Status.DISABLED)}
            >
              {tab.icon !== undefined && <mg-icon icon={tab.icon}></mg-icon>}
              {tab.label}
              {tab.badge !== undefined && <mg-badge variant="text-color" value={tab.badge.value} label={tab.badge.label} outline={tab.badge.role === 'information'}></mg-badge>}
            </button>
          ))}
        </header>
        {this.tabs.map((tab, index) => (
          <article
            role="tabpanel"
            id={this.getElementId(this.tabPanel, index)}
            hidden={!this.tabHasStatus(tab, Status.ACTIVE)}
            aria-labelledby={this.getElementId(this.identifier, index)}
            tabindex={this.tabHasStatus(tab, Status.ACTIVE) ? 0 : -1}
            class="mg-tabs__content-container"
          >
            <slot name={this.getElementId('tab_content', index)}></slot>
          </article>
        ))}
      </div>
    );
  }
}
