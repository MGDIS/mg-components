import { Component, h, Prop, State, Element, Watch, Host } from '@stencil/core';
import { ClassList } from '../../../../utils/components.utils';
import { Direction } from './mg-menu.conf';
import { initLocales } from '../../../../locales';
import { MgPlus } from '../../../../behaviors/mg-plus';
import { Status } from '../mg-menu-item/mg-menu-item.conf';

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
  // mg-plus variables
  private mgPlus: MgPlus;
  private messages;
  private resizeObserver: ResizeObserver;

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
  private initMenuItemsListeners = (): void => {
    // store all menu-items
    this.menuItems = Array.from(this.element.children).filter(child => child.nodeName === 'MG-MENU-ITEM') as HTMLMgMenuItemElement[];

    // add listeners on menu item and edit index
    this.menuItems.forEach((item, menuItemIndex) => {
      ['click', 'focus'].forEach(trigger => {
        (item.shadowRoot.querySelector('button') || item.shadowRoot.querySelector('a')).addEventListener(trigger, (event: CustomEvent & { target: HTMLMgMenuItemElement }) => {
          event.preventDefault();
          event.stopPropagation();
          this.focusedMenuItem = menuItemIndex;
          // reset expanded on previous active menu item
          this.menuItems.forEach((item, index) => {
            this.closeMenuItem(item, index !== this.focusedMenuItem);
          });
        });
      });
    });
  };

  private initMgPlus = (): void => {
    if (!this.isChildMenu) {
      // add resize observer
      this.resizeObserver = new ResizeObserver(entries => {
        entries.forEach(entry => {
          this.mgPlus.setUp(entry.target.nodeName === 'MG-MENU' ? entry.contentRect.width : this.element.offsetWidth);
        });
      });
      [this.element, ...Array.from(this.element.children)].forEach(item => {
        this.resizeObserver.observe(item);
      });
    }
  };

  private renderMgPlus = (): HTMLElement => {
    const size = Array.from(this.element.children)
      .find(child => child.nodeName === 'MG-MENU-ITEM')
      ?.getAttribute('size');

    const mgPlus = document.createElement('mg-menu-item');
    if (size !== null) mgPlus.setAttribute('size', size);

    const label = document.createElement('span');
    label.setAttribute('slot', 'label');

    const labelText = document.createElement('span');
    labelText.setAttribute('hidden', '');
    labelText.textContent = this.messages.menu.moreMenu;
    label.appendChild(labelText);

    const mgIcon = document.createElement('mg-icon');
    mgIcon.setAttribute('icon', 'ellipsis-vertical');
    label.appendChild(mgIcon);

    mgPlus.appendChild(label);

    const plusMenu = document.createElement('mg-menu');
    plusMenu.setAttribute('direction', Direction.VERTICAL);
    plusMenu.setAttribute('label', this.messages.menu.moreMenu);
    Array.from(this.element.children).forEach((element, index) => {
      element.setAttribute('data-mg-menu-index', `${index}`);
      plusMenu.appendChild(element.cloneNode(true));
    });
    mgPlus.appendChild(plusMenu);

    return mgPlus;
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
    // Get locales
    this.messages = initLocales(this.element).messages;
    this.validateDirection(this.direction);
    this.validateLabel(this.label);
  }

  /**
   * Check if component slots configuration
   *
   * @returns {ReturnType<typeof setTimeout>} timeout
   */
  componentDidLoad(): ReturnType<typeof setTimeout> {
    this.mgPlus = new MgPlus(this.element, this.renderMgPlus, (item: HTMLMgMenuItemElement) => item.status !== Status.HIDDEN);
    // update props and states after componentDidLoad hook
    // return a promise to process action only in the FIRST render().
    // https://stenciljs.com/docs/component-lifecycle#componentwillload
    return setTimeout(() => {
      this.isChildMenu = this.element.closest('mg-menu-item') !== null;

      // init mg-plus
      this.initMgPlus();

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

  disconnectedCallback() {
    this.resizeObserver?.disconnect();
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
