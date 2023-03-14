import { Component, h, Prop, State, Element, Watch, Host } from '@stencil/core';
import { Direction, sizes } from './mg-menu.conf';
import type { MenuSizeType, ItemMoreType } from './mg-menu.conf';

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
  private menuItems: HTMLMgMenuItemElement[] = [];
  private focusedMenuItem = 0;

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
      throw new Error(`<${this.name}> prop "direction" must be one of: ${Direction.HORIZONTAL}, ${Direction.VERTICAL}.`);
    }
  }

  /**
   * Customize "mg-item-more" element
   * Used with direction: 'vertical' to manage overflow
   */
  @Prop() itemmore: ItemMoreType;
  @Watch('itemmore')
  validateItemMore(newValue: MgMenu['itemmore']): void {
    if (newValue !== undefined && this.direction !== Direction.HORIZONTAL) {
      throw new Error(`<${this.name}> prop "itemmore" must be paired with direction ${Direction.HORIZONTAL}.`);
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
      throw new Error(`<${this.name}> prop "size" must be one of: ${sizes.join(', ')}.`);
    }
  }

  /**
   * is this menu a child menu. Used for conditional render.
   */
  @State() isChildMenu: boolean;

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
   * render mg-item-more
   *
   * @returns {void}
   */
  private renderMgItemMore = (): void => {
    // /!\ externalise item tag name to get a string type and bypass type checking when value is used in next createElement
    // by doing this we prevent stencil to generate a circular dependencies graph at build time with mg-item-more component.
    const item = 'mg-item-more';
    const mgItemMore = document.createElement(item);
    Object.assign(mgItemMore, this.itemmore);
    this.element.appendChild(mgItemMore);
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
    this.validateItemMore(this.itemmore);
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

      // add mg-item-more to manage OverflowBehavior
      if (this.direction === Direction.HORIZONTAL && !this.isChildMenu) this.renderMgItemMore();

      // use mutation observer to improve reactivity
      new MutationObserver(entries => {
        const mgItemMore = this.element.querySelector('mg-item-more');
        // prevent infinit loop by exclude mg-item-more deletion entry
        if (entries.some(entry => entry.type === 'childList' && Array.from(entry.removedNodes).some(node => node.nodeName === 'MG-ITEM-MORE'))) return;
        else if (mgItemMore !== null) {
          // render a new mg-item-more
          mgItemMore.remove();
          this.renderMgItemMore();
        }
      }).observe(this.element, { childList: true, characterData: true, subtree: true });
    }, 0);
  }

  /**
   * Add listeners to items
   *
   * @returns {void}
   */
  componentDidRender(): void {
    this.initMenuItemsListeners();
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
      </Host>
    );
  }
}
