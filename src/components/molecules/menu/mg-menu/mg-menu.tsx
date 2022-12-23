import { Component, h, Prop, State, Element, Watch, Host } from '@stencil/core';
import { OverflowBehavior, OverflowBehaviorElements } from '../../../../utils/behaviors.utils';
import { Direction } from './mg-menu.conf';

@Component({
  tag: 'mg-menu',
  styleUrl: 'mg-menu.scss',
  shadow: true,
})
export class MgMenu {
  /************
   * Internal *
   ************/

  private readonly name = 'mg-menu';
  private menuItems: HTMLMgMenuItemElement[];
  private focusedMenuItem = 0;
  private overflowBehavior: OverflowBehavior;

  /**************
   * Decorators *
   **************/

  /**
   * Get component DOM element
   */
  @Element() element: HTMLMgMenuElement;

  /**
   * Menu label. Include short menu description.
   * Required for accessibility
   */
  @Prop() label!: string;
  @Watch('label')
  validateLabel(newValue: MgMenu['label']): void {
    if (newValue === undefined) {
      throw new Error(`<${this.name}> prop "label" is required.`);
    }
  }

  /**
   * Component display direction. Default: "horizontal"
   */
  @Prop({ reflect: true }) direction: Direction = Direction.HORIZONTAL;
  @Watch('direction')
  validateDirection(newValue: MgMenu['direction']): void {
    if (![Direction.VERTICAL, Direction.HORIZONTAL].includes(newValue)) {
      throw new Error(`<${this.name}> prop "direction" must be one of : ${Direction.HORIZONTAL}, ${Direction.VERTICAL}.`);
    }
  }

  /**
   * Define component manage child overflow
   */
  @Prop() activeOverflow: boolean;

  /**
   * is this menu a child menu. Used for conditional render.
   */
  @State() isChildMenu: boolean;

  /**
   * Close matching menu-item
   *
   * @param {HTMLMgMenuItemElement} item menu-item to close
   * @param {boolean} condition addionnal condition
   * @returns {void}
   */
  private closeMenuItem = (item: HTMLMgMenuItemElement, condition: boolean): void => {
    if (!this.isChildMenu && condition) {
      item.expanded = false;
    }
  };

  /*************
   * Methods *
   *************/

  /**
   * Store menu-items on component init and add listeners
   */
  private initMenuItemsListeners = (): void => {
    // add listeners on menu item and edit index
    this.menuItems.forEach((item, menuItemIndex) => {
      ['click', 'focus'].forEach(trigger => {
        (item.shadowRoot.querySelector('button') || item.shadowRoot.querySelector('a')).addEventListener(trigger, () => {
          this.focusedMenuItem = menuItemIndex;
          // reset expanded on previous active menu item
          this.menuItems.forEach((item, index) => {
            this.closeMenuItem(item, index !== this.focusedMenuItem);
          });
        });
      });
    });
  };

  private renderMgActionMore = (): HTMLMgMenuItemElement => {
    const moreElement = this.element.shadowRoot.querySelector(`[${OverflowBehaviorElements.MORE}]`);
    Array.from(this.element.children).forEach(child => {
      const proxy = child.cloneNode(true);
      proxy.addEventListener('click', () => {
        child.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });
      moreElement.querySelector('mg-menu').appendChild(proxy);
    });
    this.element.appendChild(moreElement);

    // size
    const size = this.element.querySelector('mg-menu-item').getAttribute('size');
    moreElement.setAttribute('size', size);

    return this.element.querySelector(`[${OverflowBehaviorElements.MORE}]`);
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
    this.validateDirection(this.direction);
    this.validateLabel(this.label);
  }

  /**
   * Check if component slots configuration
   *
   * @returns {ReturnType<typeof setTimeout>} timeout
   */
  componentDidLoad(): ReturnType<typeof setTimeout> {
    if (this.activeOverflow) {
      this.overflowBehavior = new OverflowBehavior(this.element, this.renderMgActionMore);
      this.overflowBehavior.init();
    }
    // update props and states after componentDidLoad hook
    // return a promise to process action only in the FIRST render().
    // https://stenciljs.com/docs/component-lifecycle#componentwillload
    return setTimeout(() => {
      this.isChildMenu = this.element.closest('mg-menu-item') !== null;
    }, 0);
  }

  /**
   * Check add listeners to childs
   *
   * @returns {void}
   */
  componentDidRender() {
    // store all menu-items
    this.menuItems = Array.from(this.element.children).filter(child => child.nodeName === 'MG-MENU-ITEM') as HTMLMgMenuItemElement[];
    // add menu items listeners
    this.initMenuItemsListeners();
  }

  /**
   * Disconnect overflow ResizeObserver
   *
   * @returns {void}
   */
  disconnectedCallback(): void {
    if (this.activeOverflow) {
      this.overflowBehavior.disconnect();
    }
  }

  renderMgMenuItemMore(): HTMLMgMenuItemElement {
    const displayBadge = false;
    const messages = {
      badgeLabel: 'todo',
      moreLabel: 'todo',
    };
    return (
      <mg-menu-item data-overflow-more>
        <mg-icon icon="ellipsis-vertical" slot="image"></mg-icon>
        <span class="sr-only" slot="label">
          {messages.moreLabel}
        </span>
        {displayBadge && <mg-badge label={messages.badgeLabel} value="!" hidden variant="primary" slot="information"></mg-badge>}
        <mg-menu direction={Direction.VERTICAL} label={messages.moreLabel}>
          <slot></slot>
        </mg-menu>
      </mg-menu-item>
    );
  }

  /**
   * Render
   *
   * @returns {HTMLElement} HTML Element
   */
  render(): HTMLElement {
    return (
      <Host role={this.isChildMenu ? 'menu' : 'menubar'} aria-label={this.label}>
        <slot></slot>
        {this.activeOverflow && this.renderMgMenuItemMore()}
      </Host>
    );
  }
}
