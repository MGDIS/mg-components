import { Component, h, Prop, State, Element, Watch, Host } from '@stencil/core';
import { OverflowBehavior, OverflowBehaviorElements } from '../../../../utils/behaviors.utils';
import { Direction, isMoreItem, MenuSizeType, MessageType, MoreItemType, sizes } from './mg-menu.conf';
import { initLocales } from '../../../../locales';

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
  private messages: MessageType;
  private menuItems: HTMLMgMenuItemElement[] = [];
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
   * Customize mg-menu "more element"
   * Used with direction: 'vertical' to manage overflow
   */
  @Prop() moreitem: MoreItemType;
  @Watch('moreitem')
  validateMoreItem(newValue: MgMenu['moreitem']): void {
    if (newValue !== undefined && this.direction !== Direction.HORIZONTAL) {
      throw new Error(`<${this.name}> prop "moreitem" must be paired with direction ${Direction.HORIZONTAL}.`);
    } else if (newValue !== undefined && !isMoreItem(newValue)) {
      throw new Error(`<${this.name}> prop "moreitem" must match MoreItemType.`);
    }
  }

  /**
   * Define mg-menu size
   * Default: 'regular'
   */
  @Prop() size: MenuSizeType = 'regular';
  @Watch('size')
  validateSize(newValue: MgMenu['size']): void {
    if (!sizes.includes(newValue)) {
      throw new Error(`<${this.name}> prop "size" must be one of : ${sizes.join(', ')}.`);
    }
  }

  /**
   * is this menu a child menu. Used for conditional render.
   */
  @State() isChildMenu: boolean;

  /**
   * Define if component manage child overflow
   * Default: false
   */
  @State() hasOverflow = false;

  /**
   * Close matching menu-item
   *
   * @param {HTMLElement} item menu-item to close
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
   *
   * @returns {void}
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

  /**
   * render mg-menu-more
   *
   * @returns {HTMLElement} formated mg-menu-item element
   */
  private renderMgMenuMore = (): HTMLMgMenuItemElement => {
    const moreElement = this.element.shadowRoot.querySelector(`[${OverflowBehaviorElements.MORE}]`);
    this.menuItems.forEach((child: HTMLMgMenuItemElement) => {
      const proxy = child.cloneNode(true) as HTMLMgMenuItemElement;
      moreElement.querySelector('mg-menu').appendChild(proxy);
    });

    const allMenuItem = Array.from(this.element.querySelectorAll('mg-menu-item:not([data-overflow-more])'));

    Array.from(moreElement.querySelectorAll('mg-menu-item:not([data-overflow-more])')).forEach((proxy, index) => {
      // manage click on proxy to mirror it on initial element
      proxy.addEventListener('click', () => {
        (allMenuItem[index].shadowRoot.querySelector('a') || allMenuItem[index].shadowRoot.querySelector('button')).dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      // manage status change miror in proxy
      allMenuItem[index].addEventListener('status-change', (event: CustomEvent) => {
        proxy.setAttribute('status', event.detail);
      });
    });

    this.element.appendChild(moreElement);

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
    this.messages = (initLocales(this.element).messages as { plusMenu: MessageType }).plusMenu;

    // validation
    this.validateDirection(this.direction);
    this.validateLabel(this.label);
    this.validateMoreItem(this.moreitem);
    this.validateSize(this.size);
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
      // store all menu-items
      this.menuItems = Array.from(this.element.children).filter(child => child.nodeName === 'MG-MENU-ITEM') as HTMLMgMenuItemElement[];
      this.isChildMenu = this.element.closest('mg-menu-item') !== null;
      this.hasOverflow = this.direction === Direction.HORIZONTAL && !this.isChildMenu;
      if (this.hasOverflow && isMoreItem(this.moreitem)) this.overflowBehavior = new OverflowBehavior(this.element, this.renderMgMenuMore);
    }, 0);
  }

  /**
   * Check add listeners to childs
   *
   * @returns {void}
   */
  componentDidRender(): void {
    // add menu items listeners
    this.initMenuItemsListeners();
  }

  /**
   * Disconnect overflow ResizeObserver
   *
   * @returns {void} run overflow resize obeserver disconnexion
   */
  disconnectedCallback(): void {
    if (this.hasOverflow) this.overflowBehavior.disconnect();
  }

  /**
   * Render mg-menu-item more element for overflow behavior
   *
   * @returns {HTMLElement} rendered mg-menu-item more element
   */
  private renderMgMenuItemMore = (): HTMLMgMenuItemElement => (
    <mg-menu-item data-overflow-more>
      <mg-icon icon={this.moreitem?.mgIcon?.icon || 'ellipsis-vertical'} slot="image"></mg-icon>
      <span class={{ 'sr-only': !this.moreitem?.slotLabel?.display }} slot="label">
        {this.moreitem?.slotLabel?.label || this.messages.moreLabel}
      </span>
      <mg-menu direction={Direction.VERTICAL} label={this.messages.moreLabel} size={this.moreitem?.size}></mg-menu>
    </mg-menu-item>
  );

  /**
   * Render
   *
   * @returns {HTMLElement} HTML Element
   */
  render(): HTMLElement {
    return (
      <Host role={this.isChildMenu ? 'menu' : 'menubar'} aria-label={this.label}>
        <slot></slot>
        {this.hasOverflow && isMoreItem(this.moreitem) && this.renderMgMenuItemMore()}
      </Host>
    );
  }
}
