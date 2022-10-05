import { Component, h, Prop, State, Element, Watch, Host } from '@stencil/core';
import { createID, ClassList } from '../../../../utils/components.utils';
import { DisplayType, MenuType } from './mg-menu.conf';

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
  @Prop() identifier: MenuType['identifier'] = createID(this.name);

  /**
   * Menu label. Include short menu description.
   * Required for accessibility
   */
  @Prop() label!: MenuType['label'];

  /**
   * Component display orientation
   */
  @Prop({ reflect: true }) display: MenuType['display'] = DisplayType.HORIZONTAL;
  @Watch('display')
  validateDisplay(newValue: MenuType['display']): void {
    if (newValue === DisplayType.VERTICAL) {
      this.classList.add(`${this.name}--${DisplayType.VERTICAL}`);
    } else if (newValue === DisplayType.HORIZONTAL) {
      this.classList.add(`${this.name}--${DisplayType.HORIZONTAL}`);
    }
  }

  /**
   * is this menu a child menu. Used for conditional render.
   */
  @State() isChildMenu: boolean;

  /**
   * Component classes
   */
  @State() classList: ClassList = new ClassList([this.name]);

  /**
   * Component focused menu-item
   */
  @State() focusedMenuItem: number;
  @Watch('focusedMenuItem')
  validatefocusedMenuItem(newValue: number, oldValue: number): void {
    if (newValue !== oldValue || (newValue === 0 && !this.isChildMenu)) {
      // reset expanded on previous active menu item
      this.menuItems.forEach((item, index) => {
        if (index !== this.focusedMenuItem) {
          item.expanded = false;
        }
      });
    }
  }

  /**
   * Store menu-items on component init and add listeners
   */
  private initMenuItems() {
    // store all menu-items
    this.menuItems = Array.from(this.element.querySelectorAll(`[identifier="${this.element.identifier}"] > mg-menu-item`));

    this.menuItems.forEach((item, index) => {
      item.menuIndex = index;
      item.addEventListener('focused-item', (event: CustomEvent & { target: HTMLMgMenuItemElement }) => {
        this.focusedMenuItem = event.detail;
        event.stopPropagation();
      });
    });
  }

  /*************
   * Lifecycle *
   *************/

  /**
   * Validate props
   *
   * @returns {void}
   */
  componentWillLoad(): void {
    this.validateDisplay(this.display);
  }

  /**
   * Check if component slots configuration
   *
   * @returns {void}
   */
  componentDidLoad(): void {
    this.initMenuItems();
    this.isChildMenu = this.element.parentElement.nodeName === 'MG-MENU-ITEM';
  }

  /**
   * Render
   *
   * @returns {HTMLElement} HTML Element
   */
  render(): HTMLElement {
    return (
      <Host identifier={this.identifier} role={this.isChildMenu ? 'menu' : 'menubar'} aria-label={this.label} classList={this.classList.join()}>
        <slot></slot>
      </Host>
    );
  }
}
