import { Component, h, Prop, State, Element, Watch, Host } from '@stencil/core';
import { ClassList } from '../../../../utils/components.utils';
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
   * Component display direction
   */
  @Prop({ reflect: true }) direction: Direction = Direction.HORIZONTAL;
  @Watch('direction')
  validateDisplay(newValue: MgMenu['direction']): void {
    if (newValue === Direction.VERTICAL) {
      this.classList.add(`${this.name}--${Direction.VERTICAL}`);
    } else if (newValue === Direction.HORIZONTAL) {
      this.classList.add(`${this.name}--${Direction.HORIZONTAL}`);
    } else {
      throw new Error(`<${this.name}> prop "direction" must be one of : ${Direction.HORIZONTAL}, ${Direction.VERTICAL}.`);
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
  @State() focusedMenuItem = 0;
  @Watch('focusedMenuItem')
  validatefocusedMenuItem(newValue: MgMenu['focusedMenuItem'], oldValue: MgMenu['focusedMenuItem']): void {
    if (newValue !== oldValue) {
      // reset expanded on previous active menu item
      this.menuItems.forEach((item, index) => {
        this.closeMenuItem(item, index !== this.focusedMenuItem);
      });
    }
  }

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

  /**
   * Store menu-items on component init and add listeners
   */
  private initMenuItems = (): void => {
    // store all menu-items
    this.menuItems = Array.from(this.element.children) as HTMLMgMenuItemElement[];

    // add listeners on menu item and edit index
    this.menuItems.forEach((item, index) => {
      item.menuIndex = index;
      item.addEventListener('focused-item', (event: CustomEvent & { target: HTMLMgMenuItemElement }) => {
        this.focusedMenuItem = event.detail;
        event.stopPropagation();
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
    this.validateDisplay(this.direction);
    this.validateLabel(this.label);
  }

  /**
   * Check if component slots configuration
   *
   * @returns {ReturnType<typeof setTimeout>} timeout
   */
  componentDidLoad(): ReturnType<typeof setTimeout> {
    this.initMenuItems();
    // update props and states after componentDidLoad hook
    // return a promise to process action only in the FIRST render().
    // https://stenciljs.com/docs/component-lifecycle#componentwillload
    return setTimeout(() => {
      this.isChildMenu = this.element.closest('mg-menu-item') !== null;

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
      <Host role={this.isChildMenu ? 'menu' : 'menubar'} aria-label={this.label} classList={this.classList.join()}>
        <slot></slot>
      </Host>
    );
  }
}
