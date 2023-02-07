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
  private tabFocus: number;
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
   * Method to get the active-tab value
   *
   * @returns {number} of the active-tab
   */
  private getActiveTab = (): number =>
    this.activeTab || this.getTabItemIndex(this.tabs.map((tab, index) => ({ ...tab, index })).find(tab => this.tabHasStatus(tab, Status.ACTIVE)).index);

  /**
   * Handle click events on tabs
   *
   * @param {MouseEvent} event mouse event
   */
  private handleClick = (event: MouseEvent & { currentTarget: HTMLElement }): void => {
    const tabId = event.currentTarget.getAttribute('data-index');
    const tab = this.tabs[Number(tabId) - this.startIndex];
    if (this.tabHasStatus(tab, Status.HIDDEN) || this.tabHasStatus(tab, Status.DISABLED)) {
      event.preventDefault();
    } else {
      this.activeTab = Number(tabId);
      this.tabFocus = undefined;
    }
  };

  /**
   * get navigation button class from given status
   *
   * @param {Status} status button tab status
   * @returns {string} button class/selector variant
   */
  private getNavigationButtonClass = (status: Status): string => `${this.buttonTabBaseClass}--${status}`;

  /**
   * Handle keyboard event on tabs
   *
   * @param {MouseEvent} event mouse event
   * @returns {void}
   */
  private handleKeydown = (event: KeyboardEvent & { target: HTMLElement }): void => {
    const parent = event.target.parentElement;
    if (['ArrowRight', 'ArrowLeft'].includes(event.key)) {
      this.tabFocus = Number(event.target.getAttribute('data-index'));
      parent.querySelector(`[data-index="${this.tabFocus}"]`).setAttribute('tabindex', '-1');

      // Move right
      if (event.key === 'ArrowRight') {
        this.tabFocus++;
        // If we're at the end, go to the start
        if (this.tabFocus > this.tabs.length) this.tabFocus = this.startIndex;
        // Move left
      } else if (event.key === 'ArrowLeft') {
        this.tabFocus--;
        // If we're at the start, move to the end
        if (this.tabFocus < this.startIndex) this.tabFocus = this.tabs.length;
      }

      const parentButtonElement: HTMLButtonElement = parent.querySelector(`[data-index="${this.tabFocus}"]`);
      // if focus item is ['hidden'] we recursively repeat action
      if (this.tabHasStatus(this.tabs[this.tabFocus - 1], Status.HIDDEN)) {
        parentButtonElement.dispatchEvent(new KeyboardEvent('keydown', { key: event.key, bubbles: true }));
        // else run focus methods on tabFocus element
      } else {
        parentButtonElement.setAttribute('tabindex', '0');
        parentButtonElement.focus();
      }
    } else if (event.key === 'Tab') {
      this.resetFocus();
    }
  };

  /**
   * Method to reset focus behavior
   *
   * @returns {void}
   */
  private resetFocus = (): void => {
    // update asynchronously tabindex to prevent get focus on new tabindex at then end of event process
    setTimeout(() => {
      this.tabFocus = undefined;
      Array.from(this.element.shadowRoot.querySelectorAll('[data-index]')).forEach((tab, index) => {
        tab.setAttribute('tabindex', this.getActiveTab() - this.startIndex !== index ? '-1' : '0');
      });
    }, 0);
  };

  /**
   * Validate slots setting
   */
  private validateSlots = (): void => {
    const slots = Array.from(this.element.children).filter(slot => slot.getAttribute('slot')?.includes('tab_content-'));
    if (slots.length !== this.tabs.length) throw new Error('<mg-tabs> Must have slots counts equal to tabs count.');
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
   * add listners
   *
   * @returns {void}
   */
  componentDidLoad(): void {
    document.addEventListener(
      'click',
      (event: MouseEvent & { target: HTMLElement }) => {
        if (event.target.closest('mg-tabs') !== this.element) this.resetFocus();
      },
      false,
    );
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
              key={tab.label}
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
              aria-disabled={this.tabHasStatus(tab, Status.DISABLED)}
              onClick={this.handleClick}
              onKeyDown={this.handleKeydown}
              data-index={this.getTabItemIndex(index)}
            >
              {tab.icon !== undefined && <mg-icon icon={tab.icon}></mg-icon>}
              {tab.label}
              {tab.badge !== undefined && <mg-badge variant="text-color" value={tab.badge.value} label={tab.badge.label} outline={tab.badge.role === 'information'}></mg-badge>}
            </button>
          ))}
        </header>
        {this.tabs.map((tab, index) => (
          <article
            key={tab.label}
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
