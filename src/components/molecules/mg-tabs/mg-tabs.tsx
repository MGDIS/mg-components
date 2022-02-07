import { Component, h, Host, Prop, State, Element, Watch } from '@stencil/core';
import { createID, ClassList, allItemsAreString } from '../../../utils/components.utils';
import { TabItem } from './mg-tabs.conf';

/**
 * type TabItem validation function
 * @param tab
 * @returns {boolean}
 */
const isTabItem = (tab: TabItem): boolean => typeof tab === 'object' && typeof tab.label === 'string';

@Component({
  tag: 'mg-tabs',
  styleUrl: 'mg-tabs.scss',
  scoped: true /* IE FIX: use shadow DOM when IE droped */,
})
export class MgTabs {
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
  @Prop() identifier?: string = createID('mg-tabs');

  /**
   * Tabs label. Include short tabs description.
   * Required for accessibility
   */
  @Prop() label!: string;

  /**
   * Tabs items
   * Required
   */
  @Prop() items!: string[] | TabItem[];
  @Watch('items')
  validateItems(newValue) {
    // String array
    if (allItemsAreString(newValue)) {
      this.tabs = newValue.map(item => ({ label: item }));
    }
    // Object array
    else if (newValue && (newValue as Array<TabItem>).every(item => isTabItem(item))) {
      this.tabs = newValue;
    } else {
      throw new Error('<mg-tabs> prop "items" is required and all items must be the same type: TabItem.');
    }
  }

  /**
   * Active tab number
   * default: first is 1
   */
  @Prop({ reflect: true, mutable: true }) activeTab: number = 1;
  @Watch('activeTab')
  validateActiveTab(newValue) {
    if (Number(newValue) < 1 || Number(newValue) > this.tabs.length) {
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
   * Handle click events on tabs
   * @param event
   */
  private handleClick = (event: MouseEvent & { currentTarget: HTMLElement }) => {
    const tabId = event.currentTarget.getAttribute('data-index');
    this.activeTab = Number(tabId);
  };

  /**
   * Handle keyboard event on tabs
   * @param event
   */
  private handleKeydown = (event: KeyboardEvent & { target: HTMLElement }) => {
    let selectedTab: HTMLElement;

    let tabId: number = Number(event.target.getAttribute('data-index'));
    const parent = event.target.parentElement;

    // change selected id from key code
    // /* IE FIX */ delete 'Right'
    if (['ArrowRight', 'Right'].includes(event.key)) {
      tabId++;
      // /* IE FIX */ delete 'Left'
    } else if (['ArrowLeft', 'Left'].includes(event.key)) {
      tabId--;
    }

    // get selected tab
    selectedTab = parent.querySelector(`[data-index="${tabId}"]`);

    // apply selected tab if exist
    if (selectedTab !== null) {
      selectedTab.focus();
      this.activeTab = tabId;
    }
  };

  /**
   * Validate slots setting
   */
  private validateSlots() {
    const slots = Array.from(this.element.children).filter(slot => slot.getAttribute('slot')?.includes('tab_content-'));
    if (slots.length !== this.tabs.length) {
      throw new Error('<mg-tabs> Must have slots counts equal to tabs count.');
    }
  }

  /*************
   * Lifecycle *
   *************/

  /**
   * Check if component props are well configured on init
   */
  componentWillLoad() {
    // Check tabs format
    this.validateItems(this.items);
    this.validateActiveTab(this.activeTab);
    this.validateSlots();
  }

  render() {
    return (
      <Host>
        <header role="tablist" aria-label={this.label} class="mg-tabs-header">
          {this.tabs.map((tab, index) => {
            const tabIndex = index + 1;
            return (
              <button
                role="tab"
                id={`${this.identifier}-${tabIndex}`}
                class={`mg-tabs-header__button ${tabIndex === this.activeTab ? 'mg-tabs-header__button--active' : ''}`}
                tabindex={tabIndex === this.activeTab ? 0 : -1}
                aria-selected={(tabIndex === this.activeTab).toString()}
                aria-controls={`pannel-${tabIndex}`}
                onClick={this.handleClick}
                onKeyDown={this.handleKeydown}
                data-index={tabIndex}
              >
                {tab.icon !== undefined ? <mg-icon icon={tab.icon}></mg-icon> : null}
                {tab.label}
                {tab.badge !== undefined ? <mg-tag variant="info">{tab.badge}</mg-tag> : null}
              </button>
            );
          })}
        </header>
        {this.tabs.map((_tab, index) => {
          const tabIndex = index + 1;
          return (
            <article
              role="tabpanel"
              id={`pannel-${tabIndex}`}
              hidden={tabIndex !== this.activeTab}
              aria-labelledby={`${this.identifier}-${this.activeTab}`}
              tabindex={tabIndex === this.activeTab ? 0 : -1}
            >
              <slot name={`tab_content-${tabIndex}`}></slot>
            </article>
          );
        })}
      </Host>
    );
  }
}
