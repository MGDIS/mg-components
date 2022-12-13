import { Component, h, Prop, State, Element, Watch, Host } from '@stencil/core';
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
   * use reflect for cloneNode() label attribute in mg-plus
   */
  @Prop({ reflect: true }) label!: string;
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
    // update props and states after componentDidLoad hook
    // return a promise to process action only in the FIRST render().
    // https://stenciljs.com/docs/component-lifecycle#componentwillload
    return setTimeout(() => {
      // store all menu-items
      this.menuItems = Array.from(this.element.children).filter(child => child.nodeName === 'MG-MENU-ITEM') as HTMLMgMenuItemElement[];
      this.isChildMenu = this.element.closest('mg-menu-item') !== null;

      // add menu items listeners
      this.initMenuItemsListeners();

      // click outside management for child vertical menu
      if (!this.isChildMenu && this.direction === Direction.HORIZONTAL) {
        document.addEventListener('click', (event: MouseEvent & { target: HTMLElement }) => {
          if (event.target.closest('mg-menu') === null) {
            this.menuItems.forEach(item => {
              this.closeMenuItem(item, this.direction === Direction.HORIZONTAL);
            });
          }
        });
      }
    }, 0);
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
