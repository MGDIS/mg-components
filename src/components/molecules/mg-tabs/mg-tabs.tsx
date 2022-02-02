import { Component, h, Host, Prop, State, Element, Watch } from '@stencil/core';
import { createID, ClassList, allItemsAreString } from '../../../utils/components.utils';
import { TabItem } from '../../../types/components.types';

/**
 * type TabItem validation function
 * @param tab
 * @returns {boolean}
 */
const isTabItem = (tab: TabItem): boolean => typeof tab === 'object' && typeof tab.label === 'string';

@Component({
  tag: 'mg-tabs',
  styleUrl: 'mg-tabs.scss',
  scoped: true,
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
   * Tabs items
   * Required
   */
  @Prop({ reflect: true, mutable: true }) tabs!: string[] | TabItem[];
  @Watch('tabs')
  validateTabs(newValue) {
    if (!(allItemsAreString(newValue) || (newValue && (newValue as Array<TabItem>).every(item => isTabItem(item))))) {
      throw new Error('<mg-tabs> prop "tabs" is required and all items must be the same type: TabItem.');
    }
  }

  /**
   * Component classes
   */
  @State() classList: ClassList = new ClassList(['mg-tabs']);

  /**
   * Active tab
   */
  @State() activeTab: number = 0;

  /**
   * Handle click events on tabs
   * @param event
   */
  private handleClick = (event: MouseEvent & { target: HTMLLIElement }) => {
    const tabId = event.target.getAttribute('data-index');
    this.activeTab = Number(tabId);
  };

  /**
   * Handle keyboard event on tabs
   * @param event
   */
  private handleKeydown = (event: KeyboardEvent & { target: HTMLLIElement }) => {
    let selectedId: number;
    let selectedTab: HTMLElement;

    const tabId = event.target.getAttribute('data-index');
    const parent = event.target.parentElement;

    // change selected id from key code
    if (['ArrowRight', 'ArrowDown', 'Right', 'Down'].indexOf(event.key) > -1) {
      // /* IE FIX */'Right', 'Down'
      selectedId = Number(tabId) + 1;
    } else if (['ArrowLeft', 'ArrowUp', 'Left', 'Up'].indexOf(event.key) > -1) {
      // /* IE FIX */'Left', 'Up'
      selectedId = Number(tabId) - 1;
    }

    // get selected tab
    selectedTab = parent.querySelector(`[data-index="${selectedId}"]`);

    // apply selected tab if exist
    if (selectedTab !== null) {
      selectedTab.focus();
      this.activeTab = selectedId;
    }
  };

  /**
   * Validate slots setting
   */
  private validateSlots() {
    const slots = Array.from(this.element.children).filter(slot => slot.getAttribute('slot')?.indexOf('tab_content-') > -1);
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
    this.validateTabs(this.tabs);
    this.validateSlots();
  }

  render() {
    return (
      <Host>
        <ul role="tablist" class="mg-tabs-links">
          {this.tabs.map((tab, index) => (
            <li
              role="tab"
              id={`${this.identifier}-${index}`}
              class={`mg-tabs-links__link ${index === this.activeTab ? 'mg-tabs-links__link--active' : ''}`}
              tabindex={index === this.activeTab ? 0 : -1}
              aria-selected={(index === this.activeTab).toString()}
              aria-controls={`pannel-${index}`}
              onClick={this.handleClick}
              onKeyDown={this.handleKeydown}
              data-index={index}
            >
              {tab.icon !== undefined ? <mg-icon icon={tab.icon}></mg-icon> : null}
              {tab.label || tab}
              {tab.badge !== undefined ? <mg-tag variant="info">{tab.badge}</mg-tag> : null}
            </li>
          ))}
        </ul>
        {this.tabs.map((_tab, index) => (
          <article
            role="tabpanel"
            id={`pannel-${index}`}
            class={`mg-tabs-content ${index === this.activeTab ? 'mg-tabs-content--active' : ''}`}
            aria-labelledby={`${this.identifier}-${this.activeTab}`}
            tabindex={index === this.activeTab ? 0 : -1}
          >
            <slot name={`tab_content-${index + 1}`}></slot>
          </article>
        ))}
      </Host>
    );
  }
}
